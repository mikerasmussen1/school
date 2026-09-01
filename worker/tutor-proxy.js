/* Tutor proxy — keeps the model API key on the server.
 *
 * WHY THIS EXISTS
 * The app is a static site on GitHub Pages, so anything it holds is public.
 * That was tolerable with a free-tier Gemini key (worst case: exhausted quota)
 * and is NOT tolerable with an Anthropic key, which is billed — a stranger who
 * reads index.html could spend real money. This Worker is the fix: the key
 * lives in a Cloudflare secret, the browser never sees it, and the page calls
 * this instead of calling Anthropic directly.
 *
 * WHAT IT DOES AND DOES NOT PROTECT
 * The key is genuinely safe: it is never sent to a client. What remains open is
 * ABUSE OF THE PROXY — someone could call this endpoint and make you pay for
 * their tokens. Three things bound that, and it is worth being clear about how
 * strong each really is:
 *
 *   1. Origin allowlist. Stops other WEBSITES using it, because browsers send
 *      Origin and refuse cross-origin reads without matching CORS headers. It
 *      does NOT stop curl, which can send any Origin it likes. Real, but only
 *      against casual reuse.
 *   2. Rate limit, per IP, in the edge cache. Bounds how fast anyone can burn
 *      tokens. Per-colo rather than global, so a distributed caller gets a
 *      higher effective ceiling — a speed bump, not a wall.
 *   3. The spend cap on the Anthropic key. This is the real backstop, and the
 *      only one that is a hard limit. Set it low.
 *
 * Deploy: see worker/README.md.
 */

const ALLOWED_ORIGINS = [
  "https://mikerasmussen1.github.io",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
];

// Per-IP ceiling. A struggling child generates at most a handful of lessons an
// hour; anything past this is not a child.
const RATE_LIMIT = 20;
const RATE_WINDOW_SECONDS = 3600;

// Bound the cost of a single call regardless of what the client asks for.
const MAX_TOKENS = 4096;
const MAX_PROMPT_CHARS = 24000;

const DEFAULT_MODEL = "claude-sonnet-5";
const ALLOWED_MODELS = [
  "claude-sonnet-5",
  "claude-haiku-4-5-20251001",
];

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin || "null") },
  });
}

/* Fixed-window counter in the edge cache. No KV binding needed, so this Worker
 * deploys with nothing but a secret. The window is per colo, which is the
 * documented trade — see the header comment. */
async function overRateLimit(ip) {
  const cache = caches.default;
  const bucket = Math.floor(Date.now() / 1000 / RATE_WINDOW_SECONDS);
  const key = new Request(`https://rate-limit.invalid/${encodeURIComponent(ip)}/${bucket}`);
  let count = 0;
  const hit = await cache.match(key);
  if (hit) {
    count = parseInt(await hit.text(), 10) || 0;
  }
  if (count >= RATE_LIMIT) return true;
  await cache.put(
    key,
    new Response(String(count + 1), {
      headers: { "Cache-Control": `max-age=${RATE_WINDOW_SECONDS}` },
    })
  );
  return false;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = ALLOWED_ORIGINS.includes(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: allowed ? 204 : 403,
        headers: allowed ? corsHeaders(origin) : {},
      });
    }
    if (!allowed) return json({ error: "origin not allowed" }, 403, null);
    if (request.method !== "POST") return json({ error: "POST only" }, 405, origin);
    if (!env.ANTHROPIC_API_KEY) return json({ error: "proxy has no key configured" }, 500, origin);

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (await overRateLimit(ip)) {
      return json({ error: "rate limit reached, try again later" }, 429, origin);
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return json({ error: "body must be JSON" }, 400, origin);
    }

    const prompt = typeof body.prompt === "string" ? body.prompt : "";
    if (!prompt) return json({ error: "prompt required" }, 400, origin);
    if (prompt.length > MAX_PROMPT_CHARS) {
      return json({ error: "prompt too long" }, 413, origin);
    }

    // Never pass a client-chosen model straight through — that is how someone
    // bills you for the most expensive model available.
    const model = ALLOWED_MODELS.includes(body.model) ? body.model : DEFAULT_MODEL;

    /* Identity-linked keys (the "works across workspaces" kind) REQUIRE an
     * anthropic-workspace-id header and 400 without it. Workspace-scoped keys
     * ignore it. Sending it whenever it is configured covers both, so the key
     * type does not have to be known here. */
    const anthropicHeaders = {
      "Content-Type": "application/json",
      "x-api-key": env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    };
    if (env.ANTHROPIC_WORKSPACE_ID) {
      anthropicHeaders["anthropic-workspace-id"] = env.ANTHROPIC_WORKSPACE_ID;
    }

    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: anthropicHeaders,
      body: JSON.stringify({
        model,
        max_tokens: MAX_TOKENS,
        temperature: 0.4,
        // Prefill an opening brace so the reply starts as JSON. The client
        // re-attaches it; keep the two in step if either changes.
        messages: [
          { role: "user", content: prompt },
          { role: "assistant", content: "{" },
        ],
      }),
    });

    const text = await upstream.text();
    // Pass the upstream status through so the client can tell "rate limited"
    // from "bad request" from "overloaded", rather than seeing a flat 500.
    return new Response(text, {
      status: upstream.status,
      headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
    });
  },
};

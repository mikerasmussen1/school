# Tutor proxy

Keeps the Anthropic API key **off the client**. The page calls this Worker; the
Worker calls Anthropic with a key stored as a Cloudflare secret.

## Why

The app is a static site on GitHub Pages, so anything it ships is public. That
was tolerable with a free-tier Gemini key — worst case, quota runs out. It is
not tolerable with an Anthropic key, which is billed: a stranger who reads
`index.html` could spend real money.

## Deploy (about five minutes)

```sh
npm install -g wrangler      # once
cd worker
wrangler login               # opens a browser
wrangler secret put ANTHROPIC_API_KEY   # paste the key; it is never committed
wrangler deploy
```

`wrangler deploy` prints the URL, e.g. `https://baskin-tutor.<you>.workers.dev`.

## Point the app at it

In Firestore → `config/app`, set:

| Field      | Value                                      |
|------------|--------------------------------------------|
| `proxyUrl` | the Worker URL from `wrangler deploy`      |

Then **delete the `apiKey` field**. With `proxyUrl` set the app sends no key at
all, and having both is a needless exposure.

Optional: `model` accepts `claude-sonnet-5` (default) or
`claude-haiku-4-5-20251001`. The Worker ignores anything else, so a client
cannot bill you for a model you did not choose.

## What this protects, honestly

**The key is genuinely safe** — it is never sent to a browser.

What remains is abuse *of the proxy*: someone could call the endpoint and make
you pay for their tokens. Three things bound that, and they are not equal:

1. **Origin allowlist** — stops other websites, because browsers send `Origin`
   and cannot read cross-origin responses without matching CORS headers. Does
   **not** stop `curl`, which can send any Origin. Real, but only against casual
   reuse.
2. **Rate limit** — 20 requests per IP per hour, held in the edge cache. It is
   per-colo rather than global, so a distributed caller gets a higher effective
   ceiling. A speed bump, not a wall.
3. **The spend cap on the Anthropic key** — the only hard limit, and therefore
   the one that actually matters. Set it low.

To change the allowlist or the limit, edit the constants at the top of
`tutor-proxy.js` and redeploy.

## Rotating the key

`wrangler secret put ANTHROPIC_API_KEY` again, then `wrangler deploy`. Nothing
in the app or in Firestore changes.

# Adventures in Big Math — backend handoff

> **STATUS (2026-08-12): implemented.** Cloud saves now ship in `index.html`
> behind one constant. The sections below this box are the original design
> notes, kept for background.

## Turning cloud saves ON (one-time, ~5 minutes, free)

The app talks straight to Firestore from the browser — GitHub Pages stays a
plain static host, no server anywhere.

1. Go to https://console.firebase.google.com → **Add project** (call it
   anything, e.g. `big-math`). Skip Analytics.
2. In the project: **Build → Firestore Database → Create database** →
   Start in *production mode*, any region.
3. **Rules** tab → paste the contents of **`firestore.rules`** in this repo →
   Publish. That file is the single source of truth and is what is deployed;
   this document used to carry its own copy of the rules and the copy went
   stale, listing two collections when the ruleset had five.

4. **Project settings** (gear icon) → copy the **Project ID**.
5. In `index.html`, search for `REMOTE_PROJECT_ID` and paste it:
   `const REMOTE_PROJECT_ID = "big-math";`
6. Push to GitHub Pages. Done.

## Photo homework ("I did this on paper")

Set up and LIVE (2026-08-12). Tapping "I did this on paper" now asks the
pilot if they want to snap a picture of the page. The photo is downscaled
on-device and sent to Gemini (`gemini-flash-latest`), which checks it's the
right exercise and reads the child's WRITTEN answers (wrong ones included)
into the boxes — then the normal Check flow grades them. "Just mark it
done" keeps the old behavior.

- Key: **not committed, and it must stay that way.** The earlier guidance here
  said committing a referrer-restricted browser key was the intended model. That
  was wrong in practice: Google's secret scanner found the key in the public
  repo and disabled it, and the app began returning "Your API key was reported
  as leaked". Referrer restrictions limit who can USE a key, not who can READ
  it, and environment variables do not help — this is a static site, so there is
  no server to hold one and a build-time substitution still ships the key to the
  browser.
- **Preferred: store it once in Firestore, then unlock each device with the
  teacher code.** The key sits at `config/<id>`, where `<id>` is a SHA-256 of
  the teacher code — unguessable, and `list` is denied, so reading it is exactly
  as hard as knowing that code. Typing the teacher code in Teacher HQ fetches
  the key and caches it on that device. One short code the grown-up already
  knows, instead of a 53-character key, and nothing lands in browser history.

  Set it up once. In a browser console on the site, compute the doc id without
  the code ever leaving the machine:

  ```js
  (async c => {
    const d = await crypto.subtle.digest("SHA-256",
      new TextEncoder().encode("gemini:" + c.trim().toLowerCase()));
    return "k-" + [...new Uint8Array(d)].map(b=>b.toString(16).padStart(2,"0")).join("").slice(0,28);
  })("YOUR-TEACHER-CODE").then(console.log)
  ```

  Then in the Firebase console → Firestore → collection `config`, create a
  document with that id and one **string** field named `gemini` holding the key.
  Writes are denied to the app, so this is a console-only step by design.

  After that, on any device: open Teacher HQ, type the teacher code, done.

  The trade, stated plainly: **if the teacher code leaks, the Gemini key leaks
  with it.** On a project with no billing attached that costs free-tier quota
  rather than money, which is why it is acceptable here and would not be if
  billing were ever enabled.

- Fallbacks, still supported, set `localStorage` directly:
  - **Any device, including iPads** — visit the site with `?gemkey=THEKEY` on
    the end of the URL. It stores the key and strips the parameter from the
    address bar immediately. This is the only method that works on an iPad,
    because Safari there has no JavaScript console.
  - **Desktop** — browser console:
    `localStorage.setItem("GEMINI_API_KEY", "PASTE_KEY_HERE")`, then reload.
  - Remove with `localStorage.removeItem("GEMINI_API_KEY")`, or by clearing
    site data.
  Note the `?gemkey=` URL does put the key in that device's browser history for
  one entry. On a family iPad that is an acceptable trade for it being settable
  at all; do not paste such a URL into a chat, an email, or anything shared.
- The current key ("BaskinSchool", created 2026-09-01) lives on Google Cloud
  project **270254517675**, which is NOT `big-math-adventures`
  (632810102950 — the Firestore project). That is fine functionally: the Gemini
  key has nothing to do with Firestore. But it means two things.
  First, manage this key in AI Studio or under Credentials on **270254517675**,
  not on the Firebase project. Second, and more important: the old "worst case
  is free-tier quota burn, never a bill" assurance was about
  `big-math-adventures` having no billing account. It says nothing about
  270254517675. **Verify that project has no billing account attached**, or the
  failure mode changes from "requests stop" to "requests get charged".
- The leaked `AIzaSy…` key should be DELETED on `big-math-adventures` rather
  than left disabled.
- Cost: free tier; two kids won't dent it. The tutor sends roughly 1k tokens in
  and a lesson back, capped at 2 attempts per round and 3 rounds per set.
- With no key set, photo homework reverts to "mark it done" and dynamic lessons
  do not generate. Nothing breaks.
- If this ever outgrows one family, put the key behind a proxy so the browser
  never sees it: a Cloudflare Worker on its free tier, or a Firebase Function
  (Functions need the Blaze plan for outbound network calls).

## How the login works

- The picker gains a **secret code** (4-digit PIN) per pilot. New pilot =
  name + code on any device. The same name + code from ANY device resolves
  to the same account and pulls their progress down.
- Tapping an existing pilot card asks for their code first.
- Progress is written locally on every answer (offline-safe) and pushed to
  Firestore after 1.5s of quiet (plus a flush when the tab hides). On
  sign-in, whichever side has the newer `updated` wins.
- Security model: the Firestore doc id is `name + sha256(name:code)`. It's
  deliberately kid-grade — fine for two pilots, not for the internet at
  large. No plaintext code, no email, nothing about the child beyond a
  first name.
- **The invariant that model rests on: every writable doc id is unguessable,
  and `list` is denied everywhere so ids cannot be discovered.** Knowing the id
  IS the login. Any new collection must either keep that property or protect
  writes some other way.
- `questionbanks` is the one collection whose ids are NOT secret — they are
  `y3`, `y5`, `la`, `japan`, named in the client source. Reads are public,
  which is correct since every device fetches the exercises. **Client writes
  are denied outright**, because the unguessable-id protection the rest of the
  ruleset depends on simply does not apply to a public id, and
  `QBank.publish`'s validation is client-side so a raw REST PATCH skips it.
  Publishing is an admin operation: the Firebase console, or a script with
  service-account credentials. Both bypass rules.
- A rejected design worth recording, so nobody re-invents it: requiring the
  write to name an existing roster document, on the theory that roster ids are
  a hash of the teacher code. It does not work. Rosters allow
  `create: if true` with no id validation, so an attacker creates
  `rosters/<anything>` in one request and presents it as their own credential
  in the next. `exists()` proves a document is present, never that whoever
  wrote it knew a secret — and with no auth in the app, any proof a client can
  present is a proof a client can manufacture.
- If in-app publishing is ever wanted, the mechanism is a shared secret
  compared against a literal **inside `firestore.rules`**. Rules are
  server-side and never served to clients, so a hash placed there stays private
  in a way nothing in `index.html` can.
- With `REMOTE_PROJECT_ID = ""` the app behaves exactly as before
  (device-local, no codes).

---


The app currently stores every kid's progress in `localStorage` on the device.
All of it goes through one object, `Storage`, near the top of the logic class in
`index.html`. Replacing that object with API calls is the
whole job — no other file or component needs to change.

Search the source for `BACKEND` to find every seam.

## What gets saved

One blob per household:

```json
{
  "activeId": "k1a2b3c",
  "profiles": [
    { "id": "k1a2b3c", "name": "Brock", "color": "#FF9F1C" }
  ],
  "data": {
    "k1a2b3c": {
      "pAns":     { "p1": { "0": "42", "1": "32" } },
      "pChecked": { "p1|all": true, "p1|2": true },
      "pRuns":    { "p1|all": 3 },
      "lstep":    { "p1": 7 },
      "updated":  1730000000000
    }
  }
}
```

- `pAns` — set id → item index → the answer the kid typed
- `pChecked` — `"<setId>|<tier>"` → whether that view has been graded (`tier` is
  `all`, `0` Warm-Up, `1` Core, `2` Challenge)
- `pRuns` — attempts per set+tier
- `lstep` — how far through each animated walkthrough they got
- `updated` — epoch ms, written on every save

Practice set ids are `p1`–`p5` (Week 1, lessons 1.1–1.4 plus Friday). Item
indexes are positions in that set's `items` array, which lives in the `PRACTICE`
constant in the same file. **If you edit or reorder problems, existing answers
shift.** Give items stable string ids before the content grows if you want to
avoid that.

## The interface to implement

```js
const Storage = {
  async load(),        // -> the blob above, or null for a new device
  async save(blob),    // fire-and-forget; called after every graded answer
  async signIn(),      // -> { token, householdId } or null
  async signOut()      // -> true
};
```

## Suggested API

```
POST /auth/login                 -> { token, householdId }
GET  /households/:id             -> the blob
PUT  /households/:id             -> replace the blob
PUT  /profiles/:pid/progress     -> patch one kid (better once several devices write)
```

At this data size a whole-blob PUT is fine. Move to per-profile patches when two
kids are working on two devices at the same time.

## Things worth getting right

**Debounce saves.** `persist()` fires on every answer that gets committed. Against
a real API, batch it — 1–2 seconds of quiet, plus a flush on page hide.

**Keep localStorage as an offline cache.** Write locally first, then push. On load,
compare `updated` between local and server and take the newer one. The wifi will
drop mid-lesson; the app should not lose the last ten minutes of work.

**Conflicts.** Last-write-wins is acceptable — a kid is on one device at a time.
If that stops being true, merge per set id rather than per blob.

**Profile ids.** Created client-side today as `"k" + timestamp`. Have the server
mint them so the same kid resolves across devices.

**Auth.** The profile picker is not authentication — it's a Netflix-style
"who's watching". A parent login should sit in front of the household; the kid
picker stays as-is behind it.

**Privacy.** No names beyond a first name, no email, nothing about the child is
required. Keep it that way; it makes the compliance question disappear.

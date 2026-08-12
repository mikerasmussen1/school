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
3. **Rules** tab → replace everything with the rules below → Publish:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // A student doc id bakes the pilot's secret code into an
       // unguessable hash — knowing the id IS the login. Nobody can
       // list the collection to discover ids.
       match /students/{id} {
         allow get, create, update: if true;
         allow list, delete: if false;
       }
       // Name registry so the gate can say "wrong code" instead of
       // silently creating a duplicate pilot. Contains no secrets.
       match /names/{id} {
         allow get, create, update: if true;
         allow list, delete: if false;
       }
     }
   }
   ```
4. **Project settings** (gear icon) → copy the **Project ID**.
5. In `index.html`, search for `REMOTE_PROJECT_ID` and paste it:
   `const REMOTE_PROJECT_ID = "big-math";`
6. Push to GitHub Pages. Done.

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

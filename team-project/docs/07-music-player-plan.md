# 07 · Topic decided — A–B loop practice player

Decided 2026-08-05 by the team. Supersedes the candidate ranking in
`00-topic-selection.md`, which stays as reference only. This document is the
implementation plan; read `06-streaming-review-sol.md` first for the evidence
behind most constraints here.

## Product framing

> A local-first player that lets you mark one hard section of an audio file,
> loop it, and record whether the attempt got better — for people practising
> something, not people browsing a catalogue.

**Target user and situation:** a student practising a specific passage — an
instrument part, a vocal line, a language shadowing clip, or a recording of
their own 발표 rehearsal. The situation is "this 12 seconds is the part I keep
getting wrong."

**Why not a plain music player.** `03-idea-scan-positioning.md` lists as a red
flag "the title could be *My Todo*, *Weather App*, *Movie Search*" — "Music
Player" is that same class of title. It also misses the heaviest green flag,
*"a complete loop: input → decision → result → saved reflection."* A player has
no decision in it. The A–B loop plus a practice log adds exactly that loop while
keeping the file picker, `<audio>` element, and queue the team already wanted.

The decision loop, explicitly:

| Stage | In this app |
| --- | --- |
| Input | Select a file, mark section A→B |
| Decision | Choose how many reps, loop it |
| Result | Mark the attempt 나아짐 / 그대로 / 나빠짐 |
| Saved reflection | Practice log per section, per day |

## Out of scope — decided, do not reopen

| Cut | Reason |
| --- | --- |
| 음정 측정 / pitch detection | Cut 2026-08-05. Real-time autocorrelation in plain JS over 4–5 coding days is the single largest schedule risk, and it was never reviewed. |
| Any audio shipped in the repo | Copyright. Files come from the user's own picker, or CC/public-domain samples only. |
| ID3 / MP4 tag parsing | The File API gives filename, size, and lastModified — **not** title, artist, album, or artwork. Cross-format tag parsing with Korean Unicode is its own feature. Title derives from the filename; artist is an optional editable field. |
| All gestures | No swipe, no long-press, no drag-to-reorder. Visible buttons only — cheaper and accessible. |
| Recommendations, playlists CRUD, a separate Home tab | `06` classifies these as traps. One library screen plus a player sheet is enough. |
| Login, accounts, sync, real-time anything | No backend. `03` flags fake multi-user state as a dead end. |
| MediaRecorder / in-app recording | Not on the critical path once 음정 측정 is cut. Files come in through the picker. See the probe results below if it ever returns. |

## Platform reality — no iPhone on the team

`06-streaming-review-sol.md` item 4 prescribes "integrate on the real iPhone
daily." **That is not executable — nobody on the team owns an iPhone.** This is
the most consequential planning fact in this document, so handle it explicitly
rather than quietly skipping it.

The response is to **constrain to the documented intersection** of Android
Chrome and iOS Safari, so the untestable platform is also the one we never push
against:

| Concern | Decision |
| --- | --- |
| Primary platform | **Android Chrome** (real device) + desktop Chrome. Verified. |
| Secondary check | Desktop Safari 26.5 — real WebKit for codecs, CSS, and API presence |
| Design target | iOS Safari. **Never claim it was verified** — no iPhone, and background playback is untestable without one. |
| Playback formats promised | **MP3 and AAC-in-M4A only.** Both are safe on WebKit and Blink. WebM/Vorbis needs iOS 17.4+, Ogg Opus 18.4+ — so neither is promised. |
| Persistence | `localStorage` for metadata, reselect files after refresh. A deliberate deadline decision, *not* an iOS impossibility — IndexedDB can hold `File`/`Blob` and is a stretch goal at most. |
| Background playback | Not promised. Media Session metadata is a feature-detected progressive enhancement only. |
| `showOpenFilePicker()` | Never used. Chromium-only; iOS Safari's similarly-named File System API is OPFS (origin-private), not durable access to Files-app items. |

**Decided 2026-08-05: Android is the primary platform.** Build and test there.
WebKit gets checked, not chased.

### How iOS actually gets checked

There is **no practical iOS VM** — iOS does not run virtualised, so a VM is not
an option. The real ladder, cheapest first:

| Route | Cost | Answers | Does not answer |
| --- | --- | --- | --- |
| **Desktop Safari + Responsive Design Mode** (Safari 26.5, already installed) | none | Codec support, CSS, JS API presence — genuine WebKit answers | iOS-specific restrictions |
| Xcode iOS Simulator (not installed; multi-hour download) | hours | Safe-area insets, touch, iOS viewport behaviour | Background audio, lock screen — **its Safari runs the host macOS WebKit build, so it is not a different engine from the row above** |
| A borrowed iPhone | availability | Background playback, Media Session, interruptions, Control Center | — |

**Do not install Xcode for this project.** Its marginal value over desktop
Safari is iOS chrome, not a different renderer, and the one thing it cannot
answer — background audio — is the only reason `06` wanted hardware.

So: Android for real testing, desktop Safari for the WebKit sanity check, and
iOS background playback stays **knowingly untested**. That costs nothing here
because this plan never promises background playback in the first place.

If a borrowed iPhone does appear before 08-14, run library → play → loop → log
on it. If not, say so in the presentation — naming a limit you could not test
reads better than implying coverage you do not have, and `CLAUDE.md` records
that stating tech limits is itself graded credit.

**Also unresolved:** what device the 08-14 demo runs on. If it is a projector
fed by a laptop, the mobile-first layout must still be legible when mirrored or
in a narrow window. Confirm before building the demo script.

## Freeze this in hour one, before either person writes code

`06` is emphatic that splitting by *screen* fails here because player state
crosses every screen. Agree on these shapes first, in one sitting.

```js
// Track — one user-selected file. Persisted (metadata only).
{
  id:           string,   // crypto.randomUUID()
  title:        string,   // filename minus extension; user-editable
  artist:       string | null,  // never auto-filled — File API has no tags
  fileName:     string,
  size:         number,
  lastModified: number,   // name + size + lastModified = re-link identity
  durationSec:  number | null,  // null until loadedmetadata fires
  addedAt:      number
}

// LoopMark — one marked section. Persisted. Belongs to a Track.
{
  id:        string,
  trackId:   string,
  label:     string,   // e.g. "2절 후렴"
  startSec:  number,
  endSec:    number,   // invariant: endSec > startSec
  reps:      number,
  attempts:  Attempt[]
}

// Attempt — one logged rep session. Persisted. This is the "saved reflection".
{ id: string, loopId: string, at: number, result: 'better'|'same'|'worse', memo: string }

// PlayerState — in memory ONLY. Never written to storage.
{
  trackId:      string | null,
  status:       'idle'|'loading'|'playing'|'paused'|'ended'|'error',
  positionSec:  number,
  activeLoopId: string | null,
  error:        { code: string, message: string } | null
}
```

**Session-only, never persisted:** a `Map<trackId, File>` holding the actual
`File` objects, and the current object URL. Both die on refresh by design.

**Storage keys — namespace them.** GitHub Pages project sites share
origin-scoped storage under `*.github.io`, so 냥BTI and this app would collide:

```
abloop:v1:tracks
abloop:v1:loops
abloop:v1:attempts
abloop:v1:schemaVersion
```

Include `schemaVersion` from the first commit and recover from malformed state
rather than throwing.

**Re-link rule.** After a refresh, `localStorage` IDs are useless until
reselected files are matched back. Match on `fileName + size + lastModified`,
handle collisions, and visibly mark unmatched tracks as 파일 다시 선택 필요.
There is no filesystem path to fall back on.

**Error states, named up front:** `NO_FILE_SELECTED`, `DECODE_FAILED`,
`UNSUPPORTED_FORMAT`, `PLAY_BLOCKED` (`NotAllowedError`), `FILE_UNLINKED`,
`STORAGE_FULL`, `BAD_LOOP_RANGE`.

## Audio rules that are not negotiable

From `06`, section "Playback path" — each of these has cost a real project time:

- **One `<audio>` element**, reused. Change `src` per track. WebKit grants
  playback permission per element, so creating new ones re-arms the autoplay
  block.
- **Revoke every object URL** when it stops being current. Never store a blob
  URL — recreate from the `File` each time.
- **`audio.play()` is async.** Do not show "playing" until its Promise resolves;
  catch `NotAllowedError`.
- **First audible playback must come from a direct user gesture.**
- **`accept="audio/*"` is a picker filter, not a decode guarantee.** Trust
  `loadedmetadata` / `error` events over MIME type or file extension.
- **Non-finite `duration` is a real case.** Guard the scrubber against it.

**The scrubber bug — fix it before it ships.** `06` caught this in the
AI-generated research:

```js
// WRONG — a range input defaults to 0–100, so value 50 seeks to 50× duration
audio.currentTime = audio.duration * value;

// RIGHT — min=0, max=durationSec, step=0.1
audio.currentTime = Number(value);
```

**A–B loop implementation note.** Do not drive the loop from `setInterval`. Use
`timeupdate` to detect `currentTime >= endSec` and seek back to `startSec`.
`timeupdate` fires roughly 4×/sec, so expect overshoot of up to ~250 ms — if the
loop point needs to be tighter than that, the fallback is a short
`requestAnimationFrame` poll while looping. Decide which after measuring; do not
build the precise version first.

## MVP scope — three screens

1. **Library** — 파일 추가 button, track list, per-track marked-section count,
   empty state, 전체 삭제. Search over title/artist/filename.
2. **Player sheet** — title, scrubber, play/pause, A/B set buttons, loop list,
   reps input, 나아짐/그대로/나빠짐 buttons. Expands over the library; not a
   separate nav tab.
3. **Practice log** — per section, attempts by date, and a one-line trend
   ("최근 5회 중 3회 나아짐"). This screen is what makes it not a player.

Korean search, minimum viable: normalise stored fields and the query to Unicode
NFC, lowercase Latin, split the query into tokens, and require every token to
match somewhere across title/artist/fileName. 초성 search is a stretch goal.
`Intl.Collator('ko')` is for sorting, not substring matching.

**Never render a filename or user-entered field with `innerHTML`.** Use
`textContent`. User-supplied metadata is untrusted input.

## Two-person split

Split by layer, not by screen, because `PlayerState` crosses all three screens.

| | Person A — audio engine | Person B — UI and persistence |
| --- | --- | --- |
| Owns | File picker, the `<audio>` element, object-URL lifecycle, A–B loop logic, format detection, error taxonomy, Media Session (if time) | Mobile layout shell, library list, search, practice log and trend, `localStorage` read/write and re-link, empty/error rendering, accessibility |
| Talks to the other through | `PlayerState` + the event names agreed in hour one | The same |

Integrate on a real Android device daily. Neither person waits on the other
after hour one, provided the contract above is frozen.

## Accessibility — the cheap version that still counts

Semantic `<button>`, visible focus, accessible names, `aria-pressed` on
repeat/loop toggles, a labelled range with readable time text, focus management
when the player sheet opens and closes, announced errors, `prefers-reduced-motion`
respected, and `env(safe-area-inset-*)` honoured. 44 px targets are one item on
this list, not the whole of it.

## AI correction log — start it now, it is graded

`CLAUDE.md` records that naming the AI limits you hit earns credit, and
`06` item 5 notes this is the strongest evidence available. Four entries already
exist from this project's own research, before a line of app code:

| AI claim | How it was checked | Correction | Design impact |
| --- | --- | --- | --- |
| "The actual Korean top three" streaming services | Compared WiseApp vs Mobile Index for the same month | False — the two disagree on Spotify by roughly 3× (6.22m vs 2.38m). There is no provider-independent ranking | Market section reports the disagreement instead of a ranking |
| Scrubber seek formula | Read the range-input default | `duration * value` with a 0–100 range seeks to 50× duration | `max=duration`, direct assignment |
| "Files can't persist — iOS limitation" | Checked WebKit OPFS and IndexedDB specs | Wrong framing. IndexedDB stores `File`/`Blob`; reselection is a *scope choice* | Documented as a deadline decision, not an impossibility |
| Research designed artist/album/artwork screens | Checked what `File` actually exposes | The File API supplies no ID3/MP4 tags at all | Title from filename; artist optional and editable |

Add a row every time this happens during the build. One verified correction is
worth more in the presentation than a feature.

## Risks and fallbacks

| Risk | Trigger | Fallback |
| --- | --- | --- |
| A–B loop precision feels wrong | `timeupdate` overshoot audible at the loop point | `requestAnimationFrame` poll while looping; if still bad, snap loop bounds to 0.5 s and say so |
| Practice log feels bolted on | Day 3 and nobody has used it | Merge the log into the player sheet as an inline history strip — keeps the decision loop, drops a screen |
| iOS untested at 08-13 | No borrowed device | State it plainly in the presentation and show the Android run |
| Re-link confuses testers | Classmates refresh and think data was lost | Make 파일 다시 선택 필요 the loudest thing on the card, with a one-tap reselect |
| Scope creep back toward a full player | Someone proposes playlists or artwork | This document's out-of-scope table is the answer |

## Probe result — MediaRecorder, for the record

Tested 2026-08-05 on desktop Chrome (Blink) via a local probe page. Kept here in
case in-app recording returns to scope.

| Format | Record | Play back |
| --- | --- | --- |
| `audio/mp4` and its AAC-LC variant | yes | yes |
| `audio/webm` and its Opus variant | yes | yes |
| `audio/aac`, `audio/mpeg`, `audio/wav`, Ogg+Opus | no | yes |

**The portable conclusion: MP3 cannot be recorded in any browser.** Recording
yields AAC-in-MP4 or Opus-in-WebM. Since playback here is promised as MP3/AAC,
**AAC-in-MP4 is the only format that satisfies both directions** — that is the
one to request if recording is ever added.

Untested: WebKit behaviour, and the actual microphone round trip (it needs a
secure context, so it only runs once the app is on GitHub Pages over HTTPS).

## Related

- `06-streaming-review-sol.md` — the evidence for nearly every constraint above
- `04-streaming-ui-models.md` — borrow/trap table; treat its figures as a dated
  Aug-2025 snapshot and its price sections as needing a checked date
- `03-idea-scan-positioning.md` — green/red flags this plan is measured against
- `00-topic-selection.md` — the superseded candidate ranking
- Class notes: `Study/AI-Web-Content-Practical-Skills/` in the private vault

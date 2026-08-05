You are a critical reviewer. Review a project plan for feasibility, factual accuracy, and internal consistency. **Report findings only — do not create, edit, or delete any file.**

## What to review

Primary: `team-project/docs/08-concept-warm-vinyl.md` — a concept decision written by Claude today, **never reviewed by anyone**.

It declares that it supersedes the product framing, MVP scope and data contract of `team-project/docs/07-music-player-plan.md`, while keeping the rest of `07` binding. Verify that claim holds.

Read for context, in this order:
- `07-music-player-plan.md` — the superseded plan; its audio rules and platform constraints are still in force
- `03-idea-scan-positioning.md` — the red-flag / green-flag test the concept must pass
- `06-streaming-review-sol.md` — an earlier review that classified certain features as traps
- `../CLAUDE.md` and `../AGENTS.md` — project constraints

## The situation, stated honestly

- **Two people.** One graded deliverable, presented **2026-08-14**. Today is 2026-08-05.
- Realistically **~4 clean working days** remain: 08-07 is a diagnostic programme and 08-11 has a guest lecture, both of which consume most of a day.
- Before any code, the team owes six pipeline artifacts they have not started — 페르소나, 공감지도·여정맵, 유저 시나리오, IA, 유저 플로우, 와이어프레임 — plus a 무드보드, plus a presentation deck that must include every prompt used.
- The instructor requires a **completed Figma design before coding begins**.
- The app itself is a mobile-first web app: four bottom tabs, audio playback, mood tagging, a diary, search, and localStorage persistence.

## What to check, in priority order

### 1. Is this buildable at all in the time available?

This is the most important question. Be blunt. If the scope cannot fit, say so and say precisely what to cut. Do not soften it. A plan that produces a half-finished app on 08-14 is worse than a smaller plan that finishes.

Consider specifically:
- Four tabs plus a player sheet is five distinct screens. `07` originally scoped three.
- Both playlists and mood tags are currently specified as grouping mechanisms.
- Does the pipeline documentation load leave enough days to build anything?

### 2. Verify the factual claims

Do not trust the document's own assertions. Check them:

- That the File API exposes only filename, size and lastModified — never title, artist, album, or artwork — and that reading embedded artwork therefore requires parsing the file. State what would actually be involved.
- That MP3 and AAC are the safe universal decode targets for mobile browsers, and the stated iOS version thresholds for WebM/Vorbis and Ogg Opus in `07`.
- That `HTMLMediaElement.play()` returns a promise which rejects with `NotAllowedError` absent a user gesture.
- The named audio sources — Free Music Archive, ccMixter, Pixabay Music, Jamendo, incompetech. For each: what licence actually applies, whether attribution is required, and whether any of them are *not* safe to assume are freely licensed. Flag any that are riskier than the document implies.
- Whether re-linking a picked file on `fileName + size + lastModified` is sound, and what its failure modes are.

### 3. Legal exposure

The repository is **public**. The plan bundles audio files.

- Is the CC/public-domain approach as described actually sufficient, or are there conditions the document misses (attribution format, ShareAlike obligations, NonCommercial clauses, and whether a course project counts as commercial)?
- Is there anything else in the plan with a licensing or privacy problem?

### 4. Information architecture

- Four tabs: 홈 / 라이브러리 / 탐색 / 마이페이지. Content is assigned to each in §MVP scope. Is anything still homeless, duplicated, or in an unintuitive place?
- The document itself flags two unresolved placements — the 기분 일기 history, and playlist/mood-tag duplication. Give a concrete recommendation on each rather than restating the problem.
- A course rule caps mobile app depth at 2 levels, 3 maximum. Does this structure violate it?
- Is `탐색` a defensible label for a screen that searches only the user's own files?

### 5. Does the concept survive its own test?

`03` requires a complete loop: input → decision → result → saved reflection, and red-flags projects whose title could be *My Todo* or *Weather App*. `06` classified recommendations, playlist CRUD and a separate Home tab as traps — the current plan contains all three. Is the justification for reintroducing them sound, or is it rationalisation?

### 6. Data contract

The `Track` / `DiaryEntry` / `PlayerState` shapes in §Data contract. What breaks in practice? Look for missing fields, migration problems, and anything that will force a schema change mid-build.

## Output

Report to stdout, most severe first:

```
[SEVERITY] file §section — one-line claim
  Claim:    what the document asserts or assumes
  Reality:  what is actually true, with a URL where the claim is checkable
  Fix:      the specific change to make
```

Severity: `BLOCKER` (the plan fails as written), `WRONG` (factually false), `UNSUPPORTED` (may be true, not established), `RISK` (legal, schedule, or scope exposure), `WEAK` (reasoning does not hold).

Finish with two short paragraphs:
1. **Verdict on feasibility** — can two people deliver this by 08-14, and if not, the smallest cut that makes it possible.
2. **The single highest-value change** to the plan.

Only report problems. If a category is clean, say so in one line. If you cannot verify something, mark it `UNVERIFIED` and say what you tried — never guess.

## Constraints

- **Do not modify any file.** Report only.
- No git commands.
- Do not touch `nyangbti/`.

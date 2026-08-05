# 08 · Concept decided — Warm Vinyl (mood-first local player)

Decided 2026-08-05 by the team, after the teammate's concept design.
**Supersedes the product framing in `07-music-player-plan.md`.** The A–B loop
practice tool is dropped.

`07` is not obsolete — its audio rules, platform reality, accessibility list,
error taxonomy and AI correction log all still apply. Read it for those. Only
its *product framing*, *MVP scope* and *data contract* are replaced here.

## Product framing

> 오늘의 기분을 고르면 내 음악 중에서 어울리는 곡을 꺼내 주고, 다 듣고 나서
> 그날의 기분을 한 줄로 남겨 두는 플레이어.

The complete loop `03-idea-scan-positioning.md` asks for, kept intact:

| Stage | In this app |
| --- | --- |
| Input | 오늘의 기분 선택 |
| Decision | 추천된 곡 중에서 고르기 · 재생 |
| Result | 들은 곡과 그때의 기분이 남음 |
| Saved reflection | **오늘의 기분 일기** — 날짜별로 누적 |

**Why this is not "Music Player".** `03`'s red flag is a title that could be
*My Todo* or *Weather App*. "기분 일기가 붙은 플레이어" survives that test the
same way the A–B loop did: there is a decision and a saved reflection in it.
A pure player has neither.

**Why it is not Spotify.** We are not competing on catalogue — we have none.
The differentiator is that the library is *yours* and the app remembers how
each track felt, which a streaming service deliberately does not do.

## The content problem — solved before anything else

**No catalogue. No licences. The repo is public.**

Shipping commercial tracks would be infringement, permanently visible in git
history. Streaming APIs are out — no backend, and none of Spotify/YT Music/Melon
permit this use.

Two legal sources, both used:

| Source | Role | Rules |
| --- | --- | --- |
| **Bundled demo set** | So 08-14 works without depending on a laptop's file picker | **CC or public-domain only.** Every file's licence and attribution recorded in `assets/audio/CREDITS.md` before it is committed |
| **User's own files** | The real library | File picker, as in `07`. Never uploaded anywhere |

Practical limits for the bundled set:

- Target **8–12 tracks, 30–60 s each**, not 20 full songs. Keep the whole
  folder **under ~20 MB** — this repo already had a 14 MB → 1.6 MB history
  cleanup on 08-05, and audio bloats git far worse than images.
- MP3 or AAC only (`07`'s format rules — MP3/AAC are the only universally safe
  decode targets).
- Candidate sources to verify licence on, one by one: Free Music Archive,
  ccMixter, Pixabay Music, Jamendo, incompetech. **Verify each track's licence
  individually** — "the site is free" is not a licence.
- If the licence cannot be established in under a minute, drop the track.

**Album artwork does not exist.** The File API returns filename, size and
lastModified — not title, artist, or artwork (`07`). The concept design's album
covers must therefore be either (a) shipped with the bundled demo set under the
same licence check, or (b) a generated placeholder — a colour/pattern derived
from the mood tag. **(b) is the honest default for user-picked files**, and it
should be designed as a real state, not treated as a missing image.

## MVP scope — four destinations

The concept design's bottom nav is kept. It satisfies 3-2's 모바일 앱 하단 4~5,
which `07`'s two-destination structure did not.

| Tab | Contents | Notes |
| --- | --- | --- |
| **홈** | 기분 선택 → 지금 재생 중 → 오늘의 추천 → 오늘의 기분 일기 | The concept design's screen |
| **내 마음** | 기분 일기 히스토리 · 기분별 통계 | Where the saved reflection accumulates |
| **탐색** | 내 라이브러리 · 파일 추가 · 검색 · 기분 태그 편집 | This is the file library, renamed |
| **마이** | 저장 용량 · 전체 삭제 · 앱 정보 | **계정·로그인 없음** |

- **`마이` must not look like an account.** `03` flags fake multi-user state as
  a dead end, and 냥BTI hit the identical trap (04-ia §4-1). No profile photo,
  no 로그인, no 회원 정보 — settings and data controls only. The concept design's
  avatar in the header should become a settings entry or be removed.
- **오늘의 추천 is a filter over the user's own library**, not a catalogue.
  `JAZZ 24곡` style counts only ever reflect what the user actually has.
- Player is a sheet over 홈, not a fifth tab (kept from `07`).

## Data contract — freeze this before either person writes code

Replaces `07`'s Track/LoopMark/Attempt model.

```js
{ id, title, artist, fileName, size, lastModified, durationSec,
  addedAt, source: 'bundled' | 'picked', moods: [] }      // Track
{ id, date, mood, text, trackIds: [] }                     // DiaryEntry
{ trackId, status, positionSec, queue: [], repeat, shuffle } // PlayerState (memory only)
```

- Keys — `warmvinyl:v1:tracks | diary | schemaVersion`
- **Re-link picked files on `fileName + size + lastModified`**, as in `07`.
  A `File` handle does not survive a reload; the metadata does.
- `moods` is an array — a track can be both 차분함 and 비 오는 날.
- Mood vocabulary is **fixed and small** (5–6), decided before coding. A free
  text mood field makes the 추천 filter meaningless.
- `title` derives from the filename for picked files; `artist` is optional and
  user-editable. No ID3 parsing (`07`).

## Still binding from `07`

- Audio format rules, `play()` being async and throwing `NotAllowedError`
- No iPhone on the team — iOS is a design target the team cannot verify
- `textContent`, never `innerHTML`, for any filename or user-entered field
- Accessibility list, error taxonomy, the AI correction log
- No backend, no accounts, no gestures

## Open — decide with the teammate

1. **Mood vocabulary** — which 5–6, and their Korean labels
2. **Bundled demo set** — who sources it and verifies licences
3. **Artwork strategy** — generated placeholder vs bundled art vs both
4. **Stack** — the React/Vue/Svelte approval was granted for 냥BTI. Confirm it
   covers this project before assuming it. `07`'s plain-JS assumption is still
   the lower-risk choice for two people in four days.

## The concept design is a 무드보드, not a wireframe

The teammate's `example.png` is **AI-generated, so it is a flat image** — the
exact failure 3-3/3-4 warned about, and the one the instructor's own demo hit.
It cannot be edited, and it is not a wireframe.

- Use it as the **무드보드 (pipeline step 8)** and as the visual reference —
  which is genuinely valuable, and the colour/tone direction is strong
- The wireframe (step 7) still has to be built as **editable Figma nodes**,
  grey-box, before any design work — same as 냥BTI
- Worth citing in the presentation's AI-limits section

## Related

- `07-music-player-plan.md` — audio rules, platform reality, accessibility (still binding)
- `03-idea-scan-positioning.md` — the red/green flag test this concept is measured against
- `06-streaming-review-sol.md` — evidence behind the constraints
- `04-streaming-ui-models.md` · `05-streaming-facts-verified.md` — Spotify/YT Music/Melon research, now directly relevant

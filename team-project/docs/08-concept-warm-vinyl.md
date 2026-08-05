# 08 · Concept decided — Warm Vinyl (mood-first local player)

Decided 2026-08-05 by the team, after the teammate's concept design.
**Supersedes the product framing in `07-music-player-plan.md`.** The A–B loop
practice tool is dropped.

`07` is **not** wholesale binding — that blanket claim was wrong (sol review,
2026-08-05). Its out-of-scope table bans bundled audio, recommendations,
playlist CRUD and a separate Home tab; its audio section specifies A–B looping;
its error taxonomy carries `BAD_LOOP_RANGE`; its work split and fallbacks assume
loops and practice logs. All of that is superseded.

**Whitelist — only these parts of `07` remain in force:**

- Platform reality (no iPhone; iOS is a design target the team cannot verify)
- Audio format rules and generic playback lifecycle, **excluding A–B loop logic**
- Korean search rules
- Security rules (no `innerHTML` / `dangerouslySetInnerHTML` on untrusted fields)
- The accessibility list
- The AI correction log

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
history.

Streaming integrations are cut **by scope, not by law** (correction, sol review
2026-08-05). Spotify's Web Playback SDK and YouTube's IFrame API do permit
browser playback under their own conditions; the earlier claim that none permit
this use was unsupported. They are out because they add authentication, network
dependence, service-specific UX and policy obligations, and because they
undermine the point of a local library — not because they are prohibited.

Two legal sources, both used:

| Source | Role | Rules |
| --- | --- | --- |
| **Bundled demo set** | So 08-14 works without depending on a laptop's file picker | **Verified CC0 or CC BY only** (see rules below). Every file recorded in `public/audio/CREDITS.md` before it is committed, and credited inside the deployed app |
| **User's own files** | The real library | File picker, as in `07`. Never uploaded anywhere |

Practical limits for the bundled set:

- Target **8–12 tracks, 30–60 s each**, not 20 full songs. Keep the whole
  folder **under ~20 MB** — this repo already had a 14 MB → 1.6 MB history
  cleanup on 08-05, and audio bloats git far worse than images.
- MP3 or AAC only (`07`'s format rules — MP3/AAC are the only universally safe
  decode targets).
- **Accept only verified CC0 or CC BY recordings.** Not "CC or public domain"
  broadly (sol review) — NC depends on use rather than student status, SA governs
  redistributed adaptations, and ND can forbid distributing a trimmed excerpt.
  A public-domain *composition* does not make a modern *recording* public domain.
- **Pixabay is removed from the candidate list.** It uses a proprietary Content
  License, not CC, and prohibits standalone redistribution — which is exactly what
  raw audio committed to a public music-player repo is.
- Remaining candidates, each **verified per track, never per site**:
  - **Free Music Archive** — licences are per-track and include NC/ND/SA; some
    retired tracks are listen-only
  - **ccMixter** — remixes can carry multiple contributors and sample sources; the
    whole chain must permit redistribution
  - **Jamendo Music** only (individually verified CC0/CC BY). **Not** Jamendo
    Licensing, which is a separate paid marketplace, and not API-derived files
  - **incompetech** — free option is CC BY and requires **visible** credit; the
    no-attribution route is paid
- Record per track: 제목 · 제작자 · 출처 URL · 정확한 라이선스와 버전 · 받은 날짜 ·
  **자르거나 변환했다는 사실**
- **Credits must appear in the deployed app**, not only in the repo — CC BY
  requires credit where users can readily find it
- If the licence cannot be established with certainty, drop the track.

**Embedded artwork is unavailable without tag parsing.** `File` exposes `name`
and `lastModified` and inherits `size`, `type` and the bytes from `Blob` — but it
does not parse music tags. Artwork may well be embedded in the bytes; reading it
would mean handling ID3v2 `APIC` frames for MP3 and `meta`/`ilst`/`covr` atoms for
MP4/M4A, including encodings and malformed data. **Tag parsing stays out of
scope**, so in practice there is no cover art for picked files.

Covers are therefore either (a) shipped with the bundled demo set under the same
licence check, or (b) a generated placeholder derived from the mood tag.
**(b) is the default for user-picked files**, and it must be designed as a real
state, not treated as a missing image.

## MVP scope — four destinations

The concept design's bottom nav is kept. It satisfies 3-2's 모바일 앱 하단 4~5,
which `07`'s two-destination structure did not.

**탭 4개 확정 (Srit, 2026-08-05)** — `home` · `library` · `explore` · `myPage`.
아래 배치는 그 4개에 모든 내용을 빠짐없이 넣은 것이며, 표시 아래 두 항목은
**되돌릴 수 있는 배치 판단**이다.

| Tab | Contents | Notes |
| --- | --- | --- |
| **홈** | 기분 선택 → 오늘의 추천 → 지금 재생 중 → 오늘의 기분 일기(쓰기) | The concept design's screen |
| **라이브러리** | 사용자가 만들고 저장한 플레이리스트 · **기분 일기 히스토리** [배치 판단] | "내가 쌓은 것"이 모이는 곳 |
| **탐색** | 곡 검색 (제목·아티스트·파일명) · **파일 추가** [배치 판단] | 곡을 찾고 들여오는 곳 |
| **마이페이지** | 저장 용량 · 전체 삭제 · 앱 정보 | **계정·로그인 없음** |

- **`마이페이지` must not look like an account.** `03` flags fake multi-user
  state as a dead end, and 냥BTI hit the identical trap (04-ia §4-1). No profile
  photo, no 로그인, no 회원 정보 — settings and data controls only. The concept
  design's header avatar should become a settings entry or be removed.
- **오늘의 추천 is a filter over the user's own library**, not a catalogue.
  `JAZZ 24곡` style counts only ever reflect what the user actually has.
- **탐색 searches the user's own tracks only.** There is no catalogue to
  discover from. Search covers title / artist / fileName per `07`'s Korean
  search rules (NFC normalise, token AND-match).
- Player is a sheet over 홈, not a fifth tab (kept from `07`).

### 두 가지 미해결 — 팀에서 확정할 것

1. **기분 일기 히스토리의 위치.** 원래 `내 마음` 탭에 있었으나 탭 구성이 바뀌며
   갈 곳이 없어졌다. 여기서는 라이브러리에 두었지만, **이 앱이 플레이어가 아닌
   근거가 바로 이 일기**(`03`의 saved reflection)이므로 묻히면 차별점이 사라진다.
   대안 — 라이브러리 안에 탭으로 분리 / 홈에서 1뎁스 아래 / 탭 이름을 바꿔 되살리기
2. **플레이리스트와 기분 태그가 조직화 수단으로 중복된다.** `06`은 playlists
   CRUD를 트랩으로 분류했다. 기분 태그가 이미 곡을 묶는 축이라면, 수동
   플레이리스트까지 만들 필요가 있는지 4일 일정 안에서 재검토할 것.
   대안 — 플레이리스트를 **기분별 자동 묶음**으로 정의하면 둘이 하나가 된다

## Data contract — freeze this before either person writes code

Replaces `07`'s Track/LoopMark/Attempt model.

```js
{ id, title, artist, fileName, size, lastModified, durationSec,
  addedAt, source: 'bundled' | 'picked', moods: [] }      // Track
{ id, date, mood, text, trackIds: [] }                     // DiaryEntry
{ trackId, status, positionSec, queue: [], repeat, shuffle } // PlayerState (memory only)
```

- Keys — `warmvinyl:v1:tracks | diary | schemaVersion`
- **Re-link picked files on `fileName + size + lastModified`** — but treat this as
  a **heuristic, not an identity** (sol review). Different files can share the
  tuple, copies preserve it, and renaming or a changed timestamp produces false
  negatives. Auto-link only on a unique match; on collision make the user choose;
  always allow manual re-linking. Do not add hashing unless testing shows the
  heuristic is inadequate.
- Reselection is **this MVP's storage decision, not an API limit.** A `File` is
  serializable and could be persisted via IndexedDB; we store metadata only in
  `localStorage` and accept re-picking.
- `moods` is an array — a track can be both 차분함 and 비 오는 날.
- Mood vocabulary is **fixed and small** (5–6), decided before coding. A free
  text mood field makes the 추천 filter meaningless.
- `title` derives from the filename for picked files; `artist` is optional and
  user-editable. No ID3 parsing (`07`).

## Still binding from `07`

- Audio format rules, and that `play()` returns a **Promise that rejects** with a
  `DOMException` named `NotAllowedError` — use `try/catch` around `await` and test
  `error.name`. It does not throw synchronously
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

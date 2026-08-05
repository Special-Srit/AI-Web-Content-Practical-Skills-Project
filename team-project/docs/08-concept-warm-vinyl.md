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

- Target **4–5 tracks, 30–60 s each** (cut from 8–12, sol review). Keep the whole
  folder **well under ~20 MB** — this repo already had a 14 MB → 1.6 MB history
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

**탭 4개 확정 (Srit, 2026-08-05, sol 검토 반영)** — `홈` · `보관함` · `일기` · `설정`.
3-2의 모바일 앱 하단 4~5를 만족한다.

앞선 `home / library / explore / myPage` 안은 폐기했다. 이유는 취향이 아니라 결함
두 가지였다 — **트랙 목록·기분 태그 편집·제목 수정이 어느 탭에도 없었고**, 앱의
차별점인 기분 일기가 하위에 묻혀 있었다.

| Tab | Contents | Notes |
| --- | --- | --- |
| **홈** | 기분 선택 → 오늘의 추천 → 지금 재생 중 | 컨셉 디자인의 화면 |
| **보관함** | **전체 트랙 목록** · 검색 · 파일 추가 · 기분 태그 편집 · 제목/아티스트 수정 | 곡에 관한 모든 것 |
| **일기** | 오늘의 일기 쓰기 · 날짜별 히스토리 · 기분별 보기 | 최상위. 이게 차별점이다 |
| **설정** | 음원 크레딧 · 전체 삭제 · 앱 정보 | **계정·로그인 없음** |

- **플레이어는 전역 시트다** — 홈 전용이 아니다. 보관함이나 일기에서 재생을
  시작해도 같은 시트가 뜬다. 탭이 아니다
- **`설정`을 계정 화면처럼 만들지 말 것.** `03`은 가짜 다중 사용자 상태를 막다른
  길로 분류했고 냥BTI도 같은 함정을 밟았다(04-ia §4-1). 프로필 사진·로그인·회원
  정보 없음. 컨셉 디자인 헤더의 아바타는 설정 진입점으로 바꾸거나 없앤다
- **오늘의 추천은 내 라이브러리를 거르는 것**이지 카탈로그가 아니다. `JAZZ 24곡`
  같은 숫자는 사용자가 실제로 가진 곡만 반영한다
- **검색 대상은 내 트랙뿐이다.** title / artist / fileName에 대해 `07`의 한글 검색
  규칙(NFC 정규화, 토큰 AND 매치)을 적용

### 범위 재확정 (2026-08-05 저녁, 팀원 레이아웃 반영)

팀원이 보낸 `example_layout.png`가 **홈/보관함/일기/설정 4탭 구조를 그대로 반영**해
왔다. 그 레이아웃대로 만들기로 확정했으므로, 오후에 잘라냈던 항목 중 일부를 되살린다.

| 항목 | 상태 |
| --- | --- |
| 재생목록(queue) · ⏮⏭ · 셔플 · 반복 | **복원.** 레이아웃의 재생 컨트롤이 이걸 전제한다 |
| 즐겨찾기 ♡ | **복원.** 지금 재생 중에 있음 |
| 번들 곡 앨범 아트 | **복원.** 우리가 직접 넣는 파일이므로 아트도 함께 넣을 수 있다 |
| 알림 · 테마 설정 · 계정 아이콘 · 햄버거 | **레이아웃대로 유지** (§구현상 주의) |
| 수동 플레이리스트 CRUD | **계속 없음.** 레이아웃에도 없다. 기분 태그가 그 역할을 한다 |
| 번들 데모 곡 수 | **4~5곡** 유지 |

### 구현상 주의 — 범위가 아니라 가능/불가능의 문제

- **알림은 인앱·로컬 알림까지만.** 백엔드가 없으므로 푸시 알림은 만들 수 없다
  (서비스 워커 + 푸시 서비스가 필요하다). 설정의 `알림` 항목은 앱 안에서
  동작하는 알림만 다룬다
- **`계정 아이콘`을 계정 기능으로 만들지 말 것.** 아이콘은 레이아웃대로 두되
  로그인·회원가입·프로필 편집으로 이어지지 않는다. 설정 진입점 또는 앱 정보다.
  `03`이 가짜 다중 사용자 상태를 막다른 길로 분류했다
- **앨범 아트는 번들 곡만 가능하다.** 사용자가 고른 파일은 ID3/MP4 태그 파싱 없이
  아트를 얻을 수 없고, 파싱은 범위 밖이다. picked 트랙은 `MoodArtwork`
  플레이스홀더를 쓴다 — 레이아웃의 **LP판 그래픽 자체가 좋은 플레이스홀더**다.
  기분에 따라 색만 바꾸면 "빠진 이미지"가 아니라 정식 상태로 읽힌다
- **기분 라벨은 우리 어휘를 쓴다** (차분함·설렘·위로·집중·그리움).
  레이아웃의 따뜻함·센치함·휴식·몽환·활기는 아이콘과 함께 이 5개로 교체한다
- **보관함 행이 빽빽하다.** 제목·아티스트·태그/제목 수정·기분 아이콘 3개·⋮ 메뉴가
  한 줄에 들어간다. 390px 폭에서 각 타깃이 44px를 넘는지 실제 크기로 확인할 것

## Data contract — freeze this before either person writes code

`07`의 Track/LoopMark/Attempt 모델을 대체한다.

```js
// Track
{ id, title, artist, fileName, size, lastModified, durationSec,
  addedAt, source: 'bundled' | 'picked',
  assetUrl,        // 번들 곡의 재생 경로. picked면 null
  artworkUrl,      // 번들 곡만. picked면 null → MoodArtwork로 대체
  favorite,        // ♡
  moods: [MoodId] }

// DiaryEntry
{ id, localDate, createdAt, mood: MoodId, text, trackIds: [] }

// PlayerState — 메모리만
{ trackId, status, positionSec, error,
  queue: [trackId], queueIndex,
  repeat: 'off' | 'one' | 'all',
  shuffle: false }
```

- `status` — `'idle' | 'loading' | 'playing' | 'paused' | 'error'`. 이 5개가 전부다
- `queue`는 **현재 기분 필터의 결과**를 담는다. 사용자가 손으로 만드는 목록이 아니다
- `shuffle`은 `queue`의 재생 순서만 바꾼다. 원본 배열은 건드리지 않는다
- `error` — `{ code, message }` 또는 `null`. 코드는 `07`의 에러 분류를 따르되
  **`BAD_LOOP_RANGE`는 제외**한다 (A–B 루프가 사라졌으므로)
- **`assetUrl`이 없으면 번들 곡을 재생할 방법이 없다** — sol 검토에서 잡힌 구멍
- Keys — `warmvinyl:v1:tracks | diary | schemaVersion`
- **`MoodId`는 안정적인 영문 식별자**이고 화면 라벨과 분리한다. 라벨을 바꿔도
  저장된 데이터가 깨지지 않게 하기 위한 것

  | MoodId | 라벨 |
  | --- | --- |
  | `calm` | 차분함 |
  | `flutter` | 설렘 |
  | `comfort` | 위로 |
  | `focus` | 집중 |
  | `longing` | 그리움 |

- **같은 어휘를 음악 필터와 일기에 함께 쓴다.** 목록 하나, 용도 둘
- `localDate`는 `YYYY-MM-DD` 로컬 기준 문자열, `createdAt`은 ISO 타임스탬프.
  **하루 한 건**이며 같은 날 다시 쓰면 덮어쓴다
- **트랙을 지우면 일기의 `trackIds`가 고아가 된다.** 일기는 지우지 않고, 사라진
  트랙은 "삭제된 곡"으로 표시한다. 기록이 조용히 바뀌면 안 된다
- **Re-link picked files on `fileName + size + lastModified`** — 단 이것은
  **식별자가 아니라 휴리스틱**이다(sol 검토). 서로 다른 파일이 같은 튜플을 가질 수
  있고, 복사본은 튜플을 보존하며, 이름이나 타임스탬프가 바뀌면 못 찾는다.
  유일하게 일치할 때만 자동 연결하고, 충돌하면 사용자가 고르게 하며, 수동 재연결을
  항상 허용한다. 해싱은 휴리스틱이 부족하다는 게 확인되기 전에는 넣지 않는다
- Reselection is **this MVP's storage decision, not an API limit.** `File`은
  직렬화 가능하고 IndexedDB에 넣을 수도 있다. 우리는 메타데이터만 저장하고 다시
  고르게 하는 쪽을 택했다
- 로드 시 **형식 검증**을 하고, 깨진 데이터는 초기화 경로로 보낸다.
  `schemaVersion`은 있는 것만으로는 아무 일도 하지 않는다
- **전체 삭제는 `warmvinyl:*` 키만 지운다.** `localStorage.clear()` 금지 —
  같은 오리진의 다른 페이지 데이터까지 날아간다
- `title`은 picked 파일의 파일명에서 유도하고 `artist`는 선택 입력이다. ID3 파싱 없음

### 저장·프라이버시에 관한 정직한 표현

- "파일이 업로드되지 않는다"는 **API 보장이 아니라 구현 약속**이다. 분석 스크립트나
  서드파티 런타임 스크립트를 넣지 않고, 파일 선택 후 네트워크 탭으로 확인한다
- GitHub Pages 프로젝트 사이트는 **소유자 단위로 오리진을 공유**한다. 같은 오리진의
  다른 페이지가 같은 `localStorage`에 접근할 수 있다. 키 네임스페이스는 충돌을 막을
  뿐 접근을 막지 못한다. 앱 안에서 이 점을 숨기지 말고 그대로 알린다

## Still binding from `07`

- Audio format rules, and that `play()` returns a **Promise that rejects** with a
  `DOMException` named `NotAllowedError` — use `try/catch` around `await` and test
  `error.name`. It does not throw synchronously
- No iPhone on the team — iOS is a design target the team cannot verify
- `textContent`, never `innerHTML`, for any filename or user-entered field
- Accessibility list, error taxonomy, the AI correction log
- No backend, no accounts, no gestures

## Open — decide with the teammate

1. ~~Mood vocabulary~~ → **정함**: calm·flutter·comfort·focus·longing (§Data contract)
2. **Bundled demo set** — 누가 구하고 라이선스를 확인할지. **CC0 또는 CC BY만**
3. ~~Artwork strategy~~ → **정함**: 기분 기반 플레이스홀더 하나로 통일. 번들 아트 없음
4. ~~Stack~~ → **정함**: React + Vite. 강사가 웹에서 보이는 것이면 무엇이든 허용
5. 기분 플레이스홀더의 시각적 형태 — 디자인 단계에서

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

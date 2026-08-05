# 08 · Concept decided — Music Diary (mood-first local player)

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

## 이름 — Music Diary (2026-08-05 저녁 확정, 3차 변경)

- 팀 이름 **Clova (클로바)** · 앱 이름 **Music Diary**, 화면 표기는 **음악 일기**
  - 팀과 앱은 **다른 이름**이다. 발표에서 팀이 발표하고, 만든 것이 앱이다
- 이름 변천 — `Warm Vinyl` → `Vibe Vinyl` → `TuneBox` → **`Music Diary`**.
  `Warm Vinyl`은 설정의 **테마 이름**으로 남긴다 (테마는 하나뿐, 전환 기능 없음)
- `localStorage` 키 접두사도 `musicdiary:`로 맞췄다. **코드가 아직 없어 비용이 0이다**

### 이름에 딸려 오는 것 두 가지

1. **탭 이름과 앱 이름이 겹친다.** `일기`는 5개 탭 중 하나인데 앱 전체 이름도 일기다.
   - 나쁘게 보면 — 5분의 1짜리 기능이 이름을 독점한다
   - 좋게 보면 — `03`의 saved reflection 테스트를 통과하는 근거가 바로 그 일기이므로,
     **이름이 차별점을 정확히 가리킨다.** `TuneBox`는 그냥 플레이어처럼 들렸다
   - 화면에서는 탭을 `일기`, 앱을 `음악 일기`로 불러 구분한다
2. **이름을 이제 고정할 것.** 오늘 하루에 3번 바뀌었다. 지금은 파일명·문서·저장 키만
   고치면 되지만, **팀원이 코드를 시작한 뒤에는** 컴포넌트명·키·배포 경로·발표자료까지
   따라 움직인다. 발표 자료에 넣기 전에 확정할 것

## Product framing## Product framing

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

## MVP scope — 탭 5개

**확정 (Srit, 2026-08-05 저녁)** — 팀원의 `ia structure.png`를 채택하되 **만들 수
없는 것을 걷어낸 버전**이다. 3-2의 모바일 앱 하단 4~5 안에 든다.

| Tab | 내용 |
| --- | --- |
| **홈** | 기분 선택 5개 → 오늘의 추천 → 최근 재생 |
| **라이브러리** | 업로드한 음악 · 좋아요한 음악 · 최근 재생 · **내 플레이리스트** |
| **탐색** | 검색 · **분위기별** 모아보기 |
| **일기** | 날짜별 히스토리 · 일기 작성 (음악 연결) |
| **마이** | 음악 취향 · 재생 설정 · 알림 · 테마 · 이용약관 |

- **미니 플레이어 바가 탭 바 위에 항상 붙어 있다.** 어느 탭에서든 같은 바.
  전역 상태이므로 `09` §1의 단일 오디오 엘리먼트 규칙이 그대로 적용된다
- 전체 화면 플레이어는 미니 바를 눌러 올라오는 시트

### 되살린 것

앞선 4탭 안에서 잘랐던 것 중 이 IA가 다시 요구하는 것:

- **수동 플레이리스트 CRUD** — 생성·곡 추가·순서 변경·삭제
- 좋아요(♡), 최근 재생, 큐·이전/다음·셔플·반복

### 걷어낸 것 — 취향이 아니라 **만들 수 없어서**

| 걷어낸 것 | 왜 |
| --- | --- |
| **장르별** (Jazz · Indie · Lo-fi · Pop) | 장르는 ID3/MP4 태그에 있다. 태그 파싱은 범위 밖 |
| **앨범 · 저장한 앨범** | 앨범도 태그 정보다. 파일에서 못 얻는다 |
| **추천 아티스트** | 아티스트는 사용자가 직접 입력하는 선택 필드일 뿐이고, "추천"은 카탈로그를 전제한다 |
| **이퀄라이저** | Web Audio API 필터 그래프가 필요하다 |
| **크로스페이드** | 오디오 엘리먼트 2개 + gain 노드가 필요하다 → **`09` §1의 단일 엘리먼트 규칙과 정면 충돌** |
| **음질 설정 (320kbps)** | 비트레이트는 설정이 아니라 사용자가 이미 가진 파일의 속성이다 |
| **프로필 사진 · 프로필 수정** | 계정이 없다. `03`이 가짜 다중 사용자 상태를 막다른 길로 분류했다 |
| 햄버거 메뉴 `☰` | 탭이 5개인데 넣을 것이 없다 |

**남기는 재생 설정** — `자동 재생`(다음 곡 이어서), `재생 오프 타이머`(n분 뒤 정지).
둘 다 `<audio>` 하나로 만들 수 있다.

### 기분 어휘는 하나뿐이다 — 세 개가 아니라

IA에는 서로 겹치는 분류가 **세 개** 있다. 전부 같은 질문에 답한다.

1. 홈의 기분 칩 5개
2. 일기의 감정 얼굴 5개
3. 일기의 자유 해시태그 (`#휴식` `#따뜻함` `#감성` `#이유`)

**하나로 합친다.**

- 어휘는 `08` §Data contract의 **`MoodId` 5개뿐**이다
- 홈·탐색에서는 **아이콘 + 라벨**로, 일기에서는 **감정 얼굴**로 보여 준다.
  표현만 다르고 값은 같다
- **자유 해시태그는 만들지 않는다.** 자유 입력이 섞이면 분위기별 필터가 무의미해진다
- 레이아웃의 따뜻함·설렘·휴식·몽환·활기는 **차분함·설렘·위로·집중·그리움으로 교체**한다
  (2026-08-05 확정). 아이콘도 함께 교체

### 뎁스 주의

3-2 기준 **모바일 앱은 2뎁스가 적정, 3뎁스를 넘기지 말 것.**

- `홈 > 오늘의 추천 상세` = 2뎁스 ✓
- `마이 > 재생 설정` = 2뎁스 ✓
- **`라이브러리 > 내 플레이리스트 더보기 > 플레이리스트 상세` = 3뎁스.** 아슬아슬하다
  → 라이브러리에서 **플레이리스트 상세로 바로 가게** 만들어 2뎁스로 유지할 것

## Data contract — freeze this before either person writes code

`07`의 Track/LoopMark/Attempt 모델을 대체한다.

```js
// Track
{ id, title, artist, fileName, size, lastModified, durationSec,
  addedAt, lastPlayedAt,   // 최근 재생 정렬용
  source: 'bundled' | 'picked',
  assetUrl,        // 번들 곡의 재생 경로. picked면 null
  artworkUrl,      // 번들 곡만. picked면 null → MoodArtwork로 대체
  favorite,        // ♡ — 좋아요한 음악
  moods: [MoodId] }

// Playlist — 수동 생성
{ id, name, trackIds: [], createdAt, updatedAt }

// DiaryEntry
{ id, localDate, createdAt, mood: MoodId, text, trackIds: [] }

// PlayerState — 메모리만
{ trackId, status, positionSec, error,
  queue: [trackId], queueIndex,
  repeat: 'off' | 'one' | 'all',
  shuffle: false }
```

- `status` — `'idle' | 'loading' | 'playing' | 'paused' | 'error'`. 이 5개가 전부다
- `queue`는 재생을 시작한 맥락의 곡 목록이다 — 기분 필터 결과, 플레이리스트,
  또는 라이브러리 섹션. 어디서 눌렀는지가 큐를 정한다
- `shuffle`은 `queue`의 재생 순서만 바꾼다. 원본 배열은 건드리지 않는다
- `error` — `{ code, message }` 또는 `null`. 코드는 `07`의 에러 분류를 따르되
  **`BAD_LOOP_RANGE`는 제외**한다 (A–B 루프가 사라졌으므로)
- **`assetUrl`이 없으면 번들 곡을 재생할 방법이 없다** — sol 검토에서 잡힌 구멍
- Keys — `musicdiary:v1:tracks | playlists | diary | settings | schemaVersion`
- **`Playlist.trackIds`의 순서가 곧 재생 순서다.** 순서 변경은 이 배열을 바꾸는 것
- 트랙을 지우면 모든 플레이리스트의 `trackIds`에서도 빼야 한다. 고아 ID를 남기지 말 것
- `settings` — `{ autoPlay, sleepTimerMin, theme, notifications }`. 이게 전부다.
  음질·EQ·크로스페이드는 없다 (§걷어낸 것)
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
- **전체 삭제는 `musicdiary:*` 키만 지운다.** `localStorage.clear()` 금지 —
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
4. ~~Stack~~ → **정함**: React + Vite + shadcn. 강사가 웹에서 보이는 것이면 무엇이든 허용하며,
   **팀 프로젝트에도 적용됨을 08-05 저녁에 확인**(냥BTI 기준으로만 받았던 승인이 해소됨)
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

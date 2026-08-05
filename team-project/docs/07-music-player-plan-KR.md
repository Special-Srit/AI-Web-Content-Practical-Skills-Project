> **이 파일은 영어 원본의 한국어판이다.**
> 원본: `07-music-player-plan.md` — **원본이 정본이고 이 파일은 사본이다.**
> 동기화 시점: 2026-08-05. 원본이 바뀌면 이 파일도 따라 고쳐야 한다.

# 07 · 주제 확정 — A–B 루프 연습 플레이어

팀이 2026-08-05에 확정. 참고용으로 남겨 두는 후보 순위
`00-topic-selection.md`를 대체한다. 이 문서는 구현 계획이며, 여기 제약 대부분의
근거는 먼저 `06-streaming-review-sol.md`를 읽는다.

## 제품 프레이밍

> 오디오 파일의 어려운 구간 하나를 표시하고 반복 재생한 뒤, 시도가 나아졌는지
> 기록할 수 있는 local-first 플레이어 — 카탈로그를 둘러보는 사람이 아니라
> 무언가를 연습하는 사람을 위한 것

**대상 사용자와 상황:** 특정 구절을 연습하는 학생 — 악기 파트, 보컬 라인, 언어
섀도잉 클립, 또는 자신의 발표 리허설 녹음. 상황은 “계속 틀리는 부분이 바로 이
12초다”임.

**일반 음악 플레이어가 아닌 이유.** `03-idea-scan-positioning.md`는 “제목을
*My Todo*, *Weather App*, *Movie Search*라고 해도 되는가”를 레드 플래그로 든다.
“Music Player”도 같은 종류의 제목이다. 또한 가장 강한 그린 플래그인
*“완성된 루프: 입력 → 결정 → 결과 → 저장된 성찰”*도 놓친다. 플레이어에는 결정이
없다. A–B 루프와 연습 기록은 팀이 원했던 파일 picker, `<audio>` 엘리먼트, queue를
유지하면서 정확히 그 루프를 더한다.

결정 루프를 명시하면:

| 단계 | 이 앱에서의 구현 |
| --- | --- |
| 입력 | 파일 선택, A→B 구간 표시 |
| 결정 | 반복 횟수 선택, 반복 재생 |
| 결과 | 시도를 나아짐 / 그대로 / 나빠짐으로 표시 |
| 저장된 성찰 | 구간별·날짜별 연습 기록 |

## 범위 제외 — 확정 사항, 다시 열지 않음

| 제외 | 이유 |
| --- | --- |
| 음정 측정 / pitch detection | 2026-08-05 제외. 4~5일의 코딩 기간에 plain JS로 실시간 autocorrelation을 구현하는 것은 검토되지 않은 가장 큰 일정 위험. |
| 저장소에 포함하는 모든 오디오 | 저작권. 사용자의 picker에서 가져오거나 CC/퍼블릭 도메인 샘플만 사용. |
| ID3 / MP4 tag parsing | File API가 제공하는 것은 filename, size, lastModified이며 title, artist, album, artwork는 제공하지 않음. 한국어 Unicode를 포함한 포맷 간 태그 파싱은 별도 기능. 제목은 파일명에서 유도하고 artist는 선택 편집 필드. |
| 모든 제스처 | 스와이프, 롱프레스, 드래그 정렬 없음. 보이는 버튼만 사용 — 더 저렴하고 접근 가능. |
| 추천, playlists CRUD, 별도 Home 탭 | `06`에서 함정으로 분류. 라이브러리 화면 하나와 player sheet면 충분. |
| 로그인, 계정, 동기화, 모든 실시간 기능 | 백엔드 없음. `03`에서 가짜 다중 사용자 상태를 막다른 길로 분류. |
| MediaRecorder / 인앱 녹음 | 음정 측정을 제외한 뒤에는 핵심 경로가 아님. 파일은 picker로 가져온다. 나중에 다시 범위에 들어오면 아래 probe 결과를 참고. |

## 플랫폼 현실 — 팀에 iPhone 없음

`06-streaming-review-sol.md`의 4번 항목은 “실제 iPhone에서 매일 통합”을 지시한다.
**실행 불가 — 팀에 iPhone을 가진 사람이 없다.** 이 문서에서 가장 중요한 계획
사실이므로 조용히 건너뛰지 말고 명시적으로 처리한다.

대응은 Android Chrome과 iOS Safari의 **문서화된 교집합으로 제한**하는 것. 테스트할
수 없는 플랫폼과도 충돌하지 않게 한다:

| 관심사 | 결정 |
| --- | --- |
| 주 플랫폼 | **Android Chrome**(실제 기기) + 데스크톱 Chrome. 검증됨. |
| 보조 확인 | 데스크톱 Safari 26.5 — 코덱, CSS, API 존재 여부를 확인하는 실제 WebKit |
| 디자인 대상 | iOS Safari. **검증했다고 주장하지 않음** — iPhone이 없고 백그라운드 재생은 iPhone 없이는 테스트 불가. |
| 재생을 약속하는 포맷 | **MP3와 AAC-in-M4A만.** 둘 다 WebKit과 Blink에서 안전. WebM/Vorbis는 iOS 17.4 이상, Ogg Opus는 18.4 이상 필요하므로 어느 것도 약속하지 않음. |
| 지속성 | 메타데이터는 `localStorage`, 새로고침 후 파일 재선택. 의도적인 마감일 결정이지 *iOS 불가능성*이 아님 — IndexedDB는 `File`/`Blob`을 저장할 수 있고 많아야 stretch goal. |
| 백그라운드 재생 | 약속하지 않음. Media Session 메타데이터는 feature-detected progressive enhancement만 적용. |
| `showOpenFilePicker()` | 사용하지 않음. Chromium 전용이며, iOS Safari의 이름이 비슷한 File System API는 OPFS(origin-private)이지 Files 앱 항목에 대한 영구 접근이 아님. |

**2026-08-05 확정: Android가 주 플랫폼.** 여기서 빌드하고 테스트한다. WebKit은
확인하되 쫓아가지 않는다.

### iOS를 실제로 확인하는 방법

**실용적인 iOS VM은 없다** — iOS는 가상화로 실행되지 않으므로 VM은 선택지가 아니다.
비용이 낮은 순서의 실제 단계:

| 방법 | 비용 | 답할 수 있는 것 | 답할 수 없는 것 |
| --- | --- | --- | --- |
| **데스크톱 Safari + Responsive Design Mode** (Safari 26.5, 이미 설치됨) | 없음 | 코덱 지원, CSS, JS API 존재 여부 — 실제 WebKit의 답 | iOS 전용 제한 |
| Xcode iOS Simulator (미설치, 수 시간 다운로드) | 수 시간 | Safe-area inset, 터치, iOS viewport 동작 | 백그라운드 오디오, 잠금 화면 — **Safari가 호스트 macOS WebKit 빌드로 실행되므로 위 행과 다른 엔진이 아님** |
| iPhone 대여 | 가능 여부 | 백그라운드 재생, Media Session, 중단, Control Center | — |

**이 프로젝트에 Xcode를 설치하지 않는다.** 데스크톱 Safari 대비 얻는 한계 이점은
iOS 크롬뿐이며, 답할 수 없는 한 가지 — 백그라운드 오디오 — 는 `06`이 하드웨어를
원한 유일한 이유다.

따라서 실제 테스트는 Android, WebKit sanity check는 데스크톱 Safari, iOS 백그라운드
재생은 **의도적으로 미검증 상태**로 둔다. 이 계획은 애초에 백그라운드 재생을 약속하지
않으므로 비용이 없다.

08-14 전에 iPhone을 빌릴 수 있다면 library → play → loop → log를 실행한다. 그렇지
않으면 발표에서 밝힌다 — 테스트하지 못한 한계를 명시하는 편이 검증 범위를 암시하는
것보다 낫고, `CLAUDE.md`에도 기술 한계를 명시하는 것이 채점상 가점이라고 기록되어
있다.

**추가 미해결 사항:** 08-14 데모를 어떤 기기에서 실행할지. 노트북을 연결한
프로젝터라면 모바일 우선 레이아웃도 미러링 화면이나 좁은 창에서 읽혀야 한다. 데모
스크립트를 만들기 전에 확인한다.

## 두 사람이 코드를 쓰기 전에 첫 한 시간에 동결할 것

`06`은 여기서 화면별 분담이 실패하는 이유를 분명히 한다. 플레이어 상태가 모든
화면을 가로지르기 때문이다. 아래 형태를 먼저 한 번에 합의한다.

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

**세션 전용, 절대 저장하지 않음:** 실제 `File` 객체를 담은 `Map<trackId, File>`과
현재 object URL. 둘 다 새로고침 시 사라지는 것이 의도된 동작.

**저장 키 — namespace 적용.** GitHub Pages 프로젝트 사이트는 `*.github.io` 아래의
origin-scoped storage를 공유하므로 냥BTI와 이 앱이 충돌한다:

```
abloop:v1:tracks
abloop:v1:loops
abloop:v1:attempts
abloop:v1:schemaVersion
```

첫 커밋부터 `schemaVersion`을 포함하고, 잘못된 상태는 throw하지 말고 복구한다.

**재연결 규칙.** 새로고침 후에는 재선택한 파일을 기존 파일에 다시 연결하기 전까지
`localStorage` ID가 무의미하다. `fileName + size + lastModified`로 매칭하고 충돌을
처리하며, 매칭되지 않은 트랙에는 파일 다시 선택 필요를 눈에 띄게 표시한다. 대신
사용할 파일 시스템 경로는 없다.

**처음부터 이름 붙일 오류 상태:** `NO_FILE_SELECTED`, `DECODE_FAILED`,
`UNSUPPORTED_FORMAT`, `PLAY_BLOCKED` (`NotAllowedError`), `FILE_UNLINKED`,
`STORAGE_FULL`, `BAD_LOOP_RANGE`.

## 타협할 수 없는 오디오 규칙

`06`의 “Playback path” 절에서 가져온 규칙 — 각각 실제 프로젝트 시간을 소모한다:

- **`<audio>` 엘리먼트 하나**를 재사용한다. 트랙마다 `src`를 바꾼다. WebKit은
  엘리먼트별로 재생 권한을 부여하므로 새 엘리먼트를 만들면 autoplay 차단이 다시
  활성화된다.
- **현재 사용하지 않는 object URL은 모두 revoke**한다. blob URL을 저장하지 말고 매번
  `File`에서 다시 만든다.
- **`audio.play()`는 비동기다.** Promise가 resolve되기 전에는 “재생 중”을 표시하지
  않고 `NotAllowedError`를 catch한다.
- **처음 소리가 나는 재생은 직접적인 사용자 제스처에서 시작해야 한다.**
- **`accept="audio/*"`는 picker 필터이지 디코드 보장이 아니다.** MIME 타입이나 파일
  확장자보다 `loadedmetadata` / `error` 이벤트를 신뢰한다.
- **유한하지 않은 `duration`도 실제 사례다.** scrubber에서 이를 방어한다.

**Scrubber 버그 — 배포 전에 고친다.** `06`이 AI 생성 연구에서 발견한 버그:

```js
// WRONG — a range input defaults to 0–100, so value 50 seeks to 50× duration
audio.currentTime = audio.duration * value;

// RIGHT — min=0, max=durationSec, step=0.1
audio.currentTime = Number(value);
```

**A–B 루프 구현 메모.** `setInterval`로 루프를 구동하지 않는다. `timeupdate`로
`currentTime >= endSec`를 감지하고 `startSec`으로 seek한다. `timeupdate`는 초당 약
4회 발생하므로 최대 약 250ms의 overshoot가 예상된다. 루프 지점이 그보다 정밀해야
한다면 루프 중 짧은 `requestAnimationFrame` poll을 fallback으로 사용한다. 측정 후
결정하며, 처음부터 정밀 버전을 만들지 않는다.

## MVP 범위 — 화면 3개

1. **Library** — 파일 추가 button, 트랙 목록, 트랙별 표시 구간 수, 빈 상태, 전체 삭제.
   title/artist/filename 검색.
2. **Player sheet** — title, scrubber, 재생/일시정지, A/B 설정 버튼, loop 목록, reps
   input, 나아짐/그대로/나빠짐 버튼. library 위로 펼쳐지며 별도 내비게이션 탭은 아님.
3. **Practice log** — 구간별 날짜별 시도와 한 줄 추세
   (“최근 5회 중 3회 나아짐”). 이것이 일반 플레이어가 아니게 만드는 화면.

한국어 검색의 최소 구현: 저장 필드와 질의를 Unicode NFC로 정규화하고, 라틴 문자를
소문자화한 뒤, 질의를 토큰으로 나눈다. 모든 토큰이 title/artist/fileName 중 어딘가에
매치되어야 통과한다. 초성 검색은 stretch goal. `Intl.Collator('ko')`는 정렬용이지
부분 문자열 매칭용이 아니다.

**파일명이나 사용자 입력 필드를 `innerHTML`로 렌더링하지 않는다.**
`textContent`를 사용한다. 사용자가 제공한 메타데이터는 신뢰할 수 없는 입력이다.

## 2인 분담

`PlayerState`가 세 화면을 모두 가로지르므로 화면이 아니라 계층으로 나눈다.

| | 담당 A — 오디오 엔진 | 담당 B — UI와 지속성 |
| --- | --- | --- |
| 담당 | 파일 picker, `<audio>` 엘리먼트, object-URL 수명 주기, A–B 루프 로직, 포맷 감지, 오류 분류, Media Session(시간이 남으면) | 모바일 레이아웃 셸, 라이브러리 목록, 검색, 연습 기록과 추세, `localStorage` 읽기/쓰기와 재연결, 빈 상태/오류 렌더링, 접근성 |
| 상대와 통신하는 기준 | 첫 한 시간에 합의한 `PlayerState` + 이벤트 이름 | 동일 |

매일 실제 Android 기기에서 통합한다. 위 계약을 첫 한 시간에 동결하면 어느 쪽도
상대가 끝나기를 기다릴 필요가 없다.

## 접근성 — 그래도 채점되는 저비용 버전

시맨틱 `<button>`, 보이는 포커스, 접근 가능한 이름, repeat/loop 토글의 `aria-pressed`,
읽을 수 있는 시간 텍스트가 있는 라벨 붙은 range, player sheet 열기/닫기 시 포커스
관리, 오류 알림, `prefers-reduced-motion` 준수, `env(safe-area-inset-*)` 적용.
44px 타깃은 이 목록의 한 항목일 뿐 전부가 아니다.

## AI 수정 기록 — 지금 시작, 채점 대상

`CLAUDE.md`는 부딪힌 AI 한계를 이름 붙이면 가점을 얻는다고 기록하고, `06`의 5번
항목은 이것이 가능한 가장 강한 증거라고 적는다. 앱 코드를 한 줄도 쓰기 전에 이미
이 프로젝트의 연구에서 나온 네 항목:

| AI 주장 | 확인 방법 | 수정 | 디자인 영향 |
| --- | --- | --- | --- |
| “실제 한국 상위 3개” 스트리밍 서비스 | 같은 달 WiseApp과 Mobile Index 비교 | 거짓 — 두 자료의 Spotify 수치가 약 3배(6.22m 대 2.38m) 다름. 제공자 독립 순위 없음 | 시장 섹션에서 순위 대신 불일치를 보고 |
| Scrubber seek 공식 | range-input 기본값 확인 | 0–100 범위에서 `duration * value`는 50× duration으로 이동 | `max=duration`, 직접 할당 |
| “파일은 저장할 수 없음 — iOS 제한” | WebKit OPFS 및 IndexedDB 명세 확인 | 잘못된 프레이밍. IndexedDB는 `File`/`Blob`을 저장하며 재선택은 *범위 선택* | 불가능성이 아니라 마감일 결정으로 문서화 |
| artist/album/artwork 화면을 설계한 연구 | `File`이 실제로 노출하는 값 확인 | File API는 ID3/MP4 태그를 전혀 제공하지 않음 | 제목은 파일명에서, artist는 선택 입력 및 편집 가능 |

빌드 중 같은 일이 생길 때마다 행을 추가한다. 검증된 수정 하나가 기능 하나보다
발표에서 더 가치 있다.

## 위험과 fallback

| 위험 | 트리거 | Fallback |
| --- | --- | --- |
| A–B 루프 정밀도가 이상함 | 루프 지점에서 `timeupdate` overshoot가 들림 | 루프 중 `requestAnimationFrame` poll; 여전히 나쁘면 루프 경계를 0.5초로 맞추고 명시 |
| Practice log가 덧붙인 기능처럼 느껴짐 | 3일째인데 아무도 사용하지 않음 | player sheet 안에 인라인 히스토리 스트립으로 합침 — 의사결정 루프는 유지하고 화면 하나를 줄임 |
| 08-13에 iOS 미검증 | 빌린 기기 없음 | 발표에서 그대로 밝히고 Android 실행을 보여 줌 |
| 재연결이 테스터를 혼란스럽게 함 | 반 친구들이 새로고침 후 데이터가 사라졌다고 생각 | 카드에서 파일 다시 선택 필요를 가장 크게 보여 주고, 한 번에 재선택 가능하게 함 |
| 전체 플레이어 쪽으로 범위가 다시 커짐 | 누군가 playlists나 artwork를 제안 | 이 문서의 범위 제외 표가 답 |

## Probe 결과 — 기록을 위한 MediaRecorder

인앱 녹음이 다시 범위에 들어올 경우를 위해 보관. 2026-08-05 데스크톱 Chrome
(Blink)의 로컬 probe 페이지에서 테스트.

| 포맷 | 녹음 | 재생 |
| --- | --- | --- |
| `audio/mp4` 및 AAC-LC 변형 | 가능 | 가능 |
| `audio/webm` 및 Opus 변형 | 가능 | 가능 |
| `audio/aac`, `audio/mpeg`, `audio/wav`, Ogg+Opus | 불가 | 가능 |

**범용적으로 적용되는 결론: 어떤 브라우저에서도 MP3는 녹음할 수 없다.** 녹음 결과는
AAC-in-MP4 또는 Opus-in-WebM이다. 여기서 재생을 MP3/AAC로 약속하므로 **양쪽 방향을
모두 만족하는 형식은 AAC-in-MP4뿐** — 녹음을 추가한다면 요청할 형식이다.

미검증: WebKit 동작과 실제 마이크 왕복 동작(secure context가 필요하므로 앱이
GitHub Pages의 HTTPS에서 실행될 때만 가능).

## 관련 문서

- `06-streaming-review-sol.md` — 위 제약 대부분의 근거
- `04-streaming-ui-models.md` — 차용/함정 표. 수치는 2025년 8월의 특정 시점 스냅샷으로 보고, 가격 섹션은 확인 날짜가 필요함
- `03-idea-scan-positioning.md` — 이 계획을 평가하는 그린/레드 플래그
- `00-topic-selection.md` — 대체된 후보 순위
- 수업 노트: 비공개 vault의 `Study/AI-Web-Content-Practical-Skills/`

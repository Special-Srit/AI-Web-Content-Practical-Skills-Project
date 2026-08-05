# 09 · 구현 명세 — 팀원이 이 문서를 보고 코딩한다

작성 2026-08-05. 대상 독자는 **코드를 작성하는 팀원**이다.
`08-concept-warm-vinyl.md`(제품 결정)와 `07-music-player-plan.md`(오디오 규칙·
접근성·플랫폼 제약)를 이미 읽었다고 가정한다.

## 0. 역할과 스택

| | |
| --- | --- |
| 구조·명세·리뷰 | 스릿 |
| 구현 | 팀원 |
| 스택 | **React + Vite** |
| 배포 | GitHub Pages (정적) |
| 백엔드 | 없음. 서버·계정·동기화 전부 없음 |

- React를 고른 이유 — 냥BTI와 같은 스택이라 이번 주에 머릿속 모델을 하나만
  유지하면 된다. 탭 4개 + 시트 구조는 컴포넌트로 나누기 좋은 형태다
- **명세에 없는 구조 결정이 필요해지면 만들지 말고 물어볼 것.** 이 문서를 고치는
  쪽이 코드를 되돌리는 쪽보다 싸다

## 1. 절대 규칙 — `<audio>`는 React 밖에 산다

**이 프로젝트에서 가장 흔하게, 가장 크게 터지는 지점이다.**

- 오디오 엘리먼트를 컴포넌트가 소유하면, 탭을 옮기거나 리렌더가 일어날 때
  엘리먼트가 다시 만들어지면서 **재생이 끊긴다**
- 홈 → 보관함 → 일기를 오가도 음악은 계속 나와야 한다. 즉 엘리먼트의 수명은
  화면의 수명과 무관해야 한다

따라서:

- **JSX로 `<audio>`를 쓰지 않는다.** `src/audio/player.js` 안에서 모듈 스코프에
  `new Audio()`로 하나만 만들고, 앱이 사는 동안 절대 버리지 않는다
- UI는 이 엘리먼트를 **직접 만지지 않는다.** `player.js`가 노출하는 함수만 부른다
- React가 상태를 읽는 방법은 `useSyncExternalStore` — `player.subscribe`와
  `player.getState`를 그대로 연결하면 된다. `useEffect` + `useState`로 흉내내면
  렌더 타이밍이 어긋난다

```js
// src/audio/player.js  — 모듈 스코프. import 시점에 한 번만 생성된다.
const el = new Audio();
el.preload = 'metadata';
```

## 2. 폴더 구조

```
team-project/src/
  main.jsx
  App.jsx                 라우팅(탭 전환) + PlayerSheet 마운트
  audio/
    player.js             오디오 싱글턴. 이 폴더 밖에서 el을 만지지 않는다
    formats.js            canPlayType 판정 · 에러 코드 매핑
  store/
    persist.js            localStorage 읽기·쓰기 · schemaVersion
    tracks.js             트랙 CRUD · 파일 재연결
    diary.js              기분 일기 CRUD
  moods.js                기분 5종 상수 (단일 출처)
  screens/
    Home.jsx  Archive.jsx  Diary.jsx  Settings.jsx
  components/
    NavFooter.jsx  PlayerSheet.jsx  TrackRow.jsx
    MoodPicker.jsx  DiaryCard.jsx  EmptyState.jsx
    MoodArtwork.jsx       기분 기반 커버 플레이스홀더
  styles/
public/
  audio/                  번들 데모 음원 4~5곡 (검증된 CC0·CC BY만)
  audio/CREDITS.md        곡별 라이선스·출처. 커밋 전에 채운다
```

- **파일명·식별자는 영어, 화면에 보이는 문자열은 한국어.** 프로젝트 공통 규칙
- 한 파일이 300줄을 넘으면 쪼갤 시점이다

## 3. 모듈 인터페이스 — 이 시그니처를 바꾸려면 먼저 물어볼 것

```js
// audio/player.js
load(track, srcUrl)      // 이전 objectURL을 먼저 revoke한다
play()                   // Promise. 반드시 catch 한다 (§5)
pause()
seek(sec)
subscribe(fn)  → unsubscribe
getState()     → PlayerState

// store/tracks.js
listTracks()             addTracks(fileList)      removeTrack(id)
setMoods(trackId, moods) updateMeta(id, {title, artist})
resolveSrc(track)  → track.assetUrl (bundled) | objectURL (picked) | null

// store/diary.js
listEntries()            upsertEntry(entry)       entriesByMood(mood)
// 하루 한 건. 같은 localDate로 upsert하면 덮어쓴다
```

- `resolveSrc`가 `null`을 돌려주는 경우가 정상 경로에 존재한다 → §5
- **번들 곡은 `track.assetUrl`로 재생한다.** 이 필드가 없으면 번들 곡을 재생할
  방법이 아예 없다 (sol 검토에서 잡힌 구멍)

## 4. 상태 — 무엇이 어디 사는가

| 상태 | 사는 곳 | 이유 |
| --- | --- | --- |
| `PlayerState` | **메모리만** (`player.js`) | 새로고침하면 사라지는 게 맞다 |
| `Track[]` | localStorage `warmvinyl:v1:tracks` | |
| `DiaryEntry[]` | localStorage `warmvinyl:v1:diary` | |
| 스키마 버전 | `warmvinyl:v1:schemaVersion` | 나중에 필드가 늘 때 필요 |

- 자료 구조는 `08` §Data contract가 원본이다. **여기서 바꾸지 말 것**
- **메타데이터만 저장하고 파일은 다시 고르게 한다.** 이는 API 한계가 아니라
  이 MVP의 결정이다 — `File`은 직렬화 가능해서 IndexedDB에 넣을 수도 있다
- 재방문 시 `fileName + size + lastModified`로 다시 연결하되, 이것은
  **식별자가 아니라 휴리스틱**이다. 유일하게 일치할 때만 자동 연결하고,
  둘 이상 걸리면 사용자가 고르게 하며, 수동 재연결 경로를 항상 남긴다
- 연결에 실패한 트랙은 목록에 남되 **재생 불가 상태로 표시**하고 다시 고르게
  한다 — 조용히 숨기면 사용자는 곡이 사라졌다고 생각한다
- 번들 데모 음원은 이 문제가 없다. 발표 시연이 파일 선택에 의존하지 않는 이유다

## 5. 반드시 처리해야 하는 실패 경로

| 상황 | 처리 |
| --- | --- |
| `play()`가 `NotAllowedError`로 거절 | 자동재생은 모바일에서 막힌다. **사용자 탭에 연결**하고, 거절되면 화면에 보이게 알린다. 조용히 삼키지 말 것 |
| 디코딩 불가 포맷 | `formats.js`에서 미리 판정. MP3·AAC만 안전하다고 본다 |
| 재연결 실패 트랙 | 재생 불가 배지 + 다시 선택 유도 |
| localStorage 용량 초과 | 쓰기 실패를 잡아 안내. 앱이 죽지 않게 |
| 빈 상태 (곡 0개 / 일기 0개) | `EmptyState`로 명시. 빈 화면 금지 |

- `URL.createObjectURL`은 **트랙을 바꿀 때마다 이전 것을 `revokeObjectURL`** 한다.
  안 하면 폰에서 메모리가 새고, 시연 도중 앱이 죽는다

## 6. 화면 ↔ 컴포넌트

`08` §MVP scope의 탭 4개를 그대로 따른다. 플레이어는 **탭이 아니라 전역 시트**.

| 탭 | 화면 | 주요 컴포넌트 |
| --- | --- | --- |
| 홈 | 기분 선택 → 오늘의 추천 → 지금 재생 중 | `MoodPicker` `TrackRow` `MoodArtwork` |
| 보관함 | 전체 트랙 · 검색 · 파일 추가 · 기분 태그·제목 수정 | `TrackRow` `MoodPicker` `EmptyState` |
| 일기 | 오늘 쓰기 · 날짜별 히스토리 · 기분별 보기 | `DiaryCard` `MoodPicker` `EmptyState` |
| 설정 | 음원 크레딧 · 전체 삭제 · 앱 정보 | — |

- **`PlayerSheet`는 `App.jsx`에 마운트한다.** 특정 탭 소유가 아니다. 어느 탭에서
  재생을 시작해도 같은 시트가 뜬다
- **설정을 계정 화면처럼 만들지 말 것.** 로그인·프로필 사진·회원 정보 없음
- **전체 삭제는 `warmvinyl:*` 키만 지운다.** `localStorage.clear()` 금지
- 검색은 **내 트랙만** 대상이다. 카탈로그가 없다
  - 한글 검색 — 저장 필드와 질의를 **NFC 정규화**, 영문 소문자화, 질의를 토큰으로
    쪼개 **전 토큰이 title·artist·fileName 중 어딘가에 매치**되면 통과

## 7. 코딩 컨벤션

- 화면 문자열은 한국어, 식별자·파일명은 영어
- **`dangerouslySetInnerHTML` 금지.** 파일명과 사용자 입력은 신뢰할 수 없는 값이다
- 자산 경로는 **상대 경로**. GitHub Pages 프로젝트 사이트는 `/<repo>/` 아래에서
  서비스되므로 `/audio/x.mp3` 같은 절대 경로는 깨진다. Vite `base` 설정 필요
- 터치 타깃 **44×44 이상**, 하단 탭 **48×48 이상**, 본문 **16px 이상**
- 입력 필드 글자 크기를 **16px 미만으로 내리지 말 것** — iOS에서 포커스 시 화면이
  확대된다
- 하단 탭에 `env(safe-area-inset-bottom)` 여백
- 시맨틱 `<button>`, 보이는 포커스, 토글에 `aria-pressed`

## 8. 하지 말 것 — 이미 결정된 사항

- **수동 플레이리스트 · 재생목록(queue) · 셔플 · 반복 · 저장 용량 미터** —
  2026-08-05에 일정상 잘라냈다 (`08` §잘라낸 것). 만들지 말 것
- 제스처 전부 (스와이프·롱프레스·드래그 정렬) — 보이는 버튼만
- ID3 / MP4 태그 파싱 — 제목은 파일명에서, 아티스트는 선택 입력
- 앨범 아트 추출 — File API로 안 나온다. 기분 기반 플레이스홀더가 기본값이며,
  **깨진 이미지가 아니라 정식 상태로 디자인**한다
- 로그인·계정·동기화·실시간 기능
- 저작권 있는 음원을 저장소에 넣는 것. `public/audio/`는 **검증된 CC0·CC BY만**
  (`08` §The content problem). `CREDITS.md`를 **커밋 전에** 채우고, **크레딧을
  앱 화면(설정)에도 노출**한다 — CC BY는 사용자가 쉽게 찾을 수 있는 곳의 표기를
  요구한다. 저장소는 공개이고 git 기록은 영구다
- 분석 스크립트·서드파티 런타임 스크립트를 넣는 것 — "파일이 업로드되지 않는다"는
  약속을 지킬 수 없게 된다

## 9. 작업 흐름

1. 기능 단위로 **브랜치**를 만든다 (`feat/player-sheet`)
2. 커밋은 작게. 리뷰가 유일한 품질 게이트다
3. 스릿에게 리뷰 요청 → 머지
4. **매일 실제 안드로이드 기기에서 통합 확인.** 데스크톱 크롬만 보고 가면
   발표 전날 터진다
5. iOS는 팀에 아이폰이 없어 **검증 불가**. 문서화된 교집합만 쓰고,
   "아이폰에서 확인했다"고 말하지 않는다 (`07`)

**AI 사용 기록을 남긴다.** 어떤 프롬프트를 썼고 AI 결과의 어디가 틀렸는지 적어
둘 것. 3-2 기준으로 **발표 자료에 들어가는 채점 대상**이다.

## 10. 아직 안 정한 것

1. 번들 데모 음원(4~5곡)을 누가 구하고 라이선스를 확인할지. **CC0·CC BY만**
2. 기분 플레이스홀더(`MoodArtwork`)의 시각적 형태 — 디자인 단계

## Related

- `08-concept-warm-vinyl.md` — 제품 결정 · 자료 구조 원본
- `07-music-player-plan.md` — 오디오 포맷 규칙 · 접근성 · 플랫폼 제약

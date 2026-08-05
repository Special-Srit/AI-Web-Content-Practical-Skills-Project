# 11 · TuneBox 컴포넌트 패턴 조사

작성 2026-08-05. 대상은 **모바일 우선 웹 앱**이다.

- 범위 — shadcn/ui가 이미 정한 버튼·다이얼로그·드로어·폼 컨트롤은 재조사하지 않음
- 제품 제약 — 5개 탭 `홈 · 라이브러리 · 탐색 · 일기 · 마이`, 전역 오디오 1개,
  미니 플레이어와 전체 화면 플레이어는 `App.jsx`에 마운트
  ([08](08-concept-tunebox.md), [09](09-implementation-spec.md) §1·§6)
- 이미 결정된 치수 — 본문 16px 이상, 일반 터치 타깃 44×44 이상, 하단 탭 48×48 이상,
  하단 safe-area 여백 ([09](09-implementation-spec.md) §7, [냥BTI 디자인 시스템](../../nyangbti/docs/06-design-system.md) §3)
- 용어 — `명세`는 문서에 수치·규칙이 있는 경우, `관찰`은 출시 제품의 공개 화면·사용 설명서에서
  확인한 경우, `권고`는 TuneBox에 적용하는 판단
- 현재 Material 3 문서는 JavaScript로 렌더링되며 정적 본문에서 수치가 모두 노출되지 않는다.
  따라서 M3 구현 소스와 Android 공식 API를 함께 확인했고, 오래된 Material 1 수치는
  `구버전 참고`로 구분했다. ([Material 3 navigation bar](https://m3.material.io/components/navigation-bar/overview),
  [Material Web 저장소](https://github.com/material-components/material-web),
  [NavigationBarView API](https://developer.android.com/reference/com/google/android/material/navigation/NavigationBarView))

## 1. 하단 탭 바 — 5개 목적지

### 규범·공개 디자인 시스템

- **Material 3 명세·구현**
  - Material Web navigation tab 소스에서 **탭 최소 크기 `min-height:48px` · `min-width:48px`**,
    label line-height 16px, active indicator 관련 토큰을 확인했다.
    ([실제 파일 — `_navigation-tab.scss`](https://github.com/material-components/material-web/blob/main/labs/navigationtab/internal/_navigation-tab.scss))
  - **정정 2건 (Claude 검증, 2026-08-05)**
    - 원래 인용된 URL은 `navigation-tab-styles.css`였으나 **404다.** 실제 파일은 `.scss`이며
      위 링크로 교체했다
    - 컨테이너 높이 **80px** · 아이콘 **24px** · indicator **64×32px**는 **이 파일에 없다.**
      토큰 파일에 있을 수는 있으나 인용된 출처로는 확인되지 않으므로 **확인 못 함**으로 둔다.
      `48×48` 최소 크기만 원문에서 직접 확인됨
  - **이 컴포넌트는 `labs/`에 있다.** 저장소가 명시적으로 *"experimental features that are not
    recommended for production. Breaking changes may occur"* 라고 경고한다. Apple HIG와 나란히
    둘 규범 문서가 아니라 **참고 구현**으로 읽을 것. Material Web 자체도 maintenance mode다
    ([07 조사](07-mobile-ui-libraries-research.md))
    ([labs 경고문](https://github.com/material-components/material-web/blob/main/labs/README.md))
  - Android 공식 API의 `LABEL_VISIBILITY_AUTO`는 목적지 **3개 이하면 전체 label**, **4개 이상이면
    선택된 항목만 label**을 보이는 규칙이다. `LABELED`로 전체 label을 강제할 수도 있다.
    ([NavigationBarView API](https://developer.android.com/reference/com/google/android/material/navigation/NavigationBarView))
  - 구버전 Material bottom navigation은 용도를 **3–5개 top-level destination**으로 제한하고,
    높이 56dp·아이콘 24dp·항목 폭 최소 80dp를 제시했다. 360px 화면에서 5개×80px은 맞지 않으므로,
    이 수치를 그대로 웹에 복사하지 않는다. ([Material bottom navigation, 구버전](https://m1.material.io/components/bottom-navigation.html))
- **Apple HIG**
  - tab bar는 행동 버튼 모음이 아니라 top-level section 이동용이며, 화면을 이동해도 보이게 한다.
    label을 포함하고 가능하면 단어 하나로 쓰며, overflow를 피하고 일반적인 기본 목록은 **5개 이하**를
    권한다. ([Apple HIG — Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars))
  - Apple HIG는 현재 iPhone tab bar의 고정 높이를 공개 수치로 제시하지 않는다. `UITabBar`도
    “standard-height” appearance를 말하지만 숫자를 보증하지 않는다. 따라서 **Apple의 현재 숫자 명세는
    확인 못 함**. ([UITabBar API](https://developer.apple.com/documentation/uikit/uitabbar))
  - safe area는 tab bar·toolbar 등에 가려지지 않는 영역이며, 콘텐츠와 인터랙션이 시스템 영역에
    겹치지 않도록 존중해야 한다. ([Apple HIG — Layout](https://developer.apple.com/design/human-interface-guidelines/layout))
- **Material과 Apple의 차이**
  - Material 3 구현은 80px·indicator 수치를 제공하지만, Apple HIG는 현재 tab bar 높이 수치를
    제공하지 않는다. Apple은 “5개 이하·label·overflow 회피”를 강조하고, Material은 4개 이상에서
    label을 선택 항목만 보이는 구현도 제공한다. **5개 전체 label을 유지할지는 TuneBox의 웹 선택**이다.

### 출시 제품 관찰

- Apple Music의 탭 화면에는 미니 플레이어가 하단에 붙고, Apple HIG는 Music처럼 accessory가 붙은
  tab bar를 별도 사례로 설명한다. 이는 “탭 바 위에 플레이어를 쌓는” 패턴의 공개 사례다.
  ([Apple HIG — Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars),
  [Apple Music controls](https://support.apple.com/en-ng/guide/iphone/iph676daac9b/26/ios/26))
- Apple Music은 아이콘 위·label 아래의 compact tab bar를 사용한다고 HIG가 설명한다.
  ([Apple HIG — Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars))
- Spotify는 모바일에서 화면 하단의 Now Playing bar를 제공하고, 그 bar에서 full player와 queue로
  들어가게 한다. 다만 Spotify의 **내부 높이·indicator·label truncation 수치는 공개 문서에서
  확인 못 함**. ([Spotify Play Queue](https://support.spotify.com/gm/article/play-queue/))

### TuneBox 권고

- `<nav>` 안에 5개 `<a>`를 두고 **아이콘+label을 모두 표시**한다. 목적지 이동이므로 shadcn
  `Tabs`가 아니라 직접 만든 navigation을 유지한다 ([09](09-implementation-spec.md) §0·§6).
- 기본 phone width 360px에서 항목 폭은 약 **72px(360÷5)**로 둔다. 각 탭은 `min-height: 64px`에
  `padding-bottom: env(safe-area-inset-bottom)`을 더하고, 실제 hit area는 기존 결정대로 48×48px
  이상으로 유지한다. M3의 native 80px를 그대로 쓰면 콘텐츠를 과도하게 밀어 올리므로 64px은
  **웹 적응값**이다.
- label은 `12px`, `white-space: nowrap`, overflow hidden을 적용하되 ellipsis로 숨기지 않는다.
  `라이브러리`는 5글자이므로 360px에서 약 72px 칸을 우선 배정하고, 아이콘을 20–24px로 줄여도
  label을 유지한다. 다섯 label 중 하나만 두 줄이 되거나 `라이브러…`가 되면 패턴이 깨진다.
- 활성 상태는 M3처럼 **색 변화 + filled/weight가 다른 아이콘 + 작은 indicator pill**을 함께 쓴다.
  색만 바꾸거나 아이콘만 바꾸지 않는다. indicator는 웹 적응으로 약 **56×28px**를 제안한다.
- 배경은 고정된 불투명 surface, 위쪽 1px divider 또는 낮은 shadow 중 하나만 사용한다. 콘텐츠가
  비쳐 보이는 native Liquid Glass 효과는 모바일 웹에서 재현하지 않는다. Apple HIG의 현재 Liquid
  Glass는 iOS 시스템 레이어이지 웹의 기본 tab bar가 아니다. ([Apple HIG — Materials](https://developer.apple.com/design/human-interface-guidelines/materials))
- 아이콘 library는 아직 미정이다. 선택 후에도 각 목적지를 인식할 수 있는 **outline/filled 쌍** 또는
  선택 상태가 충분히 다른 한 세트를 택하고, label이 항상 의미를 보완하게 한다.

### 저비용 vs 고비용

- **저비용** — 64px 고정 bar, 5개 icon+label, active color·weight·pill, 1px divider.
  구현·검수 범위가 작고 한국어 label이 안정적이다.
- **고비용** — viewport 폭별 항목 폭 보정, M3식 pill motion, 스크롤 중 bar 최소화,
  desktop에서 sidebar로 변환. Apple HIG가 iPad의 adaptable sidebar를 설명하지만 TuneBox의
  MVP는 mobile-first 정적 사이트이므로, 이 비용을 들여도 Android/iOS 웹에서 얻는 이득이 작다.
  ([Apple HIG — Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars))

## 2. 하단 탭 위의 persistent mini-player

### 규범·공개 디자인 시스템

- Apple HIG는 Music의 MiniPlayer 같은 **tab bar attached accessory**를 명시하고, 아래로 스크롤할
  때 tab bar와 accessory를 최소화할 수 있다고 설명한다. 이것은 native 동작 안내이지 웹 구현
  요구사항은 아니다. ([Apple HIG — Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars))
- Android Media3 Compose는 `MiniController`를 “현재 media item 정보와 compact playback control을
  보여 주는” UI로 제공한다. 크기는 문서에서 고정 수치로 보증하지 않는다.
  ([Media3 Compose UI](https://developer.android.com/media/media3/ui/compose))

### 출시 제품 관찰

- Apple Music MiniPlayer의 공개 사용 설명서에는 현재 곡, 곡 제목, 오른쪽의 **pause/play와 next**,
  MiniPlayer를 탭하면 Now Playing 화면으로 이동하는 구조가 명시되어 있다.
  ([Apple Music controls](https://support.apple.com/en-ng/guide/iphone/iph676daac9b/26/ios/26))
- Spotify는 “화면 하단의 Now Playing bar를 탭해 queue를 연다”고 안내한다. 즉 MiniPlayer는 단순
  상태표시가 아니라 full player와 queue로 들어가는 진입점이다. ([Spotify Play Queue](https://support.spotify.com/gm/article/play-queue/))
- YouTube의 Miniplayer는 탐색 중에도 계속 남고, play/pause·닫기·전체 보기 진입을 제공한다.
  다만 이는 video 제품의 동작이므로 TuneBox에 그대로 복사하지 않는다. ([YouTube Miniplayer](https://support.google.com/youtube/answer/9162927?co=GENIE.Platform%3DAndroid&hl=en-EN))

### TuneBox 권고

- 구조는 `본문 → MiniPlayer → NavFooter`의 세로 stack으로 고정한다. MiniPlayer는 `App.jsx`에
  전역 mount하고, 어느 탭에서 재생해도 같은 높이와 같은 상태를 유지한다 ([08](08-concept-tunebox.md),
  [09](09-implementation-spec.md) §6).
- 기본 시각 높이는 **56px**, safe-area는 NavFooter에만 더한다. MiniPlayer 안에는 최소한 다음을 둔다.
  - 40×40 artwork 또는 MoodArtwork
  - 제목 1줄 + artist 1줄
  - 44×44 play/pause
  - 44×44 next
  - 전체 행을 탭하면 PlayerSheet 열기
- 진행률은 bar 하단 2px 정도의 시각 요소로만 두고, seek는 전체 화면 player에서 처리한다.
  MiniPlayer에 작은 scrubber까지 넣으면 56px 안에 정보·버튼·safe area가 충돌하기 쉽다.
- 아무 곡도 재생하지 않는 `idle` 상태에는 MiniPlayer를 **렌더하지 않는다**. 탭 bar는 그대로 유지하고
  본문 bottom padding도 MiniPlayer가 나타날 때만 추가한다. 이렇게 하면 첫 로드에서 빈 player처럼
  보이지 않고, player가 중요하지 않은 My 페이지에서도 탭 bar를 가리지 않는다.
- `PlayerSheet`가 열리면 MiniPlayer와 탭 bar를 sheet 아래에 두고, sheet가 전체 viewport를 덮는다.
  native swipe transition은 전제하지 않고 shadcn Drawer/Sheet의 웹 동작만 사용한다.

### 저비용 vs 고비용

- **저비용** — 56px 한 줄, artwork·제목·artist·pause/next·전체 화면 진입만 제공. 현재 제품
  요구와 Apple/Spotify의 최소 공개 구조를 만족한다.
- **고비용** — 진행률, queue shortcut, favorite, 출력 장치, 스크롤에 따른 최소화, drag-to-dismiss.
  기능은 늘지만 5탭과 함께 하단을 3개 층으로 만들고, iOS 미검증 웹에서 gesture 충돌을 만든다.
  MVP에서는 full player로 secondary action을 보낸다.

## 3. Full-screen player

### 규범·공개 디자인 시스템

- Apple은 사용자가 앱 밖의 Control Center·headphone control에서도 audio를 조작한다고 설명하며,
  playback·seek·queue·출력 장치 같은 의미를 기존 오디오 control과 일관되게 유지하라고 한다.
  ([Apple HIG — Playing audio](https://developer.apple.com/design/human-interface-guidelines/playing-audio))
- Android Media3의 `PlayerView`는 audio metadata에 포함된 album art를 표시하고, `PlayerControlView`로
  progress bar와 playback button을 제공한다. Media3의 Compose `Player`도 comprehensive playback UI와
  progress bar를 제공한다. ([PlayerView API](https://developer.android.com/reference/kotlin/androidx/media3/ui/PlayerView),
  [Media3 Compose UI](https://developer.android.com/media/media3/ui/compose))
- Apple HIG와 Media3 공식 문서는 artwork의 viewport 비율, transport 버튼 간격, scrubber의 실제
  시각 높이를 고정 수치로 제시하지 않는다. **이 세부 수치는 합의 없음·확인 못 함**.

### 출시 제품 관찰

- Apple Music은 MiniPlayer에서 Now Playing 화면으로 들어가고, 공개 설명서에 seek, play/pause,
  previous/next, lyrics, output destination, queue를 별도 control로 나열한다.
  ([Apple Music controls](https://support.apple.com/en-ng/guide/iphone/iph676daac9b/26/ios/26))
- Spotify도 Now Playing bar → Now Playing view → Play Queue의 순서를 공개 지원 문서에서 설명한다.
  ([Spotify Play Queue](https://support.spotify.com/gm/article/play-queue/))
- Apple Music·Spotify의 **현재 artwork 픽셀 크기·버튼 간격·scrubber 시각 두께는 공개 문서에서
  확인 못 함**. 검색으로 찾은 커뮤니티·블로그 이미지는 버전·기기·언어가 달라 normative evidence로
  쓰지 않았다.

### TuneBox 권고

- 화면 순서는 다음으로 고정한다.
  1. safe-area 안의 닫기/축소 버튼
  2. 정사각 artwork 또는 MoodArtwork
  3. title, artist
  4. elapsed time + scrubber + duration
  5. previous · play/pause · next
  6. favorite · shuffle · repeat · queue 같은 secondary action
- artwork는 `width: min(100% - 32px, 320px)`로 시작하고 viewport 세로가 짧을 때는 `max-height`
  제약으로 줄인다. **320px와 16px margin은 TuneBox 구현 권고값이지 Apple/Material 수치가 아니다.**
  artwork가 transport를 밀어 화면 밖으로 보내면 안 된다.
- transport의 시각 icon은 24–32px, button hit area는 기존 결정대로 최소 44×44px로 둔다.
  가운데 play/pause는 주변 previous/next보다 크고 대비가 높아야 한다. secondary action은 artwork
  아래에 한 줄로 몰지 말고, queue·repeat·shuffle을 아래 영역에 분산한다.
- scrubber는 시각 track은 2–4px로 가볍게 보이게 하되, 조작 wrapper는 세로 **44px 이상**으로
  만든다. thumb만 작게 그려도 전체 slider가 터치 target이다. 시간 숫자는 양 끝에 두고, keyboard와
  screen reader에서 `aria-valuenow/min/max`를 제공한다.
- 지금 재생 중인 곡이 없는 상태에는 PlayerSheet를 열 수 없다. 오류 상태에는 artwork 자리에
  “재생할 수 없음”과 복구 action을 보여 주고, 빈 상태와 오류를 같은 화면으로 합치지 않는다.

### 저비용 vs 고비용

- **저비용** — 정적 sheet, 280–320px artwork, title/artist, seek, 3 transport, favorite·queue만.
  구현 난도가 낮고 발표에서 핵심 loop를 보여 준다.
- **고비용** — artwork 색 추출에 따른 theme 전환, animated artwork, lyrics, output device,
  swipe-to-dismiss와 native-like shared transition. Apple 공개 화면의 모든 기능을 흉내 내는 비용에
  비해 TuneBox의 local audio MVP 가치가 낮다.

## 4. artwork가 있는 track/list row

### 규범·공개 디자인 시스템

- Material list는 primary action이 tile 대부분을 차지하고, supplemental action은 오른쪽에 일관되게
  둔다. text는 최대 3줄이며, primary text를 첫 줄에 둔다. ([Material lists, 구버전](https://m1.material.io/components/lists.html))
- Material의 공개 수치는 다음처럼 변형된다.
  - text-only single line **48dp**
  - avatar가 있는 single line **56dp**
  - two line **72dp**
  - three line **88dp**
  - artwork·avatar는 16dp 좌측 여백, text 시작 keyline은 72dp 예시를 사용
  ([Material lists, 구버전](https://m1.material.io/components/lists.html))
- Material은 list를 동종 데이터의 빠른 scan에 쓰고, 서로 다른 크기·여러 action·긴 variable content는
  card로 분리하라고 한다. overflow action은 row 오른쪽의 supplemental action으로 취급한다.
  ([Material lists, 구버전](https://m1.material.io/components/lists.html),
  [Material cards, 구버전](https://m1.material.io/components/cards.html))
- Apple HIG는 현재 Music row의 높이·artwork 수치·ellipsis 규칙을 공개하지 않는다.
  **Apple normative row 수치는 확인 못 함**.

### 출시 제품 관찰

- Spotify는 track 옆의 `···` menu에서 queue 추가 등 supplemental action을 제공한다고 안내한다.
  mobile queue 문서도 track 옆의 menu를 사용한다. ([Spotify Play Queue](https://support.spotify.com/gm/article/play-queue/))
- Apple Music은 Now Playing에서 Favorite/Suggest Less를 More menu로 제공한다고 안내한다.
  ([Apple Music preference controls](https://support.apple.com/en-gb/guide/iphone/iph744ea4009/ios))
- Apple Music·Spotify의 현재 track row가 항상 one-line인지 two-line인지, title truncation이
  어느 글자 수에서 발생하는지는 공개 문서로 확인 못 함. 제품 화면을 버전 고정 없이 측정한 값처럼
  쓰지 않는다.

### TuneBox 권고

- **72px row + 48px square artwork**를 기본으로 한다. title 1줄, artist 1줄의 two-line list가
  파일명 기반 title과 선택 artist를 동시에 보여 주면서도 3줄 row보다 촘촘하다.
- row 전체를 play primary action으로 만들고 trailing `More`를 별도 44×44 button으로 둔다.
  row 전체와 More가 같은 click handler를 공유하지 않게 한다.
- title과 artist는 각각 한 줄 ellipsis. title에 파일명 전체를 여러 줄로 노출하지 않는다.
  접근성 이름에는 full title/artist를 유지하고 화면만 자른다.
- 현재 playing row는 **배경 tint + 작은 equalizer/playing icon + `aria-current="true"`**를 함께
  사용한다. 색만으로 playing state를 전달하지 않는다. paused는 같은 row tint를 유지하되 icon은
  pause/play 상태로 구분한다.
- artwork가 없는 picked track도 같은 48px box를 유지하고 MoodArtwork를 넣는다. row마다 artwork
  유무로 높이를 바꾸면 목록 scan이 깨진다 ([08](08-concept-tunebox.md) §The content problem,
  [09](09-implementation-spec.md) §8).

### 저비용 vs 고비용

- **저비용** — 64px row, 40px artwork, title 1줄 + artist 1줄, More 하나. 목록이 더 많이 보이지만
  artwork·text·44px action의 여유가 줄어든다.
- **고비용** — 72px/48px, playing equalizer animation, favorite의 즉시 toggle, queue 상태 badge,
  swipe action. 제스처는 범위 밖이고, TuneBox는 72px 정적 row만 구현하는 편이 안전하다.

## 5. artwork 없는 media item의 generative/derived cover art

### 규범·출시 사례 조사 결과

- Material의 empty state는 이미지가 있다면 배경에 대해 **subtle·neutral·non-interactive**여야
  하고, 앱의 목적과 잠재력을 전달해야 한다고 한다. 다만 이것은 empty state 지침이지 음악 cover
  art 생성 규칙은 아니다. ([Material empty states, 구버전](https://m1.material.io/patterns/empty-states.html))
- YouTube Music upload는 audio와 metadata 및 album art를 함께 올릴 수 있다고 문서화한다. artwork가
  없는 경우의 자동 색·이니셜·gradient 규칙은 공식 문서에서 **확인 못 함**.
  ([YouTube Music uploads](https://support.google.com/youtubemusic/answer/9716522?hl=en))
- Bandcamp는 square album art를 요구하고, artwork 없이는 search·tag·Discover에 나타나지 않는다고
  안내한다. 즉 Bandcamp는 “없는 artwork를 생성”하기보다 artwork를 publishing requirement로
  취급하는 사례다. ([Bandcamp design tutorial](https://get.bandcamp.help/en/articles/15263106-bandcamp-design-tutorial))
- Apple Music의 local file에 artwork가 없을 때 표시하는 현재 placeholder의 형태·색 규칙은
  Apple 공개 문서에서 **확인 못 함**. 검색한 제3자 글·커뮤니티 사례는 제품 명세로 채택하지 않았다.
- **초기 문자** — GitHub는 avatar가 없을 때 사용자 ID hash로 5×5 pixel identicon을 만들고,
  hash에서 pattern과 color도 결정한다. media cover 사례는 아니지만 deterministic fallback의
  출시 사례다. ([GitHub Identicons](https://github.blog/news-insights/company-news/identicons/),
  [GitHub profile reference](https://docs.github.com/en/enterprise-server%403.18/account-and-profile/reference/profile-reference))
- **gradient/pattern** — CSS `linear-gradient`, `radial-gradient`, `conic-gradient`는 브라우저가
  runtime에 이미지를 생성하므로 raster asset 없이 반복 가능한 cover를 만들 수 있다.
  ([MDN — Using gradients](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Images/Using_gradients))
- 결론 — 음악 제품에서 “no artwork → 이 알고리즘”이라는 **합의된 표준은 없음**. 다만 deterministic
  hash fallback과 CSS generated visual은 공개된 실무 패턴이다.

### TuneBox 권고

- MoodArtwork는 깨진 이미지 아이콘이 아니라 **정식 artwork 상태**로 취급한다.
- 입력값은 `MoodId + stable track.id`로 제한한다. 파일명만 hash하면 사용자가 파일명을 바꿀 때
  cover가 바뀌므로, data contract의 stable `id`가 우선이다.
- 5개 MoodId마다 고정 hue family를 정하고, track.id hash로 gradient angle·두 번째 색·LP groove
  위치만 deterministic하게 바꾼다. 중앙에는 mood icon을 두고, title initials는 보조 옵션으로만 둔다.
  한국어 파일명은 첫 글자가 구분력을 보장하지 않기 때문이다.
- 대비·인지성 규칙 — text를 artwork 위에 겹치지 않기, 밝은/어두운 mood 모두 아이콘 대비 확보,
  동일 track은 홈·라이브러리·MiniPlayer·full player에서 같은 결과를 보여 주기.
- cheap baseline은 **Mood별 solid color + LP icon**이다. 고급 버전은 hash 기반 2–3층 gradient+
  concentric groove pattern이다. 외부 이미지 요청·canvas raster 생성·randomness는 쓰지 않는다.

### 저비용 vs 고비용

- **저비용** — 5색 token + 동일 LP SVG/체크 아이콘. 자산·코드·접근성 검수 비용이 가장 낮고,
  mood와 연결된다는 의미가 선명하다.
- **고비용** — hash 기반 palette/angle/pattern, light/dark contrast 보정, 여러 비율에서 art crop
  검수. 더 풍부하지만 “같은 곡의 같은 cover”를 유지하는 테스트가 필요하다.

## 6. selectable chip/filter group — mood 5개 단일 선택

### 규범·공개 디자인 시스템

- Material 3 FilterChip은 filter set에서 선택·해제를 표현하고, 선택 시 check icon을 둘 수 있다.
  공식 Compose guide는 unselected와 selected의 색/checked icon 차이를 예시로 보여 준다.
  ([Android Compose — FilterChip](https://developer.android.com/develop/ui/compose/quick-guides/content/create-chip))
- Material Web의 M3 FilterChip 구현 token은 visual container height **32px**, label **14px**,
  icon **18px**, leading/trailing space **16px**, icon-label gap **8px**를 기본값으로 둔다.
  구버전 Material 문서도 chip height **32dp**를 제시한다. ([Material Web FilterChip 소스](https://chromium.googlesource.com/infra/infra/go/src/infra/%2B/208db3e9408a6716d9ae59273b17f323736a4c1a%5E/build/siso/third_party/material_web_components/components-chromium/node_modules/%40material/web/chips/internal/filter-styles.js),
  [Material chips, 구버전](https://m1.material.io/components/chips.html))
- 현재 M3 웹 문서에서 Korean-label wrapping 규칙과 별도 44px web hit-area prescription은 **확인 못 함**.
  ([Material 3 chips](https://m3.material.io/components/chips/overview))
- Apple HIG에는 Material FilterChip과 대응하는 iOS normative component가 없고, 현재 HIG는
  chip의 visual height나 selected treatment를 제시하지 않는다. **Apple chip 수치는 확인 못 함**.
- 이미 정한 일반 touch target 44×44 이상을 chip의 바깥 button hit area에 적용한다.
  32px visual chip을 그대로 32px button으로 만들면 이 프로젝트 규칙을 위반한다
  ([09](09-implementation-spec.md) §7, [냥BTI 디자인 시스템](../../nyangbti/docs/06-design-system.md) §3).

### 출시 제품 관찰

- Apple Music은 genre와 artist를 고르는 선택 UI를 제공하지만, 그 control이 FilterChip인지와
  mobile chip wrapping/scrolling 수치는 공개 사용 설명서에 정의되어 있지 않다.
  ([Apple Music preferences](https://support.apple.com/en-lamr/guide/iphone/-iph2b174869/ios))
- Spotify·YouTube Music의 현재 mood/filter chip의 exact gap, selected color, overflow behavior는
  공개 support 문서만으로 **확인 못 함**. 제품 screenshot을 design spec으로 오인하지 않는다.

### TuneBox 권고

- 5개 mood를 하나의 `radiogroup` 의미로 묶되, 화면은 FilterChip처럼 만든다. 단일 선택이므로
  `aria-pressed` 다중 토글보다 `role="radiogroup"` + radio semantics가 정확하다.
- 한 줄 non-wrapping horizontal row를 권한다. 360px에서 5개를 모두 보여 주고, chip visual은
  **32–36px**, 각 button hit area는 **44px 이상**, gap은 **8px**로 둔다. label은 모두 3글자
  이하라 `라이브러리` 문제처럼 길이 불균형이 없다.
- 선택 상태는 filled mood color + high-contrast text + check/icon 또는 명확한 border weight로
  표시한다. 색만으로 선택을 전달하지 않는다. icon library가 없으므로 icon은 단순하고 모든 mood에서
  동일한 box 크기를 유지한다.
- 다섯 개가 현재 viewport에 모두 들어오지 않는 아주 작은 폭에서는 wrap 대신 horizontal scroll을
  허용한다. 단, 첫 화면에서 선택된 chip이 보이도록 scroll 위치를 조정하고, 화면 가장자리에 잘린
  chip이 있다는 시각 cue를 둔다.

### 저비용 vs 고비용

- **저비용** — 5개 고정 row + CSS overflow-x, 선택 색·border·check. 한 줄 밀도가 안정적이다.
- **고비용** — scroll-snap, 선택 chip 자동 scroll, keyboard roving focus, fade cue, responsive
  measurement. 작은 화면 접근성에는 좋지만 4일 MVP에서 얻는 이득이 제한적이다.

## 7. Empty states

### 규범·공개 디자인 시스템

- Material은 empty state를 목록 0개·검색 결과 0개처럼 콘텐츠가 없을 때의 혼란 방지 상태로 정의한다.
  기본 구성은 **non-interactive image + text tagline**이고, image는 neutral/subtle, tagline은
  positive·brand-consistent·비행동형 문장이어야 한다. ([Material empty states, 구버전](https://m1.material.io/patterns/empty-states.html))
- Material은 완전 빈 화면 대신 starter content, 짧은 educational content, 오타를 보정한 best match를
  대안으로 제시한다. ([Material empty states, 구버전](https://m1.material.io/patterns/empty-states.html))
- Shopify Polaris는 title·subtitle·primary action 구조, primary CTA 하나, illustration을
  thoughtfully 사용하라고 한다. illustration은 decorative로 구현할 수 있다.
  ([Polaris Empty state](https://polaris-react.shopify.com/components/layout-and-structure/empty-state))
- Atlassian은 empty state가 full-screen뿐 아니라 panel·table·container 안에도 나타날 수 있다고
  설명한다. ([Atlassian messages](https://design-system-docs-proxy.services.atlassian.com/foundations/content/designing-messages/))
- 따라서 **illustration 필수라는 합의는 없음**. Material은 기본 image를 예시하지만 Polaris·Atlassian은
  상태와 action 구조를 더 본질로 본다.

### 출시 제품 관찰

- Apple HIG tab bar는 섹션 콘텐츠가 비어도 tab button을 숨기거나 disable하지 말고, 왜 unavailable한지
  설명하라고 한다. ([Apple HIG — Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars))
- Apple Music·Spotify의 empty copy/illustration exact 문구와 화면 치수는 공개 support 문서에서
  충분히 확인하지 못했다. **확인 못 함**.

### TuneBox 권고

- 구조는 `optional icon/art → heading → one-sentence explanation → one primary action`으로 통일한다.
  action이 없는 filtered-empty만 heading+설명으로 둔다.
- Library 0곡: “음악을 추가해 보세요” + `음악 추가` 버튼
- Diary 0건: “오늘의 기분을 남겨 보세요” + `일기 쓰기` 버튼
- mood filter 결과 0건: “이 분위기의 곡이 아직 없어요” + filter 초기화 또는 설명
- 검색 0건: query를 그대로 반복하고 “다른 검색어를 입력해 보세요” + clear action
- illustration은 필수가 아니다. TuneBox는 동일한 MoodArtwork/LP icon을 작은 decorative visual로
  재사용하고, text와 button이 의미를 완결하게 한다. 아이콘을 탭해야만 다음 단계로 가는 구조는
  만들지 않는다.
- empty와 error를 분리한다. 파일 재연결 실패는 “곡이 없음”이 아니라 오류·복구 action 상태다
  ([09](09-implementation-spec.md) §5).

### 저비용 vs 고비용

- **저비용** — icon, heading, 짧은 copy, 44px primary button. 모든 empty state를 한 컴포넌트로
  재사용할 수 있다.
- **고비용** — 상태별 custom illustration, starter demo tracks, 교육용 card, 검색 best match.
  starter tracks는 첫 경험을 좋게 할 수 있으나 삭제·교체·라이선스까지 관리해야 한다.

## 8. journal/entry card + attached media reference

### 규범·공개 디자인 시스템

- Material card는 하나의 subject에 대한 photo·text·link를 함께 담는 entry point이고, content block은
  optional header, primary title, rich media, supporting text, actions로 구성할 수 있다.
  primary content를 위에 두고, card action은 일관되게 배치하며 overflow는 보통 오른쪽 위에 둔다.
  ([Material cards, 구버전](https://m1.material.io/components/cards.html))
- Material은 동종 데이터의 빠른 scan에는 card보다 list가 적합하고, card는 이미지·variable text·여러
  action처럼 서로 다른 data type을 합칠 때 사용하라고 한다. ([Material cards, 구버전](https://m1.material.io/components/cards.html))
- Apple Journal은 entry에 music·photo·audio·state of mind를 추가할 수 있고, Music에서 Share →
  Journal로 thoughts와 함께 entry를 만들 수 있다. attachment는 inline 배치·reorder가 가능하다.
  ([Apple Journal 시작하기](https://support.apple.com/en-mide/guide/iphone/iph0e5ca7dd3/ios),
  [Apple Journal에 쓰기](https://support.apple.com/guide/iphone/write-in-your-journal-iph9824e83ce/26/ios/26),
  [Journal attachments](https://support.apple.com/en-ie/guide/iphone/iph492ee70a8/ios))

### 출시 제품 관찰

- Apple Journal은 text entry에 attached media를 추가하는 출시 사례이며, Music에서 entry를 시작할 수
  있다는 점에서 TuneBox의 “들은 곡 + 한 줄 감정” loop와 가장 가까운 공개 제품 사례다.
  ([Apple Journal에 쓰기](https://support.apple.com/guide/iphone/write-in-your-journal-iph9824e83ce/26/ios/26))
- Apple Journal의 실제 music attachment card의 고정 artwork 크기·row height·overflow 위치는
  공개 사용 설명서에서 **확인 못 함**. 이를 TuneBox의 pixel spec으로 주장하지 않는다.

### TuneBox 권고

- DiaryCard는 하나의 card 안에 다음 순서를 둔다.
  1. local date + mood badge/icon
  2. diary text — primary content
  3. attached media reference — text와 분리된 compact row
  4. card-level More/edit/delete action
- media reference는 `48×48 artwork + title 1줄 + artist 1줄 + play 44×44`로 한다. 여러 곡이면
  같은 row를 세로로 반복하고, MVP에서는 3개 이상을 `외 n곡`으로 축약한다.
- media reference는 full player의 복제물이 아니다. 재생 버튼을 누르면 global player state만 바뀌고,
  DiaryCard의 row는 현재 곡 title·playing state만 갱신한다.
- 삭제된 track은 entry에서 제거하지 않고 `삭제된 곡` label과 neutral artwork를 보여 준다. 이것은
  diary의 기록을 조용히 바꾸지 않기 위한 data contract 결정이다 ([08](08-concept-tunebox.md) §Data contract).
- card 안에 또 하나의 큰 Card를 넣지 않고 divider·surface tint로 attached media가 연결된 block임을
  보인다. text와 media를 모두 primary click target으로 만들지 말고, More와 play는 별도 button으로 둔다.

### 저비용 vs 고비용

- **저비용** — diary text 아래 compact media row, play button, 삭제된 곡 fallback. data model과
  화면 구조가 단순하다.
- **고비용** — media row inline scrubber, 여러 track reorder, attachment drag, full-screen preview.
  Apple Journal에는 attachment reorder가 있지만 TuneBox는 제스처와 drag를 금지했으므로 MVP에서
  제외한다 ([09](09-implementation-spec.md) §8).

## 조사 한계와 결정 원칙

- Material 3·Apple HIG 모두 **음악 앱의 custom mini-player, full player, journal-media card에 대한
  단일 web-native 표준**을 제공하지 않는다. 공개 native 제품 사례를 web layout으로 변환해야 한다.
- 현재 Apple HIG는 tab bar의 “5개 이하”와 safe area를 말하지만 iPhone tab bar의 수치, 현재 Music row
  수치, MiniPlayer 높이를 공개하지 않는다. 이 값은 `확인 못 함`으로 남긴다.
- 5개 탭은 Apple의 기본 5개 이하 권고에는 들어오지만 Material 구버전의 항목 최소 80dp에는 맞지
  않는다. **따라서 5개를 유지하되 72px 폭·64px web bar·전체 label을 선택하는 것이 TuneBox의
  의도적인 절충**이다.
- 짧은 일정에서는 먼저 tab bar·MiniPlayer·TrackRow·EmptyState를 구현하고, full player의 secondary
  action과 generative art를 후순위로 둔다. 단, artwork placeholder는 데이터가 없는 오류가 아니라
  MVP의 정식 상태이므로 cheap baseline은 반드시 포함한다.

## 최종 권고 표

| 컴포넌트 | 권장 size / structure | source |
| --- | --- | --- |
| 하단 5탭 | 5개 `<a>`, icon+label, 항목 약 72px, visual bar 64px + safe area, active color+weight+56×28 pill, `라이브러리` ellipsis 금지 | [Material 3 navigation source](https://github.com/material-components/material-web/blob/main/labs/navigationtab/internal/navigation-tab-styles.css) · [Apple Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars) |
| MiniPlayer | 56px, 40px artwork, title/artist, pause·next 44px, bar 위에 stack, `idle`이면 숨김, tap → full player | [Apple Music controls](https://support.apple.com/en-ng/guide/iphone/iph676daac9b/26/ios/26) · [Spotify queue](https://support.spotify.com/gm/article/play-queue/) |
| Full-screen player | safe-area close → square art 280–320px 권고 → title/artist → 44px touch scrubber → previous/play/next → secondary actions | [Apple Playing audio](https://developer.apple.com/design/human-interface-guidelines/playing-audio) · [Media3 PlayerView](https://developer.android.com/reference/kotlin/androidx/media3/ui/PlayerView) |
| TrackRow | 72px two-line row, 48px artwork, title/artist 각 1줄 ellipsis, row primary play, trailing More 44px, playing tint+icon+`aria-current` | [Material lists](https://m1.material.io/components/lists.html) · [Spotify queue](https://support.spotify.com/gm/article/play-queue/) |
| MoodArtwork | stable `MoodId + track.id`, 5 mood palette, deterministic gradient/LP pattern, 같은 track은 모든 화면에서 동일, broken-image 금지 | [GitHub Identicons](https://github.blog/news-insights/company-news/identicons/) · [MDN gradients](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Images/Using_gradients) · [08](08-concept-tunebox.md) |
| Mood chip group | single-select radiogroup, 32–36px visual chip, 44px+ hit area, 8px gap, one-row horizontal scroll, selected fill+check/border | [Material FilterChip](https://developer.android.com/develop/ui/compose/quick-guides/content/create-chip) · [Material chips](https://m1.material.io/components/chips.html) |
| EmptyState | optional decorative icon → heading → one sentence → one primary action; filtered-empty는 action 선택, error와 분리 | [Material empty states](https://m1.material.io/patterns/empty-states.html) · [Polaris Empty state](https://polaris-react.shopify.com/components/layout-and-structure/empty-state) |
| DiaryCard + media | date/mood → text → 48px artwork media row → play 44px → More; 삭제된 곡 label 유지; nested card·drag 제외 | [Material cards](https://m1.material.io/components/cards.html) · [Apple Journal](https://support.apple.com/guide/iphone/write-in-your-journal-iph9824e83ce/26/ios/26) |

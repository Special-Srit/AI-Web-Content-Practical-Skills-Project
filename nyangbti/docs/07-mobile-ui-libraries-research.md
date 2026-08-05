# 모바일 우선 UI 컴포넌트 라이브러리 조사

- 조사일: 2026-08-05
- 조사 질문: `shadcn/ui`와 같은 방식이면서 모바일 우선으로 설계된 UI 컴포넌트 라이브러리가 존재하는가?
- 조사 범위: 모바일 웹용 라이브러리, shadcn 계열 포팅, Vant·Framework7·Ionic·Konsta UI·Material Web
- 먼저 확인한 배경: 현재 설계 문서는 shadcn/ui의 기본 Button·Input 치수가 모바일 터치 목표보다 작고, 하단 탭 바를 직접 만들어야 한다고 기록한다. 프로젝트 목표는 터치 타깃 44×44px 이상, 하단 탭 48×48px 이상, 본문 16px 이상이다. [`06-design-system.md`](06-design-system.md)

## 1. 판단 기준

- 유사 사례로 인정하려면 다음 네 조건을 모두 만족해야 한다.
  - 컴포넌트 코드를 프로젝트 안으로 복사하거나, 최소한 최상위 소스를 직접 수정할 수 있어야 한다. shadcn-svelte는 이 방식을 `Open Code`와 실제 코드 복사 방식으로 명시한다. [shadcn-svelte 소개](https://shadcn-svelte.com/docs)
  - CSS 변수 기반 테마 토큰으로 전체 룩을 바꿀 수 있어야 한다. [shadcn-vue 테마 문서](https://shadcn-vue.com/docs/theming)
  - 접근성 처리를 담당하는 프리미티브 위에 프로젝트가 수정 가능한 스타일 계층이 있어야 한다. shadcn-svelte는 Bits UI를 사용하는 headless component architecture라고 설명한다. [shadcn-svelte 소개](https://shadcn-svelte.com/docs)
  - MIT·Apache-2.0 등 자유 라이선스여야 한다. [shadcn-vue 저장소](https://github.com/unovue/shadcn-vue), [Material Web 라이선스](https://github.com/material-components/material-web/blob/main/LICENSE)
- 치수 표기 규칙:
  - `[소스 실측]`: 공식 저장소의 컴포넌트 소스에서 CSS 값을 직접 읽은 결과다.
  - `[문서 기재]`: 공식 문서가 설명한 값이다. 컴포넌트 기본값이라고 단정하지 않는다.
  - `확인 못 함`: 이번 조사에서 공식 소스의 해당 수치를 확인하지 못했다. 추측으로 채우지 않았다.
- “하단 탭 바”는 일반 Tabs가 아니라 모바일 화면 하단에 고정하거나 배치하는 전용 Tabbar·Tab Bar를 뜻한다.

## 2. 후보 비교표

### 2-1. 모바일 UI 기능과 실행 조건

| 후보 | 기본 터치 타깃 치수 | 하단 탭 바 | 바텀 시트 / Drawer | React 필수 여부·plain HTML 가능 여부 | 빌드 단계 / CDN | 라이선스 | 최근 릴리스 | 한글 텍스트 문제 | 1차 판정 |
|---|---|---|---|---|---|---|---|---|---|
| **Vant** | `[소스 실측]` Button 기본 44px, large 50px, small 32px, mini 24px. [button/index.less](https://raw.githubusercontent.com/youzan/vant/main/packages/vant/src/button/index.less) | 있음: `Tabbar`가 공식 컴포넌트 목록과 문서에 있다. [Vant 저장소](https://github.com/youzan/vant), [Tabbar 문서](https://vant-ui.github.io/vant/#/en-US/tabbar) | 있음: ActionSheet. [Action Sheet 문서](https://vant-ui.github.io/vant/#/en-US/action-sheet) | React는 필수가 아니지만 Vue 2 또는 Vue 3가 필요하다. plain HTML/CSS/JS만으로 쓰는 공식 사용 방식은 확인 못 함. [Vant 저장소](https://github.com/youzan/vant) | `npm i vant` 기반이며 Vue 빌드가 필요하다. CDN 사용 여부는 확인 못 함. [Vant 저장소](https://github.com/youzan/vant) | MIT. [Vant 저장소](https://github.com/youzan/vant) | **v4.10.0, 2026-06-28** (sol 검토로 정정 — 조사 시점 최신은 v4.9.24가 아니었음). [v4.10.0 릴리스](https://github.com/youzan/vant/releases/tag/v4.10.0) | Action Sheet의 보조 문구는 소스에서 `overflow-wrap: break-word`로 줄바꿈을 허용한다. 주 라벨의 한글 폭·줄바꿈 동작은 확인 못 함. [action-sheet/index.less](https://raw.githubusercontent.com/youzan/vant/main/packages/vant/src/action-sheet/index.less) | 모바일 웹에는 적합하지만, 코드를 복사해 넣는 shadcn 방식이 아니고 Vue 의존성이 있다. 접근성 프리미티브 계층도 확인 못 함. |
| **Framework7** | `[소스 실측]` 공식 toolbar 소스가 `var(--f7-toolbar-height)`를 사용하며 고정 px를 직접 넣지 않는다. `[문서 기재]` iOS toolbar 64px, Material toolbar 56px, 아이콘형 tabbar 80px. [toolbar.less](https://raw.githubusercontent.com/framework7io/framework7/master/src/core/components/toolbar/toolbar.less), [Toolbar/Tabbar 문서](https://framework7.io/docs/toolbar-tabbar) | 있음: `toolbar tabbar toolbar-bottom`; 휴대폰에서는 링크 폭을 화면 폭/링크 수로 배분한다. [Toolbar/Tabbar 문서](https://framework7.io/docs/toolbar-tabbar) | 있음: Sheet Modal은 기본적으로 아래에서 열린다. [Sheet Modal 문서](https://framework7.io/docs/sheet-modal) | React는 선택 사항이다. Framework7 Core는 HTML·CSS·JS로 사용할 수 있지만, shadcn처럼 컴포넌트를 프로젝트에 복사하는 방식은 아니다. [Framework7 문서](https://framework7.io/docs/), [Framework7 저장소](https://github.com/framework7io/framework7) | 패키지와 Framework7 빌드 구조를 사용하는 방식이다. 공식 CDN 경로는 확인 못 함. [Framework7 저장소](https://github.com/framework7io/framework7) | MIT. [Framework7 저장소](https://github.com/framework7io/framework7) | 공식 문서는 v9.1.2를 표시하지만, 릴리스 날짜는 확인 못 함. [공식 문서](https://framework7.io/docs/) | `[소스 실측]` `.tabbar-label`이 `white-space: nowrap` 및 `text-overflow: ellipsis`를 사용한다. 긴 한글 라벨은 줄바꿈 대신 잘릴 수 있다. [toolbar.less](https://raw.githubusercontent.com/framework7io/framework7/master/src/core/components/toolbar/toolbar.less) | 모바일 상호작용과 하단 탭에는 강하지만, dependency 기반의 통합 프레임워크이고 접근성 프리미티브 위의 복사형 스타일 계층은 확인 못 함. |
| **Ionic** | `[소스 실측]` `tab-bar.scss`에는 고정 높이 px가 없고 safe-area·flex 레이아웃을 사용한다. 기본 Button/Tab Button의 최종 타깃 높이는 확인 못 함. [tab-bar.scss](https://raw.githubusercontent.com/ionic-team/ionic-framework/main/core/src/components/tab-bar/tab-bar.scss) | 있음: `ion-tab-bar`, `slot="bottom"`. [ion-tab-bar 문서](https://ionicframework.com/docs/api/tab-bar), [컴포넌트 목록](https://ionicframework.com/docs/components) | 있음: Action Sheet와 Modal. [Ionic 컴포넌트 목록](https://ionicframework.com/docs/components), [Action Sheet 문서](https://ionicframework.com/docs/api/action-sheet) | React는 필수가 아니다. Ionic Core는 HTML·CSS·JavaScript Web Components로 사용할 수 있다. [Ionic 저장소](https://github.com/ionic-team/ionic-framework) | 패키지 사용이 공식 기본 경로다. CDN만으로 구성하는 공식 경로는 이번 조사에서 확인 못 함. [Ionic 저장소](https://github.com/ionic-team/ionic-framework) | MIT. [Ionic 라이선스](https://raw.githubusercontent.com/ionic-team/ionic-framework/main/LICENSE) | **v8.8.16, 2026-07-29** (sol 검토로 정정). [Ionic 릴리스](https://github.com/ionic-team/ionic-framework/releases) | Button 문서는 텍스트가 자동 줄바꿈되지 않으며 `ion-text-wrap`을 사용해야 한다고 설명한다. 한글 라벨이 길면 별도 wrap 처리가 필요하다. [Button 문서](https://ionicframework.com/docs/api/button) | plain HTML에 가장 가까운 모바일 UI 후보지만, Web Component 패키지 방식이며 접근성 프리미티브와 스타일 계층을 분리한 shadcn 방식은 아니다. |
| **Konsta UI** | `[문서 기재]` 테마 예시에서 iOS `h-11`=44px, Material `h-12`=48px를 보여주지만 Button의 기본 타깃 치수라고 명시하지 않는다. `[소스 실측]` Button 기본값은 확인 못 함. [테마 변형 문서](https://konstaui.com/react/theme-variants), [Button 문서](https://konstaui.com/react/button) | 있음: `Tabbar`; 하단 고정 예시와 safe-area 처리가 있다. [Tabbar 문서](https://konstaui.com/react/tabbar) | 있음: Sheet Modal와 Action Sheet. [Sheet Modal 문서](https://konstaui.com/react/sheet), [컴포넌트 목록](https://konstaui.com/react/) | React·Vue·Svelte 중 하나가 필요하다. plain HTML/CSS/JS 사용은 확인 못 함. [Konsta UI](https://konstaui.com/), [Konsta 저장소](https://github.com/konstaui/konsta) | `npm i konsta`와 Tailwind CSS 구성이 필요하다. CDN-only 경로는 확인 못 함. [Konsta UI](https://konstaui.com/), [설치 문서](https://konstaui.com/react/installation) | MIT. [Konsta UI](https://konstaui.com/) | v5.3.0, 2026-07-28. [Konsta UI 릴리스 노트](https://konstaui.com/release-notes) | 한글 라벨의 길이·줄바꿈에 관한 공식 경고나 소스 근거는 확인 못 함. | 모바일 디자인에는 가깝지만 Tailwind class/theme variant 방식이고 React·Vue·Svelte가 필요하므로 프로젝트 제약과 shadcn의 네 조건을 동시에 만족하지 않는다. |
| **Material Web** | `[소스 실측]` Button 내부 touch target overlay가 `height: max(48px, 100%)`이고 48px 기준 wrapper 여백을 계산한다. [touch-target.scss](https://github.com/material-components/material-web/blob/main/button/internal/_touch-target.scss) | 전용 bottom tabbar는 확인 못 함. `Tabs`는 있으나 일반 Tabs다. [컴포넌트 소스 목록](https://github.com/material-components/material-web/tree/main), [Tabs 문서](https://material-web.dev/components/tabs/) | 전용 bottom sheet·Drawer 컴포넌트는 저장소 컴포넌트 목록에서 확인 못 함. [컴포넌트 소스 목록](https://github.com/material-components/material-web/tree/main) | React는 필요 없다. Web Components를 HTML에서 사용할 수 있지만 JavaScript 모듈을 로드해야 한다. [Material Web 저장소](https://github.com/material-components/material-web) | import map을 이용한 buildless CDN 예시가 있고, production 설치·빌드 경로도 제공한다. [Material Web 저장소](https://github.com/material-components/material-web) | Apache-2.0. [Material Web 라이선스](https://github.com/material-components/material-web/blob/main/LICENSE) | **v2.5.0, 2026-07-14** (sol 검토로 정정 — maintenance mode 표기는 그대로 유효). [v2.5.0 릴리스](https://github.com/material-components/material-web/releases/tag/v2.5.0) | 한글 라벨의 길이·줄바꿈에 관한 공식 경고나 소스 근거는 확인 못 함. | 48px 터치 타깃과 토큰 테마는 유용하지만, maintenance mode이고 bottom tab/sheet가 없으며 복사형 primitive 구조도 아니다. [Material Web 저장소](https://github.com/material-components/material-web) |
| **shadcn-vue** | `[소스 실측]` Button·Input 기본 치수의 이번 조사 직접 확인은 못 함. | 공식 컴포넌트 목록에는 Tabs가 있으나 bottom tabbar 전용 컴포넌트는 없다. [컴포넌트 목록](https://shadcn-vue.com/docs/components) | 있음: Drawer와 Sheet. [Drawer 문서](https://shadcn-vue.com/docs/components/drawer), [컴포넌트 목록](https://shadcn-vue.com/docs/components) | Vue/Nuxt가 필요하다. plain HTML/CSS/JS 사용은 불가능한 구조다. [shadcn-vue 저장소](https://github.com/unovue/shadcn-vue), [shadcn-vue 소개](https://shadcn-vue.com/docs) | Tailwind CSS와 Vue 빌드가 필요하다. [shadcn-vue 설치 문서](https://shadcn-vue.com/docs/installation) | MIT. [shadcn-vue 저장소](https://github.com/unovue/shadcn-vue) | **v2.8.1, 2026-07-29** (sol 검토로 정정). [shadcn-vue 릴리스](https://github.com/unovue/shadcn-vue/releases) | 한글 라벨의 길이·줄바꿈에 관한 공식 경고나 소스 근거는 확인 못 함. | shadcn 방식 자체에는 가장 가깝지만 Vue 포트이며 모바일 우선 라이브러리로 설계됐다는 근거는 확인 못 했다. |
| **shadcn-svelte** | `[소스 실측]` Button·Input 기본 치수의 이번 조사 직접 확인은 못 함. | 공식 목록·Tabs 문서에서 Tabs는 확인되지만 bottom tabbar 전용 컴포넌트는 확인 못 함. [Tabs 문서](https://shadcn-svelte.com/docs/components/tabs), [컴포넌트 목록](https://shadcn-svelte.com/docs) | 있음: Drawer는 bottom 방향을 지원한다. [Drawer 문서](https://shadcn-svelte.com/docs/components/drawer) | Svelte/SvelteKit가 필요하다. plain HTML/CSS/JS 사용은 불가능한 구조다. [shadcn-svelte 소개](https://shadcn-svelte.com/docs) | Tailwind CSS와 Svelte 빌드가 필요하다. CSS 변수 생성과 의존성 설치를 CLI가 처리한다. [CLI 문서](https://shadcn-svelte.com/docs/cli) | MIT. [shadcn-svelte About](https://svelte-4.shadcn-svelte.com/docs/about) | 최근 릴리스 날짜는 확인 못 함. 공식 저장소의 최신 변경은 계속 확인된다. [공식 저장소](https://github.com/huntabyte/shadcn-svelte) | 한글 라벨의 길이·줄바꿈에 관한 공식 경고나 소스 근거는 확인 못 함. | 코드 복사·CSS 변수·headless primitive·MIT는 가장 잘 맞지만, 모바일 우선이 아니고 Svelte가 필요하다. |

### 2-2. shadcn 방식 네 조건 점검

| 후보 | 1. 코드 복사·직접 수정 | 2. CSS 변수 기반 테마 | 3. 접근성 프리미티브 위 스타일 | 4. 자유 라이선스 | 네 조건 결과 |
|---|---|---|---|---|---|
| **Vant** | `npm i vant` 방식이며 shadcn식 프로젝트 복사 배포는 확인 못 함. [Vant 저장소](https://github.com/youzan/vant) | `[소스 실측]` **충족.** Button 소스 자체가 `--van-button-*` CSS custom property 선언으로 구성되어 있다 (2026-08-05 Claude 재확인). [button/index.less](https://raw.githubusercontent.com/youzan/vant/main/packages/vant/src/button/index.less) | 저장소가 접근성을 “still improving”이라고 설명하며, 별도 headless primitive 계층은 확인 못 함. [Vant 저장소](https://github.com/youzan/vant) | MIT. [Vant 저장소](https://github.com/youzan/vant) | **불충족**: 1·3 (2는 충족으로 정정) |
| **Framework7** | HTML 마크업을 작성해 사용하지만, 소스를 프로젝트로 복사하는 shadcn 방식은 아님. [Framework7 문서](https://framework7.io/docs/) | CSS Variables 섹션과 `--f7-*` 토큰을 제공한다. [CSS Variables 문서](https://framework7.io/docs/css-variables), [Toolbar/Tabbar 문서](https://framework7.io/docs/toolbar-tabbar) | 통합 컴포넌트 구조이며, shadcn식 headless accessibility primitive 계층은 확인 못 함. [Framework7 저장소](https://github.com/framework7io/framework7) | MIT. [Framework7 저장소](https://github.com/framework7io/framework7) | **불충족**: 1·3 |
| **Ionic** | Web Components의 사용 소스는 HTML에 직접 쓰지만, Ionic 컴포넌트 소스를 복사하는 방식은 아님. [Ionic 저장소](https://github.com/ionic-team/ionic-framework) | CSS Custom Properties로 테마를 지정한다. [CSS Variables 문서](https://ionicframework.com/docs/theming/css-variables) | native HTML button을 렌더링하고 접근성을 설명하지만, shadcn식 headless primitive + 별도 스타일 계층은 아님. [Button 문서](https://ionicframework.com/docs/api/button) | MIT. [Ionic 라이선스](https://raw.githubusercontent.com/ionic-team/ionic-framework/main/LICENSE) | **불충족**: 1·3 |
| **Konsta UI** | `npm i konsta`와 React·Vue·Svelte 컴포넌트 import 방식이다. [Konsta UI](https://konstaui.com/) | Tailwind CSS class와 iOS/Material variant가 중심이며, shadcn식 CSS 변수 토큰 테마는 확인 못 함. [Theme Variants 문서](https://konstaui.com/react/theme-variants) | 별도 accessibility primitive 계층은 확인 못 함. [Konsta 저장소](https://github.com/konstaui/konsta) | MIT. [Konsta UI](https://konstaui.com/) | **불충족**: 1·2·3 |
| **Material Web** | 패키지 Web Components를 사용하며 소스 복사 방식은 아님. [Material Web 저장소](https://github.com/material-components/material-web) | CSS custom properties와 Material design tokens를 사용한다. [Button 문서](https://material-web.dev/components/button/) | 접근 가능한 Web Components를 제공하지만, shadcn식 headless primitive를 프로젝트에 복사하고 스타일을 얹는 계층은 아님. [Material Web 저장소](https://github.com/material-components/material-web) | Apache-2.0. [Material Web 라이선스](https://github.com/material-components/material-web/blob/main/LICENSE) | **불충족**: 1·3 |
| **shadcn-vue** | 실제 컴포넌트 소스를 가져와 수정하는 shadcn 계열 방식이다. [shadcn-vue 저장소](https://github.com/unovue/shadcn-vue), [Button 문서](https://shadcn-vue.com/docs/components/button) | CSS 변수·semantic theme token을 권장한다. [Theming 문서](https://shadcn-vue.com/docs/theming) | Radix Vue를 기반으로 한 포트다. [Radix Vue About](https://radix.shadcn-vue.com/docs/about) | MIT. [shadcn-vue 저장소](https://github.com/unovue/shadcn-vue) | **네 조건은 충족에 가까움**. 단 모바일 우선·plain HTML 조건을 충족하지 않음 |
| **shadcn-svelte** | 실제 컴포넌트 코드를 복사하고 직접 수정하는 방식을 명시한다. [소개](https://shadcn-svelte.com/docs), [수동 설치](https://shadcn-svelte.com/docs/installation/manual) | CSS 변수 기반 테마를 사용한다. [구 테마 문서](https://tw3.shadcn-svelte.com/docs/theming), [CSS 변수 registry 문서](https://shadcn-svelte.com/docs/registry/registry-item-json) | Bits UI를 사용하는 headless architecture라고 명시한다. [소개](https://shadcn-svelte.com/docs) | MIT. [About](https://svelte-4.shadcn-svelte.com/docs/about) | **네 조건은 충족에 가까움**. 단 모바일 우선·plain HTML 조건을 충족하지 않음 |

## 3. 후보별 소견

- **Vant**
  - 모바일 웹을 직접 대상으로 하고 Button 기본값을 소스에서 44px로 확인할 수 있어 터치 목표에는 가장 명확하게 대응한다. [Vant 저장소](https://github.com/youzan/vant), [Button 소스](https://raw.githubusercontent.com/youzan/vant/main/packages/vant/src/button/index.less)
  - 그러나 Vue 의존성, npm 설치 방식, 접근성 계층의 불명확성 때문에 “shadcn과 같은 방식”의 엄격한 후보는 아니다. [Vant 저장소](https://github.com/youzan/vant)

- **Framework7**
  - Tabbar와 Sheet Modal을 함께 제공하고, 공식 문서가 좁은 화면에서 tabbar 링크를 화면 폭에 맞춰 배분한다고 설명한다. [Toolbar/Tabbar 문서](https://framework7.io/docs/toolbar-tabbar), [Sheet Modal 문서](https://framework7.io/docs/sheet-modal)
  - 한글 탭 라벨은 `nowrap`·ellipsis 규칙을 먼저 확인해야 한다. 긴 네 글자 이상 라벨을 그대로 넣는 설계에는 주의가 필요하다. [toolbar.less](https://raw.githubusercontent.com/framework7io/framework7/master/src/core/components/toolbar/toolbar.less)

- **Ionic**
  - plain HTML에 가까운 Web Components이고 Tab Bar·Action Sheet가 모두 있어 모바일 셸 기능은 풍부하다. [Ionic 저장소](https://github.com/ionic-team/ionic-framework), [컴포넌트 목록](https://ionicframework.com/docs/components)
  - 다만 Button 텍스트가 자동 줄바꿈되지 않는다는 문서 설명이 있으므로 한글 문구는 `ion-text-wrap` 또는 더 짧은 라벨을 별도로 설계해야 한다. [Button 문서](https://ionicframework.com/docs/api/button)

- **Konsta UI**
  - iOS·Material 모양과 Tabbar·Sheet를 제공해 모바일 화면 설계에는 잘 맞는다. [Konsta UI](https://konstaui.com/), [Tabbar 문서](https://konstaui.com/react/tabbar), [Sheet 문서](https://konstaui.com/react/sheet)
  - Tailwind 및 React·Vue·Svelte 기반이므로 이 프로젝트의 plain HTML·CSS·JS 제약에서 바로 선택할 수 없다. [Konsta 설치 문서](https://konstaui.com/react/installation)

- **Material Web**
  - Button의 48px touch target overlay와 CSS token 테마는 프로젝트의 터치 기준에 참고할 가치가 있다. [touch-target.scss](https://github.com/material-components/material-web/blob/main/button/internal/_touch-target.scss), [Button 문서](https://material-web.dev/components/button/)
  - 그러나 저장소가 maintenance mode라고 명시하고 있고, 조사한 컴포넌트 목록에 bottom tabbar·bottom sheet가 없다. [Material Web 저장소](https://github.com/material-components/material-web)

- **shadcn-vue**
  - 코드 소유권·CSS 변수·Radix Vue 조합은 질문의 shadcn 유사성에 가장 직접적으로 대응한다. [Theming 문서](https://shadcn-vue.com/docs/theming), [Radix Vue About](https://radix.shadcn-vue.com/docs/about)
  - 그러나 Vue/Nuxt가 필요하고, 공식 컴포넌트 목록에서 모바일 bottom tabbar를 확인하지 못했으며, 모바일 우선 제품으로 설명되지 않는다. [컴포넌트 목록](https://shadcn-vue.com/docs/components), [shadcn-vue 저장소](https://github.com/unovue/shadcn-vue)

- **shadcn-svelte**
  - 코드 복사·headless primitive·CSS 변수·MIT의 조합은 네 조건을 가장 충실히 보여주는 사례다. [소개](https://shadcn-svelte.com/docs), [About](https://svelte-4.shadcn-svelte.com/docs/about)
  - 하지만 Svelte/SvelteKit 빌드가 필요하고, 모바일 우선 라이브러리나 bottom tabbar 제공 라이브러리라는 근거는 확인하지 못했다. [소개](https://shadcn-svelte.com/docs), [Tabs 문서](https://shadcn-svelte.com/docs/components/tabs)

## 4. 결론

- **질문의 네 조건과 이 프로젝트의 plain HTML·CSS·JS·모바일 우선 조건을 모두 만족하는 대안은 확인 못 함.**
- 후보를 기능 중심으로만 보면 Vant·Framework7·Ionic·Konsta UI는 bottom tabbar와 sheet 계열이 있지만, 모두 dependency 기반 통합 라이브러리이거나 React·Vue·Svelte가 필요하다. [Vant 저장소](https://github.com/youzan/vant), [Framework7 문서](https://framework7.io/docs/), [Ionic 저장소](https://github.com/ionic-team/ionic-framework), [Konsta UI](https://konstaui.com/)
- 후보를 shadcn 방식 중심으로 보면 shadcn-vue·shadcn-svelte가 가장 가깝지만, 모바일 우선 기본값·전용 bottom tabbar·plain HTML 실행 조건을 충족하지 않는다. [shadcn-vue 컴포넌트 목록](https://shadcn-vue.com/docs/components), [shadcn-svelte 컴포넌트 목록](https://shadcn-svelte.com/docs)

## 5. 권고

1. **프로젝트의 현재 스택을 유지하는 권고:** 적합한 외부 대안을 억지로 도입하지 않고, 기존 shadcn 토큰 개념을 참고해 plain HTML·CSS·JS로 Button/Input을 44px 이상, bottom tabbar를 48px 이상으로 직접 만든다. Ionic·Framework7의 Tabbar·Sheet 동작과 Vant·Material Web의 터치 치수를 참고 자료로만 사용한다. [Ionic Tab Bar](https://ionicframework.com/docs/api/tab-bar), [Framework7 Tabbar](https://framework7.io/docs/toolbar-tabbar), [Vant Button 소스](https://raw.githubusercontent.com/youzan/vant/main/packages/vant/src/button/index.less), [Material Web touch target 소스](https://github.com/material-components/material-web/blob/main/button/internal/_touch-target.scss)
2. **스택 변경이 허용될 때의 차선:** shadcn-svelte 또는 shadcn-vue를 “모바일 UI 라이브러리”가 아니라 코드 소유권·토큰·접근성 구조의 참고 사례로 검토한다. bottom tabbar와 44/48px 치수는 별도 컴포넌트로 추가해야 한다. [shadcn-svelte 소개](https://shadcn-svelte.com/docs), [shadcn-vue Theming](https://shadcn-vue.com/docs/theming)


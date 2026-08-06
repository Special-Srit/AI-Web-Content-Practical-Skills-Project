# 06. 디자인 시스템 — shadcn/ui 기반 (모바일 우선)

## 0. 상태와 이 문서의 범위

- 스택 **승인됨 (2026-08-05)** — 강사가 **React · Vue · Svelte를 모두 허용**. 따라서 원안대로 **React + shadcn/ui**로 간다
  - 이 승인은 **냥BTI 기준**. 팀 프로젝트에 그대로 적용되는지는 별도 확인 필요
  - Tailwind는 shadcn/ui가 요구하므로 React 승인에 포함되는 것으로 본다 — 이견이 나오면 그때 확인
- 강사 지시 (2026-08-05) — **피그마 디자인을 확정한 뒤 코딩**. 따라서 지금 단계는 코드가 아니라 규격
- 이 문서 범위 = **토큰 이름·수치·컴포넌트 규격(구조)**. 팔레트·서체·이미지·톤앤매너는 **Srit이 무드보드(단계 8)에서 결정**
- 근거 출처 — shadcn/ui 공식 문서 및 `new-york-v4` 레지스트리 소스를 직접 조회 (2026-08-05). 값을 추정하지 않음

## 1. 승인 결과와 무관하게 토큰이 먼저인 이유

**2026-08-05 승인으로 경로 A 확정.** 아래 표는 기록으로 남긴다 — 판단 근거를 설명할 수 있어야 하고(프로젝트 규칙), B·C는 나중에 스택을 되돌려야 할 때의 보험이기도 하다.

토큰 이름과 수치는 **세 경로 모두에서 그대로 살아남는다.** 그래서 강사 답을 기다리는 동안 만들어도 버려질 위험이 없었다.

| 경로 | 내용 | 피그마 디자인 | 토큰 | 재작업 |
| --- | --- | --- | --- | --- |
| A. React + shadcn/ui | 원안 | 그대로 사용 | 그대로 | 없음 |
| B. Basecoat | shadcn v4를 **plain HTML + Tailwind**로 이식한 MIT 라이브러리. **시맨틱 테마 변수**가 shadcn과 호환 | 그대로 사용 | 재사용 가능 | 컴포넌트별 이관 점검 필요 |
| C. 직접 작성 CSS | 같은 변수명으로 손으로 작성. 의존성 0 | 그대로 사용 | 그대로 | 컴포넌트 전부 |

- **B가 기존 대비안(sol로 React→vanilla 변환)보다 우수** — 변환이 아니라 **같은 시맨틱 토큰을 쓰는 다른 구현**이기 때문. 다만 Basecoat가 보장하는 것은 **테마 변수 호환**이지 마크업·동작·컴포넌트 커버리지·치수의 동일성이 아니다 → 1:1 이관이 아니라 **컴포넌트별 이관 점검**이 필요하다 (sol 검토, 2026-08-05). 그래도 피그마 작업과 토큰은 폐기되지 않음
- ~~단 B·C 모두 **Tailwind를 쓸지**가 별도 확인 사항~~ → 경로 A 확정으로 무의미

## 2. 토큰 — shadcn 기본 테마 (light, oklch)

색 공간은 **oklch**이며 Tailwind v4 기준이다. 아래는 **기본값(중립 무채색)** — Srit의 무드보드 색이 들어갈 **자리 표시**로 읽을 것.

| 변수 | 기본값 | 용도 |
| --- | --- | --- |
| `--background` / `--foreground` | `oklch(1 0 0)` / `oklch(0.145 0 0)` | 화면 바탕 · 본문 |
| `--card` / `--card-foreground` | `oklch(1 0 0)` / `oklch(0.145 0 0)` | 처방 3블록, 개체 카드 |
| `--popover` / `--popover-foreground` | `oklch(1 0 0)` / `oklch(0.145 0 0)` | S1-a 오버레이, 시트 |
| `--primary` / `--primary-foreground` | `oklch(0.205 0 0)` / `oklch(0.985 0 0)` | `검사 시작` · `다음` · `결과 저장` |
| `--secondary` / `--secondary-foreground` | `oklch(0.97 0 0)` / `oklch(0.205 0 0)` | `저장된 결과 n건 보기` · `공유·카드` |
| `--muted` / `--muted-foreground` | `oklch(0.97 0 0)` / `oklch(0.556 0 0)` | 검사 안내 3줄, 저장 고지 |
| `--accent` / `--accent-foreground` | `oklch(0.97 0 0)` / `oklch(0.205 0 0)` | 선택지 hover·선택 상태 |
| `--destructive` | `oklch(0.577 0.245 27.325)` | 금지 목록에 쓸지 **아래 마지막 항목 참조** |
| `--border` / `--input` | `oklch(0.922 0 0)` | 카드·입력 테두리 |
| `--ring` | `oklch(0.708 0 0)` | 포커스 링 (키보드 접근성) |
| `--radius` | `0.625rem` (10px) | 아래 스케일의 기준값 |

- `--radius` 하나를 바꾸면 파생 스케일이 전부 따라온다 — `sm` 60% · `md` 80% · `lg` 100% · `xl` 140% · `2xl` 180% · `3xl` 220% · `4xl` 260%
- `--chart-1` ~ `--chart-5`, `--sidebar-*` 계열은 **이 프로젝트에서 쓰지 않음** (차트 없음, 사이드바 없음 — 하단 탭 셸이므로)
- 기본 base color 선택지 — Neutral · Stone · Zinc · Mauve · Olive · Mist · Taupe
- **금지 목록에 `--destructive`(빨강)를 쓸지는 검증 대상** [판단] — 03 §11-6은 **문장 톤**을 `훈계·죄책감 유발 금지`로 제한한 것이지 색을 규정한 것이 아니다(sol 검토 반영, 2026-08-05). 색을 피하는 근거는 §11-6이 아니라 **토큰의 의미론** — `destructive`는 삭제·오류 등 파괴적 상태용이고, 금지 목록은 조언이지 오류 상태가 아니다. 빨강이 경고조로 읽힐 위험은 실제 화면에서 확인할 것. 대안은 `muted` 계열 + 아이콘·라벨 구분

## 3. 모바일 밀도 문제 — 이 문서에서 가장 중요한 지점

**shadcn/ui의 기본 치수는 데스크톱 밀도다.** 레지스트리 소스를 직접 확인한 실측값:

| 컴포넌트 | shadcn 기본 | px | 우리 요구치 | 판정 |
| --- | --- | --- | --- | --- |
| Button `default` | `h-9` | 36 | — | 44 미달 |
| Button `sm` | `h-8` | 32 | — | 미달 |
| Button `lg` | `h-10` | 40 | — | **최대 사이즈도 44 미달** |
| Button `xs` | `h-6` | 24 | — | 모바일 사용 금지 |
| Button `icon` | `size-9` | 36×36 | — | AA(24) 통과, AAA(44) 미달 |
| Input | `h-9` | 36 | — | 미달 |
| `TabsList` (컨테이너) | `h-9` | 36 | 하단 탭 48×48 | 미달 |
| `TabsTrigger` | `h-[calc(100%-1px)]` | 컨테이너에 종속 | — | 자체 고정 높이 없음 |
| `RadioGroupItem` | `size-4` | 16×16 | 선택지 ≥44 | **크게 미달** |
| Textarea | `min-h-16` | 64 | — | 통과 |

- `TabsTrigger` 행은 sol 검토로 정정함(2026-08-05) — `h-9`는 **`TabsList`** 의 값이고 trigger는 컨테이너 높이를 따른다. 즉 Tabs는 **높이가 고정되어 못 쓰는 것이 아니라** `className`으로 덮을 수 있다. 하단 탭을 직접 만드는 근거는 §5로 옮김

우리 요구치의 출처는 세 곳이고 서로 다른 숫자다 — **가장 엄격한 값을 채택**한다.

| 기준 | 값 | 어디서 |
| --- | --- | --- |
| WCAG 2.2 SC 2.5.8 (AA) | 24×24 | 최저선 |
| WCAG 2.1 SC 2.5.5 (AAA) | 44×44 | 04-ia 조사 |
| Material (하단 내비) | 48×48 dp | 04-ia 조사 |
| 04-design §6 자체 명세 | 선택지 **≥44**, 하단 탭 **≥48×48** | 우리 와이어프레임 |

### 채택할 모바일 밀도 오버레이

- 기본 버튼 높이 **44px** — shadcn `lg`(40)조차 부족하므로 `size` 변형을 프로젝트에서 재정의
- **아이콘 버튼도 44×44 이상** — `icon`(36×36)을 그대로 쓰지 않는다. 해당 대상은 S1의 `[×]`, S2의 `[뒤로]`, S3(C2)의 `[뒤로]`, 시트의 `[닫기]`
- 하단 탭 히트 영역 **48×48** — 현재 피그마 파일은 84×48로 **세로만 충족** (Claude가 `get_document`로 실측, 2026-08-05. 파일이 미저장이라 외부 검토자는 확인 불가)
- Input **44px** 이상 — 문항 화면에는 입력이 없고 S3-c 이름 입력에만 해당
- 선택지 5개(`선택지 1~4` + `모르겠음`)는 **각 44px 이상**, 세로 스택
  - `RadioGroupItem` 자체는 16×16이므로 **동그라미 크기를 키우는 방식이 아니다.** 행 전체를 `<label>`로 감싸 `min-height: 44px`인 클릭 영역을 만들고, radio 시맨틱은 유지한다 (sol 검토 반영)
- shadcn의 `xs` · `icon-xs` 사이즈는 **사용하지 않음**

## 4. 서체 — 충돌 지점 하나

- shadcn 기본은 Button·Select·Tabs가 `text-sm` = **14px**. Input·Textarea는 `text-base md:text-sm` = **모바일 16px / `md` 이상 14px** (아래 정정 항목 참조)
- 3-1 강사 규칙 — 본문 **최소 16px**, 작은 글씨 **최소 14px**, 스크린은 **고딕체만**(명조 금지)
- 판정 — **버튼·탭 라벨을 16px로 올린다.** 버튼 라벨은 `작은 글씨`가 아니라 본문급 조작 대상
- **정정 (sol 검토, 2026-08-05)** — Input·Textarea는 `text-base`가 아니라 **`text-base md:text-sm`** 이다. 즉 모바일에서 16px, `md` 이상에서 14px. 모바일 우선인 우리에게는 결과적으로 16px이라 문제없으나, `md:text-sm`을 **데스크톱 적응 시 그대로 두면** 본문 최소 16px 규칙과 어긋난다
- 이 기본값은 **iOS WebKit의 포커스 확대**를 피하는 데 유용하다 — 다만 `항상 확대된다`는 것은 과장이고, 소형 화면 iOS WebKit이 16px을 포커스 확대 기준으로 삼되 **페이지 확대가 허용된 경우에 한해** 동작한다. shadcn 공식 문서가 이 의도를 명시한 적은 없으므로 **문서화된 의도가 아니라 유용한 효과**로 읽을 것 (sol 검토 반영)
- 결론 — 모바일에서 입력 글자 크기를 **16px 미만으로 낮추지 말 것**
- 강사가 지정할 **폰트 3종은 아직 미발표** → 피그마에서는 우선 자리 표시 서체로 두고, 발표 후 토큰만 교체

## 5. 화면별 컴포넌트 매핑 (04-design §6) — **부분 매핑**

**이 표는 완전한 매핑이 아니다** (sol 검토, 2026-08-05). 주요 영역만 담고 있으며, 아래 영역은 아직 매핑되지 않았다. 구현 전에 채울 것:

- S1 `[×]` (returnTo 조건부) · S2 `[뒤로]`와 카운터 · S3 조건부 배너 S3-a/S3-b · S3 결과 히어로 · S3 근거 링크 · S3 비교 진입 CTA · S3(C2) `[뒤로]`
- 시트 `[닫기]`와 저장 고지 영역 · T2/T3 빈 상태와 고지 1줄 · T3 자원 분리 권고문과 `[한 마리 더 검사]` · T4 `[검사 시작]`

| 화면 · 영역 | shadcn 컴포넌트 | 비고 |
| --- | --- | --- |
| S1 hero · inspection-guide | Card 또는 소재 없음(순수 레이아웃) | 카드로 감쌀지는 시각 판단 |
| S1 `검사 시작` / `저장된 결과 n건 보기` | Button `default` / `secondary` | 44px 오버레이 적용 |
| S1-a 이어하기 분기 | **AlertDialog** | 파괴적 선택(`새로 시작`)이 있으므로 Dialog보다 AlertDialog |
| S2 진행률 바 | Progress | 16단계 |
| S2 선택지 5개 | RadioGroup + 행 전체 `<label>` | 단일 선택 + `다음` 확정형이라 RadioGroup이 의미상 정확. 단 `RadioGroupItem`은 16×16이므로 **행을 `min-height:44px` 클릭 영역으로 감쌀 것** (§3) |
| S2 `다음` | Button `default` | 하단 고정 |
| S3 처방 3블록 · 금지 목록 | Card ×4 | 순서 협상 불가 (§6) |
| S3 유형 서사 (접힘) | **Collapsible** | Accordion은 다중 항목용 — 단일 접힘이므로 Collapsible |
| S3 `결과 저장` / `공유·카드` | Button `default` / `secondary` | 하단 2버튼 |
| S3-c 저장 시트 | **Drawer** (하단) + Input + Button | 공식 문서상 Beta 표기 없음 (2026-08-05 확인) |
| S3-d 공유 시트 | Drawer + Button ×2~3 | Web Share API 분기는 §6 참조 |
| T2 개체 카드 | Card + Badge(유형) + Button ×2 | 카드 n건 반복 |
| T3 비교 열 | Card 가로 스크롤 | shadcn Carousel은 과함 — CSS scroll-snap [판단] |
| T4 알아보기 4블록 | Card 또는 Separator 구획 | 하위 페이지 없음 |
| **하단 4탭 내비게이션** | **해당 컴포넌트 없음 — 직접 제작** | 아래 참조 |

- **shadcn/ui 공식 레지스트리에 모바일 하단 탭 바 전용 컴포넌트가 없다.** 내비게이션 계열로는 Sidebar와 Navigation Menu가 있으나 둘 다 하단 탭 셸이 아니다.
  - 직접 만드는 근거는 **전용 컴포넌트 부재 + 라우팅 시맨틱**이다. 하단 4탭은 패널 전환(Tabs)이 아니라 **목적지 이동**이므로 `<nav>` + 링크가 맞다
  - ~~Tabs는 `h-9`에 묶여 48×48을 못 맞춘다~~ — **틀림 (sol 검토, 2026-08-05).** `h-9`는 `TabsList`의 값이고 `className`으로 덮을 수 있다. 치수가 아니라 시맨틱이 이유다
- 이 항목은 **발표의 AI·도구 한계 절에 쓸 소재** — "유명 UI 킷이 모바일 하단 내비를 제공하지 않아 직접 만들었다"는 구체적 근거

## 6. Srit이 결정할 것 (내가 정하지 않음)

| 항목 | 왜 Srit의 결정인가 |
| --- | --- |
| base color 7종 중 택1 | 무드보드(단계 8)의 결과물 |
| `--radius` 값 | 톤앤매너 — 귀여운·상냥한 컨셉이면 기본 10px보다 큰 값 |
| 다크 모드 지원 여부 | 범위 결정. 지원하면 토큰이 2배, 발표까지 7.5일 |
| 폰트 3종 중 택1 | 강사 미발표 |
| 금지 목록 색 처리 | §2의 `--destructive` 톤 충돌 판단 |

## 7. 강사에게 확인할 것

1. ~~**React + shadcn/ui 사용 가능 여부**~~ → **해결 (2026-08-05).** React·Vue·Svelte 모두 허용
2. ~~React 불가 시 **Tailwind CSS는 허용되는가**~~ → 경로 A로 확정되어 실익 없음. Tailwind는 shadcn/ui의 전제
3. 폰트 3종 (미발표) — **미해결**
4. ~~팀 프로젝트에도 같은 스택을 쓸 수 있는가~~ → **해결 (2026-08-05 저녁).** 팀 프로젝트도 React·Vue·Svelte 허용 확인됨(`DECISIONS.md`)

## 8. 피그마 키트 — 공식 문서가 등재한 무료 2종

shadcn 공식 문서 `ui.shadcn.com/docs/figma`가 등재한 무료 파일. 40여 컴포넌트를 손으로 다시 그리지 않아도 된다.

| 파일 | 제작 | 문서상 설명 |
| --- | --- | --- |
| shadcn/ui components | Sitsiilia Bergmann | 컴포넌트 체계에 맞춘 구조 · 지속 관리됨 |
| shadcn/ui design system | Pietro Schirano | 코드 구현과 일치하도록 제작 |

- 유료 6종도 등재되어 있으나 이 프로젝트에 필요 없음
- **키트를 고른 뒤 실제 컴포넌트 치수를 직접 재 볼 것** — 공식 문서는 두 파일을 등재만 할 뿐 각 컴포넌트의 현재 치수를 보증하지 않는다(sol 검토). shadcn 기본값을 그대로 재현했다면 §3의 44/48 오버레이가 그대로 필요하다
- 현재 와이어프레임 파일(`Concept`, 미저장)과 별개 파일로 두고, 와이어프레임은 근거로 남길 것

## 9. 시각적 밀도·질감 보정 (2026-08-06, sol 검토 + luna 조사)

UI 목업 6장(`nyangbti/assets/ui-mockup/`, §Related의 프롬프트 08)이 구조·내용은 맞지만
"디자인 관점에서 너무 단순하다"는 평가를 받았다. sol의 이미지 검토와 luna의 근거 조사가
**독립적으로 같은 결론 5개에 수렴**했고, luna는 각 결론을 실제 디자인 시스템 출처로
뒷받침했다. 코딩 시 그대로 적용할 것 — 새 팔레트나 컨셉 변경이 아니라 **이미 정한 Stone
팔레트를 UI 크롬에도 드러내는 밀도 보정**이다.

### 핵심 원칙 — 두 검토가 공통으로 경고한 것

**"단순함"과 "미완성"은 다르다.** S2(문항)·S3-c(저장 시트)·T2(내 기록)가 다른 화면보다
차분한 것 자체는 정상이다 — 질문·리스트·시트 화면은 원래 히어로 화면보다 조용해야
한다(Atlassian: raised elevation은 하나의 초점 영역에만, 나머지는 flat). 결함은
사진이 없다는 것이 아니라 **깊이·질감이 전혀 없어 "잘라낸 사각형"처럼 보인다는 것**.
따라서 처방은 "화면마다 사진 추가"가 아니라 **하나의 일관된 표면·아이콘·타이포 체계**다.

### 1. 표면·elevation — 두 단계로 제한

- 근거 — Material 3는 elevation을 0~+5 6단계로 제한하고 평상시엔 0~3만 씀
  ([Material Web elevation](https://material-web.dev/components/elevation/)). Atlassian은
  "기본 표면은 flat, raised는 하나의 초점 영역에만, overlay는 다이얼로그·시트 전용"이라고
  명시([Atlassian elevation](https://atlassian.design/foundations/elevation/))
- 적용 — 카드마다 그림자를 넣지 않는다. **primary(결과 카드) 1곳만 elevated, 나머지는
  flat + 구분선/여백**
  - primary: `rounded-2xl bg-stone-50 ring-1 ring-stone-200/80 shadow-[0_2px_8px_-2px_rgb(28_25_23/0.08)]`
  - secondary 카드: `rounded-xl bg-white ring-1 ring-stone-200/80 shadow-none`
  - 리스트(T2 등): 카드 그림자 대신 `divide-y divide-stone-200`
  - 오버레이(S3-c 등): `shadow-[0_8px_24px_-8px_rgb(28_25_23/0.18)]` — 이 등급은 시트·다이얼로그 전용

### 2. Stone 팔레트를 텍스트가 아니라 표면에 쓴다

- 근거 — 지금 목업은 팔레트가 사진에만 있고 UI 크롬은 흑백에 가깝다. Notion은
  `brown_background`류 톤 배경을 실제 컴포넌트에 쓰고([Notion API changelog](https://developers.notion.com/changelog/block-colors-are-now-supported-in-the-api)),
  Fluent는 배경·브랜드·보더·그림자 토큰을 분리해 "회색 텍스트 온 화이트"로 뭉개지 않게 함
  ([Fluent color](https://fluent2.microsoft.design/color))
- 적용 — 2차 섹션 배경을 `bg-stone-50`으로, primary 버튼은 `bg-stone-900 text-white
  hover:bg-stone-800`, secondary(낮은 우선순위) 액션은 `bg-stone-100 text-stone-900
  ring-1 ring-stone-200`

### 3. 아이콘 — 한 체계로 통일

- 근거 — "채운 아이콘이 더 따뜻하다"는 근거는 없음(luna, 검증 못 함이라고 명시). 대신
  Fluent 2는 평상시 Regular·선택 시에만 Filled를 씀([Fluent 2 iconography](https://fluent2.microsoft.design/iconography)),
  Material Symbols는 rounded 스타일이 두꺼운 타이포·둥근 요소와 잘 어울린다고 명시
  ([Material Web icons](https://material-web.dev/components/icon/))
- 적용 — 현재 화면마다 획 두께·스타일이 섞여 있음(S3의 실뭉치·낚싯대·손하트가 서로 다른
  선 굵기). **Material Symbols Rounded, medium weight로 통일**, 선택 상태에서만
  `FILL 1`. 모든 아이콘을 `bg-stone-100 rounded-full` 배지 안에 배치해 동일한 무게감을 줌

### 4. 타이포 위계 — 역할별로 고정

- 근거 — Material 3 type scale과 Apple HIG Dynamic Type 모두 역할마다 크기·굵기·행간이
  다름([Material 3 typography](https://developer.android.com/develop/ui/compose/designsystems/material3?hl=en),
  [Apple HIG typography](https://developer.apple.com/design/human-interface-guidelines/typography))
- 적용 — 결과 제목 `text-[28px]/[34px] font-semibold`, 카드 제목 `font-semibold`,
  본문 `font-normal`, 날짜·메타 정보 `text-sm text-stone-500`. §3의 16px/14px 최저
  기준은 유지하되, **굵기·행간까지 역할별로 고정**해 지금처럼 전부 비슷한 무게로 보이지
  않게 함

### 5. 조용한 화면엔 사진 대신 모티프 하나

- 근거 — Airbnb·Windows 11·Headspace 전부 "차분함"을 절제된 표면 + **모티프 1~2개**
  (사진 또는 일러스트 또는 재질감)로 만들지, 화면 전체를 사진으로 채우지 않음
  (Windows 11은 "calm·soft·warm"을 공식 설계 원칙으로 명시:
  [Windows 11 design principles](https://learn.microsoft.com/en-us/windows/apps/design/design-principles))
- 적용 — S2엔 선택 상태 `ring-2 ring-stone-400/30` 하나, T2엔 유형별 `border-l-4
  border-stone-400` 억센트 하나, S3-c엔 시트 자체의 상향 그림자 하나 — **반복되는 작은
  모티프가 화면 전체에 사진을 넣는 것보다 효과적**

### 적용 범위 — 지금 결정하지 않는 것

이 절은 코딩 시 CSS/Tailwind 값을 이렇게 쓰라는 **구현 지침**이다. 색상 자체(Stone
확정 여부)·`--radius`·폰트는 여전히 §6 "Srit이 결정할 것" 표를 따른다 — 여기서 제안한
수치는 Stone 팔레트가 최종 확정된다는 전제의 파생값일 뿐, 팔레트 자체를 바꾸지 않는다.

## Related

- `04-design.md` §6 — 9화면 와이어프레임 (이 문서의 매핑 대상)
- `04-ia-structure-research.md` — 44×44 · 48×48 근거의 원 출처
- `03-ux-research.md` §11-6 — 금지 목록 톤 제약
- `docs/prompts/` — 발표용 프롬프트 기록 (08 UI 목업 생성, 09 sol 검토, 10 luna 조사)

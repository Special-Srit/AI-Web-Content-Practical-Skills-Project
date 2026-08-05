# 04. IA 구조 연구 — 냥BTI

## 0. 연구 범위와 결론

- 소비 대상 — [03 UX 연구 §7-2·§10·§11-6](03-ux-research.md) 기능 후보와 여정 요구사항, [02 시장조사](02-market-research.md) 경쟁사 목록
- 제품 제약 — 16문항 이내·약 3분·1문항 1화면·회원가입 없음·localStorage만 사용·모바일 우선
- 핵심 결론 [판단] — 냥BTI의 핵심은 여러 목적지를 오가는 앱이 아니라 한 번에 완료하는 짧은 검사이므로, **검사 문항 흐름에는 persistent bottom tab bar보다 linear/wizard flow가 적합**
- 강사 요구와의 긴장 [추론] — 4–5개 footer navigation은 top-level destination 4–5개가 실제로 존재한다는 전제와 충돌
- 가장 방어 가능한 절충 [판단] — 앱 셸에는 `검사 / 내 기록 / 비교 / 알아보기(결정 필요)` 4개를 두고, 문항 진행 중에는 단계 표시·뒤로·다음에 집중하는 task mode 적용
- 미확정 원칙 [판단] — `알아보기`는 페르소나가 직접 요구한 destination이 아니므로(§7-2에 독립 페이지 요구 없음) **추가 페이지로 권고만 하고, Srit의 승인 전에는 확정하지 않음**

## 1. Persistent tab bar인가, linear flow인가

### 1-1. Apple HIG

- 탭 바의 역할 — 앱의 **top-level sections** 사이 탐색과 각 섹션의 navigation state 보존, action 실행 도구가 아님 ([Apple HIG — Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars))
- 탭 바의 지속성 — 다른 섹션으로 이동할 때도 탭 바를 보이게 하여 현재 영역을 잊지 않도록 하는 지침 ([Apple HIG — Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars))
- 적용 조건 [추론] — 검사 중인 16개 문항은 서로 독립된 top-level section이 아니라 하나의 과업 단계이므로, 각 문항을 탭 destination으로 취급할 근거 부족
- 예외의 근거 — Apple HIG가 modal view로 탭 바를 덮는 경우를 visible-tab 예외로 제시 ([Apple HIG — Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars))
- 냥BTI 적용 [판단] — 검사 시작 후에는 `task mode`를 별도 과업으로 다루고 탭 바 대신 `뒤로 / 진행률 / 다음`을 우선 배치하는 안

### 1-2. Material Design

- bottom navigation의 역할 — 모바일에서 **어디서든 접근해야 하는 top-level destinations**로 이동하는 컴포넌트 ([Material Design — Bottom navigation](https://m2.material.io/components/bottom-navigation/))
- bottom navigation의 조건 — 3–5개 destination, 화면 간 **일관된 위치와 접근성**, 서로 동등한 중요도. 단 스크롤 시 **나타나거나 사라질 수 있고** 일시적으로 덮일 수 있음 → 상시 가시성은 요구 사항 아님 ([Material Design — Bottom navigation](https://m2.material.io/components/bottom-navigation/))
- 명시적 비적용 — 단일 과업(single task)이나 설정에는 bottom navigation 사용 비권장 ([Material Design — Bottom navigation](https://m2.material.io/components/bottom-navigation/))
- 냥BTI 적용 [추론] — `검사 시작 → 문항 → 결과`는 Material이 말하는 single task에 가까우므로, 문항 화면에서 4개 destination을 동등하게 노출하면 과업 집중과 component 의미가 약화
- 강사 요구와의 충돌 — 4–5개를 채우기 위해 in-flow step이나 결과 내부 블록을 destination으로 포장하는 방식은 Material의 top-level/equal-importance 조건 불충족

### 1-3. Nielsen Norman Group

- linear workflow의 적용 — 드물거나 복잡한 과업에서는 선택지와 중단을 최소화한 linear workflow가 빠를 수 있고, 사용자가 단계 순서를 결정해야 하는 부담을 줄이는 방식 ([NNGroup — Application Design Showcase 2012, “Linear Workflow and Wizards”](https://media.nngroup.com/media/reports/free/Application_Design_Showcase_2nd_edition.pdf))
- wizard의 의미 — linear workflow의 전형적 구현으로 설명됨. 선택지·순서 결정 부담을 줄인다는 서술까지가 출처 범위이며, `단계를 빠뜨리지 않게 한다`는 효용은 자료에 없음 [추론] ([NNGroup — Application Design Showcase 2012](https://media.nngroup.com/media/reports/free/Application_Design_Showcase_2nd_edition.pdf))
- 냥BTI 적용 [추론] — 관찰 답변을 순서대로 모으고 마지막에 한 번 판정하는 3분 검사는 자유 탐색보다 wizard 성격이 강함
- 설계 시사점 [판단] — 문항 화면에는 전체 footer nav보다 `현재 n/전체`, 답변 수정용 뒤로, 다음/완료를 중심으로 두는 안
- 한계 [판단] — NNGroup 자료는 냥BTI에 대한 직접 사용성 검증이 아니라 일반적인 workflow guidance이므로, 실제 채택은 이후 테스트로 확인 필요

### 1-4. 종합 판정

- persistent bottom tab bar의 적합 조건 — 독립적이고 반복 방문되며, 어느 화면에서나 빠른 전환이 필요한 동등한 top-level destination 3–5개 ([Material Design — Bottom navigation](https://m2.material.io/components/bottom-navigation/))
- 냥BTI의 핵심 과업 — 짧은 단일 검사와 결과 확인, 문항 간 자유 전환이 목적이 아닌 순차 입력 ([03 UX 연구 §7-2](03-ux-research.md))
- 결론 [판단] — **검사 flow 자체에는 persistent tab bar 비권장**; 앱 셸의 기록·비교·정보 영역에는 footer navigation 적용 가능
- 강사 요구를 만족하는 방법 [판단] — ① 검사 중 task mode, ② 검사 밖 앱 셸에 4개 destination, ③ `알아보기` 추가 여부를 별도 의사결정으로 공개

## 2. 탭 수 guidance와 4–5의 출처

| 출처 | 최소 | 최대·상한 | 실제로 말하는 범위 |
| --- | --- | --- | --- |
| Apple HIG — Tab bars | 수치 최소값 미제시 | tab bar 자체의 고정 숫자 최대값 미제시; 적절한 수를 사용하고 overflow를 피하라는 지침 ([Apple HIG — Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars)) | fewer tabs가 일반적으로 더 탐색하기 쉽고, 숨겨지는 `More` 시나리오를 제한하라는 원칙 |
| Apple HIG — Tab views | 수치 최소값 미제시 | **6개 이상이면 다른 방식 고려** ([Apple HIG — Tab views](https://developer.apple.com/design/human-interface-guidelines/tab-views)) | 서로 밀접한 content panes를 전환하는 tab view guidance; iOS bottom tab bar와 동일한 숫자 규칙 아님 |
| Apple HIG — customizable tab bar | 수치 최소값 미제시 | 기본 목록은 **5개 이하를 목표**로 제시 ([Apple Developer — Enhancing your app content with tab navigation](https://developer.apple.com/documentation/swiftui/enhancing-your-app-content-with-tab-navigation)) | compact/regular view 크기 사이 연속성을 위한 기본 목록 guidance; 모든 앱의 의무 상한 아님 |
| Material Design 2/Android 공식 문서 | **3개** | **5개** ([Material Design — Bottom navigation](https://m2.material.io/components/bottom-navigation/), [Android Developers — Navigation bar](https://developer.android.com/develop/ui/compose/components/navigation-bar)) | bottom navigation은 3–5개 equal-importance top-level destination; 3개 미만이면 tabs 고려, 5개 초과면 다른 navigation 사용 |
| Nielsen Norman Group | 수치 최소·최대값 확인 불가 | 수치 최소·최대값 확인 불가 | 인용 자료의 핵심은 탭 개수보다 related content용 tabs와 linear task용 wizard의 구분 ([NNGroup — Application Design Showcase 2012](https://media.nngroup.com/media/reports/free/Application_Design_Showcase_2nd_edition.pdf)) |

- `4–5개`에 가장 가까운 공개 수치 지침 — Apple의 universal tab-bar rule이 아니라 **Material bottom navigation의 3–5개 convention**. 단 **어떤 출처도 `4–5`라고 말하지 않음** → 강사 표현의 출처는 미검증 [추론] ([Material Design — Bottom navigation](https://m2.material.io/components/bottom-navigation/))
- 오해 방지 [판단] — `4–5개면 언제나 좋은 IA`가 아니라, 4–5개의 **실제 동등한 top-level destination이 있을 때** 좋은 범위
- 냥BTI 적용 [판단] — 기능 후보를 억지로 4개로 분해하기보다 3개 genuine destination을 인정하고, 4번째를 추가하려면 페이지의 필요·비용을 공개적으로 평가

## 3. 비교 서비스의 navigation 관찰

- 조사 기준 — [02 시장조사 §A·§C](02-market-research.md)의 직접 경쟁·포맷 벤치마크 목록에서 공식 페이지의 현재 link structure만 재확인
- 주의 — 테스트 본문 안의 feature block과 global navigation은 구분; 현재 페이지에서 nav를 확인하지 못한 서비스는 미검증으로 표기

| 서비스 | 공식 페이지에서 확인된 navigation 또는 구조 | 냥BTI에 주는 시사점 | 확인 상태 |
| --- | --- | --- | --- |
| **PurrJung** | `테스트` 그룹에 고양이 성격 테스트·나는 무슨 고양이·다묘 비교·내 고양이, `탐색` 그룹에 16가지 유형·품종·호환성 차트·통계·2026 센서스, `알아보기` 그룹에 아티클·가이드·원리·고양이 5요인·소개 ([PurrJung 한국어 페이지](https://purrjung.org/ko)) | 한 번의 검사만이 아니라 결과·비교·탐색·교육 content를 별도 destination으로 확장한 사례; 냥BTI가 그대로 복제해야 할 IA라는 뜻 아님 [판단] | 공식 페이지의 현재 footer/link group 확인 |
| **DBTI / 포동** | footer에 `서비스`(DBTI 검사·16가지 유형·훈련 가이드·커뮤니티), `정보`(반려견 정보·견종 백과·훈련 팁·이벤트), `지원`(FAQ·문의·앱 다운로드·제휴 문의) 그룹 ([DBTI 공식 사이트](https://www.fordong.co.kr/)) | 검사 외 가이드·커뮤니티·정보를 별도 destination으로 운용하는 확장형 benchmark; 03의 범위 외 커뮤니티를 냥BTI에 추가할 근거 아님 [판단] | 공식 footer 확인; 고양이 서비스가 아닌 강아지 서비스 |
| **푸망 Poomang** | 현재 공식 홈은 hamburger와 `FAQ / View All Tests / Contact Us / Log In`을 노출하고, 본문은 새 테스트·트렌딩·Discover Yourself 등 content collection으로 구성 ([Poomang 공식 홈](https://poomang.com/)) | 테스트 하나가 아니라 큐레이션 플랫폼이므로 collection navigation이 자연스러운 사례; 냥BTI의 단일 검사에 그대로 적용 불가 [추론] | 공식 홈에서 현재 영어 locale 구조 확인; 한국어 테스트 화면의 동일 nav는 별도 검증 필요 |
| **PetMBTI** | 공식 홈 본문에서 사람·고양이·강아지·말 MBTI, 관리·훈련, 궁합, 장난감 추천, 이름 생성기, 운세, 사진 콘테스트 섹션 확인 ([PetMBTI 공식 사이트](https://www.petmbti.com/)) | 기능 폭이 넓은 포털형 구성; 전역 navigation label/order는 현재 페이지의 접근 가능한 본문만으로 확정 불가 [판단] | feature section 확인, global nav는 미검증 |
| **BLTI / 스모어** | 공식 quiz URL이 현재 `LOADING`만 반환 ([BLTI 공식 quiz](https://smore.im/quiz/bNsw3grZjo)) | 문항형 테스트의 global footer nav 존재 여부 판단 불가 | **navigation 미검증** |
| **포캣멍센터** | 조사 대상 공식 test URL이 현재 fetch 오류 반환 ([포캣멍센터 테스트](https://forcatmungcenter.org/test/)) | 테스트 페이지의 nav 및 결과 진입 구조 판단 불가 | **navigation 미검증** |
| **cats-mbti** | 공식 URL에서 navigation label을 안정적으로 확인할 수 있는 본문이 제공되지 않음 ([cats-mbti 공식 사이트](https://cats-mbti.netlify.app/)) | 개인 제작 테스트의 footer structure를 benchmark로 채택하지 않음 [판단] | **navigation 미검증** |

- 경쟁사 공통 결론 [추론] — 확인 가능한 확장형 서비스는 검사 하나를 넘어 `결과/비교/가이드/정보/커뮤니티`를 destination으로 갖지만, 이는 **앱이 이미 반복 탐색 content를 보유한 경우**의 구조
- 냥BTI의 차이 — [03 UX 연구](03-ux-research.md)의 persona는 3분 안에 `우리 고양이의 왜 그런지 → 처방`을 얻는 과업이 중심이며, 커뮤니티·통계·계정은 범위 외

## 4. 03 기능 inventory의 IA 분류

### 4-1. genuine top-level destination 후보

| destination 후보 | 소비하는 기능 | 판단 | 근거와 주의 |
| --- | --- | --- | --- |
| **검사** | 1–16문항, 관찰형 질문, 모르겠음, 진행률, 이어하기/새로 시작 | top-level 확정 후보 [판단] | 서비스의 핵심 과업; 질문·진행률·뒤로·다음은 destination이 아니라 이 안의 flow step |
| **내 기록** 또는 **내 고양이** | localStorage 결과 재열기, 검사일, 재검사, 공유 결과에서 내 검사 진입, 여러 마리 개별 저장 | top-level 후보 [판단] | 공통 니즈에 `결과를 남기고 다시 열어보기`, C의 개체별 저장 요구 존재 ([03 UX 연구 §7-1·§7-2](03-ux-research.md)); login/account와 혼동 금지 |
| **비교** | 여러 마리 성향 나란히 비교, 유형 조합별 자원 분리 권고 | secondary top-level 후보, 첫 화면 기본 destination 아님 [판단] | feature 9가 **“secondary 전용 기능이므로 첫 화면 아님”**으로 명시됨 ([03 UX 연구 §7-2](03-ux-research.md)); §10은 결과 화면에서 비교 진입점을 요구 ([03 UX 연구 §10](03-ux-research.md)) |
| **알아보기** | Feline Five 참고·탐색적 연구 한계·4축 단순화 설명, 관찰 기준/행동 해석 guide | **추가 destination 권고, 미확정** [판단] | 03의 근거 표기는 결과 안의 in-flow block이며, persona가 독립 페이지를 요구하지 않음; 4번째 탭 확보를 위해 추가할 경우 비용 공개 필요 |

- top-level로 승격하지 않을 항목 [판단] — `추천 놀이 / 추천 장난감 / 상호작용 방식 / 금지 목록 / 장난감 1순위 / 자원 분리 권고`는 결과를 행동으로 바꾸는 result content block
- top-level로 승격하지 않을 항목 [판단] — `근거 표기`는 결과 신뢰를 위한 result block; `근거/원리` 페이지로 확장할 때만 `알아보기` destination 후보
- top-level로 승격하지 않을 항목 [판단] — `결과 카드 생성·저장·공유`, 링크 복사, OG image는 result action; Apple HIG의 “tab bar는 action이 아니라 navigation” 원칙과 불일치 ([Apple HIG — Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars))
- top-level로 승격하지 않을 항목 [판단] — `검사 전 안내`, `최근 일주일 관찰 기준`, `모르겠음 허용 비율`, `localStorage 한계 고지`, `공유 결과임 표시`는 각 화면의 안내·예외 처리
- top-level로 승격하지 않을 항목 [판단] — `검사일 기록·재검사 안내`는 내 기록의 데이터와 검사 flow 양쪽에 걸치는 기능이지 별도 탭 아님
- 범위 외 — 사회적 증거·커뮤니티·기기 간 동기화·장기 추이 그래프·사진 자동 분석·카카오 SDK는 [03 UX 연구 §7-3](03-ux-research.md)의 명시적 범위 외; top-level 후보로 재도입 금지

### 4-2. in-flow step과 page section의 경계

- 검사 시작 — `회원가입 없음·약 3분`, 관찰 기준, 모르겠음 가능 여부를 확인하는 landing/entry content; 독립 tab보다 `검사` destination의 진입 화면 ([03 UX 연구 §10](03-ux-research.md))
- 질문 진행 — 1문항 1화면, 진행률, back/next, 답변 유지·수정, 중단·재개; linear flow step ([03 UX 연구 §7-2·§11-2·§11-3](03-ux-research.md))
- 결과 — 유형명·서사·처방 3블록·금지 목록·근거 표기·카드 공유를 한 결과 page 안에서 우선순위로 배치; top-level nav로 쪼갤 경우 결과 도달 전 탐색 분기 발생 [판단]
- 비교 — 결과 page의 하단 진입점 또는 `비교` destination; 단 한 마리만 저장된 경우 빈 화면 대신 “한 마리 더 검사” 안내 필요 ([03 UX 연구 §10·§11-4](03-ux-research.md))
- 자원 분리 — 다묘 조합 결과에만 의미가 생기는 비교 하위 content; 단독 `자원 분리` tab 불필요 [판단]
- 재검사 — 내 기록에서 시작하는 action이면서 검사 flow로 재진입하는 cross-flow; 독립 destination 불필요 [판단]

## 5. 4–5개 requirement를 위한 recommended tab set

### 5-1. 연구상 권고안

| 순서 | 라벨 후보 | destination 역할 | 반드시 지킬 조건 |
| --- | --- | --- | --- |
| 1 | **검사** | 새 검사·이어하기·검사 진입 | landing의 기본 진입점; 검사 중에는 task mode로 전환 가능 |
| 2 | **내 기록** 또는 **내 고양이** | 저장된 결과·검사일·개체 목록·재검사 | 계정처럼 보이지 않게 localStorage 한계 고지; 결과 0개 empty state 필요 |
| 3 | **비교** | 2마리 이상 결과 비교·자원 분리 | secondary 유지; 기본 landing이 비교가 아님; 0–1마리 상태도 안내 화면 제공 |
| 4 | **알아보기** | 근거·한계·관찰형 문항 해설·고양이 행동 guide | **추가 page 결정 전까지 미확정**; generic content가 늘어나 검사 목적을 가리지 않도록 범위 제한 |

- 권고 tab set의 성격 [판단] — 1–3번은 03에서 직접 추적되는 genuine destination, 4번은 강사 요구를 4개로 맞추기 위한 **명시적 추가 추천**
- `내 기록`과 `내 고양이` 선택 [판단] — 기록 재열기 중심이면 `내 기록`, 개체별 저장·비교 진입을 앞세우면 `내 고양이`; 둘을 별도 2개 탭으로 분리할 근거 부족
- 5번째 탭 권고 — 없음 [판단]; 공유·설정·근거 표기·처방 블록은 action 또는 in-flow content라서 5번째를 채우기 위해 승격하지 않음

### 5-2. persistent 여부에 따른 세 운영안

> **전제 정정 (sol 검토 반영)** — 03의 문구는 “첫 화면 기본 destination 아님”이 아니라
> **`첫 화면에 노출 금지`** ([03 §6](03-ux-research.md), [§7-2 feature 9](03-ux-research.md)).
> footer tab은 선택되지 않아도 **보이는 것 자체가 첫 화면 노출**이므로, `비교`를 탭에
> 두는 안은 **첫 화면이 탭 셸 밖에 있을 때만** 03과 양립함. 아래 안들은 이 조건으로 수정됨.

- **안 A — IA 적합도 우선 [판단]**
  - **첫 화면(시작)·문항·결과는 탭 셸 밖의 linear flow** — footer 없음. 이것이 03의 `첫 화면 노출 금지`를 지키는 방법
  - 앱 셸 — `검사 / 내 기록 / 비교 / 알아보기(결정 필요)` footer navigation. 결과 이후 또는 기록 진입 시부터 노출
  - 문항 화면 — `뒤로 / n/16 / 다음`만 제공하는 task mode
  - 장점 — linear task의 집중·짧은 완료 경로·in-flow와 top-level 분리, 03 등급 판정 보존
  - 비용 — Apple의 명시된 예외는 **modal view가 tab bar를 덮는 경우**뿐이므로, 이 안은 그 예외에 해당하지 않음 ([Apple HIG — Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars)). full-screen modal로 구현하거나, **Material의 single-task 비적용 근거를 들어 Apple 지침에서 의도적으로 벗어난다고 명시**할 것 — “설명하면 된다”로 넘기지 않음
- **안 B — 강사 requirement 문자 준수 [판단]**
  - 모든 화면에 4개 footer tab — `검사 / 내 기록 / 비교 / 알아보기`
  - 장점 — 4–5개 footer navigation을 가장 직접적으로 충족
  - **03 위반** — 첫 화면에 `비교` 탭이 보이므로 feature 9의 `첫 화면 노출 금지`와 정면 충돌. 채택하려면 03의 등급 판정을 바꾸는 결정을 먼저 해야 함
  - 비용 — 단일 검사 중에도 unrelated destination을 노출; Material의 single-task 비적용 및 equal-importance 조건과 긴장 ([Material Design — Bottom navigation](https://m2.material.io/components/bottom-navigation/))
- **안 C — 비교를 결과 CTA로만 유지 [판단]**
  - footer — `검사 / 내 기록 / 알아보기(결정 필요)` 3개, 결과 하단에서만 `비교` 진입
  - 장점 — feature 9의 `첫 화면 노출 금지`를 조건 없이 지키는 **유일한 안**
  - 비용 — 강사 요구의 4–5개 미충족; 비교 discoverability 저하 가능성 [추론]
- 최종 권고 [판단] — **안 A**(첫 화면·문항·결과를 탭 셸 밖에 두는 조건부)를 기본안으로 제시. 03을 무조건 지키는 쪽이 우선이면 **안 C**, 강사가 모든 화면 persistent bar를 요구하면 **안 B**이며 이때는 03 등급 변경 결정이 선행되어야 함

## 6. Mobile web bottom-nav mechanics

### 6-1. safe-area inset

- 안전 영역의 의미 — `safe-area-inset-top/right/bottom/left`는 비직사각형 화면에서 content가 잘리지 않도록 user agent가 제공하는 거리 ([MDN — `env()` CSS function](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env))
- iPhone 대응 — `viewport-fit=cover`로 edge-to-edge를 사용할 때 `env(safe-area-inset-bottom)`을 bottom navigation과 content padding에 반영해야 Home indicator와 겹치지 않음 ([WebKit — Designing Websites for iPhone X](https://webkit.org/blog/7929/designing-websites-for-iphone-x/))
- 구현 기준 [판단] — footer 내부 padding에 `calc(기본 하단 여백 + env(safe-area-inset-bottom))`, main content의 마지막 padding에도 footer 높이 + safe-area 여유 반영
- fallback 기준 [판단] — `env(..., 0px)` fallback 제공; inset이 0이 되는 조건은 **직사각형 viewport이면서 toolbar·동적 키보드 등이 viewport를 차지하지 않을 때** ([MDN — `env()` CSS function](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env))

### 6-2. iOS Safari URL bar와 viewport

- viewport 변화 — WebKit이 mobile browser UI가 스크롤에 따라 변하는 문제를 위해 `svh`(small), `lvh`(large), `dvh`(dynamic) viewport unit을 구분하며 `dvh`는 스크롤 중 값이 변함 ([WebKit — New WebKit Features in Safari 15.4](https://webkit.org/blog/12445/new-webkit-features-in-safari-15-4/))
- URL bar 영향 [추론] — Safari URL bar가 접히거나 다시 나타날 때 visible area가 변하므로, `100vh` 하나에 의존한 full-height shell은 footer·content 겹침 위험
- fixed footer 주의 — iOS 15 시기 이력: Safari bottom bar 등장 시 fixed bottom tabs의 safe-bottom offset 오산 사례. **iOS 15.4에서 수정 완료(resolved)** → 현재 결함의 근거가 아니라 이 영역에 version별 버그가 있었다는 이력으로만 취급 ([WebKit Bug 232237](https://bugs.webkit.org/show_bug.cgi?id=232237))
- 구현 기준 [판단] — footer를 `bottom: 0`으로 고정하더라도 content 끝에 충분한 bottom padding을 예약하고, full-screen panel이 필요할 때만 `dvh/svh`를 목적에 맞게 선택
- 검증 한계 — Android Chrome은 테스트 가능하지만 iOS Safari는 문서 기반 설계·미검증이라는 프로젝트 제약; iOS 동작을 “검증 완료”로 표현하지 않음 ([AGENTS.md](../../AGENTS.md))

### 6-3. thumb reach와 target size

- bottom 위치의 장점 — Material이 bottom navigation을 handheld mobile에서 ergonomic하고 쉽게 닿는 위치로 설명 ([Material Design — Bottom navigation](https://m2.material.io/components/bottom-navigation/))
- W3C AA 기준 — WCAG 2.2 Target Size (Minimum)는 pointer target 최소 24×24 CSS px 또는 충분한 간격을 요구 ([W3C WAI — SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html))
- W3C AAA 기준 — WCAG 2.1 Target Size는 예외를 제외하고 44×44 CSS px를 요구 ([W3C WAI — SC 2.5.5](https://www.w3.org/WAI/WCAG21/Understanding/target-size))
- Material 권장 — touch target 최소 48×48dp와 일반적으로 8dp 이상 간격 권장 (**Material Design 1 아카이브 지침**, 현행 Material 아님) ([Material Design — Metrics & keylines](https://m1.material.io/layout/metrics-keylines.html))
- 구현 기준 [판단] — 냥BTI footer의 각 link/button hit area를 **최소 48×48 CSS px 이상 확보**, icon만 작게 만들고 label·padding으로 target을 넓히는 방식; 아이콘 시각 크기와 hit area 분리
- 모바일 우선 기준 [판단] — 4개 탭이라도 긴 한국어 라벨을 억지로 줄이거나 두 줄로 감싸지 않고, 짧은 명사형 라벨과 충분한 좌우 여백 사용

### 6-4. active state와 접근성

- navigation semantics — 주요 링크 묶음은 HTML `<nav>` landmark로 제공하여 보조기술이 navigation 영역으로 이동할 수 있게 함 ([MDN — navigation role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/navigation_role))
- 현재 page 표시 — global footer link에는 현재 page에 `aria-current="page"` 적용; multi-step 검사 indicator에는 `aria-current="step"` 적용 가능 ([MDN — `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current))
- tab widget와의 구분 — 실제로 한 panel만 전환하는 ARIA tablist를 구현할 때는 active tab에 `aria-selected="true"`, 나머지에 false 적용; 일반 page navigation link에 `aria-selected`를 붙이지 않음 ([W3C WAI-ARIA APG — Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/))
- 시각 상태 — active icon/label의 색상·weight·filled shape 등 2개 이상 신호 사용; 색상만으로 현재 위치를 표현하지 않음 [판단]
- focus 상태 — 키보드 사용자를 위해 `:focus-visible` outline을 유지하고, active state와 focus state를 같은 스타일로 뭉개지 않음 ([W3C WAI-ARIA APG — Keyboard Interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/))
- contrast — Material은 active destination에 Primary 또는 High-Emphasis 색, inactive에는 충분한 contrast를 요구 ([Material Design — Bottom navigation](https://m2.material.io/components/bottom-navigation/))

## 7. 결정이 필요한 지점

- **첫 화면을 탭 셸 안에 둘 것인가** (sol 검토로 추가된 지점)
  - A. 셸 밖 — 시작·문항·결과는 footer 없는 linear flow. 03의 `첫 화면 노출 금지` 준수, 4탭 유지 가능
  - B. 셸 안 — 구현 단순, 강사 요구에 가장 직접적. 단 03 등급 판정을 바꾸는 결정이 선행

- **문항 중 footer bar 처리**
  - A. task mode로 숨김 — 검사 집중·linear flow 적합, persistent tab expectation과 설명 필요
  - B. 4개 탭을 계속 표시 — 강사 요구 충족, 단일 과업 중 destination 경쟁·인지 부담 증가
- **4번째 `알아보기` page 추가 여부**
  - A. 추가 — 4-tab requirement 충족, 근거·한계·행동 guide를 한 곳에 모을 수 있음; persona 직접 근거 부족·콘텐츠 제작/유지 비용 발생
  - B. 추가하지 않음 — scope와 primary persona 정합성 유지; 3개 genuine destination만 남아 4–5 requirement와 충돌
- **`비교`의 노출 위치**
  - A. footer tab — C의 재방문 discoverability 확보; secondary 기능이 과도하게 top-level처럼 보일 위험
  - B. 결과 하단 CTA만 — “첫 화면 아님” 판정 보존; 다묘 사용자의 재진입성 저하 가능성
- **두 번째 탭 라벨**
  - A. `내 기록` — 검사일·재검사·이전 결과 중심, localStorage 한계 고지와 자연스러움
  - B. `내 고양이` — 개체별 저장·다묘 비교 진입과 자연스러움; 기록·계정 기능으로 오해 가능성

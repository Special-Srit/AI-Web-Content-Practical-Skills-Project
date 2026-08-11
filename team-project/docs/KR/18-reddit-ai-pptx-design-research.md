# 18. Reddit — AI로 더 좋은 PPT 만들기 실사용 후기 조사

작성 2026-08-06. `r/PowerPoint` 실사용자 스레드 + Anthropic 공식 문서(Reddit 댓글이
직접 링크)를 근거로 함. 방법: `old.reddit.com` 구독자 로그인 세션으로 직접 열람
(일반 WebSearch/WebFetch는 Reddit 도메인을 막음). 인용은 요지 요약이며 원문
장문 인용은 하지 않음.

## 1. "AI 특유의 티" — 실제로 뭘 말하는가

- **r/PowerPoint, "Spent 8 years as a Presentation Design Lead at McKinsey"**
  (1,305 upvote, 235 댓글) — 저자 본인 표현: AI 산출물엔 뚜렷한 지문이 있다 —
  **"박스 3개, 대충 아이콘 몇 개, 뜻은 없는데 그럴듯한 불릿"**. 결론은 "디자인이
  문제였던 적은 없다 — 문제는 항상 서사였다"였음. 슬라이드끼리 내용이 모순되고,
  6장이면 될 걸 22장으로 늘리는 게 진짜 실패 원인이라고 지적.
  [원문](https://old.reddit.com/r/powerpoint/comments/1sl170v/spent_8_years_as_a_presentation_design_lead_at/)
- 같은 스레드 상위 댓글(31 upvote, 11년차 프레젠테이션 디자인 리드): AI로 만들고
  마지막에 급하게 다시 맡기는 클라이언트가 늘고 있고, "다 똑같이 생기고 잘
  안 읽힌다"는 게 티가 난다고 함.
- **r/PowerPoint, "I spent a week building a 25-slide deck with Claude"**
  (163 upvote) — 상위 댓글(18 upvote): **"Claude 특유의 각지고 박스투성이인
  스타일 있지 않나요? 콘텐츠보다 디자인에서 더 헤맵니다."**
  [원문](https://old.reddit.com/r/powerpoint/comments/1tdr6wf/i_spent_a_week_building_a_25slide_deck_with/)
  — 그 바로 아래 댓글(17 upvote)이 Anthropic 공식 문서를 직접 링크함(§2).

## 2. Anthropic 공식 문서 — "Design and frontend defaults" (1차 출처)

Reddit 댓글이 가리킨 곳을 직접 열람. Claude Sonnet 5용 프롬프트 가이드의 실제
절. [Prompting Claude Sonnet 5 — Design and frontend defaults](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5#design-and-frontend-defaults)

- **공식 인정**: "Claude Sonnet 5는 개방형 디자인 작업에서 일관된 기본 시각
  스타일에 안착하는 경향이 있다"— 이게 바로 McKinsey 리드와 Claude 댓글이 말한
  "각진 박스" 지문의 원인.
- **막연한 지시는 역효과** — "그 색 쓰지 마", "깔끔하고 미니멀하게" 같은 지시는
  다양성을 만들지 않고 그냥 다른 고정 팔레트로 옮겨 갈 뿐이라고 명시.
- **효과 있는 방법 ①** — **구체적인 대안을 스펙으로 명시.** 정확한 hex, 정확한
  코너 반경, 정확한 타이포 스펙을 주면 모델이 정확히 따른다. `15-deck-moodboard.md`·
  `build_deck.py`의 색상/pt 토큰 방식이 이미 이 원칙과 일치함 — 계속 유지할 것.
- **효과 있는 방법 ②** — **만들기 전에 방향 여러 개를 먼저 제안하게 시킨다.**
  예시 프롬프트: "만들기 전에 이 브리프에 맞는 시각 방향 4개를 제안해줘(배경
  hex/강조 hex/서체 + 한 줄 근거). 사용자가 고르면 그 방향만 구현해줘." **이번
  Music Diary 덱은 이 단계를 건너뛰고 곧장 하나의 방향(Warm Vinyl terracotta)으로
  갔다** — 아래 §4에서 다룸.
- **"AI slop" 방지 직접 문구** — Anthropic이 실제로 공유하는 시스템 프롬프트 조각:

  > NEVER use generic AI-generated aesthetics like overused font families
  > (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly
  > purple gradients on white or dark backgrounds), predictable layouts and
  > component patterns, and cookie-cutter design that lacks context-specific
  > character.

  더 자세한 처리는 [`frontend-design` skill](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md)에 있다고 안내.

## 3. "진짜 병목은 콘텐츠가 아니라 정리"

- **r/PowerPoint, "Hot take: AI slide generators are solving a problem most of
  us don't actually have"** (102 upvote) — 저자 주장: 컨설턴트 대부분은 이미
  할 말(콘텐츠)이 있다. AI가 "생성"해주는 콘텐츠는 오히려 사실 확인이라는 일을
  더 만든다. **진짜 아픈 지점은 "안 흉하게 만드는 세금"** — 글꼴 위계 통일,
  간격 정리처럼 지루하지만 반드시 해야 하는 정리 작업.
  [원문](https://old.reddit.com/r/powerpoint/comments/1qvb18e/hot_take_ai_slide_generators_are_solving_a/)
  — 상위 댓글(31 upvote, 현직 컨설턴트): 전적으로 동의 — 가장 값진 인력은
  "단어 수는 줄이면서 메시지는 강한" 슬라이드를 만드는 사람이라고 함.
- **[내 판단]** 이 스레드 자체가 AI로 쓰인 정황(문체·따옴표 스타일이 문단마다
  바뀜, 댓글에서도 여러 명이 지적)이 있다 — 아이러니이지만, 지적한 문제
  자체(장르 위계·간격 통일이 진짜 병목)는 `16-great-ppt-design-research.md`가
  이미 조사해 반영한 내용과 일치해 신뢰도 있는 신호로 취급.

## 4. AI 도구 추천 스레드 — 신뢰도 낮음, 별도 표기

- **r/PowerPoint, "what are some good ai tools to create powerpoint
  presentations?"** (496 댓글) — 상위 댓글 다수가 DrLambda.ai·AISlide·
  chatslide.ai 등을 추천하지만, 계정·작성 패턴이 서로 유사하고 여러 댓글이
  같은 제품군(DrLambda→Chatslide 개명)을 반복 추천 — **일반 사용자 후기가
  아니라 마케팅/셀프 홍보 정황**이 보임. [원문](https://old.reddit.com/r/powerpoint/comments/176sxbp/what_are_some_good_ai_tools_to_create_powerpoint/)
- **[내 판단]** 이 스레드는 "실사용자가 좋다고 한 도구 목록"으로 인용하지 않는다.
  우리 파이프라인은 어차피 특정 SaaS 도구가 아니라 `python-pptx` 직접 생성이라
  이 스레드의 실질적 적용 가치도 낮음.

## Music Diary 덱 자체 점검 — Anthropic의 anti-generic 체크리스트 대조

| 체크 항목 | 우리 덱 현황 |
| --- | --- |
| 흔한 시스템 폰트(Inter/Roboto/Arial) | 아님 — Paperlogy Filled, 냥BTI와 공유하는 커스텀 빌드 |
| 클리셰 컬러(흰/검정 배경 위 보라 그라디언트) | 아님 — ivory + terracotta 단일 악센트 |
| 예측 가능한 레이아웃·컴포넌트 패턴 | **부분 해당** — 04번(4단 박스)·02·03·05·07번(2/3열 표)이 전부 "네모 + 표"로만 구성. McKinsey 리드가 말한 "박스 3~4개" 지문과 겹치는 지점 |
| 만들기 전에 방향 여러 개 제안 | **안 함** — Warm Vinyl 하나로 바로 진행(§2 방법 ②를 못 씀). `15-deck-moodboard.md`는 사용자가 준 레퍼런스 이미지 1장을 기반으로 색만 치환했지, 여러 방향을 놓고 고르게 하지 않았음 |

**[내 판단]** 팔레트·타이포는 Anthropic이 권장하는 "구체적 스펙" 방식이라 그
자체로는 안전하다. 다만 **레이아웃 다양성**이 약하다 — 8슬라이드 중 5개가
표 또는 박스 그리드다. 다음 손볼 여지가 있다면 우선순위는:
1. 04번 흐름 카드를 표 형태가 아닌 다른 컴포지션(타임라인 선+점 등, 이미
   `15`가 승인한 패턴)으로 바꿔 "네모 반복"을 줄인다.
2. 이번 색·타입 결정이 유일한 방향이었다는 점을 발표 자료 자체에는 남기지
   않되, 다음 프로젝트에서는 §2 방법 ②(방향 3~4개 제안 후 선택)를 실제로
   밟아본다.

## Related

- `16-great-ppt-design-research.md` — 여백·타이포·그리드 등 시각 설계 원칙(겹치는 결론 다수)
- `15-deck-moodboard.md` — 이번 덱이 실제로 밟은 색상 선택 경로(방향 1개만 제안됨)
- `presentation/build_deck.py` — 이 조사 반영 대상

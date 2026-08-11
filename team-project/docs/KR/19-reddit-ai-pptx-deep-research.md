# 19. Reddit·실무자 — AI PPT 외형 품질 심화 조사

작성 2026-08-06. 18번의 빠른 조사 뒤, Reddit 직접 접속 가능 여부를 먼저 실제로
검사하고, 검색 색인으로 확인 가능한 실사용 토론·Anthropic 원문·Microsoft 원문을
추가 조사함. 이 문서는 **Music Diary 8장 `python-pptx` 덱**(Paperlogy Filled,
warm ivory + terracotta, 현재 5/8장이 표·박스 그리드)에만 적용해 읽음. Reddit의
투표·댓글 수는 검색 결과가 실제로 표시한 경우에만 적었고, 표시되지 않은 것은
`확인 못 함`으로 둠.

## 0. Reddit 접근 진단 — 직접 curl은 실패, 웹 검색 색인은 부분 성공

- 요청한 `curl -sI --max-time 8 https://old.reddit.com/r/PowerPoint/`의 **정확한
  첫 상태 줄은 `HTTP/2 403`**. 응답은 `content-type: text/html`,
  `content-length: 189908`, `retry-after: 0`였음. 즉 old.reddit HTML 헤더도
  직접 읽지 못함. 대상 URL: <https://old.reddit.com/r/PowerPoint/>.
- 요청한 `curl -sI --max-time 8 https://www.reddit.com/r/PowerPoint/.json`도
  **`HTTP/2 403`**, `content-type: text/html`, `content-length: 189908`였음.
  JSON API가 아니라 같은 차단 HTML을 돌려준 것임. 대상 URL:
  <https://www.reddit.com/r/PowerPoint/.json>.
- 요청한 UA 포함 검색은 HTTP 헤더 대신 HTML 본문을 받았고, 첫 제목은
  **`Blocked`**, 본문은 **`Your request has been blocked due to a network
  policy.`**였음. 따라서 실 JSON이 아니라 Reddit 차단 페이지임. 대상 URL:
  <https://old.reddit.com/r/PowerPoint/search.json?q=AI%20design&restrict_sr=on&limit=5>.
- 웹 검색 도구로 `site:reddit.com r/PowerPoint AI slop presentation design`을
  검사한 결과는 **차단/필터된 빈 결과가 아니었음**. 예를 들어 검색 결과가
  `reddit.com/r/powerpoint/...`의 실제 스레드 제목·본문 일부·투표 수를 반환했고,
  이 문서의 [AI deck이 모두 같아 보이는가?](https://www.reddit.com/r/powerpoint/comments/1u3xxm9/is_it_just_me_or_do_all_ai_generated_decks_look/)도
  그 경로로 찾음. 단, 이것은 검색엔진이 보관한/색인한 내용이지 이 런타임이
  Reddit API를 읽었다는 뜻은 아님.

**판정:** curl 기반 Reddit 접근은 **완전 실패**(두 endpoint 403, JSON 검색은
차단 HTML). 웹 검색은 **부분 성공**(reddit.com 색인 결과와 일부 본문은 수신)이라
아래 Reddit 근거는 모두 후자임.

## 1. 추가 subreddit·실무자 스레드 — AI는 초안/정리 보조, 외형 판단은 남음

- **r/graphic_design, “Using AI to help coworkers use PPT templates?”** —
  검색 결과상 4 upvote. PPT 템플릿을 만드는 그래픽 디자이너가 스타일 일관성을
  걱정했고, 한 댓글은 실제 실패를 “내용 과다, pacing 없음, 읽기 어려운 복사본,
  clip art”로 열거하며, 좋은 템플릿도 사용자가 layout/master를 모르면 소용없다고
  함. [스레드](https://www.reddit.com/r/graphic_design/comments/1su3ejt/using_ai_to_help_coworkers_use_ppt_templates/)
  - **적용:** 우리처럼 스크립트로 일관성을 강제할 수 있는 경우에도, “같은
    색·글꼴”만으로는 충분하지 않음. 한 장의 내용량·읽는 순서·레이아웃 선택이
    먼저 맞아야 함. 이는 5장의 박스/표가 같은 리듬을 내는 문제에 직접 해당함.

- **r/graphic_design, “Anyone knows how such professional presentations are
  made?”** — 검색 결과상 69 upvote. 실무자들은 “도구가 예쁘게 만들어 주는 것이
  아니라 디자이너가 만들어야 한다”, “AI는 정밀 그래픽/타이포에 아직 충분히
  정밀하지 않다”고 했고, 프레젠테이션 디자이너 한 명은 Illustrator/InDesign으로
  만든 SVG를 PPT에 넣는 방식과 PPT 자체로도 정교한 제작이 가능하다고 설명함.
  [스레드](https://www.reddit.com/r/graphic_design/comments/1nlogtj/anyone_knows_how_such_professional_presentations/)
  - 같은 스레드의 후속 댓글은 AI 대신 재사용 가능한 PPT 인포그래픽 라이브러리의
    **timeline·flow·comparison·chart**를 쓴다고 제시함.
    [해당 댓글](https://www.reddit.com/r/graphic_design/comments/1nlogtj/anyone_knows_how_such_professional_presentations/)
  - **적용:** `python-pptx`가 ‘저급이라 예쁠 수 없다’는 결론은 아님. 대신 코드가
    재사용할 것은 카드 한 종류가 아니라, 의미별 도형 조합(시간선·연결선·비교·차트)
    이어야 함. 외부 SVG 자산은 이번 작업 범위에서 새로 만들자는 뜻이 아니며,
    현재 도형만으로도 아래 §5의 구조는 구현 가능함.

- **r/ClaudeAI, “Presentations on Claude”** — 투표/댓글 수는 페이지에서
  **확인 못 함**. 고정 템플릿 덱을 만든 사용자는 템플릿을 repo에 넣고,
  ‘이 slide layout은 어떤 상황에 쓰는가’ 메타데이터를 추가했지만 모델이 같은
  레이아웃으로 기본값을 되돌리는 일이 있었다고 보고함. 또 다른 사용자는
  템플릿 요소를 충분히 쓰지 않거나 AI처럼 보인다고 2~3회 반복 피드백한다고 함.
  [스레드](https://www.reddit.com/r/ClaudeAI/comments/1udhonv/presentations_on_claude/)
  - **적용:** `build_deck.py`에 ‘슬라이드 번호 → 허용 레이아웃 유형 → 금지
    반복’ 표를 코드 전 설계 입력으로 두는 쪽이, “다양하게 만들어”라고 지시하는
    것보다 재현 가능함. 이 문서의 제안이며 **[내 판단]**임.

- **r/ClaudeAI, “claude for presentations”** — 투표/댓글 수는 **확인 못 함**.
  반복 제작 경험이 있다는 댓글은 전체 outline을 먼저 Markdown으로 만들고,
  3~4개 표본 화면으로 여러 테마를 탐색한 뒤 design system을 확정하라고 권함.
  PPT 스크립트 방식은 기본적이고 오류가 나기 쉬워 ‘beautiful’하다고 보긴
  어렵다는 자기 경험도 함께 밝힘.
  [스레드](https://www.reddit.com/r/ClaudeAI/comments/1tvszn6/claude_for_presentations/)
  - **적용:** 이미 outline·토큰이 있는 이번 덱에는 ‘방향 4개 새로 고르기’보다,
    5개 정보 슬라이드의 **서로 다른 layout thumbnail을 먼저 비교**하는 작은
    탐색 단계가 현실적임. **[내 판단]**

- **r/claude, “I tested all 3 ways to make presentations with Claude”** —
  검색 결과상 18 upvote. 같은 덱을 Claude Design·앱·PPT add-in으로 시험한
  작성자는 Design은 가장 보기 좋았지만 data slide는 다른 장보다 못했고,
  PPT add-in 결과는 ‘2008 corporate PowerPoint’처럼 보였다고 평가함.
  [스레드](https://www.reddit.com/r/claude/comments/1sujc8c/i_tested_all_3_ways_to_make_presentations_with/)
  - **적용:** 도구 추천 근거로 쓰지 않음. 다만 한 번의 생성 결과를 완성으로
    보지 않고 data/정보 장을 따로 시각 QA해야 한다는 실무 신호로만 사용함.

- **r/consulting, “AI for PowerPoint that works for Consulting”** — 검색
  결과상 5 upvote. 독립 댓글은 AI가 언어 재작성·내용 분석에는 쓰이지만, consulting
  slide의 detail/control/professionalism에는 못 미친다고 했고, 차트·서식 add-in을
  쓴다고 답함. [스레드](https://www.reddit.com/r/consulting/comments/1isjaco/ai_for_powerpoint_that_works_for_consulting/)
  - 이 스레드는 beta 접근·waitlist·자사 제품 권유 댓글이 다수라 제품 평가는
    **폐기**함. 실제로 TeamSlide 계정이 beta를 홍보하고, 다른 댓글도 자사
    waitlist/alpha를 밝힘. [홍보 댓글 구간](https://www.reddit.com/r/consulting/comments/1isjaco/ai_for_powerpoint_that_works_for_consulting/)
  - **적용:** 우리에게 남는 것은 ‘AI가 서사/문구를 보조하고 스크립트가 서식을
    통제한다’는 역할 분리뿐이며, 어떤 SaaS를 채택하라는 근거는 아님.

- **r/consulting, “How the eff do you guys make so beautiful slides?”** —
  post 총 투표/댓글 수는 **확인 못 함**(검색 색인에서 한 댓글의 67 upvote만 확인).
  실무 댓글들은 좋은 덱 약 30개를 참고 catalog로 두고, AI에는 빈 프롬프트로
  전체 장을 맡기기보다 이미 만든 장의 개선안/디자인 아이디어를 묻는다고 설명함.
  한 댓글은 실제 덱에서 뽑은 색 정보와 slide별 SVG 초안을 AI에 주는 쪽이 layout
  지시에 더 유용했다고 함. [스레드](https://www.reddit.com/r/consulting/comments/1ullnak/how_the_eff_do_you_guys_make_so_beautiful_slides/)
  - **적용:** `warm ivory + terracotta + Paperlogy Filled`를 “modern하게”라는
    모호한 프롬프트가 아니라 고정 제약으로 유지하고, AI는 layout 대안 비평에만
    쓰며 최종 도형은 script가 소유해야 함. **[내 판단]**

- 요청한 **r/PowerPointCreators**, **r/ArtificialInteligence**, **r/ChatGPT**는
  이 검색 경로에서 ‘AI로 만든 PPT의 외형을 구체적으로 비평하고, 독립적으로
  검증 가능한’ 고신호 스레드를 **확인 못 함**. r/ChatGPT 검색 결과에는 과장된
  원샷 성공담이 있었으나 작업물·검증 가능한 전후 비교가 없어 사용하지 않음.
  대상 subreddit URL: <https://www.reddit.com/r/PowerPointCreators/>,
  <https://www.reddit.com/r/ArtificialInteligence/>,
  <https://www.reddit.com/r/ChatGPT/>.

- **마케팅 제외의 추가 근거:** r/PowerPoint의 도구 추천 스레드에는 제품 링크와
  반복 추천이 섞였고, 사용자가 작성자 profile을 보고 “promo”라고 지적한 뒤
  다른 사용자가 동의한 기록이 있음. 이 때문에 이 조사도 그 스레드의 제품 추천은
  근거로 쓰지 않음. [스레드/지적 댓글](https://www.reddit.com/r/powerpoint/comments/1olow1e/what_are_some_good_ai_tools_to_create_powerpoint/)

## 2. Anthropic `frontend-design` skill — 슬라이드 코드로 옮길 수 있는 규칙

- 원문 skill은 ‘의도적이고 구별되는’ palette·typography·layout을 고르고, brief에
  맞는 **정당화 가능한 한 가지 실제 미적 위험**을 택하라고 지시함.
  [원문](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md)
  - **적용:** 이번 덱의 ‘한 가지 위험’은 장식 추가가 아니라, 음악 일기의 시간성을
    보여 주는 단 하나의 signature motif(예: 재생 위치선/track marker를 장 사이에
    절제해 반복)로 정의하는 편이 맞음. 단, 실제로 구현하기 전에는 덱의 내용과
    발표 목적에 맞는지 검토가 필요함. **[내 판단]**

- skill은 주제·청중·화면의 단일 일을 먼저 명시하고, 주제 세계의 재료·도구·관습에서
  구별되는 선택을 찾으라고 함. 구조물(번호·divider·label)도 장식이 아니라
  내용상 참인 정보를 부호화해야 한다고 명시함.
  [원문](https://raw.githubusercontent.com/anthropics/claude-code/main/plugins/frontend-design/skills/frontend-design/SKILL.md)
  - **적용:** 네 개 항목이 실제 시간 순서이면 timeline의 번호/점은 정보임. 반대로
    동등한 기능 네 개에 `01–04`를 붙여 프로세스처럼 보이게 하는 것은 금지해야 함.
    현재 5개 box-grid는 이 질문을 각 장마다 통과해야 함. **[내 판단]**

- skill의 2-pass 절차는 먼저 4–6개의 이름 있는 색상 token, 2개 이상 type 역할,
  한 줄 layout 설명/ASCII wireframe, 그리고 기억될 signature을 정하고, 범용 기본값과
  닮았으면 빌드 전에 수정하라는 것임.
  [원문](https://raw.githubusercontent.com/anthropics/claude-code/main/plugins/frontend-design/skills/frontend-design/SKILL.md)
  - **적용:** `python-pptx` 전용으로 옮기면 `build_deck.py`의 상수만 정하는 데서
    끝내지 말고, `slide_spec`마다 `purpose`, `layout_family`, `reading_path`,
    `signature_use`를 먼저 명시하는 방식임. Paperlogy Filled는 display 역할로
    유지하되, 정보/캡션 역할의 크기·굵기·자간 규칙도 별도로 적어야 함.
    **[내 판단]**

- **이번 팔레트의 직접 경고:** skill은 현재 AI 디자인이 자주 뭉치는 첫째 외형을
  ‘warm cream(약 `#F4F1EA`) + high-contrast serif display + terracotta accent’라고
  정확히 적고, brief가 요구하지 않는 축에서 이런 기본값을 택하지 말라고 함.
  [원문](https://raw.githubusercontent.com/anthropics/claude-code/main/plugins/frontend-design/skills/frontend-design/SKILL.md)
  - **적용:** 우리 덱은 serif가 아니라 Paperlogy Filled이므로 완전히 동일하지는
    않지만, **warm ivory + terracotta**는 그 기본값과 겹침. 팔레트를 지금 폐기할
    근거는 아니며, 음악/일기라는 내용과 연결한 signature·레이아웃으로 ‘우연한
    기본값’이 아님을 만들어야 한다는 위험 신호임. **[내 판단]**

- skill은 bold함을 한 곳에만 쓰고 나머지는 절제하며, 빌드 중 이미지로 자가 비평하라고
  함. [원문](https://raw.githubusercontent.com/anthropics/claude-code/main/plugins/frontend-design/skills/frontend-design/SKILL.md)
  - **적용:** 8장을 PDF/PNG로 export한 뒤 thumbnail 행으로 볼 때 box silhouette가
    5번 반복되는지 확인하는 QA를 넣음. 새 요소를 모든 장에 더하는 해결책은 이
    원칙과 반대임. **[내 판단]**

## 3. 전후 비교와 ‘AI slop’의 구체성 — 찾은 것과 못 찾은 것

- 요청한 형태의 **같은 덱 ‘AI 생성본 vs 사람이 고친 완성본’ 이미지 전후 비교**는,
  이 조사 범위의 Reddit/검색 결과에서 출처·작성자·두 버전을 모두 검증할 수 있는
  사례를 **확인 못 함**. 따라서 눈에 보이는 예시가 있다는 식으로 쓰지 않음.

- 대신 검증 가능한 구체적 비평은 있음. r/PowerPoint의 검색 색인 스레드는
  “same card layouts, same icon style, same three-column slides, same gradient
  backgrounds”를 AI deck의 식별 신호로 열거했고, 검색 결과상 82 upvote였음.
  [스레드](https://www.reddit.com/r/powerpoint/comments/1u3xxm9/is_it_just_me_or_do_all_ai_generated_decks_look/)
  - 단, 전후 이미지가 없고 작성자의 실무 경력을 검증할 수 없으므로 이 항목은
    **핵심 근거가 아닌 보조 관찰**로만 둠. ‘3열 카드’ 문제는 18번 조사와도 겹치지만,
    이 한 스레드만으로 일반화하지 않음. **[내 판단]**

- font 이름을 특정해 “AI답다”고 한 독립 실무자 스레드는 이번 추가 검색에서
  **확인 못 함**. 다만 Anthropic skill은 고대비 serif display를 위 warm-cream/
  terracotta 조합의 반복 기본값으로 명시하고, 타이포의 역할·weight·width·spacing을
  의도적으로 정하라고 함. [원문](https://raw.githubusercontent.com/anthropics/claude-code/main/plugins/frontend-design/skills/frontend-design/SKILL.md)
  - **적용:** Paperlogy Filled라는 한 서체의 선택만으로 충분하다고 가정하지 말고,
    제목/본문/캡션의 역할 차이를 외형으로 검증해야 함. 다른 폰트를 지금 추가하자는
    권고는 아님. **[내 판단]**

- r/graphic_design에서는 ‘AI는 typography에 형편없다’와 ‘정밀 그래픽에는 아직
  부족하다’는 직접 비평이 있었음. [스레드](https://www.reddit.com/r/graphic_design/comments/1nlogtj/anyone_knows_how_such_professional_presentations/)
  - **적용:** 외형 QA는 색상만 보지 말고 줄바꿈, 제목 폭, 작은 label의 가독성,
    연결선/도형의 정렬도 보아야 함. 이는 `python-pptx` 출력에서 실제로 확인 가능한
    항목임. **[내 판단]**

## 4. `python-pptx`에 한정한 Reddit 논의 — ‘anti-generic script’ 직접 사례는 확인 못 함

- Reddit에서 **`python-pptx` 스크립트로 만든 덱이 AI처럼 보이지 않게 한 구체적
  전후 사례나 코드 규칙**은 이번 조사에서 **확인 못 함**. 그러므로 ‘Reddit가
  검증한 python-pptx anti-slop recipe’는 없음.

- 가까운 실무 신호는 r/ClaudeAI의 한 사용자가 PPT 스크립트 방식은 기본적으로
  보이고 오류가 나기 쉬워 아름답다고 보긴 어렵다고 한 경험담, 그리고 outline/
  theme 탐색을 먼저 하라는 절차임. [스레드](https://www.reddit.com/r/ClaudeAI/comments/1tvszn6/claude_for_presentations/)
  - 이것은 `python-pptx` 자체의 기술적 한계 증명이 아니라 한 사용자의 경험임.
    **[내 판단]**

- r/ClaudeAI 고정-template 사례는 template 파일과 layout 메타데이터가 있어도
  같은 layout으로 쏠리는 실패를 보고함. [스레드](https://www.reddit.com/r/ClaudeAI/comments/1udhonv/presentations_on_claude/)
  - **적용:** 우리 스크립트는 모델의 확률적 선택이 아니라 결정적 코드이므로 오히려
    이 문제를 막기 쉬움. 각 슬라이드가 어떤 `layout_family`를 써야 하는지 명시하고,
    동일 family 연속 횟수를 검사하면 됨. **[내 판단]**

- `python-pptx` 파이프라인에 실제로 이식할 수 있는 근거는 Reddit의 좁은 사례보다
  §2 Anthropic의 ‘계획 → generic-default 비평 → 빌드 → 이미지 비평’과 §5의
  의미별 diagram 선택임. [skill 원문](https://raw.githubusercontent.com/anthropics/claude-code/main/plugins/frontend-design/skills/frontend-design/SKILL.md),
  [Microsoft SmartArt 의미별 안내](https://support.microsoft.com/en-US/Office/graphics-visuals/choose-a-smartart-graphic)

- 좁은 질문에 가장 가까운 r/ClaudeAI 사례는 `PPTX → 승인된 layout/font/color/chart
  style을 잠근 template → JSON(슬라이드 type/title/points/data) → 별도 renderer →
  human review`의 분리를 제안함. 그러나 투표/댓글 수와 결과물 품질은 **확인 못 함**,
  전후 이미지도 없음. [스레드](https://www.reddit.com/r/ClaudeAI/comments/1v7xmn8/suggestions_for_presentation_generation/)
  - **적용:** 그 구조는 `python-pptx`에 맞지만, 실무 품질의 증명으로 인용하지
    않는다. layout type을 JSON/spec에서 먼저 정하고 renderer는 임의 배치하지 않게
    하라는 설계 힌트로만 사용함. **[내 판단]**

## 5. layout variety — 표/box-grid 대신 ‘내용 관계’를 그리는 선택지

- Microsoft는 **Process**를 단계·workflow·timeline처럼 순서가 결과를 만드는
  내용에, **Cycle**을 반복 과정에 쓰라고 구분함. Process는 수직/수평/굽은 흐름,
  milestone timeline, 번호 원+화살표도 예로 듦.
  [Microsoft 안내](https://support.microsoft.com/en-US/Office/graphics-visuals/choose-a-smartart-graphic)
  - **적용:** 현재 04번의 4단 흐름 카드는 가장 먼저 **방향선 + milestone 점 +
    짧은 label**의 시간선/프로세스 선으로 바꿀 후보임. 네 상자가 동등하게 놓인
    상태보다 읽는 방향이 생김. **[내 판단]**

- 같은 Microsoft 안내는 **Relationship**을 비진행·비계층 관계에 쓰며, overlap은
  Venn, containment는 target, 중앙 핵심과의 연결은 radial로 보이라고 함.
  [Microsoft 안내](https://support.microsoft.com/en-US/Office/graphics-visuals/choose-a-smartart-graphic)
  - **적용:** ‘기능 3개/4개’가 순서가 아니라 Music Diary의 한 중심 경험에 연결된
    요소라면 카드 3개 대신 **중앙의 일기/트랙 + 주변 요소 연결선**이 더 정직함.
    반대로 서로 독립 비교면 radial을 쓰면 안 됨. **[내 판단]**

- 발표 디자이너라고 밝힌 r/PowerPoint AMA도 `trend→chart`, `comparison→table 또는
  side-by-side visual`, `process→flow 또는 timeline`, `concept→simple visual/diagram`
  순으로 내용에서 형식을 고르라고 설명함. [AMA](https://www.reddit.com/r/powerpoint/comments/1tzw8ra/ama_im_a_visual_designer_with_8y_experience/)
  - **적용:** 표/grid 자체를 금지할 근거는 없음. 같은 기준의 비교만 표로 남기고,
    순서·변화·관계인 box-grid를 flow/timeline/diagram으로 바꾸는 것이 정확한
    처방임. **[내 판단]**

- **Matrix**는 부분과 전체/중심 개념의 2차원 관계를 분류할 때, **Pyramid**는
  위아래의 비례·위계를 보일 때 적합하다고 Microsoft가 구분함.
  [Microsoft 안내](https://support.microsoft.com/en-US/Office/graphics-visuals/choose-a-smartart-graphic)
  - **적용:** 두 축으로 판단하는 비교만 2×2 matrix로 남기고, 중요도/단계가 있는
    내용만 pyramid/vertical hierarchy로 바꿈. 장식용 2×2와 ‘모든 항목 동등’의
    3열 표는 이 규칙으로 줄임. **[내 판단]**

- **Picture** layout은 이미지가 메시지를 전달하거나 list/process를 보완해야 할 때
  쓰는 유형이라고 Microsoft가 설명함. 또한 SmartArt 안에는 요점만 넣고 자세한
  설명은 다른 슬라이드/문서로 보내라는 주의도 있음.
  [Microsoft 안내](https://support.microsoft.com/en-US/Office/graphics-visuals/choose-a-smartart-graphic)
  - **적용:** 정보량이 적은 한 장은 box-grid 대신 큰 음악 맥락 이미지/앱 화면 한
    개를 anchor로 두고 한 문장만 얹는 **비대칭 split**으로 쉴 수 있음. 이 조사는
    새 이미지를 자동 생성하라는 지시가 아님. **[내 판단]**

- **이번 8장용 layout family 배분 초안** — 이는 위 출처의 의미 구분을 적용한
  설계 제안이지, 출처가 우리 덱을 평가한 것은 아님.

  | 내용 관계 | 허용 family | 피할 기본값 |
  | --- | --- | --- |
  | 시간 순서/사용 흐름 | timeline·process arrows·연결선 | 같은 크기 카드 4개 |
  | 중심 경험을 이루는 요소 | radial/annotated diagram | 의미 없는 3열 카드 |
  | 둘의 차이 | 비대칭 2-way split 또는 직접 label한 비교 | 모든 비교를 표로 처리 |
  | 두 축 분류 | 2×2 matrix | 축 없는 4칸 grid |
  | 한 장의 핵심 메시지 | 큰 문장 + 한 anchor visual | 작은 카드 다발 |

  - **[내 판단]** 5/8장이 표/box-grid인 지금은 이 표로 각 장의 ‘관계’를 먼저
    분류한 뒤, 최소 2장을 non-grid family로 바꾸는 편이 한 장마다 다른 장식을
    붙이는 것보다 안전함.

## 우선순위 — 다음에 적용할 단 하나

1. **가장 가치 큰 다음 작업:** `build_deck.py`를 고치기 전에 5개 표/box-grid
   슬라이드에 `내용 관계 → layout family → reading path`를 한 줄씩 붙이는
   **semantic layout map**을 만든다. 그 결과 04번의 4-card flow는 우선
   timeline/process로 교체한다. Process는 순서가 있는 내용을 위한 구조라는
   Microsoft의 정의와 맞고, Anthropic skill의 ‘structure는 내용상 참이어야 한다’는
   기준에도 맞음. [Microsoft](https://support.microsoft.com/en-US/Office/graphics-visuals/choose-a-smartart-graphic),
   [Anthropic skill](https://raw.githubusercontent.com/anthropics/claude-code/main/plugins/frontend-design/skills/frontend-design/SKILL.md)
   - **[내 판단]** 이 한 단계가 지금의 실제 약점(5/8 box-grid)을 가장 직접적으로
     줄이며, 기존 Paperlogy Filled·ivory/terracotta 토큰을 버리지 않아도 됨. 이후
     export thumbnail QA에서 여전히 같은 사각 silhouette가 반복되면, 두 번째
     grid를 radial 또는 비대칭 split으로 바꿈.

## Related

- `18-reddit-ai-pptx-design-research.md` — 앞선 `r/PowerPoint` 3개 스레드와
  Anthropic docs의 첫 조사
- `16-great-ppt-design-research.md` — 여백·타이포·그리드의 일반 시각 설계 근거
- `presentation/build_deck.py` — 이 문서의 semantic layout map을 반영할 대상

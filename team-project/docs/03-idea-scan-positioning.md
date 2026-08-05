1. Overdone list — topic: generic-on-sight reason; rescue framing if any

Scan note: “Overdone” here is a positioning judgment from showcase galleries, 국비 후기, and beginner-course examples—not a statistical ranking. [my judgment]

- 투두·캘린더: add/edit/delete/filter/date UI is immediately recognizable as beginner CRUD. Bootcamp showcases also frequently include planners and calendar functions. [source: [부트캠프 교육생 결과물](https://nbcamp-blog.oopy.io/ccff183c-94e6-4c80-9f4b-d0c33d9b84e5)] Rescue: only with a specific user moment, such as “직업계고 실습 전 준비물·안전 체크,” plus reflection or risk handling; otherwise avoid. [my judgment]

- 날씨 앱: usually just API fetch, weather card, icon, and forecast tabs; the implementation story is familiar. [my judgment] Rescue: a decision tool for a narrow audience—“등하교·실습복장 위험 알림”—with fallback data, unit handling, and explainable warning rules. [my judgment]

- 계산기: basic arithmetic demonstrates little beyond input events and operators. [my judgment] Rescue: domain-specific calculation with visible assumptions, such as recipe scaling or part-time shift pay; a generic calculator has no rescue. [my judgment]

- MBTI·성격테스트: quiz → four-letter result → share card is one of the clearest student-project clichés. MBTI is also a heavily repeated Korean content category. [source: [Velog MBTI tag](https://velog.io/tags/MBTI)] Rescue: replace personality labeling with a transparent scenario-based decision tool; a plain MBTI clone should be avoided. [my judgment]

- 영화·도서 검색: search API, cards, detail page, favorites, and filters are common wrappers around someone else’s data. [my judgment] Rescue: narrow the decision problem, such as “20분 안에 읽을 책” or “혼자 보기 불편하지 않은 영화,” with curated reasons rather than search alone. [my judgment]

- 가계부·소비관리: form input, category totals, charts, and localStorage are standard practice-project material. [my judgment] Rescue: target a specific behavior—teen impulse purchases, subscription leakage, or “후회 소비” reflection—and show a before/after decision loop. [my judgment]

- 방문자 카운터·방명록·게시판: these are strongly associated with classic JSP/Oracle and 국비 CRUD exercises. One 국비 후기 explicitly describes the baseline competency as making a CRUD board, while another reports a movie-booking final project. [source: [국비 웹개발 후기](https://newehblog.tistory.com/51)] Rescue: no rescue as a fake local-only public counter; avoid. [my judgment]

- 포트폴리오 사이트: personal profile, skills, project cards, and contact section usually read as self-presentation rather than a product. Portfolio feedback also warns that repeated academy-style formats make applicants’ individual strengths hard to see. [source: [UX 포트폴리오 매거진](https://brunch.co.kr/magazine/ux-portfolio)] Rescue: make it an interactive proof of one skill or process, not another portfolio homepage. [my judgment]

- 유명 서비스 클론코딩: visual imitation of Watcha, Kakao, shopping malls, delivery apps, or SNS shows copying and styling more than independent problem framing. Korean frontend showcases explicitly present Watcha and Kakao Friends-shop clones as common mini-project formats. [source: [제로베이스 미니 프로젝트 발표](https://zero-base.co.kr/event/media_nklcb_contents_4)] Rescue: reproduce one interaction, then document an accessibility, performance, or UX improvement; a full clone is a dead end here. [my judgment]

- 쇼핑몰·이커머스: product list, cart, order, and login are standard 국비 final-project shapes; one 국비 course review describes a shopping mall as its free-theme project. [source: [국비 수료 후기](https://drg2524.tistory.com/137)] Rescue: only a narrow comparison or inventory decision tool with fixed local data; full shopping-mall scope is too broad for seven days. [my judgment]

- 여행·맛집·지도 플래너: bootcamp galleries contain many travel-course, map, lodging, restaurant, and planner services. [source: [부트캠프 교육생 결과물](https://nbcamp-blog.oopy.io/ccff183c-94e6-4c80-9f4b-d0c33d9b84e5)] Rescue: a sharply bounded local scenario with a real tradeoff—budget, walking distance, accessibility, or bad-weather fallback. [my judgment]

- 채용공고·커뮤니티·SNS: feeds, search, likes, posts, and profiles are common product shells, but localStorage cannot provide credible multi-user behavior. [my judgment] Rescue: a personal decision assistant or offline portfolio artifact; avoid pretending it is a real social service. [my judgment]

2. Differentiation patterns that earn attention

- Start with one observable user problem, not a feature list. Showcase projects that stand out usually name a narrow audience and situation—pet-hospital price comparison, cat-care exchange, job filtering, or travel-course planning. [source: [부트캠프 교육생 결과물](https://nbcamp-blog.oopy.io/ccff183c-94e6-4c80-9f4b-d0c33d9b84e5)] For this project, “students” is still too broad; “vocational students preparing for practical training” is stronger. [my judgment]

- Build one complete decision loop. Input → evaluate → choose → save/review is more memorable than five unrelated pages. Portfolio feedback repeatedly favors clear background, problem definition, goal, solution, and result. [source: [포트폴리오 프로젝트 내용 구성](https://brunch.co.kr/%40%401561/31)] [my judgment]

- Test with a few real classmates and show what changed. Three short task tests, error counts, completion time, or quotes are enough for a seven-day project; the result need not be statistically valid. User-feedback-based improvement is repeatedly highlighted in portfolio guidance. [source: [결과해석과 유저 피드백](https://brunch.co.kr/%40%402hV3/256)] [my judgment]

- Treat limited data as a design choice. A small, curated Korean dataset with clear categories and explanations is stronger than a thin API wrapper. If using an API, show loading, empty, stale, failure, and fallback states. [my judgment]

- Make localStorage part of the product promise. “Private, offline, no account required” can be credible for a personal checklist, reflection tool, simulator, or saved recommendation list; it is not credible for a public board or real visitor counter. [my judgment]

- Polish the awkward states. Empty results, duplicate entries, invalid Korean input, mobile layout, keyboard navigation, reset behavior, and refresh persistence are small but visible quality signals. [my judgment]

- Explain decisions, not just technologies. Portfolio reviewers criticize shallow problem definitions and solutions that jump directly from “there is no feature” to “we added it.” [source: [문제 해결형 포트폴리오의 맹점](https://brunch.co.kr/%40%40bpd/56)] A short decision log can be more memorable than listing HTML/CSS/JS. [my judgment]

- Make the presentation itself a reproducible story: user problem, one live scenario, one failure discovered, one correction, and the final result. Project evaluation examples explicitly score problem clarity, demo reliability, storytelling, role division, Git activity, README, and retrospective. [source: [프로젝트 평가기준](https://www.dongseo.ac.kr/kr/index.php?idx=102293&mode=fdn&num=1&pCode=MN2000197)] [my judgment]

3. 2인 분업

Clean splits:

- Two vertical flows with one agreed data shape: Person A builds browse/input/filter/save; Person B builds detail/result/explanation/review. This works only if the fields and sample data are frozen on day one. [my judgment]

- “Record” plus “interpret”: one person handles forms, validation, localStorage, and reset; the other handles summaries, scores, charts, and result explanations. Both can work independently after agreeing on the stored object format. [my judgment]

- “Scenario A” plus “Scenario B”: two parallel user journeys using the same components, such as normal-day planning and emergency-day planning. This avoids one person owning all the logic. [my judgment]

- Shared shell plus independent feature modules: one person owns layout, navigation, responsive rules, and reusable cards; the other owns one complete interactive feature. The shell must be finished early, or the second person becomes blocked. [my judgment]

Shapes that collapse:

- Static portfolio or landing page: almost all meaningful decisions are visual and centralized, so one person becomes the layout owner while the other only supplies copy or images. [my judgment]

- Generic calculator, weather card, or tiny quiz: the core JavaScript is too small for two meaningful workstreams; one person writes the logic and the other decorates it. [my judgment]

- Full clonecoding: visual consistency creates a single gatekeeper. The second person’s work keeps getting rewritten because spacing, components, and interaction behavior must match the clone. [my judgment]

- Board, chat, SNS, or shopping mall without a backend: the “real” state model is unclear, so one person ends up owning localStorage and integration while the other produces disconnected screens. [my judgment]

- Map/travel/API-heavy projects: one person controls the API key, response shape, and error handling; the other cannot test independently and waits for integration. [my judgment]

- Broad CRUD dashboards: both people touch the same data structures, causing merge conflicts and duplicated event handlers. A narrow two-flow product is safer than many CRUD pages. [my judgment]

4. AI-process angle

Good AI-usage stories:

- Rule-based recommendation or scoring: ask AI to propose categories and scoring rules, then test borderline examples. AI will often produce vague criteria or inconsistent weights, creating a clear “suggestion → test failure → correction” story. [my judgment]

- Korean form validation and edge cases: AI-generated code may mishandle empty Korean text, duplicate entries, dates, reset behavior, or localStorage persistence. These errors are easy to demonstrate and correct. [my judgment]

- Data/API interpretation: AI may invent response fields, misunderstand units, mishandle missing data, or suggest code that fails because of CORS. A narrow weather or curated-data tool can therefore produce a strong process story, even though a generic weather app remains visually common. [my judgment]

- Scenario quizzes or decision tools: AI can generate ambiguous questions and overlapping answer rules. Testing the questions with classmates gives evidence for rewriting both content and scoring. [my judgment]

- Accessibility and responsive behavior: ask AI for a checklist, then verify it manually. Incorrect ARIA usage, keyboard traps, unreadable contrast, and mobile overflow make visible correction points. [my judgment]

The Korean school AI-project guidance specifically recommends fact-checking AI errors, questioning whether suggestions fit the real environment, collecting user feedback, iterating prototypes, and recording the process rather than only the final result. [source: [인천교육청 AI·디지털 활용 운영계획](https://edu-i.ice.go.kr/cmm/fms/FileDown.do?atchFileId=FILE_000000000140940&bbsId=BBSMSTR_000000004155&fileSn=1&nttId=126859&trgetId=SYSTEM_DEFAULT_BOARD)]

AI usage that becomes invisible:

- Portfolio, landing page, and clonecoding: AI can generate polished markup and CSS quickly, but the corrections are usually minor styling adjustments with little product reasoning. [my judgment]

- Generic todo or calculator: AI’s output is predictable; “AI wrote the event listener, then I fixed a typo” is not a memorable process story. [my judgment]

- Visitor counter or fake public board: AI may suggest backend/auth/database behavior that the constraints prohibit. The team either ignores that advice or produces an unconvincing local simulation. [my judgment]

- Movie/book search wrapper: most interesting failures concern API keys, quotas, CORS, or third-party data—not the student’s own product decisions. [my judgment]

5. Green flags / red flags checklist

Green flags:

- [my judgment] One clearly named user group and one specific situation.
- [my judgment] A complete loop: input → decision → result → saved reflection.
- [my judgment] Two independent vertical slices using one shared data contract.
- [my judgment] At least three classmates can test it in under five minutes.
- [my judgment] LocalStorage limitation is an intentional benefit, not a fake backend.
- [my judgment] At least one likely AI mistake can be tested and visibly corrected.
- [my judgment] The demo has one memorable scenario and one measurable improvement.
- [my judgment] Empty, error, mobile, keyboard, and refresh states are demonstrable.

Red flags:

- [my judgment] The title could be “My Todo,” “Weather App,” “Movie Search,” or “Shopping Mall.”
- [my judgment] The main value is copying a famous service’s appearance.
- [my judgment] One person owns all state, API, or integration work.
- [my judgment] The second person’s contribution is only PPT, assets, or CSS cleanup.
- [my judgment] The app requires login, public users, real-time chat, or a real counter but has no backend.
- [my judgment] AI usage is only “generate the whole page,” with no verification record.
- [my judgment] The team cannot explain why the target user needs the product.
- [my judgment] The final presentation lists features but cannot show a failure, correction, or user-feedback change.

No files were written.

Codex session ID: 019fca43-4cfe-7cc3-86b6-4ee6a4af2362
Resume in Codex: codex resume 019fca43-4cfe-7cc3-86b6-4ee6a4af2362

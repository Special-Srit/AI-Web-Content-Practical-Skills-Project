# 13 · Music Diary 짧은 프로젝트 발표 구조 조사

작성 2026-08-06. 대상은 팀 Clova의 **Music Diary(음악 일기)** 최종 발표다. 이 문서는
색·글꼴·레이아웃을 정하지 않고, 짧은 수업 발표에서 **무엇을 어떤 순서로 증명할지**만
정리한다.

- 제품의 확정 범위는 기분 선택 → 내 파일 재생 → 한 줄 일기 → 날짜별 기록인 로컬 웹
  플레이어다. 계정·백엔드·서버 동기화는 없다. ([멘토 제출용 진행 자료](12-mentor-resource-summary-KR.md))
- 강사 지시는 결과물뿐 아니라 **그 결과물을 만들기 위해 사용한 프롬프트와 의도**를
  발표에 포함하는 것이다. ([프롬프트 기록 README](../prompts/README.md))
- 아래의 해외 투자 피치 프레임워크는 구조를 압축하는 참고이며, 이 발표의 심사 목적을
  투자 유치로 바꾸는 근거가 아니다. 국내 비교 자료에서 실제로 점수화된 것은 문제,
  구현·시연, 발표, 팀 협업·문서화다. ([국립부경대 공학교육혁신센터 프로젝트 안내 PDF](https://www.dongseo.ac.kr/kr/index.php?idx=102293&mode=fdn&num=1&pCode=MN2000197), [목원대 모빌리티 코딩 부트캠프 PDF](https://mokwon.ac.kr/computer/html/sub05/0501.html?file_id=768889&mode=D&no=1199d30f9cccd4ef679f39a6b6a1d4e1))

## 1. 구조/서사 — 어떤 순서로 말할 것인가

### 출처가 말하는 구조

- **[규범적 참고 · YC]** YC는 피치에 회사/한 줄 설명, 문제, 고객, 해결책, 시장·경쟁,
  진행 상황, 팀, 요청 같은 질문을 명료하게 답하라고 제시한다. 또한 제품을 설명하기
  어렵다면 사용자 경로를 걸어 보이는 방식을 권한다. ([YC — *How to Pitch Your Company*](https://www.ycombinator.com/blog/how-to-pitch-your-company/))
- **[규범적 참고 · Sequoia]** Sequoia의 사업계획/피치 순서는 회사 목적 → 고객의 문제와
  기존 해결책의 한계 → 해결책 → 왜 지금인가 → 고객/시장 → 경쟁·대안 → 사업 모델 →
  팀 → 재무 → 비전이다. ([Sequoia — *Writing a Business Plan*](https://sequoiacap.com/article/writing-a-business-plan/))
- **[규범적 참고 · Guy Kawasaki]** 10/20/30은 10개 슬라이드, 20분 이내, 30pt 미만
  글자 금지를 제시하고, 문제·해결책·기술·경쟁·팀·상태/일정·요약을 주요 주제로 든다.
  작성자도 이를 VC 피치에서 출발한 규칙이라고 밝힌다. ([Guy Kawasaki — *The 10/20/30 Rule*](https://guykawasaki.com/the_102030_rule/))
- **[규범적 참고 · Techstars]** 데크는 그 자체가 목적이 아니라 이야기를 전달하는
  그릇이라고 설명한다. ([Techstars — *Why Most Pitch Decks Don’t Work*](https://www.techstars.com/blog/founder-advice/why-most-pitch-decks-dont-work-and-how-to-make-sure-yours-does))

### 투자 피치에서 가져올 것/버릴 것

- **가져올 것** — `사용자 문제 → 해결 방식 → 실제 작동 증거 → 대안과의 차이 → 다음
  판단` 순서는 위 세 프레임워크 모두의 공통 뼈대다. 이 순서는 제품 기능을 나열하기 전에
  “왜 이 기능인가”를 먼저 설명하게 한다. ([YC](https://www.ycombinator.com/blog/how-to-pitch-your-company/), [Sequoia](https://sequoiacap.com/article/writing-a-business-plan/))
- **버릴 것** — TAM, 매출, 펀딩 요청, 성장 그래프는 투자자가 사업 규모와 투자금을
  판단하는 항목이다. Music Diary는 10일 수업의 로컬 MVP이고 계정·백엔드·상용 출시
  지표가 없으므로, 없는 수치나 가짜 traction을 넣을 근거가 없다. YC의 해당 항목도
  투자 유치 문맥에서 제시된다. ([YC — *A Guide to Seed Fundraising*](https://www.ycombinator.com/blog/how-to-raise-a-seed-round))

### Music Diary 권고

- **[내 판단]** `한 줄 정의 → 실제 사용자 문제 → 조사에서 고른 범위/차별점 → AI를
  사용한 설계·검증 과정 → 핵심 사용자 흐름 라이브 시연 → 구현 제약과 다음 검증 → 팀
  역할·마무리`로 배치한다.
- **[내 판단]** 경쟁사 5개, 페르소나 4명, 여정 지도 전체를 각각 한 장씩 발표하지
  않는다. 주 페르소나 1명과 “카탈로그 경쟁이 아니라 내 파일의 감정 맥락”이라는 결론만
  본문에 남기고, 나머지는 질문용 백업 자료로 둔다. 이는 확정된 조사 자료를 버리는 것이
  아니라 짧은 구두 발표에 맞춰 증거를 압축하는 선택이다. ([멘토 제출용 진행 자료](12-mentor-resource-summary-KR.md))

## 2. 슬라이드 수와 속도 — 시간 미확정 상태에서의 안전한 범위

### 확인한 국내 사례

- **[1차 자료 · 대학 부트캠프]** 국립부경대 공학교육혁신센터의 2026 피지컬 AI 프로젝트는
  팀당 **8분 발표 + 3분 Q&A**로 운영하며, 발표 품질의 세부 요소에 시간 관리를 넣는다.
  ([프로젝트 안내 PDF, p. 8](https://www.dongseo.ac.kr/kr/index.php?idx=102293&mode=fdn&num=1&pCode=MN2000197))
- **[1차 자료 · 대학 부트캠프]** 목원대의 2024 모빌리티 코딩 부트캠프는 5개 팀에
  **5분 발표·시연 + 5분 질의응답**을 배정했다. ([운영계획 PDF, p. 6](https://mokwon.ac.kr/computer/html/sub05/0501.html?file_id=768889&mode=D&no=1199d30f9cccd4ef679f39a6b6a1d4e1))
- **[1차 자료 · 대학 부트캠프]** 조선대 항공우주 인재양성 부트캠프의 아이디어 경진대회는
  대면 발표·작품 시연을 **최대 10분**, Q&A를 5분으로 공지했다. ([모집 공고 PDF](https://boot.chosun.ac.kr/CrossEditor/binary/files/000008/%EC%A0%9C1%ED%9A%8C_%ED%95%AD%EA%B3%B5%EC%9A%B0%EC%A3%BC_%EB%B6%84%EC%95%BC_%EB%B6%80%ED%8A%B8%EC%BA%A0%ED%94%84_%EC%95%84%EC%9D%B4%EB%94%94%EC%96%B4_%EA%B2%BD%EC%A7%84%EB%8C%80%ED%9A%8C_%EB%AA%A8%EC%A7%91_%EA%B3%B5%EA%B3%A0.pdf))
- **[2차 자료]** 생성형 AI 개발 입문서의 10분 프로젝트 발표 예시는 문제 1분,
  데모 4분, 기술 3분, 배운 점/한계 1분, Q&A 1분으로 나눈다. 해당 책의 자체 가이드이지
  이 과정의 채점표는 아니다. ([WikiDocs — 프로젝트 발표 및 피드백](https://wikidocs.net/338419))
- 이 과정의 팀별 발표·Q&A 실제 배정 시간은 제공된 문서와 `team-project/docs/`에서
  **확인 못 함**. `발표`, `시연`, `분`을 검색했지만 팀별 시간표를 찾지 못했다.

### 결론과 권고

- **[내 판단]** “국내 학원 데모데이는 전국적으로 5~10분”이라는 표준은 확인 못 함이다.
  다만 서로 다른 공식 부트캠프 3건에서 5분·8분·최대 10분 본 발표가 확인되므로,
  배정 시간이 나오기 전에는 **5분에도 살아남는 7~8개 본문 슬라이드**를 먼저 만들고,
  8분일 때만 설명을 늘리는 방식이 안전하다. ([목원대](https://mokwon.ac.kr/computer/html/sub05/0501.html?file_id=768889&mode=D&no=1199d30f9cccd4ef679f39a6b6a1d4e1), [국립부경대](https://www.dongseo.ac.kr/kr/index.php?idx=102293&mode=fdn&num=1&pCode=MN2000197), [조선대](https://boot.chosun.ac.kr/CrossEditor/binary/files/000008/%EC%A0%9C1%ED%9A%8C_%ED%95%AD%EA%B3%B5%EC%9A%B0%EC%A3%BC_%EB%B6%84%EC%95%BC_%EB%B6%80%ED%8A%B8%EC%BA%A0%ED%94%84_%EC%95%84%EC%9D%B4%EB%94%94%EC%96%B4_%EA%B2%BD%EC%A7%84%EB%8C%80%ED%9A%8C_%EB%AA%A8%EC%A7%91_%EA%B3%B5%EA%B3%A0.pdf))
- **[내 판단]** 8분 버전의 목표 시간은 7분 15초~7분 30초로 잡고, 남는 시간은 장비
  연결·클릭 지연·발표자 전환에 쓴다. 5분 버전은 같은 서사에서 경쟁사 상세, 기술 상세,
  확장 계획을 백업으로 보내고 데모를 90초로 제한한다.
- **[내 판단]** 슬라이드가 시간보다 많아지면 각 장의 결론을 말하기 전에 넘기거나,
  라이브 시연 시간을 잘라 기능 목록 낭독으로 변한다. 목원대가 발표·시연의 논리성·명확성·전달력을
  별도 배점으로 둔 점 때문에, “많이 보여 주기”가 이 세 요소의 대체물이 될 수 없다.
  ([목원대 운영계획 PDF](https://mokwon.ac.kr/computer/html/sub05/0501.html?file_id=768889&mode=D&no=1199d30f9cccd4ef679f39a6b6a1d4e1))

## 3. 한국 학원/부트캠프 평가 규범 — 무엇이 실제로 점수화되는가

### 검증 결과

- **[기존 인용 검증 · 1차 자료]** `03-idea-scan-positioning-KR.md`가 인용한 동서대
  URL은 2026-08-06에 정상 열렸다. 현재 연결된 자료는 **국립부경대 공학교육혁신센터의
  2026 피지컬 AI 시스템 개발 프로젝트 안내 PDF**이며, URL의 기존 라벨 “프로젝트
  평가기준”은 원문 제목이 아니다. ([현재 열리는 PDF](https://www.dongseo.ac.kr/kr/index.php?idx=102293&mode=fdn&num=1&pCode=MN2000197))
- **[1차 자료 · 국립부경대 프로그램]** 평가 100점은 기획 완성도 20(문제 정의·사용자/현장
  적합성), 기술 구현 30(스택 활용·코드 품질), 시연 성공 20(실제 동작·안정성·핵심 시나리오
  재현), 발표 품질 15(스토리텔링·시각화·시간 관리), 팀워크·문서화 15(Git 커밋 분배,
  README, 회고, 역할 분담)로 명시된다. ([프로젝트 안내 PDF, p. 8](https://www.dongseo.ac.kr/kr/index.php?idx=102293&mode=fdn&num=1&pCode=MN2000197))
- **[1차 자료 · 목원대 부트캠프]** 평가 100점은 참신성 30, 주어진 미션 완료의 정확성 50,
  발표·시연의 논리성·명확성·전달력 20이다. ([운영계획 PDF, p. 6](https://mokwon.ac.kr/computer/html/sub05/0501.html?file_id=768889&mode=D&no=1199d30f9cccd4ef679f39a6b6a1d4e1))
- **[1차 자료 · 조선대 부트캠프]** 최종 평가는 창의성 25, 실용성 30, 완성도 20, 발표 25이며,
  발표 항목에는 발표·시연 시간 준수와 발표 능력·태도가 포함된다. ([모집 공고 PDF](https://boot.chosun.ac.kr/CrossEditor/binary/files/000008/%EC%A0%9C1%ED%9A%8C_%ED%95%AD%EA%B3%B5%EC%9A%B0%EC%A3%BC_%EB%B6%84%EC%95%BC_%EB%B6%80%ED%8A%B8%EC%BA%A0%ED%94%84_%EC%95%84%EC%9D%B4%EB%94%94%EC%96%B4_%EA%B2%BD%EC%A7%84%EB%8C%80%ED%9A%8C_%EB%AA%A8%EC%A7%91_%EA%B3%B5%EA%B3%A0.pdf))
- **[1차 자료 · 연세대 미래캠퍼스 AI 부트캠프]** 의료데이터분석 과목은 팀프로젝트를
  성적의 70%로 두고, 프로젝트 흐름을 문제 정의 → 데이터 분석 → AI 모델 적용 → 결과
  해석 → 발표·피드백으로 제시한다. 다른 과목은 분석 모형의 AUC 등 성능이 기준선 이상인지
  평가한다고 밝힌다. ([연세대 AI Bootcamp](https://ycms.yonsei.ac.kr/aibootcamp/NewforBootcamp/Bootcamp01.do))
- **[2차 자료]** WikiDocs의 개인 프로젝트 장은 문제 정의 20, 기술 구현 30, UX 20,
  코드 품질 15, 발표·설명 15의 예시 채점표를 제공한다. 이는 교육기관의 공지나 이 과정의
  공식 기준이 아니라 저자 작성 예시다. ([WikiDocs — 최종 프로젝트 평가 기준](https://wikidocs.net/338419))

### Music Diary에 적용할 채점 대응

- **[내 판단]** 첫 1분은 “음악 앱”이라는 넓은 주제가 아니라, **자기 파일을 들을 때 그날의
  감정 맥락이 사라지는 문제**와 이를 해결하는 한 흐름을 말한다. 이는 문제 명료성·사용자
  적합성 항목에 직접 대응한다. ([국립부경대](https://www.dongseo.ac.kr/kr/index.php?idx=102293&mode=fdn&num=1&pCode=MN2000197))
- **[내 판단]** 점수를 위해 AI 추천·로그인·실시간 동기화를 흉내 내지 않는다. 로컬 파일,
  `localStorage`, 재생 실패/빈 상태까지 실제로 동작하는 범위가 “정확성·완성도·시연 성공”의
  증거가 된다. ([목원대](https://mokwon.ac.kr/computer/html/sub05/0501.html?file_id=768889&mode=D&no=1199d30f9cccd4ef679f39a6b6a1d4e1), [국립부경대](https://www.dongseo.ac.kr/kr/index.php?idx=102293&mode=fdn&num=1&pCode=MN2000197))
- **[내 판단]** 마지막에 역할표만 띄우지 말고, 각자 만든 결과가 남은 Git 기록, README,
  프롬프트 기록, 회고가 준비돼 있다고 짧게 연결한다. 이 항목들은 실제 공개 평가표에
  함께 들어 있다. ([국립부경대](https://www.dongseo.ac.kr/kr/index.php?idx=102293&mode=fdn&num=1&pCode=MN2000197))

## 4. AI 프롬프트 공개 — 부록이 아니라 과정 증거로 보이게 하기

### 출처가 말하는 공개 방식

- **[규범적 참고 · Flinders University]** AI를 적극 활용하는 평가에서는 결과를 평가하고,
  프롬프트·출력을 보관하며, 최종 제출물에 AI 사용을 밝히고 인용하라고 한다. 선언은
  제출물 앞부분, 모든 프롬프트·출력은 부록에 두는 예시를 제시한다. ([Flinders — AI Assessment Scale instructions](https://staff.flinders.edu.au/learning-teaching/artificial-intelligence/ai-assessment-scale-instructions))
- **[규범적 참고 · CDC]** 실질적인 생성형 AI 사용은 명확하고 접근 가능하게 공개하고,
  분석·방법론 용도는 재현 가능하도록 프롬프트, 설정, 입력, 검증 단계를 충분히 기록하라고
  권고한다. ([CDC — GenAI use disclosure](https://www.cdc.gov/ai/resources/considerations-for-generative-ai-use-in-scientific-work.html))
- **[규범적 참고 · University of Glasgow]** AI 기여 진술에는 사용 날짜, 사용 프롬프트,
  결과가 들어간 부분, AI가 만든 아이디어를 기록하도록 한다. ([University of Glasgow — reporting GenAI use](https://www.gla.ac.uk/myglasgow/learningandteaching/af-aiguidance/approaches/reportinggenaiuseinassessment/headline_1126707_en.html))
- **[관찰]** 위 지침은 공개 자체는 공통으로 요구하지만, 발표 본문에 프롬프트를 넣는
  단일한 국제 표준 순서는 제시하지 않는다. Flinders는 앞부분 선언+부록, Glasgow는 기여
  진술 방식을 제시한다. ([Flinders](https://staff.flinders.edu.au/learning-teaching/artificial-intelligence/ai-assessment-scale-instructions), [Glasgow](https://www.gla.ac.uk/myglasgow/learningandteaching/af-aiguidance/approaches/reportinggenaiuseinassessment/headline_1126707_en.html))

### Music Diary 권고

- **[내 판단]** 강사의 요구는 “프롬프트가 있었다”는 각주가 아니라 **어떤 산출물을 위해
  무엇을 물었는지**를 발표하라는 것이므로, 본문 중앙에 `AI 사용과 검증` 장 1개를 둔다.
  이 장은 데모 직전이 맞다. 즉, 조사/계획 산출물이 제품의 범위 결정으로 이어졌고, 그
  결정이 곧 시연할 흐름이라는 인과를 만든다. ([프롬프트 기록 README](../prompts/README.md))
- **[내 판단]** 이 장에는 프롬프트 원문 전체를 축소해 붙이지 않는다. 산출물별로
  `목적 → 프롬프트의 4요소(역할·만들 것·앱 목표·작업 대상) → 결과 → 팀의 검증/수정`을
  2~3개 사례로 보여 준다. 전체 원문은 발표 중 접근 가능한 백업 슬라이드 또는 QR/제출
  링크로 보존한다. 앞부분의 짧은 선언과 끝부분의 상세 기록을 나누는 방식은 위 교육기관
  지침의 “선언 + 프롬프트/출력 기록” 구조와 맞는다. ([Flinders](https://staff.flinders.edu.au/learning-teaching/artificial-intelligence/ai-assessment-scale-instructions), [Glasgow](https://www.gla.ac.uk/myglasgow/learningandteaching/af-aiguidance/approaches/reportinggenaiuseinassessment/headline_1126707_en.html))
- **[내 판단]** 보여 줄 3개는 ① 경쟁/페르소나 조사, ② 컴포넌트 패턴 조사, ③ 발표 구조
  조사로 제한한다. 각 사례에 “AI 답을 그대로 채택하지 않고 어떤 검증·수정을 했는가”를
  한 줄 붙인다. 프롬프트 수가 아니라 판단·검증 과정이 평가 가능한 증거가 된다.

## 5. 데모 위치와 실패 대비 — 무엇을 보여 주고, 깨지면 어떻게 할 것인가

### 출처가 말하는 데모

- **[규범적 참고 · Techstars]** 데모는 말로만 제품을 상상하게 하지 말고 제품의 강점과
  차별점을 보이는 구간이며, 2~3분을 넘기지 말라고 안내한다. 투자자 문맥의 조언이지만
  “보여 주기”와 시간 상한은 수업 데모에도 유용하다. ([Techstars — *Demonstrate What You Sell*](https://toolkit.techstars.com/master-your-pitch))
- **[규범적 참고 · WPI]** 라이브 데모를 할 경우 실패에 대비하고, 백업으로 사전 녹화 영상
  또는 순서대로 설명할 스크린샷을 준비하라고 안내한다. ([WPI — *Presenting a Project*](https://web.cs.wpi.edu/~claypool/one-pagers/presentation.html))
- **[1차 자료 · 국내 부트캠프]** 국립부경대는 시연 성공에서 실제 동작·안정성·핵심
  시나리오 재현 가능성을 점수화하고, 목원대와 조선대도 발표와 시연을 같은 발표 운영
  안에 둔다. ([국립부경대](https://www.dongseo.ac.kr/kr/index.php?idx=102293&mode=fdn&num=1&pCode=MN2000197), [목원대](https://mokwon.ac.kr/computer/html/sub05/0501.html?file_id=768889&mode=D&no=1199d30f9cccd4ef679f39a6b6a1d4e1), [조선대](https://boot.chosun.ac.kr/CrossEditor/binary/files/000008/%EC%A0%9C1%ED%9A%8C_%ED%95%AD%EA%B3%B5%EC%9A%B0%EC%A3%BC_%EB%B6%84%EC%95%BC_%EB%B6%80%ED%8A%B8%EC%BA%A0%ED%94%84_%EC%95%84%EC%9D%B4%EB%94%94%EC%96%B4_%EA%B2%BD%EC%A7%84%EB%8C%80%ED%9A%8C_%EB%AA%A8%EC%A7%91_%EA%B3%B5%EA%B3%A0.pdf))

### Music Diary 권고

- **[내 판단]** 데모는 해결책과 AI 과정 설명 뒤, 차별점·한계보다 앞에 둔다. 청중이
  “왜 이 흐름인가”를 이미 이해한 상태에서 `기분 선택 → 곡 선택·재생 → 한 줄 일기 저장
  → 기록에서 다시 보기`를 90~150초 동안 한 번만 끝까지 보게 한다.
- **[내 판단]** 데모 중에는 화면의 모든 탭을 관광하지 않는다. 홈에서 시작해 일기까지
  닫히는 1개 핵심 시나리오만 보이고, 플레이어 상태·빈 상태·재생 거절 같은 실패 경로는
  질문이 나오면 백업 화면으로 보인다. 이것이 “핵심 시나리오 재현”을 더 직접적으로
  증명한다. ([국립부경대](https://www.dongseo.ac.kr/kr/index.php?idx=102293&mode=fdn&num=1&pCode=MN2000197))
- **[내 판단]** 준비물은 라이브 앱, 같은 흐름을 녹화한 90~150초 영상, 흐름별 정지
  스크린샷 4장이다. 라이브가 멈추면 원인 설명을 길게 하지 않고 영상으로 즉시 전환하고,
  영상 재생도 실패하면 스크린샷으로 같은 이야기를 끝낸다. ([WPI](https://web.cs.wpi.edu/~claypool/one-pagers/presentation.html))
- **[내 판단]** 백엔드·계정·외부 API가 없으므로 서버 장애, 로그인, 네트워크 응답 같은
  일반적인 위험은 줄어든다. 반대로 브라우저의 오디오 재생 권한, 발표 장치의 음량·출력,
  로컬 파일 재선택은 남는다. 따라서 발표용으로는 이미 프로젝트 문서가 정한 **번들 데모
  음원**을 사용하고, 실제 발표 장치에서 소리와 탭 동작을 리허설한다. ([구현 명세](09-implementation-spec.md))

## 6. 3인 발표 운영 — 한 명이 계속 말할지, 어떻게 나눌지

### 출처가 말하는 팀 발표

- **[규범적 참고 · 팀 발표 연구]** 팀 발표에는 opener, 본문 담당자, closer 역할이 있고,
  역할 배정은 발표 역량·주제 전문성·팀 크기에 맞춰야 한다. 강한 발표자는 첫인상과
  마지막 인상을 맡는 것이 이상적이며, 각 본문 담당자는 자신의 부분 Q&A를 답할 수 있어야
  한다. ([Usera & Fuller — *Team Presentation Theory I*](https://journals.sagepub.com/doi/10.1177/23294906231219500))
- **[규범적 참고 · 팀 발표 연구]** Hosted, Relay, Hybrid 등 여러 형식이 있으며, Relay는
  말할 책임을 고르게 나누는 반면 Hybrid는 같은 사람이 열고 닫되 본문 전환은 팀원이
  맡는다. 전환은 논리 연결 문장과 물리적 넘김을 포함한다. ([같은 연구](https://journals.sagepub.com/doi/10.1177/23294906231219500))
- **[규범적 참고 · University of Nevada]** 팀은 누가 언제 무엇을 말할지 역할을 정하고
  함께 연습해야 하며, 발표 리드는 구조와 시간 관리를 맡고 모두는 Q&A를 준비하라고
  안내한다. ([University of Nevada, Reno — Group presentations](https://www.unr.edu/writing-speaking-center/writing-speaking-resources/group-presentations))

### Music Diary 권고

- **[내 판단]** 3인·5~8분에는 **Hybrid**가 가장 안전하다. A가 20초 도입과 20초 마무리를
  맡고, B는 문제·조사·AI 사용 과정, C는 데모와 구현 제약을 맡는다. A의 도입/마무리는
  팀의 한 이야기를 유지하고, B/C는 실제 책임 영역을 설명하게 한다. ([Usera & Fuller](https://journals.sagepub.com/doi/10.1177/23294906231219500))
- **[내 판단]** 90~150초 데모는 조작자 1명(C)과 내레이터 1명(B 또는 A)을 분리한다.
  클릭하는 사람이 말까지 하면 재생 상태·음량·전환 대응이 늦어질 수 있다. 이 분리는
  별도 발표 형식의 규칙이 아니라 짧은 라이브 시연을 안정시키기 위한 운영 선택이다.
- **[내 판단]** 각 전환 문장은 `이 문제를 이렇게 확인했으므로, 다음은 우리가 범위를
  어떻게 정했는지 보겠습니다`처럼 앞 결론과 다음 장의 질문을 함께 말한다. 이름만
  부르고 침묵하는 전환은 피한다. 전환을 리허설해야 한다는 근거는 팀 발표 지침에 있다.
  ([University of Nevada, Reno](https://www.unr.edu/writing-speaking-center/writing-speaking-resources/group-presentations))
- **[내 판단]** Q&A는 “누가 만든 기능인가”와 무관하게 세 명 모두 제품 전체, 로컬 저장의
  한계, AI 조사 검증 과정을 답할 수 있게 준비한다. 특정 담당자가 멈추면 다른 사람이
  이어받을 수 있어야 한다. ([University of Nevada, Reno](https://www.unr.edu/writing-speaking-center/writing-speaking-resources/group-presentations))

## 제안 슬라이드 뼈대 — 8분 본 발표 / 5분 축소판 공용

아래는 완성 문구가 아니라 `섹션명 → 역할 → 근거`만 정한 구조다. 각 장은 5분판에서
남겨 둘지, 백업으로 보낼지까지 함께 적었다.

| # | 섹션명 | 이 장이 할 일 | 8분판 | 5분판 | 근거 |
| --- | --- | --- | ---: | ---: | --- |
| 1 | Clova · Music Diary | 제품의 한 줄 정의와 오늘 보여 줄 핵심 흐름을 즉시 제시 | 0:20 | 0:15 | [YC의 명료한 “무엇을 하는가”](https://www.ycombinator.com/blog/how-to-pitch-your-company/) |
| 2 | 문제와 주 페르소나 | “내 파일을 들은 그날의 감정 맥락이 사라진다”는 구체 상황을 설정 | 1:00 | 0:45 | [국립부경대의 문제 정의/사용자 적합성](https://www.dongseo.ac.kr/kr/index.php?idx=102293&mode=fdn&num=1&pCode=MN2000197) |
| 3 | 조사에서 정한 제품 위치 | 스트리밍 카탈로그 경쟁 대신 개인 파일+기분 기록을 선택한 이유 | 0:45 | 0:10(한 문장) | [Sequoia의 문제·대안·해결책](https://sequoiacap.com/article/writing-a-business-plan/) |
| 4 | 해결 흐름과 범위 | 기분 선택 → 재생 → 한 줄 일기 → 날짜별 기록을 한 사용자 경로로 약속 | 0:35 | 0:25 | [YC의 사용자 경로 설명](https://www.ycombinator.com/blog/how-to-pitch-your-company/) |
| 5 | AI 사용과 팀 검증 | 프롬프트 2~3개를 산출물·검증/수정과 연결해 강사 요구를 본문에서 충족 | 0:50 | 0:35 | [Flinders의 선언+기록](https://staff.flinders.edu.au/learning-teaching/artificial-intelligence/ai-assessment-scale-instructions), [강사 요구 기록](../prompts/README.md) |
| 6 | 라이브 데모: 한 번의 완결 루프 | 준비한 한 사용자 시나리오를 90~150초로 실제 작동시킴; 영상/스크린샷 백업 포함 | 2:00 | 1:30 | [Techstars의 2~3분 데모](https://toolkit.techstars.com/master-your-pitch), [WPI의 백업](https://web.cs.wpi.edu/~claypool/one-pagers/presentation.html) |
| 7 | 실제 차이와 정직한 한계 | 오프라인·비공개 장점, 계정/백엔드 없음과 파일 재선택 한계, 다음 테스트를 함께 제시 | 1:10 | 0:45(8과 통합) | [국립부경대의 시연 안정성·재현성](https://www.dongseo.ac.kr/kr/index.php?idx=102293&mode=fdn&num=1&pCode=MN2000197) |
| 8 | 3인 역할 · 다음 검증 · 마무리 | 누가 무엇을 만들고 검증할지, 반 친구 테스트/향후 개선, 한 줄 결론으로 닫기 | 0:45 | (7과 통합) | [국립부경대의 팀워크·문서화](https://www.dongseo.ac.kr/kr/index.php?idx=102293&mode=fdn&num=1&pCode=MN2000197), [팀 발표 역할 연구](https://journals.sagepub.com/doi/10.1177/23294906231219500) |
| | **합계** | | **7:25** | **4:25** | |

- **[내 판단]** 8분판 합계 7:25 — 목표(7:15~7:30) 안. 남는 시간은 장비 연결·클릭
  지연·발표자 전환에 쓴다(2026-08-06 sol 검토로 발견 — 원래 개별 합이 6:55로
  목표에 못 미쳤던 것을 2·7번에 15초씩 더해 수정).
- **[내 판단]** 5분판 합계 4:25 — 목표(≤4:30) 안. 7·8번을 하나로 합쳐 역할·검증·마무리를
  한 화면에서 45초로 말한다. 3번은 포지셔닝 표 없이 한 문장만 말한다.
- **[내 판단]** 본문 8장 외에 `전체 프롬프트 원문`, `나머지 3개 페르소나/여정 지도`,
  `경쟁사 상세`, `실패 경로 스크린샷`은 질문용 백업으로만 둔다. 본문 시간이 정해진 뒤
  이 백업은 시청 시간에 포함하지 않는다.

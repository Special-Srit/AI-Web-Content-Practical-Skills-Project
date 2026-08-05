### Coursework / 실습

1. **One-line pitch:** 실습실 장비·재료의 위치, 상태, 대여 기록을 한눈에 찾는 앱  
**등록/검색/결과 mapping:** 등록—장비·위치·상태 입력; 검색—수업·장비명·상태 필터; 결과—위치와 사용 가능 여부 표시  
**Data source:** localStorage 입력 + 예시 static JSON  
**Hardest part:** 같은 장비의 상태 변경 처리 | **2-person split:** yes — 데이터·검색 로직 / 목록·상세 UI

2. **One-line pitch:** 전공 실습 중 발생한 오류와 해결 방법을 검색하는 실습 오류 로그  
**등록/검색/결과 mapping:** 등록—증상·원인·해결법 입력; 검색—과목·오류 키워드 필터; 결과—유사 오류와 해결 순서 표시  
**Data source:** localStorage 입력 + 교사가 제공한 예시 JSON  
**Hardest part:** 자유로운 오류 표현을 일관된 태그로 분류하기 | **2-person split:** yes — 태그·검색 / 입력·결과 화면

3. **One-line pitch:** NCS 능력단위별로 실습 증거와 미완료 항목을 관리하는 체크맵  
**등록/검색/결과 mapping:** 등록—실습 결과물·능력단위·완료 상태 입력; 검색—전공·능력단위 필터; 결과—완료율과 부족한 증거 표시  
**Data source:** NCS 공식 자료를 가공한 static JSON snapshot ([NCS 학습모듈 검색](https://ncs.go.kr/unity/th03/ncsModuleFileSearch.do))  
**Hardest part:** 학생 과제를 NCS 능력단위에 연결하기 | **2-person split:** yes — 데이터 매핑 / 진행률·UI

### 자격증 준비

4. **One-line pitch:** 자격증별 응시 자격과 제출 서류를 조건에 맞게 찾아주는 검색기  
**등록/검색/결과 mapping:** 등록—목표 자격증·학년·보유 조건 입력; 검색—자격증·조건 필터; 결과—응시 가능 여부와 준비 서류 체크리스트  
**Data source:** Q-Net 공식 정보를 정리한 static JSON ([Q-Net 국가자격 상세정보](https://www.q-net.or.kr/crf005.do?gId=3&gSite=L&id=crf00502))  
**Hardest part:** 자격증마다 다른 조건을 공통 구조로 만들기 | **2-person split:** yes — 자료 구조·조건식 / 검색·체크리스트 UI

5. **One-line pitch:** 자격증 실기시험별 준비물·금지사항·시험 당일 행동을 정리하는 카드 앱  
**등록/검색/결과 mapping:** 등록—시험 종목·준비물·주의사항 입력; 검색—자격증·시험 단계 필터; 결과—시험 전 체크리스트와 주의사항 표시  
**Data source:** localStorage 입력 + 공식 시험 공고를 정리한 static JSON  
**Hardest part:** 긴 공고문을 짧고 정확한 카드로 재구성하기 | **2-person split:** yes — 콘텐츠 정리 / 카드·검색 UI

### 취업·현장실습·면접

6. **One-line pitch:** 현장실습 기업을 전공 적합도와 안전 확인 항목으로 비교하는 앱  
**등록/검색/결과 mapping:** 등록—기업·직무·근무 조건·확인 항목 입력; 검색—지역·전공·조건 필터; 결과—기업 비교표와 확인이 필요한 질문 표시  
**Data source:** localStorage 입력 + 교육부 현장실습 안전 자료를 정리한 static JSON ([교육부 현장실습 안전·권익 개선방안](https://www.moe.go.kr/boardCnts/viewRenew.do?boardID=294&boardSeq=90171&lev=0&m=020402&opType=N&page=1&s=moe&searchType=null&statusYN=W))  
**Hardest part:** 안전을 임의의 점수로 오해하지 않게 설계하기 | **2-person split:** yes — 체크 기준·데이터 / 비교 결과 UI

7. **One-line pitch:** 면접 질문에 쓸 경험을 STAR 구조로 정리하고 검색하는 사례 보관함  
**등록/검색/결과 mapping:** 등록—상황·과제·행동·결과 입력; 검색—역량·면접 질문·전공 필터; 결과—재사용 가능한 STAR 답변 카드 표시  
**Data source:** localStorage 입력  
**Hardest part:** 짧은 경험에서 핵심 성과를 잘 드러내기 | **2-person split:** yes — 입력·템플릿 / 검색·답변 카드

8. **One-line pitch:** 저장한 채용공고에서 요구 역량과 자신의 준비 상태를 비교하는 skill-gap 보드  
**등록/검색/결과 mapping:** 등록—채용공고 텍스트·희망 직무·보유 기술 입력; 검색—직무·기술·지역 필터; 결과—일치 역량·부족 역량·준비 행동 표시  
**Data source:** 사용자가 붙여 넣은 채용공고를 localStorage에 저장; 샘플은 [고용24 채용정보](https://m.work24.go.kr/cm/c/d/0180/retrieveSiteEasyHpcm.do?tabIndex=tab-panel-01) 기반 static JSON  
**Hardest part:** 제각각인 공고 문장에서 기술명을 정규화하기 | **2-person split:** yes — 텍스트 처리·분류 / 비교 화면

### 포트폴리오 관리

9. **One-line pitch:** 프로젝트 결과물과 학습 증거를 기술·과목별로 검색하는 포트폴리오 카탈로그  
**등록/검색/결과 mapping:** 등록—결과물 링크·설명·사용 기술·배운 점 입력; 검색—기술·과목·프로젝트 필터; 결과—증거 카드와 비어 있는 역량 표시  
**Data source:** localStorage 입력; 파일 자체는 저장하지 않고 링크·메타데이터만 저장  
**Hardest part:** 결과물과 역량의 관계를 한눈에 보여주기 | **2-person split:** yes — 데이터 모델·검색 / 카드·상세 UI

10. **One-line pitch:** 포트폴리오 발표를 1분 설명과 예상 질문 카드로 연습하는 앱  
**등록/검색/결과 mapping:** 등록—프로젝트·문제·해결·성과·예상 질문 입력; 검색—프로젝트·기술·발표 상황 필터; 결과—1분 발표문과 Q&A 체크카드 표시  
**Data source:** localStorage 입력  
**Hardest part:** 긴 프로젝트 설명을 발표용 구조로 압축하기 | **2-person split:** yes — 발표 템플릿 / 검색·연습 UI

### 학교 행정·서류

11. **One-line pitch:** 학교 행사·취업·현장실습에 필요한 서류와 제출 경로를 찾는 서류 안내서  
**등록/검색/결과 mapping:** 등록—서류명·대상·필요 서명·제출처 입력; 검색—학년·용도·상태 필터; 결과—필요 서류 묶음과 제출 순서 표시  
**Data source:** 학교가 제공한 서류 정보를 localStorage에 입력 + 예시 static JSON  
**Hardest part:** 조건별로 달라지는 서류 묶음 표현하기 | **2-person split:** yes — 자료 구조·상태 관리 / 검색·체크 UI

12. **One-line pitch:** 직업계고 학생 대상 장학금·교육 프로그램의 지원 조건을 찾는 매칭 앱  
**등록/검색/결과 mapping:** 등록—학년·전공·성적·자격·희망 조건 입력; 검색—지역·지원 분야·조건 필터; 결과—지원 가능한 프로그램과 준비 서류 표시  
**Data source:** 교육청·학교·공공기관 공고를 정리한 static JSON snapshot  
**Hardest part:** 복잡한 지원 자격을 조건식으로 바꾸기 | **2-person split:** yes — 공고 데이터·조건식 / 결과 카드·필터

### 시간·과제 관리

13. **One-line pitch:** 남은 시간과 장소에 맞는 작은 과제를 찾아주는 자투리 시간 매칭 앱  
**등록/검색/결과 mapping:** 등록—과제·예상 시간·필요 기기·장소 입력; 검색—가능 시간·장소·과목 필터; 결과—지금 할 수 있는 과제 우선순위 표시  
**Data source:** localStorage 입력  
**Hardest part:** 예상 시간과 우선순위를 함께 계산하기 | **2-person split:** yes — 추천 로직·저장 / 입력·결과 UI

### 팀플 협업

14. **One-line pitch:** 팀플 업무, 담당자, 선행 작업을 연결해 막힌 일을 찾는 dependency 보드  
**등록/검색/결과 mapping:** 등록—업무·담당자·마감·선행 작업 입력; 검색—담당자·상태·막힘 여부 필터; 결과—업무 흐름과 다음 행동 표시  
**Data source:** localStorage 입력  
**Hardest part:** 프레임워크 없이 의존 관계를 시각화하기 | **2-person split:** yes — 상태·의존성 로직 / 보드 UI

15. **One-line pitch:** 팀플 회의에서 결정한 내용과 근거를 검색하는 결정 기록장  
**등록/검색/결과 mapping:** 등록—회의일·결정·근거·담당 행동 입력; 검색—프로젝트·키워드·담당자 필터; 결과—결정 타임라인과 미완료 행동 표시  
**Data source:** localStorage 입력  
**Hardest part:** 결정과 후속 업무를 연결해 보여주기 | **2-person split:** yes — 기록·검색 / 타임라인·상태 UI

### 통학·학교생활

16. **One-line pitch:** 통학 지연 상황별 대체 행동을 미리 정리하는 개인 통학 대응 플래너  
**등록/검색/결과 mapping:** 등록—노선·출발 시각·대체 경로·연락 방법 입력; 검색—요일·지연 상황·도착 목표 필터; 결과—상황별 준비 행동과 대체 루틴 표시  
**Data source:** localStorage 입력; 지도·실시간 교통 API 없음  
**Hardest part:** 실시간 데이터 없이도 유용한 조건형 결과 만들기 | **2-person split:** yes — 조건 로직 / 시나리오 UI

17. **One-line pitch:** 학교 급식 메뉴와 개인 알레르기·선호 정보를 대조하는 식단 기록기  
**등록/검색/결과 mapping:** 등록—메뉴·알레르기·선호 재료 입력; 검색—날짜·재료·주의 항목 필터; 결과—주의 메뉴와 개인 메모 표시  
**Data source:** 학교 식단을 직접 입력하거나 static JSON으로 제공; 사용자 선호는 localStorage  
**Hardest part:** 메뉴 속 재료 표현을 알레르기 항목과 연결하기 | **2-person split:** yes — 재료 분류·검색 / 달력·경고 UI

### 진로 탐색

18. **One-line pitch:** 직무의 실제 업무·필요 기술·학교에서 할 연습을 연결하는 직무 탐색 카드  
**등록/검색/결과 mapping:** 등록—관심 직무·현재 기술·희망 지역 입력; 검색—직무·기술·산업 분야 필터; 결과—업무 설명·관련 NCS·추천 포트폴리오 주제 표시  
**Data source:** NCS와 고용24 정보를 정리한 static JSON snapshot ([NCS](https://ncs.go.kr/index.do), [고용24](https://m.work24.go.kr/cm/c/d/0180/retrieveSiteEasyHpcm.do?tabIndex=tab-panel-01))  
**Hardest part:** 서로 다른 직무명과 기술명을 통합하기 | **2-person split:** yes — 데이터 정규화 / 탐색·추천 UI

19. **One-line pitch:** 선배·교사의 진로 인터뷰를 직무와 조언별로 검색하는 학교 지식창고  
**등록/검색/결과 mapping:** 등록—인터뷰 대상·직무·질문·조언 입력; 검색—직무·회사 유형·주제 필터; 결과—핵심 조언과 실천 항목 표시  
**Data source:** 팀이 수집한 인터뷰 내용을 localStorage에 입력 + 익명 예시 JSON  
**Hardest part:** 개인정보를 제거하면서도 생생한 정보 유지하기 | **2-person split:** yes — 입력 규칙·태그 / 검색·결과 카드

### 동아리·대회 준비

20. **One-line pitch:** 공모전·기능대회 제출 규격과 팀 준비 상태를 관리하는 체크리스트 앱  
**등록/검색/결과 mapping:** 등록—대회·제출물·규격·팀 역할 입력; 검색—분야·팀 규모·제출물 유형 필터; 결과—준비 완료율과 빠진 제출 항목 표시  
**Data source:** 공식 대회 공고를 정리한 static JSON + 팀별 진행 상태 localStorage  
**Hardest part:** 대회별 제출 규격을 공통 체크리스트로 변환하기 | **2-person split:** yes — 공고 데이터·체크 로직 / 대시보드·검색 UI

### Top-5

1. **NCS 능력단위 실습 체크맵** — 직업계고다운 전공 실습과 포트폴리오를 동시에 보여주며 데이터 구조도 명확하다.  
2. **현장실습 기업 비교·안전 체크** — 실제 진로 고민과 사회적 의미가 크고, 정적 체크리스트만으로도 구현 가능하다.  
3. **채용공고 skill-gap 보드** — 등록·검색·결과 흐름이 자연스럽고 팀원의 역할 분담이 뚜렷하다.  
4. **팀플 역할·산출물 dependency 보드** — 학생 팀이 직접 겪는 문제이며 JavaScript 시각화 역량을 보여주기 좋다.  
5. **포트폴리오 증거물 카탈로그** — 완성 범위를 통제하기 쉽고 결과 화면의 시각적 설득력이 높다.

Codex session ID: 019fca43-80a3-7c90-905c-4d35afadbf68
Resume in Codex: codex resume 019fca43-80a3-7c90-905c-4d35afadbf68

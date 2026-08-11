# `python-pptx`로 보기 좋은 덱을 만드는 실무 패턴 조사

- 조사 기준일: 2026-08-06
- 범위: `python-pptx`로 실제 `.pptx`를 만들거나 반복 갱신한 코드·문서·유지보수 기록.
- 제외: 일반적인 발표 디자인 이론, 다른 슬라이드 생성 도구의 비교.
- 표기: `[내 판단]`은 출처의 사실을 현재 Music Diary 덱에 적용한 판단이다. 출처에서 확인하지 못한 내용은 `확인 못 함`으로 표시한다.

## 1. 템플릿 기반 생성과 처음부터 그리기

### 출처가 실제로 보여 주는 것

- `python-pptx`의 공식 문서는 `Presentation('existing-prs-file.pptx')`로 기존 프레젠테이션을 열고, 기존 파일을 저장해 새 파일로 만드는 흐름을 설명한다. 외관의 상당 부분은 슬라이드를 삭제한 뒤에도 남는 테마·슬라이드 마스터·슬라이드 레이아웃에서 결정된다고 설명한다. [`Working with Presentations`](https://python-pptx.readthedocs.io/en/latest/user/presentations.html)
- 같은 문서는 `Presentation()`을 호출할 때의 내장 “template”이 실제로는 슬라이드가 없는 일반 `.pptx` 파일이라고 설명하며, PowerPoint의 실제 `.potx` 템플릿과는 다르다고 명시한다. `python-pptx`에는 템플릿과 프레젠테이션의 구별이 없다는 공식 설명도 있다. 따라서 “`.potx`를 특별히 처리하는 자동 템플릿 시스템”이라고 가정하면 안 된다. [`Working with Presentations`](https://python-pptx.readthedocs.io/en/latest/user/presentations.html), [`Concepts`](https://python-pptx.readthedocs.io/en/stable/user/concepts.html)
- 공식 placeholder 문서는 placeholder를 “미리 서식이 지정된 콘텐츠 컨테이너”로 설명하고, 서식 선택을 템플릿 디자이너가 맡아 같은 템플릿으로 만든 슬라이드의 시각적 일관성을 높이는 구조라고 설명한다. [`Understanding placeholders`](https://github.com/scanny/python-pptx/blob/master/docs/user/placeholders-understanding.rst)
- `python-pptx`의 주요 유지보수자인 Steve Canny는 레이아웃의 placeholder 위치를 전체 슬라이드에 적용하려면 시작용 PPTX를 만들고 PowerPoint에서 레이아웃을 직접 편집해야 한다고 답했다. 즉, “마스터/레이아웃은 PowerPoint에서 한 번 설계하고 Python은 채운다”는 방식이 실제 지원 패턴이다. [`How can I reposition the picture placeholder?`](https://stackoverflow.com/questions/49279998/python-pptx-how-cani-reposition-the-picture-placeholder)
- Keith McNulty의 공개 저장소는 이 패턴을 재현 가능한 코드로 보여 준다. `templates/ppt-template.pptx`에 더미 제목·차트·표가 이미 있고, Python은 그 파일을 열어 제목 문자열, 차트 데이터, 표 셀을 바꾼 뒤 여러 영업 그룹용 파일을 배치 생성한다. 저장소는 “임의로 많은 parameterized documents”를 만드는 흐름을 명시한다. [`ppt-generation`](https://github.com/keithmcnulty/ppt-generation)
- 그 저장소의 구현은 좌표를 다시 계산하기보다 제목 placeholder의 텍스트, 차트 제목, `has_table` 같은 기존 객체의 식별 정보를 이용한다. 차트는 `replace_data()`로 전체 데이터를 교체하고, 표는 기존 표의 셀을 순회한다. [`ppt-generation` tutorial lines](https://github.com/keithmcnulty/ppt-generation#using-the-python-pptx-package-to-replace-elements-of-powerpoint-presentations)
- Stack Overflow의 실제 답변도 템플릿 파일을 `Presentation(templateFileName)`으로 열고 다른 출력 경로에 저장하거나, 먼저 복사한 뒤 여는 방식을 제시한다. 원본 템플릿을 보존하고 결과 파일을 별도로 만드는 운영 습관을 확인할 수 있다. [`Using a powerpoint file with existing template`](https://stackoverflow.com/questions/51326512/using-a-powerpoint-file-with-existing-template)
- 템플릿 기반 사용이 전체 `python-pptx` 프로젝트에서 차지하는 비율은 공개 자료만으로 정량 확인 못 함. 다만 공식 문서, 유지보수자 답변, 매개변수화된 GitHub 예제가 모두 기존 PPTX를 열어 채우는 방식을 독립적으로 보여 준다. `확인 못 함` — “가장 흔하다”는 통계적 표현은 검증하지 않음.

### 현재 `build_deck.py`에 대한 판단

- `[내 판단]` 반복 보고서·브랜드가 고정된 회사용 덱에는 템플릿 기반이 분명히 유리하다. 마스터가 배경, 제목 위치, placeholder 서식, 공통 footer를 책임지므로 매번 좌표와 서식을 다시 만들 영역이 줄어든다. 이 판단의 근거가 되는 구현 패턴은 [`python-pptx` placeholder 문서](https://github.com/scanny/python-pptx/blob/master/docs/user/placeholders-understanding.rst)와 [`ppt-generation`](https://github.com/keithmcnulty/ppt-generation)이다.
- `[내 판단]` 그러나 2026-08-14 발표용으로 이미 8장짜리 from-scratch 스크립트가 작동하는 현재 덱을 지금 템플릿으로 옮기는 것은 채택하지 않는 편이 낫다. PowerPoint에서 먼저 마스터와 여러 slide layout을 설계하고, placeholder 이름·인덱스·상속을 정한 뒤, 기존 도형 코드를 각 placeholder와 연결하는 이중 작업이 필요하다. PowerPoint에서 레이아웃을 손으로 설계해야 한다는 점은 [Canny의 답변](https://stackoverflow.com/questions/49279998/python-pptx-how-cani-reposition-the-picture-placeholder)에 직접 나타난다.
- `[내 판단]` 이 migration은 “스크립트가 모든 시각 요소를 생성한다”는 현재 팀의 학습 목표와 긴장 관계가 있다. 템플릿을 쓰면 결과물은 여전히 Python으로 생성되지만, 핵심 시각 설계는 손으로 만든 `.pptx`에 남는다. 따라서 이 선택은 “더 좋은 생산 파이프라인”이지 “이번 발표의 현재 소스 철학과 같은 파이프라인”은 아니다.
- `[내 판단]` 지금은 `new_slide()`, 색상·폰트 토큰, 공통 anchor, `tile()` 같은 현재 내부 셸을 유지하면서 “코드 안의 작은 템플릿”처럼 운용하는 것이 적절하다. 단, 다음 반복 프로젝트에서 같은 레이아웃을 데이터만 바꿔 재사용할 때는 디자이너-authored `.pptx` template으로 전환할 후보가 된다.

## 2. 재사용 컴포넌트·helper library·design token 패턴

### 확인된 프로젝트

| 프로젝트 | 실제 기능 | 유지보수 상태 확인 | 현재 덱에 대한 결론 |
|---|---|---|---|
| [`templatepptx`](https://pypi.org/project/templatepptx/) | `$this$` 같은 magic word로 텍스트를 바꾸고, 그림의 alt text를 키로 써서 이미지를 채우며, 관계형 데이터 목록으로 표를 채운다. `strict_mode`를 켜면 미채움 그림·표에서 실패하게 할 수 있다. | PyPI에 0.0.84가 2025-09-14 배포되어 있고, 2025년에 여러 버전이 배포됐다. 다만 maintainer는 1명이고, 장기적인 기업 운영 규모나 시각 regression suite는 확인 못 함. [`release history`](https://pypi.org/project/templatepptx/) | `[내 판단]` 템플릿 메일머지형 반복 보고서에는 참고할 만하지만, 현재 Music Diary의 자유로운 카드·도형 레이아웃을 바꾸지는 못한다. 지금 설치하지 않음. |
| [`deckflow`](https://pypi.org/project/deckflow/) | `python-pptx` 위에 `Deck`/`Slide` 추상화를 두고 텍스트·표·차트 추출, 서식 분석, 이름으로 콘텐츠 업데이트, 중복 감지를 제공한다. 기존 PPTX의 내용을 분석·수정하는 쪽이다. | PyPI 0.1.4가 2026-01-22 배포됐다. 최신 릴리스는 확인되지만 0.x이고, 이 조사에서 안정적인 대규모 사용자·layout-grid 시스템은 확인 못 함. [`Project Status and release history`](https://pypi.org/project/deckflow/) | `[내 판단]` 미래에 “템플릿의 이름 있는 요소를 안전하게 갱신”할 때 관찰할 만하다. from-scratch deck builder용 디자인 시스템은 아니므로 이번 덱에는 과함. |
| [`python-pptx-templater`](https://github.com/kwlo/python-pptx-templater) | Jinja 스타일 template language와 JSON으로 layout slide 번호와 텍스트 값을 지정하고, 미리 만든 레이아웃으로 여러 슬라이드를 렌더링한다. | 저장소 화면에는 10 commits와 45 stars가 보이지만, 이 조사에서 마지막 commit 날짜와 릴리스 이력은 확인 못 함. `확인 못 함` — 활발히 유지된다고 판정하지 않음. [`repository`](https://github.com/kwlo/python-pptx-templater) | `[내 판단]` deadline 직전의 핵심 의존성으로 채택하지 않음. 아이디어만 “슬라이드 종류와 콘텐츠 데이터를 분리”하는 데 참고한다. |
| [`python-pptx`](https://pypi.org/project/python-pptx/) 자체 | 저수준 객체 모델, placeholder·표·차트·도형·텍스트를 제공한다. 별도의 공식 “design system” API는 확인되지 않는다. | PyPI의 최신 1.0.2는 2024-08-07 배포됐고, GitHub commit 기록의 최신 표시도 2024-08-07이다. [`PyPI`](https://pypi.org/project/python-pptx/), [`commit history`](https://github.com/scanny/python-pptx/commits/master) | `[내 판단]` 새 wrapper를 찾기보다 현재 파일 안에서 제한된 helper와 token을 유지하는 편이 안전하다. |

- “layout grid helper + design tokens + styled slide builder”를 `python-pptx` 전용으로 제공하면서 현재도 널리 유지되는 단일 표준 library는 확인 못 함. 이 조사에서 확인된 wrapper들은 대체로 (a) 기존 템플릿의 값 치환, (b) 기존 PPTX의 콘텐츠 분석·수정, (c) Jinja 기반 템플릿 렌더링 중 하나다. `확인 못 함` — 공개 저장소 검색만으로 생태계 전체의 부재를 증명할 수는 없음.
- `[내 판단]` 현재 코드의 `CANVAS`, `INK`, `ACCENT`, 폰트 상수와 `textbox()`, `rect()`, `para()`, `new_slide()`는 이미 작은 내부 design-token/component layer다. 외부 library를 추가하는 것보다 이 layer의 입력을 “슬라이드 종류별 데이터”로 제한하고, 좌표·색·서식을 한 곳에서만 바꾸게 하는 편이 이번 발표의 위험을 줄인다. 이 판단은 외부 library가 제공하는 기능 범위가 템플릿 치환 중심이라는 위 표의 출처에 근거한다.

## 3. 실제 운영·대량 생성 사례와 전문적으로 보이게 하는 코드 패턴

### 출처가 실제로 보여 주는 것

- `python-pptx` 공식 use-case 문서는 데이터베이스나 JSON에서 내용을 가져와 웹 요청에 응답하는 PPTX 생성, work-management system에서 engineering status report를 자동 생성하는 사례, 프레젠테이션 library의 bulk update를 사용 사례로 든다. 이는 one-off 그림보다 반복 데이터 파이프라인을 핵심 운영 용도로 상정한 문서다. [`Use cases`](https://python-pptx.readthedocs.io/en/stable/user/use-cases.html)
- McNulty 저장소는 더미 데이터가 들어간 3장짜리 템플릿을 기준으로 제목·차트·표만 바꾸어 Group A부터 T까지 같은 구조의 결과물을 만들 수 있는 예제를 제공한다. 코드가 전문적인 외관을 보존하는 구체적 장치는 “기존 slide/shape를 찾고, 기존 차트·표의 스타일은 두고 데이터만 교체”하는 방식이다. [`ppt-generation`](https://github.com/keithmcnulty/ppt-generation)
- 그 예제는 차트를 좌표로 새로 그리지 않고 chart title로 특정하며, 표도 기존 `has_table` 객체를 찾아 셀을 갱신한다. 이 방식은 도형의 위치와 기본 스타일을 반복해서 재생성할 때 생기는 drift를 줄이는 패턴으로 해석할 수 있다. “drift가 실제로 측정됐다”는 자료는 확인 못 함. 구현 사실은 [`tutorial code`](https://github.com/keithmcnulty/ppt-generation#loading-new-data-into-charts)와 [`editing tables`](https://github.com/keithmcnulty/ppt-generation#editing-tables)에서 확인된다.
- JPMorgan AI Research의 `AI pptX` 논문은 자연어 명령을 콘텐츠·서식 작업인 “skills”로 매핑하고, 경험에서 명령을 저장·학습하며, 구조화된 데이터에서 insight를 만들고 관련도 순위에 따라 설명과 슬라이드를 생성하는 세 구성요소를 설명한다. 금융 데이터에 대해 내부적으로 광범위하게 테스트한 prototype이라고 적는다. [`AI pptX: Robust Continuous Learning for Document Generation with AI Insights`](https://www.jpmorgan.com/content/dam/jpm/cib/complex/content/technology/ai-research-publications/pdf-4.pdf)
- 같은 JPMorgan 논문은 참고문헌에 Steve Canny의 `python-pptx`를 명시하지만, 논문 본문만으로 실제 PPTX 조립부 전체가 `python-pptx`만으로 구현됐는지는 확인 못 함. 따라서 이 논문을 “python-pptx 생산 코드의 증명”으로 과장하지 않고, 콘텐츠 추출·우선순위·서식 명령을 분리하는 운영 설계의 참고로만 사용한다. [`paper references`](https://www.jpmorgan.com/content/dam/jpm/cib/complex/content/technology/ai-research-publications/pdf-4.pdf)
- 한 실무자의 2026년 글은 분석 회사에서 2021년에 만든 스크립트가 매주 KPI를 데이터 warehouse에서 읽어 15장 템플릿에 넣고 이메일로 보낸다는 익명 사례를 소개한다. 또한 고객 대면 덱은 이미지 crop, custom font, chart color fidelity 문제 때문에 별도 시스템을 쓴다고 서술한다. 회사명·코드·재현 가능한 운영 로그는 공개되지 않았으므로 사례의 독립 검증은 확인 못 함. [`SourceToDocs production guide`](https://sourcetodocs.com/blog/python-pptx-practical-guide/)

### 현재 파이프라인에 적용할 패턴

- `[내 판단]` 전문적인 결과를 만드는 핵심은 “도형을 많이 그리는 helper”보다 `내용 데이터 → 슬라이드 종류 → 고정된 component`의 분리다. 이번 덱에서는 각 slide 함수가 문자열·숫자·카드 목록을 받고, 공통 `new_slide()`, `textbox()`, `rect()`, `table()`만 그리도록 유지하는 것이 적절하다. 이 판단은 기존 템플릿에 콘텐츠만 교체하는 [`McNulty 예제`](https://github.com/keithmcnulty/ppt-generation)와 명령·insight·서식을 분리한 [`JPMorgan 논문`](https://www.jpmorgan.com/content/dam/jpm/cib/complex/content/technology/ai-research-publications/pdf-4.pdf)을 합성한 것이다.
- `[내 판단]` 반복되는 요소는 좌표가 아니라 의미 있는 이름과 component contract를 가져야 한다. 예를 들어 “slide 4의 지역별 카드 3개”가 아니라 `stat_card(value, label, accent)`처럼 호출하고, 표의 열 수·최대 문자열 길이·콘텐츠 하단선을 입력 조건으로 둔다. `python-pptx`가 자동으로 전문성을 만들어 준다는 근거는 확인 못 함; 출처가 보여 주는 것은 기존 객체를 보존하고 데이터만 바꾸는 운영 패턴이다.
- `[내 판단]` “전문적으로 보이는지”를 코드만으로 보장하려 하지 말고, 구조 검사와 렌더 이미지 검사를 분리한다. 공식 library 문서도 PPTX가 풍부한 형식이고 모든 기능을 지원하지 않는다고 밝힌다. [`Feature support`](https://python-pptx.readthedocs.io/en/stable/)

## 4. 시각 QA·regression testing·headless rendering

### 실제로 쓰이는 렌더링 흐름

- `python-pptx`는 PPTX XML을 작성·수정하는 library이지 PowerPoint 화면을 렌더링하는 엔진이 아니다. Canny는 PowerPoint와 LibreOffice의 autofit 결과 차이에 대해, font size·줄바꿈·폰트 접근을 담당하는 rendering engine이 필요하고 `python-pptx`에는 그런 엔진이 없다고 설명한다. [`Different behavior in PowerPoint and LibreOffice`](https://stackoverflow.com/questions/41893241/different-behavior-in-powerpoint-and-libreoffice-by-ppt-generated-using-python-p)
- 공개된 Anthropic PPTX 작업 지침은 시각 검사용으로 `soffice`로 PPTX를 PDF로 바꾼 뒤 Poppler `pdftoppm`으로 슬라이드별 이미지를 만드는 두 단계 흐름을 사용한다. 명령은 다음과 같다. [`PPTX skill — Converting to Images`](https://github.com/anthropics/skills/blob/main/skills/pptx/SKILL.md)

  ```bash
  mkdir -p /tmp/pptx-qa
  soffice --headless --convert-to pdf --outdir /tmp/pptx-qa output.pptx
  pdftoppm -png -r 150 /tmp/pptx-qa/output.pdf /tmp/pptx-qa/slide
  ```

- 같은 지침은 `pdftoppm -jpeg -r 150`을 사용해 `slide-01.jpg`, `slide-02.jpg` 같은 개별 이미지를 만들고, 특정 슬라이드만 `-f N -l N`으로 다시 렌더링하는 예도 제공한다. [`Anthropic PPTX skill`](https://github.com/anthropics/skills/blob/main/skills/pptx/SKILL.md)
- LibreOffice의 공식 그래픽 export 문서는 `soffice --convert-to`에서 `impress_png_Export` 같은 source-specific filter와 PixelWidth/PixelHeight 옵션을 줄 수 있다고 설명한다. [`Graphics Export Parameters`](https://help.libreoffice.org/latest/en-US/text/shared/guide/graphic_export_params.html?DbPAR=SHARED)
- 그러나 여러 장의 PPTX를 안정적으로 각각 PNG로 만드는 현재 조사 범위의 실무 예는 직접 `--convert-to png`보다 “PPTX → PDF → `pdftoppm`”이었다. `soffice --headless --convert-to png`가 모든 Impress 슬라이드를 원하는 이름과 해상도로 출력하는 portable한 보장 여부는 확인 못 함. 공식 filter 문서는 export parameter는 설명하지만 multi-slide PPTX 결과 파일 정책까지 보장하지 않는다. [`Graphics Export Parameters`](https://help.libreoffice.org/latest/en-US/text/shared/guide/graphic_export_params.html?DbPAR=SHARED)
- LibreOffice headless는 GUI 없이 실행할 수 있지만, Document Foundation은 Linux headless 실행 파일에도 X11 libraries가 필요할 수 있다고 설명한다. 따라서 “headless = 의존성 0”은 아니다. [`HeadlessBuild`](https://wiki.documentfoundation.org/Development/HeadlessBuild)

### 신뢰도와 설치 가능성

- `[내 판단]` LibreOffice 렌더링은 **큰 충돌·텍스트 잘림·공백 불균형을 빠르게 찾는 회귀 검사**로는 가치가 있다. 하지만 PowerPoint와 같은 렌더러가 아니므로 pixel-perfect 진실로 취급하지 않는다. 특히 Canny가 PowerPoint는 cached autofit을 그대로 쓰고 LibreOffice는 열 때 다시 계산할 수 있다고 설명하므로, LO에서 통과한 결과가 PowerPoint에서도 동일하다는 보장은 없다. [`autofit behavior difference`](https://stackoverflow.com/questions/41893241/different-behavior-in-powerpoint-and-libreoffice-by-ppt-generated-using-python-p)
- Homebrew에는 macOS용 LibreOffice cask가 있고 설치 명령은 `brew install --cask libreoffice`다. 현재 cask는 macOS 11 이상, Intel과 Apple Silicon을 요구하는 것으로 표시된다. [`Homebrew LibreOffice cask`](https://formulae.brew.sh/cask/libreoffice)
- LibreOffice 공식 시스템 요구사항도 macOS 11 이상, Intel 또는 Apple silicon, 최대 약 800 MB 디스크를 제시한다. [`LibreOffice system requirements`](https://www.libreoffice.org/system-requirements/)
- PDF를 PNG로 바꾸려면 Poppler의 `pdftoppm`도 필요하다. Homebrew에는 별도 `poppler` formula가 있다. [`Homebrew Poppler`](https://formulae.brew.sh/formula/poppler)
- macOS에서 LibreOffice의 “headless 전용 최소 설치 패키지”는 확인 못 함. 이번 조사에서 확인된 설치 경로는 전체 LibreOffice cask와 별도 Poppler다. 따라서 build script가 자동 설치할 대상이 아니라 개발 머신의 선택적 QA 의존성으로 기록해야 한다.
- `[내 판단]` 2026-08-14 전에는 스크립트 안에서 설치를 시도하지 않는다. 팀이 이미 LibreOffice와 Poppler를 승인·설치한 경우에만 위 두 단계 명령을 수동 QA에 붙이고, 그렇지 않으면 현재 구조 assert와 사람이 만든 contact sheet 검토를 우선한다. 이 판단은 설치 용량·추가 의존성과 LO/PowerPoint 렌더 차이를 고려한 것이다.

## 5. 실무자가 반복해서 보고한 실패 패턴

### 텍스트 높이·autofit

- `python-pptx` 질문에서 긴 텍스트가 text frame 밖으로 넘치는 사례가 반복된다. Canny는 한 답변에서 텍스트가 box 밖으로 나오는 지점을 잘라 넣는 계산은 폰트별 metrics와 렌더링이 필요하며, 안정적으로 작동한 해법은 콘텐츠를 손으로 맞추는 것이라고 설명한다. [`How to make long text fit`](https://stackoverflow.com/questions/66880261/how-to-make-long-text-fit-into-a-text-frame-python-pptx)
- 공식 개발 문서는 `TextFrame.fit_text()`가 시스템에 있는 폰트 파일을 사용해 best-fit 정수 font size를 계산하는 기능이지만, PowerPoint의 실제 동작과의 관계 및 측정은 렌더러 문제라고 설명한다. 공식 API는 `TEXT_TO_FIT_SHAPE`와 `SHAPE_TO_FIT_TEXT`의 차이도 명시한다. [`Text autofit analysis`](https://python-pptx.readthedocs.io/en/latest/dev/analysis/txt-autofit-text.html), [`MSO_AUTO_SIZE`](https://python-pptx.readthedocs.io/en/stable/api/enum/MsoAutoSize.html)
- `[내 판단]` 현재 `measure_kr()`는 유용한 사전 경고지만 최종 진실이 아니다. `measure_kr()` 결과만 믿고 긴 한국어 문장을 허용하지 말고, (1) 텍스트별 최대 줄 수, (2) `CONTENT_BOT`와의 좌표 검사, (3) 렌더된 이미지 확인을 함께 둔다. 폰트를 찾지 못했을 때 폴백하는 현재 코드 경로는 특히 실제 PowerPoint의 폰트 폭과 달라질 수 있다.
- `[내 판단]` 자동으로 글자를 계속 줄이는 `TEXT_TO_FIT_SHAPE`를 모든 카드에 켜는 것은 채택하지 않는다. 발표 덱의 최소 가독성을 조용히 희생하고 overflow를 숨길 수 있기 때문이다. 짧은 label·수치에는 제한적으로 쓰고, 설명문은 내용 축약이나 카드 분할로 처리한다. 이 판단은 `fit_text()`가 실험적·best-efforts 성격이라는 공식 문서와 Canny의 답변에 근거한다.

### PowerPoint와 LibreOffice의 autofit 차이

- Canny는 PowerPoint가 XML에 저장된 cached autofit font size를 사용하고, LibreOffice는 파일을 열 때 이를 다시 계산할 수 있어 같은 `python-pptx` 출력이 두 프로그램에서 다르게 보일 수 있다고 설명한다. [`Different behavior in PowerPoint and LibreOffice`](https://stackoverflow.com/questions/41893241/different-behavior-in-powerpoint-and-libreoffice-by-ppt-generated-using-python-p)
- `[내 판단]` `fit_text()`나 Pillow 측정을 “PowerPoint에서 열었을 때의 실제 line break”로 보고하지 않는다. 이번 덱의 검증 문구도 “구조 검사 통과”와 “PowerPoint에서 시각 확인”을 분리해야 한다.

### z-order·겹침

- 공식 shape-tree 문서는 slide의 첫 shape가 z-order상 가장 뒤이고 마지막 shape가 가장 앞이라고 설명한다. 도형을 추가한 순서가 화면의 앞뒤를 결정한다. [`Shape tree source`](https://python-pptx.readthedocs.io/en/stable/_modules/pptx/shapes/shapetree.html)
- 실제 질문에서 사용자는 기존 shape 위에 새 textbox를 얹었는데 일부 shape가 가려지는 문제를 보고했다. 답변은 `python-pptx`에 일반적인 “send to back” API가 없고, 필요하면 underlying XML의 shape sequence를 재배열해야 한다고 설명한다. [`Send to back a shape`](https://stackoverflow.com/questions/61676695/send-to-back-a-shape-on-ppt-using-python)
- `[내 판단]` 현재의 “장식 도형이 텍스트와 겹침”은 좌표만의 문제가 아니라 layer contract 부재다. 각 slide 함수에서 `background → large decoration → cards/panels → text → footer` 순서를 고정하고, 장식 도형을 마지막에 추가하지 않는다. XML 내부 API를 쓰는 재배열은 이번 덱에서 최후 수단으로 남긴다.

### 폰트 대체와 custom font

- `python-pptx`의 font API는 지정한 typeface와 size를 OOXML에 기록하지만, 공식 API 설명은 matching font가 발견될 때 그 폰트로 보인다고 설명한다. 파일을 연 컴퓨터에 같은 폰트가 있어야 같은 metrics를 기대할 수 있다. [`Font.name`](https://python-pptx.readthedocs.io/en/stable/api/text.html)
- Microsoft 문서는 문서에 폰트를 넣으면 폰트가 없는 컴퓨터와 공유할 때 도움이 된다고 설명하지만, OpenType/TrueType의 embedding permission에 따라 보기 전용·편집 가능 여부가 달라질 수 있다고 설명한다. [`Font embedding and redistribution`](https://learn.microsoft.com/en-my/typography/fonts/font-faq)
- Microsoft는 PowerPoint의 폰트 대체 설정이 그 설치 환경에만 있고 문서와 함께 이동하지 않는다고 안내한다. [`PowerPoint font substitution`](https://learn.microsoft.com/en-us/office/troubleshoot/powerpoint/fonts-not-embedded)
- `[내 판단]` 현재 Paperlogy 계열을 `~/Library/Fonts`에만 의존하는 구조는 발표 파일을 다른 컴퓨터에서 열 때 위험하다. 이번 패스의 최소 대응은 발표 장소의 실제 실행 컴퓨터에서 같은 폰트를 확보하거나, 대체 폰트로도 줄바꿈이 유지되는지 확인하는 것이다. `python-pptx` 코드만으로 font embedding을 완전히 해결하는 공식 API는 확인 못 함; 이전 폰트 조사 결과와도 겹치므로 이번 파일에서는 새 embedding 구현을 제안하지 않는다.

### 표·placeholder·지원 범위

- PowerPoint 표 셀에서 긴 문자열을 옆의 빈 셀로 넘기거나 cell merge로 해결하려는 질문에 대해 Canny는 PowerPoint 표와 `python-pptx`의 지원 차이를 설명하고, 해당 시점에는 table cell merge capability가 없다고 답했다. [`Prevent text wrap in table cell`](https://stackoverflow.com/questions/41228859/how-to-prevent-text-wrap-in-powerpoint-table-cell-using-python-pptx)
- placeholder는 master → layout → slide의 상속 구조를 가지며, 위치·크기·서식이 layout에서 상속된다. 하나의 위치만 직접 바꾸면 나머지 크기 상속이 끊기는 동작도 Canny의 답변에 기록돼 있다. [`Picture placeholder positioning`](https://stackoverflow.com/questions/49279998/python-pptx-how-cani-reposition-the-picture-placeholder)
- 공식 `python-pptx` 문서는 Open XML의 모든 기능을 지원하는 것은 아니며, 지원하지 않는 PowerPoint 기능이 남아 있다고 명시한다. [`Feature support`](https://python-pptx.readthedocs.io/en/stable/)
- `[내 판단]` 현재 Music Diary 표는 자동 열맞춤에 맡기지 말고 열 너비의 합, 긴 셀의 예상 줄 수, 행 높이를 입력 데이터 단계에서 검사한다. placeholder migration을 하지 않는 이번 덱에서는 placeholder 상속 문제보다 현재 코드의 수동 도형 충돌이 더 직접적인 위험이다.

## 마감일 기준 우선순위

### 지금 채택할 것 — 2026-08-14 전

1. `[내 판단]` from-scratch 구조를 템플릿으로 migration하지 않는다. 템플릿을 PowerPoint에서 먼저 설계해야 한다는 실제 workflow는 확인했지만, 이번 발표 전에 얻는 이득보다 재연결·재검증 비용이 크다. [`Canny on hand-designed layouts`](https://stackoverflow.com/questions/49279998/python-pptx-how-cani-reposition-the-picture-placeholder)
2. `[내 판단]` 현재 helper/token layer를 유지하되, slide마다 layer 순서를 명시한다. 배경과 장식은 먼저, 텍스트와 footer는 나중에 추가한다. z-order가 shape document order라는 사실은 [`official shape-tree docs`](https://python-pptx.readthedocs.io/en/stable/_modules/pptx/shapes/shapetree.html)에 근거한다.
3. `[내 판단]` 이미 있는 `measure_kr()`와 `CONTENT_BOT` 검사를 “사전 경고 + hard fail” 조합으로 운용한다. 긴 문장은 자동 축소로 숨기지 말고 줄이거나 카드 수를 줄인다. `python-pptx`가 렌더러가 아니라는 제한은 [`Canny의 autofit 답변`](https://stackoverflow.com/questions/41893241/different-behavior-in-powerpoint-and-libreoffice-by-ppt-generated-using-python-ppt)과 [`공식 fit_text 문서`](https://python-pptx.readthedocs.io/en/latest/dev/analysis/txt-autofit-text.html)에 근거한다.
4. `[내 판단]` 팀이 별도로 승인해 LibreOffice와 Poppler를 설치한 경우에만 PPTX → PDF → PNG contact sheet를 마지막 시각 QA로 실행한다. 명령은 [`Anthropic의 공개 QA workflow`](https://github.com/anthropics/skills/blob/main/skills/pptx/SKILL.md)를 따른다. 이번 조사 자체에서는 설치하지 않는다.
5. `[내 판단]` Paperlogy가 없는 실행 환경을 가정해 표지·긴 제목·표 셀의 대체 폰트 결과를 한 번 확인한다. 폰트 embedding과 substitution은 파일만 저장한다고 자동 해결되지 않는다. [`Microsoft font guidance`](https://learn.microsoft.com/en-my/typography/fonts/font-faq)

### 나중에 채택할 것

- `[내 판단]` 같은 브랜드로 주간·월간 데이터 덱을 반복 만들게 되면, PowerPoint에서 `.pptx` master와 named placeholder를 설계하고 Python은 값·차트·표만 채우는 방식으로 전환한다. 실증된 parameterized workflow는 [`McNulty 저장소`](https://github.com/keithmcnulty/ppt-generation)다.
- `[내 판단]` 템플릿 요소의 이름 기반 갱신·콘텐츠 추출이 커지면 `deckflow`를 별도 실험 branch에서 평가한다. 현재 PyPI 버전은 0.1.4이므로 곧바로 핵심 production dependency로 올리지는 않는다. [`deckflow`](https://pypi.org/project/deckflow/)
- `[내 판단]` 반복 보고서의 데이터 모델과 slide component contract를 JSON/딕셔너리로 분리한다. JPMorgan 논문의 skills·insight 분리나 McNulty의 batch parameterization에서 가져올 수 있는 운영 아이디어지만, 이번 pitch deck에 AI 생성 계층을 추가할 필요는 없다. [`AI pptX`](https://www.jpmorgan.com/content/dam/jpm/cib/complex/content/technology/ai-research-publications/pdf-4.pdf)

### 채택하지 않을 것

- `[내 판단]` deadline 직전에 `python-pptx-templater`나 작은 third-party wrapper를 검증 없이 도입하지 않는다. 해당 저장소의 마지막 활동일과 릴리스 상태를 이 조사에서 확인하지 못했다. [`python-pptx-templater`](https://github.com/kwlo/python-pptx-templater)
- `[내 판단]` LibreOffice PNG direct export 하나만을 PowerPoint pixel-truth로 사용하지 않는다. PDF를 거쳐 이미지를 만들더라도 LO 렌더 결과이며, PowerPoint와 autofit 계산이 다를 수 있다. [`LO/PowerPoint difference`](https://stackoverflow.com/questions/41893241/different-behavior-in-powerpoint-and-libreoffice-by-ppt-generated-using-python-p)
- `[내 판단]` `fit_text()`·자동 축소·custom font 지정만으로 “overflow 없음”을 주장하지 않는다. 실무자가 보고한 안정적인 해결은 결국 콘텐츠를 고정 크기에 맞추는 검토이고, `python-pptx`에는 PowerPoint와 동일한 렌더 엔진이 없다. [`Long text answer`](https://stackoverflow.com/questions/66880261/how-to-make-long-text-fit-into-a-text-frame-python-pptx)

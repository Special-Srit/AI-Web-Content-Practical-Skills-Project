# 14 · Python-pptx 덱 제작 도구 조사

작성 2026-08-06. 대상은 **Music Diary 발표 덱**을 만드는 팀원이다.
기준 스크립트는 [`nyangbti/presentation/build_deck.py`](../../../nyangbti/presentation/build_deck.py)의
직접 `python-pptx` 방식이며, 플랫폼 자체는 다시 선정하지 않는다. Music Diary의 실제 입력은
[`12-mentor-resource-summary-KR.md`](12-mentor-resource-summary-KR.md)의 경쟁사 비교표, 행동 축 표,
4개 페르소나별 고객 여정 지도다.

- 조사 범위 — `python-pptx`를 버리지 않고, 생성 전에 설치하거나 한 번 렌더링해 두는 무료·오픈 도구
- 발표 시점 — 생성된 `.pptx`가 인터넷·API·Node.js에 의존하지 않아야 한다
- 근거 원칙 — 공식 문서·공식 저장소·Microsoft/Open XML 문서를 우선했다. 도구가 **한국어를 정확히
  렌더링한다**는 보증을 공식 문서에서 찾지 못한 경우 `확인 못 함`으로 표시했다
- 설치 여부 — 이 조사를 위해 패키지를 설치하지 않았다. 아래의 설치 명령은 향후 팀이 선택할 때의
  참고용이다

## 1. 표·차트 렌더링 — 네이티브 표와 이미지 표

### 확인한 기능

- `python-pptx`의 `add_table()`은 행·열 수와 전체 위치·크기를 받아 표를 만들고, 반환 객체 안의
  `table`에서 셀에 접근한다. 셀은 텍스트 프레임을 가지며, 셀 안에는 텍스트만 들어간다.
  [공식 표 문서](https://python-pptx.readthedocs.io/en/latest/user/table.html)
- 열 너비와 행 높이는 각각 직접 지정할 수 있지만, 공식 API 문서에 **한국어 문자열을 읽고 열 폭·행
  높이를 자동 결정하는 표 레이아웃 기능**은 확인되지 않는다. 표의 `_Column.width`와 `_Row.height`가
  크기 속성으로 제공된다는 것까지 확인했다.
  [공식 표 API](https://python-pptx.readthedocs.io/en/stable/api/table.html)
- 셀의 텍스트 프레임에는 `word_wrap`, `auto_size`, `fit_text()`가 있다. `fit_text()`는 상자 안에
  들어가도록 최대 글자 크기를 계산해 적용하고, 정확한 폰트 파일 경로를 넘길 수 있다.
  [공식 TextFrame API](https://python-pptx.readthedocs.io/en/stable/api/text.html)
- `python-pptx`의 차트는 카테고리와 숫자 계열을 넣는 `add_chart()` 구조다. 경쟁사 비교표의
  "강점·약점·차이"처럼 긴 문장을 배치하는 도구가 아니며, 숫자형 조사 결과를 막대·선·원형 차트로
  바꿀 때만 적합하다.
  [공식 차트 문서](https://python-pptx.readthedocs.io/en/stable/user/charts.html)
- Matplotlib의 `table()`은 셀·행·열 헤더와 열 너비를 지정할 수 있지만, 공식 문서가 줄바꿈 문자를
  셀 안에서 처리하지 않아 텍스트가 셀 밖으로 넘칠 수 있다고 명시한다. 문서 자체도 이 기능에
  근본적인 설계 한계가 있고 추가 개발하지 않을 예정이라고 적는다.
  [Matplotlib `table()` 공식 문서](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.table.html)
- Pillow는 TrueType/OpenType 폰트를 읽어 그릴 수 있고, `textbbox()`와 `multiline_textbbox()`로
  주어진 폰트와 줄 간격의 텍스트 경계 상자를 측정한다. `textlength()`는 다음 문자열을 배치하기
  위한 폭을 측정한다.
  [Pillow ImageDraw 공식 문서](https://pillow.readthedocs.io/en/stable/reference/ImageDraw.html)

### 5열 × 6행 한국어 텍스트 표의 비교

| 기준 | 네이티브 `python-pptx` 표 | Pillow/Matplotlib 등으로 만든 PNG 표 |
| --- | --- | --- |
| 배치 | 셀 텍스트가 PowerPoint 객체로 남음. 셀마다 글꼴·색·정렬을 바꿀 수 있음. [공식 표 문서](https://python-pptx.readthedocs.io/en/latest/user/table.html) | 미리 정한 픽셀 캔버스에 텍스트와 선을 그린 뒤 `add_picture()`로 삽입. `python-pptx`의 그림 삽입은 PNG/JPG 같은 일반 이미지 경로를 지원함. [공식 Shapes API](https://python-pptx.readthedocs.io/en/latest/api/shapes.html) |
| 폭·줄바꿈 | 열 폭·행 높이를 직접 계산해야 함. `word_wrap`은 켤 수 있지만, 행 높이를 한국어 내용에 맞춰 자동으로 늘려 주는 표 전용 기능은 확인 못 함. [공식 TextFrame API](https://python-pptx.readthedocs.io/en/stable/api/text.html) | Pillow에서 같은 폰트 파일로 한글을 한 글자 단위로 감싸고 `multiline_textbbox()`로 셀 높이를 먼저 계산할 수 있음. [Pillow 공식 문서](https://pillow.readthedocs.io/en/stable/reference/ImageDraw.html) |
| 다른 PC에서의 재배치 | 폰트 대체·PowerPoint의 실제 줄바꿈에 따라 결과가 달라질 위험이 남음. `python-pptx`는 문서 편집기이지 렌더러가 아니며, 렌더링·PDF·이미지 출력은 프로젝트 범위 밖이라는 유지보수자 설명이 있음. [python-pptx 유지보수자 설명](https://github.com/scanny/python-pptx/issues/426) | 이미지가 만들어진 순간의 줄바꿈과 행 높이가 고정됨. 발표 시점에는 폰트가 다시 줄바꿈을 계산하지 않음. 단, 너무 작은 글자로 그리면 작은 글자 문제가 그대로 고정됨. [Pillow 경계 상자 문서](https://pillow.readthedocs.io/en/stable/reference/ImageDraw.html) |
| 수정·접근성 | 발표 직전 문장 수정이 쉬움. 표 안의 텍스트를 선택·복사할 수 있음. [공식 표 문서](https://python-pptx.readthedocs.io/en/latest/user/table.html) | PNG로 삽입한 뒤에는 셀 단위 수정·선택·복사가 안 됨. `add_picture()`가 그림을 삽입한다는 API 구조에서의 결과다. [공식 Shapes API](https://python-pptx.readthedocs.io/en/latest/api/shapes.html) |
| 이 사례의 결론 | 짧은 표에 적합. 5개 서비스의 장문 비교를 한 장에 모두 넣으면 행 높이와 글자 크기를 계속 수동 조정해야 함 | **내용을 그대로 유지해야 하는 넓은 표의 기계적 overflow는 이쪽이 더 잘 잡힘.** 다만 이미지 안의 글자 크기가 발표 거리에서 읽히는지 별도로 확인해야 함 |

### 구체적인 권고

- **[내 판단] 네이티브 표를 기본으로 유지한다.** 팀이 발표 직전 문장을 고치고, 표 안의 핵심 단어를
  다시 강조할 가능성이 높기 때문이다. 단순한 열·행 구조와 짧은 셀은 현재 `table()` helper를
  유지하되, 각 셀의 높이를 고정값으로 바로 증가시키지 않는다.
- **[내 판단] 먼저 Pillow 기반 `measure_kr()`를 추가한다.** 입력은 `(text, font_file, font_size,
  box_width, line_spacing)`이고, 출력은 강제 줄바꿈된 문자열·픽셀 높이·필요 행 높이다. 이 결과로
  네이티브 셀의 row height와 다음 요소의 `y`를 계산한다. 그러면 표를 이미지로 바꾸지 않고도
  현재 스크립트의 반복적인 `row_h=0.46` 조정을 줄일 수 있다.
- 경쟁사 5열 × 6행 표가 실제 문장을 줄이지 않고도 11–12pt에서 콘텐츠 영역에 들어가지 않으면,
  **[내 판단] 그 표 한 장만 Pillow로 고해상도 PNG를 만든다.** 표 전용 렌더러를 범용화하지 말고,
  `draw_table(data, widths, fonts, colors)` 한 함수로 한 번 생성한 뒤 `add_picture()`로 넣는다.
  PNG는 편집 가능한 원본이 아니므로 발표본에 넣을 최종 문장을 확정한 뒤에만 사용한다.
- Matplotlib `table()`은 공식 문서가 줄바꿈 한계를 명시하므로, 이번 한국어 표의 자동 레이아웃
  해결책으로는 **skip**한다. 차트가 필요해지는 것은 서비스별 수치나 설문 결과처럼 숫자 데이터가
  생겼을 때뿐이다.

## 2. Python에서 쓸 수 있는 아이콘·배지 시스템

### 확인한 선택지와 변환 경로

- **Lucide**는 1,600개 이상의 벡터 SVG 아이콘을 제공하고, 정적 아이콘 패키지도 공식적으로
  제공한다. 저장소 라이선스는 ISC다.
  [Lucide 공식 저장소](https://github.com/lucide-icons/lucide), [Lucide 라이선스](https://github.com/lucide-icons/lucide/blob/main/LICENSE)
- **Material Symbols**는 Google Fonts의 공식 라이브러리에서 개별 SVG·PNG를 내려받을 수 있고,
  전체 SVG 저장소도 제공한다. 라이선스는 Apache License 2.0이다.
  [Google Material Symbols 공식 가이드](https://developers.google.com/fonts/docs/material_symbols)
- **Heroicons**는 Tailwind Labs의 무료 MIT 라이선스 SVG 세트이며, 16·20·24px 크기와 outline·solid
  변형의 SVG를 제공한다.
  [Heroicons 공식 저장소](https://github.com/tailwindlabs/heroicons), [Heroicons 라이선스](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE)
- CairoSVG는 Python 모듈로 `svg2png()`를 제공하며 SVG 파일 경로·바이트 문자열을 받아 PNG
  바이트나 파일로 출력할 수 있다. CLI도 PNG 출력·크기·DPI 옵션을 제공한다.
  [CairoSVG 공식 문서](https://cairosvg.org/documentation/)
- Python 쪽의 실제 흐름은 다음과 같다. SVG 파일을 아이콘 저장소에서 고른다 → CairoSVG의
  `svg2png(url=..., output_width=..., output_height=..., write_to=...)`로 2배 또는 3배 해상도 PNG를
  **생성 시점에 한 번** 만든다 → `slide.shapes.add_picture(png_path, Inches(x), Inches(y),
  width=Inches(w), height=Inches(h))`로 넣는다. `python-pptx`의 그림 API는 그림 파일을 위치·크기와
  함께 삽입하는 방식이다.
  [CairoSVG Python API](https://cairosvg.org/documentation/), [python-pptx Shapes API](https://python-pptx.readthedocs.io/en/latest/api/shapes.html)
- `resvg`도 정적 SVG를 PNG로 렌더링하는 CLI·라이브러리지만 Rust 바이너리라는 별도 설치가 생긴다.
  [resvg 공식 저장소](https://github.com/linebender/resvg)

### 한국어 라벨과의 관계

- 아이콘 저장소가 제공하는 것은 SVG/PNG 그림이며, 한국어 설명 문구를 자동으로 제공하는 시스템은
  아니다. **[내 판단] 아이콘은 의미 보조용 배지로만 쓰고, `경쟁사`, `문제`, `기록`, `기회` 같은
  한국어 라벨은 기존 `python-pptx` 텍스트 상자에 따로 둔다.** 그러면 아이콘 변환과 한국어 폰트
  문제를 분리할 수 있다. [Material Symbols가 SVG·PNG를 제공한다는 공식 설명](https://developers.google.com/fonts/docs/material_symbols)
- Mermaid나 아이콘 폰트가 한국어 라벨까지 함께 그려 준다는 보증은 `확인 못 함`이다. 아이콘 공식
  문서·CairoSVG 문서·`python-pptx` 그림 문서를 확인했지만, 한국어 조합형 글꼴과 아이콘 내부
  라벨을 함께 검증하는 기능은 찾지 못했다. [Lucide 공식 저장소](https://github.com/lucide-icons/lucide), [CairoSVG 공식 문서](https://cairosvg.org/documentation/)

### 구체적인 권고

- **조건부 adopt — Lucide 또는 Material Symbols 중 하나만 선택한다.** 현재 덱에서 필요한 것은
  재생·기록·검색·사용자·전환 정도의 5–10개 배지이지, 전체 아이콘 프레임워크가 아니다.
  [내 판단] Lucide는 정적 SVG와 간단한 stroke 스타일이 현재 수동 도형 스타일에 맞고, Material
  Symbols는 SVG·PNG를 바로 받을 수 있다는 점이 편하다. 둘을 섞지 않는다.
- **CairoSVG는 연구 시점/생성 시점의 오프라인 pre-processing으로 adopt한다.** `build_deck.py`가
  매 실행마다 외부 URL을 호출하거나 Node.js를 실행하지 않게 하고, 미리 만든 PNG를 로컬 경로에서
  읽는다. 아이콘을 2–3개만 쓸 경우에는 기존 `MSO_SHAPE` 도형이 더 빠르므로 새 시스템을 만들지
  않는다.
- `resvg`는 이 덱에는 **skip**한다. 기능은 충분하지만 CairoSVG가 이미 Python venv 안에서
  호출 가능한 경로를 제공하며, Rust 실행 파일이라는 추가 전달물을 만들 이유가 없다. [내 판단]

## 3. Korean 폰트 패키징·임베딩

### 확인한 사실

- Paperlogy 제작자 페이지는 Paperlogy를 TTF 기반의 프레젠테이션용 글꼴로 소개하고, SIL Open Font
  License(OFL)에 따라 상업적 사용·수정·재배포가 가능하다고 설명한다. 같은 페이지는 PowerPoint의
  **파일의 글꼴 포함 → 모든 문자 포함**을 선택하면 글꼴이 없는 컴퓨터에서도 수정할 수 있다고
  안내하지만, 저장 후 글꼴이 깨지지 않는지 반드시 확인하라고 경고한다.
  [Paperlogy 제작자 페이지](https://freesentation.blog/paperlogyfont)
- OFL 1.1 원문은 글꼴을 소프트웨어와 함께 묶거나(embed) 재배포할 수 있다고 명시한다. 단, 글꼴
  자체 판매 금지, 라이선스·저작권 고지 유지, Reserved Font Name 규칙을 지켜야 한다.
  [SIL OFL 공식 원문](https://openfontlicense.org/open-font-license-official-text/)
- Microsoft PowerPoint는 `파일 → 옵션 → 저장 → 파일의 글꼴 포함`으로 글꼴을 저장하는 기능을
  제공하며, `사용된 문자만 포함`과 편집을 위한 전체 문자 포함을 구분한다. Microsoft는 모든
  TrueType/OpenType 글꼴이 임베드 가능한 것은 아니며, 글꼴 제작자가 `Non-embeddable` 등 제한을
  설정할 수 있다고 설명한다.
  [Microsoft 글꼴 포함 문서](https://support.microsoft.com/en-US/Office/fonts/benefits-of-embedding-custom-fonts)
- Open XML 형식 자체에는 `p:embeddedFont` 요소가 있고, 정규·굵게·기울임·굵은 기울임 글꼴의
  실제 데이터는 관계 파일이 가리키는 글꼴 데이터로 연결된다.
  [Microsoft Open XML `EmbeddedFont` 문서](https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.presentation.embeddedfont?view=openxml-3.0.1)
- `python-pptx` 공개 Text/Font API에서 확인되는 것은 typeface 이름, 크기, 색상, `fit_text()`의
  측정용 `font_file` 등이다. 이 공개 API 문서에는 PowerPoint의 글꼴 파일을 `.pptx` 패키지에
  넣는 `embed_font()` 같은 메서드가 없다. **[내 판단] 따라서 `python-pptx`만으로 지원되는
  안정적인 글꼴 임베딩 경로는 확인되지 않는다.**
  [python-pptx Font/Text API](https://python-pptx.readthedocs.io/en/stable/api/text.html)
- Open XML XML 파트를 직접 추가하는 것은 형식상 가능해 보이지만, 글꼴 관계·파일 데이터·임베딩
  권한·PowerPoint의 열기 검증을 함께 다뤄야 한다. 이번 조사에서 Python으로 이 작업을 안전하게
  처리하고 검증하는 공식 `python-pptx` 도구는 `확인 못 함`이다. Open XML 요소의 존재는 확인했지만,
  이 저장소의 `Paperlogy Filled` 빌드에 대한 실제 패치·재오픈 테스트는 시도하지 않았다.
  [Open XML `EmbeddedFont` 문서](https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.presentation.embeddedfont?view=openxml-3.0.1)

### `Paperlogy Filled`에 대한 주의

- 공식 제작자 페이지에서 확인한 가족명은 `Paperlogy Thin`부터 `Paperlogy Black`까지이며, 현재
  기준 스크립트가 사용하는 `Paperlogy Filled Light/Regular/...`가 그 배포물과 동일한 파일인지
  **확인 못 함**이다. `Filled`가 Srit이 한글 조합을 보강한 별도 빌드라면, 그 파일의 내부 이름과
  embedding bits 및 라이선스 고지를 별도로 확인해야 한다. [Paperlogy 제작자 페이지](https://freesentation.blog/paperlogyfont)
- OFL이라는 이름만으로 현재 사용 중인 `Filled` 파일의 개별 배포 상태까지 증명되지는 않는다.
  실제 파일에 동봉된 OFL 고지와 Reserved Font Name을 확인해야 한다. [SIL OFL 공식 원문](https://openfontlicense.org/open-font-license-official-text/)

### 구체적인 권고

- **[내 판단] Zip/XML 후처리를 이번 덱의 build path에 넣지 않는다.** 임베딩은 파일 하나가 정상
  열리는 것만으로 끝나지 않고, 글꼴 라이선스·PowerPoint 버전·편집 가능 여부까지 검증해야 한다.
  08-14 전 며칠의 8–12장 학생 덱에는 실패 비용이 너무 크다.
- **가장 안전한 순서**는 다음이다.
  1. 최종 발표본을 만든다.
  2. 발표 장소 PC에 정확한 `Paperlogy Filled` 파일을 설치할 수 있으면 설치하고, PowerPoint에서
     글꼴 포함을 켠 사본을 만든다. Microsoft 공식 문서가 안내하는 PowerPoint UI 경로다.
     [Microsoft 글꼴 포함 문서](https://support.microsoft.com/en-US/Office/fonts/benefits-of-embedding-custom-fonts)
  3. 글꼴 미설치 상태의 다른 컴퓨터에서 파일을 열어 제목·표·한국어 줄바꿈을 확인한다.
     **[내 판단]** 이 "다른 컴퓨터에서 확인" 단계 자체는 필자의 QA 권고다 — Paperlogy
     제작자 페이지가 실제로 안내하는 것은 글꼴 포함과 깨짐 확인이며, 별도 컴퓨터 검증까지
     명시하지는 않는다(2026-08-06 sol 검토로 발견 — 원래 이 문장이 제작자 페이지 인용인
     것처럼 적혀 있었음). [Paperlogy 제작자 페이지](https://freesentation.blog/paperlogyfont)
  4. 임베딩 또는 설치를 검증할 수 없으면, 발표 표시용 PDF를 함께 준비한다. **[내 판단]** PDF는
     덱의 편집 가능한 텍스트 요구를 해결하지는 않지만, 발표 당일의 글꼴 대체 위험을 줄이는
     백업이다.
- 글꼴 파일을 저장소에 넣을 때는 OFL 고지·저작권 파일을 함께 두어야 한다. 다만 현재 요청은
  연구 문서 한 개만 쓰는 것이므로 글꼴 파일을 추가하지 않았다. [SIL OFL 공식 원문](https://openfontlicense.org/open-font-license-official-text/)

## 4. 고정 경계 검사보다 나은 overflow·layout QA

### 확인한 기능과 한계

- `python-pptx`의 `TextFrame.fit_text()`는 상자 크기 안에 텍스트가 들어가도록 글자 크기를 줄인다.
  `font_file`을 넘기면 해당 TrueType 폰트의 측정값을 사용한다.
  [python-pptx TextFrame API](https://python-pptx.readthedocs.io/en/stable/api/text.html)
- 이 기능은 만능 레이아웃 엔진이 아니다. 공식 분석 문서는 폰트 파일 경로를 직접 줘야 하고,
  글꼴·굵기·기울기 변형이 제한되며, 모든 텍스트를 같은 크기로 만들고, 현재 줄바꿈을 한 공백으로
  바꾸는 등의 제약을 적는다.
  [python-pptx `fit_text()` 설계 분석](https://python-pptx.readthedocs.io/en/latest/dev/analysis/txt-fit-text.html)
- Pillow의 `textbbox()`·`multiline_textbbox()`는 실제 TTF/OTF 파일의 글리프를 기준으로 폭·높이를
  측정할 수 있다. `language="ko"` 같은 언어 정보를 적용하려면 Pillow 문서가 요구하는 `libraqm`
  지원 여부도 확인해야 한다.
  [Pillow 경계 상자 API](https://pillow.readthedocs.io/en/stable/reference/ImageDraw.html)
- PowerPoint가 최종으로 수행하는 줄바꿈·글꼴 대체를 `python-pptx`가 미리 완전히 재현한다는
  공식 기능은 확인되지 않았다. `python-pptx` 유지보수자는 PowerPoint의 렌더링·PDF·이미지 출력이
  라이브러리의 범위 밖이라고 설명한다.
  [python-pptx 유지보수자 설명](https://github.com/scanny/python-pptx/issues/426)

### 권장 preflight 패턴

- **[내 판단] `CONTENT_BOT` assert를 삭제하지 말고, 그 앞에 텍스트 단위 검사를 추가한다.**
  모든 텍스트 생성 함수를 아래 순서로 통일한다.

  1. `font_file`을 실제로 지정해 `ImageFont.truetype()`으로 로드한다. [Pillow 폰트 문서](https://pillow.readthedocs.io/en/stable/reference/ImageDraw.html)
  2. 상자 폭에서 여백을 뺀 값을 사용해 한국어 문자열을 글자 단위로 누적한다. `textlength()`가
     폭을 넘는 순간 줄을 바꾸고, 원문에 있는 명시적 줄바꿈은 유지한다. [Pillow `textlength()` 문서](https://pillow.readthedocs.io/en/stable/reference/ImageDraw.html)
  3. 완성된 줄 배열을 `multiline_textbbox()`에 넣어 실제 예상 높이를 얻는다. [Pillow `multiline_textbbox()` 문서](https://pillow.readthedocs.io/en/stable/reference/ImageDraw.html)
  4. `예상 높이 + 위·아래 여백 > box_h`이면 build를 실패시키고, 태그·문자 수·필요 높이를
     출력한다. 통과하면 그 높이로 셀·카드의 위치를 계산한 뒤 `python-pptx` 객체를 만든다. [내 판단]
  5. 네이티브 text box에는 `fit_text(font_file=...)`를 보조 안전망으로 적용하되, 서로 다른 굵기·크기의
     runs가 섞인 상자에는 적용하지 않는다. `fit_text()`가 전체 텍스트를 균일한 크기로 다루는 제약
     때문이다. [python-pptx `fit_text()` 설계 분석](https://python-pptx.readthedocs.io/en/latest/dev/analysis/txt-fit-text.html)

- 이 방식은 `CONTENT_BOT` 하나만 보는 것보다 강하다. 제목·셀·배지·표의 각 상자에서 글자 수와
  실제 폰트 폭을 확인하고, 다음 요소의 `y`도 누적 높이에서 계산하기 때문이다. **[내 판단]**
  그래도 PowerPoint의 최종 렌더링과 100% 같다고 쓰면 안 된다. 마지막으로 발표용 컴퓨터에서
  제목·한국어 표·가장 긴 고객 여정 셀을 열어 육안 확인해야 한다. [python-pptx 유지보수자 설명](https://github.com/scanny/python-pptx/issues/426)
- `matplotlib`의 renderer로 텍스트 크기를 재는 방법은 이 덱의 PowerPoint 텍스트와 같은 렌더러가
  아니다. 따라서 **확인 못 함** — Matplotlib로 잰 높이가 PowerPoint에서 동일하다는 공식 보증은
  찾지 못했다. 이번 preflight의 기준은 Pillow와 실제 사용하는 TTF 파일로 고정한다. [Matplotlib 표 문서](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.table.html), [Pillow 공식 문서](https://pillow.readthedocs.io/en/stable/reference/ImageDraw.html)

### 구체적인 권고

- **adopt — Pillow 기반 측정·줄바꿈 helper.** 별도 렌더링 시스템을 도입하는 것이 아니라,
  현재 `textbox()`, `para()`, `table()`의 입력을 먼저 검사하는 작은 공통 함수다.
- **adopt — `fit_text()`는 선택적으로 사용한다.** 한 상자 안에 한 글꼴·한 크기 계층만 있는 설명문에
  적용한다. 표 셀의 글꼴을 무조건 줄여 읽기 어려워지는 것을 성공으로 취급하지 않는다. [내 판단]
- **skip — PowerPoint XML을 읽어 실제 렌더링 높이를 완전히 예측한다고 주장하는 별도 엔진.** 이
  프로젝트 기간 안에 PowerPoint와 동일한 렌더러까지 묶는 것은 과하다. [python-pptx 유지보수자 설명](https://github.com/scanny/python-pptx/issues/426)

## 5. 고객 여정 지도의 다이어그램 렌더링

### Mermaid가 실제로 제공하는 것

- Mermaid의 `journey` 문법은 `section`으로 여정을 나누고, 각 작업을
  `Task name: <score>: <comma separated list of actors>` 형태로 표현한다. 점수는 1–5이며,
  actor도 함께 표시할 수 있다.
  [Mermaid User Journey 공식 문서](https://mermaid.js.org/syntax/userJourney)
- 따라서 Music Diary의 원자료인 `단계 → 행동 → 접점 → 감정 → pain point → opportunity`를
  journey 문법의 별도 행으로 직접 넣는 기능은 확인되지 않는다. **[내 판단]** 여섯 단계를
  `section` 또는 task로 만들고 나머지 필드를 task 이름에 긴 문자열로 합치면, 표를 시각화한 것이
  아니라 읽기 어려운 한 줄 목록이 된다. [Mermaid User Journey 공식 문서](https://mermaid.js.org/syntax/userJourney)
- Mermaid `timeline`은 `time period : event` 구조이며 긴 시간·이벤트 텍스트를 기본 줄바꿈할 수
  있다. 그러나 공식 문서가 현재 timeline을 **experimental**이라고 표시하고, 문법·속성이 바뀔 수
  있다고 경고한다.
  [Mermaid Timeline 공식 문서](https://mermaid.js.org/syntax/timeline)
- Mermaid에는 최신 문서에 `swimlane-beta`도 있지만, 공식 문서가 새로운 diagram type이고 문법이
  진화할 수 있다고 경고한다. 또한 기본 의미가 사용자 여정의 감정·기회 행보다 lane별 책임과 handoff에
  가깝다.
  [Mermaid Swimlanes 공식 문서](https://mermaid.js.org/syntax/swimlanes)
- `mermaid-cli`의 `mmdc`는 Mermaid 정의 파일을 SVG·PNG·PDF로 변환한다. 공식 사용 예는
  `mmdc -i input.mmd -o output.svg`이며, 기본 설치는 `npm install -g @mermaid-js/mermaid-cli`다.
  [Mermaid CLI 공식 저장소](https://github.com/mermaid-js/mermaid-cli)
- Kroki는 Mermaid를 포함한 여러 텍스트 다이어그램을 HTTP API로 이미지로 바꾸며, 자체 호스팅도
  제공한다. 공개 서비스와 HTTP API는 이 덱의 발표 시점 오프라인 조건에 넣을 수 없다.
  [Kroki 공식 문서](https://docs.kroki.io/kroki/)
- Mermaid theme 설정에는 `fontFamily` 변수가 있고 기본값이 문서에 공개되어 있다. 그러나 공식
  Mermaid User Journey·Timeline 문서에서 **한국어 조합, Paperlogy, 한글 글리프 누락 여부를
  보증하는 테스트 결과는 확인 못 함**이다. 공식 journey/timeline/theme 문서를 확인했지만 한국어
  지원 매트릭스는 찾지 못했다.
  [Mermaid Theme 공식 문서](https://mermaid.js.org/config/theming.html), [Mermaid User Journey 공식 문서](https://mermaid.js.org/syntax/userJourney)

### 구체적인 권고

- **skip — 네 개의 고객 여정 지도를 Mermaid `journey`로 그대로 변환한다.** 현재 데이터의 다섯
  정보 행을 Mermaid journey의 task·score·actor에 억지로 넣으면 정보 구조가 사라진다. [내 판단]
- **조건부 adopt — 시연용 단순 흐름 한 장이 필요할 때만 `mmdc`를 연구 시점에 사용한다.** 예를
  들어 `기분 선택 → 내 파일 필터 → 재생 → 한 줄 기록` 같은 제품 핵심 흐름은 Mermaid flowchart로
  만들고, SVG/PNG를 미리 저장해 `python-pptx`에 넣을 수 있다. `build_deck.py`에서 `mmdc`, Kroki,
  네트워크를 호출하지 않는다. `mmdc`가 SVG/PNG/PDF를 출력한다는 것은 공식 문서로 확인했다.
  [Mermaid CLI 공식 저장소](https://github.com/mermaid-js/mermaid-cli)
- **[내 판단] 실제 고객 여정 지도는 Pillow로 작은 swimlane/grid renderer를 직접 만든다.** 입력을
  Python `dict`로 두고, 여섯 stage를 열로, `행동·접점`, `감정`, `pain point·기회`를 행으로 둔다.
  셀 높이는 §4의 `measure_kr()`로 계산하고, 한 장에 네 페르소나를 모두 넣지 않는다. 발표 덱에서
  주 페르소나 1개만 시각화하고 나머지는 요약 표 또는 발표 설명으로 압축하는 편이 읽힌다. [내 판단]
- 4개 지도를 모두 상세하게 보존해야 한다면, **[내 판단] 도식 도구를 추가하기보다 슬라이드 수와
  정보량을 다시 결정해야 한다.** Mermaid를 도입해도 여섯 열 × 다섯 정보 행의 가독성 문제는
  해결되지 않는다.

## 6. 이번 일정에 진짜 worth adding인 것과 과한 것

| 항목 | 결정 | 이유 |
| --- | --- | --- |
| Pillow `textlength()` + `multiline_textbbox()` 기반 측정·줄바꿈 | **adopt** | 기존 `python-pptx` 객체를 유지하면서 한국어 셀·카드의 예상 높이를 생성 전에 알 수 있다. [Pillow 공식 문서](https://pillow.readthedocs.io/en/stable/reference/ImageDraw.html) |
| `TextFrame.fit_text(font_file=...)` | **부분 adopt** | 단일 스타일 텍스트의 마지막 안전망으로는 유용하지만 전체 run을 균일하게 줄이는 제약이 있다. [python-pptx `fit_text()` 문서](https://python-pptx.readthedocs.io/en/latest/dev/analysis/txt-fit-text.html) |
| 네이티브 `python-pptx` 표 | **adopt** | 수정·복사·텍스트 선택이 가능하므로 짧은 표의 기본값으로 적합하다. [python-pptx 공식 표 문서](https://python-pptx.readthedocs.io/en/latest/user/table.html) |
| Pillow 고해상도 PNG 표 | **조건부 adopt** | 5×6 장문 경쟁사 표가 네이티브 표에서 읽을 수 있는 글자 크기로 안 들어갈 때 한 장만 사용한다. 사전 줄바꿈을 고정해 overflow를 줄일 수 있지만, 수정 가능성이 사라진다. [Pillow 공식 문서](https://pillow.readthedocs.io/en/stable/reference/ImageDraw.html) |
| Lucide/Material Symbols + CairoSVG | **조건부 adopt** | 실제 배지가 5개 이상 필요할 때만 아이콘을 한 번 생성한다. CairoSVG는 Python에서 SVG→PNG가 가능하고 발표 시점 의존성이 없다. [CairoSVG 공식 문서](https://cairosvg.org/documentation/), [Material Symbols 공식 가이드](https://developers.google.com/fonts/docs/material_symbols) |
| PowerPoint UI의 글꼴 포함 | **최종 검수에서만** | PowerPoint가 지원하는 경로이지만 `python-pptx` build path에 넣지 않는다. 설치·임베드 뒤 깨짐을 다른 컴퓨터에서 확인한다. [Microsoft 글꼴 포함 문서](https://support.microsoft.com/en-US/Office/fonts/benefits-of-embedding-custom-fonts) |
| `.pptx` ZIP/XML 글꼴 후처리 | **skip** | Open XML 요소는 존재하지만, 이번 일정에 관계·임베딩 권한·재오픈 검증까지 새로 책임질 위험이 크다. [Open XML `EmbeddedFont` 문서](https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.presentation.embeddedfont?view=openxml-3.0.1) |
| Mermaid `journey`/`timeline` 전체 도입 | **skip** | journey 문법이 다섯 정보 행을 표현하지 못하고, timeline은 experimental이며, 한국어 렌더링도 공식 보증을 확인하지 못했다. [Mermaid User Journey](https://mermaid.js.org/syntax/userJourney), [Mermaid Timeline](https://mermaid.js.org/syntax/timeline) |
| Kroki 공개 API | **skip** | HTTP API라 발표 시점 오프라인 조건과 맞지 않는다. 자체 호스팅도 8–12장 학생 덱에는 설치 비용이 크다. [Kroki 공식 문서](https://docs.kroki.io/kroki/) |
| 네이티브 `python-pptx` 차트 | **skip for current content** | 현재 조사 자료는 긴 서술형 비교라 숫자 chart가 아니다. 숫자형 설문·사용성 결과가 새로 생길 때만 검토한다. [python-pptx 차트 문서](https://python-pptx.readthedocs.io/en/stable/user/charts.html) |

### [내 판단] 다음 `build_deck.py`에 한두 가지만 넣는다면

1. **첫째, Pillow 측정·줄바꿈 preflight를 넣는다.** 실제 `Paperlogy Filled` TTF 경로를 받는
   `measure_kr()`를 만들고, 모든 text box·표 셀의 예상 높이를 검사한 뒤 기존 `CONTENT_BOT`
   검사를 그대로 실행한다. 이것이 경쟁사 표·행동 축 표·여정 지도 모두에 재사용되는 가장 큰
   시간 절약이다. [Pillow 공식 문서](https://pillow.readthedocs.io/en/stable/reference/ImageDraw.html)
2. **둘째, 5×6 경쟁사 표가 여전히 읽히지 않을 때만 그 표를 고해상도 Pillow PNG로 렌더링한다.**
   네 개 여정 지도까지 전부 이미지화하거나 Mermaid를 도입하지 않는다. 그 비용을 줄인 문장과
   정확한 표 구조에 쓴다. [Matplotlib 표의 줄바꿈 한계](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.table.html), [Pillow 공식 문서](https://pillow.readthedocs.io/en/stable/reference/ImageDraw.html)

아이콘·글꼴 임베딩·Mermaid는 위 두 가지가 끝난 뒤 실제 문제가 남을 때만 추가한다. 이번 조사에서
패키지 설치와 파일 생성은 하지 않았다.

# 좋은 프레젠테이션 시각 설계 조사

- 범위: 발표의 내용 구조가 아니라 색상, 글자, 여백, 정렬, 도형, 표의 시각적 완성도를 조사했다.
- 적용 대상: `python-pptx`로 생성하는 16:9 Music Diary 덱이다.
- 원칙: 출처가 직접 말한 내용과 이 덱에 적용하기 위한 `[내 판단]`을 구분한다. 프레젠테이션에만 적용되는 단일한 수치가 확인되지 않은 경우 `확인 못 함`으로 표시한다.

## 1. 세로 리듬과 여백 사용

### 출처가 말하는 것

- Duarte는 여백을 슬라이드의 초점을 만들고 다른 요소가 기능하게 하는 공간으로 설명하며, 계층과 통일성도 슬라이드 평가의 핵심 요소로 둔다. [Duarte, “Techniques for using critique language”](https://www.duarte.com/blog/techniques-for-using-critique-language-for-more-powerful-and-effective-presentations/)
- Garr Reynolds의 *Presentation Zen* 자료는 빈 공간을 제거해야 할 낭비가 아니라, 요소에 힘과 명료성을 주는 적극적인 설계 요소로 설명한다. 또한 대칭 구성은 안정적이고 정적인 인상을, 비대칭 구성은 빈 공간을 활성화해 더 역동적인 인상을 만들 수 있다고 설명한다. [Presentation Zen, Chapter 6 PDF](https://www.presentationzen.com/chapter6_spread.pdf)
- Harvard T.H. Chan School of Public Health의 슬라이드 체크리스트는 슬라이드에 빈 공간을 넉넉히 두고, 불릿은 필요할 때 2~4개로 제한하며, 본문은 적게 쓰라고 권한다. [Harvard Slide Checklist](https://hsph.harvard.edu/research/health-communication/resources/slide-checklist/)
- Duarte는 중요한 데이터나 인용문을 더 크게 만들거나, 색·크기·그래픽으로 시선을 유도하라고 설명한다. 따라서 빈 공간을 무조건 채우기보다, 메시지에 실제로 기여하는 시각 요소만 추가해야 한다. [Duarte, “Using Contrast”](https://www.duarte.com/blog/ultimate-guide-to-contrast/)

### 짧은 표나 적은 불릿이 남는 경우

- `[내 판단]` 제목은 공통 상단 앵커에 고정하되, 제목 아래의 표·불릿 **그룹 전체**는 콘텐츠 영역 안에서 세로 중앙에 배치하는 것이 가장 안전하다. 이렇게 하면 위에는 제목이 있고 아래에는 내용이 몰린 채 큰 하단 공백만 남는 현상을 줄일 수 있다.
- `[내 판단]` 읽는 순서가 명확한 목록이나 흐름도는 상단 정렬을 유지한다. 반대로 2~3행 표, 한 문장, 단일 통계처럼 하나의 덩어리로 읽히는 콘텐츠는 세로 중앙 정렬을 기본값으로 둔다.
- `[내 판단]` 표의 행 높이를 빈 공간에 맞춰 억지로 늘리지 않는다. 셀 안의 글자는 위쪽 정렬을 유지하고, 표라는 그룹의 위치만 조정한다. 표 안의 세로 중앙 정렬은 독자가 행을 훑는 흐름을 방해할 수 있다. [Science Editor, “Best Practices in Table Design”](https://www.csescienceeditor.org/article/best-practices-in-table-design/)
- `[내 판단]` 글자 크기와 줄 간격은 가독성 한도 안에서만 키운다. 빈 공간을 채우려고 본문을 과도하게 확대하거나 줄바꿈을 유도하면 슬라이드마다 밀도가 달라지고 계층이 무너진다. Harvard는 발표 슬라이드의 본문을 18~24pt, 줄 간격을 최소 1.5로 제시한다. [Harvard Slide Checklist](https://hsph.harvard.edu/research/health-communication/resources/slide-checklist/)
- `[내 판단]` 의미 있는 보조 통계, 한 줄 결론, 짧은 인용문을 추가할 수는 있지만, 원래 내용에서 논리적으로 도출되는 경우에만 추가한다. “빈 곳이 있으니 장식 도형·로고·무관한 문구를 넣는다”는 방식은 여백의 목적과 맞지 않는다. [Garr Reynolds, Presentation Zen Tips](https://www.garrreynolds.com/tips)

### “의도적인 미니멀리즘”과 “미완성”을 가르는 코드 기준

- `[내 판단]` 의도적인 여백으로 판정할 조건을 코드에 둔다.
  - 제목·본문·강조점 중 최소 하나가 명확한 시각적 초점을 가진다.
  - 콘텐츠 그룹이 공통 그리드에 정렬되고, 여백이 좌우 또는 상하에서 균형을 이룬다.
  - 장식 도형이 빈 공간을 채우기 위해 임의로 들어간 것이 아니라, 모든 슬라이드에서 반복되는 시스템 요소다.
- `[내 판단]` 다음 조건이면 미완성으로 보고 자동 레이아웃을 다시 계산한다.
  - 콘텐츠 그룹의 상단과 하단 여백 차이가 지나치게 크다.
  - 표·불릿이 제목에 비해 너무 작아 한눈에 읽히지 않는다.
  - accent가 시각적 초점을 만들지 못하고 구석의 작은 선이나 우연한 도형으로만 남는다.
- `[내 판단]` 코드 예시:

```python
content_y = 1.55
content_h = 5.10
block_h = measure_group_height(elements)

if block_kind in {"short_table", "single_statement", "single_stat"}:
    block_y = content_y + max(0, (content_h - block_h) / 2)
else:
    block_y = content_y
```

## 2. 타이포그래피 스케일과 계층

### 출처가 말하는 것

- 발표용 글자 크기에 대해 모든 환경에 통하는 제목-부제-본문의 단일 비율은 `확인 못 함`이다. 대신 공공 디자인 시스템과 발표 가이드는 고정된 스타일 토큰, 명확한 크기 차이, 충분한 본문 크기를 사용한다. [GOV.UK Type Scale](https://design-system.service.gov.uk/styles/type-scale/), [Harvard Slide Checklist](https://hsph.harvard.edu/research/health-communication/resources/slide-checklist/)
- 한국 정부 Korea Design System(KRDS)은 heading과 body의 크기 차이를 대체로 1.25~1.5배로 설정하는 것을 이상적인 범위로 제시한다. KRDS는 display·heading·body 구조와 계층별 크기를 토큰으로 정의한다. [KRDS Typography](https://www.krds.go.kr/html/site/style/style_03.html)
- KRDS의 PC 예시는 display 36/44/60, heading 19~40, body 13~19로 구성되며, heading에는 더 큰 크기와 굵기를 사용한다. [KRDS Typography](https://www.krds.go.kr/html/site/style/style_03.html)
- GOV.UK Design System도 특정 비율 하나보다 여러 크기와 줄 높이의 type scale을 정의하고, 새 스타일은 기존 scale의 한 지점에 맞추라고 안내한다. 이 scale은 가독성 테스트와 반복 개선을 거쳤으며, 줄 높이는 일정한 수직 리듬을 만들도록 설계되어 있다. [GOV.UK Type Scale](https://design-system.service.gov.uk/styles/type-scale/)
- Harvard의 발표 체크리스트는 headline 28pt, body 18~24pt를 제시한다. Microsoft는 발표 본문을 18pt보다 작게 쓰지 말 것을 권한다. [Harvard Slide Checklist](https://hsph.harvard.edu/research/health-communication/resources/slide-checklist/), [Microsoft presentation tips](https://support.microsoft.com/en-us/powerpoint/tips-for-creating-and-delivering-an-effective-presentation)
- Material Design은 제한된 수의 타이포그래피 스타일을 type scale로 묶어 사용하며, 너무 많은 크기와 스타일이 레이아웃을 망칠 수 있다고 설명한다. [Material Typography](https://m1.material.io/style/typography.html)

### Music Diary용 권장 토큰

- `[내 판단]` Paperlogy 한 가족 안에서 다음의 고정 토큰을 먼저 적용한다. 숫자는 16:9 발표용 시작점이며, “표준 정답”이 아니다.

```python
TYPE = {
    "display": 48,   # 표지·강한 선언 슬라이드
    "title": 36,     # 일반 콘텐츠 슬라이드 제목
    "subtitle": 28,  # 제목 보조 문장·섹션 제목
    "body": 22,      # 본문·표 셀
    "caption": 16,   # 출처·각주·보조 설명
}
```

- `[내 판단]` 이 사다리의 인접 비율은 대략 1.27~1.33이다. 이는 KRDS가 제시한 heading/body 1.25~1.5 범위 안에서, 16:9 슬라이드의 짧은 제목과 큰 한글 본문을 함께 운용하기 위한 실무적 시작점이다. [KRDS Typography](https://www.krds.go.kr/html/site/style/style_03.html)
- `[내 판단]` Paperlogy의 weight는 `display/title=Bold~Black`, `subtitle=SemiBold~Bold`, `body/table=Regular~Medium`, `caption=Light~Regular`처럼 역할에 연결한다. 같은 글꼴을 유지하고 weight와 크기로만 계층을 만들면 팔레트와 서체가 과도하게 복잡해지지 않는다. 단, 실제 weight 이름의 시각적 결과는 렌더링 확인이 필요하다.
- `[내 판단]` 본문과 표 셀은 22pt를 기본으로 하고, 18pt 아래로 내려가지 않는다. 표의 내용이 많아질 때는 먼저 문장을 줄이거나 열 너비를 조정하고, 마지막 수단으로만 20pt까지 낮춘다. 발표 환경의 거리와 화면 크기에 따라 더 큰 글자가 필요할 수 있다는 점도 Microsoft가 명시한다. [Microsoft presentation tips](https://support.microsoft.com/en-us/powerpoint/tips-for-creating-and-delivering-an-effective-presentation)
- `[내 판단]` title·subtitle·body의 line-height는 한글 본문 기준 150%를 기본으로 둔다. 제목이 한 줄인 경우에만 시각적 응집을 위해 120~135%를 시험할 수 있으나, 여러 줄 제목이 생기면 150%로 되돌린다. 150% 권장은 KRDS의 줄 간격 지침에 근거한다. [KRDS Typography](https://www.krds.go.kr/html/site/style/style_03.html)

## 3. 그리드 시스템과 정렬

### 출처가 말하는 것

- Duarte는 프레젠테이션용 사용자 정의 grid를 만들고, 그것을 모든 슬라이드에 반복 적용할 수 있다고 설명한다. grid의 구성 요소로 margins, columns, gutters를 제시한다. [Duarte, “7 ways to make your best PowerPoint presentations”](https://www.duarte.com/blog/7-ways-to-make-your-best-powerpoint-presentations/)
- Reynolds의 *Presentation Zen* 자료는 정렬을 요소를 보이지 않는 선으로 연결하는 원리로 설명하고, grid가 정렬을 달성하는 데 유용하다고 말한다. 반복은 덱 전체의 통일성을 만든다. [Presentation Zen, Chapter 6 PDF](https://www.presentationzen.com/chapter6_spread.pdf)
- McKinsey Design System은 시각 요소·간격·타이포그래피를 4pt grid에 맞추는 방식으로 일관성과 확장성을 확보한다. 이 자료는 프레젠테이션 전용 규격은 아니므로, 슬라이드에 그대로 적용되는 표준이라고 보기는 어렵다. [McKinsey Design System PDF](https://cdn.mckinsey.com/assets/sketch/McK_DS_core_Artboards.pdf)
- KRDS는 화면 양쪽의 screen margin을 두어 콘텐츠가 가장자리에 붙지 않게 하고, 화면 크기에 따른 간격과 계층별 간격을 별도 규칙으로 관리한다. [KRDS Layout](https://www.krds.go.kr/html/site/style/style_05.html)
- 16:9 발표 덱에 적용할 보편적인 인치 단위의 고정 margin 값은 `확인 못 함`. 출처들은 값 자체보다 margin·column·gutter를 반복하는 시스템을 강조한다. [Duarte grid guidance](https://www.duarte.com/blog/7-ways-to-make-your-best-powerpoint-presentations/), [KRDS Layout](https://www.krds.go.kr/html/site/style/style_05.html)

### `[내 판단]` 코드용 공통 프레임

```python
SLIDE_W = 13.333
SLIDE_H = 7.5
MARGIN_X = 0.65
TITLE_Y = 0.45
TITLE_H = 0.55
CONTENT_Y = 1.55
CONTENT_BOTTOM = 6.65
GRID_UNIT = 4 / 72  # 4pt를 inch로 환산한 시작 단위
COLS = 12
GUTTER = 0.16
```

- `[내 판단]` 모든 일반 슬라이드는 `x=MARGIN_X`, `right=SLIDE_W-MARGIN_X`, `title_y=TITLE_Y`를 공유한다. 제목을 다른 곳으로 옮기는 divider·표지 슬라이드는 예외로 선언하고, 우연히 다른 위치에 놓이는 일이 없게 `slide_class`로 관리한다.
- `[내 판단]` content box는 12열로 나누되, 실제 요소는 필요한 열만 사용한다. 표는 전체 12열, 2열 비교는 6+6열, 흐름도는 3~4개의 열 앵커로 배치한다. 12열이 공식 발표 표준이라는 뜻은 아니며, 좌표 계산을 단순화하기 위한 코드용 시스템이다.
- `[내 판단]` divider/statement 슬라이드는 공통 frame을 완전히 버리지 않는다. 제목·작은 section label·accent 위치 중 최소 하나를 일반 슬라이드와 공유하고, 선언문만 중앙축에 크게 배치한다. flow diagram도 일반 슬라이드와 같은 좌우 margin과 제목 y를 유지하고, 내부 노드만 열 앵커에 맞춘다.
- `[내 판단]` 정렬 검사를 자동화한다. 제목의 left, 표의 left, 본문 그룹의 left, flow diagram의 첫 노드 left가 같은 허용 오차 안에 있는지 검사하고, 도형과 텍스트의 간격은 `GRID_UNIT`의 배수로 반올림한다.

## 4. 색상 사용 비율

### 출처가 말하는 것

- 60-30-10은 주색 60%, 보조색 30%, accent 10%를 배분하는 시작용 경험칙으로 소개된다. Ethos3는 이를 슬라이드 또는 덱 전체의 색 균형에 적용할 수 있다고 설명한다. [Ethos3, “Color Rules for Presentation Design”](https://ethos3.com/color-rules-for-presentation-design/)
- SlidesCarnival은 60-30-10을 균형을 잡기 위한 방법으로 소개하면서도 “고정된 법칙이 아니다”라고 명시한다. [SlidesCarnival, “How to pick the best colors for your presentation”](https://www.slidescarnival.com/wp-content/uploads/2021/02/How-to-pick-the-best-colors-for-your-presentation-SlidesCarnival.pdf)
- Duarte는 중요한 데이터나 행동을 distinct accent color로 강조하라고 말하며, 색·크기·스타일을 너무 많이 섞으면 일관성이 깨질 수 있다고 설명한다. [Duarte, “Using Contrast”](https://www.duarte.com/blog/ultimate-guide-to-contrast/)
- Microsoft는 배경과 텍스트의 명도 대비가 작으면 텍스트를 읽지 못할 수 있으므로 단순하고 대비가 큰 배경을 사용하라고 안내한다. [Microsoft, “Combining colors in PowerPoint”](https://support.microsoft.com/en-us/PowerPoint/combining-colors-in-powerpoint-mistakes-to-avoid)
- 텍스트와 배경의 최소 대비 4.5:1은 WCAG의 일반 텍스트 대비 지침에 해당한다. [W3C Technique G18](https://www.w3.org/WAI/WCAG20/Techniques/general/G18)

### 고정 팔레트에 적용하기

- `[내 판단]` 60-30-10을 픽셀 면적의 엄밀한 법칙으로 쓰지 말고 **시각적 무게의 시작점**으로 사용한다. 글자와 선은 면적은 작지만 시각적 무게가 크기 때문에, terracotta가 화면의 10% 미만이어도 충분히 강하게 보일 수 있다.
- `[내 판단]` 밝은 일반 슬라이드의 역할을 다음처럼 고정한다.
  - ivory: 배경의 약 80~90% 시각 면적.
  - near-black: 제목·본문·표의 구조선·핵심 정보.
  - terracotta: 한 슬라이드의 핵심 수치, 짧은 밴드, 한쪽 rule, 선택된 노드 등 약 3~8%의 강조.
- `[내 판단]` dark divider는 역할만 반전한다. near-black을 넓은 배경으로 쓰고 ivory를 텍스트로 사용하되, terracotta는 여전히 작은 focal accent로 둔다. 한 슬라이드에서 terracotta를 배경 전체에 채웠다면 그것은 “divider 모드”라는 slide class로 선언한다.
- `[내 판단]` 한 슬라이드에서는 terracotta의 의미를 하나로 제한한다. 강조 수치에 terracotta를 사용했다면 장식 도형·모든 표 테두리·모든 bullet까지 terracotta로 만들지 않는다.
- `[내 판단]` 덱 전체에서 terracotta의 역할을 반복한다. 한 장에서는 화면 절반을 terracotta로 채우고 다른 장에서는 1pt 선으로만 쓰면, 색이 강조 신호인지 배경 모드인지 불분명해진다. Duarte가 말하는 visual system과 repetition을 코드 토큰으로 옮긴 판단이다. [Duarte, “7 ways to make your best PowerPoint presentations”](https://www.duarte.com/blog/7-ways-to-make-your-best-powerpoint-presentations/)
- `[내 판단]` terracotta 배경 위에 near-black 또는 ivory 텍스트를 놓을 때는 실제 색 조합의 대비를 계산한다. 계산하지 않은 “반투명 accent 위 텍스트”는 안전하다고 가정하지 않는다. [W3C Technique G18](https://www.w3.org/WAI/WCAG20/Techniques/general/G18)

## 5. 장식 도형의 배치와 레이어

### 출처가 말하는 것

- Microsoft는 텍스트가 그림 위에 놓이면 대비를 제어하기 어려워지므로, 텍스트와 배경의 대비를 최대한 확보하고 필요하면 distinct shadow나 glow를 사용하라고 설명한다. 또한 단순한 배경이 텍스트를 더 잘 드러낸다고 안내한다. [Microsoft, “Combining colors in PowerPoint”](https://support.microsoft.com/en-us/PowerPoint/combining-colors-in-powerpoint-mistakes-to-avoid)
- Digital.gov는 이미지 위에 텍스트를 놓아야 할 때 텍스트 뒤에 단색 배경을 추가하거나 어두운 overlay를 사용하라고 권한다. [Digital.gov, “Accessibility for visual designers”](https://digital.gov/guides/accessibility-for-teams/visual-design)
- W3C는 배경의 명도가 변하거나 패턴이 있을 때 글자 바로 뒤의 영역을 어둡게·밝게 조정하거나 halo를 제공해 글자와 배경의 대비를 유지하는 방법을 제시한다. [W3C Technique G18](https://www.w3.org/WAI/WCAG20/Techniques/general/G18)
- Microsoft Style Guide는 텍스트 뒤의 screened/shaded background나 watermark가 대비를 낮추고 읽기를 방해할 수 있다고 안내한다. [Microsoft Style Guide](https://learn.microsoft.com/en-us/style-guide/accessibility/colors-patterns-text-graphics-design)
- 배경 도형의 “정확한 안전 영역 비율”이나 “정답 opacity”는 `확인 못 함`. 출처들은 opacity 숫자보다 대비와 텍스트 보호를 우선한다. [Digital.gov, “Accessibility for visual designers”](https://digital.gov/guides/accessibility-for-teams/visual-design), [W3C Technique G18](https://www.w3.org/WAI/WCAG20/Techniques/general/G18)

### `[내 판단]` Music Diary용 안전 규칙

- `[내 판단]` 텍스트 안전 영역을 코드 상수로 선언한다.

```python
TEXT_SAFE = {
    "x": MARGIN_X,
    "y": CONTENT_Y,
    "w": SLIDE_W - 2 * MARGIN_X,
    "h": CONTENT_BOTTOM - CONTENT_Y,
}
```

- `[내 판단]` 장식 도형은 기본적으로 `TEXT_SAFE` 밖에 둔다. 도형이 안전 영역 안으로 들어오면 다음 셋 중 하나를 명시적으로 선택한다.
  - 도형을 더 작게 잘라 텍스트 영역을 피한다.
  - 텍스트 뒤에 불투명 ivory/near-black panel을 둔다.
  - 도형의 명도·채도를 낮추고 실제 텍스트-배경 대비를 계산한다.
- `[내 판단]` z-order는 `background → decorative shape → opaque text panel → text → foreground accent` 순서로 고정한다. `python-pptx`에서 요소를 추가하는 순서와 별도 레이어 목록을 함께 관리하면, 장식 도형이 글자를 덮는 실수를 줄일 수 있다.
- `[내 판단]` 도형과 모든 텍스트 박스의 bounding box 교차를 자동 검사한다. 배경으로 허용한 도형이라도 텍스트가 그 위에 올라가는 경우에는 대비 검사 없이는 통과시키지 않는다.
- `[내 판단]` terracotta 도형의 opacity는 8~15%부터 시작해 렌더링을 확인한다. 이 값은 표준이 아니라 이 팔레트에서 시각적 흔적은 남기되 텍스트 경쟁자가 되지 않도록 하는 시작값이다. opacity 값 하나만으로 가독성을 보장하지 못하므로, 최종 판정은 대비와 실제 렌더 이미지로 한다.

## 6. 짧은 비교 표·데이터 슬라이드

### 출처가 말하는 것

- Science Editor는 열 너비가 내용에 따라 달라져야 하며, 같은 표 안의 열 사이 간격은 일관되고 열을 구분하는 데 필요한 최소 수준이어야 한다고 설명한다. 불필요하게 열 사이를 벌리면 읽기가 어려워진다. [Science Editor, “Best Practices in Table Design”](https://www.csescienceeditor.org/article/best-practices-in-table-design/)
- 같은 자료는 표 머리글은 짧게 하고, 여러 줄의 일반 행은 위쪽 정렬해야 하며, 행 안에서 세로 중앙 정렬하면 독자가 행과 열을 훑을 때 시선이 불필요하게 점프한다고 설명한다. [Science Editor, “Best Practices in Table Design”](https://www.csescienceeditor.org/article/best-practices-in-table-design/)
- Red Hat Design System은 표의 열·행 제목을 간결하고 스캔 가능하게 만들며, 머리글은 2~3단어 정도가 적절하다고 안내한다. 또한 표는 주변 콘텐츠 블록과 같은 너비를 사용하라고 한다. [Red Hat Table Guidelines](https://ux.redhat.com/elements/table/guidelines/)
- Duarte는 데이터가 많은 슬라이드에서 여백, section head, 명확한 시각 계층을 사용해 독자가 핵심 데이터를 찾게 하라고 권한다. [Duarte, “5 Secrets to Displaying Data in Presentations”](https://www.duarte.com/blog/display-data-in-presentations/)
- 숫자는 같은 단위와 소수 자릿수가 같으면 오른쪽 정렬, 소수 자릿수가 다르면 소수점 정렬을 권장하는 표 디자인 지침이 있다. [Science Editor, “Best Practices in Table Design”](https://www.csescienceeditor.org/article/best-practices-in-table-design/)

### `[내 판단]` 2~3행 표의 완성도 규칙

- `[내 판단]` 표의 자연스러운 높이를 먼저 계산하고, 셀의 행 높이를 남은 공간에 맞춰 늘리지 않는다. 대신 표 그룹을 `CONTENT_Y~CONTENT_BOTTOM` 안에서 세로 중앙에 놓는다.

```python
table_h = header_h + sum(row_heights)
table_y = CONTENT_Y + (CONTENT_BOTTOM - CONTENT_Y - table_h) / 2
```

- `[내 판단]` 제목이 표 위에 있는 일반 표 슬라이드는 제목과 표 그룹 사이에 일정한 gap을 남긴다. 표만 화면 중앙에 놓아 제목과 분리하지 말고, 제목-표를 하나의 시각적 그룹으로 취급한다.
- `[내 판단]` 열 너비는 내용이 대칭이면 동일하게, 행 이름(stub)과 두 비교 대상이 있으면 `24% / 38% / 38%`를 시작값으로 둔다. 행 이름이 길면 최대 `30% / 35% / 35%`까지 늘린다. 이 비율은 표 내용과 주변 그리드에 맞춰 조정하는 코드용 heuristic이며, 보편 표준은 `확인 못 함`이다.
- `[내 판단]` 모든 표는 주변 콘텐츠와 같은 left/right frame을 공유한다. 짧은 표라고 폭을 임의로 줄여 화면 한가운데 떠 있는 작은 섬처럼 만들지 않는다. 표 폭을 줄여야 한다면 오른쪽에 의미 있는 takeaway rail이나 통계가 실제로 존재할 때만 8열+4열 구조로 나눈다. [Red Hat Table Guidelines](https://ux.redhat.com/elements/table/guidelines/)
- `[내 판단]` 표 셀 내부는 `body=22pt`, `line-height=150%`, `padding_y=0.12in`을 시작값으로 둔다. 한 셀의 텍스트가 두 줄 이상이면 top-align하고, 행 높이는 `줄 수 × line_height + 2 × padding_y`로 계산한다. 2~3행 표에서 남는 하단 공간은 행 높이가 아니라 표 그룹의 위치로 해결한다.
- `[내 판단]` 시각적 완성도를 위해 모든 셀을 색으로 칠하지 않는다. header 한 줄, 추천 열 한 곳, 또는 핵심 결과 한 셀에만 terracotta를 사용하고 나머지는 ivory·near-black으로 유지한다. 표 안의 색이 정보 의미를 갖지 않는다면 장식으로 추가하지 않는다. [Duarte, “Using Contrast”](https://www.duarte.com/blog/ultimate-guide-to-contrast/)
- `[내 판단]` 표가 너무 짧아 보이면 관련 근거에서 나온 한 줄 결론이나 독립적인 수치를 표 아래에 추가할 수 있다. “공간을 채우기 위한 설명”은 추가하지 않는다. 의미 있는 보조 요소가 없으면 여백을 유지하고 표 그룹을 중앙에 배치한다. [Duarte, “5 Secrets to Displaying Data in Presentations”](https://www.duarte.com/blog/display-data-in-presentations/)

## 7. 한글·한국어 타이포그래피 메모

### 출처가 말하는 것

- KRDS는 타이포그래피를 서체, 두께, 크기, 자간, 줄 간격, 계층의 조합으로 정의하고, 같은 px 크기라도 서체 특성에 따라 더 크거나 작게 느껴질 수 있다고 설명한다. [KRDS Typography](https://www.krds.go.kr/html/site/style/style_03.html)
- KRDS는 본문 줄 간격을 최소 150% 이상으로 설정하라고 안내하고, PC heading 예시에서는 큰 heading에 1px letter spacing, body에는 0px를 사용한다. [KRDS Typography](https://www.krds.go.kr/html/site/style/style_03.html)
- KRDS는 본문 기본 크기를 최소 16px 이상으로 제시하지만, 이는 디지털 화면용 기준이다. 발표 슬라이드에 그대로 옮길 수 있는 pt 값은 아니며, 발표 환경에서는 Microsoft의 18pt 이상 및 Harvard의 18~24pt body 권고가 더 직접적인 참고가 된다. [KRDS Typography](https://www.krds.go.kr/html/site/style/style_03.html), [Microsoft presentation tips](https://support.microsoft.com/en-us/powerpoint/tips-for-creating-and-delivering-an-effective-presentation), [Harvard Slide Checklist](https://hsph.harvard.edu/research/health-communication/resources/slide-checklist/)
- Material Design은 중국어·일본어·한국어를 dense script로 분류한다. CJK 글자는 em box 전체를 사용하므로, 라틴 계열과 같은 디자인 의도를 유지하려면 라틴 계열보다 line-height를 0.1em 크게 잡아야 한다고 설명한다. [Material Typography](https://m1.material.io/style/typography.html)
- KRDS는 title과 body가 같은 크기가 되지 않도록 주의하고, 일반적으로 title을 body보다 크게 하거나 같은 크기라면 두께로 중요도를 구분하라고 안내한다. [KRDS Typography](https://www.krds.go.kr/html/site/style/style_03.html)
- Paperlogy에 맞춘 발표 전용 최적 line-height·tracking에 대한 공개 실험 자료는 `확인 못 함`이다. 따라서 아래 수치는 Paperlogy에 대한 검증 결과가 아니라 공개 가이드에서 출발한 적용값이다.

### `[내 판단]` Paperlogy에 적용할 값

- 본문·표 셀: `22pt / line-height 150% / tracking 0 / Regular~Medium`을 시작값으로 둔다. KRDS의 body letter spacing 0px와 150% line-height 지침에 맞춘다. [KRDS Typography](https://www.krds.go.kr/html/site/style/style_03.html)
- 제목·부제: `36pt / 28pt`, `Bold~Black / SemiBold~Bold`를 사용한다. 큰 heading은 KRDS 예시처럼 작은 본문과 확실한 크기·두께 차이를 갖게 한다. [KRDS Typography](https://www.krds.go.kr/html/site/style/style_03.html)
- 큰 제목의 자간은 KRDS의 1px 예시를 출발점으로 삼고, 본문에 음수 자간을 일괄 적용하지 않는다. Python에서 실제 자간 단위를 어떻게 XML로 넣을지는 구현 환경 확인이 필요하며, 숫자 자체가 가독성을 보장하지 않는다. [KRDS Typography](https://www.krds.go.kr/html/site/style/style_03.html)
- `[내 판단]` 한글은 글자 자체가 정사각형 공간을 강하게 차지하므로, 짧은 제목이라도 box 폭을 넉넉히 주고 좌우 padding을 먼저 확보한다. 줄바꿈이 생기면 한 글자만 다음 줄에 남는 경우를 검사하고, 먼저 제목 문구를 줄이거나 box 폭을 조정한다.
- `[내 판단]` 한글 본문이 두 줄 이상이면 150%를 유지하고, 텍스트 box 높이를 글자 수에 맞춰 자동 계산한다. 고정 높이 안에서 글자를 수직 중앙에 억지로 맞추거나 line-height를 줄여 맞추지 않는다. [KRDS Typography](https://www.krds.go.kr/html/site/style/style_03.html), [Material Typography](https://m1.material.io/style/typography.html)
- `[내 판단]` 표·불릿·flow node 안의 한글은 양쪽 정렬보다 왼쪽 정렬을 기본으로 한다. 한글 줄마다 단어 간격이 벌어지는 문제를 피하고, 짧은 label이나 수치만 필요에 따라 중앙 정렬한다. Microsoft도 본문을 왼쪽 정렬하고 줄 사이의 여백을 조정하라고 안내한다. [Microsoft accessibility for PowerPoint](https://support.microsoft.com/en-us/accessibility/powerpoint/make-your-powerpoint-presentations-accessible)

## 우선순위: sparse하고 일관되지 않은 생성 덱을 가장 많이 개선할 4가지

1. **전역 frame·grid·제목 앵커 고정** — 모든 일반 슬라이드에 같은 좌우 margin, 제목 y, content box, 12열 앵커를 적용한다. 정렬이 통일되면 슬라이드 종류가 달라도 하나의 시스템으로 읽힌다. [Duarte grid guidance](https://www.duarte.com/blog/7-ways-to-make-your-best-powerpoint-presentations/)
2. **타입 토큰과 한글 line-height 고정** — `48/36/28/22/16pt`, Paperlogy weight 역할, 본문 150% line-height를 코드 토큰으로 만든다. 작은 글자와 제각각인 계층을 먼저 제거한다. [KRDS Typography](https://www.krds.go.kr/html/site/style/style_03.html)
3. **짧은 표는 행을 늘리지 말고 그룹을 세로 중앙 배치** — 표 셀은 top-align, 표 전체는 content zone 안에서 중앙 정렬하고, 의미 있는 takeaway가 있을 때만 보조 요소를 추가한다. [Science Editor, “Best Practices in Table Design”](https://www.csescienceeditor.org/article/best-practices-in-table-design/)
4. **accent·장식 도형을 역할과 safe zone으로 제한** — terracotta를 focal accent로 반복 사용하고, 모든 배경 도형에 텍스트 교차 검사와 z-order 규칙을 적용한다. 텍스트 뒤에는 대비가 보장된 불투명 panel을 둔다. [W3C Technique G18](https://www.w3.org/WAI/WCAG20/Techniques/general/G18)

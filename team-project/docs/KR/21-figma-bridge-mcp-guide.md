# 21 · figma-bridge MCP 활용법 — 다음 세션을 위한 기록

작성 2026-08-07 밤. 대상은 **다음에 이 Figma 작업을 이어받는 Claude 세션**이다.
`components` 파일(로컬 Figma 데스크톱 앱, figma-bridge 플러그인 연결)에 T1-T5 +
전역 셸(P1/P2/NavFooter) + 주요 drill-down 9개가 이미 그려져 있다 — 아래 §4
진행 상황부터 먼저 읽을 것.

## 1. 연결·세션 관리

- `list_files`로 항상 현재 `fileKey`부터 확인할 것. **`fileKey`는 세션마다
  바뀔 수 있다** — 이번 세션에서도 한 번 `unsaved-msi7g0bi-cix2etp7` →
  `unsaved-msicqcp1-4vhmbor7`로 바뀌었다(사용자가 Figma 데스크톱 앱을 보거나
  조작했을 때로 추정). `fileKey`가 바뀌어도 **노드 ID 자체는 그대로 유지된다**
  — 새 `fileKey`로 같은 ID를 다시 조회하면 작업 내용이 그대로 남아 있다
- 노드가 "Not found"로 나오면 당황하지 말고 `list_files` → 새 `fileKey`로
  같은 ID 재조회. 그래도 없으면 그때 진짜로 유실된 것

## 2. ID 오프셋 예측 — 쓰되, 검증 없이 믿지 말 것

`duplicate_nodes`나 `create_frame` 연쇄 호출은 자식 노드 ID가 **예측 가능한
오프셋**으로 생성된다(예: NavFooter 복제 시 root+1=tab·검사, root+2=icon...).
같은 구조를 반복해서 복제할 때(무드 화면 5개, NavFooter 복제 여러 번 등) 이
패턴을 미리 계산해 여러 `set_solid_fill`/`set_text_properties`를 병렬로
쏘면 빠르다.

**단, 한 번은 반드시 `get_node`로 실제 구조를 확인한 뒤 병렬 호출할 것.**
이번 세션에서 오프셋 예측이 두 번 빗나갔다(다른 작업이 중간에 끼어들어
노드 수가 어긋난 경우). 틀리면 "Node not found" 에러만 나고 나머지는 멀쩡히
적용되므로, 실패한 것만 골라 재조회 후 재시도하면 된다 — 전체를 되돌릴
필요는 없다.

## 3. 자주 걸리는 함정

- **`create_frame`은 기본적으로 불투명 흰색 채움을 가진다.** 그라디언트
  배경 위에 얹는 컨테이너 프레임(섹션·TrackRow·text stack 등)은 명시적으로
  `set_solid_fill(hex:"#FFFFFF", opacity:0)`을 걸어야 그라디언트가 비쳐
  보인다. 안 그러면 흰 상자가 배경을 가린다 — 이번 세션에서 실제로 겪은
  버그, 그라디언트 데모 화면마다 반드시 체크
- **auto-layout 자식 순서는 생성 순서를 그대로 따른다.** 나중에 순서를
  바꾸려면 `reparent_nodes`로 같은 부모에 다시 넣어도 **항상 리스트 맨
  뒤로 이동**한다. 원하는 순서를 만들려면: 뒤에 와야 할 노드부터
  순서대로 (재)생성하거나, 앞에 있어야 할 노드를 지웠다가 순서 맞춰
  재생성한다
- **그라디언트 방향** — `gradientTransform: [[0,1,0],[-1,0,1]]`가 위→아래
  (top-to-bottom) 선형 그라디언트다. 기본값(identity)은 좌→우이므로 반드시
  이 transform을 넘길 것
- **`save_screenshots`의 `outputPath`는 MCP 서버의 작업 디렉터리
  (`/Users/codersrit`) 안이어야 한다.** 세션 스크래치패드(`/private/tmp/...`)
  경로를 주면 실패한다. 이번 세션은 `/Users/codersrit/.figma-wireframe-previews/`
  를 만들어 썼다 — 계속 그 폴더 사용 권장
- **오버레이(그라디언트 워시 등)를 형제 노드로 겹쳐 그렸다면, 노드 ID
  하나만으로 스크린샷을 찍으면 그 오버레이가 안 잡힌다.** `get_screenshot`/
  `save_screenshots`는 지정한 노드의 서브트리만 렌더링한다. 여러 형제
  노드를 한 장으로 합성해서 보려면 `group_nodes`로 묶은 뒤 그룹 ID를
  캡처할 것
- **폰트 이름 함정** — "Paperlogy Filled"는 하나의 패밀리가 아니라
  **weight별로 완전히 다른 패밀리명**이다(`Paperlogy Filled Bold`, 스타일
  `7 Bold` 같은 식). `Paperlogy Filled` + `Bold` 조합으로 부르면
  "폰트를 불러올 수 없음" 에러가 난다. 정확한 이름은
  `system_profiler SPFontsDataType | grep -i paperlogy`로 확인 가능

## 4. 진행 상황 (2026-08-07 밤 기준)

**완료 — 메인 플로우 8개 + drill-down 9개, 전부 회색 상자 + Paperlogy Filled
폰트 + Radix 색상 적용:**

| 화면 | 상태 |
| --- | --- |
| P1 MiniPlayer / P2 PlayerSheet / NavFooter | 완료, 전 화면에서 재사용 |
| T1 홈 | 완료 (기분 칩·오늘의 추천·최근재생) |
| T2 라이브러리 / T2-a 상세 / T2-b 빈 상태 / T2-c 생성 시트 / T2-d 곡 추가 시트 | 전부 완료 |
| T3 탐색 / T3-a 검색 0건 / T3-b 필터 0건 | 전부 완료 |
| T4 일기 / T4-a 일기 작성 / T4-b 일기 빈 상태 | 전부 완료 (T4-a는 NavFooter 없이 저장 버튼 하단 고정, T4-b는 T2-b 패턴 재사용) |
| T5 마이 / T5-a 재생 설정 / T5-b 이용약관 | 전부 완료 (T5-b는 크레딧 제외, §5 참조) |
| 기분 활성 예시(그라디언트) — 차분함/설렘/위로/집중/그리움 5종 | 전부 완료, T1 기준 |

**§1 화면 목록 전부 완료.** 남은 것:
- 다른 화면(T2~T5)에 그라디언트 무드 활성 예시 적용 — 지금은 T1에만 있음
- 실제 아이콘 — 전부 회색 도형 placeholder (§5)

## 5. 아이콘 채워 넣어야 할 자리 (Srit이 직접 선택)

이 프로젝트 규칙상(`CLAUDE.md` — 비주얼 디자인은 Srit이 직접) 아이콘을 임의로
고르지 않고 회색 도형만 넣어 뒀다.

**2026-08-07 기준 — 아래 전부 Srit이 직접 채워 넣음, T4-a 기분 얼굴만 보류:**

- ~~NavFooter — 탭 5개(홈/라이브러리/탐색/일기/마이) 아이콘~~ 완료 (탭 이름도
  같은 날 검사 → 홈으로 정정)
- ~~뒤로가기 버튼(44×44 원) — T2-a, T4-a, T5-a, T5-b 헤더 + T2-c/T2-d 시트의
  닫기 버튼~~ 완료
- ~~MiniPlayer — pause, next 아이콘~~ 완료
- ~~PlayerSheet(P2) — 닫기, 이전/재생-일시정지/다음, 좋아요·셔플·반복·큐~~ 완료
- ~~T2-b EmptyState — 56×56 원 (빈 라이브러리 안내 아이콘)~~ 완료
- ~~T2-a — ↑↓ 순서 변경 아이콘 (44×36 두 개)~~ 완료
- ~~T2-d — 선택 체크 표시(28×28 원, 곡 선택 여부)~~ 완료
- **T4-a — 기분 얼굴 5개(44×44 원 각각 — 차분함/설렘/위로/집중/그리움 감정
  얼굴) — 보류, 회색 원 placeholder 유지**

## Related

- `20-design.md` — 화면 목록·IA·그라디언트 테마 구조 (이 문서가 다루는 실제
  내용)
- `09-implementation-spec.md` — 화면↔컴포넌트 매핑, 코딩 단계 참고

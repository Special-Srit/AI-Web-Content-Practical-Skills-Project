Use your imagegen skill to generate 6 high-fidelity mobile UI mockup images for 냥BTI (a cat-personality-quiz web app, course project). These are meant to look like real app screens — not wireframes, not moodboard vignettes — the actual visual design, generated from a locked structural spec + an already-approved moodboard. This mirrors the instructor's own demonstrated workflow: moodboard → AI-generated UI/layout image → code built from that image.

## Visual direction — look at the moodboard first
A composed moodboard image already exists at `/Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/nyangbti/assets/moodboard/00-board-composed.png` — use it as the visual/tonal reference if your imagegen tool supports image input (palette, warmth, lighting mood). The locked concept is **안심형 (Reassuring)**: 차분함(calm) · 다정함(warmth) · 신뢰감(trust), for an anxious first-time cat owner persona who needs reassurance, not entertainment or clinical coldness.

## Palette (real values, from shadcn's Stone base color — don't invent new ones)
background `#ffffff`, muted `#f5f5f4`, mid-tone/muted-text `#79716b`, border `#e7e5e4`, dark/text `#1c1917`. Corner radius should read as soft-but-not-toylike — roughly 12–14px equivalent on cards/buttons, not sharp corners, not pill-everything.

## Typography rule (hard constraint, graded by the instructor)
Sans-serif ("고딕체") only — no serif/myeongjo anywhere. Body text must read as ≥16px scale, small text ≥14px scale. Button/tab labels are body-scale, not small-scale.

## Screens to generate — exact content, do not invent extra content
Each is a portrait mobile screen (assume ~390×844 aspect, iPhone-like). Render actual Korean UI text as specified — do not translate to English, do not substitute placeholder lorem ipsum.

**1. S1-start.png — 시작 화면 (no bottom nav)**
- Header: just the service name as text (no back button in this main-entry state)
- Hero: heading "우리 고양이가 왜 그러는지" + one representative hero image area (a calm cat, matching moodboard mood)
- Primary button: "검사 시작" directly under hero, visible without scrolling
- One line under the button: "회원가입 없음 · 약 3분 · 16문항"
- A fixed 3-line info block below: "최근 일주일 관찰 기준" / "모르겠음 선택 가능" / "결과는 이 기기에만 저장"
- No secondary "저장된 결과 보기" button needed for this render (that only shows conditionally)

**2. S2-question.png — 문항 화면 (no bottom nav)**
- Top bar: "[뒤로]" on the left, "3/16" centered, right side empty
- Progress bar directly below the top bar, ~3/16 filled
- Question text (max 2 lines): "최근 일주일 동안 손을 뻗으면 어떻게 반응하나요?"
- 5 stacked answer options, each a full-width tappable row at least 44px tall: "다가와서 몸을 비빈다" / "가만히 있는다" / "피하거나 도망간다" / "하악질하거나 문다" / "모르겠음 / 관찰 못 함" (this last one visually separated from the first 4, placed last)
- Below options: small counter text "모르겠음 2개 (허용 4개)"
- Fixed bottom primary button: "다음"

**3. S3-result.png — 결과 화면 (no bottom nav in this render — this is the non-C2 entry case)**
- Hero: type name + one-line summary, e.g. "신경성 높은 신중형" + "낯선 자극에 민감하지만 애정 표현은 분명해요" + one illustrative image area of a cat
- Block ① labeled area: "추천 놀이 / 추천 장난감 / 상호작용 방식" — show as one highlighted prescription block, this must visually sit ABOVE everything else content-wise (right after hero) — this ordering is non-negotiable per spec
- Block ② directly below block ①: "이 아이한테 하지 마세요" as a short list, tone must read gentle/informative, NOT scolding or alarming — no red warning colors, no exclamation iconography
- Block ③ below that: a collapsed/collapsible-looking section labeled "유형 서사 ▾" (shown collapsed, just the header row)
- Block ④: small text "이 결과의 근거 →" as a link-style row
- Block ⑤: "다른 고양이와 비교하기 →" as a link-style row
- Fixed bottom: two buttons side by side — "결과 저장" (primary) and "공유·카드" (secondary)

**4. S3c-save.png — 저장 시트 (bottom sheet overlay on top of S3, dimmed background behind)**
- Sheet title: "이 고양이의 이름"
- One text input field (placeholder "예: 나비")
- Helper text below: "이 기기에만 저장됩니다 · 브라우저 데이터를 지우면 복구할 수 없습니다"
- Primary button: "저장"
- A visible close affordance (44×44, top-right of the sheet)

**5. T2-records.png — 내 기록 (WITH bottom nav, 4 tabs)**
- Header: "내 기록"
- One or two repeated "개체 카드" entries, each showing: name · type · test date, a line "이전 검사: [type] · [date]", and two small buttons "결과 보기" / "재검사"
- One line small text: "이 기기에만 저장됨"
- Bottom nav bar with exactly 4 tabs, labeled left to right: 검사 / 내 기록 / 비교 / 알아보기 — "내 기록" shown as the active/selected tab

**6. nav-footer-detail.png — just the bottom nav bar component, isolated, larger/zoomed**
- Same 4 tabs (검사 / 내 기록 / 비교 / 알아보기), full width of a 390px-wide mobile frame, tall enough to clearly show the active-state styling on one tab vs the other 3 inactive
- This is a component reference, not a full screen — mostly white space above it is fine, focus is the nav bar itself

## Cross-screen consistency (this matters more than any single screen)
All 6 must look like they came from the same app — same exact palette, same corner-radius language, same button style (primary = dark filled, secondary = light filled), same font weight/style, same illustration style for any cat imagery (soft, warm, not cartoon/mascot). A reviewer flipping between them should immediately recognize them as one product.

## Explicitly avoid
- No English UI text — Korean only, exactly as specified above
- No cute/mascot/cartoon illustration style — same photographic-adjacent warmth as the moodboard, not flat vector characters
- No alarming/red/warning visual treatment on the "하지 마세요" block — this app has an explicit rule against any tone that reads as scolding or guilt-inducing
- No login/signup/profile/settings UI anywhere — this app has no accounts
- Don't invent extra UI elements, badges, notification dots, or content not listed above

## Output
Save all 6 as PNG under `/Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/nyangbti/assets/ui-mockup/` (create the directory). Filenames exactly: `S1-start.png`, `S2-question.png`, `S3-result.png`, `S3c-save.png`, `T2-records.png`, `nav-footer-detail.png`.

Generate all 6 in this single run without stopping for clarifying questions. After generating, report each file's path and a one-line factual description of what actually rendered (especially whether the Korean text came out legible and correct), so it can be checked against this brief before anyone builds from it.

# NyangBTI wireframe research findings

Date: 2026-08-05  
Scope: research and structural recommendations only. No Figma nodes or project source files were modified, and no Git commands were run.

## Executive finding

The current `S1-start` is not mainly “too old-fashioned”; it is incomplete as a flow entry. It has the approved headline, image placeholder, start action, and three guidance lines, but the current Figma tree does not represent the states and routes that make the IA work:

- there is no conditional `returnTo` close control;
- there is no conditional `saved-results-cta (n>0)` route to `T2-records`;
- there is no visible place for the required cat identity selection/name step before a session is created;
- the current guide text nodes overflow the guide frame’s inner content width;
- the frame has no explicit state model for first visit, resumed progress, shell-origin entry, or an existing-records state.

That combination makes S1 read like a static landing card rather than the first state of a cat-specific, resumable 16-question task. The attached reference is useful as a structural language—large breathing room, grouped rounded modules, clear editorial hierarchy—but its search/feed/grid IA must not be copied into this app’s linear flow.

## 1. Evidence boundaries

### Verified from the project sources

The following are requirements, not recommendations:

1. `S1 → S2 1/16…16/16 → S3` is a linear flow outside the four-tab shell; S1 and S2 have no footer. The footer destinations are `검사`, `내 기록`, `비교`, and `알아보기`. [04-design.md §0–§2](./04-design.md)
2. S1 must communicate the service reason as “why our cat behaves that way,” not as a generic personality-description promise. It must expose `회원가입 없음 · 약 3분 · 16문항`, the recent-week observation basis, the availability of `모르겠음`, and device-only storage. [04-design.md §6, §10; 03-ux-research.md §11-1–§11-6](./04-design.md)
3. S1 contains a hero with one image placeholder, a primary `검사 시작` action, three fixed guidance lines, and a saved-results CTA only when `n>0`. S1 has no type list, prescriptions, comparison content, or footer. [04-design.md §6](./04-design.md)
4. A session is tied to one cat. The design flow requires entering or selecting the cat identity when starting; S1-a shows the cat name and progress, while S3-c confirms or edits the display name before saving. [04-design.md §3, §6]
5. S1-a is an overlay for interrupted progress: `이어하기` returns to the saved question position and `새로 시작` returns to question 1 after a discard confirmation. [04-design.md §5–§6]
6. S2 is one question per screen, with `뒤로 / n/16 / 다음`, a progress indicator, retained answers when going back, vertically stacked choices, and a final `모르겠음 / 관찰 못 함` choice. It does not auto-advance on selection. [04-design.md §6; 03-ux-research.md §7-2, §11-2]
7. S3 prioritizes the three prescription blocks and the “do not do this” list above the collapsible type narrative. It also contains evidence, comparison entry, save, and share/card actions. Tentative-result and shared-result banners are conditional blocks. [04-design.md §5–§6; 03-ux-research.md §7-2, §9, §11]
8. T2, T3, and T4 are shell destinations with the four-tab footer. T2 and T3 require empty-state recovery CTAs; T3 becomes useful at two or more saved cats. [04-design.md §2, §5–§6]
9. The prompt requires editable Figma nodes, grey-box structure only, exact frame/layer names, 390×844 frames, and no app code, imagery, icon drawing, or file edits. [05-figma-wireframe-prompt.md](./prompts/05-figma-wireframe-prompt.md)

### Verified from the current Figma file, read-only

The connected file is `Concept`, page `Page 1`, with one top-level frame: `S1-start` at 390×844. Its current top-level structure is:

`header · service name only` → `hero` → `start-action` → `inspection-guide`

The Figma tree confirms that the current S1 already contains:

- `우리 고양이가 왜 그러는지`;
- `대표 이미지 1장 자리`;
- `검사 시작`;
- `회원가입 없음 · 약 3분 · 16문항`;
- `검사 안내` with the three required guidance lines.

The same read-only inspection confirms that it currently lacks the conditional close and saved-results layers described above.

> **Correction (Claude, 2026-08-05).** This paragraph originally reported the `inspection-guide` child text nodes as 350px wide and therefore overflowing the guide's 318px inner content box. **That is wrong.** The children measure `x=16, width=318`, giving a right edge of `334` against an inner box of `16..334` — an exact fit with no clipping. Verified twice against `get_document`, once before and once after Figma reconnected. The `saved-results-cta` gap in the preceding sentence is real and has since been fixed.

## 2. Diagnosis of why S1 feels incomplete/off

### Primary cause: missing task identity

The screen starts a test, but does not show what the test is being started for. The approved flow is not an abstract quiz: it is a result for one named/selected cat. Without a cat identity state, the next action is under-specified and the screen feels like a generic campaign landing page. This is a cross-section gap between the detailed flow in 04-design §3/§6 and the current Figma frame—not a reason to add a new top-level destination.

Minimum repair: represent cat identity as an interaction state owned by `S1-start`—for example, an inline start state or a compact overlay after `검사 시작`—and carry the chosen name into `S1a-resume`, S3-c, and T2. Keep it as a state/variant unless the project later explicitly approves a new screen name.

### Secondary cause: the route model is not visible in the editable structure

The current frame has only the default first-visit state. It does not show that S1 has at least three meaningful entry contexts:

| Entry context | Required S1 behavior |
| --- | --- |
| direct/T1/first visit | no close control; no saved-results CTA when `n=0` |
| shell-origin (`returnTo=T2/T3/T4`) | conditional `[×]` returns to the recorded caller |
| existing local state | `S1a-resume` can be invoked; saved-results CTA appears only for `n>0` |

An editable wireframe system should make these variants visible through named layers or annotated state frames. Otherwise, the prototype can look correct in one screenshot while remaining structurally unimplementable.

### Tertiary cause: hierarchy is present, but the continuation is not

The current frame gives the hero 260px, the start action 80px, and the guide 144px, leaving a large unused lower region. Whitespace is not the problem; the issue is that the whitespace does not support a clear next-state model. A strong S1 should make the sequence legible:

`why this exists → what the task costs → what observation is needed → start for one cat → resume or records only when applicable`.

This is a structural hierarchy recommendation, not a request for new colors, fonts, imagery, or decorative content.

### ~~Concrete layout defect: guide content width~~ — WITHDRAWN

~~The `inspection-guide` inner content width is 318px after padding, while its text nodes are 350px wide.~~

**Withdrawn (Claude, 2026-08-05).** The text nodes are 318px, not 350px, and sit exactly inside the 318px content box. There is no defect here and no fix is needed. See the correction under §1.

## 3. IA-compliant wireframe system principles

1. **Model zones before surfaces.** Use two explicit zones: `Z1 · linear flow` for S1/S2 and the direct/share-result S3 context, and `Z2 · app shell` for T2/T3/T4. Footer presence follows zone/context, not visual preference.
2. **Treat screens, states, overlays, and components differently.** The named frames are screens; `S1a-resume`, S3-a/b, S3-c/d, empty states, and tentative/shared banners are states or overlays; `nav-footer` is a reusable component. The layer tree should expose that distinction.
3. **Give every action an owner and destination.** Each CTA in the grey-box should be labeled with its exact destination or action in the layer name, such as `start-button → S2`, `saved-results-cta (n>0) → T2-records`, or `evidence-link → T4-about`.
4. **Use one dominant task per linear screen.** S1 starts one cat’s assessment; S2 answers one question; S3 delivers the next action. Do not turn S1/S2/S3 into browse surfaces or add shell navigation to their linear contexts.
5. **Make progress and reversibility explicit.** S2 needs a visible step count, a progress indicator, a back control, and answer-retention states. The user must not need to guess whether going back will erase an answer.
6. **Use progressive disclosure for result comprehension.** Prescription first, prohibition list next, narrative collapsed by default, evidence and secondary destinations after the immediate care action. This follows the project’s Aha-moment requirements rather than a generic content-feed pattern.
7. **Keep optionality subordinate.** Saved records, comparison, evidence, sharing, and card generation are secondary actions or destinations. They must not compete with the linear start/answer/result task.
8. **Design empty and exceptional states as first-class wireframe variants.** At minimum: interrupted progress, zero records, one-cat comparison, shared result, tentative result, localStorage loss notice, and same-type multi-cat comparison guidance.
9. **Make modal structure inspectable.** Each overlay/sheet should have a title, content region, action region, close/cancel route, and return target. WAI-ARIA APG recommends a visible close button in dialogs, focus entering the dialog, and focus returning to the invoking control or the logical next step. [WAI-ARIA APG: Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
10. **Preserve semantic relationships in the node system.** Each question group should have a clear heading/legend, each input should have a visible label, and the selected/current state should not depend on color alone. WAI advises labels for controls and grouping related controls; GOV.UK’s question pattern similarly requires a page heading, back link, and continue button. [WAI Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/), [WAI Labeling Controls](https://www.w3.org/WAI/tutorials/forms/labels/), [GOV.UK Question pages](https://design-system.service.gov.uk/patterns/question-pages/)
11. **Reserve interaction space, not just visual space.** Keep the project’s ≥48×48 hit-area requirement for footer items and S2 choices. This is more generous than WCAG 2.2’s 24×24 CSS-pixel minimum and is consistent with Android’s 48dp recommendation and Apple’s 44pt default control size. [WCAG 2.2 Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum), [Android accessibility views](https://developer.android.com/guide/topics/ui/accessibility/views/apps-views), [Apple HIG Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
12. **Protect focus and scroll space around persistent shell UI.** T2/T3/T4 must reserve bottom space for the footer and ensure focused controls are not hidden behind it. W3C explicitly identifies sticky footer obstruction as a failure risk. [WCAG 2.4.11 Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)

## 4. Screen-by-screen blueprint

The 05 prompt says “8 screens,” but its table lists nine screen frame names plus `nav-footer`. The blueprint below preserves every name in that table; no new top-level screen is added. The cat identity step is specified as an S1-owned state because the approved flow requires it but the prompt does not provide a separate frame name.

### `S1-start`

Zone: `Z1 · linear flow`; footer absent.

Required editable groups:

- `header · service name only`
  - default: service name only;
  - conditional: `[×]` when `returnTo` is `T2`, `T3`, or `T4`; close returns to the recorded caller.
- `hero`
  - `hero-headline`: exact approved “why this cat behaves this way” framing;
  - `hero-image-placeholder`: one grey-box image slot only.
- `start-action`
  - `start-button → S2` with `검사 시작`;
  - `start-summary` with `회원가입 없음 · 약 3분 · 16문항`.
- `inspection-guide`
  - `검사 안내`;
  - `· 최근 일주일 관찰 기준`;
  - `· 모르겠음 선택 가능`;
  - `· 결과는 이 기기에만 저장`.
- `saved-results-cta (n>0) → T2-records`
  - hidden in the direct first-visit/no-records state;
  - visible only when a saved-record count exists.
- `cat-identity-entry` state owned by S1
  - selected existing cat or a new cat name before the session is created;
  - must carry the identity into S1a, S3c, and T2;
  - do not add a separate top-level frame unless the team later approves one.

Recommended state variants to show in Figma: `default-direct`, `returnTo-shell`, `n>0-records`, and `cat-identity-entry`. These are variants of the same screen, not extra IA destinations.

### `S1a-resume`

Zone: `Z1`; modal/overlay, footer absent.

Structure:

- overlay title: `진행 중 — [개체 이름] · n/16`;
- primary action: `이어하기 → S2 n/16`;
- secondary action: `새로 시작 → S2 1/16`;
- one discard-confirmation state before replacing the existing progress;
- visible dismiss/cancel control if the overlay can be closed without choosing either route.

The overlay should visibly belong to S1 and should not look like a new shell destination. It needs a named return target so the user can exit the branch without losing the original context.

### `S2-question`

Zone: `Z1 · linear flow`; footer absent.

Structure:

- top row: `뒤로`, `n/16`, and an intentionally empty right slot;
- `progress-indicator` with current step represented as `aria-current="step"` in implementation;
- one question heading, framed around `최근 일주일 동안 …`;
- one grouped vertical choice set, with each choice represented as a full editable grey-box target;
- final separated choice: `모르겠음 / 관찰 못 함`;
- `모르겠음 n개 (허용 m개)` status line;
- bottom action: `다음`.

Show at least three component states in the wireframe system: unanswered, answered, and revisited-with-retained-answer. Do not depict auto-advance. GOV.UK’s official question-page pattern supports one question per page, a back link, a continue button, optional progress, and valid “I do not know” responses; these align with the project’s own requirements. [GOV.UK Question pages](https://design-system.service.gov.uk/patterns/question-pages/)

### `S3-result`

Zone/context variant:

- `C1` after completing the test: `Z1`, footer absent;
- `C3` shared-result entry: `Z1`, footer absent;
- `C2` opened from T2/T3: `Z2` drill-down, footer visible according to 04-design §2.3.

This is one frame name with context variants, not two different result destinations.

Structure order:

1. `S3-a tentative-result-banner` when the “모르겠음” threshold is exceeded;
2. `S3-b shared-result-banner` for a shared-link entry;
3. `result-hero` with type name, one-line summary, and one grey-box type-illustration slot;
4. `prescription-3-blocks` in this order: recommended play, recommended toy, interaction method;
5. `priority-one` inside the toy block: `이것부터 1종`;
6. `do-not-do-list` with `이 아이한테 하지 마세요`, written as non-blaming guidance;
7. `type-narrative` collapsed by default;
8. `evidence-block → T4-about`;
9. `compare-entry → T3-compare`;
10. bottom action group: `결과 저장 → S3c-save` and `공유·카드 → S3d-share`.

Do not add a top back button in the C1/C3 linear context. For C2, the return control must go back to the recorded caller. The S3 wireframe should make the prescription-first order obvious even in grey boxes; that order is a verified project requirement, not a visual-style choice.

### `S3c-save`

Zone: `Z1` action sheet; footer absent.

Structure:

- title: `이 고양이의 이름`;
- visibly labeled name input;
- device-only storage warning, including the browser-data-loss limitation;
- `저장 → T2-records`;
- close/cancel → S3.

The input must remain visibly labeled in the wireframe and implementation. WAI specifically recommends labels that identify the purpose of form controls and notes that visible labels are important on mobile. [WAI Labeling Controls](https://www.w3.org/WAI/tutorials/forms/labels/)

### `S3d-share`

Zone: `Z1` action sheet; footer absent.

Structure:

- `result-card-preview` grey-box placeholder;
- `이미지 저장` action;
- `링크 복사` action;
- optional `기기 공유` action when Web Share API is supported;
- no Kakao-share control because it is outside the approved scope;
- close → S3.

Keep this as an action sheet, not a fifth navigation destination.

### `T2-records`

Zone: `Z2 · app shell`; `nav-footer` attached.

Default structure:

- header: `내 기록`;
- repeated editable cat-record cards containing name, type, test date, previous-result comparison line, `결과 보기 → S3`, and `재검사 → S1`;
- one-line localStorage limitation notice;
- footer.

State variants:

- `T2-a · 0건`: `아직 저장된 결과가 없습니다` plus `검사 시작 → S1`;
- localStorage-cleared notice on the same empty-state structure;
- normal one-record and multi-record lists.

Do not add account/profile/settings pages; the project explicitly has no authentication/server scope.

### `T3-compare`

Zone: `Z2 · app shell`; `nav-footer` attached.

Default structure:

- header: `비교`;
- horizontally scrollable comparison columns/cards for two or more cats;
- each card: cat name, type, and the four-axis comparison content;
- card tap → the corresponding S3 C2 context;
- resource-separation recommendation block;
- same-type-two-cats recommendation variant;
- `한 마리 더 검사 → S1`.

State variant `T3-a · 0–1마리`: explain that comparison starts from two cats, show any available one-cat summary, and provide `한 마리 더 검사 → S1`. Never leave the state as an unannotated empty canvas.

### `T4-about`

Zone: `Z2 · app shell`; `nav-footer` attached.

Single-page structure:

- header: `알아보기`;
- evidence source block: Feline Five / PLOS ONE 2017;
- limitation block: exploratory research and not a validated measurement instrument;
- simplification block: four axes and 16 types are a fun simplification;
- observation guidance block: recent week and `모르겠음` availability;
- `검사 시작 → S1`;
- footer.

Do not add a new about sub-navigation or unapproved type directory.

### `nav-footer`

Reusable shell-only component with exactly four destinations:

`검사` · `내 기록` · `비교` · `알아보기`

Structural requirements:

- each tab has a minimum 48×48 hit area in the project specification;
- reserve bottom safe-area space and equivalent content padding;
- expose the current destination semantically (`aria-current="page"` in implementation);
- keep footer absent on S1/S2 and on the C1/C3 linear S3 context;
- if the C2 S3 drill-down variant retains the shell footer, show that as a separate context variant of `S3-result`, not as a new frame name.

Apple describes tab bars as navigation among top-level sections, not as action controls, and recommends labels and consistent availability. Material’s bottom-navigation guidance also treats bottom navigation as a destination mechanism and warns against using it for a single task. These principles support the project’s deliberate shell boundary, while the project’s explicit “first screen must not expose comparison” rule remains the higher product constraint. [Apple HIG: Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars), [Material bottom navigation](https://m2.material.io/components/bottom-navigation/)

## 5. Ranked minimum-scope revision plan

### P0 — repair S1’s state and layout model

1. Keep `S1-start` and its approved copy.
2. Add named, editable variants/layers for `default-direct`, conditional `returnTo` close, `saved-results-cta (n>0)`, and the S1-owned cat identity entry state.
3. Fix the `inspection-guide` inner text width/constraints.
4. Verify that the primary action remains visible without a first-scroll dependency.

This is the minimum revision that makes the current S1 IA-complete.

### P1 — establish the linear task template

5. Build `S1a-resume` with both resume/new-start branches and discard confirmation.
6. Build `S2-question` as one reusable question template with unanswered, answered, and retained-answer states.
7. Annotate every action’s destination and keep the footer absent.

### P2 — establish result comprehension and action sheets

8. Build `S3-result` with the approved prescription-first order and C1/C2/C3 context variants.
9. Build `S3c-save` and `S3d-share` as overlays with explicit close/return routes and visible labels for the input.
10. Add tentative/shared banner variants without creating new destinations.

### P3 — complete shell destinations

11. Build `nav-footer` once, then attach it only to T2/T3/T4 and the approved C2 result context.
12. Build `T2-records`, `T3-compare`, and `T4-about` with their required empty/one-record states and recovery CTAs.

### P4 — structural QA before visual styling

13. Walk every route in the IA table: direct entry, shell-origin return, interruption/resume, shared link, zero records, one-cat comparison, two-cat comparison, tentative result, save, share, and re-test.
14. Check that every overlay has an exit, every empty state has a recovery CTA, and no fixed footer hides focusable content.
15. Only after this passes should Srit apply the visual system in Figma. This report intentionally makes no color, type, imagery, icon, or linear-flow footer recommendation.

## 6. Verified requirements vs recommendations at a glance

| Item | Status | Evidence or rationale |
| --- | --- | --- |
| S1/S2 linear flow without footer | Verified requirement | 04-design §0–§2; 05 prompt table |
| Four shell destinations | Verified requirement | 04-design §0–§2 |
| S1 hero/start/guidance content | Verified requirement | 04-design §6 |
| S1 conditional close and saved-results CTA | Verified requirement | 04-design §2–§6 |
| Cat identity before session creation | Verified requirement in flow; missing from current S1 representation | 04-design §3 and S1-a note |
| S1-owned identity state rather than a new named screen | Recommendation to resolve prompt scope | 05 prompt has no identity frame name |
| S3 C1/C3 footer absent and C2 footer retained | Verified in 04-design; prompt table is inconsistent | 04-design §2.3 vs 05 prompt table |
| Prescription before narrative | Verified requirement | 03 §9/§11; 04-design §6 |
| One question per S2 screen with back/continue/progress | Verified requirement | 03 §7-2; 04-design §6 |
| Visible labels for S3-c input | Official accessibility recommendation | WAI Forms/Labels |
| Dialog close/return/focus behavior | Official accessibility recommendation | WAI-ARIA APG Dialog Pattern |
| ≥48×48 targets | Project requirement, supported by platform guidance | 04-design §8; Android and Apple guidance |
| Grey-box node naming and editable structure | Verified project method requirement | 05 prompt |

## Sources

### Project sources

- [04-design.md](./04-design.md) — approved IA, flow, states, and grey-box layout specification.
- [03-ux-research.md](./03-ux-research.md) — personas, journey pains, and derived requirements.
- [05-figma-wireframe-prompt.md](./prompts/05-figma-wireframe-prompt.md) — exact frame names, dimensions, and execution constraints.

### Official external guidance

- [Apple Human Interface Guidelines — Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars)
- [Material Design — Bottom navigation](https://m2.material.io/components/bottom-navigation/)
- [Material Design — Progress indicators](https://m2.material.io/components/progress-indicators)
- [GOV.UK Design System — Question pages](https://design-system.service.gov.uk/patterns/question-pages/)
- [W3C WAI — Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/)
- [W3C WAI — Labeling Controls](https://www.w3.org/WAI/tutorials/forms/labels/)
- [W3C WCAG 2.2 — Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)
- [W3C WCAG 2.2 — Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)
- [WAI-ARIA Authoring Practices — Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [Android Developers — Accessibility in views](https://developer.android.com/guide/topics/ui/accessibility/views/apps-views)
- [Apple Human Interface Guidelines — Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)

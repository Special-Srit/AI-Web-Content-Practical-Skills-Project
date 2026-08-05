Review one design document. READ ONLY — do not edit, create, move, or delete any file.
Do not run git commands. Report findings only.

## Under review

/Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/nyangbti/docs/04-design.md

It contains the IA (화면 구조도), 유저 플로우, and wireframe spec for 냥BTI, a cat
personality test web app.

## Evidence scope

- `nyangbti/docs/03-ux-research.md` — THE source of truth for features. §6 persona
  grading, §7-1 common needs, §7-2 feature candidates, **§7-3 explicitly out of
  scope**, §10 journey-derived features, §11 scenarios and §11-6 new requirements.
- `nyangbti/docs/04-ia-structure-research.md` — the IA research it was built from
  (already reviewed and corrected).
- `nyangbti/docs/02-market-research.md`
- `AGENTS.md`, `CLAUDE.md`, `.claude/agents/ux-ui-designer.md` at the repo root.

Judge only against these. Do not add UX opinions from your own knowledge unless the
document contradicts a cited source.

## PRIORITY 1 — Traceability and scope

1. **Does every screen and every page trace to a real feature candidate in 03?**
   §1 claims "근거 없는 페이지 0개". Verify that claim screen by screen. Any page that
   traces to nothing is scope creep.
2. **Has anything from 03 §7-3 (out of scope — server, auth, community, cross-device
   sync, long-term trend graphs, photo analysis, Kakao SDK) reappeared** as a screen,
   a button, or an implied capability? Check the wireframes too, not just the IA.
3. **Does it respect 03's persona grading?** Specifically feature 9's
   `secondary 전용 기능이므로 첫 화면 아님` and §6's `첫 화면에 노출 금지` for the
   다묘 (C) features. The whole 안 A structure exists to satisfy that constraint — verify
   it actually does, including in the wireframes and the footer-visibility table (§2-3).
4. Are any features from 03 §7-2 / §10 / §11-6 **silently dropped** — present in the
   research but absent from the design with no note? §6 of the design flags two
   deliberate simplifications; check whether there are others it did not flag.

## PRIORITY 2 — The reachability claim

§4 claims a reachability check was performed, lists 5 defects found and fixed, and
states "남은 미해결 — 없음". Independently verify:

- Every screen has at least one entry path.
- Every button named anywhere in the wireframes (§6) has a destination.
- No screen is a dead end.
- **The five stated fixes actually work.** In particular: does the S1 close (×)
  "only when entered from the shell" rule leave any path where a user reaches S1 from
  the shell and cannot get back? And does `history replace` on 16/16 → S3 actually
  prevent editing a completed test, including via the shared-link entry?
- Is there any reachability defect it missed? This is the highest-value finding if so —
  the instructor's own demo failed exactly here.

## PRIORITY 3 — Internal consistency

- §2-2 says S3 belongs to both zones with footer determined by entry context. Is that
  consistent with §2-3's table, §3's flows, and §6's wireframes, or do they disagree?
- Do the 6 empty/edge states in §5 each have exactly one exit, as claimed?
- Does §0-2 correctly state the Apple divergence — i.e. does it avoid claiming Apple's
  modal exception applies, and justify hiding the bar on Material's single-task rule?
- Are the flows F1–F7 mutually consistent, and does F7 genuinely fix the T4 isolation
  defect for a shared-link visitor who never enters the shell?

## PRIORITY 4 — Form and role compliance

- Korean 개조식 in the body, not 서술식.
- The three markdown bugs in the vault's convention: (a) closing `**` preceded by
  punctuation or a backtick then followed by a Korean particle; (b) literal `|` inside
  inline code in a table cell; (c) missing blank line above a table header row.
- The role file forbids: producing a wireframe as a flat image, making aesthetic or
  visual-design decisions, and writing app code. Verify none happened.
- Korean spelling/spacing errors.

## Settled — NOT defects, do not report

- 안 A (landing/quiz/result outside the tab shell) and the four tabs
  `검사 / 내 기록 / 비교 / 알아보기`. Both decided by Srit.
- `알아보기` existing at all, and `내 기록` as the tab-2 label.
- That the doc stops short of visual design and app code — that is required.
- The three pages in §9 being recommended but not added — that is the required behaviour.
- Korean-only, no English counterpart.
- iOS Safari being documented-but-unverified.

## Output

Numbered findings, most severe first. Each with line number, the defect, quoted evidence
from both the document and its source, and the minimal fix. State confidence. Label
preferences separately from defects. If a category is clean, one line saying so.

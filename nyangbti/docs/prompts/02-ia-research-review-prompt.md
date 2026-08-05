Review one research document. READ ONLY — do not edit, create, move, or delete any
file. Do not run git commands. Report findings only.

## Under review

/Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/nyangbti/docs/04-ia-structure-research.md

## Evidence scope

- /Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/nyangbti/docs/03-ux-research.md
  (especially sections 6, 7-1, 7-2, 7-3, 10, 11-6)
- /Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/nyangbti/docs/02-market-research.md
- /Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/AGENTS.md
- The external pages the document cites. Fetch them where you can.

## PRIORITY 1 — Source integrity

The document is dense with citations to Apple HIG, Material Design, Nielsen Norman
Group, W3C/WCAG, MDN, and WebKit. This is the highest-risk area. For each cited claim:

1. Does the cited page actually say what the document claims? Quote both.
2. Is any source **misattributed** — a claim credited to Apple that is actually
   Material's, or vice versa?
3. Its central attribution claim is that **"4-5 tabs" traces to Material's 3-5
   bottom-navigation convention and is NOT a universal Apple tab-bar rule.** Verify
   that specifically. It matters because the whole tension in the document rests on it.
4. Are any links dead, redirected, or pointing at a different version of the guidance
   (e.g. Material 2 vs Material 3, WCAG 2.1 vs 2.2)? The doc cites m1, m2, WCAG 2.1 and
   2.2 in different rows — check each is the right one for the claim.
5. Flag any claim with no source and no `[판단]`/`[추론]` marker.

## PRIORITY 2 — Fidelity to 03

- Does every proposed top-level destination trace to a real feature candidate in 03?
- Does it respect 03's persona **grading** (A 주 / B 보조 / C 2차) and specifically
  feature 9's "secondary 전용 기능이므로 첫 화면 아님"?
- **Has anything from 03 section 7-3 (explicitly out of scope — server, auth,
  community, sync, photo analysis, Kakao SDK) leaked back in as a destination?**
- Are its claims about competitor navigation in section 3 supported by
  02-market-research.md, or newly asserted? Unverified competitor nav must be
  labelled unverified.

## PRIORITY 3 — Reasoning quality

- The document concludes **no 5th tab is justified** while the instructor asked for
  4-5. Is that conclusion defensible from its own evidence, or is it dodging the
  requirement? Argue whichever way the evidence supports.
- Are 안 A / 안 B / 안 C internally consistent, and are their stated costs real?
- Does it present the 4th tab (알아보기) as an open recommendation rather than a
  settled decision? That is a hard requirement — the instructor's rule is that an
  extra page must be recommended to the user, not silently added.
- Is anything in section 7 (결정이 필요한 지점) a false choice, or missing an option?

## PRIORITY 4 — Form

- 개조식 register in the body (nominal endings, short fragments), not 서술식.
- Korean spelling/spacing errors.
- Under ~350 lines, no filler a second-year student would already know.

## Settled — NOT defects, do not report

- The instructor's 4-5 footer-nav requirement itself. It is a given, not a claim to
  evaluate.
- The no-backend / no-login / localStorage-only / plain-HTML-CSS-JS constraints.
- Korean-only, no English counterpart.
- That the document deliberately stops short of producing the IA itself.
- iOS Safari being documented-but-unverified. That is a recorded project constraint.

## Output

Numbered findings, most severe first. Each with: line number, the defect, quoted
evidence from both document and source, and the minimal fix. State confidence.
Separate real defects from preferences and label them as such. If a category is clean,
say so in one line rather than padding.

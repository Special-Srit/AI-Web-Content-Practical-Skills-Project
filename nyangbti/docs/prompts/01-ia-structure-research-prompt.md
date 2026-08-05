Research task. Write your findings to:
/Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/nyangbti/docs/04-ia-structure-research.md

Do NOT modify any other file. Do not run git commands. Do not write anything under
team-project/.

## Context — read these first

- /Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/nyangbti/docs/03-ux-research.md
  Sections 7-2, 7-3, 10 and 11-6 are the feature inventory the IA must consume.
  Sections 6 (persona grading) and 7-3 (out of scope) are what the IA must NOT exceed.
- /Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/nyangbti/docs/02-market-research.md
  Real competitors already researched (푸망, DBTI, PurrJung and others). Reuse it;
  do not re-research the market.
- /Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/AGENTS.md — project rules.

## The app

냥BTI: a cat personality test web app. A user answers <=16 observational questions
(1 per screen, ~3 minutes), gets a 4-axis/16-type result, and a 3-block prescription
(recommended play / recommended toy / interaction style) plus a "don't do this" list.

Hard constraints, not negotiable:
- plain HTML/CSS/JS. No React/Vue, no build step
- **no backend, no login, no accounts.** localStorage only
- mobile-first; the phone layout is primary
- everything in 03's section 7-3 is explicitly OUT of scope

## The instructor's requirement

**The footer navigation should carry 4-5 features.** That is the constraint to design
against.

## The actual research question

A one-shot 3-minute test does not naturally have 4-5 top-level destinations. The whole
app is close to a single linear flow. So:

1. **Is a persistent bottom tab bar even the right pattern here?** Find documented
   guidance on when a tab bar is appropriate versus when a linear/wizard flow with no
   persistent nav is correct. Cite Apple HIG, Material Design, and Nielsen Norman Group
   by name and link. If the sources disagree with the instructor's 4-5 requirement, say
   so plainly and give the strongest defensible way to satisfy it anyway — do not
   quietly pretend there is no tension.
2. **What is the documented guidance on tab-bar item count?** Minimum and maximum, and
   what each source actually says. Note where "4-5" comes from if it is a real
   convention.
3. **What do comparable Korean personality-test services actually put in their
   navigation?** Use 02-market-research.md as the starting list. If a claim about a
   competitor's nav cannot be verified, mark it unverified rather than asserting it.
4. **Which of the features in 03's sections 7-2 / 10 / 11-6 are genuinely top-level
   destinations, and which are in-flow steps or sub-sections?** This is the core of the
   answer. Note specifically that feature 9 (multi-cat comparison) is marked
   "secondary 전용 기능이므로 첫 화면 아님" — respect that grading.
5. **If reaching 4-5 tabs requires a destination that no persona in 03 justifies, say
   which one and why.** The instructor's own instruction is that an additional page
   should be *recommended to the user*, not silently added. So present any such page as
   an explicit recommendation with its justification and its cost, flagged as a
   decision for Srit — never as a settled part of the structure.
6. **Bottom-nav mechanics on mobile web**, with sources: safe-area insets, thumb reach,
   minimum target size, what happens with the iOS Safari URL bar, and how to keep the
   active state accessible.

## Output requirements

- Korean, 개조식 (bulleted nominal endings, not 서술식 full sentences) for the body.
  Section headings may be Korean or English.
- **Every external claim needs an inline source link.** Anything that is your own
  judgment must be marked `[판단]`. Anything inferred rather than stated by a source
  must be marked `[추론]`. This project's rule is that unsourced claims are the first
  thing a reviewer attacks.
- Do not produce the IA itself. This document is research that a later stage consumes.
  Deliver findings, patterns, guidance, and a recommended tab set with reasoning —
  not a finished 화면 구조도.
- End with a short section: "결정이 필요한 지점" — the specific choices only Srit can
  make, each with the options and the tradeoff.
- Keep it tight. Aim under 350 lines. Depth over breadth; skip anything generic that a
  second-year student already knows.

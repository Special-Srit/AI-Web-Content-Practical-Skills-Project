You are a fact-checking reviewer. Review two documents for factual accuracy and internal consistency. **Report findings only — do not edit any file.**

## Files under review

1. `nyangbti/docs/06-design-system.md` — written by Claude (Opus). Design-token and component spec for a mobile-first web app.
2. `nyangbti/docs/07-mobile-ui-libraries-research.md` — written by Codex (luna). Survey of mobile UI component libraries.

Neither has been reviewed. Treat both as equally suspect. Do not assume the Claude-authored one is more reliable.

## Context you need

- Project: `nyangbti/` — a cat personality quiz web app, mobile-first, built for a 10-day course.
- Course constraint: plain HTML/CSS/JS, no React/Vue. The team is considering React + shadcn/ui anyway, pending instructor approval. That tension is known and deliberate — do not report it as an error.
- `nyangbti/docs/04-design.md` §6 is the wireframe of record (9 screens). Read it as the source of truth for screen structure.

## What to check, in priority order

### 1. Numeric claims — verify against primary sources

Every measurement in both documents. Fetch the actual source, do not trust the document's own citation text.

Highest priority, because decisions rest on them:

- `06` §3 claims shadcn/ui sizes: Button `default` h-9=36px, `sm` h-8=32px, `lg` h-10=40px, `xs` h-6=24px, `icon` size-9, Input h-9=36px, Textarea min-h-16=64px, Tabs trigger h-9. Verify against the shadcn registry source.
- `06` §2 claims specific oklch token values and `--radius: 0.625rem`, plus a derived radius scale (sm 60% / md 80% / lg 100% / xl 140% / 2xl 180% / 3xl 220% / 4xl 260%). Verify.
- `06` §4 claims Input and Textarea use `text-base` while Button/Select/Tabs use `text-sm`. Verify.
- `06` §4 claims iOS Safari zooms on focus for inputs under 16px. Verify this is real and state the actual threshold and conditions.
- `06` §3 cites WCAG 2.2 SC 2.5.8 = 24×24 AA and WCAG 2.1 SC 2.5.5 = 44×44 AAA. Verify both the numbers and the conformance levels.
- `07` claims Vant default button = 44px, large 50, small 32, mini 24. Verify.
- `07` claims Material Web is in maintenance mode. Verify.
- `07` claims Framework7 `.tabbar-label` uses `white-space: nowrap` and `text-overflow: ellipsis`. Verify.
- `07` claims Ionic button text does not wrap without `ion-text-wrap`. Verify.
- `07`'s release versions and dates for Vant, Ionic, Konsta UI, Material Web, shadcn-vue. Verify.

### 2. Overclaims

Flag anything stated as fact that the cited source does not actually support, or that is hedged in the source but presented as settled in the document. Both authors are capable of this. Pay attention to:

- `06` §5 claims shadcn/ui has **no** bottom tab bar component at all. Is that accurate, or is it merely absent from the main docs list?
- `06` §1 claims Basecoat is "theme-compatible with shadcn" and that a migration would preserve tokens 1:1. Is that supported?
- `07`'s conclusion that no candidate satisfies all conditions. Is any candidate dismissed on a claim that does not hold?

### 3. Internal consistency

- Does `06` §5's component mapping match `04-design.md` §6's actual screens and regions? Any screen or region unmapped, or any mapping to a region that does not exist?
- Do `06` and `07` contradict each other anywhere?
- `06` §3 adopts "44px for buttons, 48×48 for bottom tabs". Is that consistently applied through the rest of the document?

### 4. Reasoning gaps

- `06` §2 argues `--destructive` red may conflict with a constraint in `03-ux-research.md` §11-6 that the prohibition list must avoid a scolding/guilt-inducing tone. Read §11-6 and judge whether that inference is sound or a stretch.
- `06` §5 recommends RadioGroup over Button for S2 answer options, and Collapsible over Accordion for the S3 narrative. Are those justified?

## Output format

Report to stdout. Do not create or modify files.

For each finding:

```
[SEVERITY] file §section — one-line claim
  Claim:    what the document asserts
  Reality:  what the source actually says, with URL
  Fix:      the specific correction
```

Severity: `WRONG` (factually false), `UNSUPPORTED` (may be true, citation does not establish it), `INCONSISTENT` (contradicts another project doc), `WEAK` (reasoning does not hold).

End with a one-paragraph verdict on whether `06`'s core recommendation — adopt shadcn tokens/components but override density to 44/48 and build the bottom nav custom — survives review.

If a claim checks out, do not list it. Only report problems. If you find nothing in a category, say so in one line.

## Constraints

- **Do not edit, create, or delete any file.**
- Do not run git commands.
- Do not touch `team-project/`.
- If you cannot verify something, say `UNVERIFIED` and state what you tried. Do not guess.

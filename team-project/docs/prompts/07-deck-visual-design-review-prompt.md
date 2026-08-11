You are a senior presentation/graphic designer doing a critical visual review.
**Report findings only — do not modify any file.** You have scoped network
access for this task specifically to verify design-principle claims (contrast
ratios, spacing conventions) — use it for that, not anything else.

## Under review

8 attached PNG images (`slide-01.png` through `slide-08.png`) — an approximate
render of `team-project/presentation/music-diary-presentation.pptx`, generated
by `team-project/presentation/render_preview.py` because this machine has no
PowerPoint/LibreOffice to render the real thing. The renderer reproduces
shape positions, fill colors, and text content/size accurately, but its text
wrapping and font kerning are a rough approximation, not pixel-perfect — judge
layout/spacing/color/hierarchy from these images, but don't nitpick exact
line-break points or minor font-rendering artifacts as if they were bugs in
the actual deck.

The generating script is `team-project/presentation/build_deck.py` — read it
to find the exact coordinates/sizes behind anything you flag, so your fixes
can cite real line numbers and inches, not just "move it up."

I (a different reviewer) already spotted three issues myself before asking you
to look — confirm or refute these, then find what I missed:

1. Slides 02, 03, 05, 07 (content/table slides) have a large dead whitespace
   gap between the table's bottom edge and the page-number footer — the table
   only occupies roughly the top third of the available content area.
2. Slide 06 (the demo placeholder/divider slide) has a large diamond shape
   whose vertical span overlaps both the title text box and the subtitle text
   box — in the render, the subtitle text is partially obscured by the diamond.
3. Slide 03's table has visibly imbalanced column widths — the middle column
   looks much wider than its content needs, leaving an odd gap before the
   third column starts.

## What to check, in priority order

### 1. Vertical balance / whitespace

For every slide where content doesn't fill the ~3.4" content area
(`CONTENT_Y = 1.68"` to `CONTENT_BOT = 5.08"` in `build_deck.py`), is the
emptiness read as intentional (minimalist, breathing room) or as
sparse/unfinished? Give a verdict per slide, not just in general.

### 2. Shape/text collisions and layering

Beyond the diamond issue on slide 06, check every decorative shape (the cover
slide's two diamonds, slide 06's diamond, slide 08's three photo-placeholder
circles) for any overlap with text that isn't clearly a designed effect.

### 3. Visual rhythm / consistency across the deck

Does the deck feel like "one system"? Specifically: the accent color
(terracotta) appears as a full-bleed background on 1 of 8 slides, small
diamonds on 1 slide, thin table headers/hairlines on 4 slides, and solid fill
boxes on 1 slide (the flow-steps). Is that a coherent rhythm, or does it read
as inconsistent density? Compare against real design-principle sources
(color-usage ratio guidelines, etc.) rather than just opinion.

### 4. Typographic hierarchy

Title/subtitle/body/table-text size relationships — do they read as a clear,
intentional scale, or arbitrary? Check `build_deck.py`'s actual point sizes
(`TITLE_Y` block uses 30pt, subtitles 14pt, table cells 11-11.5pt, etc.) against
real typographic-scale conventions.

### 5. Table layout specifically

For slides 02, 03, 05, 07 — are the column widths (defined in each `table(...)`
call's `widths=` argument) proportioned to their actual content, or arbitrary?
Give the specific corrected widths you'd use, in inches, summing to the
content width (9.00").

### 6. Anything else a senior designer would flag on first look

Don't limit yourself to the above — if something else reads as amateurish or
inconsistent (alignment, color contrast, spacing rhythm between title/subtitle/
content, the flow-steps slide's connector bars being nearly invisible, footer
page-number treatment, etc.), flag it.

## Output

Report to stdout, most severe first:

```
[SEVERITY] slide-NN — one-line issue
  What:   what's wrong, in plain design terms
  Where:  the exact build_deck.py location/variable (line number or slide section comment)
  Fix:    the specific corrected value(s) — real coordinates/sizes/colors, not vague advice
```

Severity: `BROKEN` (text illegible/overlapping — functional failure），`WEAK`
(reads as unfinished/amateurish to a design-literate viewer), `INCONSISTENT`
(breaks the deck's own visual system), `POLISH` (correct but could be better).

End with a prioritized punch list: if only 3 fixes get made before this ships,
which 3, in what order.

## Prohibited

- Do not modify, create, or delete any file
- No git commands
- Do not touch `team-project/src/`, `nyangbti/`, or any file other than reading
  for this review

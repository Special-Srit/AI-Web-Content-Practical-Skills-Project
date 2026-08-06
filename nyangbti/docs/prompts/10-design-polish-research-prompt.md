Use your gpt-5.6-luna model at high effort for thorough web research. This is research to gather real, sourced information — not an opinion piece. Every claim needs a real URL. Do not invent statistics, app names, or design-system details you haven't actually verified from a source.

## Why this research is needed
We generated 6 AI UI mockups for a mobile web app (냥BTI, a cat-personality quiz, warm-neutral "Stone" palette, calm/reassuring concept). The person who commissioned them said: "if this is just layout i am fine, but for design perspective, it is too simple and not look great." An independent critique (in progress separately) is diagnosing the specific images. This research task is broader and complementary: **what, concretely and with evidence, separates a "flat wireframe with color" from a genuinely polished, designed UI** — so the findings can directly inform CSS/Tailwind implementation decisions when this gets coded (stack is React + shadcn/ui + Tailwind CSS v4).

## Research questions — answer all, with real sources for each

1. **Elevation and depth systems.** How do respected design systems define elevation/shadow (not just "add box-shadow" — actual systems). Look at Material Design 3's elevation system, Apple's HIG on materials/depth, and how shadcn/ui itself (or Radix, which it's built on) handles shadow tokens if at all. Cite the actual doc pages.

2. **Surface/card hierarchy.** When should a card have a shadow vs. just a border vs. a flat tinted background vs. nothing? Find real design-system guidance (not just blog opinion) on when to differentiate primary content from secondary/list content visually, not just by text size.

3. **Icon treatment for warmth.** Generic thin 1px outline icon packs (Lucide, Feather, Heroicons outline variant) are what most AI-generated and template UIs default to. Research: what do design-mature products do instead when they want warmth rather than cold-minimal? Look at options like: filled/duotone icon styles, custom illustrated icon sets, icons with rounded stroke caps and warmer color (not pure gray), or replacing icons with small illustrations. Cite real product examples (e.g. Headspace, Calm, Notion, Linear, Cash App, or similar — verify these are actually known for this, don't just assert it) and if possible their actual icon library/approach.

4. **Color usage beyond grayscale text-on-white.** For a warm-neutral palette (background #ffffff, muted #f5f5f4, mid-tone #79716b, border #e7e5e4, dark #1c1917 — Stone-family, not pure gray), how do real products make the warmth show up in UI chrome itself (buttons, cards, backgrounds) rather than only in photography? Look for real examples of warm-neutral design systems in production (e.g. Airbnb, Notion's warm mode, Cash App, or similar — verify, don't assume) and what specifically they do (tinted card backgrounds, colored shadows, warm-toned dividers, etc.)

5. **Typographic hierarchy in mobile app UI.** What weight/size contrast ratios do real systems recommend between heading/body/caption (e.g. Material 3 type scale, Apple HIG type scale)? Cite the actual scale values.

6. **shadcn/ui + Tailwind v4 specific implementation.** What are shadcn/ui's actual built-in mechanisms (if any) for shadow/elevation tokens, and what Tailwind v4 utilities exist for warm-toned shadows (e.g. `shadow-*` with custom color) vs. the flat default? Check shadcn/ui's own documentation and component source for how their own showcase examples achieve visual richness — quote actual class names/tokens used.

7. **"Calm/reassuring" aesthetic specifically, not stark minimalism.** Find 2-3 real shipped products (apps or websites) that achieve a warm, calm, trustworthy feel WITHOUT looking flat/generic — analyze concretely what visual techniques they use (not just "they use soft colors" — be specific: do they use illustration, photography, gradient, texture, elevation, rounded generous spacing, etc.)

## Output format

For each of the 7 questions: findings with inline citations (real URLs). Do not pad with generic advice that isn't sourced.

End with a **concrete, implementation-ready punch list** — each item phrased as an actual Tailwind/CSS technique (e.g. "use `shadow-[0_2px_8px_-2px_rgb(28_25_23/0.08)]` for a warm-toned soft shadow instead of default gray shadow" or "swap Lucide outline icons for [specific alternative] to add warmth") that a coder could apply directly when building this in React + shadcn/ui + Tailwind.

If you cannot verify a claim with a real source, say so explicitly rather than presenting it as fact — this project has a strict no-unsourced-claims rule.

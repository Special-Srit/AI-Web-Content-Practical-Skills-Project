You are a fact-checking reviewer. Verify a research document. **Report findings only — do not create, edit, or delete any file.**

## Under review

`team-project/docs/11-component-patterns-research.md` — written today by a different model (Codex luna). It surveys eight mobile UI components that shadcn/ui does not provide, against Material 3, Apple HIG, published design systems, and shipped products.

**Section 1 has already been partially checked by Claude and corrected.** Two defects were found there:

- the cited Material Web URL 404'd (`navigation-tab-styles.css`; the real file is `_navigation-tab.scss`)
- three figures attributed to that file (80px container height, 24px icon, 64×32 indicator) are not in it, and are now marked 확인 못 함

**Assume the same classes of defect exist in sections 2–8, which nobody has checked.** Section 1's corrections are already applied — do not re-report them. Verify everything else.

## Context you need

- `team-project/docs/08-concept-tunebox.md` — the product, five tabs, data model
- `team-project/docs/09-implementation-spec.md` — architecture constraints
- `nyangbti/docs/06-design-system.md` §3 — the touch-target work this builds on

Fixed constraints the recommendations must respect:

- Mobile-first **web** app, React + Vite, static hosting. No native shell.
- Exactly **one persistent `<audio>` element**, outside the component tree (`09` §1). Anything requiring a second audio element or a Web Audio graph is out.
- Touch targets **≥44×44**, bottom tabs **≥48×48**, body text **≥16px**.
- **No gestures at all** — no swipe, no long-press, no drag-to-reorder.
- Five moods, fixed vocabulary. Korean labels; 라이브러리 is 5 characters where 홈 and 마이 are 2.
- Two people, roughly four working days.

## What to check, in priority order

### 1. Do the citations resolve, and do they say what is claimed?

For **every** URL in sections 2–8: fetch it. Report any that 404, redirect somewhere unrelated, or do not contain the claim attributed to them. This is the highest-value check — one such defect is already confirmed in section 1.

### 2. Are the numbers real?

Every pixel value, ratio and count. State whether each is (a) in the cited source, (b) true but sourced elsewhere — give the better citation, or (c) unverifiable.

Pay particular attention to any figure taken from an **experimental, deprecated, or maintenance-mode** source presented as though it were normative. Material Web's `labs/` directory is explicitly not production-recommended, and Material Web itself is in maintenance mode.

### 3. Is "documented specification" vs "observed product behaviour" honest?

The document claims to separate these. Check it actually does. Flag anywhere a shipped product's behaviour is described with a confidence that implies access to internal specs, or where a design *guideline* is presented as a measured value.

### 4. Do the recommendations follow from the evidence, and are they buildable here?

- Does any recommendation violate a fixed constraint above? The single-audio-element rule and the no-gestures rule are the likeliest to be broken — a mini-player or full-screen player pattern that assumes swipe-to-dismiss, or crossfade, would be a real conflict.
- Are the "저비용" versions actually cheap for two people in four days, or is that asserted without basis?
- Where Material and Apple genuinely disagree, is the disagreement reported accurately, and is the choice made for a stated reason rather than by default?

### 5. Section 5 specifically — generated cover art

This one has the least normative literature and the most room for invention. Check whether the approaches described are things products actually do, with evidence, or whether they are plausible-sounding fabrication.

## Output

Report to stdout, most severe first:

```
[SEVERITY] §section — one-line claim
  Claim:    what the document asserts
  Reality:  what the source actually says, with a working URL
  Fix:      the specific correction
```

Severity: `BROKEN-CITATION` (URL dead or unrelated), `WRONG` (factually false), `UNSUPPORTED` (may be true, citation does not establish it), `CONFLICT` (contradicts a fixed constraint above), `WEAK` (recommendation does not follow from the evidence).

End with one short paragraph: which of the eight sections are safe to build from as written, and which need work first.

Only report problems. If a section is clean, say so in one line. If you cannot verify something, mark it `UNVERIFIED` and say what you tried — never guess.

## Prohibited

- Do not modify, create, or delete any file.
- No git commands.
- Do not touch `team-project/src/` or `nyangbti/`.

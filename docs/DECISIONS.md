# Decisions log

Newest first. Records *why*, so choices aren't re-litigated later.

## 2026-08-03 — repo created

**Host account: `Special-Srit`, commits authored `srit`, pushed with devwriet's key.**
Two GitHub accounts exist: `Special-Srit` (holds most project repos) and
`devwriet` (used for team/school work, e.g. WeaAir). Only devwriet had working
push auth on this MacBook — one SSH key, authenticating as devwriet, and the
global git identity is devwriet's.

Rather than set up a second SSH key mid-sprint, the repo was created under
Special-Srit with **devwriet added as a collaborator**, so the existing key
pushes fine. Author identity is set per-path via `includeIf "gitdir:~/Projects/"`
→ `~/.gitconfig-srit`, so the commits credit Special-Srit's graph while the push
uses devwriet's key. Push permission and author identity are independent.

Rejected: creating under devwriet (would fragment the portfolio); adding a second
SSH key now (setup cost during a 10-day sprint with a hard deadline). If the
portfolio should consolidate differently later, GitHub repo transfer preserves
history and redirects the old URL — cheaper than getting it "right" now.

**Known trap:** the identity rule is keyed to the path, so a clone outside
`~/Projects/` commits as devwriet with no warning.

**Initial commit deliberately minimal** — README, `.gitignore`, empty
`docs/` `src/` `assets/`. The project topic isn't decided (08-03 was market
research only) and solo-vs-team is decided 08-04, so any app structure now would
be a guess.

**README references the class notes by path, not by link.** The vault repo is
private; URLs would dead-end for readers and leak its structure.

## 2026-08-03 — class-note workflow (context, not a repo change)

Recordings are named `<day>-<period>` (7 periods/day, ~40–50 min each) and
transcribed locally with whisper.cpp `large-v3-turbo` + Silero VAD.

**`-mc 0` is mandatory.** whisper.cpp defaults `--max-context` to unlimited and
feeds its own output back as decoding context; on the first recording that caused
one hallucinated line to repeat for 33 straight minutes (1445 identical segments,
7.4% unique lines). Proven to be context poisoning rather than bad audio by
transcribing minute 20 in isolation, where the same audio decoded cleanly. With
`-mc 0` the same file came out 95.2% unique.

Notes live in the private vault, not here — see that folder's `CLAUDE.md`.
Transcripts are working files and are never committed.

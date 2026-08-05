## Verdict

Do not treat either document as implementation-ready.

Document 04 has a useful product-scope conclusion, but contains one definite code bug, stale Spotify behavior, and several missing assumptions that could consume days. Document 05 is much stronger on dates and caveats, but its “global ranking” is not a ranking, and its Korean-market resolution contains a plain wording error.

The most serious omissions are audio-tag extraction, persistent-file identity, actual iOS codec support, Korean search behavior, and a two-person integration plan.

## 1. Cross-document conflicts

### Korean rankings

Every overlapping Korean MAU figure differs:

| Service | Doc 04: WiseApp Aug 2025 | Doc 05: WiseApp Jun 2026 | Doc 05: Mobile Index Jun 2026 | Doc 05: Mobile Index Sep 2025 | Doc 05: Sensor Tower Sep 2025 |
|---|---:|---:|---:|---:|---:|
| YouTube Music | 10.12m | 9.49m | 8.51m | 8.11m | 6.539m |
| Melon | 6.23m | 5.93m | 7.13m | 6.81m | 4.718m |
| Spotify | 4.24m | 6.22m | 2.38m | — | 2.061m |
| Genie Music | 2.57m | 2.37m | 2.88m | — | 1.957m |
| FLO | 1.76m | 1.68m | 1.93m | — | 1.516m |

These are not arithmetic mistakes; they are different dates and incompatible analytics models. The mistake is [document 04’s claim that its August-2025 series is “latest” and reveals the “actual Korean top three”](/Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/team-project/docs/04-streaming-ui-models.md:19). By August 2026, newer June-2026 data existed.

The defensible conclusion is only:

- YouTube Music is #1 in both June-2026 estimates.
- WiseApp says Spotify #2, Melon #3, Genie #4.
- Mobile Index says Melon #2, Genie #3, Spotify #4.
- There is no provider-independent “actual top three.”

The underlying article explicitly reports that disagreement: WiseApp estimates Spotify at 6.22m while Mobile Index estimates only 2.38m. [Korea Economic Daily](https://www.hankyung.com/article/202607280789i)

Trust document 05 for the current framing, but do not choose WiseApp or Mobile Index as “the truth.” Trust document 04 only as a dated August-2025 snapshot.

Document 05 also contains an internal error at [line 27](/Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/team-project/docs/05-streaming-facts-verified.md:27):

> “Melon remains #1 only under the older or lower-Spotify Mobile Index series”

That contradicts the immediately preceding statement that YouTube Music is #1. It should say: “Melon remains ahead of Spotify—and #2 overall—under Mobile Index.”

### Global rankings

Here document 04 is basically right, while document 05 answers a different question.

Document 04’s end-2025 MIDiA model gives one comparable methodology:

1. Spotify 31.4%
2. Tencent 13.8%
3. Apple Music 12.6%
4. YouTube Music 12.4%
5. Amazon Music 8.5%

Those figures and the 921.6m total are accurately reproduced from MIDiA’s model as reported by Music Business Worldwide. [Music Business Worldwide](https://www.musicbusinessworldwide.com/the-music-industry-is-closing-in-on-a-billion-global-subscribers-with-spotify-out-in-front/)

Document 05’s [“Global ranking” table](/Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/team-project/docs/05-streaming-facts-verified.md:29) is not a ranking. It mixes:

- Spotify MAU
- Spotify paid subscribers
- Tencent MAU and paying users
- YouTube Music + YouTube Premium subscribers including trials
- “Not disclosed” for Apple and Amazon

Those metrics cannot be ordered against one another.

The overlapping numbers do not genuinely conflict:

- Spotify: 290m paid / 751m MAU in document 04 for Q4 2025 versus 293m / 761m in document 05 for Q1 2026. Document 05 is simply newer.
- YouTube’s 125m+ combined figure is described consistently in both.
- Tencent’s 13.8% of 921.6m implies about 127.2m, close to its reported 127.4m paying users.

Use document 04 when presenting MIDiA’s estimated cross-service ranking. Use document 05 for current company-reported metrics. Do not claim that primary company figures independently verify Apple #3 or YouTube #4; they cannot.

## 2. Wrong, stale, or misleading claims

- [“The account returns to Free with advertising and shuffle playback”](/Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/team-project/docs/04-streaming-ui-models.md:50) and [“shuffle restrictions”](/Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/team-project/docs/04-streaming-ui-models.md:75) are stale as categorical descriptions. Spotify announced globally in September 2025 that Free listeners could search for and play a chosen track, although usage/account limitations can still vary. [Spotify’s Free update](https://newsroom.spotify.com/2025-09-15/free-experience-updates-features-tips/)

- Document 05 reaches the better conclusion about Spotify Free, but cites the wrong Spotify announcement at [lines 80 and 116](/Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/team-project/docs/05-streaming-facts-verified.md:80). The November “fewer repeats” shuffle article does not establish the September Pick & Play change.

- Both documents present YouTube Music Free’s on-demand playback and unlimited skips too generally. Google’s own help page warns that selected countries and regions may receive different product experiences. It should say “documented generally by Google; Korean account behavior not independently tested.” [YouTube Music Help](https://support.google.com/youtubemusic/answer/6313529?hl=en-GB)

- Document 04’s “current” price sections have no overall research cutoff. This affects Spotify lines 52–59, YouTube line 127, Melon lines 178–187, Apple lines 238–246, and Amazon lines 292–300. The overlapping prices currently agree with document 05, but every volatile price or promotion needs a checked date. Document 05 handles this much better.

- [“The underlying cause is catalog heterogeneity”](/Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/team-project/docs/04-streaming-ui-models.md:148) is unsupported causation. A heterogeneous catalog may explain inconsistent versions and metadata; it does not prove the cause of queue bugs or unclear gestures.

- Exact claims such as Spotify’s swipe directions, YouTube Music’s cross-device queue synchronization, and mobile tab arrangements are version/experiment/account dependent. They need an observation date and tested OS/app version. Document 04 sometimes admits the weak source, but then still lists the behavior as a stable feature.

- [“This file was moved or renamed”](/Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/team-project/docs/04-streaming-ui-models.md:570) is technically unknowable in the proposed input-only architecture. The page merely lost its in-memory `File`; it has no path or persistent handle. The honest error is: “This track is unavailable. Select the file again.”

- [“No server upload occurs”](/Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/team-project/docs/04-streaming-ui-models.md:540) is a promise about the eventual implementation, not a consequence of `createObjectURL`. It is defensible only if there is no upload code, analytics, or third-party runtime script capable of reading selected files. Verify it in the network panel.

## 3. Load-bearing technical audit

### Persistence

Document 04 is right about one thing: base64 audio in `localStorage` is a severe mistake.

However, “store metadata only, then ask the user to reselect” is the lowest-risk MVP, not the only available browser design.

- iOS Safari does not provide Chromium’s `showOpenFilePicker()` durable user-file handles.
- Safari’s similarly named File System API is the origin-private file system—private app storage, not continued access to the original Files-app item. [WebKit OPFS explanation](https://webkit.org/blog/12257/the-file-system-access-api-with-origin-private-file-system/)
- IndexedDB can store `File`/`Blob` values. The app can retrieve the copied audio after refresh and create a new object URL. [IndexedDB specification](https://www.w3.org/TR/IndexedDB/)
- IndexedDB and OPFS storage remain quota-limited, best-effort storage that can be cleared or evicted. [WebKit storage policy](https://webkit.org/blog/14403/updates-to-storage-policy/)

Recommendation for this deadline:

- Keep metadata-only/reselection for the required MVP because “state in localStorage” is an explicit constraint.
- Describe it as a deliberate deadline decision, not an iOS impossibility.
- Consider IndexedDB only as a narrow stretch goal if “library survives refresh” is important to the demonstration.

The metadata-only design also needs a re-link rule. `localStorage` playlist IDs are useless unless reselected files can be matched back to them. Use a best-effort identity such as `name + size + lastModified`, detect collisions, and visibly mark unmatched tracks. There is no real filesystem path.

### Playback path

`URL.createObjectURL(file)` plus one reused `<audio>` element is the correct path. It avoids base64 conversion and delegates decoding, seeking, buffering, and media controls to the browser. [MDN File API](https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications)

Missing rules:

- Reuse one audio element; change its `src` for tracks.
- Revoke each old object URL when it is no longer used.
- Never save a blob URL in `localStorage`; create a fresh URL from a restored Blob/File.
- Treat `audio.play()` as asynchronous. Do not display “playing” until its Promise resolves.
- Handle `NotAllowedError`, decode errors, interrupted playback, and non-finite duration.

### Definite scrubber bug

The code at [lines 373–377](/Users/codersrit/Projects/AI-Web-Content-Practical-Skills-Project/team-project/docs/04-streaming-ui-models.md:373) is wrong as written:

```js
audio.currentTime = audio.duration * value;
```

A range input defaults to 0–100. At value 50, this attempts to seek to 50 times the track duration, normally clamping to the end. [MDN range defaults](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/range)

The simplest design is `min=0`, `max=audio.duration`, `step=0.1`, followed by `audio.currentTime = Number(value)`.

### Autoplay, background play, and lock-screen controls

Document 04’s caution against promising Spotify parity is correct, but it is too vague to guide implementation.

- Initial audible playback should occur directly from a user action. Handle the Promise returned by `play()`.
- Reusing one `<audio>` element matters because WebKit treats playback permission per media element. [WebKit autoplay guidance](https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/)
- Current iOS Safari supports Media Session metadata and system Now Playing integration. Title, artist, artwork, play/pause, and possibly previous/next are achievable progressive enhancements—not native parity. [Safari 15 Media Session](https://webkit.org/blog/11989/new-webkit-features-in-safari-15/)
- Safari 17.5 specifically fixed background continuation into the next audio activity, which proves this area has had version-specific bugs. [Safari 17.5 notes](https://webkit.org/blog/15383/webkit-features-in-safari-17-5/)

Test separately on the actual iPhone:

- Safari tab versus Home-Screen web app
- Screen locked
- Switching apps
- Track ending and advancing to the next object URL
- Control Center/AirPods play-pause-next
- Interruption and resume

No hardware test was performed in this review, so uninterrupted multi-track background behavior remains unverified.

### Formats

This is a major omission. `accept="audio/*"` only influences the picker; it does not guarantee decoding.

Use this conservative product claim:

- Primary tested formats: MP3 and AAC in M4A/MP4
- Test WAV and FLAC on the target iPhone before advertising them
- WebM/Vorbis requires iOS 17.4+
- Ogg Opus/Vorbis requires iOS 18.4+
- DRM-protected downloads are unsupported
- Actual `loadedmetadata`/`error` results outrank MIME type or filename extension

WebKit documents the newer version gates for [WebM/Vorbis](https://webkit.org/blog/15063/webkit-features-in-safari-17-4/) and [Ogg Opus/Vorbis](https://webkit.org/blog/16574/webkit-features-in-safari-18-4/).

## 4. “Worth borrowing” versus “trap”

| Document 04 item | Verdict for 4–5 coding days |
|---|---|
| Persistent mini-player + one expansion | Keep. Use one library screen plus an expanded sheet/dialog; a separate Player navigation tab is redundant. |
| Simple queue | Narrow it. Keep current/next/remove/clear. Cut touch drag-and-drop and possibly the overlapping Play Next/Add to End menus. |
| Scrubber | Keep after fixing the formula and accessibility. |
| Empty state | Keep. It is cheap and visible in a presentation. |
| Home/Library/Player navigation | Mostly a trap. “Home” duplicates a tiny local library; playlists add CRUD complexity. Search + Library + player sheet is enough. |
| Metadata-only local-file handling | Keep as the deadline MVP, but document the persistence tradeoff and re-link behavior. |
| Explicit playback/error state | Essential. Keep. |

| “Trap” item | Verdict |
|---|---|
| Recommendation engine | Correctly rejected. “Recently played” is achievable; “more from artist” depends on having artist metadata. |
| Samples/AI DJ/Sound Search | Correctly rejected. |
| Jam/Connect/account sync | Correctly rejected. |
| Native-style background playback | Native parity is a trap; basic background audio plus feature-detected Media Session is achievable and worth testing. |
| Audio in `localStorage` | Correctly rejected. A copied Blob in IndexedDB is a different, achievable stretch feature. |
| Huge catalog interface | Correctly rejected. |
| Gestures | The document is still too generous. Remove swipe-down, long-press, and drag entirely for this deadline. Visible buttons are sufficient and easier to make accessible. |

## 5. What both documents missed

1. **The app does not automatically receive title, artist, album, or artwork.** A browser `File` gives basic file information—not ID3/MP4 music tags. Yet document 04 designs search, artwork, artist grouping, and queues as though those fields already exist. Automatic tag parsing across MP3, M4A, FLAC, Unicode Korean tags, and embedded artwork is its own feature. For the MVP, derive the title from the filename, use generic artwork, and make artist/title optional editable fields.

2. **Accessibility is underspecified.** The 44px target and visible buttons are good, but insufficient. Use semantic buttons, visible focus, accessible names, `aria-pressed` for repeat/favorite, a labelled range with readable time values, focus management for the player/queue sheet, non-drag reorder buttons if reordering survives, and announced errors/state changes. Respect reduced motion and iPhone safe-area insets. WCAG 2.2’s target-size requirement is only one part of this. [W3C target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

3. **Korean search needs a defined algorithm.** At minimum, normalize stored fields and queries to Unicode NFC, lowercase Latin text, split mixed queries into tokens, and match every token across title/artist/album/filename. 초성 search is feasible as a stretch by deriving compatibility initials from Hangul syllables. Romanization matching is not a reasonable deadline feature. Use `Intl.Collator('ko')` for sorting, not as a substitute for substring search.

4. **There is no two-person integration strategy.** Spend the first hour together defining `Track`, `QueueItem`, `PlayerState`, storage keys, and error states. Then split:

   - Person A: file selection, audio element, object-URL lifecycle, queue, formats, Media Session.
   - Person B: mobile UI, library/search, localStorage, empty/error states, accessibility.

   Integrate on the real iPhone daily. Do not split by “screens”; player state crosses every screen.

5. **The strongest AI-grading evidence is not being captured.** The presentation should show a small correction log: AI claim, evidence/test, correction, and design impact. The best examples already exist:

   - “Actual Korean top three” was false because analytics providers disagree.
   - The generated scrubber formula was mathematically wrong.
   - “Reselect after refresh” was a scope choice, not the only browser capability.
   - The research assumed music metadata that the File API does not supply.

6. **State and security details are absent.** Namespace storage keys because GitHub Pages project sites under the same `*.github.io` origin share origin-scoped storage. Never render filenames or parsed tags with `innerHTML`; user-supplied metadata is untrusted. Add storage schema versioning, malformed-state recovery, duplicate detection, and a clear-library action.

7. **“Local-first” does not automatically mean the app shell works offline.** Reopening the GitHub Pages site still needs network unless a service worker caches it. Do not promise full offline operation unless that is implemented and tested.

The central product framing at document 04’s end is good. The implementation specification beneath it is not yet safe enough to start coding without resolving the scrubber, metadata, identity, format, and iPhone-background questions first.

Codex session ID: 019fcd5b-cbb7-77d0-bc41-6e88c1e8e430
Resume in Codex: codex resume 019fcd5b-cbb7-77d0-bc41-6e88c1e8e430

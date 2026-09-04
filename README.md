# Teacher's Day — teachers_day.c (animated redesign)

A premium, editor-styled Teacher's Day tribute: a simulated code run in a
custom "IDE" theme that breaks into elegant serif "reveal" moments for the
emotional beats — the message, the ASCII portrait, and the final photo.

## What's animated
- Editor window settles into place with a subtle 3D tilt on load
- Ambient drifting gold/teal sparkles + slow-moving background glow + fine grain texture
- Each code line types in with a live blinking caret
- Progress bars have a traveling light sheen; badges pop in
- Reveal cards (headline, quote, photo) fade up in glass panels with animated gold corner brackets
- "Happy Teacher's Day" wipes in and gets a slow gold shimmer sweep
- The photo sits inside a spinning conic-gradient glow ring, tilts toward your cursor (desktop), and a confetti burst fires on reveal
- Replay button has a light-sweep hover
- Respects `prefers-reduced-motion` — all decorative motion is disabled and content shows fully in place for anyone who needs that

## Deploy on Vercel
This is a static site — no build step needed.
1. Upload this folder to a GitHub repository.
2. Import the repo on Vercel.
3. Framework Preset: **Other**, Build Command: empty, Output Directory: empty/root.
4. Deploy.

## Files
- `index.html` — page structure
- `style.css` — editor chrome, syntax colors, reveal-card styling, animations, fonts
- `script.js` — typing sequence, progress bars, reveal moments, sparkles, tilt, confetti
- `assets/teacher.jpg` — supplied portrait photo

## Customizing
- Teacher's name: search "Sakib Sir" in `script.js` and `index.html`.
- Student credit: search "Shivam Kumar Yadav" in `script.js` and `index.html`.
- Message text: the `message` string in the middle of `script.js`.
- Colors: CSS variables at the top of `style.css` (`--gold`, `--teal`, `--violet`, `--rose`).
- Sparkle count / confetti count: `initSparkles(count)` and `confettiBurst(el, count)` calls at the bottom of `script.js`.

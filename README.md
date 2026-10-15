# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## /trader/event: The Wealth Blueprint (Oct 18, 2026)

`/trader` already existed, so the event page lives at **/trader/event**.

| What | Where |
| --- | --- |
| Page, styles, SVG art | `src/pages/trader-event/` |
| Registration form | GoHighLevel form "Wealth Blueprint Oct 18 RSVP" (id `mIfNY0bFBpmB3Nxty2l3`), embedded by `GhlForm.jsx` |
| Standalone HTML entry (SEO, OG, JSON-LD) | `trader-event.html`, `src/trader-event-main.jsx` |
| Build-time prerender (fast first paint) | `scripts/prerender-trader-event.mjs` (runs in `npm run build`) |
| Portrait pipeline | `scripts/build-trader-event-images.mjs` → `public/trader/` |

### The form
- Submissions go straight into GHL. Fields, the thank-you message and the field styling (Custom CSS) are edited in the GHL form builder, not in this repo.
- The tag and the confirmation email with the venue address come from a GHL workflow triggered by **Form Submitted** on this form.
- There is no seat cap. Watch the submission count in GHL.
- **After submit:** set the GHL form to *On submit > Redirect to URL* `https://www.personaforce.co/trader/event/thank-you`. That page shows the reserved message, Add to Calendar (Google + .ics) and a copy/share link to `/trader/event` (`TraderEventThankYou.jsx`, noindex).
- The mobile sticky "Reserve My Seat" button scrolls to the form and hides while the form is on screen.

### Art: recreated vs. still needed
- **Recreated in SVG/CSS:** mountain ridgelines with rim light, the glowing trail, sun flare, candlesticks, grid, haze, vignette, metallic gold type, light streak, brushed gold header and button, the urgency card's dusk mountains.
- **Icons:** `lucide-react` (ISC license).
- **OG image:** `public/trader/og-wealth-blueprint.jpg`, generated from the hero. Regenerate it if the portraits change.
- **Worth licensing/shooting:** a real mountain-at-dusk photo for the urgency card, and a dedicated OG design if wanted.

### Not matched from the mockup
- **Dr. Travis Fox portrait.** Uses the full original photo, so the orange signature on his chest shows (approved; it fades behind the title). For a cleaner look, supply a signature-free photo, drop it in `assets/trader-event/`, update the `travis` entry in the script, and run `npm run build:trader-event-images` (then regenerate the OG image).
- **Form fields** render inside GHL's iframe, so their look depends on the GHL Custom CSS.
- **Time zone** is not confirmed, so the JSON-LD has no UTC offset (TODO in `trader-event.html`).
- **Copy:** "SURRISE" fixed to "SURPRISE"; all em dashes removed.

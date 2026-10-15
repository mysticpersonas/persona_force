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
| Page, styles, SVG art, form | `src/pages/trader-event/` |
| Shared event facts and validation (used by page and API) | `eventConfig.js`, `validation.js` |
| RSVP API | `api/trader-rsvp.js` |
| Standalone HTML entry (SEO, OG, JSON-LD) | `trader-event.html`, `src/trader-event-main.jsx` |
| Build-time prerender (fast first paint) | `scripts/prerender-trader-event.mjs` (runs in `npm run build`) |
| Portrait pipeline | `scripts/build-trader-event-images.mjs` → `public/trader/` |

Local dev: `npm run dev` renders the page, but `/api` only runs under `vercel dev`.

### a) Backend connections to set up before launch

1. **Upstash Redis (formerly Vercel KV).** Vercel → Storage → Marketplace → Upstash for Redis → connect to this project. That injects `KV_REST_API_URL` and `KV_REST_API_TOKEN`. Seats are counted under key `wealth-blueprint-2026-10-18`; guests are stored in hash `wealth-blueprint-2026-10-18:guests` (email → `confirmed` | `waitlist`). The same email registering twice does not take a second seat.
2. **GoHighLevel inbound webhook.** Create a workflow with trigger **Inbound Webhook**, copy its URL into `GHL_RSVP_WEBHOOK_URL`. Map fields: `first_name`, `last_name`, `email`, `phone` (E.164), `rsvp_status`, `appeal`, `appeal_other`, `bring_guest`, `sms_consent`, `sms_consent_text`, `sms_consent_at`, `sms_consent_ip`, `utm_source/medium/campaign`, `page_url`. Tags arrive as `tags` (array) and `tags_csv`: always `wealth-blueprint-oct18`, plus `confirmed` or `waitlist`, plus `sms-consent` when checked. Add workflow actions: Create/Update Contact, Add Tags, then branch on `rsvp_status`.
3. **Confirmation email (and SMS only for `sms-consent`)** from that workflow, containing the **venue address**. The page never shows the address. The page tells guests to check their email, so this must be live before the link goes out. Note that `resubmission: true` means the guest submitted again; skip a second confirmation if you like.
4. **Privacy and Terms.** The SMS checkbox links to `/privacy` and `/terms`. Confirm both cover SMS (message frequency, STOP/HELP, "Msg & data rates may apply", carrier liability). The line "Your information is kept private and used only for event details." is marked TODO: keep it only if it is true under the policy.
5. **SMS compliance.** The box is optional and unchecked by default. Consent wording, timestamp and IP are sent to GHL as evidence. Only text people tagged `sms-consent`, and make sure your GHL number/A2P 10DLC campaign is registered for event reminders.
6. Env vars are listed in `.env.example`. Without them the API returns 503 and the form shows a retry message (it never fakes success).

### b) Art: recreated vs. still needed

- **Recreated in SVG/CSS (no image files):** mountain ridgelines with gold rim light, the glowing trail, sun flare, candlestick motifs, teal grid, golden haze/bokeh, vignette, metallic gold type, light streak, brushed gold header and button, the urgency card's dusk mountains.
- **Icons:** `lucide-react` (ISC license, already a dependency).
- **OG image:** `public/trader/og-wealth-blueprint.jpg`, generated from the live hero. **Regenerate it after the Travis photo is replaced.**
- **Still worth licensing/shooting:** a real mountain-at-dusk photo texture for the urgency card (the SVG is a stand-in) and a dedicated designed OG image if you want one beyond the hero crop.

### c) Not matched from the mockup, and why

- **Dr. Travis Fox portrait (launch blocker).** The orange signature in `dr_travis_fox_original.jpg` crosses his collar right under his chin, so no rectangular crop can include his full chin and shoulders without it. The current file is an interim, alpha-shaped crop of only the clean region (no pixels altered, build fails if any signature pixel survives). It shows head and part of the chin, no shoulders. He is also shot much closer than Nicole and Michelle. **Supply a clean, signature-free (ideally background-removed) head-and-shoulders photo**, drop it in `assets/trader-event/`, update `file` and landmarks for `travis` in the script (set `signatureSafeCrop: false`), and run `npm run build:trader-event-images`.
- **README_FOR_CLAUDE.md** was not in the repo; copy came from the brief.
- **Time zone** is not confirmed, so calendar files use floating local time and the JSON-LD has no UTC offset (TODO in `trader-event.html`).
- **Nicole's black background** is blended with an oval mask, so the outer ends of her hair fade earlier than in the mockup.
- **Copy:** "SURRISE" fixed to "SURPRISE". All em dashes were removed: the urgency card reads "...more than a presentation. It's an immersive experience...", and the waitlist line reads "You're on the waitlist. We'll contact you if a seat opens."

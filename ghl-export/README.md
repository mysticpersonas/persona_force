# The Trader's Journey: GHL migration pack

Every Trader's Journey page on personaforce.co, exported as one self-contained
snippet per page for a GoHighLevel **Custom HTML/Javascript** element.

Nothing in the PersonaForce site was changed to make these. The snippets are
rendered from the live React pages, so copy, layout, colours and breakpoints
match what is live today.

## The pages (18)

| # | Paste this file | Create GHL page at | Was on personaforce.co | SEO title | noindex | Includes |
|---|---|---|---|---|---|---|
| 1 | `pages/01-trader.html` | `/trader` | `/trader` | The Trader's Journey · Private 5-Day Identity Pilot | no | Pilot registration form `HYyfRIKByhEmFky3sdjl`, mobile sticky CTA, menu |
| 2 | `pages/02-trader-thank-you.html` | `/trader-thank-you` | `/trader/thank-you` | You're In · The Trader's Journey | yes | |
| 3 | `pages/03-trader-challenge.html` | `/trader-challenge` | `/trader/trader-challenge` | The Trader's Journey · 5-Day Challenge | yes | Forwards `#day1`…`#day5` to the day pages (email links) |
| 4 | `pages/04-trader-day1.html` | `/trader-day1` | `/trader/day1` | Day 1 of 5, Who Is the Trader? | yes | Wistia `7if2mpulvx`, form `9qDK09IYldsKXHgSkrsu` |
| 5 | `pages/05-trader-day2.html` | `/trader-day2` | `/trader/day2` | Day 2 of 5, The Invisible Trade | yes | Wistia `0eywl46sxr`, form `uCuzvgBeZUR6zHclbKqM` |
| 6 | `pages/06-trader-day3.html` | `/trader-day3` | `/trader/day3` | (see file header) | yes | Wistia `oopr3asnnu`, form `CvAwq56X1Ypk6S3XQWrI` |
| 7 | `pages/07-trader-day4.html` | `/trader-day4` | `/trader/day4` | (see file header) | yes | Wistia `hsiaiayi8m`, form `rnQSR176dCERTCj5vVze` |
| 8 | `pages/08-trader-day5.html` | `/trader-day5` | `/trader/day5` | (see file header) | yes | Wistia `mebphpeds3`, form `qyFcFF2IWGa8slB3OOvT` |
| 9 | `pages/09-trader-intake.html` | `/trader-intake` | `/trader/trader-intake` | Map Intake · The Trader's Journey | yes | Form `cDjsEv0yfkBmMHqvXX8E` |
| 10 | `pages/10-trader-intake-thank-you.html` | `/trader-intake-thank-you` | `/trader/intake-thank-you` | Thank You · PersonaForce Trader™ | yes | |
| 11 | `pages/11-trader-orientation-replay.html` | `/trader-orientation-replay` | `/trader/orientation-replay` | Orientation Replay · PersonaForce Trader™ | yes | Loom video |
| 12 | `pages/12-trader-blueprint.html` | `/trader-blueprint` | `/trader/blueprint` | Free Trader Blueprint · The Trader's Journey | yes | Form `MOrE94PHZZ8RrjrbpRGV` |
| 13 | `pages/13-trader-blueprint-thank-you.html` | `/trader-blueprint-thank-you` | `/trader/blueprintthankyou` | Thank You · The Trader's Journey | yes | |
| 14 | `pages/14-trader-pft-30day.html` | `/trader-pft-30day` | `/trader/pft-30day` | 30-Day Mapping · PersonaForce Trader™ | yes | Payment link, book-a-call link |
| 15 | `pages/15-trader-pft-60day.html` | `/trader-pft-60day` | `/trader/pft-60day` | 60-Day Mapping · PersonaForce Trader™ | yes | Payment link, book-a-call link |
| 16 | `pages/16-trader-pft-90day.html` | `/trader-pft-90day` | `/trader/pft-90day` | 90-Day Deep Identity Mapping · PersonaForce Trader™ | yes | Payment link, book-a-call link |
| 17 | `pages/17-opt-in.html` | `/opt-in` | `/opt-in` | Opt-In · PersonaForce Trader™ | yes | Form `CBQMFffcN1pXFxRAK0Dy` |
| 18 | `pages/18-opt-in-thank-you.html` | `/opt-in-thank-you` | `/opt-in-thank-you` | You're In · PersonaForce Trader™ | yes | |

Each file's first lines repeat its path, SEO title and noindex setting.

## Setting up one page in GHL

1. **Sites → Websites (or Funnels) → your Trader's Journey site → Add new page.**
   Use the path from the table (e.g. `trader-day1`). Keep all 18 pages on the
   **same domain**: links between them are written as `/trader-day1` etc.
2. Open the page in the builder. Add a **Section → set it to Full width**, add
   one **Custom HTML/Javascript** element, and paste the whole file.
   The snippet removes GHL's section/row/column padding around itself, so it
   runs edge to edge even if you forget to zero the spacing.
3. Delete any other default elements on the page (header/footer blocks).
4. **Page settings → SEO:** set the title from the table, and tick noindex
   where the table says yes.
5. Save and **Preview / open the live URL**. The GHL editor canvas does not run
   custom code the way the live page does, so judge the result on the live page.

## What each snippet contains

- Fonts (Inter Tight + Instrument Serif, the fonts the live pages use).
- Its CSS, scoped under `#tj-root` so GHL's styles and these can't affect each other.
- The page markup, with both logos embedded (no image hosting needed).
- A small script for the interactive parts: scroll reveals, the mobile menu,
  scroll-to-form buttons, the mobile sticky CTA, the particle background and the
  footer year. Content stays visible even if that script is blocked.
- GHL form embed script and/or Wistia player scripts where the page needs them.

## Things to know

- **Same GHL forms.** The pages embed the exact GHL forms they use today (IDs in
  the table), so submissions, tags and workflows keep working unchanged.
- **Nav links on `/trader`** (For CEOs, Lawyers, Free Blueprints…) and the
  "book a call" links point to personaforce.co, because those pages are not moving.
- **Email links already sent** (`personaforce.co/trader/...`) will break when the
  pages are removed from personaforce.co unless that site redirects them. When
  stripping the pages from PF, add these redirects (Vercel `redirects`), with
  `TJ` = the new GHL domain:

  | Old (personaforce.co) | New |
  |---|---|
  | `/trader` | `TJ/trader` |
  | `/trader/thank-you` | `TJ/trader-thank-you` |
  | `/trader/trader-challenge` | `TJ/trader-challenge` (the `#dayN` part is carried over by the browser) |
  | `/trader/day1` … `/trader/day5` | `TJ/trader-day1` … `TJ/trader-day5` |
  | `/trader/trader-intake` | `TJ/trader-intake` |
  | `/trader/intake-thank-you` | `TJ/trader-intake-thank-you` |
  | `/trader/orientation-replay` | `TJ/trader-orientation-replay` |
  | `/trader/blueprint` | `TJ/trader-blueprint` |
  | `/trader/blueprintthankyou` | `TJ/trader-blueprint-thank-you` |
  | `/trader/pft-30day`, `-60day`, `-90day` | `TJ/trader-pft-30day`, `-60day`, `-90day` |
  | `/opt-in` | `TJ/opt-in` |
  | `/opt-in-thank-you` | `TJ/opt-in-thank-you` |

  Also update any GHL form "redirect after submit" URLs and email templates
  that point at the old personaforce.co paths.
- **Fonts:** the code mentions Orbitron/Raleway for these pages, but they never
  actually loaded on personaforce.co (a broken `<link>` in `index.html`), so the
  live pages render in Inter Tight. The snippets match what is live.

## Changing a page later

The snippets are generated, so the clean way to change copy or layout is to edit
the React page in `src/pages/` and re-run:

```
node ghl-export/tools/build.mjs
```

To change a GHL path, edit `slug` in `ghl-export/tools/pages.config.mjs` and
re-run: every link between pages updates with it.

Small copy fixes can also be made directly in GHL with find-and-replace inside
the pasted code.

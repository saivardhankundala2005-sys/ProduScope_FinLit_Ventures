# SIP Pause Co-pilot: build specification

Paste this whole file into Antigravity as the task, and also save it in the repo root as `SPEC.md`. Every agent works from it.

## 1. What we are building

A clickable web prototype for a product case competition (FinLit Ventures, ProduScope 2026). It shows an independent "check" that appears when an investor in India taps Pause, Reduce or Cancel on a mutual fund SIP. The check shows what the change costs the user's own goal, then lets them decide. It never recommends anything.

Core idea the prototype must make visible: pausing a SIP is the only financial action that shows no price. The platform holding the money is not trusted to show it. This product is a third party that earns nothing whichever button the user presses.

The prototype must prove three things in a 75-second demo:

1. The cost of a pause becomes visible (the receipt and the replay).
2. The product is neutral (a slider changes which option leads; Skip and Stop are always one tap away).
3. People with a real cash need are not slowed down (the fast path).

Output: a deployable static web app (Vite + React + TypeScript) that runs fully offline with no live API calls.

## 2. Non-negotiables

- No live network calls at runtime. All market data is precomputed JSON bundled with the app.
- Every number on screen comes from `engine/` or from the precomputed data. No hardcoded demo figures in components.
- No recommendation anywhere. No option is pre-selected, badged "recommended", or visually heavier than the others.
- No red/green coding on options or outcomes. Colour must not signal good or bad.
- No emoji, no gradients, no illustrations of people, no stock icons sets with a cartoon feel. Plain line icons only, used sparingly.
- Copy rules in section 5 are enforced by an automated test.
- The engine is covered by unit tests, and the acceptance numbers in section 7 must pass.

## 3. Phase 0: inspect the data before writing any code

Datasets are in `data/raw/`. Do this first:

1. Open every file. Write `DATA_REPORT.md` with, per file: schema, date format, min and max date, row count, missing days, duplicate dates, fund names or scheme codes present, and whether NAV is for direct or regular plan and growth or IDCW. Do not assume. If a file does not contain what is needed, say so plainly.
2. Choose 2 to 3 funds: one mid-cap (preferred demo fund), one flexi-cap or large-cap, one Nifty 50 index fund. Direct plan, growth option only. State why each was chosen.
3. Check coverage of February to June 2020 for each chosen fund. State whether the data also covers any later correction (for example 2024 to 2026). If it does not, the prototype uses the 2020 episode only and says so on screen.
4. Write `scripts/build-data.ts` that cleans the data and outputs compact JSON into `public/data/` (month-start NAV series per fund, daily NAV series per fund, index closes if provided). It must be rerunnable.
5. Compute candidate "as of" dates where the demo fund sits 10 to 16 percent below its trailing 12-month peak. List them in `DATA_REPORT.md`. The prototype opens on the one closest to 14 percent. This date is configurable in the Judge panel.

If something blocks progress (missing data, unreadable format), write the problem and your fallback in `DATA_REPORT.md` and continue with the fallback. Any fallback series must be labelled "Illustrative data" on screen.

## 4. Design direction

Do a short design plan first (tokens, one ASCII wireframe per screen, then critique it against section 2 and revise before building). Do not default to a template look. Specifically avoid: cream background with serif and terracotta accent, near-black with neon accent, identical rounded cards with soft grey shadows, all-caps tracked eyebrow labels, numbered 01/02/03 markers on non-sequences, a spaced em dash in labels, arrows appended to buttons, fade-and-slide entrance on every element.

Intent: a calm, credible financial instrument, closer to a well-set statement or a receipt than to a startup landing page. Structure carries information: borders, rules and spacing group things; nothing is decorative.

**Tokens** (CSS variables, no utility-framework default palette)

| Token | Value | Use |
| --- | --- | --- |
| paper | #FFFFFF | surfaces |
| mist | #F2F4F6 | sunken areas, desktop backdrop tint |
| rule | #D3D9DF | borders, dividers |
| ink | #16202A | text, co-pilot header band |
| slate | #52606D | secondary text |
| signal | #1F5FA8 | host app accent, links, focus ring |
| opt-continue | #1F5FA8 | Continue option |
| opt-reduce | #A8741A | Reduce option |
| opt-pause | #2E7D77 | Pause option |

Option hues are for identification only (card edge, chart line key), never for judgment. Distinguish chart lines by stroke style too (solid vs dashed), not colour alone.

**Type:** IBM Plex Sans (400, 500, 600) installed locally via `@fontsource/ibm-plex-sans` so it works offline. Verify the rupee sign renders; if not, fall back to Noto Sans for numerals. Use tabular figures for every amount. Sentence case everywhere. Body 15 to 16px, line length under 70 characters. One family only.

**Shape:** radius 4px on controls, 10px on the top corners of the sheet. No shadows except the sheet over its scrim. Borders do the work.

**Motion:** only in response to a tap or drag (sheet opens, chart draws on scrub, card marker moves). Respect `prefers-reduced-motion`. No idle animation.

**Layout:** on desktop, a centred 390 by 844 phone frame on a mist backdrop with a small, quiet "Judge panel" toggle beside it. Below 500px wide, drop the frame and fill the screen. Keyboard focus visible on every control. Minimum tap target 44px.

**The one memorable element:** the Pause receipt (section 6, screen C4). Make it look like a printed receipt: a bordered ticket with a perforated top edge, dotted leaders between labels and amounts, a total row. Keep everything else quiet.

## 5. Copy rules (tested automatically)

- Plain verbs, sentence case, active voice. A button says exactly what happens.
- Banned in any user-facing string: should, recommend, best, optimal, ideal, smart, AI, unlock, insights, journey, seamless, empower, personalised, nudge, stay invested, don't miss, mistake, regret, panic, guilt, exclamation marks, emoji.
- Never congratulate or praise a choice. Never express disappointment.
- Every projection carries its basis: "Based on your inputs and an assumed return of 8% a year (range 6% to 10%)."
- Replay caption, always: "This is what happened in one past period. It is not a forecast."
- Use Indian number grouping (₹1,20,000) via `Intl.NumberFormat("en-IN")`, and "₹6 lakh" for round goal amounts.
- Create `src/copy.ts` holding all user-facing strings. Write `copy.test.ts` that fails if any string contains a banned word (case-insensitive, whole word).
- Code style: descriptive names, no comments that restate the code, no lorem ipsum, no placeholder names, no console logging left in.

## 6. Screens and flow

Host app name: **Sampada** (fictional broker). Co-pilot appears as a bottom sheet over it. Header band of the sheet is ink with the text "Independent check" and a one-line disclosure under it: "Not part of Sampada. We earn nothing whichever option you choose."

**H1 Host home.** Portfolio value, one SIP card (demo fund, ₹5,000 a month, goal "Down payment, ₹6 lakh"), an overflow menu with Pause, Reduce, Cancel. A banner appears when the fund is more than 10 percent below its 12-month peak: "{Fund} is {x}% below its 12-month peak." with a button "Review your SIP".

**Entry points (both open the same sheet):**
- Entry A, embedded: tapping Pause, Reduce or Cancel in the menu.
- Entry B, standalone: tapping "Review your SIP" on the banner. A small label on the sheet states which entry opened it ("Opened from a drawdown alert" or "Opened from your Pause request"). This answers the objection that a standalone product cannot intercept the pause tap.

**C1 Entry.** Title "Before you change your SIP". One line: "This takes about 45 seconds. You can leave anytime." Two buttons of identical size and weight: "Show me what changes" and "Skip, I've decided". Skip goes straight to the host's own confirm screen with no further prompt.

**C2 Reason.** Five single-tap chips: Money is tight right now / The market looks scary / This fund isn't performing / My goal has changed / Other. Optional second row: "For how long?" 1 month, 3 months, 6 months, Not sure. Routing: Money is tight and Other go to the fast path. The others go to the full path. The reason is never used to argue with the user.

**C3 Replay (full path only).** Title "Your SIP through a past fall". Hand-built SVG chart (no chart library). Shows the user's own SIP amount invested through the 2020 episode on the real fund NAV, two lines: "Kept investing" (solid) and "Paused for 3 months" (dashed), with the gap between them lightly shaded and labelled with the rupee difference. A scrubber lets the user drag through time; values and the gap update as they drag. Caption per section 5. If the computed gap is negative or under 1 percent of the final value, show the honest alternative: "In this period, pausing made little difference." Never hide an unfavourable or unhelpful result.

**C4 Options and receipt (full path).**
- Three option cards in fixed order: Continue, Reduce, Pause. Identical size and styling. Each shows: monthly amount, projected goal progress (as a range), monthly strain.
- A slider "What matters most right now?" from "Reaching my goal" to "Breathing room each month". As the user drags, a small text marker "Leads at this weighting" moves between cards. Cards do not reorder or change size.
- A regime bar under the slider with the computed flip points marked: Continue leads above X, Pause between Y and X, Reduce below Y.
- The **Pause receipt** for the selected pause duration (default 3 months): rows for skipped contributions (months × amount), growth they would have earned to the goal date at the assumed return, difference at goal date with range, and goal progress before and after.
- A text link at the bottom "I want to stop this SIP" opens a plain consequence view (projected goal progress with the SIP stopped) with two equal buttons: "Go back" and "Continue to Sampada to stop".
- Controls to change: pause length, reduction amount, goal date ("What if my goal moves out 6 months?"), and in an "Assumptions" panel the return assumption. The panel is one tap away on every screen with a projection.

**C5 Confirm.** "You chose: {option}." One sentence on what it means for the goal. Toggle "Remind me to review in {n} months". Button "Make this change in Sampada". It returns to H1 with the SIP card updated (status Paused until {month}, or the new amount).

**F1 Fast path.** For "Money is tight" or "Other". One card listing, for Pause, Reduce and Stop, the effect on goal progress. Three equal buttons. No replay, no slider, no persuasion. Must be completable in under 45 seconds. Wording is matter-of-fact: "Pausing for 3 months lowers goal progress from 90% to 87%."

**Judge panel** (drawer opened from the toggle beside the frame): persona (Rohan, Priya), emergency buffer band, "as of" date, fund, return assumption, pause length, and Reset. Changing any control updates the live prototype. This is how a judge can test the fast path or a different fund without a separate demo.

**Metrics tab** (second tab beside the phone, section 9).

## 7. Engine specification (`src/engine/`, pure functions, fully typed)

Inputs: persona, chosen option, assumed annual return r, goal date.

- Monthly rate i = (1 + r)^(1/12) − 1. Contributions at month end (ordinary annuity).
- Projected corpus at goal date = corpus × (1 + r)^(years) + SIP × ((1+i)^n − 1) / i, with the option's contribution schedule applied (Continue: all months; Reduce: reduced amount for the stated period; Pause: zero for the first N months; Stop: no contributions).
- Goal progress = min(1, projected corpus ÷ goal amount).
- Ranges: compute at r = 6%, 8%, 10%. Central value is 8%. Show low and high.
- Disposable surplus = take-home − fixed obligations. SIP strain for an option = average monthly SIP over the next 12 months ÷ surplus.
- Buffer factor k: buffer of 3 months or more → 1.0; 1 to 3 months → 1.3; under 1 month → 1.6.
- Comfort = 1 − min(1, strain × k).
- Fit = 100 × (λ × goalProgress + (1 − λ) × comfort), where λ is the slider value from 0 to 1.
- Flip points: solve the λ at which each pair of options has equal fit in closed form. Do not hardcode them.
- Pause receipt: skipped contributions = N × SIP; growth on skipped contributions = difference in projected corpus minus skipped total.

**Persona Rohan:** SIP ₹5,000 a month, goal ₹6,00,000 in 60 months, current corpus ₹1,20,000, take-home ₹42,000, fixed obligations ₹20,300, buffer 1 to 3 months.

**Persona Priya:** SIP ₹3,000 a month, goal ₹2,50,000 in 36 months, current corpus ₹40,000, take-home ₹28,000, fixed obligations ₹22,500, buffer under 1 month.

**Acceptance tests for Rohan (write these as unit tests; tolerance ±1 percentage point or ±₹1,000):**

| Check | Expected |
| --- | --- |
| Continue goal progress at 8% | about 90% |
| Pause 3 months goal progress at 8% | about 87% |
| Pause 3 months cost at goal date | about ₹21,800 (₹15,000 skipped plus about ₹6,800 growth) |
| Reduce to ₹2,500 goal progress | about 60% |
| Stop goal progress | about 29% |
| Rohan SIP strain, Continue | about 23% |
| Flip point Continue vs Pause | about 0.68 (±0.02) |
| Flip point Pause vs Reduce | about 0.22 (±0.02) |

If the engine disagrees with this table by more than the tolerance, treat the engine as wrong, find the cause, and report it. Do not adjust the table.

**Replay engine:** take the month-start NAV series of the chosen fund. Window: 6 months before the pause start through 24 months after it. Pause start = the first month in the 2020 episode where the fund is 10 percent or more below its running peak. Scenario A invests the SIP amount every month. Scenario B is identical but skips the pause months (skipped money is not invested elsewhere; state this in the Assumptions panel). Units bought = amount ÷ NAV. Compare value at the end of the window using the final NAV. Return both series for charting and the rupee gap.

**Narration:** `narration.ts` turns the computed numbers into one or two plain sentences per screen using fixed templates. No language model. A test confirms every generated sentence passes the banned-word rule.

## 8. Event instrumentation

Log to `localStorage` through one `track(event, props)` function. Events: sheet_opened (with entry), skipped, reason_selected, replay_viewed, option_card_viewed (card id), options_enter, options_exit (with seconds), option_selected, stop_selected, abandoned, confirm_completed, reminder_set, day30_response.

**Informed Decision Rate (the north star):** share of completed checks where the user viewed at least 2 of 3 option cards, spent 15 seconds or more on the options screen, and made an active selection. All outcomes (continue, reduce, pause, stop) count equally. It measures engagement with information, not whether the decision was right.

## 9. Metrics tab

Show a dashboard built from 240 simulated sessions generated by a seeded random generator (same output every load). Label it clearly: "Simulated sessions for demonstration. Not real user data." Add the live session from the current demo as a separate row marked "This session".

Contents: Informed Decision Rate; outcome mix (Continue, Reduce, Pause, Stop, Skipped); median time on the fast path; a "Fast-forward 30 days" button that asks "Would you make the same choice today?" (Yes, No, Not sure) and logs it; and the guardrail table:

| Guardrail | Threshold |
| --- | --- |
| Median time to finish the fast path | 45 seconds or less |
| Users who report feeling pressured (day 30) | under 5% |
| Taps to reach Stop from any screen | 2 or fewer |
| Generated text containing banned words | 0 |
| Abandon rate on the options screen | under 20% |
| Share of Continue outcomes | monitored, no threshold |

Plain table with rules, no card grid, no donut charts. Use simple horizontal bars for outcome mix.

## 10. Build phases and agent split

Run in parallel where independent. Freeze new features 90 minutes before the submission deadline.

1. **Data and engine agent** (about 60 min): Phase 0 report, `build-data.ts`, `engine/`, tests passing, replay output verified against the acceptance table.
2. **UI agent** (about 90 min, starts when the engine's types exist): H1, C1 to C5, F1, the SVG replay chart, the slider, the receipt, copy file and copy test, accessibility pass.
3. **Panels agent** (about 45 min, after the UI shell exists): Judge panel, Metrics tab, event logging.
4. **Review agent** (last): run all tests; walk the 75-second demo script below and time it; screenshot every screen at 390px and desktop width; list anything that violates sections 2, 4 or 5; fix it.

## 11. The 75-second demo script the prototype must support

1. (0:00) H1 with the drawdown banner. Tap "Review your SIP".
2. (0:12) C1, tap "Show me what changes". C2, tap "The market looks scary", choose "3 months".
3. (0:22) C3, drag the scrubber through March 2020 and let the gap open.
4. (0:42) C4, drag the slider so the "Leads at this weighting" marker moves across all three cards. Point to the receipt.
5. (1:05) C5, tap "Make this change in Sampada" and land on H1 showing the paused SIP.

Rehearse also: the Judge panel switching to Priya shows the fast path completing in under 45 seconds.

## 12. Definition of done

- `npm run build` succeeds and the app runs from the static output with the network disabled.
- All unit tests pass, including the acceptance table and the copy test.
- `DATA_REPORT.md` exists and states the data source, date range and any limitation shown on screen.
- Demo script runs in 75 seconds or less with no console errors.
- No screen contains a banned word, an emoji, a gradient, or a red/green outcome colour.
- A short `README.md` explains how to run, rebuild the data, and open the Judge panel.

## 13. Do not build

Chat or Q&A features, risk-profile quizzes, onboarding screens, user accounts or login, live API calls, any machine-learning model, Account Aggregator integration, push notifications, dark mode.

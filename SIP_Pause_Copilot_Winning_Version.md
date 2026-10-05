## SIP Pause Co-pilot — The Winning Version
Oct 5, 2026 · @A..
A first-principles reconstruction for the FinLit Ventures × StepSmart × E-Cell IIT Guwahati product case competition. This document is the single deliverable: one integrated recommendation, not alternatives.
### 1. What we currently have — brutally assessed
The document is unusually strong for a case competition: evidence-tagged, self-aware about assumptions, honest about limitations. Most teams would ship something a third this rigorous. That said, it has structural weaknesses a sharp judge will find.
What is genuinely excellent — preserve these:
Evidence discipline with [F], [A], [V] tags. This alone differentiates from 90% of case entries.
The decision to make fit a transparent scorecard rather than a black-box ML model. Most teams would have built a fake ML pipeline and called it innovation.
Regulatory honesty: "conditional consequences, not recommendations" is both legally defensible and ethically correct.
The Priya persona as a guardrail character, not just the Rohan persona. This shows the judges the team understands that most pauses are not mistakes.
The regime bar and rank-flip threshold concept. This is genuinely original and shows mathematical maturity.
The worked example in B4 with concrete numbers. This is the single most persuasive element in the document.
The honest acknowledgment that UI is copyable and the moat is thin.
What is weak — replace or redesign:
The killer insight is missing. "Show consequences before pausing" is a feature description, not an insight. Every competitor could arrive at the same idea. The document never articulates why this specific information gap exists, what psychological mechanism it exploits, or why no platform has closed it despite the obvious incentive to retain SIPs.
The standalone trigger problem is unresolved and possibly fatal. The document acknowledges that a standalone app cannot intercept the pause tap, then proposes "pause intent" as a workaround. But pause intent — a user opening a web tool after seeing a drawdown alert — is fundamentally different from the in-flow moment the entire product thesis depends on. The demo shows a pause flow that cannot exist in a standalone product. A judge who notices this can unravel the entire pitch.
Opportunity sizing stacks five assumptions. The base case multiplies user-initiated share (60%) × at-risk share (25%) × save rate (10%). Each is an assumption with no anchoring data. The range spans 14×, from ₹648 crore to ₹9,072 crore. A judge can ask: "What is your actual best estimate and why?" and the answer is: "We don't know."
The North Star metric (Confirmed Decision Rate) doesn't measure what it claims. CDR measures whether someone didn't reverse their choice within 30 days. But not reversing can mean the decision was good, the user forgot, the user gave up, or the user lost access. CDR rewards inaction as much as informed action. The self-report supplement will have massive non-response bias.
The evidence engine is the weakest technical component. The document correctly notes that the effective sample size is the number of drawdown episodes (roughly five in direct-plan history since ~2013). A model trained on five episodes is not a model — it is a lookup table with uncertainty bands so wide they provide no actionable information. The document acknowledges this but still includes it as a core architectural component.
Monetization is acknowledged as thin but not solved. Per-save fees yield ₹3–6 crore at 100% market coverage. Per-active-user licensing is proposed but not developed. The judges will ask: "Why would a platform pay for this instead of building it themselves?" and the document has no strong answer.
The 15-slide deck structure is not specified. The document maps sections to slides but does not specify the narrative arc, visual hierarchy, or what the judges should remember.
The demo flow tries to show too much. Seven beats in 90 seconds means each beat gets ~13 seconds. The replay, which is the differentiator, gets 25 seconds. The persona switch to Priya adds complexity without adding insight in a demo context.
What is unnecessary — delete:
The evidence engine as a "learned ML component" in MVP. Replace with precomputed historical replay tables. This is simpler, more honest, and equally impressive when explained correctly.
Risk tolerance as even a future input. The document correctly drops it but still mentions it.
The LLM follow-up chat feature. It scores lowest on RICE and adds regulatory risk without adding decision value.
The Account Aggregator discussion in the main document. It is a roadmap item that distracts from the MVP story.
### 2. What the winning version should become
The transformation is not a list of tweaks. It is a shift in what the product is about.
### 3. Killer insight
#### The insight the current document has
"Users should see the consequences before pausing." This is correct but generic. Any product manager at any fintech could arrive at this conclusion in an afternoon. It does not explain why the problem persists despite the obvious incentive for platforms to retain SIPs.
#### The deeper question
Why does the information gap exist? Platforms like Groww and Zerodha have every reason to show consequences — they earn nothing from a paused SIP. They have all the data: the user's SIP amount, goal (if set), invested corpus, NAV history. Yet the pause flow is two taps with zero context. Why?
Because showing consequences at the pause moment creates a conflict of interest that platforms cannot resolve. If Groww shows you "pausing will cost you ₹47,000 in goal progress," the user's immediate reaction is: "You're just trying to keep my money." The platform that owns the transaction cannot credibly provide the intervention because the user cannot distinguish decision support from retention.
This is the structural reason the whitespace exists. It is not incompetence or oversight. It is a trust problem that is architecturally unsolvable for the platform that holds your money.
#### The killer insight
Every other financial action shows you its price. Pausing a SIP is the only one that doesn't — and the party best positioned to show it (the platform) is the one you trust least to be honest about it.
When you buy something, you see the price. When you take a loan, you see the EMI. When you withdraw from a bank, you see the balance drop. But when you pause a SIP, the cost — goal slippage, lost rupee-cost averaging through a dip, the compounding gap — is entirely invisible. It lives months or years in the future. And the one entity that could make it visible is the same entity that profits from your continued investment.
This creates what behavioral economists call a credibility-transparency dilemma: the information that would most improve the decision is exactly the information the user will not trust from the source that has it.
#### Why this makes the SIP Pause Co-pilot structurally different
A third-party co-pilot — one that does not hold the user's money, does not earn from the SIP continuing, and has no transaction to protect — is the only entity that can credibly show this information. The product's value is not the calculation (any platform could do that). The value is the credibility of the calculation coming from someone who doesn't benefit from the answer.
This is why the product must never become a retention mechanism. The moment it optimizes for continuation, it loses the only advantage it has over Groww building the same feature. The ethical positioning is not a nice-to-have. It is the entire strategic moat.
#### One-sentence versions
Behavioral insight: Pausing a SIP feels free because its cost is invisible, and the platform that could show it isn't trusted to be honest.
Product thesis: A pause button that shows you your own goal — from someone who doesn't care which button you press.
Differentiation: We're the only one in the room with nothing to sell you.
What judges should remember tomorrow: "The cost of pausing is invisible, and the platform can't fix that because you don't trust them to."
#### Evidence classification
That platforms make pausing a two-tap action with no consequences shown: Verified [S16, S17, competitor analysis].
That platforms have an incentive to retain SIPs: Verified — AMCs earn expense ratios on AUM; platforms earn through distribution or premium tiers.
That users distrust retention nudges: Reasonable inference from the S12 study ("absence of human advisory support" as a driver) and general behavioral literature on reactance.
That the credibility gap is the structural reason the whitespace exists: Proposed solution — this is our interpretive framework, not a proven fact. We should present it as our hypothesis and invite the judges to challenge it.
That a third party can credibly provide this information: Assumption — plausible but unproven. Our beta will test whether users actually trust the co-pilot more than they would trust the same information from their platform.
### 4. Final product experience
#### What triggers the intervention
The user taps Pause, Skip, Reduce, or Cancel on their SIP inside a partner platform (embedded SDK, phase 2) or opens the co-pilot from a drawdown alert or direct search (standalone wedge, phase 1). The trigger is the intent to change, not market conditions.
#### What the user sees first
Screen 1: "Before you change your SIP" — a single neutral sentence: "This takes about 45 seconds. You can leave anytime." Two equal-weight buttons: "Show me what changes" and "Skip, I've decided." Skip leads directly to the platform's native pause flow with no friction.
Design rule: the Skip button must be visually equal to the Continue button. If Skip is smaller, greyed, or secondary, the product has become a retention gate.
#### What the system asks (one screen, ~20 seconds)
Screen 2: Reason capture — five one-tap chips:
Money is tight right now
Market looks scary
This fund isn't performing
My goal has changed
Other / just want to pause
Optional: "How long are you thinking?" with 1 month / 3 months / 6 months / not sure.
The reason routes the user: chips 1 and 5 → fast path. Chips 2, 3, 4 → full path. The reason is never used to argue against the user's decision.
#### What the system calculates (invisible to user)
All deterministic, no ML:
Disposable surplus = take-home − fixed obligations
SIP strain = SIP amount ÷ disposable surplus
For each option (Continue, Reduce to X, Pause for N months): projected corpus at goal date using a disclosed conservative return assumption, shown as a range
Goal progress = projected corpus ÷ goal amount, capped at 100%
Comfort score = 1 − min(1, strain × k), where k adjusts for thin emergency buffers
Fit score = λ × Goal progress + (1 − λ) × Comfort, where λ is set by the user
Historical replay: the user's own SIP amount run through real past NAV data from drawdown episodes
#### What evidence it shows
Screen 3: "Your SIP through past dips" (the emotional anchor)
A chart showing the user's own SIP amount (₹5,000/month) invested through the March 2020 crash and the 2025-2026 correction, using the actual fund's NAV history. Two lines: "kept investing" vs. "paused for 3 months during the dip."
The gap between the lines is the visible cost of a past pause. This is not a prediction. It is historical fact computed from real NAV data. The label reads: "This is what happened, not what will happen."
This is the killer demo moment. The user sees their own money through a past panic and realizes the cost was real but invisible at the time.
Screen 4: "Your options right now" (the decision screen)
Three cards, equal visual weight:
Below: a regime bar showing: "If your goal matters most → Continue. If breathing room matters most → Reduce. Balanced → a short Pause is surprisingly cheap."
A slider labeled "What matters most to you right now?" with Goal on the left and Comfort on the right. As the user drags, the top-ranked card changes. The flip thresholds are shown: "Continue leads above 68%, Pause leads between 22% and 68%, Reduce leads below 22%."
Stop is always available as a text link: "I want to stop entirely" → shows the consequence (goal ~29% funded) and proceeds without argument.
#### What the user can change
The priority slider (λ)
The pause duration
The reduction amount
The goal date ("What if I push my goal out 6 months?")
The return assumption (advanced panel)
#### What recommendation is given
None. The product never says "you should" or "we recommend." It says: "If [your stated priority] matters most, [option X] scores highest on that dimension. Here is what it costs on the other dimension."
The framing is always conditional on the user's own stated priority. No unconditional best option is ever presented.
#### How uncertainty is communicated
All projections show a range, not a point estimate
The return assumption is disclosed and changeable
The replay is labeled "historical, not predictive"
An assumptions panel is always one tap away
The phrase "based on your inputs and an assumed return of X%" appears on every projection
#### How the user confirms
Screen 5: Confirmation — "You chose [Reduce to ₹2,500]. Here's what that means for your goal." One-line summary. Toggle: "Remind me to review in [N] months." Button: "Complete this change in [Platform]." The user finishes the action in their native app.
#### What happens after
If they paused or reduced: a reminder at the chosen interval. At day 30, a two-tap check: "Would you make the same choice today?" (Yes / No / Not sure). This feeds the Informed Decision Rate metric.
If they continued: nothing. No congratulations, no "good decision" messaging. The product should not reward continuation.
If they stopped: a single message acknowledging the choice and showing the final position. No guilt, no follow-up campaign.
#### The fast path (Priya's flow)
Reason = "Money is tight" → one consequence card showing what each option means for the goal → Pause, Reduce, or Stop buttons → done in under 45 seconds. No replay, no slider, no persuasion. The product respects that this is a legitimate decision and helps her make it cleanly.
### 5. AI/ML architecture
#### Design philosophy — revised
The current document's philosophy is sound: deterministic calculations + real NAV evidence + guardrails + LLM explanation. The revision sharpens what belongs where and removes the ML claim from the evidence engine.
Principle: AI should amplify information, never manufacture conviction. Every number shown to the user must trace to an input, a formula, or a historical data point. The system never produces a probability of the "right" decision because there is no ground truth for "right."
#### What must be deterministic (and why)
#### What can genuinely benefit from ML — honest assessment
Honest conclusion: there is no justified ML component in the MVP. The evidence engine uses real NAV data but applies deterministic replay logic, not a trained model. The fit score is a transparent formula. The guardrails are rules. This is not a weakness — it is intellectual honesty, and judges will respect it more than a fake ML pipeline.
#### What the LLM does (and does not do)
The LLM receives a structured fact packet — never raw user data — and produces natural-language explanations.
The LLM does:
Translate the numeric comparison into plain language: "A 3-month pause costs about ₹22,000 in goal progress — roughly 3.7 percentage points. That's less than most people expect."
Answer follow-up questions from the fact set: "Why is Reduce scored lower?" → "Because reducing by 50% for the full remaining period costs more goal progress than a short pause."
Adapt the explanation to the user's reason: if the reason is "money is tight," lead with the comfort score; if "market looks scary," lead with the replay.
The LLM does not:
Produce financial calculations (all pre-computed)
Make recommendations ("you should...")
Assess risk tolerance
Generate any output that isn't grounded in the pre-computed fact set
Access any data beyond the structured packet
Guardrail on LLM output: every generated explanation is validated against the fact set before display. If the explanation contains "should," "recommend," "best option," or any claim not in the fact set, it is rejected and a template fallback is shown. This is a string-matching + semantic check, not ML.
#### Full architecture — data flow
Layer 1: User inputs → take-home income, fixed obligations, emergency buffer band, goal amount/date/flexibility, SIP fund/start date/amount, reason for change, intended duration.
Layer 2: Data enrichment → NAV history for the user's fund (from MFapi or cached AMFI data), fund category, current drawdown from peak, volatility percentile.
Layer 3: Guardrail router (rules) → reason + drawdown level → fast path / full path / light path. Cash emergency → fast path with no persuasion framing.
Layer 4: Scenario engine (deterministic) → for each option (Continue, Reduce, Pause N months, Stop), compute: projected corpus at goal date (range), goal progress, monthly strain, comfort score.
Layer 5: Fit scorecard (deterministic) → Fit = 100 × [λ × Goal + (1 − λ) × Comfort]. Regime bar. Flip thresholds. All closed-form.
Layer 6: Historical replay engine (deterministic on real data) → replay the user's SIP through past drawdown episodes using actual NAV. Output: "In the 2020 crash, continuing would have produced ₹X vs. pausing for 3 months would have produced ₹Y."
Layer 7: Fact packet assembly → all computed numbers, replay results, option comparisons, regime thresholds, user context → structured JSON.
Layer 8: LLM explanation (constrained) → fact packet → natural-language summary, validated against guardrails → shown to user.
Layer 9: Decision logging → user's choice, what was shown, scores, timestamps → append-only log for measurement and future model training.
#### Data requirements — realistic assessment
#### What to tell judges about the AI
"Our AI architecture is deliberately simple. The scorecard is deterministic and transparent. The replay uses real NAV data, not predictions. The LLM explains numbers it did not calculate. We chose this because the alternative — a black-box model that tells users what to do — is exactly what regulators are moving against and exactly what users don't trust. Our AI is a narrator, not a decision-maker."
### 6. North Star + metric framework
#### Critique of current North Star: Confirmed Decision Rate
CDR is defined as the share of completed checks where the user has not reversed the choice within 30 days, plus a self-report. This has three problems:
It rewards inaction. A user who paused, forgot about the reminder, and never came back counts as "confirmed." A user who continued because the replay scared them into inaction also counts. Neither is an informed decision.
Self-report will have massive non-response bias. Users who regret their choice are less likely to respond. Users who feel good are more likely. The metric will systematically overcount satisfaction.
It is unmeasurable in the standalone phase. If the user completes the action in Groww or Coin, we have no way to know whether they reversed it unless we ask — and asking creates the same non-response problem.
#### Replacement: Informed Decision Rate (IDR)
Definition: the share of completed checks where the user:
Viewed at least 2 of the 3 option cards (evidence of comparison, not just glancing at the default), AND
Spent ≥15 seconds on the options screen (evidence of consideration, not a tap-through), AND
Made an active selection (did not abandon or time out)
This is entirely behavioral, requires no self-report, and measures what we claim to provide: an informed decision. It does not measure whether the decision was correct — because we do not claim to know what correct is.
Why this is better:
It is measurable from day one with client-side events.
It does not reward any particular outcome (continue, reduce, pause, or stop all count equally).
It captures the product's actual value proposition: did the user engage with the information before deciding?
A user who views the options and chooses to stop has made an informed decision. A user who taps through in 3 seconds without reading has not.
What IDR does not measure (and shouldn't): whether the user made the "right" decision. That is unknowable and claiming otherwise would be intellectually dishonest.
#### Full metric framework
#### Guardrail metrics — detecting dark-pattern drift
These metrics exist to catch the product becoming a retention mechanism.
#### Measurement design
Randomization: In the standalone phase, randomize who receives the drawdown alert (treatment) vs. who does not (control). In the embedded phase, randomize at the SIP level — some pause taps trigger the co-pilot, others proceed normally. This avoids self-selection bias.
Caution: the 90-day retained SIP value metric creates a tension with the North Star. If the product is genuinely neutral, it should sometimes help users pause (reducing retained SIP value). If retained SIP value always goes up, either the product is successfully preventing uninformed pauses OR it is subtly steering users toward continuation. The guardrail metrics disambiguate.
### 7. Differentiation + defensibility
#### The honest starting point
The current document correctly states: "The UI is copyable; Groww could ship similar screens. The moat is trust, the outcome data and integration speed." This is honest but insufficient. A judge will ask: "So you have no moat?" We need to be honest and have an answer.
#### What is NOT a moat (be explicit about this)
The UI. Any platform can build a consequences screen. Groww could ship it in a quarter.
The scorecard formula. It is deliberately transparent and publishable. That's a feature, not a moat.
The replay engine. NAV data is public. Any developer can build this.
The LLM integration. Commodity technology.
"Being first." First-mover advantage in a feature is measured in months, not years.
#### What IS defensible (the actual mechanism)
1. The credibility position (structural, not technical)
This is the primary moat and it flows directly from the killer insight. A platform that holds your money cannot credibly tell you not to move it. A third-party co-pilot that earns nothing from the SIP continuing can. This credibility is not a feature — it is a structural position that Groww cannot replicate by building the same screens. If Groww builds the same consequences view, users will still wonder whether the numbers are rigged to favor continuation.
Mechanism: the co-pilot's business model must never create a financial incentive to retain SIPs. The moment it earns per-save fees from AMCs, the credibility position collapses. This is why the business model matters so much — it is not just revenue strategy, it is the moat.
2. Decision-quality data (compounding, not static)
Every interaction generates a record: what was shown, what the user chose, what their context was, what happened 30/90 days later. This dataset — reason × context × choice × outcome — does not exist anywhere in Indian fintech today. After 50,000+ interactions, this data enables:
Empirical calibration of which interventions actually change decision quality (not just retention)
Understanding of which reasons and contexts lead to regretted vs. non-regretted pauses
A genuine ML model (phase 3) trained on real behavioral data, not synthetic labels
Research publications and partnerships with behavioral finance academics
Mechanism: the data flywheel compounds. Each interaction makes the next intervention better calibrated. A competitor starting from zero faces a cold-start problem we've already solved.
3. Trust as a network effect
If the co-pilot earns a reputation as "the thing that helped me make a good decision during the 2026 correction," that trust transfers to adjacent decision moments (redemption, withdrawal, rebalancing). Trust in financial products is slow to build and fast to lose. A competitor that ships the same feature six months later does not inherit the trust.
Mechanism: trust is earned through outcomes, not features. A user who was shown their options, chose to pause, and felt respected will return for the next decision. A user who felt manipulated will not.
4. Integration partnerships (phase 2 moat)
The first platform to embed the co-pilot creates a switching cost. Integration involves data pipes, UI customization, compliance review, and organizational buy-in. A competitor must displace an existing integration, not just match the feature.
Mechanism: B2B integration costs create lock-in. But this is a phase 2 moat, not an MVP moat.
#### What to say when a judge asks "What stops Groww from copying this?"
"Nothing stops them from copying the screens. But Groww earns from your SIP continuing — through expense ratios on AUM for regular plans, through Prime subscriptions, through user retention metrics. When Groww shows you a consequences screen, you'll wonder whether the numbers are tilted to keep you investing. We don't have that problem because we don't hold your money and we don't earn from your decision. That's not a technical moat — it's a trust moat. And the data we collect from every interaction — what people were shown, what they chose, what happened next — compounds into a behavioral dataset that doesn't exist anywhere else in Indian fintech."
#### Fatal-flaw test on our own defensibility
Attack: "Your trust moat only works if users actually trust you more than their platform. What evidence do you have for that?"
Answer: "We don't have evidence yet — that's what the beta will test. But the structural logic is sound: no platform in any industry has solved the credibility problem of advising a customer to stop using the platform's own product. This is why independent financial advisors exist. We're bringing that independence to a decision moment that advisors don't reach."
Attack: "If you license to AMCs, aren't you then financially incentivized to retain SIPs?"
Answer: "Our licensing model charges per active user who completes a check, not per SIP retained. We earn whether the user continues, reduces, pauses, or stops. If we charged per retention event, you'd be right — but we deliberately don't, because that would destroy the only advantage we have."
### 8. Business model / GTM
#### Business model — revised
The current document correctly identifies that per-save fees are thin (₹36–72 per retained SIP-year). The replacement model must align with the credibility moat.
Model: Decision-intelligence-as-a-service
B2C is free forever. This is not generosity — it is the moat. The moment users pay, the product becomes a service with retention pressure.
B2B revenue comes from licensing the decision-support layer to AMCs, wealth platforms, and distributors on a per-monthly-active-SIP-account basis.
Why per-active-account, not per-save: per-save fees create the exact conflict of interest the product exists to avoid. If FinLit earns more when users continue, the product's neutrality is compromised. Per-account fees mean FinLit earns whether the user continues, reduces, pauses, or stops.
Illustrative economics (base case, all assumptions):
Target: 5 lakh monthly active SIP accounts triggering checks by month 18
Average fee: ₹3 per account per month
Monthly revenue: ₹15 lakh (₹1.8 crore annualized)
At 20 lakh accounts (one mid-size platform): ₹7.2 crore annualized
This is a small but real SaaS business. Scale comes from expanding to redemption and withdrawal decision moments on the same engine.
#### Opportunity sizing — revised
The current sizing stacks five assumptions. The revised version anchors to defensible numbers.
What this means for the business: at ₹3 per check triggered, annual revenue from the intervention alone is ₹75 lakh to ₹1 crore. The platform license (per active SIP account, not per check) is the primary revenue line because it values the always-on infrastructure, not just the triggered events.
What to tell judges: "We sized this conservatively. The base is 50+ lakh SIP discontinuations per month — that's AMFI data, not our assumption. Our assumptions are on the shares that are user-initiated, at-risk, and reachable. Even at conservative estimates, the addressable market is 3-4 lakh decision moments per month during a correction. That's more than enough for a venture-scale opportunity when the same engine expands to redemption and withdrawal."
#### GTM — revised and specific
Phase 0: Proof of concept (months 0–3)
Target: 200–500 users from IIT/campus finance clubs and online investing communities (r/IndiaInvestments, Valuepickr forums).
Entry point: a web tool titled "What if I pause my SIP?" — the user enters their SIP details and sees the replay and options. This is the standalone wedge. It tests whether people find the output useful, not whether they change their behavior.
Distribution: direct outreach to finance club leaders, a post on investing forums timed to coincide with a market dip or AMFI's monthly data release (which generates media coverage of SIP stoppages every month).
Gate: ≥70% of users who start the check complete it. ≥50% view the replay. Qualitative: users describe the experience as "useful" or "eye-opening," not "preachy" or "pushy."
Phase 1: Standalone PWA (months 3–9)
Add drawdown alerts (push notifications when the user's fund drops ≥10% from peak), the full flow with the regime bar, and the day-30 check-in.
Distribution: SEO for "should I pause my SIP" and related queries (verify search volume — [V]). Content partnerships with financial literacy platforms. Timing content to AMFI monthly releases.
Gate: ≥1,000 monthly active users. Informed Decision Rate ≥65%. Alert-to-check conversion ≥15%.
Phase 2: B2B2C pilot (months 9–18)
Approach one mid-size platform or AMC (not Groww — they are the closest competitor and least likely early partner). Pitch: "We built a decision layer that your users trust because it's independent. Here's the data from 10,000+ checks. Your SIP discontinuation rate among users who complete the check is X% lower than the baseline."
Integrate as an SDK that intercepts the pause tap and shows the co-pilot flow before the platform's native confirmation.
Gate: one signed pilot. Retained SIP value measurably higher in the treatment group vs. holdout.
Phase 3: Scale (months 18+)
Multiple platform partnerships. Expand to redemption and withdrawal decision moments. Account Aggregator integration through a regulated partner. Learned personalization model trained on real behavioral data.
### 9. Risks + judge attacks + answers
#### Top 10 judge attacks, ranked by severity
#### Risks the judges might not ask but that we should preempt
### 10. Exact 15-slide winning deck
#### Slide 1: Title + hook
Title: SIP Pause Co-pilot
Core message: "A pause button that shows you your own goal."
What goes on the slide: Product name, one-line thesis, team name, competition branding. A single visual: a phone screen showing the pause button transforming into a goal-impact view.
Visual: Split screen — left side shows a red "Pause SIP" confirmation dialog (the status quo), right side shows the co-pilot's options screen with goal impact numbers.
Say verbally: "Every month, over 50 lakh SIPs are discontinued or completed in India. For many of those investors, the pause button is the most consequential financial decision they'll make this year — and it comes with zero information. We built the information layer that's missing."
#### Slide 2: The problem — scale
Title: 10 crore SIPs. One fragile moment.
Core message: SIP investing is massive and growing, but the pause moment is unprotected.
What goes on the slide: Three numbers stacked large: ₹87 lakh crore AUM, ₹32,297 crore monthly SIP contributions, 10+ crore contributing accounts. Below: "50+ lakh SIPs discontinued or completed every month" with the caveat that this includes matured SIPs.
Visual: A funnel or flow: monthly SIP contributions → the pause/stop moment → the information vacuum.
Say verbally: "India's SIP ecosystem is ₹87 lakh crore. Every month, over 50 lakh SIPs end — some because they completed their tenure, some because the investor panicked. The problem isn't that people pause. The problem is they pause without seeing what it costs."
Source: AMFI August 2026 data [S1].
#### Slide 3: The behavioral insight
Title: The only financial action whose cost is invisible.
Core message: The credibility-transparency dilemma — the platform that could show the cost isn't trusted to.
What goes on the slide: A comparison: "When you buy → you see the price. When you borrow → you see the EMI. When you pause a SIP → you see... nothing." Below: "And the one entity that could show you — your platform — benefits from you staying."
Visual: Three icons showing price/EMI/nothing, then a trust gap diagram: Platform ↔ [conflict of interest] ↔ User ↔ [trust gap] ↔ Information.
Say verbally: "In a study of 152 first-time investors, over half had paused or stopped a SIP. Beginners exited at nearly double the rate of advanced investors. But here's what's interesting: loss aversion and the absence of advisory support were the main drivers — not genuine cash need. The information that would help exists. But it comes from the platform that profits from your SIP continuing, so you don't trust it. That's the gap we fill."
Source: [S12] for the study. Present as directional (small sample).
#### Slide 4: Competitive whitespace
Title: Everyone owns the Pause button. No one guides it.
Core message: Execution platforms treat pause as a frictionless exit. AI assistants sit outside the flow.
What goes on the slide: A 2×2 matrix. X-axis: "In the pause flow" vs. "Outside the flow." Y-axis: "Personalized + explainable" vs. "Generic." Groww, Zerodha, INDmoney, Kuvera all plotted. The co-pilot sits alone in the top-left quadrant (in-flow + personalized).
Visual: The 2×2 with competitor logos placed. The top-left is empty and labeled "Our position."
Say verbally: "We analyzed the pause flows of every major platform. Groww: two taps, no context. Zerodha: confirm and done. INDmoney has portfolio-level insights, but not at the pause moment. Groww's GR-1 assistant is opt-in and doesn't intervene in the flow. No one is in this quadrant."
Source: Competitor analysis [S16-S21]. Note: this is from web sources — confirm with app teardowns before the final deck.
#### Slide 5: Target persona
Title: Meet Rohan — and Priya.
Core message: The primary user is a first-cycle investor who's never lived through a drawdown. The guardrail persona has a genuine cash need.
What goes on the slide: Rohan's profile card (26, ₹60K take-home, two SIPs totaling ₹5K, first red portfolio, no advisor). Below: Priya's card (job loss, genuine need to pause, must be respected — not argued with).
Visual: Two persona cards. Rohan's card has a thought bubble: "I'll pause until things settle." Priya's card has: "I need this money for rent."
Say verbally: "Rohan is our primary user. He started investing during the bull run, he's never seen red, and his instinct is to pause until things calm down. He doesn't know what pausing costs because no one has shown him. Priya is our guardrail — she has a real cash need, and the product must help her pause quickly and cleanly. If Priya feels judged, we've failed."
#### Slide 6: Opportunity sizing
Title: ₹980 crore of SIP flow at stake — conservatively.
Core message: Bottom-up sizing anchored to AMFI data, with assumptions labeled.
What goes on the slide: The sizing waterfall: 50-55 lakh monthly discontinuations → ~50% user-initiated → ~30% direct-plan → ~25% at-risk (reactive, no hard need) → ~10% save rate → ~9 lakh SIPs retained annually × ₹36K annual contribution = ~₹3,240 crore retained (base case). SAM at ~₹980 crore (direct-plan share).
Visual: A waterfall chart with each assumption labeled [A] and the final number circled.
Say verbally: "We sized this bottom-up from AMFI data. The top number is real — 50+ lakh SIPs discontinued per month. Everything below is an assumption, and we've labeled each one. Our base case retains about ₹3,240 crore of SIP flow annually — that's 0.8% of total SIP flow. We'd rather show you a small honest number than a large fake one."
#### Slide 7: Product vision + value proposition
Title: A pause button that shows you your own goal.
Core message: The co-pilot turns a reflex into a decision — without blocking the exit.
What goes on the slide: The positioning statement: "For first-cycle SIP investors tempted to pause in a market fall, the SIP Pause Co-pilot shows what each option does to your own goal and budget. Unlike generic insights or retention nudges, it never tells you what to do, and every number is traceable."
Three differentiators as icons: (1) In the moment of intent, (2) Personal and explainable, (3) Honest in both directions.
Visual: A before/after: Before = anxiety + two-tap exit. After = information + deliberate choice.
Say verbally: "Our product sits in one moment: the instant someone is about to change their SIP. It shows three things: what each option does to your goal, what each option does to your monthly budget, and what happened when you stayed invested through past dips. Then it lets you choose. It never says 'you should.' If the right decision is to pause, it helps you pause well."
#### Slide 8: Product strategy + AI architecture
Title: Deterministic math. Real NAV data. The LLM only explains.
Core message: The architecture is deliberately simple and auditable. No black box.
What goes on the slide: The architecture flow: User inputs → Guardrail router (rules) → Scenario engine (deterministic) → Fit scorecard (transparent formula) → Historical replay (real NAV) → Fact packet → LLM explanation (constrained) → User decides.
Below: "What the AI does: explains computed numbers in plain language. What the AI doesn't do: calculate, recommend, or decide."
Visual: A horizontal pipeline diagram with each component labeled as "deterministic," "real data," "rules," or "LLM."
Say verbally: "We made a deliberate choice: no black-box ML. The scorecard is a formula you can read. The replay uses real NAV history from AMFI — we're computing what actually happened, not predicting what will happen. The LLM takes a structured packet of pre-computed numbers and explains them in plain language. If it generates the word 'should,' the output is rejected. This isn't sophisticated AI — it's trustworthy AI."
#### Slide 9: User journey
Title: From anxiety to decision in under 60 seconds.
Core message: The flow is fast, optional, and exits are always available.
What goes on the slide: A simplified journey map: Trigger (drawdown alert) → Entry ("Before you change...") with Skip option → Reason (one-tap chips) → Replay ("Your SIP through past dips") → Options (3 cards + regime bar + slider) → Confirm → Day-30 check.
Below: the fast path for Priya: Reason (money tight) → One consequence card → Choose → Done in <45 seconds.
Visual: A horizontal flow with screen thumbnails at each step.
Say verbally: "The full path takes about 60 seconds. You see why we're asking, then your SIP replayed through past crashes, then three options scored against your own priorities. The fast path for someone who genuinely needs the money? Under 45 seconds, one consequence card, no argument. We respect that decision."
#### Slide 10: Prototype screens
Title: [Live demo — switch to prototype]
Core message: Show, don't tell.
What goes on the slide: 4 key screens from the prototype, arranged as a phone mockup sequence: (1) Drawdown banner + "Review SIP" button, (2) Reason chips, (3) Replay chart, (4) Options with regime bar and slider.
Visual: Phone mockups of the actual prototype screens.
Say verbally: "Let me show you. [Switch to prototype for 60-75 seconds — see Section 11 for the exact demo script.]"
#### Slide 11: The replay — the killer feature
Title: "Your SIP through the 2020 crash."
Core message: Showing users their own money through a past panic makes the invisible cost visible.
What goes on the slide: The replay chart from the prototype: the user's ₹5,000/month SIP in a mid-cap fund through the March 2020 crash. Two lines: "Kept investing" vs. "Paused 3 months." The gap labeled: "₹X difference — that's what pausing cost."
Visual: The actual replay chart, annotated.
Say verbally: "This is real NAV data from the user's actual fund. Not a hypothetical, not a simulation — what actually happened. The user sees that the person who kept investing through the 2020 crash ended up ahead. But we also show: 'This is history, not a prediction.' If the fund didn't recover well, the chart shows that too. We don't cherry-pick."
#### Slide 12: Explainability + guardrails
Title: The product that says 'I don't know what's best for you.'
Core message: Ethical guardrails are not an afterthought — they are the product.
What goes on the slide: Four guardrail rules: (1) No "should" or "recommend" in any output. (2) Stop is always ≤2 taps away. (3) Fast path for genuine cash need. (4) Equal-weight buttons, no pre-selection. Below: the regime bar concept — "Continue leads if goal weight >68%. Pause leads if 22-68%. Reduce leads if <22%." — with the slider.
Visual: The regime bar with the slider, and the guardrail rules as icons.
Say verbally: "This is the slide most teams wouldn't show. Our guardrails. The product never says 'you should.' It never pre-selects an option. Stop is always two taps away. And the regime bar shows you explicitly: your choice depends on what matters to you, not on what we think. We think this honesty is what makes the product trustworthy — and trust is the only thing Groww can't copy."
#### Slide 13: Feature prioritization
Title: MVP = what changes the decision. Everything else is later.
Core message: Rigorous RICE prioritization with a strategic override for the replay.
What goes on the slide: A simplified MoSCoW table: Must (reason capture, scenarios, replay, regime bar, guardrails), Should (slider, auto-resume reminder, day-30 check), Could (LLM chat), Won't in MVP (Account Aggregator, propensity model, multi-goal).
Visual: A simple priority matrix or table.
Say verbally: "We used RICE scoring for prioritization. The replay ranks fifth by RICE but it's the differentiator and the demo centrepiece, so we made a strategic override — and we're transparent about that. The MVP is tight: reason capture, scenarios, replay, regime bar, guardrails. Everything else waits until we have real user data."
#### Slide 14: Metrics + North Star
Title: Informed Decision Rate — not retention.
Core message: The North Star measures whether the user engaged with information, not whether they continued.
What goes on the slide: North Star: Informed Decision Rate (≥65% target). Definition: user viewed ≥2 options AND spent ≥15 seconds AND made an active choice. Business KPI: 90-day retained SIP value vs. holdout (+5-10pp target). Guardrails: time to exit ≤45s, "felt pressured" <5%, Stop reachability ≤2 taps.
Visual: A metric pyramid: North Star at top, funnel and quality metrics in the middle, guardrails at the bottom.
Say verbally: "Most products in this space would pick retention as their North Star. We deliberately didn't. Informed Decision Rate measures whether the user looked at their options before choosing. It counts Continue, Reduce, Pause, and Stop equally. If someone views their options and decides to stop entirely, that's a success — they made an informed decision. The 90-day retained SIP value is our business KPI, and we measure it against a randomized holdout to control for selection bias."
#### Slide 15: Roadmap + why we win
Title: The pause button is the wedge. Trust is the moat.
Core message: Clear phased roadmap, honest risks, and the case for winning.
What goes on the slide: Four-phase roadmap: (1) Prototype + beta, 0-6 months, (2) Standalone PWA, 3-9 months, (3) B2B2C pilot, 9-18 months, (4) Multi-moment expansion. Below: "One idea: the cost of pausing a SIP is invisible, and the platform that could show it isn't trusted to. We made it visible — from someone you can trust."
Visual: A horizontal timeline with gates between phases.
Say verbally: "We're not building a fintech app with many features. We're building one thing: the information layer for one moment. SIP pause is the wedge. The same engine works for redemption and withdrawal. Our moat is trust — trust that comes from never having a financial interest in your decision. The one idea we want you to remember: the cost of pausing is invisible, and we made it visible."
#### Narrative arc summary
The 15 slides tell one story: Problem (2-3) → Insight (3) → Whitespace (4) → Who (5) → How big (6) → What we built (7-8) → How it works (9-11) → Why it's honest (12) → What's in and out (13) → How we measure (14) → Where it goes (15). The emotional peak is slide 11 (the replay). The intellectual peak is slide 12 (the guardrails). The judges should leave remembering: "The team that said their product never says 'you should.'"
### 11. Exact prototype/demo flow
#### Setup
Demo persona: Rohan. ₹5,000/month SIP in a mid-cap fund, started 18 months ago. Goal: ₹6 lakh for a down payment in 5 years. Current corpus: ~₹1.2 lakh. Fund is 14% below its 12-month peak. Emergency buffer: ~2 months.
Precompute the replay data for 2-3 real funds as static JSON. Do not call the MFapi live during the demo — free APIs have no SLA [S28] and a failed call kills the presentation.
#### The 75-second demo script
Beat 1 (0:00–0:12): The trigger
Screen: Rohan's home screen. A drawdown banner: "Your Axis Midcap Fund is 14% below its 12-month peak." Below: a card for his SIP (₹5,000/month, goal: Down Payment ₹6L). A button: "Review your SIP."
Action: tap "Review your SIP."
Say: "Rohan opened the app after seeing market news. His fund is down 14%. He's thinking about pausing."
Beat 2 (0:12–0:22): Entry + reason
Screen: "Before you change your SIP — this takes about 45 seconds. You can leave anytime." Two buttons: "Show me what changes" and "Skip, I've decided" — same size, same visual weight.
Action: tap "Show me what changes."
Screen: Five reason chips. Tap "Market looks scary."
Optional: "How long are you thinking?" → tap "3 months."
Say: "He's not broke — he's nervous. The product recognizes the difference."
Beat 3 (0:22–0:42): The replay — the killer moment
Screen: "Your SIP through past dips." A line chart: Rohan's ₹5,000/month SIP through the March 2020 crash, computed from real NAV data. Two lines: "Kept investing" (higher) vs. "Paused 3 months" (lower). The gap is labeled: "₹X difference after 2 years."
A note at the bottom: "This is what happened. It is not a prediction."
Action: let the chart animate. Point to the gap.
Say: "This is Rohan's actual fund — real NAV data from AMFI. In 2020, if he had paused for 3 months during the crash, he'd have ₹X less today. The cost of that pause was invisible at the time. Now it's visible. But we also tell him: this is history, not a forecast."
This is the demo's emotional peak. Spend the most time here. The gap between the lines IS the product.
Beat 4 (0:42–1:05): The options + regime bar — the intellectual peak
Screen: Three option cards:
Continue at ₹5,000: Goal ~90% funded, monthly strain 23%
Reduce to ₹2,500: Goal ~60% funded, frees ₹2,500/month
Pause 3 months: Goal ~87% funded, zero strain for 3 months
Below: the regime bar. "If your goal matters most: Continue. Balanced: a short Pause is surprisingly cheap. If breathing room matters most: Reduce."
A slider: "What matters most to you right now?" Goal ←→ Comfort.
Action: drag the slider. As it moves, the top-ranked card changes. The regime bar highlights shift.
Say: "Watch what happens when I move the slider. At goal-weight 70%, Continue leads. At 50%, Pause leads. At 20%, Reduce leads. The product doesn't tell Rohan what to choose. It shows him: your answer depends on what matters to you right now. And notice: Stop is always available — no guilt, no hiding."
This is the demo's intellectual peak. The slider changing the ranking IS the proof that the product is neutral.
Beat 5 (1:05–1:15): Confirmation + close
Screen: "You chose: Pause for 3 months. Your goal drops from ~90% to ~87% funded — about ₹22,000 less at your goal date." Toggle: "Remind me to review in 3 months." Button: "Complete this change."
Say: "Rohan chose to pause. The product respects that. It tells him the cost — ₹22,000 — and sets a reminder. In 3 months, it'll ask: 'Would you make the same choice today?' That's how we measure Informed Decision Rate. No guilt. No follow-up campaign. Just information."
#### What NOT to demo
Do not switch to Priya's persona. It dilutes the pacing. Show her on slide 5 as a guardrail persona.
Do not show the LLM explanation. It's not the differentiator and adds complexity.
Do not show onboarding. Start with Rohan already set up.
Do not show the assumptions panel. Mention it verbally ("every assumption is one tap away") but don't navigate to it.
#### Build notes
Precompute replay data for Axis Midcap Fund (or similar) for March 2020 and 2025-2026 correction as static JSON files.
The slider should be functional — this is the single most impressive interactive moment.
The option cards should update in real time as the slider moves.
Use a clickable prototype tool (Figma, Bolt, or Replit). If using Figma, the slider interaction may need creative workarounds.
Practice the demo until it's under 75 seconds. Every second over 90 is a second the judges aren't listening.
### 12. Final "why we win" thesis
#### The standard we must meet
A skeptical judge should be able to say: "This solves a real behavioral problem, the intervention is genuinely useful, the AI is justified, the product is ethically sound, the business makes sense, competitors cannot trivially replicate the advantage, and I can understand the entire idea in 90 seconds."
Here is why this submission meets that standard.
#### Why we win — the argument
1. We identified a real problem that others have overlooked for a structural reason.
The SIP pause moment is the single most consequential, most frequent, and least supported financial decision in Indian retail investing. Over 50 lakh SIPs end every month. The cost of a reactive pause is invisible at the point of decision — and the platforms that could make it visible aren't trusted to, because they benefit from the user continuing. This is not a feature gap. It is a trust gap. And trust gaps cannot be closed by the entity that created them.
2. The product is genuinely useful.
It shows three things no one else shows at the pause moment: (a) what each option does to the user's own goal, (b) what each option does to the user's monthly budget, and (c) what happened when the user stayed invested through past dips — using real NAV data from their actual fund. The regime bar and priority slider make the user's own values visible and show exactly where the ranking flips. This is not generic advice. It is a personalized decision tool.
3. The AI is justified and honest.
We did not build a fake ML pipeline. The scorecard is a transparent formula. The replay is deterministic arithmetic on real NAV history. The LLM explains pre-computed numbers and nothing else. We can defend every technical claim under questioning because we made no claims we cannot support. When judges ask "where's the ML?" we say: "We chose not to pretend. The real AI is a language model that translates numbers into understanding — and that's harder than it sounds."
4. The product is ethically sound — and that's the moat.
The product never says "you should." It never pre-selects an option. Stop is always two taps away. The fast path for genuine cash need has no persuasion framing. The North Star metric counts all outcomes equally — Continue, Reduce, Pause, and Stop. We are the only entry in this competition that can say: "If the right decision for you is to stop entirely, we help you understand that decision too." That's not just ethics. It's strategy. It's the reason Groww cannot replicate our advantage by building the same screens.
5. The business makes sense.
B2C is free — trust is the moat and charging users would destroy it. B2B revenue comes from licensing the decision layer to platforms and AMCs who benefit from reduced regret-driven churn. The model charges per active account, not per save, so our incentives never conflict with the user's. The SIP pause is the wedge; the same engine extends to redemption and withdrawal.
6. Competitors cannot trivially replicate the advantage.
Groww can build the same screens. But Groww cannot be a credible third party advising users on whether to use Groww's own product. That structural conflict — the credibility-transparency dilemma — is our moat. The decision-quality dataset we build over time (reason × context × choice × outcome) compounds that advantage.
7. The entire idea fits in one sentence.
"A pause button that shows you your own goal — from someone who doesn't care which button you press."
#### The one idea judges should remember tomorrow morning
Pausing a SIP is the only financial action whose cost is invisible. We made it visible. And we're the only one in the room who can do that credibly — because we have nothing to sell you.

| Component | Current | Winning version | Classification |
| --- | --- | --- | --- |
| Core insight | "Show consequences before pausing" | "The pause button is the only financial action whose cost is invisible at the point of decision" | MODIFY |
| Trigger framing | Standalone with "pause intent" workaround | Embedded SDK as the primary pitch, standalone as the proof-of-concept wedge — be honest about this in the deck | MODIFY |
| Evidence engine | ML model trained on NAV episodes | Precomputed historical replay tables — no ML claim, same output, more honest | MODIFY |
| Fit scorecard | λ-weighted linear model with regime bar | Keep. This is the strongest technical element. | KEEP |
| North Star metric | Confirmed Decision Rate (30-day non-reversal) | Informed Decision Rate: share of checks where the user viewed ≥2 options AND chose deliberately (did not abandon or rush) | MODIFY |
| Opportunity sizing | Five stacked assumptions, 14× range | Anchor to the one number we can defend: SIP discontinuations per month (~50-55 lakh) × direct-plan share (~30%) × a conservative intervention rate | MODIFY |
| Monetization | Per-save fees (thin) or per-user licensing (vague) | Decision-intelligence-as-a-service: licensed to AMCs and platforms per monthly active SIP account, not per save event | MODIFY |
| Demo flow | 7 beats in 90 seconds, persona switch | 5 beats in 75 seconds, single persona, the replay as the centrepiece moment | MODIFY |
| Priya persona | In the demo | In the deck as a guardrail slide, not in the demo — she strengthens the ethical argument but dilutes the demo's pacing | MODIFY |
| LLM follow-up chat | Could-have feature | DELETE — adds regulatory risk, low RICE, not needed for the demo or the thesis | DELETE |
| Account Aggregator | Discussed in the main body | Move entirely to roadmap — it distracts from the MVP story | DELETE from main |
| Evidence engine ML claims | "Quantile gradient boosting" on NAV episodes | DELETE the ML framing — call it "historical replay engine" and explain that 10-13 years of NAV history is used as evidence, not as a training set for a predictive model | DELETE |
| Regime bar visualization | Described but not specified for demo | ADD as the visual climax of the demo — the slider that changes the ranking is the single most memorable moment | ADD |
| "What if I'd paused before?" personal replay | Feature #3 in RICE | ADD as the emotional anchor — this is the moment the user realizes the cost of past panics, using their own SIP's real NAV history | ADD |
| One-sentence thesis | Not articulated | ADD: "A pause button that shows you your own goal" — already in the doc but buried | ADD |
| Conflict-of-interest disclosure | Implicit | ADD explicitly to the deck: "If the right decision is to pause, we help you pause well" — this is the trust differentiator | ADD |

| Card | Shows |
| --- | --- |
| Continue at ₹5,000 | Goal ~90% funded · Monthly strain 23% · "On track if markets return ~8%" |
| Reduce to ₹2,500 | Goal ~60% funded · Monthly strain 11% · "Frees ₹2,500/month, costs ~30 points of goal progress" |
| Pause 3 months | Goal ~87% funded · Monthly strain 0% for 3 months · "Short pause, small cost — about ₹22,000 less at your goal date" |

| Component | Rationale |
| --- | --- |
| Disposable surplus and strain calculations | These are arithmetic on user inputs. No model needed, no uncertainty. |
| Goal progress projections (per option) | Compound growth formula with a disclosed return assumption. Show as a range by varying the return ±2%. |
| Fit score (λ-weighted) | A transparent utility function. The user sets λ. The formula is disclosed. |
| Regime bar and flip thresholds | Closed-form from the fit formula. This is algebra, not ML. |
| Historical replay of the user's SIP | Actual NAV data applied to the user's SIP amount and start date. Pure arithmetic on real numbers. |
| Guardrail routing | Rule-based: reason + drawdown level → path. No learned model. |
| Decision logging | Append-only event log. |

| Candidate | Verdict | Reasoning |
| --- | --- | --- |
| Probability of SIP pause (propensity model) | NOT in MVP | Requires behavioral data we don't have. Becomes useful only after thousands of real interactions. Roadmap item for phase 3. |
| Outcome prediction from drawdown features | NOT as claimed | ~5 independent drawdown episodes in direct-plan history since 2013 is not enough to train a reliable model. Precomputed replay tables provide the same information without the false precision of a "learned" model. |
| Intervention timing optimization | NOT in MVP | Requires A/B testing infrastructure and real outcome data. Phase 3. |
| Personalization of explanation depth | NOT in MVP | Rule-based heuristics (reason type, buffer level) work for MVP. ML personalization requires behavioral data. |
| Anomaly detection on inputs | Maybe phase 2 | Simple range checks and consistency rules cover MVP. Statistical anomaly detection adds value only at scale. |

| Data | Source | Availability | Constraint |
| --- | --- | --- | --- |
| NAV history (per scheme, daily) | MFapi (free, no key) or AMFI bulk download | Available, no SLA | Cache locally; direct-plan history starts ~2013 |
| Fund category and metadata | MFapi | Available | Does not include AUM or expense ratio |
| User financial inputs | Self-reported | Available with friction | Accuracy depends on user honesty; use coarse bands |
| SIP transaction history | Not available standalone | Requires Account Aggregator or partner API | MVP uses self-reported SIP amount and start date |
| Behavioral outcome data | Generated by the product | Available only after launch | This is the future data flywheel |

| Layer | Metric | Target (pilot) | What it tells us |
| --- | --- | --- | --- |
| North Star | Informed Decision Rate | ≥65% | Are users engaging with the information before deciding? |
| Funnel | Alert open rate | ≥20% | Is the trigger compelling? |
| Funnel | Check start rate (of those who open) | ≥60% | Is the entry screen trustworthy? |
| Funnel | Check completion rate | ≥70% | Is the experience worth finishing? |
| Quality | Option diversity (share of checks resulting in each option) | No single option >60% | Is the product genuinely neutral, or is it steering? |
| Quality | Replay view rate | ≥50% of full-path users | Is the differentiating feature being seen? |
| Quality | Slider interaction rate | ≥30% of full-path users | Are users exploring their own priorities? |
| Business | 90-day retained SIP value vs. holdout | +5-10pp among at-risk users | Does the intervention actually retain SIP value? |
| Business | Partner adoption (phase 2) | 1 signed pilot in 12 months | Is this commercially viable? |

| Guardrail | Threshold | Action if breached |
| --- | --- | --- |
| Median time to exit on fast path | ≤45 seconds | Redesign fast path — it's too slow |
| "Felt pressured" in day-30 survey | <5% of respondents | Audit the language and button weights |
| Stop-button reachability (taps from any screen) | ≤2 | If >2, the product is hiding the exit |
| LLM outputs containing "should" or "recommend" | 0% | Guardrail failure — fix the prompt/filter |
| Abandon rate on the options screen | <20% | If higher, the screen is overwhelming or guilt-inducing |
| Ratio of Continue outcomes to all outcomes | Monitor, no threshold | If >80%, investigate whether the product is steering — compare to the base rate of pauses without intervention |

| Revenue stream | Pricing basis | Rationale |
| --- | --- | --- |
| Platform license (Groww, Coin, INDmoney) | ₹2–5 per monthly active SIP account that triggers a check | Platforms benefit from reduced regret-driven churn. They pay for the decision layer, not per retention event. |
| AMC license | Per integration, annual | AMCs want to reduce SIP discontinuations in their schemes. They pay for the data and the intervention infrastructure. |
| Behavioral data insights (anonymized, aggregated) | Subscription | Reason distributions, decision patterns by market regime, intervention effectiveness — valuable to AMCs, distributors, and researchers. |

| Step | Value | Basis | Evidence tag |
| --- | --- | --- | --- |
| Monthly SIP discontinuations + completions | ~50-55 lakh | AMFI data, multiple sources | [F, S4, S7] |
| User-initiated share (excluding completions) | ~50% | Assumption — completions are a significant share | [A] — test with partner data |
| Direct-plan, self-directed share | ~30% | Groww DRHP | [F, S20] |
| Addressable monthly pauses | ~8-9 lakh | Calculated | Derived |
| Intervention trigger rate (drawdown ≥10%) | ~40% in a correction, ~15% in a bull market | Assumption — depends on market regime | [A] |
| Monthly checks triggered (correction) | ~3-4 lakh | Calculated | Derived |
| Annual checks triggered (blended) | ~25-35 lakh | Calculated | Derived |

| # | Attack | Severity | Our answer |
| --- | --- | --- | --- |
| 1 | "A standalone app can't intercept the pause tap. Your demo is fiction." | Critical | "You're right — it can't. That's why our standalone version triggers on pause intent (a drawdown alert or a direct search), not the pause tap. The demo shows the embedded SDK version, which is our phase 2 product. We're honest about this: the standalone is the wedge to prove value, the embedded version is the product. We show both entry points in the prototype." |
| 2 | "This is investment advice. SEBI will shut you down." | Critical | "We never say 'you should.' Every output is conditional: 'If your goal matters most, here's what Continue does.' We pre-select nothing. We show all options with equal weight. The user sets the priority. But you're raising a real risk — we plan to get a legal opinion before any commercial launch, and our architecture is designed so the regulatory surface is small: a scorecard, not a model; consequences, not recommendations." |
| 3 | "What stops Groww from building this in a quarter?" | High | "Nothing stops them from building the screens. But Groww can't be credible when it tells you not to pause — because Groww benefits from your SIP continuing. That's not our opinion; it's the structural economics of a platform that earns from AUM. We don't hold the money, so we don't have that conflict. That credibility is our moat, not the code." |
| 4 | "Your opportunity sizing is all assumptions." | High | "The base number is AMFI data: 50+ lakh SIP discontinuations per month. Everything after that is assumptions, and we've labeled them as such. Our base case is 0.8% of annual SIP flow — deliberately conservative. We'd rather defend a small honest number than a large fake one." |
| 5 | "Where's the ML? You said AI-powered." | High | "The AI is the LLM that explains computed numbers in plain language, adapted to the user's reason and context. We deliberately chose not to build a fake ML model. The scorecard is transparent. The replay uses real NAV data. The LLM narrates. We think this is more honest — and more useful — than training a classifier on synthetic labels and calling it AI." |
| 6 | "Your metric (IDR) just measures engagement, not decision quality." | Medium | "You're right that we can't measure decision quality directly — because there's no ground truth for 'right decision.' IDR measures whether the user engaged with the information before deciding, which is the best proxy we can measure without pretending to know what's correct. We complement it with the 90-day business KPI and six guardrail metrics that detect if the product is drifting toward retention." |
| 7 | "Who pays for this? The economics are thin." | Medium | "B2C is free — that's the trust model. Revenue is B2B: per-active-account licensing to platforms and AMCs. At ₹3 per active SIP account per month across one mid-size platform, that's ₹7+ crore annualized. It's a small SaaS business at first, but the same engine scales to redemption and withdrawal — larger transaction sizes, same architecture." |
| 8 | "Isn't the replay just survivorship bias? You're showing funds that recovered." | Medium | "Good catch. We replay the user's actual fund, not cherry-picked winners. If their fund didn't recover well, the replay shows that honestly. We also note the limitation: 'This is what happened in one past episode. It is not a prediction.' If the replay doesn't show a meaningful gap, we say so — that's a feature, not a bug." |
| 9 | "Users won't fill in their income and obligations." | Medium | "They won't if we ask like a form. That's why we use coarse bands (income in ₹10K brackets, obligations as one number, buffer as 'less than 1 month / 1-3 / 3-6 / 6+'). Our onboarding is 3 screens, ~30 seconds. If the drop-off is still too high, we fall back to a simplified view without the comfort score — the goal impact alone is valuable." |
| 10 | "You're just adding friction to the pause flow." | Medium | "The check is optional — there's a 'Skip, I've decided' button on the first screen with equal visual weight. And the fast path for genuine cash need is under 45 seconds. We're not adding friction; we're adding information. The difference is that friction slows you down, information helps you decide. If users feel it's friction, our guardrail metric ('felt pressured') will tell us, and we'll redesign." |

| Risk | Why it matters | Mitigation |
| --- | --- | --- |
| The product subtly shifts from decision support to retention tool over time, especially under B2B pressure | AMC clients will push for higher continuation rates. This is the existential risk to the credibility moat. | Per-account pricing (not per-save). Guardrail metrics published to clients. An internal "ethical red line" policy: if any client asks for weighted buttons or hidden Stop, we walk. |
| The replay creates hindsight bias — "see, you should have stayed" | The replay can make users feel stupid for considering a pause, which is a form of manipulation | Label every replay: "Past performance is not predictive." Show replays where continuing didn't help if they exist. Never use the replay to argue; use it to illustrate the range of outcomes. |
| Low-buffer users may continue investing when they should pause, because the goal impact scares them | This is the dark-pattern version of the product | The guardrail router sends low-buffer users to the fast path. The comfort score explicitly weights thin buffers. If the product causes someone to keep investing when they can't afford food, it has failed. |
| Privacy concerns about financial data | Income, obligations, and buffer are sensitive | Collect the minimum, use coarse bands, never share individual data with partners, comply with India's data protection law (DPDP Act — confirm specifics). |

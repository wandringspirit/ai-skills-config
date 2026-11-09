---
name: algo-trading-strategy-review
description: Skeptical two-reviewer audit (senior engineer + experienced quant) of an automated / AI trading bot design document — edge, costs, backtest biases, execution and failure handling, ML/LLM component, risk limits, retail broker/regulatory constraints (incl. India LRS for overseas futures), and a falsification-first minimal version. Activate whenever the user asks to review, stress-test or "is this feasible" a trading strategy, trading bot, algo, quant model or execution engine.
---

# Algorithmic Trading Strategy & Bot Review

Purpose: stop the user losing real money to a problem the reviewer missed. The default
posture is **the strategy has no edge until evidence says otherwise**. Encouragement is
not the job; a ranked list of what would kill the project is.

---

## 1. First pass — establish what actually exists

Before judging anything, inventory:

| Question | Why it matters |
|---|---|
| Is there code, data, a backtest, a paper/demo record, a live fill? | Design-only projects get feasibility verdicts, not profitability verdicts |
| Which venue, instrument, broker, connection (CQG/Rithmic/IBKR/etc.), platform? | Costs, latency, data depth and order types all follow from this |
| What horizon does the signal operate on (ms / s / min / hours / days)? | Decides whether retail latency kills it before anything else |
| Where is the "AI"? Read every file, including spreadsheets. | The ML part is often in a side document, not the spec |
| What does the user's existing tooling assume? | Reuse claims ("run it like my other strategies") must be checked against that tooling's invariants |
| Has the existing tooling ever run live or on demo? | Building on an unexercised base compounds risk |
| User's residency, capital, funding route | Legal feasibility can end the project before economics |

## 2. The quant review checklist

1. **Name the edge in one sentence.** Who is on the other side and why do they lose to you?
   If the answer is a risk-management rule (buffer, sizing, stop), there is no edge yet — sizing
   overlays change the distribution of P&L, they do not create expectancy.
2. **Cost floor in ticks.** Round-trip commission + exchange + NFA/regulatory + connection/routing
   fees, divided by tick value. Any "spread capture" target below ~2× this is dead on arrival.
   Example (verify per account): MNQ tick = $0.50; all-in retail round turn ≈ $1.2–2.0 → 2.5–4 ticks.
3. **Adverse selection.** Passive orders fill preferentially when price is about to go through
   them. A touch is not a fill; use a *trade-through* fill rule or MBO queue model.
4. **Bias audit:** look-ahead (features using the decision bar's own OHLC, forecast errors only
   known later, hindsight "optimal action" labels, normalisers fit on full sample, nearest-neighbour
   "analogue" lookups that include the future), survivorship (continuous-contract rolls, delisted
   symbols), selection/overfitting (number of variants tried; keep an experiment ledger; final
   untouched holdout), regime dependence (sample = days, not ticks).
5. **Contemporaneous vs predictive.** A feature that explains the move in the same window is not a
   forecast. Require the signal to predict *after* compute + network + queue latency.
6. **Which claims only data can settle.** Say explicitly: "only a backtest/markout study can settle X",
   "only demo/live fills can settle Y". Never claim to confirm an edge from a design doc.
7. **Baselines.** Compare against: no-trade, random entry with same exits, simplest OFI/momentum
   rule, fixed size without the overlay.

## 3. The engineering review checklist

- Data: depth (L1/MBP/MBO), entitlement, historical availability and cost, timestamp fidelity, gaps.
- Latency budget: signal half-life vs (feed → decision → broker → exchange). From India to CME
  Aurora the network RTT alone is roughly 200+ ms (verify by measuring); a Chicago VPS is ~1 ms.
- Platform fit: can the platform express the order behaviour (modify, cancel/replace, ladders,
  partial reductions, reduce-only)? E.g. Quantower live trading is C# only; Python cannot place orders.
- Order management: idempotent client IDs, partial fills, cancel/fill races, duplicate orders,
  restart reconciliation, unknown order state.
- Failure handling at 3 a.m.: who is awake, where it runs (home PC vs VPS), power/ISP/Windows
  Update, server-side (exchange-held) protective stops, broker-side RMS loss limits and max position.
- Monitoring: heartbeat to phone, position mismatch alert, stale-feed alert, daily P&L alert.

## 4. AI / ML / LLM component

- State exactly what the model outputs (signal, size, price, action) and what label it is trained on.
- **Learned execution policies need a counterfactual fill simulator**; historical market data contains
  no record of what your orders would have done. RL/imitation will exploit simulator flaws.
- Hindsight labels ("best action", "avoidable loss", "missed opportunity") are look-ahead by construction
  unless converted to causal targets.
- LLMs do not belong in a sub-minute decision path: 0.3–5 s latency, non-deterministic, per-call cost,
  can hallucinate. Use them offline (code, research, log triage) only.
- Demand: the model must beat a linear/logistic baseline on untouched data after costs, or it is removed.

## 5. Risk & money management

Require numbers, in currency: max position (contracts) enforced at the broker, per-trade stop,
daily loss halt, max drawdown to stop the project, kill switch that *flattens* (not just cancels).
Write the **worst realistic day**: limit-move / circuit breaker on a held position during a
disconnect, plus a bug that multiplies size. Low day-trade margins make the bug case the dominant tail.

## 6. Practical constraints (always mark "needs verification")

- Broker automation rules, API message/rate limits, order-to-fill ratios.
- Exchange data: non-professional vs professional, non-display (automated) use licensing.
- Running costs vs capital: data + platform + connection + VPS per month as % of capital.
- **India-resident users trading overseas futures:** RBI's LRS FAQ/Master Direction says remittances
  for margins or margin calls to overseas exchanges/counterparties are **not permitted** under LRS.
  Flag as a potential blocker; tell them to confirm with a FEMA-competent CA/lawyer and their AD bank.
  Prop-firm evaluation accounts are a different legal structure but often restrict bots/HFT — check rules.
- **India resident trading through a foreign LLC (e.g. Wyoming LLC + Mercury):** the LLC does not
  automatically cure the LRS issue. Ask: (a) whose name is the broker account in; (b) where did the
  LLC's money come from (LRS remittance from India = ODI; foreign business revenue is different);
  (c) were Form ODI / UIN / Annual Performance Report (due 31 Dec) / FLA filed. Under the FEMA
  Overseas Investment Rules 2022, a resident individual's ODI must be in an operating entity with a
  bona fide business and (per secondary sources) not in a "financial services activity" entity; a
  vehicle whose main activity is trading its own capital is a grey area at best. Also flag: Schedule FA,
  POEM if managed from India, and the US Form 5472 + pro forma 1120 (USD 25k penalty for
  non-filing). Recommend a FEMA-competent CA before funding. Upside: a separate, capped bot account
  is a useful hard loss boundary (futures losses can still exceed equity).
- Tax: classification of trading income, foreign-asset reporting, TCS on remittances (verify).

## 7. Output format the user expects

1. Verdict (2–3 sentences): build as is / reduced version / rethink / drop.
2. Problems ranked critical / major / minor: what's wrong, why it matters, concrete fix.
3. Single riskiest assumption + cheapest fastest test (prefer a notebook over a platform).
4. Minimal first version to paper/demo-trade, with predeclared kill criteria.
5. Unanswered questions the user must answer.
Also say briefly what is genuinely strong so it is kept. Do not soften.

---

## Claude Execution SOP

1. Read every design file in the project folder, including `.xlsx` (openpyxl, `PYTHONIOENCODING=utf-8`)
   — the ML spec is often there. Grep for `LLM|AI|model|learned`.
2. Read any prior review (e.g. a Codex review folder) and **do not repeat it**; add what it missed and
   say where you agree/disagree.
3. If the user points at existing strategy tooling, read its ARCHITECTURE/README and list invariants
   the new design would violate.
4. Verify fees, data entitlements and regulatory claims with WebSearch; label unverified items.
5. Deliver in the format of §7. Offer a published write-up only if it will be shared.

## Gemini (Antigravity) Execution SOP

1. Same discovery order as the Claude SOP: inventory files, read spreadsheets, read prior reviews.
2. Use browser/search tools to confirm broker fees, data licensing and RBI/LRS text; cite sources.
3. Produce the §7 output; never state profitability as confirmed; ask before any external action.

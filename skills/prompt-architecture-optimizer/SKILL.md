---
name: prompt-architecture-optimizer
description: >-
  Systematic prompt engineering, prompt auditing, rubric-based prompt evaluation,
  and advanced multi-agent/reasoning prompt refactoring based on Anthropic, OpenAI,
  and DeepMind research. Activate whenever reviewing user prompts, auditing prompt quality,
  refactoring vague instructions into production prompts, or building multi-agent architectures.
---

# Prompt Architecture & Optimization Framework (`skills/prompt-architecture-optimizer`)

A rigorous, battle-tested framework for auditing, scoring, deconstructing, and upgrading natural language prompts into production-grade, deterministic, and highly nuanced agent instructions.

---

## 1. The Core Prompt Diagnostic Rubric (The 7-Pillar Audit)

Every user prompt, system instruction, or agent directive is evaluated across seven core dimensions on a 1–10 scale:

1. **Clarity of Core Intent (Objective Definition)**:
   - Does the model know *exactly* what success looks like?
   - Is there a singular primary objective or a muddy mix of competing goals?
2. **Context & Target Constraints (Grounding)**:
   - Are the demographic, technical, geographical, or regulatory constraints explicit (e.g., US/UK market, budget limits, tech stack)?
3. **Cognitive Structure & Flow (Formatting & Parsing)**:
   - Is the prompt a "stream-of-consciousness" run-on sentence or cleanly segmented with Markdown headers, bulleted constraints, and XML tags?
4. **Execution Protocol & Rules of Engagement**:
   - Are the rules for agent behavior explicit (e.g., debate rules, scoring rubrics, forbidden behaviors, tone guidelines)?
5. **Output Schema & Deliverable Rigor**:
   - Are exact deliverable formats specified (e.g., Markdown table, JSON schema, P.R.I.C.E. matrix, artifact file)?
6. **Information Completeness vs. Assumptions Gap**:
   - What critical parameters did the user leave unsaid that force the model to hallucinate or guess?
7. **Negative Constraints & Guardrails**:
   - Does the prompt specify what *not* to do (e.g., "no generic advice", "no fluff", "do not skip steps")?

---

## 2. Stream-of-Consciousness vs. Engineered Prompts

### The "Stream-of-Consciousness" Prompt (High Intent, Low Structure):
- Characterized by conversational run-ons, repeated questions ("What can fail? What could happen?"), typos, and implicit instructions.
- **Strength**: High raw signal, reveals authentic underlying anxieties, goals, and emotional drivers.
- **Weakness**: Causes LLM attention drift, risks skipping sub-questions, and creates inconsistent outputs across runs.

### The "Engineered" Prompt Structure (The C.O.R.E. Architecture):
- **C - Context & Role**: Persona definition, market grounding, operational constraints.
- **O - Objective**: Single unambiguous north-star metric or deliverable.
- **R - Rules & Evaluation Rubric**: Strict boundaries, turn limits, scoring formulas, forbidden phrases.
- **E - Expected Output Format**: Exact schema, tables, headers, and artifact destinations.

---

## 3. Multi-Agent & Adversarial Tournament Prompt Patterns

When orchestrating multi-agent debates or tournaments:
- **Explicit Persona Polarization**: Define contrasting philosophies (e.g., Corporate Expenser vs. Urgent Consumer vs. Automation Specialist) so agents do not agree passively.
- **Defined Round Structure**: Name and constrain every round (e.g., Round 1: Pitch, Round 7: Roast, Round 9: Scoring).
- **Objective Mathematical Matrix**: Force numeric scoring (e.g., P.R.I.C.E. matrix, 1–10 scale) rather than qualitative summaries.
- **Single Source of Truth Logging**: Direct outputs into structured artifacts to keep the main conversation focused on actionable decisions.

---

## 4. The Refactoring Protocol: How to Upgrade Any Prompt

1. **Extract Hidden Parameters**: Pull out implicit user desires (e.g., "Should not be cheated" -> Anti-scam ethical guarantee; "Week on week" -> Quantitative WoW/MoM/YoY financial model).
2. **Eliminate Redundancy**: Combine overlapping queries ("What can fail?" + "What's that could happen?").
3. **Add Boundary Conditions**: Define pricing tiers, time-to-build caps, and geographic scope (e.g., US state tax + UK VAT).
4. **Define Deliverable Schema**: Request specific tables, graphs, and step-by-step action plans.

---

## Gemini (Antigravity) Execution SOP

- When a user asks to review, evaluate, or optimize a prompt:
  1. Perform an honest, multi-dimensional audit using the 7-Pillar Rubric (highlighting both strong intuitive signals and structural friction).
  2. Break down the specific failure risks of the original prompt (where weaker models would fail or skip details).
  3. Provide a side-by-side comparison between the original prompt and an "Optimized Production-Grade Prompt".
  4. Explain *why* the upgraded prompt yields vastly superior, deterministic, and reproducible outputs.
  5. Provide a reusable template or prompt-engineering takeaway the user can apply immediately.

---

## Claude Execution SOP

- When executing in Claude:
  1. Load this skill and apply the 7-Pillar Diagnostic Rubric.
  2. Analyze attentional distribution and token saliency in Claude's context window.
  3. Present the refactored XML-tagged prompt (`<context>`, `<instructions>`, `<constraints>`, `<output_format>`).
  4. Highlight prompt engineering best practices for Anthropic models.

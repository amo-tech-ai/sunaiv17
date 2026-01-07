
# Wizard Screen 3: System Selection — Implementation Plan

**Progress Tracker:** Step 3 of 5 | Status: Ready for Dev | Priority: P0 Critical
**Estimated Implementation:** 4-6 hours
**Dependencies:** Step 2 (Diagnostics) Completion, Industry Packs, Edge Functions

---

## 1. Executive Summary

Screen 3 is the **Prescription Phase**. After diagnosing the problems in Step 2, the AI now recommends specific "Systems" (products) to solve them.

**The Upgrade:**
Instead of a static list, this screen uses the **Optimizer Agent** (`gemini-3-pro-preview`) running on Supabase Edge Functions to:
1.  **Rank** systems based on the user's Step 2 answers (Priorities).
2.  **Generate** custom ROI text specific to their Industry and Service inputs.
3.  **Enforce** a selection limit (Max 3) to simulate a realistic rollout strategy.

**Core Value:** The user isn't buying "AI"; they are buying a solution to the specific pain point they just admitted to having.

---

## 2. Three-Panel Layout Architecture

### Left Panel (20%) — Context & Diagnosis
*   **Content:**
    *   **"Priorities Identified":** A summary list of the answers selected in Step 2 (e.g., "High Return Rate", "Slow Lead Response").
    *   **Industry Context:** The locked Industry badge.
*   **Purpose:** Reminds the user *why* these specific systems are being recommended.

### Center Panel (50%) — The System Grid
*   **Content:**
    *   **Dynamic Title:** "Recommended Strategy for [Business Name]"
    *   **System Cards (5-6 total):**
        *   **Title & Description:** From Industry Pack.
        *   **"Recommended" Badge:** Dynamic boolean from Optimizer Agent.
        *   **ROI Metric:** Dynamic text (e.g., "Projected to save 20hrs/week").
        *   **Selection State:** Checkbox/Border highlight.
    *   **Action Bar:** "Selected 2/3" counter and "Next: Readiness Check" button.
*   **Behavior:** Card selection toggles state. Button disabled if 0 selected.

### Right Panel (30%) — ROI Projection
*   **Role:** The "Financial Analyst".
*   **Content:**
    *   **Streaming Insight:** As systems are selected, the AI explains the *cumulative* value.
    *   *Example:* "By combining **Lead Gen** with **WhatsApp Concierge**, you solve the volume problem AND the response time problem simultaneously."

---

## 3. AI Agent: The Optimizer

### Agent Profile
*   **Name:** Optimizer Agent
*   **Model:** `gemini-3-pro-preview`
*   **Capabilities:** **Reasoning**, **Structured Outputs**.
*   **Role:** Solution Architect.

### Logic Flow
1.  **Input:**
    *   `industry` (Step 1)
    *   `priorities` (Step 2 Answers)
    *   `painPoints` (Derived tags from Step 2)
    *   `industryPack` (Static definitions)
2.  **Processing (Gemini Thinking):**
    *   Match `painPoints` to `System.capabilities`.
    *   If `painPoint == 'Slow Response'`, Rank `WhatsApp Concierge` #1.
    *   Reword the generic ROI string ("Increases leads") to be specific ("Increases leads for your [Industry] business").
3.  **Output:** JSON List of Systems with `recommended` flags and custom `roi_text`.

---

## 4. Real-World Examples

### Scenario A: Real Estate Agent
*   **Inputs:**
    *   Industry: `Real Estate`
    *   Pain Point: "I miss leads on weekends."
*   **Optimizer Output:**
    *   **System:** WhatsApp Lead Concierge
    *   **Rank:** #1 (Recommended)
    *   **ROI Text:** "Auto-responds to weekend Zillow inquiries in <2 mins, recovering ~15% of lost deals."

### Scenario B: Fashion Brand
*   **Inputs:**
    *   Industry: `Fashion`
    *   Pain Point: "Returns are killing margins."
*   **Optimizer Output:**
    *   **System:** Fit & Sizing Concierge
    *   **Rank:** #1 (Recommended)
    *   **ROI Text:** "Reduces return rates by guiding customers to the right size pre-purchase."

---

## 5. Multistep Implementation Prompts

Use these prompts sequentially to build the feature.

### Prompt 1: The Optimizer Agent (Edge Function)
```text
Update `supabase/functions/optimizer/index.ts`.
- Ensure it uses `gemini-3-pro-preview`.
- Inputs: `industry`, `priorities` (Step 2 answers), `painPoints`.
- Import `getIndustryPack` from `../_shared/industryPacks.ts`.
- Logic:
  1. Load the Industry Pack systems.
  2. Use Gemini to rank them based on the `priorities`.
  3. Mark top 2-3 as `recommended: true`.
  4. Rewrite `revenueImpact` string to be specific to the user's context.
- Output Schema:
  {
    recommended_ids: string[],
    custom_impacts: Record<string, string> // systemId -> text
  }
```

### Prompt 2: Frontend UI (System Cards)
```text
Update `components/wizard/Step3Systems.tsx`.
- Layout: Grid of cards (1 col mobile, 2 col desktop).
- Props: `selectedSystems`, `recommendations` (from AI).
- Card Component:
  - Title (Bold Serif)
  - Description (Sans)
  - "Recommended" Badge (Top right, Accent color, only if AI says so).
  - "Revenue Impact" (Bottom, bold, uses AI text if avail, else default).
- Interaction: Clicking card toggles selection. Max 3.
```

### Prompt 3: Integration & State
```text
Update `WizardFlow.tsx` and `useWizardState.ts`.
- Ensure `optimizer` service call triggers on mount of Step 3.
- Store `recommendations` in `aiState`.
- Pass `priorities` from Step 2 to the Optimizer service.
- Render `<Step3Systems />` for step 3.
```

---

## 6. Success Criteria & Verification

| Criteria | Metric | Verification Method |
| :--- | :--- | :--- |
| **Relevance** | >90% Match | If Step 2 answer was "Slow Response", the "Chatbot/WhatsApp" system MUST be recommended. |
| **Performance** | < 5s Latency | Screen should load "Skeleton Cards" immediately, then "pop" in recommendations once AI finishes. |
| **Constraint** | Max 3 | UI must prevent selecting a 4th system. |
| **Persuasion** | ROI Specificity | ROI text must mention the specific industry (e.g., "Tenants" for Real Estate, "Shoppers" for Retail). |

---

## 7. Progress Tracker

- [ ] **Edge Function:** `optimizer` deployed with `gemini-3-pro`.
- [ ] **Schema:** `industryPacks.ts` contains valid system IDs that match `types.ts`.
- [ ] **UI:** Skeleton loading state implemented for the ~3s AI delay.
- [ ] **Validation:** Ensure `custom_impacts` map keys match system IDs exactly.
- [ ] **Mobile:** Cards stack vertically and touch targets are >44px.

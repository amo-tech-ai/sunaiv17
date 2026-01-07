
# Phase 2: Screen 4 Advanced Implementation (Intelligence Upgrade)

**Progress Tracker:** Step 4 of 5 (Advanced Phase)
**Status:** Pending Core Completion
**Goal:** Upgrade the "Static Summary" to a "Persuasive Strategic Brief" using Deep Reasoning and Predictive Analytics.
**AI Model:** `gemini-3-pro-preview` (Thinking Mode, Code Execution)

---

## 1. Executive Summary & Strategic Intent

In this phase, Screen 4 transforms from a simple confirmation page into a **High-Value Sales Asset**.
*   **From:** "Here is what you selected."
*   **To:** "Here is the projected impact of your strategy on Revenue, Speed, and Efficiency."

**Key Upgrade:** The **"Projected Impact Scorecard"**. We use AI to predict specific KPI improvements (e.g., "+40% Efficiency") based on industry benchmarks and the user's specific inputs.

---

## 2. Gemini 3 Features & Tools Strategy

| Feature | Usage on Screen 4 | Value Add |
| :--- | :--- | :--- |
| **Gemini 3 Pro** | **Strategic Narrative** | Writes a persuasive, consultant-grade brief (not just a summary). |
| **Thinking Mode** | **Logic Connection** | Reasons: "User has High Returns (Pain) + Shopify (Service). Therefore, 'Fit Intelligence' is the critical lever." |
| **Code Execution** | **Impact Calculation** | Uses Python to calculate projected KPI gains based on industry benchmarks (No hallucinations). |
| **Structured Output** | **Chart Rendering** | Returns strict JSON for `Recharts` visualization. |

---

## 3. Real-World Examples & Target Industries

### Industry A: Fashion E-commerce (DTC)
*   **Context:** Uses Shopify, Instagram. Pain: High Returns.
*   **Strategic Narrative:** "In DTC fashion, returns are the silent profit killer. By deploying **Fit Intelligence**, we move from reactive refunds to proactive sizing guidance."
*   **Impact Scorecard:**
    *   *Efficiency:* +40% (Auto-drafting content).
    *   *Margins:* +15% (Reduced return logistics).

### Industry B: Real Estate Brokerage
*   **Context:** Uses WhatsApp. Pain: Slow Lead Response.
*   **Strategic Narrative:** "Real estate is won in the first 5 minutes. The **WhatsApp Concierge** ensures every Zillow inquiry gets an instant, qualified response, 24/7."
*   **Impact Scorecard:**
    *   *Lead Velocity:* 3x (Instant reply vs 4hr avg).
    *   *Admin Time:* -60% (AI pre-qualification).

### Industry C: Tourism / Experiences
*   **Context:** Uses Booking.com. Pain: Manual Itineraries.
*   **Strategic Narrative:** "Your guests want experiences, not PDF attachments. The **Itinerary Builder** digitizes your delivery, opening up upsell opportunities pre-trip."
*   **Impact Scorecard:**
    *   *Revenue/Guest:* +25% (Automated upsells).
    *   *Ops Load:* -50% (Automated confirmations).

---

## 4. UI Upgrades (Center Panel)

The Center Panel receives a significant visual upgrade:
1.  **Strategic Narrative Section:** Replaces the template text with Pro-generated insights.
2.  **Projected Impact Scorecard:** New visual component using `Recharts`.
    *   **Visual:** 3 Horizontal Bar Charts (Efficiency, Velocity, Revenue).
    *   **Data:** "Before AI" (Gray) vs "After AI" (Accent Color).
    *   **Animation:** Bars grow on load.

---

## 5. AI Agent: The Summary Agent (Advanced)

### Agent Profile
*   **Model:** `gemini-3-pro-preview`
*   **Tools:** `codeExecution`, `thinkingConfig`.

### Code Execution Logic (Python)
Instead of LLM guessing numbers, we run a script:
```python
def calculate_impact(industry, systems, current_maturity):
    # Industry Benchmarks (Hardcoded logic for consistency)
    base_impact = 10
    if "lead_gen" in systems: base_impact += 30
    if "crm_autopilot" in systems: base_impact += 20
    
    # Adjust for maturity (Lower maturity = Higher relative impact)
    impact_multiplier = 1 + ((5 - current_maturity) * 0.1)
    
    return int(base_impact * impact_multiplier)
```

---

## 6. Implementation Prompts (Sequential)

### Prompt 1: Upgrade Edge Function (Pro + Logic)
```text
Update `supabase/functions/summary/index.ts`.
- Switch model to `gemini-3-pro-preview`.
- Enable `thinkingConfig: { thinkingBudget: 2048 }`.
- Enable `tools: [{ codeExecution: {} }]`.
- **Logic Update:**
  1. Use Thinking to draft a 2-paragraph persuasive narrative connecting Step 2 Pain to Step 3 Systems.
  2. Use Code Execution to calculate 'Projected Impact' percentages for Efficiency, Velocity, and Revenue based on the selected industry.
- **Output Schema Update:** Include `impactScores: { efficiency: { before, after, label }, velocity: { before, after, label }, revenue: { before, after, label } }`.
```

### Prompt 2: UI Upgrade (Impact Scorecard)
```text
Update `components/wizard/Step4Summary.tsx`.
- Import `{ BarChart, Bar, XAxis, YAxis, ResponsiveContainer }` from 'recharts'.
- Add a new section below the Narrative: "Projected Impact".
- Create `ImpactScorecard` component:
  - Visualizes "Before" (Current State) vs "After" (AI Implementation).
  - Use `sun-tertiary` color for 'Before' and `sun-accent` for 'After'.
  - Animates the bar width on mount.
```

### Prompt 3: Narrative Polish
```text
Refine the System Prompt in `supabase/functions/summary/index.ts`:
- Role: "Senior Strategic Partner".
- Tone: "Professional, Encouraging, Data-Driven".
- Requirement: "Explicitly reference the client's 'Business Name', 'Industry', and 'Selected Services' in the narrative."
```

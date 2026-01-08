
# Screen 2: Industry Diagnostics — Enhancement Plan (v2.0)

**Status:** In Progress
**Goal:** Transform Screen 2 from a generic survey into a **business clarity & sales alignment engine**.
**Focus:** Surface real pain points, align them to revenue/time, and make Screen 3 recommendations feel inevitable.

---

## 1. Executive Summary

Screen 2 builds directly on the "Truth Baseline" established in Screen 1. Instead of technical configuration, it asks:
> *"What is blocking my business from saving time, making more money, and growing to the next level?"*

It uses **Gemini 3 Pro** (Reasoning) and **Search Grounding** to generate industry-specific options that feel "safe" and "honest" to the user, ensuring the transition to System Selection (Screen 3) is frictionless.

---

## 2. Progress Tracker

| Task | Description | Status |
| :--- | :--- | :--- |
| **1. Architecture** | Define 5-Block Question Structure | ✅ Complete |
| **2. Data Model** | Update `types.ts` for Priority & Explanations | ✅ Complete |
| **3. Content** | Rewrite `industryPacks.ts` with High-Signal Options | ✅ Complete |
| **4. AI Logic** | Ensure `extractor` agent prioritizes these questions | ✅ Complete |
| **5. UI/UX** | Update `Step2Diagnostics.tsx` for new layout | ✅ Complete |
| **6. Integration** | Verify mapping to Screen 3 Systems | 🟡 Pending Verification |

---

## 3. Screen Structure & UX

The screen is divided into 4 visual blocks. This structure remains constant, but the data injected (Questions/Options) changes based on the Industry locked in Screen 1.

### Block 1: The North Star (Single Select)
**Visual:** Large Cards.
**Purpose:** Forces the user to pick ONE primary goal. Defines the "Theme" of the Roadmap.
**Question:** "What is your absolute priority for the next quarter?"

### Block 2: Revenue Friction (Multi-Select)
**Visual:** Checkbox List.
**Purpose:** Identifies where money is being lost. Maps to Revenue Systems.
**Question:** "Where are you losing money right now?"

### Block 3: Time Blockers (Multi-Select)
**Visual:** Checkbox List.
**Purpose:** Identifies operational drag. Maps to Efficiency Systems.
**Question:** "What creates the most manual work for your team?"

### Block 4: Scale Readiness (Single Select)
**Visual:** Slider / Buttons.
**Purpose:** Calibrates the aggression of the rollout plan.
**Question:** "How fast do you want to implement these changes?"

---

## 4. Logic & System Mapping (Fashion Example)

| User Selection (Pain) | Pain Type | Screen 3 System | Priority Weight |
| :--- | :--- | :--- | :--- |
| **High traffic, low add-to-cart** | Conversion | Revenue Conversion Suite | High |
| **Abandon checkout** | Conversion | CRM Autopilot (Recovery) | High |
| **Return rates** | Margins | Fit & Sizing Intelligence | Critical |
| **Ad costs rising** | Acquisition | Strategic Content Engine | Medium |
| **VIPs not buying** | Retention | CRM Autopilot | Medium |
| **Sizing questions** | Support | WhatsApp/Chat Concierge | High |
| **Content creation** | Operations | Strategic Content Engine | High |
| **Managing inventory** | Operations | Inventory Prediction | Medium |

---

## 5. AI Explanation Snippets (Right Panel)

When a user hovers or selects an option, the Right Panel Consultant validates their choice.

*   **If "Return Rates" selected:** "Returns in fashion are often a data problem, not a product problem. We need to solve sizing confusion pre-purchase."
*   **If "Sizing Questions" selected:** "Your support team shouldn't be answering basic sizing queries. Automating this frees up 20+ hours a week."
*   **If "Respond too slowly" (Real Estate) selected:** "Speed to lead is the #1 driver of conversion in real estate. 5 minutes of delay can cost the commission."

---

## 6. Implementation Notes

**Data Source:** `industryPacks.ts` contains the raw text for these questions mapped by `IndustryType`.
**State Management:** Answers are stored as an array of objects: `{ id: string, label: string, category: 'revenue' | 'time' }`.
**Edge Function:** Passes these arrays to the Optimizer agent. The agent uses the Mapping Table logic to determine the recommended boolean for Screen 3.

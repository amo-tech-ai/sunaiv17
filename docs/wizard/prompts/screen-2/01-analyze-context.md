
# PROMPT 01 — ANALYZE SCREEN 1 CONTEXT (FOUNDATION)

**Role:** Senior Business Consultant & Data Architect
**Goal:** Establish the "Business Reality Snapshot" structure that must be passed to Screen 2.
**Input:** Completed Step 1 Context.
**Output:** Structured JSON Object (Persisted to State).

---

## 1. THE PROBLEM
Previously, the "Business Reality" was a loose concept. It must now be a concrete JSON object saved in `AppState` so Screen 2 (Diagnostics) can read it.

## 2. THE TASK
Analyze the raw inputs from Step 1 and generate a structured `analysis` object.

**Input Data:**
*   **Business URL:** `https://...`
*   **Detected Industry:** (e.g., `Fashion`)
*   **Services:** (e.g., `[Shopify, Instagram]`)

**Processing Logic:**
1.  **Derive Type:** If Industry is "Fashion" and Service is "Shopify", Type = "DTC Brand".
2.  **Derive Revenue Model:** If "SaaS", Model = "Recurring Subscription".
3.  **Identify Friction:** If "WhatsApp" is used but no "CRM", Friction = "Lead Leakage".

## 3. REQUIRED OUTPUT STRUCTURE (JSON)
You must ensure this specific object is created and saved to `wizard_sessions` -> `step_data` -> `analysis`:

```typescript
interface BusinessAnalysis {
  detected_industry: string; // "fashion"
  business_model: string;    // "High-volume DTC"
  maturity_score: number;    // 1-5 (Calculated based on tech stack depth)
  
  // The "Snapshot" used by Screen 2
  observations: {
    revenue_mechanic: string; // "Impulse buys on social"
    likely_time_waste: string; // "Managing returns manually"
    scalability_risk: string; // "Support inbox overload"
  };
}
```

## 4. INTEGRATION RULE
**CRITICAL:** This `analysis` object MUST be passed as an argument to the `extractor` function in Prompt 02/03. Do not rely on "Industry" string alone.

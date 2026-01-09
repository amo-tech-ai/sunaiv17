# MAPPING: PAIN POINT → SYSTEM ID

**Criticality:** 🔴 High (Application Breaking)
**Purpose:** Ensure every problem selected leads to a solution.

---

## 1. THE DATA CHAIN

1.  **Step 2 (Selection):** User selects "High Returns".
    *   Underlying Data: `{ label: "High Returns", mapped_system_id: "whatsapp_assistant" }`
    *   *Note: In Fashion pack, `whatsapp_assistant` acts as the "Fit Concierge".*

2.  **Step 3 (Recommendation):**
    *   System looks up `whatsapp_assistant` in the Global System Registry.
    *   Result: Displays "Fit & Sizing Concierge" card.

---

## 2. VALIDATION RULES

The **Extractor Agent** (Edge Function) must run a final validation pass before sending JSON to the frontend:

1.  **Existence Check:** Iterate through all selected options.
2.  **Lookup:** Verify `option.mapped_system_id` exists in `types.ts` / `SYSTEMS` array.
3.  **Fallback:**
    *   IF `mapped_system_id` is invalid/missing:
    *   **Action:** Remap to `conversion_booster` (Safe default).
    *   **Log:** Error "Invalid System Mapping in Pack".

---

## 3. PREVENTION

*   **Static Typing:** `IndustryPack` interface enforces string types.
*   **Test Suite:** Unit test should verify that every ID in `data/packs/*.ts` matches an ID in `SYSTEMS`.
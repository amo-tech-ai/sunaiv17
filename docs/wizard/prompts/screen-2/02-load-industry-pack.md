# LOADING INDUSTRY PACKS

**Role:** Backend Logic (Edge Function)
**Task:** Select and validate the correct data module.

---

## 1. SELECTION LOGIC

The `extractor` Edge Function performs a lookup based on the `industry` string.

```typescript
import { FASHION_PACK } from "../../data/packs/fashion";
// ... imports

const PACK_MAP = {
  'fashion': FASHION_PACK,
  'real_estate': REAL_ESTATE_PACK,
  // ...
};

const selectedPack = PACK_MAP[userIndustry] || GENERIC_PACK;
```

---

## 2. VALIDATION CHECKLIST

Before generating the form, the system validates the Pack integrity:

1.  **System Mapping:** Do all `mapped_system_id` values in the pack exist in the global `SYSTEMS` registry?
2.  **Structure:** Does the pack contain all 4 required sections (Focus, Pain, Time, Readiness)?
3.  **Content:** Are there at least 3 options per multi-select question?

---

## 3. DYNAMIC INJECTION

The AI Agent does **not** write questions from scratch. It acts as a **Selector**.

*   **Input:** User Context + Industry Pack (Raw Data).
*   **Process:** The AI reviews the Pack options and selects the top 5 most relevant options for this specific user.
*   **Constraint:** The AI cannot invent options that are not in the Pack (to ensure System mapping works).
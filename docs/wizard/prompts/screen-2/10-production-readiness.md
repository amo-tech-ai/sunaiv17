
# PROMPT 10 — PRODUCTION READINESS CHECK (SCREEN 2)

**Role:** Production Auditor
**Goal:** Verify Screen 2 is safe, stable, and valuable before launch.

---

## 1. SAFETY CHECKLIST
- [ ] **No Hallucinations:** Verify the AI never invents a System ID that doesn't exist in `types.ts`.
- [ ] **Fallback Active:** If `industry` is undefined or "Other", does it load `GENERIC_PACK` successfully?
- [ ] **Error Boundary:** If the Edge Function times out (30s+), does the UI show a "Retry" button or fallback to static questions?

## 2. DATA INTEGRITY
- [ ] **Mapping:** Verify that every possible answer in `INDUSTRY_PACKS` has a valid `mapped_system_id`.
- [ ] **Persistence:** Verify that refreshing the page on Screen 2 does not lose the generated questions (Cache them in `wizard_sessions` or LocalStorage).

## 3. UX POLISH
- [ ] **Latency:** Is the "Consultant is analyzing..." skeleton loader visible for at least 2s to prevent layout shift?
- [ ] **Mobile:** Do the Multi-Select cards stack correctly on iPhone SE width (320px)?
- [ ] **Hover:** Does the Right Panel update instantly (no lag) on hover?

## 4. CONTENT QUALITY
- [ ] **Tone:** Are the AI explanations ("Why this matters") professional? (No "Hey there!", No emojis).
- [ ] **Relevance:** If I select "Real Estate", do I see "Leads" questions, not "Shopping Cart" questions?

## 5. FINAL VERDICT
*   **Pass:** All checks green. Deploy.
*   **Fail:** Any critical safety or data issue. Fix immediately.

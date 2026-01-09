
# PROMPT 10 — PRODUCTION READINESS CHECKLIST (SCREEN 2)

**Role:** Production QA & Release Engineer
**Goal:** Final verification before deploying Screen 2 logic.
**Standard:** Zero hallucinations, strict schema compliance, infallible fallbacks.

---

## 1. DATA INTEGRITY & SCHEMA (CRITICAL)

### ✅ Database Write Check
- [ ] **Schema Match:** Verify code writes to `wizard_answers` using `screen_id` and `data` columns.
- [ ] **No Legacy Columns:** Confirm NO references to `question_id`, `answer_value`, or `metadata` exist in Screen 2 save logic.
- [ ] **Upsert Logic:** Verify writes use a unique constraint on `(session_id, screen_id)` to prevent duplicate rows.

### ✅ System ID Validation
- [ ] **Strict Mapping:** Every option in the `extractor` output MUST have a `mapped_system_id`.
- [ ] **Catalog Existence:** Every `mapped_system_id` must exist in the `SYSTEMS` constant (or database table).
- [ ] **No Nulls:** The UI must never receive `null` or `undefined` for a system ID.

---

## 2. AI SAFETY & FALLBACKS

### ✅ Hallucination Prevention
- [ ] **Pack Constraint:** Verify the AI cannot output options *not* present in the Industry Pack.
- [ ] **Generic Fallback:** If `industry` is null/unknown, does `GENERIC_PACK` load instantly?
- [ ] **Empty Analysis:** If Screen 1 analysis is missing, does Screen 2 still render using defaults?

### ✅ Edge Function Resilience
- [ ] **Timeout Handling:** If `extractor` takes >10s, does the UI show a retry button or load local static fallback?
- [ ] **JSON Strictness:** Is the Edge Function output validated via Zod before reaching the client?

---

## 3. UX & INTERACTION

### ✅ Layout & Responsive
- [ ] **Mobile Touch:** Are multi-select cards at least 48px high on mobile?
- [ ] **No Hover Dependency:** Do explanations appear on *Selection* (for touch devices) as well as Hover?
- [ ] **Scroll Lock:** Does the "Continue" button stay visible/reachable on small screens?

### ✅ Content Quality
- [ ] **Tone Check:** Are explanations professional ("This impacts margin") vs generic ("This is bad")?
- [ ] **Relevance:** If `selectedServices` included "WhatsApp", does at least one question mention messaging?

---

## 4. SECURITY (RLS)

- [ ] **Tenant Isolation:** Can a user strictly ONLY read/write their own session data?
- [ ] **Anon Access:** If allowing anonymous start, is the session token handled correctly to prevent data leaks?

---

## 5. FINAL DEPLOYMENT VERDICT

If **ANY** box above is unchecked:
❌ **STOP.** Do not deploy. Fix the specific failure.

If **ALL** boxes are checked:
✅ **GO.** Screen 2 is Production-Ready.

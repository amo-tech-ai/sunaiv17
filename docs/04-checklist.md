
# SunAI Agency — Launch Readiness Audit & Checklist

**Date:** Current
**Auditor:** Gemini 3 Pro (Product & Engineering Lead)
**Target:** Public Beta Launch

---

## 1. Executive Summary

SunAI Agency currently exists as a **High-Fidelity "Thick Client" Prototype**, not a Production SaaS.

While the Frontend UX and AI Agent logic are exceptionally strong (scoring 90%+), the **Backend and Security infrastructure is completely missing** from the client-side code. The application currently relies on `localStorage` for persistence and directs Client-Side API calls for AI, which exposes API keys.

**Current State:** 🟡 **Internal Demo Ready**
**Target State:** 🔴 **Not Ready for Public Launch**

---

## 2. Readiness Scorecard

| Category | Score | Status | Key Findings |
| :--- | :---: | :---: | :--- |
| **Product & UX** | **92** | ✅ Ready | Excellent 3-panel flow. Polished UI. Clear value prop. |
| **AI & Agents** | **95** | ✅ Ready | Best-in-class use of Gemini 3 (Thinking, Streaming, Schema). |
| **Frontend Code** | **88** | ✅ Ready | Clean React/Vite structure. Good component isolation. |
| **Backend Data** | **10** | 🔴 Blocker | Relies on `localStorage`. No Supabase integration found in code. |
| **Security** | **0** | 🔴 Blocker | API Key usage in `client.ts` is client-side. No Auth. |
| **Observability** | **20** | ⚠️ Risk | No error logging (Sentry) or usage tracking. |

---

## 3. Critical Blockers (Must Fix Before Launch)

### 🚨 1. Security: API Key Exposure
**Location:** `services/gemini/client.ts`
**Issue:** `apiKey: process.env.API_KEY` is bundled into the client-side JavaScript. Any user can Inspect Element -> Network Tab and steal your Gemini quota.
**Fix:** Move all `ai.models.generateContent` calls to **Supabase Edge Functions** (or a Proxy). The client should call the backend, and the backend holds the Key.

### 🚨 2. Data Persistence: The "Refresh" Problem
**Location:** `App.tsx` / `localStorage`
**Issue:** Data is stored in the browser. If a user clears cache, switches devices (Mobile -> Desktop), or uses Incognito, **all progress is lost**.
**Fix:** Integrate Supabase Auth (`@supabase/auth-helpers-react`) and Database (`postgres`). Sync `AppState` to a `projects` table on every step completion.

### 🚨 3. Missing Auth & User Accounts
**Location:** Global
**Issue:** There is no "Sign Up" or "Login". A public launch requires user identity to save data and (eventually) charge for services.
**Fix:** Implement a specific "Sign Up to Save Strategy" gate, ideally after Step 5 (The "Aha!" moment).

---

## 4. Recommended Improvements (Post-Launch)

*   **Mobile Optimizations:** The 3-panel layout stacks on mobile. Ensure the "Intelligence Panel" (Right) doesn't get lost at the bottom of the scroll, as it contains critical trust-building context.
*   **Rate Limiting:** Once backend is live, implement strict rate limits per IP/User to prevent abuse of the expensive `gemini-3-pro` (Thinking) model.
*   **Error Boundaries:** Wrap the Wizard in a React Error Boundary. If the AI fails (500 error), the UI currently might hang or show a raw error. Add a "Retry" UI.

---

## 5. Final Launch Checklist

### Phase A: Architecture & Security (The "Plumbing")
- [ ] **Init Supabase:** Create project, set up `auth` and `db`.
- [ ] **Migrate AI:** Move `services/gemini/*.ts` logic to Edge Functions.
- [ ] **Secure Keys:** Remove `API_KEY` from Vite env. Set it in Supabase Vault.
- [ ] **RLS Policies:** Ensure users can only read/write their own wizard data.

### Phase B: Product & UX
- [ ] **Auth Gate:** Add "Create Account" modal before viewing the full Dashboard.
- [ ] **Empty States:** Ensure Dashboard tabs (Tasks/Roadmap) look good if AI returns 0 items.
- [ ] **Loading Skeletons:** Verify `Step5Plan` loading state matches the 10-20s latency of Thinking models.
- [ ] **404 Page:** Custom error page for broken links.

### Phase C: Business & Legal
- [ ] **Terms of Service:** Disclaimer that "AI advice is for informational purposes only."
- [ ] **Privacy Policy:** Disclosure on how business data is processed by Google/Gemini.
- [ ] **Support Link:** A way to contact humans if the AI hallucinations.

### Phase D: Final Polish
- [ ] **Favicon & Meta:** Ensure `metadata.json` and `index.html` have production titles/descriptions.
- [ ] **Console Cleanup:** Remove `console.log` debugging from `orchestrator.ts`.
- [ ] **Cross-Browser:** Test on Safari (iOS) and Chrome (Desktop).

---

## 6. Final Verdict

### 🔴 Not Ready for Public Launch

**Reasoning:**
While the **SunAI Agency** is a stunning demonstration of Gemini 3's capabilities, it is currently architected as a **single-player, local-only demo**. Launching it publicly now would result in:
1.  **Security Incidents** (Stolen API Keys).
2.  **Data Loss** (Users losing their roadmaps).
3.  **Abuse** (Unlimited unauthenticated access to your AI quota).

**Path to Green:**
Focus strictly on **Phase A (Architecture)** of the checklist. Once the AI calls are proxied through a backend and Auth is in place, the product is an immediate **GO** for launch.

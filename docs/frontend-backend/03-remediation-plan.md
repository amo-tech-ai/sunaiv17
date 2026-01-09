
# 03. Audit Remediation Plan

**Ref:** Original Plan 20
**Goal:** Move from "Prototype" to "Production" in 3 phases.

---

## Phase 1: Critical Plumbing (Persistence & Security)
**Timeline:** Days 1-3
**Goal:** Secure the app and prevent data loss.

1.  **Secure Analyst Agent:**
    *   Create `supabase/functions/analyst/index.ts`.
    *   Move logic from `services/gemini/analyst.ts` to Edge Function.
    *   Update frontend to use `supabase.functions.invoke('analyst')`.
2.  **Database Migration:**
    *   Refactor `useWizardState` hook.
    *   **Mount:** Check for active session. If yes, fetch `wizard_sessions`.
    *   **Update:** On `nextStep`, perform `upsert` to `wizard_sessions` and `wizard_answers`.
3.  **Auth Gate:**
    *   Wrap `Dashboard` route in a `RequireAuth` component.
    *   Redirect unauthenticated users to a Login screen after Wizard Step 5.

## Phase 2: Dashboard Real Data (Hydration)
**Timeline:** Days 4-6
**Goal:** Remove all mocks.

1.  **Projects Tab:**
    *   Connect `useProjects` to `projects` table.
    *   Implement `createProject` and `updateStatus` functions.
2.  **Analytics Tab:**
    *   Connect `useAnalytics` to `invoices` and `payments` tables.
    *   Create SQL views for aggregation (Revenue by Month).
3.  **Tasks Tab:**
    *   Connect `TaskBoard` to `tasks` table.
    *   Ensure tasks generated in Wizard Step 5 are inserted into DB.

## Phase 3: Polish (Realtime & Error Handling)
**Timeline:** Days 7-8
**Goal:** Professional grade UX.

1.  **Realtime Sync:**
    *   Add `supabase.channel` listeners to `useTasks` and `useCRM`.
    *   Ensure multi-user updates reflect instantly.
2.  **Error Boundaries:**
    *   Wrap major sections in React Error Boundaries to catch AI failures gracefully.
3.  **Retry Logic:**
    *   Add exponential backoff to `services/api.ts` for flaky AI calls.


# 02. Component Status Matrix

**Ref:** Original Plan 19
**Context:** Detailed breakdown of UI vs Data readiness.

## 🟢 Legend
*   🟢 **Complete:** Fully wired to DB/Edge.
*   🟡 **Partial:** UI exists, logic mocked or local.
*   🔴 **Missing:** Planned but code does not exist.

---

## 1. Core Wizard Components

| Component | UI | AI | DB | Notes |
| :--- | :---: | :---: | :---: | :--- |
| `Step1Context.tsx` | 🟢 | 🔴 | 🔴 | `analyst.ts` needs migration to Edge. |
| `Step2Diagnostics.tsx` | 🟢 | 🟢 | 🔴 | Needs to write to `wizard_answers`. |
| `Step3Systems.tsx` | 🟢 | 🟢 | 🔴 | Needs to write to `project_systems`. |
| `Step4Summary.tsx` | 🟢 | 🟢 | 🔴 | Needs to write to `context_snapshots`. |
| `Step5Plan.tsx` | 🟢 | 🟢 | 🔴 | Needs to write to `roadmaps`. |

## 2. Dashboard Components

| Component | UI | Data Source | Write Capability |
| :--- | :---: | :---: | :---: |
| `Overview.tsx` | 🟢 | 🟡 State | 🔴 None |
| `CRMLayout.tsx` | 🟢 | 🟢 DB | 🟢 Active |
| `ProjectList.tsx` | 🟢 | 🔴 Mock | 🔴 None |
| `AnalyticsLayout.tsx`| 🟢 | 🔴 Mock | 🔴 None |
| `TaskBoard.tsx` | 🟢 | 🟡 State | 🟡 Local |

## 3. Shared Infrastructure

| Module | Status | Notes |
| :--- | :---: | :--- |
| **Auth** | 🟡 | `LandingPage` exists, but no `SessionProvider` wrapping App. |
| **Database** | 🟡 | Schema exists, but hooks (`useWizardState`) don't use it. |
| **Storage** | 🔴 | File uploads (Step 1) are local-only. Need Supabase Storage. |
| **Realtime** | 🔴 | No subscriptions implemented yet. |

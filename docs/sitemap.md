
# Sun AI Agency — Application Sitemap & Architecture

**Date:** Current
**Status:** AS-IS Analysis
**Architecture Type:** Single Page Application (SPA) with State-Based Routing

---

## 1. CURRENT SITEMAP (AS-IS)

The application currently operates on a single root URL. Navigation is handled via internal React state rather than browser history API.

*   **Root Entry** (`/`)
    *   **Landing Page** (Public) - *Initial entry point.*
    *   **Wizard Flow** (Public/Session) - *Onboarding process.*
    *   **Dashboard** (Authenticated) - *Main application interface.*

---

## 2. WIZARD FLOW MAP

The onboarding wizard is a linear, 5-step process managed by `useWizardState`.

**Entry Point:** Click "Get Started" or "Start Free Audit" on Landing Page.

1.  **Step 1: Business Context**
    *   **Purpose:** Collect Name, URL, Industry, and Services.
    *   **Action:** Triggers Analyst Agent (Search & Verification).
2.  **Step 2: Industry Diagnostics**
    *   **Purpose:** Identify specific pain points based on Industry.
    *   **Action:** Triggers Extractor Agent (Dynamic Question Generation).
3.  **Step 3: System Selection**
    *   **Purpose:** Recommend and select AI solutions.
    *   **Action:** Triggers Optimizer Agent (Ranking & ROI).
4.  **Step 4: Executive Brief**
    *   **Purpose:** Strategic summary and readiness scoring.
    *   **Action:** Triggers Summary/Scorer Agent (Calculations).
5.  **Step 5: Strategic Plan**
    *   **Purpose:** Generate 90-day execution roadmap.
    *   **Action:** Triggers Planner Agent (Deep Reasoning).

**Exit Point:** Click "Go to Dashboard" / "Launch Project".

---

## 3. DASHBOARD MAP

Accessible only after Wizard completion or valid session restoration. Protected by `AuthGuard`.

*   **Main Dashboard View**
    *   **Tab 1: Overview**
        *   KPI Cards (Revenue, Active Systems, Readiness).
        *   Activity Feed.
    *   **Tab 2: CRM**
        *   View Mode: List / Kanban.
        *   Detail View: Client Profile & Intelligence.
    *   **Tab 3: Projects**
        *   Project List.
        *   Project Detail (Tasks, Timeline, Team).
    *   **Tab 4: Analytics**
        *   Revenue Charts.
        *   Team Performance Metrics.
        *   AI Insights Panel.
    *   **Tab 5: Roadmap**
        *   Strategic Timeline View.
        *   Scenario Planner.
    *   **Tab 6: Tasks**
        *   Kanban Board (Todo/In Progress/Done).
        *   Task Edit Modal.
    *   **Tab 7: Systems**
        *   System Monitor (Status & Logs).
        *   Configuration.
    *   **Tab 8: Settings**
        *   Profile Management.
        *   Organization Settings.
        *   Preferences.

---

## 4. NOTES & OBSERVATIONS

### Navigation Clarity
*   The application relies entirely on conditional rendering (`if state.step === 1...`).
*   There are no deep links (e.g., you cannot navigate directly to `/dashboard/analytics` via URL).
*   Browser "Back" button functionality relies on browser-level history, not application-level routing hooks.

### Access Control
*   **Landing Page:** Publicly accessible.
*   **Wizard:** Accessible to anonymous users (session created implicitly).
*   **Dashboard:** Requires `user` object from Supabase Auth (`AuthGuard` wrapper).

### Persistence
*   **Wizard State:** Persisted to Supabase (`wizard_sessions` table) but flow resets to Landing Page on hard refresh if session logic doesn't redirect immediately.
*   **Dashboard State:** Persisted via Supabase Database tables (`projects`, `tasks`, `crm_contacts`).

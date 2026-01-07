
# Sun AI Agency — Product Requirements Document (v2.1)

**Version:** 2.1 (Deep Specification)
**Status:** Approved for Engineering
**Focus:** Full-Stack AI Consultancy Platform with Gemini 3 Integration

---

## 1. Executive Summary

Sun AI Agency is an industry-first **AI Consultancy Platform**. It automates the work of a high-end strategy consultant, using a multi-agent architecture to research, diagnose, plan, and execute AI transformations for businesses.

**Core Philosophy:** "Context-First Architecture."
Every step builds upon the verified truths of the previous step. We do not ask the user for information we can find ourselves. We do not recommend systems without understanding the specific industry bottleneck.

---

## 2. The AI Engine: Gemini 3 Integration Strategy

We utilize the specific strengths of the Gemini 3 model family to create a "Consultant-in-a-Box".

| Feature | Model | Implementation & Purpose |
| :--- | :--- | :--- |
| **Google Search Grounding** | `gemini-3-flash` | **Verification (Step 1):** Verifies the business exists, finds competitors, and detects the specific business model (e.g., "DTC Fashion" vs "B2B SaaS"). |
| **URL Context Tool** | `gemini-3-flash` | **Extraction (Step 1):** Crawls the user's landing page to extract brand voice, pricing tiers, and existing tech stack clues (e.g., "They use Shopify"). |
| **Structured Outputs** | `gemini-3-flash` | **UI Rendering (Steps 2-5):** Forces the LLM to return strict JSON that adheres to our React Component schemas (Forms, Cards, Charts). |
| **Gemini Thinking** | `gemini-3-pro` | **Reasoning (Step 5):** Uses `thinkingConfig` (2048 tokens) to solve complex dependency logic. *Example: "If they lack a CRM (Gap), we must install that (Phase 1) before turning on Lead Gen (Phase 2)."* |
| **Code Execution** | `gemini-3-flash` | **Scoring (Step 4):** Uses Python to calculate weighted readiness scores and financial projections. Prevents "LLM Math" hallucinations. |
| **Function Calling** | `gemini-3-flash` | **Action (Dashboard):** Allows the Orchestrator agent to trigger external tools (Email API, Database updates, Research jobs). |

---

## 3. The Agent Roster

The platform is driven by specialized agents living in Supabase Edge Functions.

| Agent | Role | Model | Primary Tools | Used In |
| :--- | :--- | :--- | :--- | :--- |
| **🕵️ Analyst** | Research | `Flash` | Search, URL Context | Step 1, Dashboard Overview |
| **🔬 Extractor** | Consultant | `Flash` | Structured Output | Step 2 (Diagnostics) |
| **⚖️ Optimizer** | Architect | `Flash` | JSON Schema | Step 3 (Systems) |
| **💯 Scorer** | Auditor | `Flash` | **Code Execution** | Step 4 (Readiness) |
| **📅 Planner** | Strategist | **Pro** | **Thinking Mode** | Step 5 (Roadmap) |
| **🎼 Orchestrator**| PM | `Flash` | Function Calling | Dashboard Tasks |
| **💬 Assistant** | Support | `Flash` | RAG, Chat | Client Brief |
| **🎨 Visualizer** | Designer | `Banana` | Image Gen | Step 3 (Previews) |

---

## 4. Phase 1: The Intelligent Wizard (Detailed Spec)

### Step 1: Business Context (The Truth Baseline)
*   **Goal:** Prove to the user we know them better than they know themselves.
*   **Input:** URL + Company Name.
*   **Process:**
    1.  **Analyst Agent** performs Google Search to verify existence.
    2.  Uses URL Context to read the landing page.
    3.  Determines `IndustryType` (Enum) and `MaturityScore` (1-5).
*   **Output:** Streaming "Intelligence Notes" in Right Panel + JSON configuration for Step 2.

### Step 2: Industry Diagnostics (The Deep Dive)
*   **Goal:** Surface specific pain points using industry jargon.
*   **Input:** `IndustryType` (from Step 1).
*   **Process:**
    1.  **Extractor Agent** loads the "Industry Pack" (e.g., Fashion).
    2.  Generates 4 dynamic questions via Structured Output.
    3.  *Example (Fashion):* "How do you handle seasonal drops?"
    4.  *Example (Real Estate):* "What is your lead-to-tour velocity?"
*   **Output:** Dynamic Form Schema.

### Step 3: System Selection (The Prescription)
*   **Goal:** Map pain points to specific AI Modules.
*   **Input:** User Answers from Step 2.
*   **Process:**
    1.  **Optimizer Agent** ranks our catalog of AI Systems.
    2.  Generates a custom "Revenue Impact" string for each card.
    3.  *Visualizer Agent (Optional):* Generates a preview image of what that system looks like for their brand.
*   **Output:** Ranked List of Systems.

### Step 4: Readiness Assessment (The Audit)
*   **Goal:** Honest feasibility check.
*   **Input:** Checklist (Data, Team, Budget).
*   **Process:**
    1.  **Scorer Agent** receives boolean inputs.
    2.  Uses **Code Execution** to run a weighted scoring algorithm.
    3.  Identifies "Critical Gaps" (e.g., No CRM = Score penalty -30).
*   **Output:** Score (0-100), Risks[], Wins[].

### Step 5: The Master Plan (The Strategy)
*   **Goal:** The "Aha!" moment. A concrete 90-day plan.
*   **Input:** All previous state.
*   **Process:**
    1.  **Planner Agent (Gemini 3 Pro)** activates **Thinking Mode**.
    2.  **Reasoning Chain:**
        *   *Analyze Gaps:* "They have no data structure."
        *   *Sequence:* "Phase 1 must be Data Foundation."
        *   *Dependency:* "Cannot deploy Lead Gen (System) until Data (Gap) is fixed."
    3.  Generates strict JSON for the Gantt Chart UI.
*   **Output:** 3-Phase Roadmap (JSON).

---

## 5. Phase 2: Dashboards & Execution

### A. Client Dashboard (The "View")
Focused on transparency, approval, and assets.

1.  **Brief & Documents Tab**
    *   **Feature:** RAG-powered Doc Analysis.
    *   **User Action:** Uploads "Brand Guidelines.pdf".
    *   **Assistant Agent:** Reads PDF, extracts color codes/tone, and auto-updates the System Prompts for the project.
2.  **Timeline Tab**
    *   **Feature:** Interactive Gantt.
    *   **Display:** Read-only view of the roadmap generated in Step 5.
3.  **Billing Tab**
    *   **Feature:** Stripe Integration.
    *   **Agent:** **Analytics Agent** explains the invoice ("This month included extra token usage for deep research").

### B. Agency Dashboard (The "Control Center")
Focused on management, deployment, and optimization.

1.  **CRM Tab**
    *   **Feature:** Lead Management.
    *   **Agent:** **Analyst** scans new leads from the Wizard and assigns a "Close Probability" score.
2.  **Project Planning Tab**
    *   **Feature:** Master Gantt.
    *   **Agent:** **Planner** re-optimizes schedules across all clients if a team member goes on leave.
3.  **Tasks Tab (Orchestration)**
    *   **Feature:** AI-Assisted Execution.
    *   **Orchestrator Agent:** "Do It" Buttons.
        *   *Task:* "Draft Cold Email Sequence." -> **Agent:** Generates text based on Client Brief.
        *   *Task:* "Configure CRM." -> **Agent:** Generates Python script for setup.

---

## 6. Industry Packs: User Journeys

### A. Fashion E-commerce (The "Visual" Journey)
*   **Context:** Brand "LuxeWear".
*   **Step 2 Diagnostic:** Asked about "Returns Rate" and "UGC Sourcing".
*   **Step 3 Recommendation:** "Fit Intelligence Agent" (reduces returns) + "Content Supply Chain" (automates UGC).
*   **Step 5 Plan:** Phase 1 = Data Tagging. Phase 2 = Fit Widget Deployment.
*   **Dashboard Action:** **Visualizer Agent** generates mockups of the new product page with the Fit Widget.

### B. Real Estate (The "Speed" Journey)
*   **Context:** Agency "City Properties".
*   **Step 2 Diagnostic:** Asked about "Speed to Lead" and "Weekend Showings".
*   **Step 3 Recommendation:** "WhatsApp Concierge" (Instant reply) + "Tour Scheduler".
*   **Step 5 Plan:** Phase 1 = CRM Integration. Phase 2 = Bot Training.
*   **Dashboard Action:** **Orchestrator Agent** drafts the script for the WhatsApp bot based on their listings.

---

## 7. Technical Architecture & Schema

### Database Schema (Supabase PostgreSQL)

```sql
-- 1. Organizations (Agency vs Client Tenants)
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text check (type in ('agency', 'client'))
);

-- 2. Projects (The Wizard State Container)
create table projects (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id),
  name text,
  website_url text,
  industry text, -- 'fashion', 'real_estate', etc.
  
  -- The "Brain" of the project
  wizard_state jsonb, -- Stores answers from Steps 1-4
  roadmap_state jsonb, -- Stores the Step 5 plan
  
  status text default 'onboarding' -- onboarding, active, paused
);

-- 3. Tasks (Execution Items from Roadmap)
create table tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id),
  title text,
  status text check (status in ('todo', 'in_progress', 'review', 'done')),
  
  -- AI Metadata
  is_ai_generated boolean default true,
  ai_assistant_prompt text, -- The prompt to run if user clicks "Do It"
  
  due_date timestamptz
);

-- 4. Documents (RAG Knowledge Base)
create table documents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id),
  name text,
  content text, -- Extracted text
  embedding vector(768) -- Gemini Embedding
);
```

### Edge Function Logic Flow (Step 5 Example)

```typescript
// supabase/functions/planner/index.ts
import { GoogleGenAI } from "npm:@google/genai";

Deno.serve(async (req) => {
  const { wizardState } = await req.json();
  
  // 1. Initialize Pro Model
  const ai = new GoogleGenAI({ apiKey: Deno.env.get("GOOGLE_API_KEY") });
  
  // 2. Define Schema
  const roadmapSchema = { ... }; // Complex JSON schema

  // 3. Call Gemini with Thinking
  const result = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Act as a Senior Strategist. Create a roadmap for a ${wizardState.industry} company...`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: roadmapSchema,
      thinkingConfig: { thinkingBudget: 2048 } // CRITICAL for logic
    }
  });

  // 4. Save to DB
  await supabase.from('projects').update({ roadmap_state: result.text });

  return new Response(result.text);
});
```

---

## 8. Success Metrics

1.  **Wizard Completion Rate:** >60% (High trust due to Step 1 verification).
2.  **Plan Acceptance:** >80% of users proceed to Dashboard after seeing the Step 5 Roadmap.
3.  **Agent Accuracy:**
    *   Step 1 Industry Detection: >95%.
    *   Step 5 Dependency Logic: 100% valid DAG (Directed Acyclic Graph).

---

## 9. Launch Checklist (Technical)

*   [ ] **Supabase:** Init project, Apply Migrations, Set RLS.
*   [ ] **Edge Functions:** Deploy `analyst`, `extractor`, `optimizer`, `scorer`, `planner`.
*   [ ] **Secrets:** Set `GOOGLE_API_KEY` in Supabase Vault.
*   [ ] **Frontend:** Replace local `ai.ts` calls with `supabase.functions.invoke()`.
*   [ ] **Auth:** Implement Magic Link login for Dashboard access.

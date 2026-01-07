
# Sun AI Agency — Master Engineering Plan

**Version:** 1.0
**Context:** Transitioning from "Thick Client Prototype" to "Secure SaaS Architecture".
**Ref:** `docs/prdV2.md`

---

## 1. The Critical Path (Immediate Priorities)

The current application is a functional frontend prototype. To make it launch-ready, we must move the "Brain" (AI Logic) and "Memory" (State) to a secure backend.

### Phase A: Security & Architecture (Week 1)
**Goal:** Remove `API_KEY` from client bundle and establish persistent user sessions.

1.  **Supabase Initialization**
    *   [ ] Create Supabase Project.
    *   [ ] Enable **Auth** (Email/Password + Google OAuth).
    *   [ ] Create **Database Schema** (see Section 3).
    *   [ ] Set up **RLS Policies** (Row Level Security).

2.  **Edge Function Migration**
    *   [ ] Port `services/gemini/analyst.ts` → `supabase/functions/analyst/index.ts`.
    *   [ ] Port `services/gemini/planner.ts` → `supabase/functions/planner/index.ts`.
    *   [ ] **Constraint:** Ensure `gemini-3-pro` with `thinkingConfig` works in Deno runtime.
    *   [ ] **Security:** Store `GOOGLE_API_KEY` in Supabase Vault, not in code.

3.  **Frontend Refactor**
    *   [ ] Remove `services/gemini/client.ts` (Direct SDK usage).
    *   [ ] Create `services/api.ts` to call Edge Functions via `supabase.functions.invoke()`.
    *   [ ] Replace `localStorage` logic in `App.tsx` with `useSupabaseClient`.

---

## 2. AI Feature Implementation (Gemini 3 Specifics)

Once the plumbing is secure, we enable the advanced Gemini 3 features defined in the PRD.

### Step 1: Business Context (Analyst Agent)
*   **Current:** Simple text generation.
*   **Upgrade:**
    *   Enable **Google Search Grounding** to verify business existence.
    *   Enable **URL Context Tool** to scrape the user's provided website for tone/content.
    *   **Output:** Return `verified: boolean` flag to UI.

### Step 2: Diagnostics (Extractor Agent)
*   **Current:** Generic questions.
*   **Upgrade:**
    *   Use **Structured Outputs (JSON Schema)** to generate *industry-specific* forms.
    *   Example: If "Real Estate" -> Generate questions about "Lead Response Time".

### Step 5: Roadmap (Planner Agent)
*   **Current:** Standard generation.
*   **Upgrade:**
    *   Enable **Thinking Mode** (`thinkingBudget: 2048`).
    *   **UI Update:** Show a "Thinking..." skeleton state while the model reasons about dependencies (10-15s latency).

---

## 3. Database Schema (PostgreSQL)

```sql
-- Users (Managed by Supabase Auth)
-- public.profiles
create table public.profiles (
  id uuid references auth.users not null,
  business_name text,
  industry text,
  website text,
  created_at timestamptz default now()
);

-- Projects (The Wizard State)
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  status text default 'draft', -- draft, active, completed
  
  -- JSONB dumps for flexible wizard data
  wizard_data jsonb, -- Answers from Steps 1-4
  roadmap_data jsonb, -- The generated Plan from Step 5
  
  created_at timestamptz default now()
);

-- Tasks (The Dashboard Items)
create table public.tasks (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects(id),
  title text,
  status text, -- todo, in_progress, done
  ai_generated boolean default false,
  embedding vector(768) -- For RAG (Future)
);
```

---

## 4. Dashboard Implementation Strategy

The Dashboard needs to move from "Static Placeholder" to "Active Command Center".

1.  **Overview Tab**
    *   Fetch `projects` table.
    *   **AI Feature:** Run **Analyst Agent** (Flash) on page load to generate a "Weekly Briefing" based on task status.

2.  **Tasks Tab**
    *   Render `public.tasks`.
    *   **AI Feature:** Add "Orchestrator" button to tasks.
        *   *Click "Draft Email"* -> Calls Edge Function -> Returns text -> Updates UI.

3.  **Roadmap Tab**
    *   Render `project.roadmap_data`.
    *   **AI Feature:** "Re-plan" button. Sends current state to **Planner Agent** (Pro) to re-shuffle dates.

---

## 5. Deployment & CI/CD

1.  **Vercel**
    *   Connect GitHub Repo.
    *   Env Vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
    *   **CRITICAL:** Do NOT add `GOOGLE_API_KEY` to Vercel (It lives in Supabase).

2.  **Supabase**
    *   Link CLI: `supabase link --project-ref ...`
    *   Deploy Functions: `supabase functions deploy analyst`, `supabase functions deploy planner`.

---

## 6. Success Checklist

- [ ] User can Sign Up.
- [ ] User can complete Wizard.
- [ ] Data persists after refresh.
- [ ] No API Keys visible in Network Tab.
- [ ] Step 5 Roadmap is generated using "Thinking" model.
- [ ] Dashboard shows the generated roadmap.

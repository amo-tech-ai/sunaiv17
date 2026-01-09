
# 05. Implementation Prompts

Use these prompts with your AI coding assistant to execute the Remediation Plan.

---

## Phase 1: Security & Analyst Migration

### Prompt 1: Create Analyst Edge Function
```text
Create a new Supabase Edge Function named `analyst`.
1. Move the logic from `src/services/gemini/analyst.ts` to `supabase/functions/analyst/index.ts`.
2. Ensure it uses `npm:@google/genai` and `Deno.env.get('GOOGLE_API_KEY')`.
3. It must handle two modes: 'research' (Streaming text) and 'classify' (JSON).
4. For 'research', use `googleSearch` tool.
5. For 'classify', use structured output schema.
```

### Prompt 2: Update Frontend Service
```text
Update `src/services/gemini/analyst.ts`.
1. Remove all direct `GoogleGenAI` imports.
2. Replace `analyzeBusinessStream` to use `fetch` against the new Edge Function URL.
   - Handle the ReadableStream response to yield text chunks.
3. Replace `classifyBusiness` to use `supabase.functions.invoke('analyst')`.
```

---

## Phase 2: Persistence Layer

### Prompt 3: DB Sync Hook
```text
Refactor `src/hooks/useWizardState.ts`.
1. Remove `localStorage` logic.
2. Introduce `useEffect` that checks `supabase.auth.getSession`.
3. If user is logged in:
   - Fetch existing session from `wizard_sessions` table.
   - If found, `setState` with DB data.
4. Add a `saveState` function that upserts to `wizard_sessions` and `wizard_answers`.
   - Call this function inside `updateData` and `nextStep`.
```

### Prompt 4: Auth Gate
```text
1. Create `src/components/auth/AuthGuard.tsx`.
   - Check Supabase session. If null, render a Login screen or redirect.
2. Wrap `src/App.tsx` Dashboard render logic with `<AuthGuard>`.
3. Create a simple `Login` component with Email/Password or Magic Link.
```

---

## Phase 3: Dashboard Hydration

### Prompt 5: Projects Hook
```text
Refactor `src/hooks/useProjects.ts`.
1. Remove `MOCK_PROJECTS`.
2. Use `supabase.from('projects').select('*, tasks(*)')`.
3. Map the DB response to the `Project` interface.
4. Implement `updateProjectStatus` using `supabase.update()`.
```

### Prompt 6: Analytics Hook
```text
Refactor `src/hooks/useAnalytics.ts`.
1. Remove `MOCK_ANALYTICS`.
2. Create a SQL query or RPC that aggregates:
   - Total Revenue (sum of `invoices` where status=paid).
   - Active Clients (count `clients` where status=active).
3. Return this real data structure.
```


# 04. Best Practices: Frontend-Backend Integration

**Architecture:** Vite (React) + Supabase (Auth/DB/Edge) + Gemini 3

## 1. Security & Data Access

### 🔴 NEVER
*   **Never** expose `GOOGLE_API_KEY` or `SUPABASE_SERVICE_ROLE_KEY` in the React Client.
*   **Never** call `GoogleGenAI` directly from a `.tsx` or `.ts` file in `src/`.
*   **Never** bypass Row Level Security (RLS) by using the Service Role key in the client.

### 🟢 ALWAYS
*   **Always** invoke AI logic via `supabase.functions.invoke('function-name')`.
*   **Always** rely on RLS to filter data (e.g., `select * from projects` should auto-filter by `auth.uid()`).
*   **Always** validate inputs (Zod) in the Edge Function before passing to Gemini.

## 2. State Management

### 🔴 NEVER
*   **Never** trust `localStorage` for critical business data (Wizard State).
*   **Never** mix UI state (isMenuOpen) with Data state (projects list) in the same Context if avoidable.

### 🟢 ALWAYS
*   **Always** use a "Stale-While-Revalidate" or "Optimistic UI" pattern.
    *   *Update UI -> Send DB Request -> Revert if Fail.*
*   **Always** sync long-form wizard data to the DB on every step transition.

## 3. AI Integration

### 🔴 NEVER
*   **Never** let the AI determine the JSON structure blindly.
*   **Never** wait for a long-running AI process (Thinking Mode) without a UI feedback loop (Skeleton/Streaming).

### 🟢 ALWAYS
*   **Always** use **Structured Outputs** (JSON Schema) for all programmatic AI responses.
*   **Always** handle timeouts (Gemini Pro can take 15s+). Use a 30s timeout on the client fetch.
*   **Always** verify AI output types before rendering (e.g., check if `roadmap.phases` exists and is an array).

## 4. Performance

*   **Edge Functions:** Keep them "Warm" if possible, or use standard Deno imports to minimize cold starts.
*   **Database:** Index foreign keys (`project_id`, `org_id`) used in RLS policies.
*   **Bundling:** Lazy load heavy dashboard components (Charts, Maps).

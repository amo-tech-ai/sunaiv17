
# Sun AI Agency — Edge Function Architecture & Plan

**Date:** January 6, 2025
**Status:** Architecture Definition
**Focus:** Server-side AI Agent Implementation (Supabase Deno Runtime)
**Ref:** `rules/supabase-edge-functions.md`, `docs/plan/07-gemeni-agents.md`

---

## 1. Executive Summary

To secure the application and enable advanced AI capabilities (Thinking, Search, Database Access), all AI logic is moved from the client-side to **Supabase Edge Functions**.

**Key Benefits:**
1.  **Security:** `GOOGLE_API_KEY` is stored in Supabase Vault, never exposed to the client.
2.  **Performance:** Heavy logic (Thinking models) runs on the server; Client receives lightweight streams.
3.  **Context:** Functions can directly query the Supabase Database for user history/context.

---

## 2. Shared Architecture (`supabase/functions/_shared`)

To ensure maintainability and adhere to coding standards, these utility files must be created first.

| File | Purpose |
| :--- | :--- |
| `cors.ts` | Standardized CORS headers to allow requests from the frontend. |
| `gemini.ts` | Centralized `@google/genai` client initialization using `Deno.env.get("GOOGLE_API_KEY")`. |
| `supabase.ts` | Admin client initialization for database operations (Service Role). |
| `types.ts` | Shared TypeScript interfaces (WizardState, IndustryTypes) synced with frontend types. |

---

## 3. Function Matrix & Deployment Plan

| Function Name | Corresponding Agent | Model | Key Capability | Trigger |
| :--- | :--- | :--- | :--- | :--- |
| `analyst` | **Analyst** (Step 1) | `gemini-3-flash` | **Google Search**, Streaming | `onBlur` (URL Input) |
| `extractor` | **Extractor** (Step 2) | `gemini-3-flash` | **Structured Output** (JSON) | Step 2 Mount |
| `optimizer` | **Optimizer** (Step 3) | `gemini-3-flash` | Logic / Re-ranking | Step 3 Mount |
| `scorer` | **Scorer** (Step 4) | `gemini-3-flash` | **Code Execution** (Math) | Checklist Change |
| `planner` | **Planner** (Step 5) | `gemini-3-pro` | **Thinking Mode** (2k tokens) | Step 5 Mount |
| `orchestrator` | **Orchestrator** | `gemini-3-flash` | **Function Calling** | Dashboard Load |
| `assistant` | **Assistant** | `gemini-3-flash` | Text Gen / RAG | Client Brief Edit |
| `monitor` | **Monitor** | `gemini-3-flash` | Logic / State Analysis | Timeline View |
| `analytics` | **Analytics** | `gemini-3-flash` | Data Aggregation | Dashboard View |

---

## 4. Detailed Function Specifications

### 4.1 Function: `analyst` (Step 1 Business Context)
*   **Purpose:** Verify business existence and stream intelligence to the UI.
*   **Inputs:** `{ businessName: string, website?: string }`
*   **Outputs:** Stream (Text) + Final JSON `{ industry, confidence, summary, verified }`.
*   **Gemini Config:**
    *   `tools: [{ googleSearch: {} }]`
    *   `model: 'gemini-3-flash-preview'`
*   **Implementation Prompt:**
    ```text
    Create a Supabase Edge Function 'analyst'.
    - Use GoogleGenAI with 'gemini-3-flash-preview'.
    - Enable Google Search tool.
    - Accept 'businessName' and 'website' from request body.
    - System Instruction: "You are a senior business analyst. Verify this business exists. Stream a 3-bullet summary of their business model. Finally, classify them into one of: [saas, fashion, real_estate, tourism, other]."
    - Return a ReadableStream to the client.
    ```

### 4.2 Function: `extractor` (Step 2 Diagnostics)
*   **Purpose:** Generate industry-specific diagnostic questions.
*   **Inputs:** `{ industry: string }`
*   **Outputs:** JSON `DiagnosticSchema` (Questions, Options, SystemMappings).
*   **Gemini Config:**
    *   `responseMimeType: "application/json"`
    *   `responseSchema`: Defined Diagnostic Schema.
*   **Implementation Prompt:**
    ```text
    Create a Supabase Edge Function 'extractor'.
    - Use 'gemini-3-flash-preview'.
    - Define a strict JSON schema for 4 diagnostic questions.
    - Prompt: "Generate 4 high-impact diagnostic questions for a {industry} business. Map answers to specific AI systems."
    - Return the JSON object.
    ```

### 4.3 Function: `optimizer` (Step 3 Systems)
*   **Purpose:** Map user pain points to recommended AI systems.
*   **Inputs:** `{ industry: string, painPoints: string[] }`
*   **Outputs:** JSON `{ recommendations: SystemID[], impacts: Record<string, string> }`.
*   **Gemini Config:**
    *   `responseMimeType: "application/json"`
*   **Implementation Prompt:**
    ```text
    Create a Supabase Edge Function 'optimizer'.
    - Input: Industry and list of pain points.
    - Logic: Select top 3 systems from the defined catalog that solve these pain points.
    - Generate a custom 'Revenue Impact' string for each recommended system.
    ```

### 4.4 Function: `scorer` (Step 4 Readiness)
*   **Purpose:** Calculate a weighted readiness score and identify gaps.
*   **Inputs:** `{ checklist: Record<string, boolean>, industry: string }`
*   **Outputs:** JSON `{ score: number, risks: string[], wins: string[] }`.
*   **Gemini Config:**
    *   `tools: [{ codeExecution: {} }]` (To ensure math accuracy for scoring).
*   **Implementation Prompt:**
    ```text
    Create a Supabase Edge Function 'scorer'.
    - Use 'gemini-3-flash-preview' with Code Execution tool enabled.
    - Prompt: "Write Python code to calculate a weighted score based on these boolean inputs... Then identify 2 critical risks if score < 50."
    ```

### 4.5 Function: `planner` (Step 5 Roadmap)
*   **Purpose:** Generate the 30-day execution roadmap.
*   **Inputs:** Full `WizardState`.
*   **Outputs:** JSON `RoadmapSchema` (Phases, Tasks, Deliverables).
*   **Gemini Config:**
    *   **Model:** `gemini-3-pro-preview` (Crucial for reasoning).
    *   **Thinking:** `thinkingConfig: { thinkingBudget: 2048 }`.
    *   `responseMimeType: "application/json"`
*   **Implementation Prompt:**
    ```text
    Create a Supabase Edge Function 'planner'.
    - MUST use 'gemini-3-pro-preview'.
    - Enable 'thinkingConfig' with 2048 budget.
    - Prompt: "Create a 3-phase implementation roadmap for a {industry} company... Analyze dependencies between selected systems."
    - Return strict JSON matching the RoadmapSchema.
    ```

### 4.6 Function: `orchestrator` (Dashboard Tasks)
*   **Purpose:** Convert the high-level roadmap into granular, checkable tasks.
*   **Inputs:** `RoadmapJSON`
*   **Outputs:** JSON `Task[]`
*   **Implementation Prompt:**
    ```text
    Create Edge Function 'orchestrator'.
    - Take the roadmap JSON.
    - Break down each 'Phase Item' into 2-3 granular sub-tasks (e.g., 'Setup CRM' -> 'Import Contacts', 'Config API').
    - Return list of tasks with status 'todo'.
    ```

### 4.7 Function: `assistant` (Client Dashboard)
*   **Purpose:** Analyze client briefs and uploaded docs.
*   **Inputs:** `text` or `document_url`
*   **Outputs:** Summary/Insights Stream.
*   **Implementation Prompt:**
    ```text
    Create Edge Function 'assistant'.
    - If document provided, extract text.
    - Summarize content and suggest improvements to the Project Brief.
    - Stream response to UI.
    ```

### 4.8 Function: `analytics` (Agency Dashboard)
*   **Purpose:** Aggregated BI insights.
*   **Inputs:** `timeRange`, `orgId`
*   **Outputs:** JSON `{ revenue, growth, key_insights }`
*   **Implementation Prompt:**
    ```text
    Create Edge Function 'analytics'.
    - Query Supabase DB for project/invoice stats.
    - Pass stats to Gemini.
    - Prompt: "Analyze these metrics and find 1 key growth opportunity."
    ```

---

## 5. Development Checklist for Agent Coding

When implementing these functions, the AI Developer must:

1.  [ ] **Initialize**: `supabase functions new [name]`.
2.  [ ] **Import**: Use `npm:@google/genai` (Do NOT use legacy SDKs).
3.  [ ] **Environment**: Use `Deno.env.get("GOOGLE_API_KEY")`.
4.  [ ] **CORS**: Always handle `OPTIONS` request in `serve`.
5.  [ ] **Response**: Return strictly typed JSON (unless streaming).
6.  [ ] **Error Handling**: Try/Catch block returning 500 with error message.

---

## 6. Example Code Structure

```typescript
// supabase/functions/analyst/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenAI } from "npm:@google/genai";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { businessName } = await req.json();
    const ai = new GoogleGenAI({ apiKey: Deno.env.get("GOOGLE_API_KEY") });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze ${businessName}...`,
      config: { tools: [{ googleSearch: {} }] }
    });

    return new Response(JSON.stringify(response), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
```

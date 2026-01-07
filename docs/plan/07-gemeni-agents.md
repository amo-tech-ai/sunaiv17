
# Sun AI Agency — Gemini 3 Agent & Feature Plan

**Date:** January 6, 2025
**Status:** Architecture Definition
**Focus:** Gemini 3 Models, Tools, and Agent Orchestration

---

## 1. Executive Summary

This document defines the **AI Architecture** for Sun AI Agency. The platform utilizes a **Multi-Agent System** powered by Google's **Gemini 3** models. Instead of a single "chatbot," the application delegates tasks to specialized agents (Analyst, Planner, Scorer, etc.) that utilize specific toolsets (Search, Code Execution, Thinking) to deliver professional-grade consultancy outputs.

**Core Philosophy:**
1.  **Context-First:** Every agent action builds upon the verified truth established in Step 1.
2.  **Specialized Intelligence:** Use `Flash` for speed/UI updates and `Pro` for deep reasoning/strategy.
3.  **Tool-Augmented:** Agents do not just "guess"; they verify via Search, calculate via Code, and structure data via Schema.

---

## 2. Gemini 3 Model & Feature Matrix

### Models
| Model Name | Alias | Role | Key Strength |
| :--- | :--- | :--- | :--- |
| `gemini-3-flash-preview` | **Flash** | The Operator | Low latency (<1s), Streaming, Text Gen, Function Calling. |
| `gemini-3-pro-preview` | **Pro** | The Strategist | Deep Reasoning (**Thinking Mode**), Complex Planning, Code Execution. |
| `gemini-2.5-flash-image` | **Nano Banana** | The Artist | Fast, high-quality image generation for dashboard previews. |

### Capabilities
| Feature | Description | Implementation Usage |
| :--- | :--- | :--- |
| **Google Search Grounding** | Real-time web access to verify facts. | Verifying business existence, market trends, competitor analysis. |
| **URL Context Tool** | Reading and analyzing specific webpages. | Scaping user's landing page to detect brand voice and offer. |
| **Gemini Thinking** | Hidden "chain of thought" reasoning tokens. | Generating logical dependency chains in Roadmaps (Step 5). |
| **Structured Outputs** | Strict JSON schema enforcement. | Rendering UI components (Forms, Charts, Gantt lines). |
| **Code Execution** | Writing and running Python code. | Calculating accurate Readiness Scores and ROI projections. |
| **Function Calling** | Triggering external APIs/Functions. | Sending emails, updating CRM status, saving database records. |
| **Interactions API** | Low-latency stateful voice/chat. | The "Assistant" agent in the Dashboard (Phase 3). |
| **Deep Research** | Recursive search & synthesis loop. | Creating comprehensive "Market Pulse" reports. |
| **Google Maps Grounding** | Location-aware data retrieval. | Analyzing local competition for Real Estate/Tourism clients. |
| **RAG (Retrieval)** | Vector search over internal docs. | Searching uploaded Briefs and SOPs. |

---

## 3. Agent Roster

| Agent Type | Role | Primary Model | Key Tools |
| :--- | :--- | :--- | :--- |
| **🕵️ Analyst** | Researcher | Flash | Search, URL Context, Deep Research |
| **🔬 Extractor** | Data Architect | Flash | Structured Outputs, Schema |
| **⚖️ Optimizer** | Solution Architect | Flash | Text Gen, Maps Grounding |
| **💯 Scorer** | Auditor | Pro | Code Execution, Thinking |
| **📅 Planner** | Strategist | Pro | Thinking Mode, Structured Outputs |
| **🎼 Orchestrator** | Project Manager | Flash | Function Calling, State Mgmt |
| **💬 Assistant** | Client Support | Flash | Interactions API, RAG |
| **📊 Monitor** | Risk Watchdog | Flash | Text Gen, Streaming |
| **📈 Analytics** | BI Analyst | Flash | Code Execution, Search |
| **🎨 Visualizer** | Designer | Nano Banana | Image Generation |
| **🛡️ Controller** | Gatekeeper | Flash | Safety Settings, Approval Logic |

---

## 4. Screen-by-Screen Implementation Plan

### A. The Core Wizard (Phase 1)

| Screen | Agent | Goal | Gemini Features Used | Output |
| :--- | :--- | :--- | :--- | :--- |
| **Step 1: Context** | **Analyst** | Establish "Truth Baseline" | • **Google Search**: Verify URL<br>• **URL Context**: Read landing page<br>• **Streaming**: Real-time insights | JSON: `{ industry, maturity_score, summary }` |
| **Step 2: Diagnostics** | **Extractor** | Surface Industry Problems | • **Structured Output**: Strict Form Schema<br>• **Maps Grounding**: (If Local Biz) | JSON: `DiagnosticQuestion[]` (Dynamic Form) |
| **Step 3: Systems** | **Optimizer** | Prescribe Solutions | • **Text Gen**: ROI Explanations<br>• **Image Gen**: System Preview (Future) | JSON: `{ recommended_ids, roi_text }` |
| **Step 4: Readiness** | **Scorer** | Accurate Audit | • **Code Execution**: Calculate weighted score<br>• **Thinking**: Analyze Risk Factors | JSON: `{ score: 72, risks: [], wins: [] }` |
| **Step 5: Roadmap** | **Planner** | Create Strategy | • **Thinking (4k)**: Logic sequencing<br>• **Structured Output**: Timeline Schema | JSON: `{ phases: [{ tasks, kpis }] }` |

### B. Client Dashboard (Phase 2)

| Tab | Agent | Goal | Gemini Features Used | Output |
| :--- | :--- | :--- | :--- | :--- |
| **Brief** | **Assistant** | Manage Requirements | • **RAG**: Analyze uploaded PDFs<br>• **Text Gen**: Summarize edits | Stream: "I noticed you updated the goals..." |
| **Timeline** | **Monitor** | Track Progress | • **Text Gen**: Status Summaries<br>• **Function Calling**: Check Task DB | Alert: "Phase 1 is 2 days behind schedule." |
| **Billing** | **Analytics** | Financial Clarity | • **Code Execution**: Calc budget burn<br>• **Text Gen**: Explain invoices | Chart Data: Spend vs Budget |

### C. Agency Dashboard (Phase 2)

| Tab | Agent | Goal | Gemini Features Used | Output |
| :--- | :--- | :--- | :--- | :--- |
| **CRM** | **Analyst** | Relationship Health | • **Deep Research**: Competitor news<br>• **Function Calling**: Log activity | Insight: "Client competitor just launched X." |
| **Planning** | **Planner** | Resource Allocation | • **Thinking**: Re-balance workload<br>• **Structured Output**: Gantt updates | Suggestion: "Move Task A to User B." |
| **Tasks** | **Orchestrator** | Execution | • **Function Calling**: Send Email/Slack<br>• **Text Gen**: Draft content | Action: "Draft created for approval." |

---

## 5. Technical Implementation Notes

### Edge Function Architecture
To ensure security and performance, all Agent logic resides in **Supabase Edge Functions**.

**Example: The Planner Agent (Step 5)**
```typescript
// supabase/functions/planner/index.ts
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: Deno.env.get("GOOGLE_API_KEY") });

Deno.serve(async (req) => {
  const { wizardContext } = await req.json();
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Create a roadmap for... ${JSON.stringify(wizardContext)}`,
    config: {
      thinkingConfig: { thinkingBudget: 2048 }, // Enable Thinking
      responseMimeType: "application/json",
      responseSchema: ROADMAP_SCHEMA
    }
  });

  return new Response(response.text);
});
```

### Safety & Controller Agent
A dedicated **Controller Agent** logic layer wraps all outputs to ensure:
1.  No hallucinated guarantees (e.g., "Guaranteed 50% revenue increase").
2.  Safety filters applied (Harassment, Hate Speech).
3.  "Human-in-the-loop" flags for sensitive actions (e.g., sending emails).

### Latency Management
- **Flash Agents:** < 2s response. Used for UI interactions (chats, form updates).
- **Pro Agents:** 10-30s response (due to Thinking). **Must** use Skeleton Loaders or Streaming UI to keep user engaged during processing.

---

**Last Updated:** January 6, 2025
**Next Steps:** Begin migration of Step 1 "Analyst" to Edge Function with Google Search Grounding.

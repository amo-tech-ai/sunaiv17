# AI AGENT SPEC: SCREEN 2

**Agent Name:** Extractor
**Filename:** `supabase/functions/extractor/index.ts`

---

## 1. MODEL CONFIGURATION

*   **Model:** `gemini-3-pro-preview`
*   **Temperature:** 0.2 (Low). We want consistency, not creativity.
*   **Thinking Budget:** 2048 Tokens. (Required for mapping logic).

---

## 2. TOOLS

### A. Structured Outputs (`responseSchema`)
We do not parse Markdown. We demand JSON.

```json
{
  "sections": [
    {
      "id": "revenue_pain",
      "questions": [
        {
          "id": "q1",
          "options": [
            { "label": "High Returns", "mapped_system_id": "whatsapp_assistant" }
          ]
        }
      ]
    }
  ]
}
```

### B. Context Injection
The prompt must include:
1.  **Industry Pack JSON** (The Menu).
2.  **User Context** (The Filter).

---

## 3. PERFORMANCE TARGETS

*   **Latency:** < 4000ms.
*   **Fallback:** If latency > 8000ms, abort and load the raw Industry Pack without AI filtering.
*   **Caching:** Cache the result based on `Industry + ServiceHash` to save tokens on reload.
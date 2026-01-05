# Sun AI Agency - Development Roadmap

**Last Updated:** Current Date
**Overall Progress:** ~35%
**Current Phase:** Phase 1 (AI Integration)

---

## 🟢 Progress Tracker

### Core Wizard Screens (Frontend)
| Screen | UI Implementation | Logic/State | AI Integration |
| :--- | :---: | :---: | :---: |
| **1. Business Context** | ✅ Done | ✅ Done | 🔴 Pending |
| **2. Industry Deep Dive** | ✅ Done | ✅ Done (Mocked) | 🔴 Pending |
| **3. System Selection** | ✅ Done | ✅ Done | 🔴 Pending |
| **4. Readiness Check** | ✅ Done | ✅ Done (Basic) | 🔴 Pending |
| **5. 30-Day Plan** | ✅ Done | ✅ Done (Mocked) | 🔴 Pending |

### Dashboard Screens
| Screen | UI Implementation | Data Binding |
| :--- | :---: | :---: |
| **Overview** | ✅ Done (Static) | 🔴 Pending |
| **Roadmap** | 🟡 Partial | 🔴 Pending |
| **Tasks** | 🟡 Partial | 🔴 Pending |

---

## 🏁 Project Setup (Pre-Phase 1)

**Status:** ✅ Complete (100%)
**Timeline:** Week 0
**Priority:** P0 - Critical

### Completed Tasks
- ✅ **Project Foundation**: Vite + React + TypeScript initialized.
- ✅ **Design System**: Tailwind CSS configured with custom colors (`sun-*`) and fonts (Inter, Playfair, Lora).
- ✅ **Component Library**: Base components created (`Button.tsx`, `Input.tsx`).
- ✅ **Routing**: State-based routing implemented in `App.tsx`.
- ✅ **Layout**: 3-Panel responsive layout (Left Context, Center Wizard, Right Intelligence).

---

## 🚀 Phase 1: Core Wizard System

**Status:** 🟡 In Progress (~50%)
**Timeline:** Weeks 1-4
**Priority:** P0 - Critical
**Goal:** Replace mock logic with real Google Gemini API integrations.

### Deliverables

**Step 1: Business Context**
- [x] Company information form UI
- [ ] **AI Task**: Implement Google Search grounding to verify company URL.
- [ ] **AI Task**: Stream "Intelligence Notes" to Right Panel based on input.
- [ ] **AI Task**: Detect `IndustryType` automatically from description.

**Step 2: Industry Deep Dive**
- [x] Diagnostic question UI
- [x] Hardcoded question mapping (SaaS, Fashion, etc.)
- [ ] **AI Task**: Generate *dynamic* questions if industry is "Other" or niche.
- [ ] **AI Task**: Right panel explanation of *why* these questions matter (Contextual).

**Step 3: System Selection**
- [x] System cards UI & selection logic
- [ ] **AI Task**: Re-rank systems based on Step 2 answers (Problem-to-Solution mapping).
- [ ] **AI Task**: Generate custom "Revenue Impact" text based on user's specific metrics.

**Step 4: Readiness Assessment**
- [x] Readiness checklist UI & Visual Score
- [ ] **AI Task**: Analyze checklist + context to generate specific "Risks" and "Quick Wins".
- [ ] **AI Task**: Provide a qualitative assessment paragraph in Right Panel.

**Step 5: Strategy & Phases**
- [x] 3-Phase Timeline UI
- [ ] **AI Task**: Generate custom deliverables for Week 1-4 based on selected systems.
- [ ] **AI Task**: Create a cohesive "Strategy Blueprint" summary.

### Technical Requirements (Pending)
- [ ] **API Integration**: Set up `@google/genai` client.
- [ ] **Streaming**: Implement streaming text effect for the Right Panel to mimic "thinking".
- [ ] **Prompt Engineering**: Develop system prompts for the "Senior Strategic Partner" persona.
- [ ] **State Persistence**: Save `AppState` to `localStorage` to prevent data loss on refresh.

---

## 📊 Phase 2: Dashboard & Backend Integration

**Status:** 🟡 Started (~15%)
**Timeline:** Weeks 5-8
**Priority:** P1 - High
**Goal:** Persist data and flesh out the dashboard.

### Deliverables

**Dashboard Tabs**
- [x] **Overview**: Basic KPI grid and activity feed layout exists.
- [ ] **Roadmap**: Convert static timeline to interactive Gantt chart.
- [ ] **Tasks**: Implement task list with 'Todo/Doing/Done' states.
- [ ] **Systems**: Detailed view of the selected systems from Wizard Step 3.

**Backend Integration**
- [ ] **Supabase Setup**: Init project and create `wizards` table.
- [ ] **Auth**: Simple email magic link login.
- [ ] **Sync**: Push local `AppState` to Supabase upon Wizard completion.

### Success Criteria
- [ ] Dashboard displays dynamic data from the completed Wizard.
- [ ] Refreshing the dashboard does not lose the session.

---

## 🧠 Phase 3: Advanced Features & Polish

**Status:** 🔴 Not Started (0%)
**Timeline:** Weeks 9-12
**Priority:** P2 - Enhancement

### Deliverables

**Advanced AI**
- [ ] **Deep Research**: Agentic workflow to crawl client website for deeper context.
- [ ] **RAG**: Upload client PDF/Docs to context.

**Production Features**
- [ ] **PDF Export**: "Download Strategy Plan" as a branded PDF.
- [ ] **Email Integration**: Send the 30-day plan via email.

---

## 📉 Risks & Mitigation

1.  **AI Latency**: Step 1 Search and Step 5 Plan generation might take time.
    *   *Mitigation*: Use the Right Panel to show "Thinking..." steps (e.g., "Reading website...", "Analyzing market...") to keep user engaged.
2.  **Hallucination**: AI might invent systems that don't exist.
    *   *Mitigation*: Hardcode the list of available *Systems* (Step 3) and only allow AI to *recommend* from that list, not invent new ones.

---

## Next Steps (Immediate)

1.  **API Key Setup**: Configure environment variables.
2.  **Client Initialization**: Create `lib/ai.ts` to manage the Gemini client.
3.  **Step 1 Wiring**: Connect the "Business Context" form to a live Gemini stream in the Right Panel.

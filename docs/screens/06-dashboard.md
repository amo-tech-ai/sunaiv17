# Dashboard

**Phase:** Phase 2 (Backend Integration)
**Status:** ⚪ Planned
**AI Model:** `gemini-3-flash-preview`
**Agent Role:** 🎼 **The Orchestrator**

---

## 1. Description & Purpose
Once the wizard is complete, the user lands here. The Dashboard manages the execution of the 30-Day Plan.

**Key Goals:**
1.  **Overview**: High-level KPI view.
2.  **Task Management**: Specific deliverables generated in Step 5 become checkable tasks.
3.  **System Status**: Monitor the active AI agents.

---

## 2. Layout Logic (Full Screen)
The Dashboard breaks the 3-panel mold and uses a standard **Admin Dashboard** layout with a sidebar navigation and top header.

| Tab | Content | AI Agent Role |
| :--- | :--- | :--- |
| **Overview** | KPI Cards, Activity Feed. | **Analyst**: Summarize recent activity. |
| **Roadmap** | Gantt Chart of Step 5. | **Planner**: Re-adjust dates if tasks are delayed. |
| **Tasks** | Kanban/List of To-Dos. | **Orchestrator**: Auto-generate sub-tasks. |
| **Systems** | Configuration for selected agents. | **Optimizer**: Suggest tuning parameters. |

---

## 3. AI Agent: The Orchestrator

**System Instruction:**
"You are a Project Manager. Monitor the state of tasks. If a critical task is overdue, suggest a roadmap adjustment."

**Gemini 3 Features:**
-   **Function Calling**: The Orchestrator can "call" functions like `sendReminderEmail()` or `rescheduleTask()`.
-   **Code Execution**: Calculate project completion % or ROI metrics based on raw data.

---

## 4. Implementation Prompts

### Step 1: Dashboard Shell
```text
Create `components/dashboard/DashboardLayout.tsx`.
- Sidebar with Tabs (Overview, Roadmap, Tasks, Systems).
- Top Header with User Profile.
- Main Content Area.
```

### Step 2: Task Generation
```text
Create `services/gemini/orchestrator.ts`.
- Function `generateTasksFromRoadmap(roadmapJSON)`.
- Convert the high-level roadmap items from Step 5 into granular, checkable tasks in a `Todo[]` structure.
```

### Step 3: Persistent State
```text
Ensure `AppState` is saved to Supabase (Phase 2).
- On Dashboard load, fetch the `roadmap` and `tasks` from the DB.
```

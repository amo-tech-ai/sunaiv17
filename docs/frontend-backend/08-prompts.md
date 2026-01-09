
# 08. Feature Completion Prompts & Progress Tracker

**Context:** Closing the final 2% gap for Production Readiness.
**Focus:** Dashboard Interactivity, Real Data Wiring, and AI Agent Polish.

---

## 🟢 Progress Tracker

| Module | Feature | Current | Target | Status |
| :--- | :--- | :---: | :---: | :--- |
| **Projects** | Detail View | 100% | 100% | 🟢 Complete |
| | Create Flow | 100% | 100% | 🟢 Complete |
| **Analytics** | Real Data Wiring | 100% | 100% | 🟢 Complete |
| | AI Insights | 100% | 100% | 🟢 Complete |
| | Export CSV | 100% | 100% | 🟢 Complete |
| **Settings** | User Prefs | 100% | 100% | 🟢 Complete |
| | Org Settings | 100% | 100% | 🟢 Complete |
| **Roadmap** | Scenario Planner | 100% | 100% | 🟢 Complete |
| **Tasks** | Edit Modal | 100% | 100% | 🟢 Complete |
| **Systems** | Logs View | 100% | 100% | 🟢 Complete |
| **Agents** | Global Assistant | 100% | 100% | 🟢 Complete |
| | Monitor Agent | 100% | 100% | 🟢 Complete |
| **Gemini** | Code Execution | 100% | 100% | 🟢 Complete |

---

## 1. Dashboard: Projects (Completed)

### Prompt 1: Project Detail View
```text
Refactor `components/dashboard/Projects/ProjectDetail.tsx` to be a fully functional slide-out or full-page view.
1. Props: Accept `projectId` instead of full object. Fetch full details via `useProjects` or direct Supabase query.
2. Header: Show Name, Client, Status Badge (editable), and Progress Bar.
3. Tabs: Overview, Tasks (Filtered), Timeline.
4. Actions: Wire "Archive" button to `supabase.update({status: 'archived'})`.
5. Data: Ensure task list updates in real-time when tasks are moved in the main board.
```

### Prompt 2: Create Project Flow
```text
Create `components/dashboard/Projects/CreateProjectModal.tsx`.
1. Fields: Name (text), Client (Select from `crm_contacts`), Start Date (date), Budget (number).
2. Action: On submit, call `supabase.from('projects').insert()`.
   - Default `status` to 'Planning'.
   - Default `current_phase` to 'Foundation'.
3. Feedback: Show toast on success and close modal.
4. Integration: Add "New Project" button to `ProjectPlanningLayout.tsx` header.
```

---

## 2. Dashboard: Analytics (Completed)

### Prompt 3: Wire Real Analytics Data
```text
Refactor `hooks/useAnalytics.ts`.
1. Remove all mock data generation.
2. Implement `fetchRevenue`: Query `invoices` table, group by `created_at` (month), sum `amount`.
3. Implement `fetchClients`: Query `crm_contacts`, count by `created_at` (month).
4. Implement `fetchCapacity`: Query `team_members` count vs `projects` count.
5. Return formatted data for Recharts area/bar charts.
6. Handle empty states gracefully.
```

### Prompt 4: AI Insights Panel
```text
Update `components/dashboard/Analytics/AnalyticsLayout.tsx`.
1. Logic: On mount, calculate summary stats (Total Rev, Growth %, Active Clients).
2. AI: Call `supabase.functions.invoke('analytics')` with these stats.
3. UI: Render the returned `insights` array in the Right Panel.
4. Add a "Refresh Analysis" button to re-run the Agent.
```

### Prompt 5: Export CSV
```text
Add export functionality to `AnalyticsLayout.tsx`.
1. Create function `handleExportCSV`.
2. Query `invoices` joined with `projects` and `clients`.
3. Format as CSV string: `Date,Client,Project,Amount,Status`.
4. Trigger browser download via Blob URL.
5. Add "Export Report" button to the header.
```

---

## 3. Dashboard: Settings (Completed)

### Prompt 6: User Preferences Persistence
```text
Enhance `SettingsView.tsx`.
1. Create table `user_preferences` (user_id, theme, email_notif, slack_notif).
2. Create `usePreferences` hook to fetch/upsert this table.
3. UI: Add Toggles for Notifications and Theme.
4. Logic: Auto-save on change (debounced 500ms).
5. Feedback: Show "Saved" indicator next to the header.
```

### Prompt 7: Organization Settings
```text
Add an "Organization" section to `SettingsView.tsx`.
1. Fetch `organizations` table data for the current user.
2. Display: Name, Billing Email, Plan Tier.
3. Edit: Allow Name edit if `role === 'owner'`.
4. Upgrade: If Tier is 'Free', show "Upgrade Plan" button (link to dummy Stripe page).
```

---

## 4. Dashboard: Roadmap Enhancements (Completed)

### Prompt 8: Scenario Planner
```text
Create `components/dashboard/Roadmap/ScenarioPlanner.tsx`.
1. UI: "What If" button in Roadmap header.
2. Modal: Inputs for "Accelerate Timeline", "Cut Budget", "Add Phase".
3. AI: On Submit, call `planner` Edge Function with `mode: 'scenario'`.
4. Result: Show a "Diff" view of the timeline (Old vs New dates).
5. Action: "Apply Changes" updates the `roadmaps` table.
```

---

## 5. Dashboard: Tasks Enhancements (Completed)

### Prompt 9: Task Edit Modal
```text
Create `components/dashboard/Tasks/TaskEditModal.tsx`.
1. Trigger: Clicking a task card in `TaskBoard.tsx`.
2. Form: Title, Description, Priority (Select), Status (Select), Phase (Select), Tags (Input).
3. Logic: `supabase.from('tasks').update()`.
4. Delete: Add "Delete Task" button with `window.confirm`.
5. UI: Update local state immediately (Optimistic).
```

---

## 6. Dashboard: Systems Enhancements (Completed)

### Prompt 10: System Logs View
```text
Update `components/dashboard/SystemsView.tsx`.
1. Right Panel: Replace static logs with real data.
2. Query: `supabase.from('ai_run_logs').select('*').order('created_at', { ascending: false }).limit(20)`.
3. Render: Time (HH:MM), Agent (e.g. 'Planner'), Token Usage, and Latency.
4. Style: Keep the "Terminal" aesthetic (monospace, dark bg).
```

---

## 7. AI Agents: Complete Partial Implementations (Completed)

### Prompt 11: Assistant Agent Full Wiring
```text
Create `components/GlobalChatbot.tsx`.
1. UI: Floating Action Button (bottom-right) opening a chat window.
2. Logic: `supabase.functions.invoke('assistant')`.
3. Context: Pass current URL/Page to the agent.
4. History: Store messages in `chat_history` table (needs creation) or local state for MVP.
5. Goal: Allow user to ask "Where is the billing tab?" or "Summarize my active projects".
```

### Prompt 12: Monitor Agent Full Wiring
```text
Update `components/dashboard/SystemsView.tsx` logic.
1. On mount, call `monitor` Edge Function.
2. Function Logic: Check last activity timestamp of all connected systems (mocked external API calls).
3. Output: Status ('Healthy', 'Degraded', 'Offline') for each system.
4. UI: Update status badges on System Cards based on response.
```

---

## 8. Gemini 3: Missing Features (Completed)

### Prompt 13: Code Execution Integration
```text
Update `supabase/functions/scorer/index.ts`.
1. Enable `tools: [{ codeExecution: {} }]` in Gemini config.
2. Update Prompt: "Write a Python script to calculate the weighted score based on these boolean inputs... Return the printed score."
3. Logic: Parse the Python output.
4. Storage: Save the calculated score to `context_snapshots`.
```

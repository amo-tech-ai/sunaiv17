
# Agency Dashboard Screen 2: Project Planning Tab — Implementation Prompt

**Progress Tracker:** Agency Dashboard Screen 2 of 3 | Status: Planning Phase | Priority: P0 Critical  
**Estimated Implementation:** 12-15 days | Dependencies: Project Database Schema, Task Management System, Edge Functions  
**Completion Criteria:** Project management works, task tracking accurate, phase management functional, AI insights relevant

---

## Executive Summary

The Project Planning Tab provides agency team with comprehensive project planning and management system. This screen enables project managers and team members to plan projects, assign tasks, track progress, manage deliverables, and coordinate team activities. The AI-powered insights provide project summaries, progress predictions, resource planning, and risk alerts, helping teams execute projects successfully.

**Core Value:** Project managers have complete visibility into project execution with intelligent assistance. The AI monitors progress, identifies risks, predicts completion dates, and suggests resource reallocation, enabling teams to deliver projects on time and within budget.

---

## Three-Panel Layout Architecture

### Left Panel (20% Width) — Projects Summary

**Purpose:** Display projects overview and filters.

**Content Structure:**
- Projects summary (active projects, completed projects, total revenue)
- Project filters (All, Active, On Hold, Completed, Archived)
- Team member filter (view projects assigned to team member)
- Status indicators (Planning, Active, On Hold, Completed, Archived)
- Quick navigation to other tabs

**Design Principles:**
- Clear visual hierarchy showing projects status
- Filters are easily accessible
- Status indicators use color coding
- Consistent styling with other dashboard tabs

**User Experience:**
- Users see projects status at a glance
- Filters are quick to apply
- Team member filter enables workload management
- Navigation to other tabs is convenient

---

### Center Panel (50% Width) — Project Management

**Purpose:** Main work area for project planning and management.

**Content Structure:**
- **Project List:**
  - Table/Grid view with project cards (project name, client name, industry, status, assigned team members, current phase, progress, start/end date, project value, actions)
  - Filter options (Status, Industry, Assigned To, Phase)
  - Sort options (Name, Start Date, Progress, Value)
  - Search projects (by project name, client name, industry)
  - Bulk actions (assign, change status, archive)

- **Project Detail View (When Selected):**
  - **Overview Section:** Project information, status, current phase, assigned team members, timeline, progress, budget vs actual
  - **Phases Section:** Three-phase roadmap display with status indicators, progress bars, goals, deliverables, timeline, unlock/lock controls, complete phase button
  - **Tasks Section:** Kanban board view (Todo, In Progress, Done) with task cards, drag-and-drop, filters, search, create task button
  - **Deliverables Section:** Deliverables list with status, assignee, due date, phase assignment, detail view, status updates, create deliverable button
  - **Team Section:** Assigned team members list, workload visualization, assign/remove team member, team member roles

**User Experience:**
- Project list is clear and easy to scan
- Detail view is comprehensive and organized
- Task management is intuitive
- Phase management is clear and logical

---

### Right Panel (30% Width) — Intelligence & Quick Actions

**Purpose:** AI-powered project insights and quick actions.

**Content Structure:**
- **Intelligence Panel:**
  - Project summary (AI-generated project overview)
  - Progress insights (completion predictions, risk alerts)
  - Resource insights (team workload, capacity planning)
  - Timeline insights (milestone tracking, delays)
  - Risk identification (projects at risk of delay)
  - Bottleneck detection (blockers identified)

- **Quick Actions:**
  - Change status dropdown
  - Assign team member dropdown
  - Create task button
  - Create deliverable button
  - Complete phase button
  - Generate report button (future)

**User Experience:**
- AI insights are proactive and helpful
- Risk alerts prevent surprises
- Resource insights help with capacity planning
- Quick actions are easily accessible

---

## Purpose & Strategic Intent

**Primary Purpose:** Provide agency team with comprehensive project planning and management system.

This screen enables project managers and team members to plan projects, assign tasks, track progress, and coordinate team activities. The AI monitors progress, identifies risks, predicts completion dates, and suggests resource reallocation, helping teams deliver projects successfully.

**Strategic Intent:**
- Enable efficient project planning and execution
- Provide transparent progress tracking
- Enable proactive risk management
- Optimize resource allocation
- Increase project success rates

**Business Impact:**
- Higher project success rates through better planning
- Reduced delays through risk identification
- Better resource utilization through capacity planning
- Increased client satisfaction through on-time delivery

---

## Goals & Success Criteria

### Functional Goals

**Goal 1: Project Management**
- Manage all client projects from planning to completion
- Success metric: 100% of projects are accessible and manageable
- Verification method: Project management testing, user testing
- Edge cases: Many projects, complex projects, long-running projects

**Goal 2: Phase Tracking**
- Track three-phase roadmap progress (Phase 1, Phase 2, Phase 3)
- Success metric: 100% of phases are tracked accurately
- Verification method: Phase tracking testing, progress calculation testing
- Edge cases: Phase delays, phase changes, phase dependencies

**Goal 3: Task Management**
- Assign tasks, track progress, manage priorities
- Success metric: 100% of tasks are manageable and trackable
- Verification method: Task management testing, Kanban testing
- Edge cases: Many tasks, complex tasks, task dependencies

**Goal 4: Deliverable Management**
- Track deliverables through approval workflow
- Success metric: 100% of deliverables are tracked accurately
- Verification method: Deliverable tracking testing, workflow testing
- Edge cases: Many deliverables, complex approvals, deliverable changes

**Goal 5: Team Coordination**
- Assign team members, track workload, manage capacity
- Success metric: Team assignments and workload tracking work correctly
- Verification method: Team management testing, workload testing
- Edge cases: Team changes, overloaded team members, capacity issues

**Goal 6: Progress Monitoring**
- Track project progress, identify risks, predict completion
- Success metric: Progress calculations are accurate, risks are detected
- Verification method: Progress calculation testing, risk detection testing
- Edge cases: Rapid progress changes, stalled progress, multiple risks

**Goal 7: AI Assistance**
- Get AI-generated insights and recommendations for project management
- Success metric: 85%+ of AI insights are helpful
- Verification method: User feedback, relevance testing
- Edge cases: New projects, complex projects, stalled projects

---

## Real-World Examples & Applications

### Example 1: Managing DTC Brand Projects

**Scenario:** Project Manager views "Fall Collection Launch" project and receives risk alert.

**User Actions:**
- Project Manager opens Project Planning Tab
- Project Manager views project list
- Project Manager selects "Fall Collection Launch" project
- Project Manager reviews project detail and AI insights

**AI Processing:**
- Planner Agent analyzes project data
- Detects blocked tasks
- Calculates impact on timeline
- Generates risk alert

**AI Output:**
- Project summary: "Fall Collection Launch is in Phase 1 (Foundation). Progress: 60%. On track overall"
- Progress insights: "Content tasks are blocked by pending photography. Risk of 2-day delay"
- Resource insights: "Design team at 95% capacity. Consider reallocating tasks"
- Timeline insights: "Phase 1 completion expected in 5 days (on schedule if photography unblocks)"
- Risk identification: "Timeline risk: Product feed API credentials pending from IT team"
- Bottleneck detection: "Content tasks blocked by photography. Contact photography team"

**User Experience:**
- Project Manager sees clear project status
- Risk alert is proactive and helpful
- Resource insights help with capacity planning
- Project Manager can take immediate action

---

### Example 2: Real Estate CRM Integration Project

**Scenario:** Implementation Specialist views "CRM Integration" project.

**AI Output:**
- Project summary: "Phase 2 (Implementation). Progress: 45%. Ahead of schedule"
- Progress insights: "Phase 1 complete. Phase 2 unlocked. All tasks on schedule"
- Resource insights: "Implementation team at 70% capacity. Good capacity for additional work"
- Timeline insights: "Phase completion likely 2 days early based on current task velocity"
- Risk identification: "No risks detected. Project is on track"

**User Experience:** Positive progress, encouraging predictions, available capacity visible, team confident

---

## Industry Wireframe & UI/UX Layout

### Desktop Layout (1024px+)

**Left Panel:**
- Fixed width: 20% of viewport
- Sticky positioning: Remains visible during scroll
- Background: Light neutral (#FAF8F6)
- Content: Projects summary, filters, status indicators, navigation

**Center Panel:**
- Width: 50% of viewport
- Max-width: 1100px for project management
- Padding: 48px top, 32px sides, 48px bottom
- Content: Project list, project detail view, phases, tasks, deliverables
- Scrollable: Content area scrolls independently

**Right Panel:**
- Fixed width: 30% of viewport
- Sticky positioning: Remains visible during scroll
- Background: Dark neutral (#1A1A1A) for intelligence panel
- Content: Project insights, risk alerts, resource insights, quick actions

### Mobile Layout (768px and below)

**Layout Changes:**
- Left panel: Collapsed or minimal
- Center panel: Full width, project cards stacked
- Right panel: Collapsible section or separate tab

**Touch Interactions:**
- Large tap targets for project cards
- Swipe navigation between project sections
- Drag-and-drop for tasks (touch-friendly)
- Easy task and deliverable creation

---

## Gemini 3 Features & Tools

### Required Features

**Structured Output:**
- Purpose: Guarantee valid project summaries and progress insights
- Schema: JSON structure with project summary, progress insights, resource insights, timeline insights
- Validation: Strict schema enforcement ensures consistency
- Output: Reliable data structure for project insights

**Function Calling:**
- Purpose: Trigger actions (create task, assign team member, complete phase)
- Implementation: Call Edge Functions for project operations
- Output: Action confirmations, updated project data
- Performance: Must complete within 2 seconds for good UX

**Thinking Mode:**
- Purpose: Deep analysis for progress predictions and risk assessment
- Budget: 1024 tokens for complex project analysis
- Process: Analyzes dependencies, calculates predictions, identifies risks
- Output: Comprehensive project insights with reasoning
- Performance: Adds 5-10 seconds but ensures quality

### Optional Features

**Streaming:**
- Purpose: Real-time project summary updates
- Implementation: Stream text as it's generated
- Benefits: Perceived speed, engagement
- Performance: First chunk within 2 seconds

**Code Execution:**
- Purpose: Progress calculations and timeline predictions
- Implementation: Mathematical calculations for progress and predictions
- Output: Accurate progress percentages and completion dates
- Performance: Must complete within 1 second for calculations

### Model Selection

**Gemini 3 Pro:**
- Rationale: Deep reasoning required for project planning and risk assessment
- Performance: 5-10 seconds for project analysis with thinking
- Quality: Ensures accurate progress predictions and risk identification
- Cost: Higher cost justified by quality requirement

---

## AI Agent: Planner Agent

### Agent Profile

**Agent Type:** Planner & Project Management Specialist  
**Model:** Gemini 3 Pro  
**Primary Responsibility:** Project planning, progress analysis, and resource management  
**Persona:** Senior project manager with strategic planning expertise

### Input Requirements

**Required Input:**
- Project data (name, client, status, phase, timeline)
- Phase data (status, progress, goals, deliverables)
- Task data (status, assignee, effort, due date, phase)
- Deliverable data (status, assignee, due date, phase)
- Team data (assigned team members, workload)

**Context:**
- Historical project data
- Team capacity data
- Industry benchmarks

### Processing Logic

**Step 1: Project Analysis**
- Analyze project data and progress
- Calculate overall project progress
- Identify current phase status
- Assess project health

**Step 2: Progress Prediction**
- Analyze task completion velocity
- Predict phase completion dates
- Predict overall project completion
- Consider dependencies and risks

**Step 3: Risk Identification**
- Identify projects at risk of delay
- Detect blocked tasks and dependencies
- Assess impact of risks on timeline
- Prioritize risks by severity

**Step 4: Resource Analysis**
- Analyze team workload and capacity
- Identify overloaded team members
- Detect bottlenecks and blockers
- Suggest resource reallocation

**Step 5: Summary Generation**
- Create project summary
- Generate progress insights
- Provide resource insights
- Identify risks and bottlenecks

### Output Structure

**Project Summary:**
- AI-generated project overview
- Current status and phase
- Overall progress and health
- Natural language format

**Progress Insights:**
- Completion predictions with confidence levels
- Risk alerts with impact assessment
- Timeline insights with milestone tracking
- Strategic recommendations

**Resource Insights:**
- Team workload analysis
- Capacity planning recommendations
- Bottleneck identification
- Resource reallocation suggestions

**Timeline Insights:**
- Milestone tracking and predictions
- Delay identification and impact
- Dependency analysis
- Critical path identification

---

## Core Prompts & Edge Functions

### Core Prompt: Project Summary Generation

**Purpose:** Generate comprehensive project summary from project data.

**Prompt Structure:**
- System context: Role as senior project manager
- Task: Summarize project status and provide insights
- Input: Project data, phase data, task data, team data
- Output format: Structured JSON with summary, insights, recommendations
- Constraints: Must be accurate, proactive, helpful

**Key Instructions:**
- Summarize project status accurately
- Highlight key progress points
- Identify risks proactively
- Provide predictions with confidence levels
- Use natural, professional language
- Be honest about delays or challenges

### Core Prompt: Progress Prediction

**Purpose:** Predict project and phase completion dates.

**Prompt Structure:**
- System context: Project analyst with predictive capabilities
- Task: Predict completion dates based on current progress
- Input: Progress data, velocity data, task data, dependencies
- Output format: Predictions with confidence levels and reasoning
- Constraints: Must be realistic, consider dependencies, use Thinking Mode

**Key Instructions:**
- Consider current velocity and trends
- Factor in dependencies and risks
- Use Thinking Mode for deep analysis
- Provide confidence levels
- Be realistic, not optimistic
- Update predictions as progress changes

### Core Prompt: Risk Identification

**Purpose:** Identify projects at risk and detect bottlenecks.

**Prompt Structure:**
- System context: Risk analyst monitoring project health
- Task: Identify risks and bottlenecks proactively
- Input: Project data, task data, dependency data, team data
- Output format: Risk alerts with impact assessment
- Constraints: Must be accurate, actionable, timely

**Key Instructions:**
- Detect risks early and accurately
- Assess impact on timeline and resources
- Identify bottlenecks and blockers
- Provide actionable recommendations
- Use clear, urgent language for critical risks
- Be specific about causes and solutions

### Edge Function Architecture

**Function Name:** `analyze-project-progress`

**Purpose:** Analyze project progress and generate insights.

**Input:**
- Project data (status, phase, timeline)
- Phase data (status, progress, goals)
- Task data (status, assignee, effort, due date)
- Deliverable data (status, assignee, due date)
- Team data (workload, capacity)

**Processing:**
- Analyze project progress and health
- Calculate progress predictions using Thinking Mode
- Identify risks and bottlenecks
- Analyze resource allocation
- Generate summary and insights

**Output:**
- Structured JSON with project summary, progress insights, resource insights, timeline insights, risks

**Error Handling:**
- Handle missing data gracefully
- Provide fallback summaries if analysis fails
- Log errors for monitoring
- User-friendly error messages

**Performance:**
- Target: Complete within 10 seconds
- Thinking Mode: 5-10 seconds for deep analysis
- Progress calculation: 2-3 seconds
- Summary generation: 2-3 seconds
- Timeout: 20 seconds maximum

---

## Progress Summary

**Current Status:** Planning and documentation complete  
**Next Steps:** Implementation of Planner Agent, project database schema, task management system  
**Blockers:** None identified  
**Dependencies:** Project database schema, task management system, Edge Functions  
**Estimated Completion:** 12-15 days from start of implementation

**Key Deliverables:**
- Planner Agent | Project database schema | Task management system | Phase management
- Deliverable tracking | Team coordination | Progress calculation | Risk detection
- AI insights generation | Real-time updates

**Success Metrics:**
- 100% projects/phases/tasks/deliverables accessible | Team assignments work | Progress accurate
- 85%+ AI insights helpful | <10s analysis | Positive feedback

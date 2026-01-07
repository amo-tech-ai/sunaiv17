
# Client Dashboard Screen 2: Timeline Tab — Implementation Prompt

**Progress Tracker:** Client Dashboard Screen 2 of 3 | Status: Planning Phase | Priority: P0 Critical  
**Estimated Implementation:** 6-8 days | Dependencies: Roadmap Data Structure, Progress Tracking System  
**Completion Criteria:** Timeline visualization works, progress tracking accurate, milestone management functional, AI insights relevant

---

## Executive Summary

The Timeline Tab provides clients with clear visibility into project timeline, phase progress, and milestone tracking. This screen shows the strategic roadmap generated during the wizard, tracks execution progress, and helps clients understand what's happening, when, and what's coming next. The AI-powered insights provide proactive updates and risk alerts.

**Core Value:** Clients see exactly where their project stands with transparent progress tracking. The AI monitors timeline health, identifies risks, and provides predictions, giving clients confidence and helping them plan ahead. This transparency builds trust and prevents surprises.

---

## Three-Panel Layout Architecture

### Left Panel (20% Width) — Project Overview

**Purpose:** Display project context and progress summary.

**Content Structure:**
- Project overview (company name, industry, start date)
- Current phase indicator (Phase 1, 2, or 3)
- Overall progress percentage (0-100%)
- Key milestones summary (upcoming, completed, overdue)
- Quick navigation to other tabs

**Design Principles:**
- Clear visual hierarchy showing project status
- Progress percentage prominently displayed
- Milestone summary provides quick context
- Consistent styling with other dashboard tabs

**User Experience:**
- Users see project status at a glance
- Progress is immediately clear
- Milestones are easily accessible
- Navigation to other tabs is convenient

---

### Center Panel (50% Width) — Timeline Visualization

**Purpose:** Main work area for timeline and phase visualization.

**Content Structure:**
- **Timeline Visualization:**
  - Three-phase roadmap visualization (Foundation, Implementation, Optimization)
  - Phase 1: Days 1-30 (Foundation)
  - Phase 2: Days 31-60 (Implementation)
  - Phase 3: Days 61-90 (Optimization)
  - Phase status indicators (LOCKED, ACTIVE, COMPLETED, PAUSED)
  - Phase progress bars (percentage complete)
  - Milestone markers on timeline
  - Dependency lines (Phase 2+ enhancement)
  - Gantt chart visualization (Phase 2+ enhancement)

- **Phase Details:**
  - Expandable phase sections
  - Phase goals list (with completion indicators)
  - Phase tasks list (with status: Todo, In Progress, Done)
  - Phase deliverables list (with status: Pending, In Review, Approved, Delivered)
  - Phase duration and dates
  - Phase progress percentage

- **Milestone Tracking:**
  - Upcoming milestones list (with countdown)
  - Completed milestones list (with checkmarks)
  - Overdue milestones highlighted (red)
  - Milestone descriptions and context
  - Milestone completion notifications

**User Experience:**
- Timeline is clear and easy to understand
- Phase details are accessible and informative
- Milestones are tracked and visible
- Progress is transparent and motivating

---

### Right Panel (30% Width) — Intelligence & Activity

**Purpose:** AI-powered timeline insights and activity feed.

**Content Structure:**
- **Intelligence Panel:**
  - Timeline summary (AI-generated project status)
  - Phase insights (observations about current phase)
  - Risk alerts (if timeline is at risk)
  - Progress predictions (expected completion dates)
  - Milestone reminders (upcoming milestones)

- **Activity Feed:**
  - Phase status changes (with timestamps)
  - Milestone completions (with dates)
  - Deliverable submissions (with status)
  - Task completions (with updates)
  - Real-time updates via Supabase Realtime

**User Experience:**
- AI insights are proactive and helpful
- Risk alerts prevent surprises
- Activity feed provides transparency
- Real-time updates keep users informed

---

## Purpose & Strategic Intent

**Primary Purpose:** Provide clients with clear visibility into project timeline and progress.

This screen enables clients to understand exactly where their project stands, what's happening now, and what's coming next. The AI monitors timeline health, identifies risks, and provides predictions, giving clients confidence and helping them plan ahead.

**Strategic Intent:**
- Provide transparent progress tracking
- Enable proactive risk communication
- Build trust through honest timeline updates
- Help clients plan ahead with predictions
- Create confidence through visibility

**Business Impact:**
- Higher client satisfaction through transparency
- Reduced surprises through risk alerts
- Better planning through predictions
- Increased trust through honest updates

---

## Goals & Success Criteria

### Functional Goals

**Goal 1: Timeline Visibility**
- Show complete three-phase roadmap with clear timeline
- Success metric: 100% of phases and milestones are visible
- Verification method: User testing, visual inspection
- Edge cases: Many phases, complex dependencies, long timelines

**Goal 2: Progress Tracking**
- Display current phase progress and overall project progress
- Success metric: Progress calculations are accurate
- Verification method: Compare calculations vs actual progress
- Edge cases: Rapid progress changes, stalled progress, negative progress

**Goal 3: Milestone Management**
- Track key milestones with dates and status
- Success metric: 100% of milestones are tracked accurately
- Verification method: Milestone status testing
- Edge cases: Many milestones, overlapping dates, missed milestones

**Goal 4: Phase Transparency**
- Show what's happening in each phase (goals, tasks, deliverables)
- Success metric: Phase details are complete and accurate
- Verification method: Content verification, user testing
- Edge cases: Empty phases, very full phases, phase changes

**Goal 5: Dependency Visualization**
- Show phase dependencies and critical path (Phase 2+)
- Success metric: Dependencies are accurately represented
- Verification method: Dependency logic testing
- Edge cases: Complex dependencies, circular dependencies, no dependencies

**Goal 6: Risk Communication**
- Alert clients to timeline risks or delays
- Success metric: 90%+ of risks are detected accurately
- Verification method: Risk detection testing, user feedback
- Edge cases: False positives, missed risks, multiple risks

**Goal 7: Expectation Setting**
- Help clients understand realistic timelines
- Success metric: Predictions are accurate within 5 days
- Verification method: Compare predictions vs actual completion
- Edge cases: Delayed projects, accelerated projects, scope changes

---

## Real-World Examples & Applications

### Example 1: Fashion Brand Timeline Tracking

**Scenario:** Luxe Threads checks Phase 1 progress and sees timeline risk.

**User Actions:**
- Client opens Timeline Tab
- Client views "Phase 1: Foundation" status
- Client sees "Data Integration" task at 80% complete
- Client notices risk alert in right panel

**AI Processing:**
- Monitor Agent analyzes timeline data
- Detects that "Product feed API credentials" task is blocked
- Calculates impact on timeline
- Generates risk alert

**AI Output:**
- Timeline summary: "Phase 1 is 75% complete, on track overall"
- Phase insights: "Data Integration progressing well, 80% complete"
- Risk alert: "Timeline risk: Product feed API credentials pending from IT team. May delay Phase 2 start by 2-3 days"
- Progress prediction: "Phase 1 completion expected in 5 days (on schedule)"

**User Experience:**
- Client sees clear progress status
- Risk alert is proactive and helpful
- Client can take action (contact IT team)
- Predictions provide confidence

---

### Example 2: Real Estate Agency Timeline View

**Scenario:** Urban Properties views Phase 2 progress and sees positive prediction.

**User Actions:**
- Client opens Timeline Tab
- Client views "Phase 2: Implementation" status
- Client sees milestones "WhatsApp Bot Setup" and "CRM Integration" marked Active
- Client checks progress predictions

**AI Processing:**
- Monitor Agent analyzes task completion velocity
- Calculates phase completion prediction
- Identifies that phase is ahead of schedule
- Generates positive prediction

**AI Output:**
- Timeline summary: "Phase 2 is 45% complete, ahead of schedule"
- Phase insights: "WhatsApp Bot Setup and CRM Integration both active and progressing well"
- Progress prediction: "Phase completion likely 2 days early based on current task velocity"
- Milestone reminders: "WhatsApp Bot Setup milestone approaching in 3 days"

**User Experience:**
- Client sees positive progress
- Predictions are encouraging
- Milestone reminders help planning
- Client feels confident about timeline

---

## Industry Wireframe & UI/UX Layout

### Desktop Layout (1024px+)

**Left Panel:**
- Fixed width: 20% of viewport
- Sticky positioning: Remains visible during scroll
- Background: Light neutral (#FAF8F6)
- Content: Project overview, progress percentage, milestone summary

**Center Panel:**
- Width: 50% of viewport
- Max-width: 1000px for timeline readability
- Padding: 48px top, 32px sides, 48px bottom
- Content: Timeline visualization, phase details, milestone tracking
- Scrollable: Timeline scrolls horizontally or vertically

**Right Panel:**
- Fixed width: 30% of viewport
- Sticky positioning: Remains visible during scroll
- Background: Dark neutral (#1A1A1A) for intelligence panel
- Content: Timeline insights, risk alerts, activity feed

### Mobile Layout (768px and below)

**Layout Changes:**
- Left panel: Collapsed or minimal
- Center panel: Full width, timeline scrolls horizontally
- Right panel: Collapsible section or separate tab

**Touch Interactions:**
- Swipe navigation on timeline
- Tap to expand phase details
- Tap milestones for details
- Pull to refresh progress

---

## Gemini 3 Features & Tools

### Required Features

**Text Generation:**
- Purpose: Generate timeline summaries and insights
- Implementation: Natural language generation based on timeline data
- Output: Timeline summaries, phase insights, risk alerts, predictions
- Performance: Must complete within 3 seconds for good UX

**Streaming:**
- Purpose: Real-time timeline summary generation
- Implementation: Stream text as it's generated
- Benefits: Perceived speed, engagement
- Performance: First chunk within 2 seconds

### Model Selection

**Gemini 3 Flash:**
- Rationale: Fast response time critical for timeline summaries
- Performance: Sub-2 second first token, complete in 3-5 seconds
- Cost: Lower cost enables frequent updates
- Quality: Sufficient for timeline summaries and insights

---

## AI Agent: Monitor Agent

### Agent Profile

**Agent Type:** Monitor & Progress Tracking Specialist  
**Model:** Gemini 3 Flash  
**Primary Responsibility:** Timeline monitoring and progress insights  
**Persona:** Proactive project monitor with analytical capabilities

### Input Requirements

**Required Input:**
- Project timeline data (phases, tasks, milestones)
- Phase status and progress
- Milestone dates and completion status
- Task completion data

**Context:**
- Project information (company, industry, start date)
- Historical progress data
- Agency updates

### Processing Logic

**Step 1: Progress Calculation**
- Calculate phase progress percentages
- Calculate overall project progress
- Compare progress to expected timeline

**Step 2: Milestone Analysis**
- Identify upcoming milestones (next 30 days)
- Detect overdue milestones
- Calculate milestone completion rates

**Step 3: Risk Detection**
- Analyze timeline for risks or delays
- Identify blocked tasks or dependencies
- Calculate impact of delays

**Step 4: Prediction Generation**
- Predict phase completion dates
- Predict overall project completion
- Consider current velocity and trends

**Step 5: Summary Generation**
- Create timeline summary
- Generate phase insights
- Provide risk alerts and predictions

### Output Structure

**Timeline Summary:**
- AI-generated project status
- Overall progress and phase status
- Natural language format

**Phase Insights:**
- Observations about current phase
- Progress highlights
- Notable achievements or challenges

**Risk Alerts:**
- Timeline risks identified
- Impact assessment
- Recommended actions

**Progress Predictions:**
- Expected completion dates
- Confidence levels
- Factors considered

**Milestone Reminders:**
- Upcoming milestones
- Countdown information
- Preparation suggestions

---

## Core Prompts & Edge Functions

### Core Prompt: Timeline Summary Generation

**Purpose:** Generate comprehensive timeline summary from project data.

**Prompt Structure:**
- System context: Role as proactive project monitor
- Task: Summarize timeline status and provide insights
- Input: Timeline data, progress data, milestone data
- Output format: Natural language summary with insights
- Constraints: Must be accurate, proactive, helpful

**Key Instructions:**
- Summarize timeline status accurately
- Highlight key progress points
- Identify risks proactively
- Provide predictions with confidence levels
- Use natural, helpful language
- Be honest about delays or challenges

### Core Prompt: Risk Detection

**Purpose:** Identify timeline risks and delays proactively.

**Prompt Structure:**
- System context: Risk analyst monitoring project health
- Task: Detect timeline risks and assess impact
- Input: Timeline data, task status, dependency data
- Output format: Risk alerts with impact assessment
- Constraints: Must be accurate, actionable, timely

**Key Instructions:**
- Detect risks early and accurately
- Assess impact on timeline
- Provide actionable recommendations
- Use clear, urgent language for critical risks
- Be specific about causes and solutions

### Core Prompt: Progress Prediction

**Purpose:** Predict phase and project completion dates.

**Prompt Structure:**
- System context: Project analyst with predictive capabilities
- Task: Predict completion dates based on current progress
- Input: Progress data, velocity data, historical trends
- Output format: Predictions with confidence levels
- Constraints: Must be realistic, consider multiple factors

**Key Instructions:**
- Consider current velocity and trends
- Factor in risks and dependencies
- Provide confidence levels
- Be realistic, not optimistic
- Update predictions as progress changes

### Edge Function Architecture

**Function Name:** `generate-timeline-summary`

**Purpose:** Generate timeline summary and insights from project data.

**Input:**
- Timeline data (phases, tasks, milestones)
- Progress data (completion percentages, status)
- Historical data (previous progress, trends)

**Processing:**
- Calculate progress percentages
- Analyze timeline health
- Detect risks and delays
- Generate predictions
- Create summary and insights

**Output:**
- Timeline summary (natural language)
- Phase insights
- Risk alerts
- Progress predictions
- Milestone reminders

**Error Handling:**
- Handle missing data gracefully
- Provide fallback summaries if calculation fails
- Log errors for monitoring
- User-friendly error messages

**Performance:**
- Target: Complete within 3 seconds
- Progress calculation: 1 second
- Risk detection: 1 second
- Summary generation: 1 second
- Timeout: 10 seconds maximum

---

## Progress Summary

**Current Status:** Planning and documentation complete  
**Next Steps:** Implementation of Monitor Agent, timeline visualization, progress tracking  
**Blockers:** None identified  
**Dependencies:** Roadmap data structure, progress tracking system  
**Estimated Completion:** 6-8 days from start of implementation

**Key Deliverables:**
- Monitor Agent | Timeline visualization | Progress calculation | Milestone tracking
- Risk detection | Progress prediction | Real-time activity feed

**Success Metrics:**
- 100% phases/milestones visible | Progress accurate | 100% milestones tracked
- 90%+ risks detected | Predictions within 5 days | <3s summary | Positive feedback

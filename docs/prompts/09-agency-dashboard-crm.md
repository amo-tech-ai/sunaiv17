
# Agency Dashboard Screen 1: CRM Tab — Implementation Prompt

**Progress Tracker:** Agency Dashboard Screen 1 of 3 | Status: Planning Phase | Priority: P0 Critical  
**Estimated Implementation:** 10-12 days | Dependencies: Supabase Setup, Client Database Schema, Edge Functions  
**Completion Criteria:** Client management works, pipeline tracking accurate, activity logging functional, AI insights relevant

---

## Executive Summary

The CRM Tab provides agency team with comprehensive client relationship management system. This screen enables team members to manage leads, track client interactions, monitor pipeline, and maintain client relationships. The AI-powered insights provide client summaries, pipeline health analysis, and activity recommendations, helping team members build stronger relationships and close more deals.

**Core Value:** Team members have complete visibility into client relationships with intelligent assistance. The AI analyzes client health, identifies pipeline risks, and suggests next actions, enabling team members to focus on high-value activities and build stronger relationships.

---

## Three-Panel Layout Architecture

### Left Panel (20% Width) — Pipeline Summary

**Purpose:** Display pipeline overview and quick filters.

**Content Structure:**
- Pipeline summary (total leads, active clients, revenue)
- Quick filters (All, Leads, Clients, Prospects, Closed)
- Team member filter (assign leads/clients to team members)
- Status indicators (New, Contacted, Qualified, Proposal, Won, Lost)
- Quick navigation to other tabs

**Design Principles:**
- Clear visual hierarchy showing pipeline status
- Filters are easily accessible
- Status indicators use color coding
- Consistent styling with other dashboard tabs

**User Experience:**
- Users see pipeline status at a glance
- Filters are quick to apply
- Team member filter enables workload management
- Navigation to other tabs is convenient

---

### Center Panel (50% Width) — Client & Lead Management

**Purpose:** Main work area for client and lead management.

**Content Structure:**
- **Client/Lead List:**
  - Table view with columns (company name, industry, contact person, status, pipeline stage, assigned to, last activity, value, actions)
  - Filter options (Status, Industry, Assigned To, Pipeline Stage)
  - Sort options (Name, Last Activity, Value, Status)
  - Search clients/leads (by company name, contact person, industry)
  - Bulk actions (assign, change status, export)

- **Client/Lead Detail View (When Selected):**
  - **Overview Section:** Company information, contact information, status, assigned team member, value, revenue, last activity
  - **Timeline Section:** Activity timeline with notes, calls, emails, meetings, status changes
  - **Project Section:** Active projects list with status, value, timeline, create project button
  - **Documents Section:** Uploaded documents (proposals, contracts, briefs) with preview and download
  - **Communication Section:** Email history, call history, meeting history, send email button, schedule meeting button

**User Experience:**
- Client list is clear and easy to scan
- Detail view is comprehensive and organized
- Activity logging is intuitive
- Document management is accessible

---

### Right Panel (30% Width) — Intelligence & Quick Actions

**Purpose:** AI-powered client insights and quick actions.

**Content Structure:**
- **Intelligence Panel:**
  - Client summary (AI-generated client overview)
  - Pipeline insights (next steps, risks, opportunities)
  - Activity recommendations (suggested actions based on timeline)
  - Relationship health score (0-100, based on engagement)
  - Win/loss analysis (for closed deals)

- **Quick Actions:**
  - Change status dropdown
  - Assign to team member dropdown
  - Add note button
  - Log call button
  - Create project button
  - Generate proposal button (future)

**User Experience:**
- AI insights are relevant and actionable
- Quick actions are easily accessible
- Health score provides clear relationship status
- Recommendations help prioritize activities

---

## Purpose & Strategic Intent

**Primary Purpose:** Provide agency team with comprehensive client relationship management system.

This screen enables team members to manage all client relationships in one place, track pipeline health, and receive intelligent assistance. The AI analyzes client health, identifies pipeline risks, and suggests next actions, helping team members build stronger relationships and close more deals.

**Strategic Intent:**
- Centralize all client relationship data
- Enable efficient pipeline management
- Provide intelligent activity recommendations
- Build stronger client relationships
- Increase deal conversion rates

**Business Impact:**
- Higher conversion rates through better pipeline management
- Stronger relationships through activity recommendations
- Better team coordination through shared visibility
- Increased revenue through improved deal flow

---

## Goals & Success Criteria

### Functional Goals

**Goal 1: Client Management**
- Manage all leads, clients, and prospects in one place
- Success metric: 100% of clients and leads are accessible
- Verification method: Data completeness testing, user testing
- Edge cases: Many clients, complex relationships, inactive clients

**Goal 2: Pipeline Tracking**
- Track client journey from lead to closed deal
- Success metric: 100% of pipeline stages are tracked accurately
- Verification method: Pipeline status testing, conversion tracking
- Edge cases: Stalled deals, lost deals, complex sales cycles

**Goal 3: Activity Management**
- Log all client interactions (calls, emails, meetings, notes)
- Success metric: 100% of activities are logged and accessible
- Verification method: Activity logging testing, timeline testing
- Edge cases: Many activities, concurrent activities, activity conflicts

**Goal 4: Team Collaboration**
- Assign clients to team members and track assignments
- Success metric: Team assignments work correctly
- Verification method: Assignment testing, workload testing
- Edge cases: Multiple assignments, reassignments, team changes

**Goal 5: Project Linking**
- Link clients to active projects
- Success metric: Project links are accurate and accessible
- Verification method: Project linking testing, navigation testing
- Edge cases: Multiple projects per client, project changes, archived projects

**Goal 6: Document Management**
- Store and organize client documents (proposals, contracts, briefs)
- Success metric: 100% of documents are accessible and organized
- Verification method: Document upload testing, organization testing
- Edge cases: Many documents, large files, document conflicts

**Goal 7: AI Assistance**
- Get AI-generated insights and recommendations for client relationships
- Success metric: 85%+ of AI insights are helpful
- Verification method: User feedback, relevance testing
- Edge cases: New clients, inactive clients, complex relationships

---

## Real-World Examples & Applications

### Example 1: Managing DTC Fashion Brands

**Scenario:** Agency team member views "Luxe Threads" client and receives AI insights.

**User Actions:**
- Team member opens CRM Tab
- Team member views client list
- Team member selects "Luxe Threads" client
- Team member reviews client detail view

**AI Processing:**
- Account Manager Agent analyzes client data
- Calculates relationship health score
- Identifies engagement drop
- Generates recommendations

**AI Output:**
- Client summary: "Luxe Threads is a premium DTC fashion brand. Active project: Fall Collection Launch. Last activity: 5 days ago"
- Pipeline insights: "Client engagement dropped 15% this month. Schedule check-in call"
- Activity recommendations: "Suggested actions: Schedule check-in call, review project status, send project update"
- Relationship health score: 75/100 (Good, but engagement declining)
- Pipeline status: "3 new leads from Fashion industry in pipeline"

**User Experience:**
- Team member sees clear client status
- AI recommendations are actionable
- Health score provides relationship context
- Team member can take immediate action

---

### Example 2: Real Estate Brokerage Lead Management

**Scenario:** Sales rep views "Urban Properties" lead and receives pipeline insights.

**User Actions:**
- Sales rep opens CRM Tab
- Sales rep views lead list
- Sales rep selects "Urban Properties" lead
- Sales rep reviews lead detail and AI insights

**AI Processing:**
- Account Manager Agent analyzes lead data
- Summarizes lead characteristics
- Identifies key pain points
- Generates proposal recommendations

**AI Output:**
- Client summary: "High-value prospect. Key pain point is lead response time. Suggest emphasizing WhatsApp automation in proposal"
- Pipeline insights: "Lead is in Qualified stage. Next step: Send proposal. Expected close: 30 days"
- Activity recommendations: "Suggested actions: Send proposal, schedule demo call, emphasize WhatsApp automation"
- Relationship health score: 85/100 (Strong, high conversion potential)
- Pipeline value: "$60,000 potential revenue"

**User Experience:**
- Sales rep sees clear lead status
- AI recommendations are strategic
- Pipeline insights help prioritize
- Sales rep can take informed action

---

## Industry Wireframe & UI/UX Layout

### Desktop Layout (1024px+)

**Left Panel:**
- Fixed width: 20% of viewport
- Sticky positioning: Remains visible during scroll
- Background: Light neutral (#FAF8F6)
- Content: Pipeline summary, filters, status indicators, navigation

**Center Panel:**
- Width: 50% of viewport
- Max-width: 1000px for table readability
- Padding: 48px top, 32px sides, 48px bottom
- Content: Client list table, client detail view, activity timeline
- Scrollable: Content area scrolls independently

**Right Panel:**
- Fixed width: 30% of viewport
- Sticky positioning: Remains visible during scroll
- Background: Dark neutral (#1A1A1A) for intelligence panel
- Content: AI insights, quick actions, health score

### Mobile Layout (768px and below)

**Layout Changes:**
- Left panel: Collapsed or minimal
- Center panel: Full width, table becomes cards
- Right panel: Collapsible section or separate tab

**Touch Interactions:**
- Large tap targets for client rows
- Swipe actions for quick status changes
- Easy activity logging
- Simple client detail navigation

---

## Gemini 3 Features & Tools

### Required Features

**Structured Output:**
- Purpose: Guarantee valid client summaries and pipeline insights
- Schema: JSON structure with client summary, pipeline insights, recommendations, health score
- Validation: Strict schema enforcement ensures consistency
- Output: Reliable data structure for client insights

**Function Calling:**
- Purpose: Trigger actions (change status, assign client, create project, log activity)
- Implementation: Call Edge Functions for client operations
- Output: Action confirmations, updated client data
- Performance: Must complete within 2 seconds for good UX

### Optional Features

**Streaming:**
- Purpose: Real-time client summary updates
- Implementation: Stream text as it's generated
- Benefits: Perceived speed, engagement
- Performance: First chunk within 2 seconds

### Model Selection

**Gemini 3 Flash:**
- Rationale: Fast response time critical for client summaries
- Performance: Sub-2 second first token, complete in 3-5 seconds
- Cost: Lower cost enables frequent updates
- Quality: Sufficient for client summaries and recommendations

---

## AI Agent: Account Manager Agent

### Agent Profile

**Agent Type:** Account Manager & Relationship Specialist  
**Model:** Gemini 3 Flash  
**Primary Responsibility:** Client relationship management and pipeline insights  
**Persona:** Senior account manager with relationship expertise

### Input Requirements

**Required Input:**
- Client/lead data (company, industry, status, pipeline stage)
- Activity timeline (notes, calls, emails, meetings)
- Project data (active projects linked to client)
- Team assignments (who is assigned to client)

**Context:**
- Historical client data
- Pipeline trends
- Team workload

### Processing Logic

**Step 1: Client Analysis**
- Analyze client data and activity timeline
- Calculate relationship health score (0-100)
- Identify engagement patterns
- Detect churn risks

**Step 2: Pipeline Analysis**
- Analyze pipeline health and identify risks
- Calculate conversion probabilities
- Identify next steps
- Recommend status changes

**Step 3: Activity Recommendations**
- Analyze activity timeline
- Identify gaps in engagement
- Suggest next actions
- Prioritize activities

**Step 4: Summary Generation**
- Create client summary
- Generate pipeline insights
- Provide activity recommendations
- Calculate health score

### Output Structure

**Client Summary:**
- AI-generated client overview
- Key characteristics and pain points
- Current status and projects
- Natural language format

**Pipeline Insights:**
- Next steps identified
- Risks and opportunities
- Conversion probabilities
- Strategic recommendations

**Activity Recommendations:**
- Suggested actions based on timeline
- Prioritized by importance
- Specific and actionable
- Natural language format

**Relationship Health Score:**
- Score from 0-100 with reasoning
- Based on engagement patterns
- Identifies churn risks
- Provides actionable insights

---

## Core Prompts & Edge Functions

### Core Prompt: Client Summary Generation

**Purpose:** Generate comprehensive client summary from relationship data.

**Prompt Structure:**
- System context: Role as senior account manager
- Task: Summarize client relationship and provide insights
- Input: Client data, activity timeline, project data
- Output format: Structured JSON with summary, insights, recommendations
- Constraints: Must be accurate, helpful, actionable

**Key Instructions:**
- Summarize client relationship accurately
- Highlight key characteristics and pain points
- Identify engagement patterns and risks
- Provide actionable recommendations
- Use natural, professional language
- Be specific about next steps

### Core Prompt: Pipeline Health Analysis

**Purpose:** Analyze pipeline health and identify risks and opportunities.

**Prompt Structure:**
- System context: Pipeline analyst with sales expertise
- Task: Analyze pipeline health and provide insights
- Input: Pipeline data, conversion rates, stage data
- Output format: Pipeline insights with risks and opportunities
- Constraints: Must be accurate, strategic, actionable

**Key Instructions:**
- Analyze pipeline health accurately
- Identify risks and opportunities
- Calculate conversion probabilities
- Recommend next steps
- Use strategic, sales-focused language
- Be specific about actions

### Core Prompt: Activity Recommendation Generation

**Purpose:** Suggest next actions based on activity timeline.

**Prompt Structure:**
- System context: Activity coordinator with relationship expertise
- Task: Suggest next actions based on activity timeline
- Input: Activity timeline, client status, pipeline stage
- Output format: Activity recommendations with prioritization
- Constraints: Must be relevant, actionable, prioritized

**Key Instructions:**
- Analyze activity timeline for gaps
- Suggest relevant next actions
- Prioritize by importance and urgency
- Be specific about actions and timing
- Use natural, helpful language

### Edge Function Architecture

**Function Name:** `analyze-client-relationship`

**Purpose:** Analyze client relationship and generate insights.

**Input:**
- Client/lead data
- Activity timeline
- Project data
- Team assignments

**Processing:**
- Analyze client data and activity
- Calculate relationship health score
- Identify pipeline risks and opportunities
- Generate activity recommendations
- Create client summary

**Output:**
- Structured JSON with client summary, pipeline insights, recommendations, health score

**Error Handling:**
- Handle missing data gracefully
- Provide fallback summaries if analysis fails
- Log errors for monitoring
- User-friendly error messages

**Performance:**
- Target: Complete within 3 seconds
- Client analysis: 1 second
- Pipeline analysis: 1 second
- Summary generation: 1 second
- Timeout: 10 seconds maximum

---

## Progress Summary

**Current Status:** Planning and documentation complete  
**Next Steps:** Implementation of Account Manager Agent, client database schema, activity logging system  
**Blockers:** None identified  
**Dependencies:** Supabase setup, client database schema, Edge Functions  
**Estimated Completion:** 10-12 days from start of implementation

**Key Deliverables:**
- Account Manager Agent | Client database schema | Activity logging system
- Pipeline tracking | Team assignment system | Document management
- AI insights generation | Real-time updates

**Success Metrics:**
- 100% clients/leads accessible | 100% pipeline stages tracked | 100% activities logged
- Team assignments work | Project links accurate | 100% documents accessible
- 85%+ AI insights helpful | <3s client summary generation | Positive user feedback

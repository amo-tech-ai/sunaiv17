
# Agency Dashboard Screen 3: Analytics Tab — Implementation Prompt

**Progress Tracker:** Agency Dashboard Screen 3 of 3 | Status: Planning Phase | Priority: P0 Critical  
**Estimated Implementation:** 8-10 days | Dependencies: Analytics Database, Metrics Calculation System, Edge Functions  
**Completion Criteria:** Analytics display works, metrics calculations accurate, AI insights relevant, reporting functional

---

## Executive Summary

The Analytics Tab provides agency team with business intelligence and performance insights. This screen enables agency leaders and project managers to track KPIs, monitor revenue, analyze client relationships, measure team performance, and make data-driven decisions. The AI-powered insights provide business summaries, key findings, recommendations, and alerts, helping teams optimize performance and grow revenue.

**Core Value:** Agency leaders have complete visibility into business performance with intelligent insights. The AI analyzes metrics, identifies trends, detects anomalies, and provides strategic recommendations, enabling data-driven decision-making and business optimization.

---

## Three-Panel Layout Architecture

### Left Panel (20% Width) — Analytics Summary

**Purpose:** Display analytics overview and filters.

**Content Structure:**
- Analytics summary (total revenue, active clients, team capacity)
- Date range filter (Last 30 days, Last 90 days, Last year, Custom)
- Industry filter (All Industries, Fashion, Real Estate, Tourism, Events)
- Team member filter (All Team Members, Specific Team Member)
- Quick navigation to other tabs

**Design Principles:**
- Clear visual hierarchy showing key metrics
- Filters are easily accessible
- Date range selector is prominent
- Consistent styling with other dashboard tabs

**User Experience:**
- Users see key metrics at a glance
- Filters are quick to apply
- Date range selection is intuitive
- Navigation to other tabs is convenient

---

### Center Panel (50% Width) — Analytics Visualizations

**Purpose:** Main work area for analytics charts and data.

**Content Structure:**
- **Revenue Analytics:**
  - Total revenue chart (line chart over time)
  - Revenue by industry (bar chart)
  - Revenue by client (bar chart)
  - Revenue by project (table/list)
  - Revenue trends (growth percentage)

- **Client Analytics:**
  - Total clients (count)
  - Active clients (count)
  - New clients this month (count)
  - Client retention rate (percentage)
  - Average client value
  - Client lifetime value (LTV)

- **Pipeline Analytics:**
  - Pipeline stages breakdown (funnel chart)
  - Conversion rates (percentage by stage)
  - Average time in stage (days)
  - Win/loss ratio
  - Pipeline value (total potential revenue)

- **Project Analytics:**
  - Active projects (count)
  - Completed projects (count)
  - Average project duration (days)
  - Average project value
  - On-time completion rate (percentage)
  - Project profitability (revenue vs costs)

- **Team Analytics:**
  - Team member workload (tasks assigned per team member)
  - Team capacity utilization (percentage)
  - Task completion rate (percentage by team member)
  - Average task completion time (hours/days)
  - Team productivity trends (over time)

**User Experience:**
- Charts are clear and easy to understand
- Data is organized by category
- Filters apply to all visualizations
- Export functionality is accessible

---

### Right Panel (30% Width) — Intelligence & Quick Insights

**Purpose:** AI-powered business insights and quick metrics.

**Content Structure:**
- **Intelligence Panel:**
  - Business summary (AI-generated business overview)
  - Key insights (important findings from analytics)
  - Recommendations (AI suggestions for improvement)
  - Alerts (revenue drops, client churn, project delays)
  - Benchmark comparisons (industry averages, if available)

- **Quick Insights:**
  - Top performing clients
  - Top performing projects
  - Top performing team members
  - Revenue trends (up/down indicators)
  - Risk alerts (clients at risk, projects at risk)

**User Experience:**
- AI insights are strategic and actionable
- Key insights highlight important findings
- Recommendations are specific and helpful
- Alerts are clear and urgent

---

## Purpose & Strategic Intent

**Primary Purpose:** Provide agency team with business intelligence and performance insights.

This screen enables agency leaders and project managers to track KPIs, monitor revenue, analyze client relationships, measure team performance, and make data-driven decisions. The AI analyzes metrics, identifies trends, detects anomalies, and provides strategic recommendations.

**Strategic Intent:**
- Enable data-driven decision-making
- Provide transparent business performance visibility
- Identify optimization opportunities
- Monitor key business metrics
- Support strategic planning

**Business Impact:**
- Better decision-making through data insights
- Increased revenue through optimization
- Improved client relationships through analysis
- Better team performance through metrics
- Strategic growth through intelligence

---

## Goals & Success Criteria

### Functional Goals

**Goal 1: Business Intelligence**
- Track key business metrics (revenue, clients, projects)
- Success metric: 100% of key metrics are tracked accurately
- Verification method: Metrics calculation testing, data accuracy testing
- Edge cases: No data, incomplete data, data inconsistencies

**Goal 2: Performance Monitoring**
- Monitor team performance and productivity
- Success metric: Team metrics are accurate and helpful
- Verification method: Team metrics testing, user feedback
- Edge cases: New team members, team changes, incomplete data

**Goal 3: Revenue Analysis**
- Analyze revenue trends, sources, and profitability
- Success metric: Revenue calculations are accurate
- Verification method: Revenue calculation testing, financial verification
- Edge cases: Refunds, discounts, revenue adjustments

**Goal 4: Client Analysis**
- Track client retention, lifetime value, and health
- Success metric: Client metrics are accurate and actionable
- Verification method: Client metrics testing, retention tracking
- Edge cases: New clients, churned clients, client changes

**Goal 5: Pipeline Analysis**
- Monitor sales pipeline and conversion rates
- Success metric: Pipeline metrics are accurate
- Verification method: Pipeline tracking testing, conversion calculation
- Edge cases: Stalled deals, lost deals, complex sales cycles

**Goal 6: Project Analysis**
- Track project performance and profitability
- Success metric: Project metrics are accurate
- Verification method: Project metrics testing, profitability calculation
- Edge cases: Over-budget projects, delayed projects, cancelled projects

**Goal 7: AI Insights**
- Get AI-generated insights and recommendations for business improvement
- Success metric: 85%+ of AI insights are helpful
- Verification method: User feedback, relevance testing
- Edge cases: Limited data, new business, industry changes

---

## Real-World Examples & Applications

### Example 1: Agency Managing DTC Brands

**Scenario:** Agency Owner views revenue report.

**AI Output:**
- Business summary: "Total revenue: $450K this quarter. 25 active clients. 8 new clients. Team capacity: 85%"
- Key insights: "Fashion industry clients have 20% higher LTV. Recommend focusing sales on Fashion vertical"
- Recommendations: "Focus sales on Fashion. Expand Fashion team capacity. Develop Fashion-specific packages"
- Alerts: "No alerts. All metrics healthy"
- Benchmarks: "Revenue growth: 15% above industry average. Retention: 5% above average"

**User Experience:** Clear business performance, actionable strategic insights, helpful recommendations, data-driven decisions enabled

---

### Example 2: Real Estate Tech Agency Analytics

**Scenario:** Operations Manager views team performance.

**AI Output:**
- Business summary: "Active projects: 12. Completed: 8 this quarter. Average duration: 45 days. On-time: 85%"
- Key insights: "Implementation team efficiency up 10% since new templates. Design team at 95% capacity"
- Recommendations: "Scale Implementation templates to other teams. Consider hiring additional Design member"
- Alerts: "Design team capacity alert: 95% utilization. Consider capacity planning"
- Team analytics: "Top performer: Sarah (Implementation). Completion rate: 98%. Avg time: 2 days"

**User Experience:** Clear team performance, helpful productivity insights, capacity planning support, resource optimization enabled

---

## Industry Wireframe & UI/UX Layout

### Desktop Layout (1024px+)

**Left Panel:**
- Fixed width: 20% of viewport
- Sticky positioning: Remains visible during scroll
- Background: Light neutral (#FAF8F6)
- Content: Analytics summary, filters, date range selector, navigation

**Center Panel:**
- Width: 50% of viewport
- Max-width: 1200px for chart readability
- Padding: 48px top, 32px sides, 48px bottom
- Content: Analytics charts, tables, visualizations
- Scrollable: Content area scrolls independently

**Right Panel:**
- Fixed width: 30% of viewport
- Sticky positioning: Remains visible during scroll
- Background: Dark neutral (#1A1A1A) for intelligence panel
- Content: Business insights, recommendations, alerts, quick insights

### Mobile Layout (768px and below)

**Layout Changes:**
- Left panel: Collapsed or minimal
- Center panel: Full width, charts stack vertically
- Right panel: Collapsible section or separate tab

**Touch Interactions:**
- Charts are touch-friendly
- Filters are easy to select
- Export buttons are accessible
- Swipe navigation between chart sections

---

## Gemini 3 Features & Tools

### Required Features

**Structured Output:**
- Purpose: Guarantee valid business summaries and insights
- Schema: JSON structure with business summary, key insights, recommendations, alerts
- Validation: Strict schema enforcement ensures consistency
- Output: Reliable data structure for business insights

**Text Generation:**
- Purpose: Generate business summaries and recommendations
- Implementation: Natural language generation based on analytics data
- Output: Business summaries, insights, recommendations, alerts
- Performance: Must complete within 3 seconds for good UX

**Code Execution:**
- Purpose: Analytics calculations (averages, percentages, trends)
- Implementation: Mathematical calculations for metrics
- Output: Accurate metrics calculations
- Performance: Must complete within 1 second for calculations

### Optional Features

**Google Search Grounding:**
- Purpose: Industry benchmark comparisons
- Implementation: Search for industry averages and benchmarks
- Output: Benchmark comparisons for metrics
- Performance: Adds 5-10 seconds but provides valuable context

### Model Selection

**Gemini 3 Flash:**
- Rationale: Fast response time critical for analytics summaries
- Performance: Sub-2 second first token, complete in 3-5 seconds
- Cost: Lower cost enables frequent updates
- Quality: Sufficient for analytics summaries and insights

---

## AI Agent: Analytics Agent

### Agent Profile

**Agent Type:** Analyst & Business Intelligence Specialist  
**Model:** Gemini 3 Flash  
**Primary Responsibility:** Business intelligence and performance insights  
**Persona:** Senior business analyst with strategic expertise

### Input Requirements

**Required Input:**
- Revenue data (total revenue, revenue by client, revenue by project)
- Client data (total clients, active clients, retention rate, LTV)
- Pipeline data (stages, conversion rates, pipeline value)
- Project data (active projects, completed projects, completion rate, profitability)
- Team data (workload, capacity, productivity, task completion)

**Context:**
- Historical analytics data
- Industry benchmarks (if available)
- Business goals and targets

### Processing Logic

**Step 1: Data Aggregation**
- Aggregate analytics data for visualization
- Calculate key metrics (revenue trends, client retention, pipeline conversion, project profitability, team productivity)
- Prepare data for analysis

**Step 2: Trend Analysis**
- Identify trends over time
- Compare current metrics to historical data
- Detect anomalies and patterns

**Step 3: Insight Identification**
- Identify key insights from analytics
- Highlight important findings
- Prioritize insights by importance

**Step 4: Recommendation Generation**
- Generate recommendations based on analytics
- Provide actionable suggestions
- Prioritize recommendations by impact

**Step 5: Alert Detection**
- Detect anomalies (revenue drops, client churn, project delays)
- Assess alert severity
- Generate alert messages

**Step 6: Summary Generation**
- Create business summary
- Generate key insights
- Provide recommendations
- List alerts

### Output Structure

**Business Summary:**
- AI-generated business overview
- Key metrics highlighted
- Natural language format

**Key Insights:**
- Important findings from analytics
- Trends and patterns identified
- Prioritized by importance

**Recommendations:**
- AI suggestions for improvement
- Actionable and specific
- Prioritized by impact

**Alerts:**
- Revenue drops, client churn, project delays
- Severity indicators
- Actionable recommendations

**Benchmark Comparisons:**
- Industry averages (if available)
- Performance vs benchmarks
- Context for metrics

---

## Core Prompts & Edge Functions

### Core Prompt: Business Summary Generation

**Purpose:** Generate comprehensive business summary from analytics data.

**Prompt Structure:**
- System context: Role as senior business analyst
- Task: Summarize business performance and provide insights
- Input: Analytics data, metrics, trends
- Output format: Structured JSON with summary, insights, recommendations
- Constraints: Must be accurate, strategic, actionable

**Key Instructions:**
- Summarize business performance accurately
- Highlight key metrics and trends
- Identify important insights
- Provide strategic recommendations
- Use natural, professional language
- Be specific about findings and actions

### Core Prompt: Key Insight Identification

**Purpose:** Identify important findings from analytics data.

**Prompt Structure:**
- System context: Business intelligence analyst
- Task: Identify key insights from analytics
- Input: Analytics data, metrics, trends, historical data
- Output format: Key insights with importance ranking
- Constraints: Must be relevant, actionable, prioritized

**Key Instructions:**
- Analyze analytics data for patterns
- Identify important findings
- Prioritize insights by importance
- Provide context for insights
- Use clear, strategic language
- Be specific about findings

### Core Prompt: Recommendation Generation

**Purpose:** Generate actionable recommendations based on analytics.

**Prompt Structure:**
- System context: Strategic consultant with analytics expertise
- Task: Generate recommendations for business improvement
- Input: Analytics data, insights, business context
- Output format: Recommendations with impact assessment
- Constraints: Must be actionable, specific, prioritized

**Key Instructions:**
- Generate actionable recommendations
- Assess impact of recommendations
- Prioritize by impact and feasibility
- Provide specific next steps
- Use strategic, business-focused language
- Be realistic about implementation

### Edge Function Architecture

**Function Name:** `generate-analytics-insights`

**Purpose:** Generate business insights from analytics data.

**Input:**
- Revenue data
- Client data
- Pipeline data
- Project data
- Team data

**Processing:**
- Aggregate analytics data
- Calculate key metrics using Code Execution
- Identify trends and patterns
- Generate insights and recommendations
- Detect anomalies and alerts
- Create business summary

**Output:**
- Structured JSON with business summary, key insights, recommendations, alerts, benchmarks

**Error Handling:**
- Handle missing data gracefully
- Provide fallback summaries if calculation fails
- Log errors for monitoring
- User-friendly error messages

**Performance:**
- Target: Complete within 5 seconds
- Data aggregation: 1 second
- Metrics calculation (Code Execution): 1 second
- Insight generation: 2 seconds
- Summary generation: 1 second
- Timeout: 15 seconds maximum

---

## Progress Summary

**Current Status:** Planning and documentation complete  
**Next Steps:** Implementation of Analytics Agent, analytics database, metrics calculation system  
**Blockers:** None identified  
**Dependencies:** Analytics database, metrics calculation system, Edge Functions  
**Estimated Completion:** 8-10 days from start of implementation

**Key Deliverables:**
- Analytics Agent | Analytics database | Metrics calculation system | Chart visualizations
- Revenue analytics | Client analytics | Pipeline analytics | Project analytics | Team analytics
- AI insights generation | Export functionality

**Success Metrics:**
- 100% metrics tracked/accurate | 85%+ AI insights helpful | <5s generation | Positive feedback


# Client Dashboard Screen 3: Billing Tab — Implementation Prompt

**Progress Tracker:** Client Dashboard Screen 3 of 3 | Status: Planning Phase | Priority: P0 Critical  
**Estimated Implementation:** 5-7 days | Dependencies: Invoice System, Payment Processing Integration  
**Completion Criteria:** Invoice display works, payment tracking accurate, billing summary functional, AI insights relevant

---

## Executive Summary

The Billing Tab provides clients with complete transparency into project billing, invoices, and payment status. This screen enables clients to view all invoices, track payment history, download receipts, and manage payment methods. The AI-powered insights provide billing summaries, payment pattern analysis, and budget tracking via code execution, building trust through transparent financial communication.

**Core Value:** Clients have full visibility into their project finances with intelligent insights. The AI analyzes payment patterns, tracks budget utilization, and provides proactive reminders, giving clients confidence and control over their financial relationship with the agency.

---

## Three-Panel Layout Architecture

### Left Panel (20% Width) — Billing Summary

**Purpose:** Display billing overview and payment status.

**Content Structure:**
- Billing summary (total project cost, amount paid, amount due)
- Payment status indicator (Up to Date, Pending, Overdue)
- Next payment due date
- Payment method on file (if applicable)
- Quick navigation to other tabs

**Design Principles:**
- Clear visual hierarchy showing financial status
- Payment status uses color coding (up to date=green, pending=yellow, overdue=red)
- Financial figures prominently displayed
- Consistent styling with other dashboard tabs

**User Experience:**
- Users see financial status at a glance
- Payment status is immediately clear
- Next payment due date is visible
- Navigation to other tabs is convenient

---

### Center Panel (50% Width) — Invoice Management

**Purpose:** Main work area for invoice viewing and management.

**Content Structure:**
- **Invoice List:**
  - Invoice table with columns (invoice number, date, due date, amount, status, payment method, download)
  - Filter options (All, Paid, Pending, Overdue)
  - Sort options (Date, Amount, Status)
  - Search invoices (by invoice number or date)
  - Pagination for many invoices

- **Invoice Details (When Selected):**
  - Invoice header (invoice number, date, due date)
  - Billing address
  - Project information
  - Line items (services, phases, deliverables)
  - Subtotal, taxes, total amount
  - Payment status
  - Payment history (if partial payments)
  - Download PDF button
  - Print invoice button

- **Billing History:**
  - Payment history table
  - Payment date, amount, method, confirmation number
  - Receipt download links
  - Filter and sort options

**User Experience:**
- Invoice list is clear and easy to scan
- Invoice details are comprehensive
- Payment history is accessible
- Download and print functions work smoothly

---

### Right Panel (30% Width) — Intelligence & Payment Info

**Purpose:** AI-powered billing insights and payment management.

**Content Structure:**
- **Intelligence Panel:**
  - Billing summary (AI-generated billing status)
  - Payment insights (payment patterns, upcoming payments)
  - **Budget Analysis** (Computed via Code Execution)
  - Payment reminders (upcoming due dates)
  - Payment alerts (overdue or failed payments)

- **Payment Information:**
  - Payment method on file (credit card, bank account)
  - Update payment method option
  - Auto-pay status (enabled/disabled)
  - Billing preferences

- **Real-time updates via Supabase Realtime:**
  - Listen to `invoices` table for status changes (paid, overdue).
  - Listen to `payments` table for new transactions.

**User Experience:**
- AI insights are relevant and helpful
- Payment information is easily accessible
- Reminders prevent missed payments
- Alerts are clear and actionable

---

## Purpose & Strategic Intent

**Primary Purpose:** Provide clients with complete transparency into project billing and payments.

This screen enables clients to understand their financial relationship with the agency, track payments, and manage payment methods. The AI analyzes payment patterns, tracks budget utilization, and provides proactive reminders, building trust through transparent financial communication.

**Strategic Intent:**
- Provide transparent financial communication
- Enable self-service billing management
- Build trust through financial transparency
- Prevent payment issues through proactive reminders
- Enable budget tracking and analysis

**Business Impact:**
- Higher client satisfaction through transparency
- Reduced payment delays through reminders
- Better budget management through tracking
- Increased trust through honest financial communication

---

## Goals & Success Criteria

### Functional Goals

**Goal 1: Billing Transparency**
- Show all invoices, payments, and billing history
- Success metric: 100% of invoices are visible and accessible
- Verification method: Invoice data testing, user testing
- Edge cases: Many invoices, complex line items, partial payments

**Goal 2: Payment Tracking**
- Track payment status (Paid, Pending, Overdue)
- Success metric: 100% of payments are tracked accurately
- Verification method: Payment status testing, integration testing
- Edge cases: Failed payments, refunds, partial payments

**Goal 3: Invoice Management**
- Enable invoice viewing, downloading, and printing
- Success metric: 100% of invoice operations work correctly
- Verification method: Invoice operation testing
- Edge cases: Large invoices, complex formatting, PDF generation

**Goal 4: Payment Management**
- Allow payment method updates and auto-pay setup
- Success metric: Payment method updates work correctly
- Verification method: Payment integration testing
- Edge cases: Payment failures, expired cards, multiple methods

**Goal 5: Budget Visibility**
- Show spend vs budget (if applicable)
- Success metric: Budget calculations are accurate
- Verification method: Budget calculation testing via Code Execution
- Edge cases: No budget, over-budget, budget changes

**Goal 6: Trust Building**
- Transparent financial communication builds client trust
- Success metric: Users find billing information helpful
- Verification method: User feedback, satisfaction surveys
- Edge cases: Disputes, refunds, billing errors

**Goal 7: Self-Service**
- Enable clients to handle billing inquiries independently
- Success metric: 80%+ of billing questions answered by dashboard
- Verification method: Support ticket analysis, user feedback
- Edge cases: Complex billing questions, disputes

---

## Real-World Examples & Applications

### Example 1: Fashion Brand Billing View

**Scenario:** Luxe Threads views Phase 1 invoice and checks budget status.

**User Actions:**
- Client opens Billing Tab
- Client views invoice list
- Client opens Phase 1 invoice details
- Client downloads invoice PDF
- Client checks budget analysis in right panel

**AI Processing:**
- Analytics Agent receives billing data
- **Code Execution:** Calculates exact budget burn rate and runway
- Identifies upcoming payment
- Generates billing summary

**AI Output:**
- Billing summary: "Total project cost: $45,000. Amount paid: $13,500 (30%). Amount due: $31,500"
- Payment insights: "Payment pattern: On-time payments. Next payment due in 5 days for Phase 2"
- Budget analysis: "Budget utilization: 30%. On track for project budget"
- Payment reminders: "Phase 2 payment due in 5 days ($15,000)"

**User Experience:**
- Client sees clear financial status
- Budget analysis provides confidence
- Payment reminders are helpful
- Invoice download works smoothly

---

### Example 2: Real Estate Agency Payment Tracking

**Scenario:** Urban Properties checks payment status and sees overdue alert.

**User Actions:**
- Client opens Billing Tab
- Client views invoice list
- Client notices overdue invoice highlighted
- Client checks payment insights in right panel

**AI Processing:**
- Analytics Agent detects overdue payment
- Analyzes payment patterns
- Generates alert
- Provides payment recommendations

**AI Output:**
- Billing summary: "Total project cost: $60,000. Amount paid: $20,000 (33%). Amount due: $40,000"
- Payment insights: "Payment pattern: Typically on-time. One overdue payment detected"
- Payment alerts: "Alert: Phase 1 invoice overdue by 3 days. Amount: $20,000. Please update payment method or contact support"
- Payment reminders: "Phase 2 payment due in 10 days ($20,000)"

**User Experience:**
- Client sees overdue alert immediately
- Alert is clear and actionable
- Payment recommendations are helpful
- Client can take action (update payment method)

---

## Industry Wireframe & UI/UX Layout

### Desktop Layout (1024px+)

**Left Panel:**
- Fixed width: 20% of viewport
- Sticky positioning: Remains visible during scroll
- Background: Light neutral (#FAF8F6)
- Content: Billing summary, payment status, next payment, payment method

**Center Panel:**
- Width: 50% of viewport
- Max-width: 900px for optimal readability
- Padding: 48px top, 32px sides, 48px bottom
- Content: Invoice list, invoice details, billing history
- Scrollable: Content area scrolls independently

**Right Panel:**
- Fixed width: 30% of viewport
- Sticky positioning: Remains visible during scroll
- Background: Dark neutral (#1A1A1A) for intelligence panel
- Content: Billing insights, payment information, reminders

### Mobile Layout (768px and below)

**Layout Changes:**
- Left panel: Collapsed or minimal
- Center panel: Full width, reduced padding
- Right panel: Collapsible section or separate tab

**Touch Interactions:**
- Large tap targets for invoice rows
- Swipe actions for invoice operations
- Easy invoice detail viewing
- Simple payment method updates

---

## Gemini 3 Features & Tools

### Required Features

**Text Generation:**
- Purpose: Generate billing summaries and payment insights
- Implementation: Natural language generation based on billing data
- Output: Billing summaries, payment insights, reminders, alerts
- Performance: Must complete within 3 seconds for good UX

**Code Execution:**
- Purpose: Budget calculations and spend analysis
- Implementation: Python sandbox environment to calculate burn rates, percentage utilization, and projections.
- **Spec:** Input JSON with `total_budget`, `paid_invoices`, `pending_invoices`. Script calculates `remaining`, `burn_rate`, and `projected_overage`.
- Output: Exact figures for budget analysis.
- Performance: Must complete within 1-2 seconds.

### Model Selection

**Gemini 3 Flash Preview (`gemini-3-flash-preview`):**
- **CRITICAL:** Must use the `-preview` suffix.
- Rationale: Fast response time critical for billing summaries
- Performance: Sub-2 second first token, complete in 3-5 seconds
- Cost: Lower cost enables frequent updates
- Quality: Sufficient for billing summaries and insights

---

## AI Agent: Analytics Agent

### Agent Profile

**Agent Type:** Analyst & Financial Insights Specialist  
**Model:** `gemini-3-flash-preview`  
**Primary Responsibility:** Billing analysis and payment insights  
**Persona:** Financial analyst with billing expertise

### Input Requirements

**Required Input:**
- Invoice data (amounts, dates, status)
- Payment history (amounts, dates, methods)
- Budget data (if applicable)

**Context:**
- Project information (company, industry, phases)
- Historical payment data
- Payment method information

### Processing Logic

**Step 1: Billing Summary Calculation**
- Calculate total project cost
- Calculate amount paid
- Calculate amount due
- Determine payment status

**Step 2: Payment Pattern Analysis**
- Analyze payment timing and frequency
- Identify payment patterns
- Detect anomalies or issues

**Step 3: Budget Analysis (Code Exec)**
- Execute Python script to calculate budget health.
- Compare spend vs budget with precision.
- Identify budget risks or opportunities.

**Step 4: Payment Reminder Generation**
- Identify upcoming payments
- Calculate days until due
- Generate reminder messages

**Step 5: Alert Detection**
- Detect overdue payments
- Detect failed payments
- Identify payment issues

**Step 6: Summary Generation**
- Create billing summary
- Generate payment insights
- Provide recommendations

### Output Structure

**Billing Summary:**
- AI-generated billing status
- Total, paid, due amounts
- Payment status indicator
- Natural language format

**Payment Insights:**
- Payment patterns identified
- Upcoming payments listed
- Payment recommendations provided

**Budget Analysis:**
- Budget utilization calculated (Exact %)
- Spend vs budget comparison
- Budget risks or opportunities identified

**Payment Reminders:**
- Upcoming payments listed
- Days until due calculated
- Reminder messages generated

**Payment Alerts:**
- Overdue payments identified
- Failed payments detected
- Actionable recommendations provided

---

## Core Prompts & Edge Functions

### Core Prompt: Billing Summary Generation

**Purpose:** Generate comprehensive billing summary from financial data.

**Prompt Structure:**
- System context: Role as financial analyst
- Task: Summarize billing status and provide insights
- Input: Invoice data, payment data, budget data
- Output format: Natural language summary with insights
- Constraints: Must be accurate, clear, helpful

**Key Instructions:**
- Summarize billing status accurately
- Highlight key financial points
- Provide payment insights
- Use clear, professional language
- Be transparent about amounts and status

### Core Prompt: Payment Pattern Analysis

**Purpose:** Analyze payment patterns and identify insights.

**Prompt Structure:**
- System context: Payment analyst with pattern recognition
- Task: Analyze payment patterns and provide insights
- Input: Payment history, timing data, method data
- Output format: Pattern analysis with insights
- Constraints: Must be accurate, helpful, actionable

**Key Instructions:**
- Identify payment patterns accurately
- Highlight notable patterns or anomalies
- Provide actionable insights
- Use clear, helpful language
- Be specific about patterns and timing

### Core Prompt: Budget Analysis (Code Execution)

**Purpose:** Analyze budget utilization and provide insights.

**Prompt Structure:**
- System context: Budget analyst with financial expertise
- Task: Analyze budget utilization using provided Python tool
- Input: Budget data, spend data, project phases
- Output format: Budget analysis with insights
- Constraints: Must use Code Execution for calculations

**Key Instructions:**
- **Tool Use:** Use `code_execution` tool. Write Python code to:
  1. Sum `paid` invoices.
  2. Sum `pending` invoices.
  3. Calculate `utilization_rate = (paid + pending) / budget`.
  4. Return precise floats.
- Compare spend vs budget
- Identify budget risks or opportunities
- Provide actionable insights based on calculated data

### Edge Function Architecture

**Function Name:** `generate-billing-summary`

**Purpose:** Generate billing summary and insights from financial data.

**Input:**
- Invoice data (amounts, dates, status)
- Payment history (amounts, dates, methods)
- Budget data (if applicable)

**Authentication:**
- **CRITICAL:** Validate `GEMINI_API_KEY`.
- **Validation:** Check input data format (dates, amounts).

**Processing:**
- Calculate billing summary (total, paid, due)
- Analyze payment patterns
- **Code Execution:** Calculate budget utilization with Python.
- Identify upcoming payments
- Detect payment issues
- Generate summary and insights

**Output:**
- Billing summary (natural language)
- Payment insights
- Budget analysis (if applicable)
- Payment reminders
- Payment alerts

**Error Handling:**
- **Retry Logic:** Exponential backoff for API errors.
- **Fallbacks:** If Code Exec fails, perform simple calculation in JS and flag as "estimate".
- **User Messages:** Specific error messages.
- **Logging:** Log failures to Supabase.

**Performance:**
- Target: Complete within 3 seconds
- Billing calculation: 1 second
- Pattern analysis: 1 second
- Summary generation: 1 second
- Timeout: 10 seconds maximum

---

## Progress Summary

**Current Status:** Planning and documentation complete  
**Next Steps:** Implementation of Analytics Agent, invoice display system, payment tracking  
**Blockers:** None identified  
**Dependencies:** Invoice system, payment processing integration  
**Estimated Completion:** 5-7 days from start of implementation

**Key Deliverables:**
- Analytics Agent | Invoice display | Payment tracking | Budget calculation (Code Exec)
- Payment reminders/alerts | PDF generation

**Success Metrics:**
- 100% invoices visible | 100% payments tracked | 100% operations work
- Budget calculations accurate | 80%+ questions answered by dashboard
- <3s summary generation | Positive user feedback

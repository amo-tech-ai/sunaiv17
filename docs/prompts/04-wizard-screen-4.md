
# Wizard Screen 4: Readiness Assessment — Implementation Prompt

**Progress Tracker:** Step 4 of 5 | Status: Planning Phase | Priority: P0 Critical  
**Estimated Implementation:** 6-8 days | Dependencies: Step 3 Complete, Industry Pack System  
**Completion Criteria:** Readiness scoring accurate, gap identification functional, quick wins relevant

---

## Executive Summary

Screen 4 provides honest assessment of current state before generating the execution roadmap. This step calculates a realistic readiness score, identifies critical gaps that must be addressed, and suggests quick wins to build momentum. The assessment covers three categories: Data Readiness, Infrastructure Readiness, and Culture Readiness. This honest feedback prevents unrealistic expectations and sets the foundation for a successful implementation.

**Core Value:** Users receive transparent, honest feedback about their readiness for AI implementation. The readiness score, gap identification, and quick wins help users understand what needs to happen before they can successfully implement the selected AI systems. This honesty builds trust and prevents failed implementations.

---

## Three-Panel Layout Architecture

### Left Panel (20% Width) — Selected Systems Summary

**Purpose:** Display selected systems from Step 3 to maintain context.

**Content Structure:**
- Selected systems summary showing systems chosen in Step 3
- System names and brief descriptions
- Problems each system solves (from Step 2)
- Visual indicator showing these are the systems being assessed
- Industry context reminder

**Design Principles:**
- Clear visual hierarchy showing selected systems
- System items styled to show they're from previous step
- Visual connections showing problems solved
- Consistent styling with previous steps

**User Experience:**
- Users see their selected systems throughout the step
- Reinforces what they're assessing readiness for
- Provides context for readiness criteria
- Builds continuity from Step 3

---

### Center Panel (50% Width) — Readiness Assessment Checklist

**Purpose:** Interactive checklist for assessing readiness across three categories.

**Content Structure:**
- Readiness checklist organized into three categories:
  - Data Readiness (data quality, availability, structure)
  - Infrastructure Readiness (API access, webhook capabilities, integrations)
  - Culture Readiness (team comfort, executive buy-in, change readiness)
- Circular readiness score visualization (0-100)
- Category breakdown showing individual category scores
- Critical gaps list with descriptions and severity
- Quick wins list with actionability rankings
- Continue button (enabled once score calculated)

**Checklist Behavior:**
- Interactive toggles for each readiness criterion
- Real-time score updates (debounced to prevent excessive calculations)
- Visual score indicators (circular progress, color coding)
- Expandable gap descriptions
- Actionable quick wins with specific next steps

**Score Calculation:**
- Overall score: Average of three category scores
- Data Readiness: Weighted calculation based on data quality, availability, structure
- Infrastructure Readiness: Weighted calculation based on API access, webhooks, integrations
- Culture Readiness: Weighted calculation based on team comfort, executive buy-in, change readiness
- Score updates as user toggles checklist items

**User Experience:**
- Checklist feels comprehensive but not overwhelming
- Score updates provide immediate feedback
- Gaps are clearly identified with actionable descriptions
- Quick wins provide hope and momentum

---

### Right Panel (30% Width) — Risk Analysis Stream

**Purpose:** Show risk analysis, gap severity, and quick win prioritization reasoning.

**Content Structure:**
- Risk analysis stream showing industry-specific risk factors
- Gap analysis narrative explaining why gaps matter
- Quick wins reasoning showing why these wins are achievable
- Intelligence narrative explaining readiness assessment approach
- Industry-specific readiness benchmarks
- Risk severity indicators

**Dynamic Content:**
- Updates as user toggles checklist items
- Shows risk factors relevant to selected systems
- Displays gap severity and impact
- Provides quick win prioritization reasoning
- Industry-specific context and benchmarks

**Visual Design:**
- Terminal-like appearance for intelligence narrative
- Risk factors highlighted with severity indicators
- Gap descriptions with impact analysis
- Quick wins with actionability indicators

**User Experience:**
- Users understand risk factors and their impact
- Gap analysis provides clear reasoning
- Quick wins feel achievable and motivating
- Industry context makes assessment relevant

---

## Purpose & Strategic Intent

**Primary Purpose:** Assess current state and identify gaps before generating execution roadmap.

This screen provides honest feedback about readiness for AI implementation. By calculating a realistic readiness score, identifying critical gaps, and suggesting quick wins, we help users understand what needs to happen before they can successfully implement the selected AI systems. This honesty prevents unrealistic expectations and sets the foundation for successful implementation.

**Strategic Intent:**
- Provide honest, realistic assessment of readiness
- Identify critical gaps that must be addressed
- Suggest achievable quick wins to build momentum
- Set realistic expectations for implementation
- Build trust through transparency and honesty

**Business Impact:**
- Prevents failed implementations through honest assessment
- Identifies gaps early, saving time and resources
- Quick wins build momentum and engagement
- Realistic expectations lead to better outcomes

---

## Goals & Success Criteria

### Functional Goals

**Goal 1: Readiness Scoring**
- Calculate overall readiness score (0-100) with category breakdown
- Success metric: Scores align with expert assessment 85%+ of the time
- Verification method: Compare AI scores vs expert consultant assessment
- Edge cases: New businesses, traditional businesses, tech-native companies

**Goal 2: Gap Identification**
- Identify critical gaps that must be addressed before implementation
- Success metric: 90%+ of identified gaps are accurate and actionable
- Verification method: Expert review of gap identification
- Edge cases: Businesses with no gaps, businesses with many gaps

**Goal 3: Quick Wins**
- Suggest actionable quick wins to build momentum
- Success metric: 80%+ of quick wins are achievable within 30 days
- Verification method: User feedback, implementation tracking
- Edge cases: Businesses with no quick wins, businesses with many quick wins

**Goal 4: Risk Analysis**
- Identify industry-specific risk factors
- Success metric: Risk factors are relevant and accurate
- Verification method: Expert review of risk identification
- Edge cases: Low-risk businesses, high-risk businesses

**Goal 5: Honest Assessment**
- Provide realistic feedback, not overselling
- Success metric: Users find assessment honest and helpful
- Verification method: User feedback, completion rates
- Edge cases: Businesses with low readiness, businesses with high readiness

**Goal 6: Foundation Setting**
- Prepare context for realistic roadmap generation
- Success metric: Readiness assessment enables accurate roadmap in Step 5
- Verification method: Correlation between readiness and roadmap quality
- Edge cases: Businesses with conflicting readiness levels

---

## Real-World Examples & Applications

### Example 1: Fashion E-commerce Brand

**Selected Systems (from Step 3):**
- PDP Conversion Optimizer
- Fit & Size Intelligence Agent

**Readiness Assessment:**

**Data Readiness: 80/100**
- Product data quality: Excellent (structured, complete)
- Customer email lists: Good (needs cleaning)
- Purchase history: Available and structured
- Gap: Customer email lists need segmentation work

**Infrastructure Readiness: 70/100**
- Shopify API access: Ready and configured
- Webhook capabilities: Available and tested
- Integration capabilities: Good, some custom work needed
- Gap: Webhook endpoints need setup for real-time updates

**Culture Readiness: 65/100**
- Team comfort with automation: Good
- Executive buy-in: Moderate (needs more education)
- Change readiness: Moderate (some resistance to AI-generated content)
- Gap: Team hesitant about AI-generated product descriptions

**Overall Readiness: 72/100**

**Critical Gaps:**
- Customer email list segmentation needed before personalization
- Webhook endpoints need configuration for real-time updates
- Team education needed on AI-generated content value

**Quick Wins:**
- Implement fit guide immediately (no infrastructure needed)
- Optimize top 10 product pages manually (builds trust)
- Set up basic webhook for order updates (quick infrastructure win)

**Right Panel Intelligence:**
- Explains why data readiness is high (good product data)
- Shows why infrastructure is moderate (webhooks need setup)
- Identifies culture gap (AI content hesitancy)
- Provides fashion industry benchmarks

**User Experience:**
- User sees honest assessment of readiness
- Gaps are clearly identified with actionable steps
- Quick wins provide hope and momentum
- User appreciates transparency and proceeds to Step 5

---

### Example 2: Real Estate Brokerage

**Selected Systems (from Step 3):**
- WhatsApp Lead Concierge
- Qualification & Budget Filter Agent

**Readiness Assessment:**

**Data Readiness: 60/100**
- Lead data: In email, not centralized
- CRM system: Not integrated
- Property data: Available but unstructured
- Gap: No centralized CRM for lead management

**Infrastructure Readiness: 70/100**
- WhatsApp Business API: Available but not configured
- CRM integration: Needed but possible
- Email system: Ready for integration
- Gap: WhatsApp Business API setup needed

**Culture Readiness: 75/100**
- Team open to automation: High
- Executive buy-in: Strong (understands importance of speed)
- Change readiness: Good (team understands value)
- Gap: Some resistance to AI qualification (prefer human touch)

**Overall Readiness: 68/100**

**Critical Gaps:**
- Centralized CRM needed before lead automation
- WhatsApp Business API setup required
- Team training on AI qualification benefits

**Quick Wins:**
- Set up automated WhatsApp replies (quick infrastructure win)
- Create qualification form template (no infrastructure needed)
- Integrate email with basic CRM (moderate effort, high value)

**Right Panel Intelligence:**
- Explains why data readiness is moderate (lead data scattered)
- Shows why infrastructure is moderate (WhatsApp API needs setup)
- Identifies culture strength (team open to automation)
- Provides real estate industry benchmarks

**User Experience:**
- User sees realistic assessment
- Gaps are clear and actionable
- Quick wins feel achievable
- User understands what needs to happen before implementation

---

### Example 3: Tour Operator

**Selected Systems (from Step 3):**
- WhatsApp Booking Concierge
- Itinerary Builder & Upsell Engine

**Readiness Assessment:**

**Data Readiness: 75/100**
- Booking data: In WhatsApp chats, not centralized
- Customer data: Available but unstructured
- Itinerary data: Available in various formats
- Gap: No centralized booking system

**Infrastructure Readiness: 70/100**
- WhatsApp Business API: Ready and available
- Booking system: Needs integration
- Payment system: Ready for integration
- Gap: Booking system integration needed

**Culture Readiness: 80/100**
- Team highly receptive to automation: Very high
- Executive buy-in: Strong (understands speed importance)
- Change readiness: Excellent (team embraces automation)
- Gap: Minimal, team ready for change

**Overall Readiness: 75/100**

**Critical Gaps:**
- Centralized booking system needed
- Booking system integration required
- Itinerary template standardization needed

**Quick Wins:**
- Set up automated WhatsApp replies (immediate value)
- Create itinerary templates (no infrastructure needed)
- Standardize booking confirmation process (quick process win)

**Right Panel Intelligence:**
- Explains why data readiness is good (booking data available)
- Shows why infrastructure is moderate (integration needed)
- Identifies culture strength (team highly receptive)
- Provides tourism industry benchmarks

**User Experience:**
- User sees positive assessment with clear gaps
- Quick wins are achievable and motivating
- Culture readiness provides confidence
- User proceeds to Step 5 with realistic expectations

---

## Industry Wireframe & UI/UX Layout

### Desktop Layout (1024px+)

**Left Panel:**
- Fixed width: 20% of viewport
- Sticky positioning: Remains visible during scroll
- Background: Light neutral with system highlights
- Content: Selected systems, problems solved, industry context

**Center Panel:**
- Width: 50% of viewport
- Max-width: 800px for optimal readability
- Padding: 64px top, 32px sides, 64px bottom
- Content: Readiness checklist, circular score, gaps, quick wins, continue button
- Layout: Checklist items with toggles, score visualization prominent

**Right Panel:**
- Fixed width: 30% of viewport
- Sticky positioning: Remains visible during scroll
- Background: Dark neutral for intelligence narrative
- Content: Risk analysis, gap reasoning, quick win prioritization, benchmarks

### Mobile Layout (768px and below)

**Layout Changes:**
- Left panel: Minimal or hidden, systems shown in center panel header
- Center panel: Full width, checklist items stacked vertically
- Right panel: Collapsible section or separate tab

**Touch Interactions:**
- Large tap targets for checklist toggles
- Easy scrolling through checklist
- Expandable gap descriptions
- Prominent continue button

### Typography & Visual Hierarchy

**Readiness Score:**
- Large, prominent circular visualization
- Color coding (red/yellow/green) for score ranges
- Clear number display (0-100)

**Checklist Items:**
- Clear labels and descriptions
- Toggle states clearly indicated
- Category grouping visually distinct

**Gaps and Quick Wins:**
- Clear headings and descriptions
- Severity indicators for gaps
- Actionability indicators for quick wins

---

## Gemini 3 Features & Tools

### Required Features

**Structured Outputs:**
- Purpose: Guarantee valid readiness assessment with consistent structure
- Schema: JSON structure with score, gaps, quick wins, risks
- Validation: Strict schema enforcement ensures consistency
- Industry Constraints: Readiness criteria constrained to industry pack
- Output: Reliable data structure for assessment

**Thinking Mode:**
- Purpose: Deep reasoning for risk analysis and gap identification
- Budget: 4096 tokens for complex risk analysis
- Process: Analyzes readiness data, identifies gaps, suggests quick wins
- Output: Comprehensive assessment with reasoning
- Performance: Adds 15-20 seconds but ensures quality

**Code Execution:**
- Purpose: Mathematical calculations for readiness scoring
- Implementation: Python calculations for weighted scores
- **Spec:** Use a secure Python sandbox environment. Pass the checklist boolean array. Execute a weighted sum function.
- Accuracy: Ensures mathematical precision, not LLM guessing
- Output: Accurate readiness scores with category breakdowns

**Industry Pack Integration:**
- Purpose: Use industry-specific readiness criteria and risk factors
- Source: Industry pack files with readiness criteria
- Customization: Criteria use industry-specific benchmarks
- Validation: Ensures criteria match industry pack

### Model Selection

**Gemini 3 Pro Preview (`gemini-3-pro-preview`):**
- **CRITICAL:** Must use the `-preview` suffix.
- Rationale: Complex reasoning required for risk analysis and gap identification
- Performance: 15-20 seconds for assessment with thinking
- Quality: Ensures accurate assessment and honest feedback
- Cost: Higher cost justified by quality requirement

**When to Use Flash:**
- Not recommended for Screen 4 due to complexity
- Pro required for accurate risk analysis
- Flash could be used for simpler score formatting

---

## AI Agent: Scorer Agent

### Agent Profile

**Agent Type:** Analyst & Risk Assessment Specialist  
**Model:** `gemini-3-pro-preview`  
**Primary Responsibility:** Readiness assessment and gap identification  
**Persona:** Senior risk analyst with deep industry expertise

### Input Requirements

**Required Input:**
- Full wizard context (Steps 1-3)
- Selected systems (from Step 3)
- Checklist responses (user toggles)

**Context from Previous Steps:**
- Step 1: Industry, business model, digital maturity
- Step 2: Selected problems, diagnostic answers
- Step 3: Selected systems, ROI projections

**Industry Pack:**
- Readiness criteria per industry
- Risk factors per industry
- Industry-specific readiness benchmarks
- Quick win templates per industry

### Processing Logic

**Step 1: Load Industry Criteria**
- Load industry-specific readiness criteria
- Load risk factors for the industry
- Load industry benchmarks
- Load quick win templates

**Step 2: Calculate Category Scores (via Code Exec)**
- Calculate Data Readiness (data quality, availability, structure)
- Calculate Infrastructure Readiness (API access, webhooks, integrations)
- Calculate Culture Readiness (team comfort, executive buy-in, change readiness)
- Use Code Execution for mathematical accuracy

**Step 3: Calculate Overall Score (via Code Exec)**
- Average three category scores
- Apply industry-specific weighting if applicable
- Provide reasoning for score

**Step 4: Identify Critical Gaps**
- Analyze checklist responses against industry criteria
- Identify gaps that must be addressed
- Assess gap severity and impact
- Provide actionable gap descriptions

**Step 5: Suggest Quick Wins**
- Identify achievable wins based on readiness level
- Prioritize quick wins by actionability
- Provide specific next steps for each win
- Use industry-specific quick win templates

**Step 6: Analyze Risk Factors**
- Identify industry-specific risk factors
- Assess risk severity based on readiness
- Provide risk mitigation recommendations
- Use Thinking Mode for deep analysis

### Output Structure

**Overall Readiness Score:**
- Score from 0-100 with reasoning
- Category breakdown (Data, Infrastructure, Culture)
- Industry benchmark comparison

**Critical Gaps:**
- Gap descriptions with severity indicators
- Impact analysis for each gap
- Actionable steps to address gaps

**Quick Wins:**
- Quick win descriptions with actionability rankings
- Specific next steps for each win
- Expected impact and timeline

**Risk Factors:**
- Industry-specific risk factors
- Risk severity assessment
- Risk mitigation recommendations

### Industry Pack Customization

**Readiness Criteria:**
- Industry-specific criteria for each category
- Fashion: Product data quality, Shopify API, team comfort with automation
- Real Estate: Lead data centralization, WhatsApp API, team openness
- Tourism: Booking data structure, WhatsApp API, team receptiveness
- Events: Ticketing data, platform APIs, team automation comfort

**Risk Factors:**
- Industry-specific risk factors
- Fashion: Data quality issues, API limitations, content hesitancy
- Real Estate: Lead data scattering, WhatsApp setup, qualification resistance
- Tourism: Booking system integration, WhatsApp setup, minimal risks
- Events: Ticketing integration, platform APIs, vendor coordination

**Quick Win Templates:**
- Industry-specific quick win suggestions
- Fashion: Fit guide, product page optimization, webhook setup
- Real Estate: Automated replies, qualification forms, CRM integration
- Tourism: Automated replies, itinerary templates, booking standardization
- Events: Ticket page optimization, sponsor templates, vendor coordination

---

## Core Prompts & Edge Functions

### Core Prompt: Readiness Assessment

**Purpose:** Calculate realistic readiness score and identify gaps.

**Prompt Structure:**
- System context: Role as senior risk analyst
- Task: Assess readiness across three categories and identify gaps
- Input: Checklist responses, wizard context, industry criteria
- Output format: Structured JSON with score, gaps, quick wins, risks
- Constraints: Must be honest, use industry criteria, provide actionable gaps

**Key Instructions:**
- Calculate scores using industry-specific criteria
- Use Code Execution for mathematical accuracy
- Identify gaps that must be addressed
- Provide honest, realistic assessment
- Use industry-specific benchmarks
- Be transparent about limitations

### Core Prompt: Gap Identification

**Purpose:** Identify critical gaps with actionable descriptions.

**Prompt Structure:**
- System context: Gap analysis specialist
- Task: Identify gaps that must be addressed before implementation
- Input: Checklist responses, readiness scores, industry criteria
- Output format: Gap descriptions with severity and impact
- Constraints: Gaps must be actionable, severity must be accurate

**Key Instructions:**
- Identify gaps based on industry criteria
- Assess gap severity and impact
- Provide actionable gap descriptions
- Use industry-specific context
- Prioritize gaps by importance

### Core Prompt: Quick Win Generation

**Purpose:** Suggest achievable quick wins to build momentum.

**Prompt Structure:**
- System context: Implementation specialist
- Task: Suggest quick wins based on readiness level
- Input: Readiness scores, selected systems, industry context
- Output format: Quick win descriptions with actionability
- Constraints: Wins must be achievable within 30 days

**Key Instructions:**
- Identify wins based on readiness level
- Prioritize by actionability and impact
- Provide specific next steps
- Use industry-specific quick win templates
- Ensure wins are achievable and motivating

### Advanced Prompt: Risk Analysis

**Purpose:** Analyze industry-specific risk factors.

**Prompt Structure:**
- System context: Risk analyst with industry expertise
- Task: Identify risk factors and provide mitigation recommendations
- Input: Readiness scores, selected systems, industry context
- Output format: Risk factors with severity and mitigation
- Constraints: Risks must be relevant and accurate

**Key Instructions:**
- Identify industry-specific risk factors
- Assess risk severity based on readiness
- Provide risk mitigation recommendations
- Use Thinking Mode for deep analysis
- Use industry-specific risk patterns

### Edge Function Architecture

**Function Name:** `assess-readiness`

**Purpose:** Main readiness assessment function using checklist and industry criteria.

**Input:**
- Full wizard context (Steps 1-3)
- Selected systems (from Step 3)
- Checklist responses (user toggles)
- Industry Pack (readiness criteria and risk factors)

**Authentication:**
- **CRITICAL:** Validate `GEMINI_API_KEY`.
- **Validation:** Ensure checklist responses match required fields.

**Processing:**
- Load industry-specific readiness criteria
- **Code Execution:** Pass boolean checklist to Python environment. Execute weighted sum script. Return integer score (0-100).
- Identify critical gaps
- Suggest quick wins
- Analyze risk factors using Thinking Mode

**Output:**
- Structured JSON with score, gaps, quick wins, risks
- Category breakdown with reasoning
- Gap descriptions with severity
- Quick win descriptions with actionability

**Error Handling:**
- **Retry Logic:** Exponential backoff.
- **Score Validation:** Check if Code Execution returned valid integer 0-100.
- **Industry Pack:** Fallback if missing.
- **User Messages:** Specific error feedback.

**Performance:**
- Target: Complete within **45 seconds**.
- Thinking Mode: 15-20 seconds for risk analysis
- Code Execution: 5-10 seconds for score calculation
- Timeout: 90 seconds maximum

---

## Progress Summary

**Current Status:** Planning and documentation complete  
**Next Steps:** Implementation of Scorer Agent, Code Execution integration, readiness checklist UI  
**Blockers:** None identified  
**Dependencies:** Step 3 complete, Industry Pack system with readiness criteria  
**Estimated Completion:** 6-8 days from start of implementation

**Key Deliverables:**
- Scorer Agent implementation
- Code Execution integration for score calculation
- Readiness checklist UI with real-time scoring
- Gap identification system
- Quick win generation system
- Risk analysis system

**Success Metrics:**
- 85%+ alignment with expert assessment
- 90%+ accuracy in gap identification
- 80%+ of quick wins achievable within 30 days
- <45 second assessment completion time
- Positive user feedback on assessment honesty

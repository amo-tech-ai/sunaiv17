# Sun AI Agency — Wizard Implementation Plan

**Date:** January 6, 2025  
**Status:** Complete Wizard Plan  
**Total Screens:** 5  
**Estimated Completion Time:** 30-45 minutes per user

---

## Wizard Summary Table

| Screen | Content | Purpose | Goals | Gemini 3 Model | Google Search | Deep Search | URL Context | Structured Output | Thinking Mode | Streaming | AI Agent |
|--------|---------|---------|-------|----------------|---------------|-------------|-------------|-------------------|--------------|-----------|----------|
| **Step 1** | Business Context Form | Establish truth baseline | Industry detection, maturity scoring, business intelligence | Flash | ✅ Required | ⚠️ Optional | ⚠️ Optional | ❌ No | ❌ No | ❌ No | Analyst Agent |
| **Step 2** | Industry Diagnostics Questions | Identify business problems | Generate industry-specific questions, map problems to systems | Pro | ❌ No | ❌ No | ❌ No | ✅ Required | ✅ 4096 tokens | ❌ No | Extractor Agent |
| **Step 3** | System Selection Cards | Recommend AI systems | Rank systems by relevance, show ROI projections | Pro | ❌ No | ❌ No | ❌ No | ✅ Required | ✅ 1024 tokens | ❌ No | Optimizer Agent |
| **Step 4** | Readiness Assessment Checklist | Assess current state | Calculate readiness score, identify gaps, suggest quick wins | Pro | ❌ No | ❌ No | ❌ No | ✅ Required | ✅ 4096 tokens | ❌ No | Scorer Agent |
| **Step 5** | Strategic Roadmap Timeline | Generate execution plan | Create three-phase roadmap, calculate KPIs and ROI | Pro | ❌ No | ❌ No | ❌ No | ✅ Required | ✅ 4096 tokens | ⚠️ Optional | Planner Agent |

---

## Screen 1: Business Context & Discovery

### Content

**Left Panel (20%):**
- Step 1 progress indicator
- Sticky positioning
- Navigation breadcrumb

**Center Panel (50%):**
- Company name input field
- Website URL input field (optional)
- Industry dropdown (auto-populated after research)
- Business description textarea
- Continue button (disabled until valid)

**Right Panel (30%):**
- Real-time streaming intelligence narrative
- Research observations and insights
- Citation links from Google Search
- Business model detection
- Digital maturity assessment

### Purpose

Establish a truth baseline for the business through real-time AI research. This step verifies business existence, detects industry automatically, assesses digital maturity, and provides initial business intelligence that informs all subsequent wizard steps.

### Goals

1. **Business Verification:** Verify business exists and is legitimate through Google Search Grounding
2. **Industry Detection:** Automatically detect or confirm industry classification
3. **Digital Maturity Assessment:** Calculate digital maturity score (1-5) with reasoning
4. **Business Intelligence:** Provide initial observations about business model, positioning, and opportunities
5. **Citation Collection:** Gather credible sources for research findings
6. **Context Building:** Establish foundation for industry-specific customization in Step 2

### Gemini 3 Tools

**Required Tools:**
- **Google Search Grounding:** Real-time business intelligence research using industry-specific search queries
- **Structured Outputs:** Industry classification JSON schema

**Optional Tools:**
- **Deep Search:** Multi-query research synthesis for comprehensive business intelligence
- **URL Context Tool:** Analyze company website content for product pages, pricing, conversion elements

**Model Selection:**
- **Gemini 3 Flash:** Fast response time for streaming intelligence updates

### Features

**Research Features:**
- Real-time business research triggered on URL field blur
- Streaming intelligence narrative in right panel
- Multi-query Google Search (when Deep Search enabled)
- Website content analysis (when URL Context enabled)
- Industry-specific search query templates from Industry Pack

**User Experience Features:**
- Auto-populate industry dropdown after research
- Streaming text updates for immediate feedback
- Citation links displayed inline
- Business model detection displayed prominently
- Digital maturity score with visual indicator (1-5 scale)

**Intelligence Features:**
- Business model identification (DTC, B2B, Marketplace, Hybrid)
- Competitive positioning analysis
- Market opportunity identification
- Revenue lever identification
- Risk signal detection

### Functions

**Primary Functions:**
- `analyze-business` — Main research function using Google Search Grounding
- `classify-industry` — Industry detection using Structured Outputs
- `assess-maturity` — Digital maturity scoring (1-5)
- `extract-observations` — Business intelligence insights extraction

**Supporting Functions:**
- `stream-intelligence` — Real-time streaming narrative generation
- `extract-citations` — Citation extraction from search results
- `synthesize-research` — Combine multiple search queries (Deep Search)
- `analyze-website` — Website content analysis (URL Context)

### AI Agent: Analyst Agent

**Agent Type:** RESEARCH  
**Model:** Gemini 3 Flash  
**Primary Responsibility:** Business verification and intelligence gathering

**Input:**
- Company name
- Website URL (optional)
- Business description (optional)
- Industry hint (optional)

**Processing:**
- Execute Google Search queries (industry-specific from pack)
- Optional: Deep Search for comprehensive research
- Optional: URL Context for website analysis
- Stream intelligence observations in real-time
- Classify industry using Structured Outputs
- Assess digital maturity (1-5)

**Output:**
- Business intelligence narrative
- Detected industry
- Digital maturity level (1-5) with reasoning
- Business model identification
- Primary revenue lever
- Observations array (revenue/speed leaks)
- Citations array (title, URI)

**Industry Pack Customization:**
- Search query templates per industry
- Analysis focus areas per industry
- Maturity criteria per industry

---

## Screen 2: Industry Diagnostics

### Content

**Left Panel (20%):**
- Locked industry context (from Step 1)
- Industry name and description
- Digital maturity score
- Business model summary

**Center Panel (50%):**
- Dynamic form with four diagnostic questions:
  - Sales & Growth question
  - Content & Presence question
  - Operational Speed question
  - Executive Priority question
- Each question has four multiple-choice options
- Each option maps to an AI system
- Continue button (disabled until all questions answered)

**Right Panel (30%):**
- Contextual explanation of current question
- Why this question matters (industry-specific)
- Problem-to-solution mapping preview
- Intelligence narrative explaining diagnostic approach

### Purpose

Identify industry-specific business problems through targeted diagnostic questions. This step uses the industry context from Step 1 to generate questions that feel like they were written by a senior operator in that vertical, not a generic AI chatbot.

### Goals

1. **Problem Identification:** Surface real business problems specific to the detected industry
2. **Industry Customization:** Generate questions using industry-specific language and terminology
3. **Solution Mapping:** Map each problem option to relevant AI systems
4. **Trust Building:** Explain why each question matters in industry context
5. **Context Accumulation:** Build comprehensive problem profile for system recommendation
6. **User Engagement:** Make diagnostics feel consultative, not transactional

### Gemini 3 Tools

**Required Tools:**
- **Structured Outputs:** JSON schema for four diagnostic questions with options and AI system mappings
- **Thinking Mode:** Extended reasoning (4096 tokens) for deep industry analysis
- **Industry Pack:** Load industry-specific question templates and problem examples

**Model Selection:**
- **Gemini 3 Pro:** Complex reasoning required for industry-specific question generation

### Features

**Diagnostic Features:**
- Four diagnostic categories (Sales, Content, Speed, Priority)
- Industry-specific question wording from Industry Pack
- Four problem options per question (industry-specific problems)
- Four AI system mappings per question (industry-specific systems)
- "Why this matters" explanation per question

**Industry Customization Features:**
- Question templates loaded from Industry Pack
- Problem examples from Industry Pack
- AI system names constrained to Industry Pack
- Industry-specific language and terminology

**User Experience Features:**
- Dynamic form generation based on industry
- Contextual help in right panel
- Problem-to-solution preview
- Progress indicator showing which question is active

**Intelligence Features:**
- Question relevance explanation
- Problem-to-solution relationship mapping
- Industry-specific business workflow reflection

### Functions

**Primary Functions:**
- `generate-diagnostics` — Main diagnostic generation using Industry Pack
- `load-industry-pack` — Load industry-specific templates and configurations
- `map-problems-to-systems` — Create problem-to-AI-system relationships
- `explain-question-relevance` — Generate "why this matters" explanations

**Supporting Functions:**
- `validate-diagnostic-schema` — Ensure JSON schema compliance
- `format-diagnostic-options` — Format problem options for UI display
- `extract-industry-context` — Use Step 1 context for question customization

### AI Agent: Extractor Agent

**Agent Type:** CONSULTANT  
**Model:** Gemini 3 Pro  
**Primary Responsibility:** Industry-specific diagnostic question generation

**Input:**
- Industry detected (from Step 1)
- Business context (from Step 1)
- Industry Pack (loaded dynamically)

**Processing:**
- Load industry-specific question templates
- Generate four diagnostic questions using industry context
- Create problem options using industry-specific examples
- Map AI systems to problems using Industry Pack system names
- Generate "why this matters" explanations per question
- Use Thinking Mode (4096 tokens) for deep industry analysis

**Output:**
- Dynamic title (industry-specific)
- Sales question with four options and four AI system mappings
- Content question with four options and four AI system mappings
- Speed question with four options and four AI system mappings
- Priority question with four options and four AI system mappings
- "Why this matters" explanation per question

**Industry Pack Customization:**
- Question templates per industry
- Problem examples per industry
- AI system name constraints per industry
- Industry-specific business workflow reflection

---

## Screen 3: System Selection

### Content

**Left Panel (20%):**
- Priority summary (from Step 2)
- Selected problems highlighted
- Problem-to-solution relationships shown

**Center Panel (50%):**
- Five to six system recommendation cards
- Each card shows:
  - System name (industry-specific)
  - System description
  - Problem it solves
  - ROI impact projection
  - "Recommended" badge (for best-fit systems)
- Selection limit: Up to three systems
- Continue button (disabled until 1-3 systems selected)

**Right Panel (30%):**
- ROI impact stream (per selected system)
- Problem-to-solution mapping visualization
- Intelligence narrative explaining recommendations
- Strategic observations about system combinations

### Purpose

Recommend AI systems that solve identified business problems. This step maps the problems selected in Step 2 to industry-specific AI systems, ranks them by relevance, and provides ROI projections to help users make informed decisions.

### Goals

1. **System Recommendation:** Generate five to six relevant system recommendations
2. **Problem-to-Solution Mapping:** Clearly show how each system solves identified problems
3. **ROI Projections:** Provide realistic ROI impact projections per system
4. **Focus Constraint:** Limit selection to three systems for focused execution
5. **Industry Alignment:** Ensure all system names are industry-specific (not generic)
6. **Trust Building:** Show "Recommended" badges for best-fit systems with reasoning

### Gemini 3 Tools

**Required Tools:**
- **Structured Outputs:** JSON schema for system recommendations with names, descriptions, ROI projections
- **Thinking Mode:** Extended reasoning (1024 tokens) for system ranking and selection
- **Industry Pack:** Constrain system names to industry pack list

**Model Selection:**
- **Gemini 3 Pro:** Reasoning required for system ranking and ROI calculations

### Features

**Recommendation Features:**
- Five to six system recommendations based on Step 2 problems
- System names constrained to Industry Pack (industry-specific)
- ROI impact projections per system (industry-specific calculations)
- "Recommended" badges for best-fit systems (2-3 typically)
- Problem-to-solution mapping displayed clearly

**Ranking Features:**
- Systems ranked by relevance to selected problems
- Industry-specific prioritization logic
- System combination considerations
- Dependency detection (if System A requires System B)

**User Experience Features:**
- Selectable system cards with clear descriptions
- ROI projections shown prominently
- Selection counter (X of 3 selected)
- Disable Continue if 0 or >3 systems selected
- Problem-to-solution visualization

**Intelligence Features:**
- Strategic observations about system combinations
- ROI calculation reasoning in right panel
- Industry-specific success metrics
- Implementation complexity indicators

### Functions

**Primary Functions:**
- `recommend-systems` — Main system recommendation function
- `rank-systems-by-relevance` — Rank systems based on Step 2 problems
- `calculate-roi-projections` — Industry-specific ROI calculations
- `map-problems-to-systems` — Create problem-to-system relationships

**Supporting Functions:**
- `constrain-system-names` — Ensure system names match Industry Pack
- `identify-recommended-systems` — Mark best-fit systems (2-3)
- `generate-roi-narrative` — Create ROI impact explanations
- `detect-system-dependencies` — Identify if systems work better together

### AI Agent: Optimizer Agent

**Agent Type:** ARCHITECT  
**Model:** Gemini 3 Pro  
**Primary Responsibility:** System stack optimization and recommendations

**Input:**
- Selected problems (from Step 2)
- Industry context (from Step 1)
- Industry Pack (system names and descriptions)

**Processing:**
- Load industry-specific system names from Industry Pack
- Rank systems by relevance to selected problems
- Calculate ROI projections using industry-specific formulas
- Identify recommended systems (2-3 best-fit)
- Generate problem-to-solution mapping
- Use Thinking Mode (1024 tokens) for system selection logic

**Output:**
- Five to six system recommendations with:
  - System name (industry-specific, constrained to pack)
  - System description
  - Problems it solves
  - ROI impact projection
  - Recommended flag (boolean)
- Problem-to-solution mapping visualization
- Strategic observations about system combinations

**Industry Pack Customization:**
- System names constrained to Industry Pack
- System descriptions from Industry Pack
- ROI calculation formulas per industry
- Industry-specific success metrics

---

## Screen 4: Readiness Assessment

### Content

**Left Panel (20%):**
- Selected systems summary (from Step 3)
- System names and descriptions
- Problems each system solves

**Center Panel (50%):**
- Readiness checklist (Data, Infrastructure, Culture categories)
- Circular readiness score (0-100)
- Category breakdown:
  - Data Readiness (0-100)
  - Infrastructure Readiness (0-100)
  - Culture Readiness (0-100)
- Critical gaps list
- Quick wins list
- Continue button (enabled once score calculated)

**Right Panel (30%):**
- Risk analysis stream
- Gap analysis narrative
- Quick wins reasoning
- Intelligence narrative explaining readiness assessment

### Purpose

Assess current state and identify gaps before generating execution roadmap. This step calculates a realistic readiness score, identifies critical gaps that must be addressed, and suggests quick wins to build momentum. It provides honest feedback about whether the organization is ready for AI implementation.

### Goals

1. **Readiness Scoring:** Calculate overall readiness score (0-100) with category breakdown
2. **Gap Identification:** Identify critical gaps that must be addressed before implementation
3. **Quick Wins:** Suggest actionable quick wins to build momentum
4. **Risk Analysis:** Identify industry-specific risk factors
5. **Honest Assessment:** Provide realistic feedback, not overselling
6. **Foundation Setting:** Prepare context for realistic roadmap generation

### Gemini 3 Tools

**Required Tools:**
- **Structured Outputs:** JSON schema for readiness score, gaps, quick wins, risks
- **Thinking Mode:** Extended reasoning (4096 tokens) for deep risk analysis
- **Code Execution:** Mathematical calculations for readiness scoring
- **Industry Pack:** Industry-specific readiness criteria and risk factors

**Model Selection:**
- **Gemini 3 Pro:** Complex reasoning required for risk analysis and gap identification

### Features

**Assessment Features:**
- Overall readiness score (0-100) with circular visualization
- Category breakdown (Data, Infrastructure, Culture)
- Critical gaps identification with descriptions
- Quick wins list with actionability rankings
- Risk factors list (industry-specific)

**Scoring Features:**
- Data readiness calculation (data quality, availability, structure)
- Infrastructure readiness calculation (API access, webhook capabilities, integrations)
- Culture readiness calculation (team comfort, executive buy-in, change readiness)
- Debounced updates (score recalculates after checklist changes)

**User Experience Features:**
- Interactive checklist (toggles update score)
- Real-time score updates (debounced)
- Visual score indicators (circular progress, color coding)
- Expandable gap descriptions
- Actionable quick wins (specific next steps)

**Intelligence Features:**
- Risk analysis narrative in right panel
- Gap severity indicators
- Quick win prioritization reasoning
- Industry-specific readiness benchmarks

### Functions

**Primary Functions:**
- `assess-readiness` — Main readiness assessment function
- `calculate-readiness-score` — Mathematical calculation (Data + Infrastructure + Culture)
- `identify-critical-gaps` — Gap identification using industry criteria
- `suggest-quick-wins` — Quick win generation based on readiness level

**Supporting Functions:**
- `analyze-risk-factors` — Industry-specific risk analysis
- `benchmark-readiness` — Compare to industry standards
- `calculate-category-scores` — Individual category scoring (Data, Infrastructure, Culture)
- `generate-gap-narrative` — Create gap descriptions and severity

### AI Agent: Scorer Agent

**Agent Type:** ANALYST  
**Model:** Gemini 3 Pro  
**Primary Responsibility:** Readiness assessment and gap identification

**Input:**
- Full wizard context (Steps 1-3)
- Selected systems (from Step 3)
- Industry Pack (readiness criteria and risk factors)

**Processing:**
- Load industry-specific readiness criteria
- Calculate Data readiness (data quality, availability, structure)
- Calculate Infrastructure readiness (API access, webhook capabilities, integrations)
- Calculate Culture readiness (team comfort, executive buy-in, change readiness)
- Identify critical gaps using industry criteria
- Suggest quick wins based on readiness level
- Analyze risk factors (industry-specific)
- Use Thinking Mode (4096 tokens) for deep risk analysis
- Use Code Execution for mathematical scoring calculations

**Output:**
- Overall readiness score (0-100)
- Data readiness score (0-100) with reasoning
- Infrastructure readiness score (0-100) with reasoning
- Culture readiness score (0-100) with reasoning
- Critical gaps array (with descriptions and severity)
- Quick wins array (with actionability rankings)
- Risk factors array (industry-specific)

**Industry Pack Customization:**
- Readiness criteria per industry (data, infrastructure, culture)
- Risk factors per industry
- Industry-specific readiness benchmarks
- Quick win templates per industry

---

## Screen 5: Strategy & Phases (Roadmap)

### Content

**Left Panel (20%):**
- Full wizard summary:
  - Company name and industry
  - Digital maturity score
  - Selected problems (from Step 2)
  - Selected systems (from Step 3)
  - Readiness score (from Step 4)

**Center Panel (50%):**
- Three-phase roadmap visualization:
  - Phase 1: Foundation (Days 1-30)
  - Phase 2: Implementation (Days 31-60)
  - Phase 3: Optimization (Days 61-90)
  - Phase 3 shows:
  - Phase title
  - Goals (3-5 per phase)
  - Tasks (detailed execution items)
  - Deliverables (client-facing outputs)
  - KPIs (industry-specific metrics)
  - Duration (30 days per phase)
- Timeline visualization
- "Launch Project" button

**Right Panel (30%):**
- Thinking process visualization (when Thinking Mode active)
- Strategic planning narrative
- Phase dependency reasoning
- ROI projection breakdown
- Intelligence narrative explaining roadmap logic

### Purpose

Synthesize all wizard inputs into a realistic, executable three-phase roadmap. This step takes the business context, problems, systems, and readiness assessment to create a phased plan with clear goals, tasks, deliverables, and KPIs. It provides the final deliverable that users take into execution.

### Goals

1. **Roadmap Generation:** Create three-phase strategic roadmap (30/30/30 days)
2. **Task Breakdown:** Break down phases into detailed, actionable tasks
3. **Deliverable Definition:** Define client-facing outputs per phase
4. **KPI Setting:** Set industry-specific KPI targets per phase
5. **ROI Projection:** Calculate realistic ROI projections based on selected systems
6. **Dependency Management:** Identify phase dependencies and critical path
7. **Realistic Planning:** Provide honest timelines, not overselling

### Gemini 3 Tools

**Required Tools:**
- **Structured Outputs:** JSON schema for three-phase roadmap with tasks, deliverables, KPIs
- **Thinking Mode:** Extended reasoning (4096 tokens) for strategic planning
- **Industry Pack:** Phase templates, KPIs, and ROI calculation formulas

**Optional Tools:**
- **Streaming:** Progressive roadmap generation updates in right panel

**Model Selection:**
- **Gemini 3 Pro:** Complex strategic planning requires deep reasoning

### Features

**Roadmap Features:**
- Three-phase structure (Foundation, Implementation, Optimization)
- 30-day duration per phase
- Industry-specific phase templates from Industry Pack
- Task breakdown with owners (AI vs user)
- Deliverable definitions per phase
- KPI targets per phase (industry-specific)
- ROI projections (calculated based on selected systems)

**Planning Features:**
- Phase dependency identification
- Critical path analysis
- Resource allocation suggestions
- Risk mitigation per phase
- Timeline visualization

**User Experience Features:**
- Visual timeline showing three phases
- Expandable phase details
- Task checklist preview
- KPI dashboard preview
- ROI projection summary
- "Launch Project" button triggers dashboard creation

**Intelligence Features:**
- Thinking process visualization (optional streaming)
- Strategic planning narrative in right panel
- Phase dependency reasoning
- ROI calculation breakdown
- Industry-specific success metrics

### Functions

**Primary Functions:**
- `generate-roadmap` — Main roadmap generation function
- `create-phase-structure` — Generate three-phase structure using Industry Pack templates
- `break-down-tasks` — Create detailed tasks per phase
- `calculate-roi-projections` — Industry-specific ROI calculations
- `set-kpi-targets` — Industry-specific KPI target setting

**Supporting Functions:**
- `identify-phase-dependencies` — Detect phase dependencies and critical path
- `generate-deliverables` — Create deliverable definitions per phase
- `stream-thinking-process` — Optional streaming of roadmap generation
- `validate-roadmap-structure` — Ensure roadmap schema compliance

### AI Agent: Planner Agent

**Agent Type:** PLANNER  
**Model:** Gemini 3 Pro  
**Primary Responsibility:** Strategic roadmap synthesis

**Input:**
- Full wizard context (Steps 1-4)
- Selected systems (from Step 3)
- Readiness assessment (from Step 4)
- Industry Pack (phase templates, KPIs, ROI formulas)

**Processing:**
- Load industry-specific phase templates from Industry Pack
- Generate Phase 1: Foundation (fix gaps, prepare data, set infrastructure)
- Generate Phase 2: Implementation (deploy systems, integrate, test)
- Generate Phase 3: Optimization (scale, personalize, automate)
- Break down phases into detailed tasks (with owners: AI vs user)
- Define deliverables per phase (client-facing outputs)
- Set KPI targets per phase (industry-specific)
- Calculate ROI projections (based on selected systems and industry formulas)
- Identify phase dependencies and critical path
- Use Thinking Mode (4096 tokens) for strategic planning
- Optional: Stream thinking process for transparency

**Output:**
- Three-phase roadmap with:
  - Phase titles (industry-specific)
  - Goals (3-5 per phase)
  - Tasks (detailed execution items with owners)
  - Deliverables (client-facing outputs)
  - KPIs (industry-specific metrics with targets)
  - Duration (30 days per phase)
- Total duration (90 days)
- ROI projection (calculated)
- Phase dependencies (if any)

**Industry Pack Customization:**
- Phase templates per industry
- KPI definitions per industry
- ROI calculation formulas per industry
- Industry-specific task templates

---

## Cross-Screen Features

### Three-Panel Layout

**Consistent Across All Screens:**
- Left Panel (20%): Context sidebar, progress indicators, summary information
- Center Panel (50%): Main work area, forms, selections, content
- Right Panel (30%): Intelligence narrative, streaming AI observations, strategic insights

### Progressive Context Building

**Each Screen Builds on Previous:**
- Step 1: Establishes business context and industry
- Step 2: Uses Step 1 context to generate industry-specific questions
- Step 3: Uses Step 1+2 context to recommend systems
- Step 4: Uses Step 1+2+3 context to assess readiness
- Step 5: Uses all previous context to generate roadmap

### Industry Pack Integration

**Every Screen Uses Industry Pack:**
- Step 1: Industry-specific search queries and analysis focus
- Step 2: Industry-specific question templates and problem examples
- Step 3: Industry-specific system names and descriptions
- Step 4: Industry-specific readiness criteria and risk factors
- Step 5: Industry-specific phase templates, KPIs, and ROI formulas

### State Persistence

**Phase 1:** localStorage persistence (wizard state saved between sessions)

**Phase 2+:** Supabase database persistence (wizard sessions table)

---

## Success Criteria

### Functional Requirements

- ✅ All five wizard screens complete without errors
- ✅ Industry detection accuracy: 90%+
- ✅ Diagnostic questions are industry-specific (not generic)
- ✅ System recommendations map to problems correctly
- ✅ Readiness scores are accurate and honest
- ✅ Roadmaps are realistic and actionable

### Performance Requirements

- ✅ Step 1 research completes in <30s
- ✅ Step 2 diagnostics complete in <45s
- ✅ Steps 3-5 complete in <60s each
- ✅ Streaming latency <2s for first chunk
- ✅ Industry pack loading time <500ms

### User Experience Requirements

- ✅ Feels consultative, not transactional
- ✅ AI thinking is transparent and builds trust
- ✅ Industry language feels natural
- ✅ Recommendations feel personalized
- ✅ Expectations are set realistically

---

**Last Updated:** January 6, 2025  
**Status:** Complete Wizard Plan  
**Next Review:** After Step 1 implementation
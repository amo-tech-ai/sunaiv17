
# Wizard Screen 1: Business Context & Discovery — Implementation Prompt

**Progress Tracker:** Step 1 of 5 | Status: Planning Phase | Priority: P0 Critical  
**Estimated Implementation:** 5-7 days | Dependencies: Gemini API Setup, Industry Pack System  
**Completion Criteria:** Business verification works, industry detection accurate, streaming intelligence functional

---

## Executive Summary

Screen 1 establishes the truth baseline for every client engagement. This is where we verify business existence, detect industry automatically, assess digital maturity, and gather initial intelligence that informs all subsequent wizard steps. The screen uses real-time AI research to build trust and demonstrate our consultative approach from the first interaction.

**Core Value:** Users see immediate value through intelligent business research, building trust before they've even completed the form. The streaming intelligence narrative in the right panel creates a "wow" moment that differentiates us from generic form-filling experiences.

---

## Three-Panel Layout Architecture

### Left Panel (20% Width) — Context Sidebar

**Purpose:** Provide persistent context and progress tracking throughout the wizard experience.

**Content Structure:**
- Step 1 progress indicator showing current position in five-step flow
- Visual progress bar or step counter (1 of 5)
- Sticky positioning that remains visible during scroll
- Navigation breadcrumb showing "Business Context" as current step
- Optional: Quick access to reset or start over functionality

**Design Principles:**
- Minimal visual weight to avoid distraction
- Clear typography for step number and name
- Consistent styling across all wizard steps
- Responsive behavior: collapses on mobile, expands on desktop

**User Experience:**
- Users always know where they are in the process
- Progress feels tangible and motivating
- Context remains accessible without scrolling

---

### Center Panel (50% Width) — Main Work Area

**Purpose:** Capture essential business information and trigger intelligent research.

**Content Structure:**
- Company name input field (required, text input)
- Website URL input field (optional, URL validation)
- Industry dropdown (auto-populated after research, disabled initially)
- Business description textarea (optional, multi-line text)
- Continue button (disabled until company name provided, enabled after research completes)

**Form Flow:**
1. User enters company name (required field)
2. User optionally enters website URL
3. When URL field loses focus (blur event), research triggers automatically
4. Industry dropdown populates based on research results
5. Business description auto-fills if research finds relevant information
6. Continue button enables when minimum requirements met

**Validation Logic:**
- Company name: Required, minimum 2 characters, maximum 100 characters
- Website URL: Optional, must be valid URL format if provided
- Industry: Auto-populated, user can override if detection is incorrect
- Business description: Optional, can be edited after auto-fill

**User Experience:**
- Form feels responsive and intelligent
- Research happens automatically without explicit button clicks
- Users see immediate feedback through right panel streaming
- Form validation provides clear error messages
- Continue button state clearly indicates when user can proceed

---

### Right Panel (30% Width) — Intelligence Narrative

**Purpose:** Demonstrate AI capabilities and build trust through transparent research process.

**Content Structure:**
- Real-time streaming intelligence narrative
- Research observations and insights displayed as they're discovered
- Citation links from Google Search results (clickable, opens in new tab)
- Business model detection displayed prominently
- Digital maturity assessment with visual indicator (1-5 scale)
- Competitive positioning insights
- Market opportunity identification
- Risk signal detection (if applicable)

**Streaming Behavior:**
- Text appears character-by-character or word-by-word for natural reading experience
- Citations appear inline with relevant observations
- Business model and maturity score appear after initial research completes
- Updates continue as additional research layers complete (Deep Search, URL Context)

**Visual Design:**
- Terminal-like appearance with monospace font for intelligence narrative
- Citations styled as links with hover effects
- Business model and maturity score in highlighted boxes
- Scrollable content area for longer research outputs
- Loading states during research phases

**User Experience:**
- Users feel like they're watching a consultant research their business
- Transparency builds trust in our AI capabilities
- Citations provide credibility and allow verification
- Streaming creates engagement and prevents perceived delays

---

## Purpose & Strategic Intent

**Primary Purpose:** Establish truth baseline through verified business intelligence.

This screen serves as the foundation for all subsequent wizard steps. By verifying business existence, detecting industry, and assessing digital maturity, we create a reliable context that enables industry-specific customization in later steps. The real-time research demonstrates our AI capabilities immediately, building trust before users invest time in the full wizard.

**Strategic Intent:**
- Build trust through transparent AI research
- Demonstrate value before asking for detailed information
- Establish industry context for personalized experience
- Create "wow" moment that differentiates from competitors
- Set realistic expectations through honest maturity assessment

**Business Impact:**
- Higher completion rates due to immediate value demonstration
- Better industry detection leads to more relevant recommendations
- Trust building reduces abandonment in later steps
- Maturity assessment prevents unrealistic expectations

---

## Goals & Success Criteria

### Functional Goals

**Goal 1: Business Verification**
- Verify business exists and is legitimate through Google Search Grounding
- Success metric: 95%+ accuracy in business verification
- Verification method: Compare AI output vs manual search results
- Edge cases: Handle businesses with common names, new businesses, international businesses

**Goal 2: Industry Detection**
- Automatically detect or confirm industry classification
- Success metric: 90%+ accuracy in industry detection
- Verification method: Compare detected industry vs user confirmation
- Edge cases: Multi-industry businesses, niche industries, emerging categories

**Goal 3: Digital Maturity Assessment**
- Calculate digital maturity score (1-5) with clear reasoning
- Success metric: Scores align with manual assessment 85%+ of the time
- Verification method: Compare AI scores vs expert consultant assessment
- Edge cases: New businesses, traditional businesses going digital, tech-native companies

**Goal 4: Business Intelligence**
- Provide initial observations about business model, positioning, and opportunities
- Success metric: Users find insights valuable and accurate
- Verification method: User feedback, completion rates, engagement metrics
- Edge cases: Businesses with limited online presence, B2B vs B2C confusion

**Goal 5: Citation Collection**
- Gather credible sources for research findings
- Success metric: All major claims have supporting citations
- Verification method: Manual review of citation quality and relevance
- Edge cases: New businesses with limited search results, international businesses

**Goal 6: Context Building**
- Establish foundation for industry-specific customization in Step 2
- Success metric: Industry pack loads correctly based on detected industry
- Verification method: Verify correct industry pack loads
- Edge cases: Unsupported industries, multi-industry businesses

---

## Real-World Examples & Applications

### Example 1: Luxury Fashion Brand

**Scenario:** Luxe Threads, a premium DTC fashion brand selling $200-$500 apparel.

**User Input:**
- Company name: "Luxe Threads"
- Website URL: "https://luxethreads.com"
- Business description: (left empty, auto-filled by AI)

**Research Process:**
- Google Search queries: "Luxe Threads fashion brand", "Luxe Threads reviews", "premium DTC fashion"
- URL Context analysis: Extracts product pages, pricing, brand positioning
- Deep Search: Analyzes competitors, market trends, brand positioning

**AI Output:**
- Detected industry: Fashion E-commerce
- Business model: Premium DTC Fashion Brand
- Digital maturity: Level 3 (Automated flows, UGC content)
- Observations: Strong brand presence on Instagram and TikTok, product pages lack social proof, size guide is generic, returns are 28% (industry average: 18%)
- Citations: 5 relevant sources including brand reviews and market analysis

**User Experience:**
- User sees streaming text: "Analyzing Luxe Threads website... Verifying brand presence... Assessing digital maturity..."
- Industry dropdown auto-populates with "Fashion E-commerce"
- Business description auto-fills with AI-generated summary
- User feels impressed by immediate intelligence and proceeds to Step 2

---

### Example 2: Real Estate Brokerage

**Scenario:** Urban Properties, a commercial property management company with 200+ units.

**User Input:**
- Company name: "Urban Properties"
- Website URL: "https://urbanproperties.com"
- Business description: "Commercial property management"

**Research Process:**
- Google Search queries: "Urban Properties real estate", "Urban Properties commercial", "property management CRM"
- URL Context analysis: Analyzes property listings, lead capture forms, response time signals
- Deep Search: Cross-references market position, competitor analysis, industry trends

**AI Output:**
- Detected industry: Real Estate (Rentals + Buying)
- Business model: Commercial Property Management Company
- Digital maturity: Level 2 (Basic website, manual processes)
- Observations: Strong Google Business Profile with 4.8 stars, website shows properties but lead forms are basic, no automated response system, average response time: 4 hours (industry average: 15 minutes)
- Citations: 4 relevant sources including Google Business Profile and industry reports

**User Experience:**
- User sees specific insights about their business model and pain points
- Industry detection correctly identifies Real Estate vertical
- Maturity score reflects current state honestly
- User appreciates accurate assessment and continues

---

### Example 3: Tour Operator

**Scenario:** Medellin Food Tours, a WhatsApp-first tour operator in Colombia.

**User Input:**
- Company name: "Medellin Food Tours"
- Website URL: "https://medellinfoodtours.com"
- Business description: (left empty)

**Research Process:**
- Google Search queries: "Medellin Food Tours", "Colombia tour operator reviews", "WhatsApp tour booking"
- URL Context analysis: Analyzes booking flow, itinerary pages, pricing clarity
- Deep Search: Analyzes competitor positioning, review strategies, OTA presence

**AI Output:**
- Detected industry: Tourism (Tours + Experiences)
- Business model: WhatsApp-First Tour Operator
- Digital maturity: Level 2 (Basic online presence, WhatsApp-dominant)
- Observations: Operates WhatsApp-first booking model with strong local reviews, website has clear itineraries but inquiry response time varies significantly, strong presence on TripAdvisor
- Citations: 6 relevant sources including review platforms and travel blogs

**User Experience:**
- User sees accurate detection of WhatsApp-first model
- Industry correctly identified as Tourism
- Observations reflect actual business operations
- User feels understood and proceeds confidently

---

## Industry Wireframe & UI/UX Layout

### Desktop Layout (1024px+)

**Left Panel:**
- Fixed width: 20% of viewport
- Sticky positioning: Remains at top during scroll
- Background: Light neutral color (#FAF8F6)
- Border: Right border for visual separation
- Content: Step indicator, progress bar, navigation

**Center Panel:**
- Width: 50% of viewport
- Max-width: 800px for optimal readability
- Padding: 64px top, 32px sides, 64px bottom
- Background: White (#FFFFFF)
- Content: Form fields, labels, validation messages, continue button

**Right Panel:**
- Fixed width: 30% of viewport
- Sticky positioning: Remains at top during scroll
- Background: Dark neutral (#1A1A1A) for terminal aesthetic
- Border: Left border for visual separation
- Content: Streaming text, citations, business model, maturity score

### Mobile Layout (768px and below)

**Layout Changes:**
- Three-panel layout collapses to single column
- Left panel: Hidden or minimal (just step indicator)
- Center panel: Full width, reduced padding
- Right panel: Collapsible section below center panel, or separate tab

**Touch Interactions:**
- Large tap targets (minimum 44px height)
- Form fields easy to tap and type
- Continue button prominent and accessible
- Right panel can be expanded/collapsed with tap

### Typography & Visual Hierarchy

**Headings:**
- Step title: Large, bold, clear hierarchy
- Form labels: Medium weight, readable
- Intelligence narrative: Monospace font, smaller size

**Colors:**
- Primary text: Dark (#1A1A1A)
- Secondary text: Medium gray (#6B7280)
- Links: Amber accent (#F59E0B)
- Backgrounds: Warm whites (#FDFCFB, #FAF8F6)
- Intelligence panel: Dark background with light text

**Spacing:**
- Generous whitespace between form fields
- Consistent padding and margins
- Visual breathing room for readability

---

## Gemini 3 Features & Tools

### Required Features

**Google Search Grounding:**
- Purpose: Verify business existence and gather intelligence
- Implementation: Multi-query search using industry-specific templates
- Queries: Company name variations, industry context, market position
- Results: Synthesized into coherent narrative with citations
- Performance: Must complete within 30 seconds for good UX

**Structured Outputs:**
- Purpose: Ensure consistent industry classification
- Schema: JSON structure with industry enum, business model, maturity score
- Validation: Strict schema enforcement prevents errors
- Output: Reliable data structure for downstream processing

### Optional Features

**Deep Search:**
- Purpose: Comprehensive research synthesis
- Implementation: Multi-layered query approach
- Layer 1: Initial Google Search queries
- Layer 2: URL Context analysis if website provided
- Layer 3: Cross-reference and synthesis
- Layer 4: Industry-specific insights
- Performance: Adds 10-15 seconds but provides richer intelligence

**URL Context Tool:**
- Purpose: Analyze company website for detailed insights
- Implementation: Extract structured data from web pages
- Analysis: Product pages, pricing, conversion elements, brand positioning
- Output: Detailed observations about website quality and opportunities
- Performance: Adds 5-10 seconds but provides valuable context

### Model Selection

**Gemini 3 Flash Preview (`gemini-3-flash-preview`):**
- **CRITICAL:** Must use the `-preview` suffix.
- Rationale: Fast response time critical for streaming UX
- Performance: Sub-2 second first token, complete response in 10-15 seconds
- Cost: Lower cost per request enables frequent research
- Quality: Sufficient for business verification and basic intelligence

**When to Use Pro:**
- Not recommended for Screen 1 due to latency
- Pro reserved for complex reasoning in later steps
- Flash provides adequate quality for research tasks

---

## AI Agent: Analyst Agent

### Agent Profile

**Agent Type:** Research & Discovery Specialist  
**Model:** `gemini-3-flash-preview`  
**Primary Responsibility:** Business verification and intelligence gathering  
**Persona:** Senior business analyst with deep industry knowledge

### Input Requirements

**Required Input:**
- Company name (minimum 2 characters)
- Website URL (optional but highly recommended)

**Optional Input:**
- Business description (user-provided or auto-filled)
- Industry hint (if user wants to override detection)

**Context from Previous Steps:**
- None (this is the first step)

### Processing Logic

**Step 1: Initial Research**
- Execute Google Search queries using company name
- Use industry-specific search query templates from Industry Pack
- Gather initial search results and citations

**Step 2: Website Analysis (if URL provided)**
- Use URL Context Tool to analyze website content
- Extract key information: business model, offerings, positioning
- Identify conversion elements and opportunities

**Step 3: Deep Research (optional, if enabled)**
- Execute additional search queries for comprehensive intelligence
- Cross-reference multiple sources for verification
- Synthesize findings into coherent narrative

**Step 4: Industry Classification**
- Use Structured Outputs to classify industry
- Match against supported industry packs
- Provide confidence score for classification

**Step 5: Maturity Assessment**
- Analyze digital presence and capabilities
- Score from 1-5 based on industry-specific criteria
- Provide reasoning for maturity score

**Step 6: Intelligence Synthesis**
- Combine all research findings into streaming narrative
- Highlight key observations and opportunities
- Identify risk signals and revenue leakers

### Output Structure

**Business Intelligence Narrative:**
- Streaming text that appears in real-time
- Natural language description of business
- Key observations and insights
- Citations embedded throughout

**Industry Classification:**
- Detected industry (enum from supported industries)
- Confidence score (high, medium, low)
- Alternative industries if detection uncertain

**Digital Maturity Score:**
- Score from 1-5 with reasoning
- Category breakdown (if applicable)
- Industry benchmark comparison

**Business Model Identification:**
- Primary business model (DTC, B2B, Marketplace, Hybrid)
- Revenue lever identification
- Competitive positioning

**Observations Array:**
- Revenue opportunities
- Speed leaks (inefficiencies)
- Risk signals
- Quick wins

**Citations Array:**
- Source title
- Source URI
- Relevance to claim

### Industry Pack Customization

**Search Query Templates:**
- Each industry pack provides specific search query patterns
- Fashion: Focus on brand presence, product pages, social media
- Real Estate: Focus on listings, lead generation, market position
- Tourism: Focus on reviews, booking systems, OTA presence
- Events: Focus on ticketing, marketing, vendor coordination

**Analysis Focus Areas:**
- Industry-specific areas of interest
- Fashion: Conversion rates, product pages, social proof
- Real Estate: Lead response time, listing quality, CRM usage
- Tourism: Booking conversion, review strategy, seasonal patterns
- Events: Ticket sales, sponsor acquisition, vendor management

**Maturity Criteria:**
- Industry-specific benchmarks for digital maturity
- Fashion: E-commerce platform sophistication, content automation
- Real Estate: CRM integration, lead automation, listing management
- Tourism: Booking system integration, review management, OTA presence
- Events: Ticketing platform, marketing automation, vendor coordination

---

## Core Prompts & Edge Functions

### Core Prompt: Business Research

**Purpose:** Generate comprehensive business intelligence through Google Search and URL analysis.

**Prompt Structure:**
- System context: Role as senior business analyst
- Task: Research and verify business, detect industry, assess maturity
- Input: Company name, website URL, optional description
- Output format: Streaming narrative with citations
- Constraints: Must verify business existence, provide citations, be honest about limitations

**Key Instructions:**
- Use industry-specific search queries from Industry Pack
- Verify business existence before making claims
- Provide citations for all major claims
- Stream observations in real-time for transparency
- Be honest about what you find and what you don't know
- Use natural business language, avoid AI jargon

### Core Prompt: Industry Classification

**Purpose:** Accurately classify business into supported industry vertical.

**Prompt Structure:**
- System context: Industry classification specialist
- Task: Classify business into one of supported industries
- Input: Research findings, business description, website analysis
- Output format: Structured JSON with industry enum and confidence
- Constraints: Must match supported industries, provide confidence score

**Key Instructions:**
- Match against supported industry packs (Fashion, Real Estate, Tourism, Events)
- Provide confidence score (high if clear match, medium if uncertain, low if unclear)
- Consider multi-industry businesses (select primary industry)
- Use industry-specific terminology and patterns
- If uncertain, provide alternative industries for user selection

### Advanced Prompt: Deep Research Synthesis

**Purpose:** Synthesize multiple research sources into coherent intelligence narrative.

**Prompt Structure:**
- System context: Senior strategic consultant
- Task: Synthesize research findings into actionable insights
- Input: Multiple search results, URL analysis, industry context
- Output format: Structured narrative with key sections
- Constraints: Must be accurate, cite sources, identify opportunities

**Key Instructions:**
- Synthesize findings across multiple sources
- Identify patterns and contradictions
- Highlight key opportunities and risks
- Provide actionable insights, not just observations
- Use industry-specific language and context
- Be honest about limitations and uncertainties

### Edge Function Architecture

**Function Name:** `analyze-business`

**Purpose:** Main research function that orchestrates Google Search, URL Context, and Deep Search.

**Input:**
- Company name (required)
- Website URL (optional)
- Business description (optional)
- Industry hint (optional)

**Authentication:**
- **CRITICAL:** Validate `GEMINI_API_KEY` exists in environment variables. If missing, throw 500 error immediately.

**Streaming Implementation:**
- Use **Server-Sent Events (SSE)** or chunked HTTP response to stream text to the client.
- Flush buffer every ~10 tokens or on sentence boundaries to ensure smooth UI updates.
- Stream structure should allow concurrent transmission of text chunks and final structured JSON block.

**Processing:**
- Execute Google Search queries
- Optionally analyze website with URL Context
- Optionally perform Deep Search synthesis
- Stream results in real-time
- Return structured output with industry classification

**Output:**
- Streaming text chunks for real-time display
- Final structured output with industry, maturity, observations
- Citations array for verification

**Error Handling:**
- **Retry Logic:** Implement exponential backoff for 503 (Service Unavailable) or 429 (Rate Limit) errors. Max 3 retries.
- **Fallback:** If search fails completely, provide a generic "Unable to verify" message but allow manual entry.
- **User Messages:** Return friendly JSON error messages to the UI (e.g., "Research service busy, please try again") instead of raw stack traces.
- **Logging:** Log all API failures to Supabase logs.

**Performance:**
- Target: Complete within 30 seconds
- Streaming: First chunk within 2 seconds
- Timeout: 60 seconds maximum

---

## Progress Summary

**Current Status:** Planning and documentation complete  
**Next Steps:** Implementation of Analyst Agent, Google Search integration, URL Context tool  
**Blockers:** None identified  
**Dependencies:** Gemini API access, Industry Pack system structure  
**Estimated Completion:** 5-7 days from start of implementation

**Key Deliverables:**
- Analyst Agent implementation
- Google Search Grounding integration
- URL Context tool integration
- Streaming intelligence narrative
- Industry classification system
- Digital maturity assessment
- Three-panel UI implementation

**Success Metrics:**
- 95%+ business verification accuracy
- 90%+ industry detection accuracy
- 85%+ maturity score alignment
- <30 second research completion time
- Positive user feedback on intelligence quality

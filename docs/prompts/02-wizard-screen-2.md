
# Wizard Screen 2: Industry Diagnostics — Implementation Prompt

**Progress Tracker:** Step 2 of 5 | Status: Planning Phase | Priority: P0 Critical  
**Estimated Implementation:** 6-8 days | Dependencies: Step 1 Complete, Industry Pack System  
**Completion Criteria:** Dynamic question generation works, industry-specific language accurate, problem-to-system mapping functional

---

## Executive Summary

Screen 2 transforms generic business questions into industry-specific diagnostics that feel like they were written by a senior operator in the client's vertical. This step uses the industry context from Step 1 to generate four targeted diagnostic questions that identify real business problems and map them to relevant AI systems. The questions use industry-specific language and terminology, making the experience feel consultative rather than transactional.

**Core Value:** Users feel understood because the questions reflect their actual business workflows. A fashion brand sees questions about "seasonal drops" and "PDP conversion," while a real estate broker sees questions about "lead response time" and "tour scheduling." This industry-specific customization is what differentiates Sun AI from generic AI chatbots.

---

## Three-Panel Layout Architecture

### Left Panel (20% Width) — Context Sidebar

**Purpose:** Display locked industry context from Step 1 to maintain continuity.

**Content Structure:**
- Locked industry context display showing detected industry from Step 1
- Industry name prominently displayed (e.g., "Fashion E-commerce")
- Industry description or summary
- Digital maturity score from Step 1 (visual indicator 1-5)
- Business model summary (e.g., "Premium DTC Fashion Brand")
- Visual indicator that this context is "locked" and cannot be changed

**Design Principles:**
- Clear visual hierarchy showing this is established context
- Industry-specific styling or colors to reinforce personalization
- Read-only appearance to indicate locked state
- Consistent with Step 1 left panel styling

**User Experience:**
- Users see their industry context throughout the step
- Reinforces that the experience is personalized to their vertical
- Provides context for why questions are industry-specific
- Builds trust through continuity from Step 1

---

### Center Panel (50% Width) — Dynamic Diagnostic Form

**Purpose:** Present industry-specific diagnostic questions that identify business problems.

**Content Structure:**
- Dynamic form with four diagnostic questions generated based on industry
- Each question has a clear title and description
- Four multiple-choice options per question
- Each option represents a specific business problem
- Each option maps to one or more AI systems
- Progress indicator showing which question is active
- Continue button (disabled until all four questions answered)

**Question Categories:**
1. **Sales & Growth Question:** Focuses on revenue blockers and growth challenges
2. **Content & Presence Question:** Addresses marketing, content, and brand presence issues
3. **Operational Speed Question:** Identifies inefficiencies and time-consuming processes
4. **Executive Priority Question:** Captures highest-priority goals and strategic focus

**Form Behavior:**
- Questions generate dynamically when screen loads
- Each question appears one at a time or all at once (UX decision)
- Options are clickable and show selection state
- Selected options highlight to show user choice
- Form validates that all questions have answers before enabling Continue

**User Experience:**
- Questions feel relevant and industry-specific
- Options use real business language from the industry
- Selection process feels consultative, not like a survey
- Progress is clear and motivating

---

### Right Panel (30% Width) — Contextual Intelligence

**Purpose:** Explain question relevance and build trust through transparency.

**Content Structure:**
- Contextual explanation of current question being answered
- "Why this matters" section explaining question relevance in industry context
- Problem-to-solution mapping preview showing how answers map to AI systems
- Intelligence narrative explaining the diagnostic approach
- Industry-specific examples or case studies
- Real-time updates as user selects different options

**Dynamic Content:**
- Content updates based on which question is active
- Shows different explanations for each question category
- Displays problem-to-solution relationships as user selects options
- Provides industry-specific context and examples

**Visual Design:**
- Terminal-like appearance for intelligence narrative
- Clear sections for different types of information
- Visual connections showing problem-to-solution mapping
- Industry-specific examples highlighted

**User Experience:**
- Users understand why each question matters
- Transparency builds trust in the diagnostic process
- Problem-to-solution preview helps users understand value
- Industry context makes questions feel relevant

---

## Purpose & Strategic Intent

**Primary Purpose:** Identify industry-specific business problems through targeted diagnostics.

This screen transforms the generic "what are your pain points?" question into a sophisticated diagnostic process that uses industry knowledge to surface real problems. By generating questions dynamically based on the detected industry, we create a personalized experience that feels like consulting with a senior operator in that vertical.

**Strategic Intent:**
- Demonstrate deep industry knowledge through specific questions
- Build trust through relevant, consultative questioning
- Identify real problems that map to specific solutions
- Create engagement through industry-specific language
- Set up accurate system recommendations in Step 3

**Business Impact:**
- Higher engagement due to relevant questions
- Better problem identification leads to better solutions
- Industry-specific language builds credibility
- Problem-to-system mapping enables accurate recommendations

---

## Goals & Success Criteria

### Functional Goals

**Goal 1: Problem Identification**
- Surface real business problems specific to the detected industry
- Success metric: 90%+ of users find questions relevant to their business
- Verification method: User feedback, completion rates, option selection patterns
- Edge cases: Multi-industry businesses, niche verticals, emerging industries

**Goal 2: Industry Customization**
- Generate questions using industry-specific language and terminology
- Success metric: Questions use correct industry terminology 95%+ of the time
- Verification method: Manual review by industry experts
- Edge cases: Industries with regional variations, evolving terminology

**Goal 3: Solution Mapping**
- Map each problem option to relevant AI systems accurately
- Success metric: 95%+ accuracy in problem-to-system mapping
- Verification method: Compare mappings vs industry pack definitions
- Edge cases: Problems that map to multiple systems, edge case problems

**Goal 4: Trust Building**
- Explain why each question matters in industry context
- Success metric: Users understand question relevance
- Verification method: User feedback, time spent reading explanations
- Edge cases: Complex industries, technical questions

**Goal 5: Context Accumulation**
- Build comprehensive problem profile for system recommendation
- Success metric: Problem profile enables accurate recommendations in Step 3
- Verification method: Correlation between Step 2 answers and Step 3 recommendations
- Edge cases: Contradictory answers, edge case problem combinations

**Goal 6: User Engagement**
- Make diagnostics feel consultative, not transactional
- Success metric: Users complete all four questions without abandonment
- Verification method: Completion rates, time spent on screen
- Edge cases: Users with limited problems, users with many problems

---

## Real-World Examples & Applications

### Example 1: Fashion E-commerce Brand

**Industry Context:** Fashion E-commerce (from Step 1)

**Generated Questions:**

**Question 1: Sales & Growth**
"What's blocking your revenue growth right now?"
- Option A: High product views but low add-to-cart conversion
- Option B: Returns driven by sizing confusion
- Option C: Inventory forecasting done manually, causing stockouts
- Option D: Seasonal drops take too long to launch

**Question 2: Content & Presence**
"Where is content production slowing you down?"
- Option A: Creative fatigue on Meta and TikTok
- Option B: Product descriptions written individually, taking hours
- Option C: UGC content sourcing is manual and time-consuming
- Option D: Social media content calendar is inconsistent

**Question 3: Operational Speed**
"What operational task takes too long?"
- Option A: Catalog updates slow seasonal drops
- Option B: Inventory forecasting done manually
- Option C: Returns processing takes days
- Option D: Product data entry is manual

**Question 4: Executive Priority**
"What's your highest-priority goal this quarter?"
- Option A: Increase conversion rate on product pages
- Option B: Reduce return rate through better fit guidance
- Option C: Scale content production without hiring
- Option D: Improve inventory forecasting accuracy

**Right Panel Intelligence:**
- Explains why conversion rate matters for fashion brands
- Shows how sizing confusion drives returns
- Maps problems to systems: "High views/low cart" → "PDP Conversion Optimizer"
- Provides industry benchmarks and context

**User Experience:**
- User sees questions about "seasonal drops" and "PDP conversion" (industry terms)
- Options reflect real fashion e-commerce problems
- User feels understood and proceeds confidently

---

### Example 2: Real Estate Brokerage

**Industry Context:** Real Estate (Rentals + Buying) (from Step 1)

**Generated Questions:**

**Question 1: Sales & Growth**
"What's blocking your lead conversion?"
- Option A: Leads come in but response time is too slow
- Option B: Too many unqualified tours (wrong budget, wrong move-in date)
- Option C: No automated follow-up after tours
- Option D: Commission pipeline not visible

**Question 2: Content & Presence**
"Where are listings falling short?"
- Option A: Listings lack strong neighborhood storytelling
- Option B: Property photos are inconsistent quality
- Option C: Listing details are unclear or missing
- Option D: No automated listing updates across platforms

**Question 3: Operational Speed**
"What takes too long in your process?"
- Option A: Tour scheduling is manual and time-consuming
- Option B: Lead qualification happens via email chains
- Option C: Listing updates take hours to publish
- Option D: Client-property matching is done manually

**Question 4: Executive Priority**
"What's your biggest challenge?"
- Option A: Finding qualified leads
- Option B: Converting leads to tours
- Option C: Closing deals faster
- Option D: Managing multiple properties efficiently

**Right Panel Intelligence:**
- Explains why lead response time matters (15-minute industry average)
- Shows how unqualified tours waste time
- Maps problems to systems: "Slow response" → "WhatsApp Lead Concierge"
- Provides real estate industry context and benchmarks

**User Experience:**
- User sees questions about "tours," "listings," and "lead response time"
- Options reflect real real estate problems
- User appreciates industry-specific language

---

### Example 3: Tour Operator

**Industry Context:** Tourism (Tours + Experiences) (from Step 1)

**Generated Questions:**

**Question 1: Sales & Growth**
"What's blocking booking conversion?"
- Option A: WhatsApp inquiries don't convert because replies are slow
- Option B: Itinerary pages unclear (what's included, pickup, timing)
- Option C: Missing upsells (private upgrade, add-ons, airport transfer)
- Option D: Seasonality causes revenue dips with no strategy

**Question 2: Content & Presence**
"Where does content fall short?"
- Option A: Reviews exist but aren't leveraged to drive bookings
- Option B: Itinerary details are unclear or missing
- Option C: OTA listings lack compelling descriptions
- Option D: Social media presence is inconsistent

**Question 3: Operational Speed**
"What operational task takes too long?"
- Option A: Booking confirmations are manual
- Option B: Itinerary updates take hours
- Option C: Review requests are sent manually
- Option D: Day-of operations coordination is chaotic

**Question 4: Executive Priority**
"What's your biggest operational challenge?"
- Option A: Inquiry management and response time
- Option B: Booking conversion and upsells
- Option C: Review generation and reputation
- Option D: Seasonal revenue management

**Right Panel Intelligence:**
- Explains why WhatsApp response time matters for tour operators
- Shows how unclear itineraries reduce bookings
- Maps problems to systems: "Slow WhatsApp replies" → "WhatsApp Booking Concierge"
- Provides tourism industry context and benchmarks

**User Experience:**
- User sees questions about "itineraries," "WhatsApp," and "seasonality"
- Options reflect real tourism business problems
- User feels the questions understand their business model

---

## Industry Wireframe & UI/UX Layout

### Desktop Layout (1024px+)

**Left Panel:**
- Fixed width: 20% of viewport
- Sticky positioning: Remains visible during scroll
- Background: Light neutral with industry-specific accent
- Content: Industry name, description, maturity score, business model
- Visual: Lock icon or indicator showing context is locked

**Center Panel:**
- Width: 50% of viewport
- Max-width: 800px for optimal readability
- Padding: 64px top, 32px sides, 64px bottom
- Content: Four diagnostic questions, multiple-choice options, continue button
- Layout: Questions can be displayed one at a time or all at once

**Right Panel:**
- Fixed width: 30% of viewport
- Sticky positioning: Remains visible during scroll
- Background: Dark neutral for intelligence narrative
- Content: Question explanations, problem-to-solution mapping, industry context
- Updates: Content changes based on active question

### Mobile Layout (768px and below)

**Layout Changes:**
- Left panel: Minimal or hidden, industry context shown in center panel header
- Center panel: Full width, questions displayed one at a time with navigation
- Right panel: Collapsible section or separate tab

**Touch Interactions:**
- Large tap targets for option selection
- Swipe or tap navigation between questions
- Expandable right panel for explanations
- Clear continue button when all questions answered

### Typography & Visual Hierarchy

**Question Titles:**
- Large, bold, clear hierarchy
- Industry-specific language prominent
- Easy to scan and understand

**Option Text:**
- Medium weight, readable
- Industry terminology used naturally
- Clear selection states (hover, active, selected)

**Intelligence Narrative:**
- Monospace font for terminal aesthetic
- Clear sections for different information types
- Visual connections for problem-to-solution mapping

---

## Gemini 3 Features & Tools

### Required Features

**Structured Outputs:**
- Purpose: Guarantee valid, structured responses for diagnostic questions
- Schema: JSON structure with four questions, each with four options and system mappings
- Validation: Strict schema enforcement ensures consistency
- Industry Constraints: System names constrained to industry pack values
- Output: Reliable data structure for question generation

**Thinking Mode:**
- Purpose: Deep reasoning for industry-specific question generation
- Budget: 4096 tokens for complex industry analysis
- Process: Analyzes industry context, business model, maturity level
- Output: Industry-specific questions with proper terminology
- Performance: Adds 10-15 seconds but ensures quality

**Industry Pack Integration:**
- Purpose: Load industry-specific question templates and problem examples
- Source: Industry pack files with question templates
- Customization: Questions use industry-specific language and problems
- Validation: Ensures questions match industry pack structure

### Model Selection

**Gemini 3 Pro:**
- Rationale: Complex reasoning required for industry-specific question generation
- Performance: 10-15 seconds for question generation with thinking
- Quality: Ensures questions use correct industry terminology
- Cost: Higher cost justified by quality requirement

**When to Use Flash:**
- Not recommended for Screen 2 due to complexity
- Pro required for accurate industry-specific question generation
- Flash could be used for simpler question formatting tasks

---

## AI Agent: Extractor Agent

### Agent Profile

**Agent Type:** Consultant & Data Structuring Specialist  
**Model:** Gemini 3 Pro  
**Primary Responsibility:** Industry-specific diagnostic question generation  
**Persona:** Senior industry consultant with deep vertical expertise

### Input Requirements

**Required Input:**
- Industry detected (from Step 1)
- Business context (from Step 1: business model, maturity, observations)

**Context from Previous Steps:**
- Step 1: Industry, business model, digital maturity, business intelligence

**Industry Pack:**
- Question templates for detected industry
- Problem examples specific to industry
- AI system names constrained to industry pack
- Industry-specific business workflow patterns

### Processing Logic

**Step 1: Load Industry Pack**
- Load industry-specific question templates
- Load problem examples for the industry
- Load AI system names and descriptions
- Load industry-specific terminology and language

**Step 2: Analyze Business Context**
- Review industry from Step 1
- Consider business model and maturity level
- Identify relevant business workflows
- Determine appropriate question focus areas

**Step 3: Generate Diagnostic Questions**
- Generate Sales & Growth question using industry templates
- Generate Content & Presence question using industry templates
- Generate Operational Speed question using industry templates
- Generate Executive Priority question using industry templates
- Use Thinking Mode for deep industry analysis

**Step 4: Create Problem Options**
- Generate four problem options per question
- Use industry-specific problem examples
- Ensure problems reflect real business challenges
- Map each problem to relevant AI systems

**Step 5: Map Problems to Systems**
- Match problems to AI systems from industry pack
- Ensure system names are constrained to pack
- Create problem-to-solution relationships
- Validate mappings are accurate

**Step 6: Generate Explanations**
- Create "why this matters" explanations per question
- Use industry-specific context and benchmarks
- Provide problem-to-solution preview
- Generate intelligence narrative

### Output Structure

**Dynamic Title:**
- Industry-specific title for diagnostic section
- Uses industry terminology naturally

**Four Diagnostic Questions:**
- Sales question with four options and four AI system mappings
- Content question with four options and four AI system mappings
- Speed question with four options and four AI system mappings
- Priority question with four options and four AI system mappings

**Question Explanations:**
- "Why this matters" explanation per question
- Industry-specific context and benchmarks
- Problem-to-solution relationship preview

**Intelligence Narrative:**
- Explanation of diagnostic approach
- Industry-specific insights
- Real-time updates as user selects options

### Industry Pack Customization

**Question Templates:**
- Each industry pack provides question templates
- Fashion: Questions about drops, PDP conversion, sizing, inventory
- Real Estate: Questions about tours, listings, lead response, qualification
- Tourism: Questions about bookings, itineraries, reviews, seasonality
- Events: Questions about tickets, sponsors, vendors, content

**Problem Examples:**
- Industry-specific problems for each question category
- Fashion: High views/low cart, sizing confusion, creative fatigue
- Real Estate: Slow response time, unqualified tours, weak listings
- Tourism: Slow WhatsApp replies, unclear itineraries, missing upsells
- Events: Low ticket conversion, weak sponsor pipeline, vendor chaos

**AI System Mappings:**
- Problems map to industry-specific AI systems
- Fashion: PDP Conversion Optimizer, Fit & Size Intelligence Agent
- Real Estate: WhatsApp Lead Concierge, Tour Scheduling Orchestrator
- Tourism: WhatsApp Booking Concierge, Itinerary Builder & Upsell Engine
- Events: Ticket Funnel Optimizer, Sponsor Package Generator

---

## Core Prompts & Edge Functions

### Core Prompt: Diagnostic Question Generation

**Purpose:** Generate industry-specific diagnostic questions that identify real business problems.

**Prompt Structure:**
- System context: Role as senior industry consultant
- Task: Generate four diagnostic questions using industry-specific language
- Input: Industry, business context, industry pack templates
- Output format: Structured JSON with questions, options, system mappings
- Constraints: Must use industry terminology, map to industry systems, be relevant

**Key Instructions:**
- Use industry-specific question templates from Industry Pack
- Generate problems that reflect real business challenges
- Map each problem to relevant AI systems from industry pack
- Use industry terminology naturally (not generic business language)
- Ensure questions feel consultative, not like a survey
- Provide "why this matters" explanations with industry context

### Core Prompt: Problem-to-System Mapping

**Purpose:** Accurately map identified problems to relevant AI systems.

**Prompt Structure:**
- System context: Solution architect with industry expertise
- Task: Map problems to AI systems that solve them
- Input: Selected problems, industry context, industry pack systems
- Output format: Structured mappings with reasoning
- Constraints: Systems must be from industry pack, mappings must be accurate

**Key Instructions:**
- Match problems to systems from industry pack only
- Ensure mappings are accurate and logical
- Provide reasoning for each mapping
- Consider system combinations and dependencies
- Use industry-specific system names

### Advanced Prompt: Industry Context Explanation

**Purpose:** Explain question relevance and build trust through industry expertise.

**Prompt Structure:**
- System context: Senior consultant explaining diagnostic approach
- Task: Explain why each question matters in industry context
- Input: Question, industry context, business model, maturity
- Output format: Natural language explanation with industry benchmarks
- Constraints: Must be accurate, use industry context, build trust

**Key Instructions:**
- Explain question relevance using industry context
- Provide industry benchmarks and standards
- Show how problems impact business outcomes
- Use industry-specific examples and case studies
- Build trust through transparency and expertise

### Edge Function Architecture

**Function Name:** `generate-diagnostics`

**Purpose:** Main diagnostic generation function using Industry Pack and business context.

**Input:**
- Industry (from Step 1)
- Business context (business model, maturity, observations)
- Industry Pack (loaded dynamically)

**Processing:**
- Load industry-specific question templates
- Generate four diagnostic questions using Thinking Mode
- Create problem options using industry examples
- Map problems to AI systems from industry pack
- Generate explanations and intelligence narrative

**Output:**
- Structured JSON with four questions, options, system mappings
- Question explanations and intelligence narrative
- Problem-to-solution mapping preview

**Error Handling:**
- Handle missing industry pack gracefully
- Provide fallback questions if generation fails
- Log errors for monitoring and improvement
- User-friendly error messages

**Performance:**
- Target: Complete within 45 seconds
- Thinking Mode: 10-15 seconds for deep analysis
- Question generation: 20-30 seconds total
- Timeout: 90 seconds maximum

---

## Progress Summary

**Current Status:** Planning and documentation complete  
**Next Steps:** Implementation of Extractor Agent, Industry Pack integration, Thinking Mode configuration  
**Blockers:** None identified  
**Dependencies:** Step 1 complete, Industry Pack system structure defined  
**Estimated Completion:** 6-8 days from start of implementation

**Key Deliverables:**
- Extractor Agent implementation
- Industry Pack question template system
- Thinking Mode integration (4096 tokens)
- Structured Outputs for question generation
- Problem-to-system mapping logic
- Three-panel UI with dynamic form generation

**Success Metrics:**
- 90%+ of users find questions relevant
- 95%+ accuracy in industry terminology
- 95%+ accuracy in problem-to-system mapping
- <45 second question generation time
- Positive user feedback on question relevance

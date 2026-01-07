
# Wizard Screen 3: System Selection — Implementation Prompt

**Progress Tracker:** Step 3 of 5 | Status: Planning Phase | Priority: P0 Critical  
**Estimated Implementation:** 5-7 days | Dependencies: Step 2 Complete, Industry Pack System  
**Completion Criteria:** System recommendations accurate, ROI projections functional, selection limit enforced

---

## Executive Summary

Screen 3 transforms identified business problems into actionable AI system recommendations. This step takes the problems selected in Step 2 and maps them to industry-specific AI systems, ranks them by relevance, and provides ROI projections to help users make informed decisions. The screen limits selection to three systems to maintain focus and ensure realistic implementation.

**Core Value:** Users see exactly which AI systems solve their specific problems, with clear ROI projections that help them prioritize. The "Recommended" badges highlight best-fit systems, while the problem-to-solution mapping shows transparent reasoning. This creates confidence in the recommendations and sets realistic expectations.

---

## Three-Panel Layout Architecture

### Left Panel (20% Width) — Priority Summary

**Purpose:** Display selected problems from Step 2 to maintain context.

**Content Structure:**
- Priority summary showing selected problems from Step 2
- Selected problems highlighted with visual indicators
- Problem-to-solution relationships shown as connections
- Industry context reminder (industry name, business model)
- Visual summary of diagnostic answers

**Design Principles:**
- Clear visual hierarchy showing selected priorities
- Problem items styled to show they're from previous step
- Visual connections showing how problems map to systems
- Consistent styling with previous steps

**User Experience:**
- Users see their selected problems throughout the step
- Reinforces why specific systems are recommended
- Provides context for system selection decisions
- Builds continuity from Step 2

---

### Center Panel (50% Width) — System Recommendation Cards

**Purpose:** Present AI system recommendations with clear selection interface.

**Content Structure:**
- Five to six system recommendation cards
- Each card displays:
  - System name (industry-specific, memorable)
  - System description (what it does, how it helps)
  - Problem it solves (mapped from Step 2 selections)
  - ROI impact projection (industry-specific calculations)
  - "Recommended" badge (for 2-3 best-fit systems)
- Selection limit indicator (X of 3 selected)
- Continue button (disabled until 1-3 systems selected)

**Card Design:**
- Large, clickable cards with hover states
- Clear visual hierarchy: name, description, ROI, badge
- Selection state clearly indicated (border, background, checkmark)
- Recommended badge prominent for best-fit systems
- ROI projection displayed prominently

**Selection Behavior:**
- Cards are clickable to select/deselect
- Selection limit enforced (cannot select more than 3)
- Visual feedback on selection state
- Counter shows "X of 3 selected"
- Continue button enables when 1-3 systems selected

**User Experience:**
- Cards are easy to scan and understand
- Selection process feels intuitive
- ROI projections help prioritize
- Recommended badges guide decision-making
- Selection limit prevents overwhelm

---

### Right Panel (30% Width) — ROI Impact Stream

**Purpose:** Show ROI calculations and strategic observations about system combinations.

**Content Structure:**
- ROI impact stream showing calculations per selected system
- Problem-to-solution mapping visualization
- Intelligence narrative explaining recommendations
- Strategic observations about system combinations
- Industry-specific success metrics
- Implementation complexity indicators

**Dynamic Content:**
- Updates as user selects different systems
- Shows cumulative ROI when multiple systems selected
- Displays system combination benefits
- Highlights dependencies between systems
- Provides strategic insights

**Visual Design:**
- Terminal-like appearance for intelligence narrative
- Visual connections for problem-to-solution mapping
- ROI calculations displayed clearly
- System combination insights highlighted

**User Experience:**
- Users understand ROI calculations
- Strategic insights help with decision-making
- System combinations explained clearly
- Transparency builds trust

---

## Purpose & Strategic Intent

**Primary Purpose:** Recommend AI systems that solve identified business problems with clear ROI projections.

This screen bridges the gap between problem identification and solution selection. By mapping problems to systems, ranking by relevance, and providing ROI projections, we help users make informed decisions about which AI systems to implement. The three-system limit ensures focus and realistic implementation.

**Strategic Intent:**
- Demonstrate how problems map to solutions
- Provide clear ROI projections for decision-making
- Limit selection to maintain focus
- Build confidence through transparent reasoning
- Set realistic expectations through honest ROI calculations

**Business Impact:**
- Higher conversion due to clear value demonstration
- Better system selection leads to better outcomes
- ROI projections set realistic expectations
- Focused selection enables successful implementation

---

## Goals & Success Criteria

### Functional Goals

**Goal 1: System Recommendation**
- Generate five to six relevant system recommendations
- Success metric: 90%+ of recommended systems are relevant to selected problems
- Verification method: Compare recommendations vs problem selections
- Edge cases: Problems with no clear system match, edge case problems

**Goal 2: Problem-to-Solution Mapping**
- Clearly show how each system solves identified problems
- Success metric: 95%+ accuracy in problem-to-solution mapping
- Verification method: Manual review of mappings vs industry pack definitions
- Edge cases: Problems that map to multiple systems, systems that solve multiple problems

**Goal 3: ROI Projections**
- Provide realistic ROI impact projections per system
- Success metric: ROI projections are realistic and achievable
- Verification method: Compare projections vs industry benchmarks
- Edge cases: Systems with uncertain ROI, complex system combinations

**Goal 4: Focus Constraint**
- Limit selection to three systems for focused execution
- Success metric: Selection limit enforced correctly
- Verification method: UI prevents selection of more than 3 systems
- Edge cases: Users trying to select more than 3, users selecting 0 systems

**Goal 5: Industry Alignment**
- Ensure all system names are industry-specific
- Success metric: 100% of system names match industry pack
- Verification method: Validate system names against industry pack
- Edge cases: Systems not in industry pack, generic system names

**Goal 6: Trust Building**
- Show "Recommended" badges for best-fit systems with reasoning
- Success metric: Users trust recommended systems
- Verification method: User feedback, selection patterns
- Edge cases: All systems equally relevant, no clear best-fit

---

## Real-World Examples & Applications

### Example 1: Fashion E-commerce Brand

**Selected Problems (from Step 2):**
- High product views but low add-to-cart conversion
- Returns driven by sizing confusion

**System Recommendations:**

**System 1: PDP Conversion Optimizer**
- Description: Optimizes product pages to increase conversion from views to purchases
- Problems Solved: High views/low cart conversion
- ROI Projection: 15% conversion increase ($450K annual revenue)
- Recommended: Yes (best-fit for primary problem)

**System 2: Fit & Size Intelligence Agent**
- Description: Reduces returns through personalized fit guidance and size recommendations
- Problems Solved: Returns driven by sizing confusion
- ROI Projection: 30% return rate reduction ($120K annual savings)
- Recommended: Yes (addresses secondary problem)

**System 3: UGC Content Supply Chain**
- Description: Automates user-generated content collection and display
- Problems Solved: Creative fatigue (from Step 2)
- ROI Projection: 20 hours/week saved ($50K annual value)
- Recommended: No (lower priority)

**System 4: Catalog Enrichment Engine**
- Description: Automates product data entry and catalog updates
- Problems Solved: Manual catalog updates (from Step 2)
- ROI Projection: 10 hours/week saved ($25K annual value)
- Recommended: No (lower priority)

**Right Panel Intelligence:**
- Shows cumulative ROI: $570K annual value from top 2 systems
- Explains why PDP Conversion Optimizer is recommended first
- Maps problems to systems clearly
- Provides strategic insights about system combinations

**User Experience:**
- User sees systems with industry-specific names
- ROI projections are clear and compelling
- Recommended badges guide selection
- User selects top 2 recommended systems

---

### Example 2: Real Estate Brokerage

**Selected Problems (from Step 2):**
- Leads come in but response time is too slow
- Too many unqualified tours

**System Recommendations:**

**System 1: WhatsApp Lead Concierge**
- Description: Instant lead response automation via WhatsApp
- Problems Solved: Slow response time
- ROI Projection: 40% faster response time (3x more qualified leads)
- Recommended: Yes (addresses primary problem)

**System 2: Qualification & Budget Filter Agent**
- Description: Pre-qualifies leads before scheduling tours
- Problems Solved: Unqualified tours
- ROI Projection: 50% reduction in unqualified tours ($200K annual time savings)
- Recommended: Yes (addresses secondary problem)

**System 3: Tour Scheduling Orchestrator**
- Description: Automates tour scheduling and coordination
- Problems Solved: Manual tour scheduling (from Step 2)
- ROI Projection: 5 hours/week saved ($15K annual value)
- Recommended: No (lower priority)

**System 4: Neighborhood Storytelling Engine**
- Description: Optimizes listings with compelling neighborhood stories
- Problems Solved: Weak listings (from Step 2)
- ROI Projection: 20% increase in listing engagement
- Recommended: No (lower priority)

**Right Panel Intelligence:**
- Shows cumulative ROI: 3x more qualified leads, $200K time savings
- Explains why WhatsApp Lead Concierge is critical for real estate
- Maps problems to systems with clear reasoning
- Provides strategic insights about lead response importance

**User Experience:**
- User sees real estate-specific system names
- ROI projections reflect real estate metrics (response time, tour conversion)
- Recommended systems clearly address selected problems
- User selects top 2 recommended systems

---

### Example 3: Tour Operator

**Selected Problems (from Step 2):**
- WhatsApp inquiries don't convert because replies are slow
- Itinerary pages unclear

**System Recommendations:**

**System 1: WhatsApp Booking Concierge**
- Description: Instant booking assistant via WhatsApp
- Problems Solved: Slow WhatsApp replies
- ROI Projection: 60% faster response time, 25% increase in booking value
- Recommended: Yes (addresses primary problem)

**System 2: Itinerary Builder & Upsell Engine**
- Description: Creates clear itineraries and suggests upsells
- Problems Solved: Unclear itineraries, missing upsells
- ROI Projection: 25% increase in booking value through upsells
- Recommended: Yes (addresses secondary problem)

**System 3: Review-to-Reputation Flywheel**
- Description: Automates review collection and reputation management
- Problems Solved: Reviews not leveraged (from Step 2)
- ROI Projection: 30% increase in review volume
- Recommended: No (lower priority)

**System 4: Dynamic Pricing & Availability Advisor**
- Description: Optimizes pricing based on seasonality and demand
- Problems Solved: Seasonality revenue dips (from Step 2)
- ROI Projection: 15% revenue increase during low seasons
- Recommended: No (lower priority)

**Right Panel Intelligence:**
- Shows cumulative ROI: 60% faster response, 25% booking value increase
- Explains why WhatsApp is critical for tour operators
- Maps problems to systems with tourism-specific context
- Provides strategic insights about booking conversion

**User Experience:**
- User sees tourism-specific system names
- ROI projections reflect tourism metrics (response time, booking value)
- Recommended systems address WhatsApp and itinerary problems
- User selects top 2 recommended systems

---

## Industry Wireframe & UI/UX Layout

### Desktop Layout (1024px+)

**Left Panel:**
- Fixed width: 20% of viewport
- Sticky positioning: Remains visible during scroll
- Background: Light neutral with problem highlights
- Content: Selected problems, problem-to-solution connections, industry context

**Center Panel:**
- Width: 50% of viewport
- Max-width: 900px for card layout
- Padding: 64px top, 32px sides, 64px bottom
- Content: System recommendation cards in grid layout (2-3 columns)
- Cards: Large, clickable, clear visual hierarchy

**Right Panel:**
- Fixed width: 30% of viewport
- Sticky positioning: Remains visible during scroll
- Background: Dark neutral for intelligence narrative
- Content: ROI calculations, problem-to-solution mapping, strategic insights

### Mobile Layout (768px and below)

**Layout Changes:**
- Left panel: Minimal or hidden, problems shown in center panel header
- Center panel: Full width, cards in single column
- Right panel: Collapsible section or separate tab

**Touch Interactions:**
- Large tap targets for card selection
- Clear selection states
- Easy scrolling through cards
- Prominent continue button

### Typography & Visual Hierarchy

**System Names:**
- Large, bold, memorable
- Industry-specific terminology
- Clear hierarchy

**ROI Projections:**
- Prominent display with currency formatting
- Clear visual emphasis
- Industry-specific metrics

**Recommended Badges:**
- High contrast, attention-grabbing
- Clear "Recommended" text
- Visual distinction from other cards

---

## Gemini 3 Features & Tools

### Required Features

**Structured Outputs:**
- Purpose: Guarantee valid system recommendations with consistent structure
- Schema: JSON structure with system names, descriptions, ROI projections, recommended flags
- Validation: Strict schema enforcement ensures consistency
- Industry Constraints: System names constrained to industry pack values
- Output: Reliable data structure for system recommendations

**Thinking Mode:**
- Purpose: Extended reasoning for system ranking and ROI calculations
- **Budget: 4096 tokens** (Increased from 1024 to ensure high-quality ranking logic)
- Process: Analyzes problems, ranks systems, calculates ROI
- Output: Ranked system recommendations with reasoning
- Performance: Adds 5-10 seconds but ensures quality

**Industry Pack Integration:**
- Purpose: Constrain system names to industry pack and use industry-specific ROI formulas
- Source: Industry pack files with system names and ROI calculation formulas
- Customization: Systems use industry-specific names and descriptions
- Validation: Ensures system names match industry pack

### Model Selection

**Gemini 3 Pro Preview (`gemini-3-pro-preview`):**
- **CRITICAL:** Must use the `-preview` suffix.
- Rationale: Reasoning required for system ranking and ROI calculations
- Performance: 5-10 seconds for system recommendation with thinking
- Quality: Ensures accurate system ranking and ROI calculations
- Cost: Higher cost justified by quality requirement

**When to Use Flash:**
- Not recommended for Screen 3 due to ranking complexity
- Pro required for accurate system recommendations
- Flash could be used for simpler formatting tasks

---

## AI Agent: Optimizer Agent

### Agent Profile

**Agent Type:** Architect & Solution Mapping Specialist  
**Model:** `gemini-3-pro-preview`  
**Primary Responsibility:** System stack optimization and recommendations  
**Persona:** Senior solution architect with deep industry expertise

### Input Requirements

**Required Input:**
- Selected problems (from Step 2)
- Industry context (from Step 1)

**Context from Previous Steps:**
- Step 1: Industry, business model, digital maturity
- Step 2: Selected problems, diagnostic answers

**Industry Pack:**
- System names and descriptions for detected industry
- ROI calculation formulas per industry
- Industry-specific success metrics

### Processing Logic

**Step 1: Load Industry Systems**
- Load industry-specific system names from Industry Pack
- Load system descriptions and capabilities
- Load ROI calculation formulas
- Validate systems are available for industry

**Step 2: Rank Systems by Relevance**
- Analyze selected problems from Step 2
- Match problems to systems from industry pack
- Rank systems by relevance to selected problems
- Consider system combinations and dependencies

**Step 3: Calculate ROI Projections**
- Use industry-specific ROI calculation formulas
- Calculate ROI per system based on problems solved
- Consider cumulative ROI for system combinations
- Provide realistic, achievable projections

**Step 4: Identify Recommended Systems**
- Mark 2-3 best-fit systems as "Recommended"
- Provide reasoning for recommendations
- Consider problem priority and system impact
- Ensure recommendations are accurate

**Step 5: Generate Problem-to-Solution Mapping**
- Create clear connections between problems and systems
- Show how each system solves specific problems
- Provide visual mapping for transparency
- Generate intelligence narrative

### Output Structure

**Five to Six System Recommendations:**
- System name (industry-specific, constrained to pack)
- System description (what it does, how it helps)
- Problems it solves (mapped from Step 2)
- ROI impact projection (industry-specific calculations)
- Recommended flag (boolean, 2-3 typically recommended)

**Problem-to-Solution Mapping:**
- Visual connections showing problem-to-system relationships
- Clear reasoning for each mapping
- Strategic observations about system combinations

**Intelligence Narrative:**
- Explanation of recommendations
- ROI calculation reasoning
- Strategic insights about system combinations
- Industry-specific success metrics

### Industry Pack Customization

**System Names:**
- Constrained to industry pack system names
- Fashion: PDP Conversion Optimizer, Fit & Size Intelligence Agent
- Real Estate: WhatsApp Lead Concierge, Tour Scheduling Orchestrator
- Tourism: WhatsApp Booking Concierge, Itinerary Builder & Upsell Engine
- Events: Ticket Funnel Optimizer, Sponsor Package Generator

**ROI Calculation Formulas:**
- Industry-specific formulas for ROI calculations
- Fashion: Conversion rate improvements, return rate reductions
- Real Estate: Response time improvements, tour conversion increases
- Tourism: Booking value increases, response time improvements
- Events: Ticket conversion increases, sponsor pipeline velocity

**Success Metrics:**
- Industry-specific metrics for ROI projections
- Fashion: Conversion rate, AOV, return rate
- Real Estate: Response time, tour conversion, commission
- Tourism: Response time, booking value, review volume
- Events: Ticket conversion, sponsor pipeline, revenue per attendee

---

## Core Prompts & Edge Functions

### Core Prompt: System Recommendation

**Purpose:** Generate relevant system recommendations based on selected problems.

**Prompt Structure:**
- System context: Role as senior solution architect
- Task: Recommend AI systems that solve identified problems
- Input: Selected problems, industry context, industry pack systems
- Output format: Structured JSON with system recommendations
- Constraints: Systems must be from industry pack, recommendations must be relevant

**Key Instructions:**
- Rank systems by relevance to selected problems
- Use industry-specific system names from pack
- Calculate ROI using industry-specific formulas
- Mark 2-3 best-fit systems as "Recommended"
- Provide clear problem-to-solution mapping
- Use industry-specific language and terminology

### Core Prompt: ROI Calculation

**Purpose:** Calculate realistic ROI projections for each system.

**Prompt Structure:**
- System context: Financial analyst with industry expertise
- Task: Calculate ROI projections for recommended systems
- Input: System, problems solved, industry context, industry formulas
- Output format: ROI projections with reasoning
- Constraints: Projections must be realistic and achievable

**Key Instructions:**
- Use industry-specific ROI calculation formulas
- Consider problems solved and their business impact
- Provide realistic, achievable projections
- Consider system combinations for cumulative ROI
- Use industry-specific metrics and benchmarks
- Be honest about uncertainties and limitations

### Advanced Prompt: System Combination Analysis

**Purpose:** Analyze strategic benefits of system combinations.

**Prompt Structure:**
- System context: Strategic consultant analyzing system synergies
- Task: Identify benefits and dependencies of system combinations
- Input: Selected systems, industry context, system capabilities
- Output format: Strategic insights about combinations
- Constraints: Must be accurate, consider dependencies

**Key Instructions:**
- Identify system combinations that work well together
- Highlight dependencies (System A requires System B)
- Show cumulative benefits of combinations
- Provide strategic insights about implementation order
- Use industry-specific context and examples

### Edge Function Architecture

**Function Name:** `recommend-systems`

**Purpose:** Main system recommendation function using problems and industry context.

**Input:**
- Selected problems (from Step 2)
- Industry context (from Step 1)
- Industry Pack (system names and ROI formulas)

**Authentication:**
- **CRITICAL:** Validate `GEMINI_API_KEY`.
- **Validation:** Check Industry Pack availability.

**Processing:**
- Load industry-specific systems from pack
- Rank systems by relevance to problems using **Thinking Mode** (4096 tokens)
- Calculate ROI using industry formulas
- Identify recommended systems
- Generate problem-to-solution mapping

**Output:**
- Structured JSON with system recommendations
- ROI projections per system
- Problem-to-solution mapping
- Strategic insights about combinations

**Error Handling:**
- **Retry Logic:** Exponential backoff.
- **ROI Validation:** Ensure ROI text is not hallucinated promises (e.g., "Guaranteed 100%"). Implement simple regex checks for realistic numbers.
- **Industry Pack:** Fallback if pack is missing.
- **User Messages:** Specific error feedback.

**Performance:**
- Target: Complete within **45 seconds**.
- Thinking Mode: 5-10 seconds for ranking
- ROI calculation: 10-15 seconds
- Timeout: 90 seconds maximum

---

## Progress Summary

**Current Status:** Planning and documentation complete  
**Next Steps:** Implementation of Optimizer Agent, ROI calculation system, system selection UI  
**Blockers:** None identified  
**Dependencies:** Step 2 complete, Industry Pack system with ROI formulas  
**Estimated Completion:** 5-7 days from start of implementation

**Key Deliverables:**
- Optimizer Agent implementation
- System ranking algorithm
- ROI calculation system with industry formulas
- System recommendation cards UI
- Selection limit enforcement
- Problem-to-solution mapping visualization

**Success Metrics:**
- 90%+ of recommended systems are relevant
- 95%+ accuracy in problem-to-solution mapping
- ROI projections are realistic and achievable
- <45 second system recommendation time
- Positive user feedback on recommendation quality

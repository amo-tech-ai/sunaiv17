# Sun AI Agency - Product Requirements Document

## Executive Summary

Sun AI Agency is a premium AI-powered consulting platform that transforms businesses from manual operations into automated growth engines. The platform uses a consultative 5-step wizard to understand client needs, generates strategic roadmaps, and provides execution dashboards.

**Core Value:**
- Problem-first discovery via intelligent wizard
- Industry-specific customization using AI
- Transparent AI reasoning builds trust
- Realistic phased execution plans
- Premium editorial design aesthetic

**Key Metrics:**
- 5-step wizard completion rate
- Industry detection accuracy
- Readiness assessment accuracy
- Roadmap adoption rate

---

## Problem Statement

### Business Problem
Companies struggle with:
- **Generic solutions** that don't address specific industry pain points
- **Lack of strategic planning** - no systematic approach to understanding needs
- **Unrealistic expectations** - implementations fail due to readiness gaps
- **Poor transparency** - clients don't see the thinking behind recommendations

### Solution
A consultative wizard that:
- Researches companies in real-time using Google Search
- Generates industry-specific diagnostic questions
- Maps problems to solutions (not tools to problems)
- Provides honest readiness assessments
- Creates realistic phased execution plans

---

## Target Users

### Primary: Business Owners & Executives
- **Role:** Decision-makers seeking AI automation
- **Needs:** Understand bottlenecks, get custom solutions, realistic timelines
- **Goals:** Transform operations, buy back time, scale efficiently

### Secondary: Agency Consultants
- **Role:** Strategic partners using the platform
- **Needs:** Client onboarding, project management, client communication
- **Goals:** Efficient client management, clear project visibility

---

## Core Features

### 1. 5-Step Consultative Wizard

**Step 1: Business Context**
- Company information form (name, website, industry, description)
- Real-time AI research via Google Search
- Industry and business model detection
- Digital maturity assessment
- Streaming intelligence notes in right panel

**Step 2: Industry Deep Dive**
- 4 custom diagnostic questions (sales, time, speed, priority)
- Industry-specific language and jargon
- Multiple choice selections
- AI explains question relevance

**Step 3: System Selection**
- 5-6 AI system recommendations based on pain points
- Up to 3 systems selectable
- Problem-to-solution mapping displayed
- "Recommended" badges for best-fit systems

**Step 4: Readiness Assessment**
- Readiness score (0-100) with category breakdown
- Critical gaps identification
- Quick wins suggestions
- Honest but encouraging feedback

**Step 5: Strategy & Phases**
- 3-phase execution roadmap
- Phase 1: Foundation (fix gaps)
- Phase 2: Implementation (deploy systems)
- Phase 3: Optimization (scale)
- Timeline estimates and deliverables per phase

### 2. 3-Panel Layout System

**Left Panel (20%):** Context sidebar
- Progress indicators
- Company summary
- Selected items from previous steps
- Fixed/sticky position

**Center Panel (50%):** Main work area
- Forms, questions, system cards
- Navigation buttons
- Max-width container for readability
- Scrollable content

**Right Panel (30%):** Sun AI Intelligence
- Real-time streaming AI reasoning
- Strategic observations
- Research citations
- Terminal-like appearance

### 3. Dashboard (Post-Wizard)

**Tabs:**
- Overview: Project summary, current phase, progress timeline
- Roadmap: Full 3-phase strategy with detailed views
- Tasks: Deliverables tracking with status and owners
- Systems: Selected systems overview and status
- Settings: Project information and preferences

---

## User Journey

1. **Entry:** User lands on wizard Step 1
2. **Discovery:** Enters company info → AI researches → Industry detected
3. **Diagnosis:** Answers industry-specific questions → Pain points identified
4. **Solution:** Reviews system recommendations → Selects up to 3 systems
5. **Assessment:** Receives readiness score → Gaps identified → Quick wins suggested
6. **Planning:** Reviews 3-phase roadmap → Understands timeline and deliverables
7. **Completion:** Lands on dashboard → Can view roadmap, tasks, systems

**Key Moments:**
- Trust building: Seeing AI research in real-time (Step 1)
- Personalization: Industry-specific questions (Step 2)
- Clarity: Problem-to-solution mapping (Step 3)
- Honesty: Realistic readiness assessment (Step 4)
- Action: Concrete phased plan (Step 5)

---

## Technical Requirements


- **AI:** Google Gemini (gemini-3-flash-preview, gemini-3-pro-preview)
- **Features:** Streaming responses, Google Search grounding, structured outputs
- Text generation
- Gemini Thinking
- Structured Outputs
- Function calling
- Grounding with Google Search
- URL Context tool
- Code execution
- Interactions API
- Deep research
- Grounding with Google Maps
- Retrieval Augmented Generation (RAG)
- Image generation (Nano Banana / Nano Banana Pro)
### Design System
- **Aesthetic:** Premium, Editorial, Architectural
- **Colors:** Warm backgrounds (#FDFCFB, #FAF8F6), dark text (#1A1A1A), amber accent (#F59E0B)
- **Typography:** Playfair Display (H1), Inter (body), Lora (narrative)
- **Components:** Square buttons, transparent inputs, 4px progress bars

### State Management
- **Wizard State:** localStorage persistence (`sun_ai_wizard_state_step`, `sun_ai_wizard_state_data`)
- **Intelligence State:** Real-time streaming notes and observations
- **User Data:** Accumulates across wizard steps

### AI Integration
- **Models:** Flash for streaming, Pro for deep analysis
- **Persona:** "Senior Strategic Partner at Sun AI Agency"
- **Tone:** Plain business language, no consultant jargon, no AI hype
- **Transparency:** Show reasoning process in right panel

---

## Success Criteria

### Functional
- ✅ 5-step wizard completes without errors
- ✅ AI research verifies companies and detects industry
- ✅ Industry-specific questions generate correctly
- ✅ System recommendations map to pain points
- ✅ Readiness scores are accurate and honest
- ✅ 3-phase roadmaps are realistic and actionable

### User Experience
- ✅ Feels consultative, not transactional
- ✅ AI thinking is transparent and builds trust
- ✅ Industry language feels natural
- ✅ Recommendations feel personalized
- ✅ Expectations are set realistically

### Technical
- ✅ Streaming responses work smoothly
- ✅ State persists across sessions
- ✅ 3-panel layout responsive on all devices
- ✅ Design system applied consistently
- ✅ No console errors or build warnings

---

## Constraints & Risks

### Constraints
- **AI API Limits:** Google Search grounding has rate limits
- **State Management:** localStorage only (no backend yet)
- **Design:** Must maintain premium aesthetic, no generic SaaS patterns

### Risks
- **AI Accuracy:** Industry detection or readiness assessment could be wrong
- **User Trust:** If AI makes obvious mistakes, trust is lost
- **Expectations:** Unrealistic roadmaps lead to failed implementations

### Mitigation
- Provide fallback content if AI fails
- Show AI reasoning so users can verify
- Conservative timelines and honest gap identification

---

## Future Enhancements

### Phase 2 (Not in Scope)
- Backend integration (Supabase)
- Multi-tenant support
- Client dashboard full implementation
- Task management system
- File uploads and document storage

### Phase 3 (Not in Scope)
- Real-time collaboration
- Advanced analytics
- Integration marketplace
- White-label options

---

## Implementation Notes

### Priority Order
1. **Wizard Flow:** Complete 5-step wizard with all AI integrations
2. **3-Panel Layout:** Ensure consistent layout across all screens
3. **Design System:** Apply colors, typography, components consistently
4. **State Management:** Implement localStorage persistence
5. **Dashboard Placeholders:** Create structure, full implementation later


### Testing Focus
- Wizard completion flow
- AI response accuracy
- State persistence
- Responsive design
- Error handling
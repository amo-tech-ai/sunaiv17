
# Client Dashboard Screen 1: Brief Tab — Implementation Prompt

**Progress Tracker:** Client Dashboard Screen 1 of 3 | Status: Planning Phase | Priority: P0 Critical  
**Estimated Implementation:** 8-10 days | Dependencies: Supabase Setup, Document Storage, Edge Functions  
**Completion Criteria:** Brief editing works, document upload functional, change tracking accurate, AI insights relevant

---

## Executive Summary

The Brief Tab is the primary interface for client brief management. This screen enables clients to review and edit the strategic brief, upload supporting documents, and track changes over time. The tab serves as the single source of truth for project understanding and requirements, with AI-powered insights that help clients refine their brief and understand document content.

**Core Value:** Clients have full control over their project brief with intelligent assistance. The AI extracts insights from uploaded documents, suggests improvements, and tracks changes transparently. This creates a collaborative experience where clients feel empowered and informed.

---

## Three-Panel Layout Architecture

### Left Panel (20% Width) — Project Summary

**Purpose:** Display project context and brief status.

**Content Structure:**
- Project summary (company name, industry, current phase)
- Brief status indicator (draft, in review, approved)
- Last updated timestamp
- Change history indicator (number of versions)
- Quick navigation to other tabs

**Design Principles:**
- Clear visual hierarchy showing project context
- Status indicators use color coding (draft=yellow, in review=blue, approved=green)
- Timestamp shows recency of updates
- Consistent styling with other dashboard tabs

**User Experience:**
- Users see project context at a glance
- Brief status is immediately clear
- Change history is easily accessible
- Navigation to other tabs is convenient

---

### Center Panel (50% Width) — Brief Editor & Documents

**Purpose:** Main work area for brief editing and document management.

**Content Structure:**
- **Brief Editor Section:**
  - Rich text editor with formatting options
  - Editable executive summary section
  - Editable project goals (bullet points)
  - Editable scope and requirements section
  - Editable success criteria
  - Auto-save functionality (saves every 30 seconds)
  - Manual save button (triggers notification to agency)
  - Word count indicator

- **Document Upload Section:**
  - Drag-and-drop file upload area
  - File list showing uploaded documents with metadata
  - Document categories (Briefs, Requirements, Assets, Reference)
  - Document preview (images, PDFs)
  - Document download functionality
  - Delete document option (with confirmation)
  - File type support (PDF, DOCX, XLSX, images, text files)
  - File size limit indicator (25MB per file)

- **Change Tracking:**
  - Version history (all previous brief versions)
  - Change highlighting (what changed between versions)
  - Compare versions option (side-by-side)
  - Change comments (client and agency comments on changes)
  - Timestamp and author tracking

**User Experience:**
- Rich text editor is intuitive and easy to use
- Document upload is drag-and-drop friendly
- Change tracking provides transparency
- Auto-save prevents data loss

---

### Right Panel (30% Width) — Intelligence & Activity

**Purpose:** AI-powered insights and activity feed.

**Content Structure:**
- **Intelligence Panel:**
  - Brief summary (AI-generated summary of current brief)
  - Change analysis (what changed in latest update)
  - Document insights (extracted from uploaded documents)
  - Recommendations (AI suggestions based on brief content)
  - Contextual help (how to use the brief editor)

- **Activity Feed:**
  - Recent brief updates (with timestamps)
  - Document uploads (with file names)
  - Agency comments (with author and timestamp)
  - Status changes (with timestamps)
  - Real-time updates via Supabase Realtime

**User Experience:**
- AI insights are relevant and actionable
- Activity feed provides transparency
- Real-time updates keep users informed
- Recommendations help improve brief quality

---

## Purpose & Strategic Intent

**Primary Purpose:** Provide clients with main hub for project brief management.

This screen enables clients to maintain control over their project brief while receiving intelligent assistance. The AI extracts insights from documents, suggests improvements, and tracks changes transparently. This creates a collaborative experience where clients feel empowered and informed.

**Strategic Intent:**
- Empower clients with full brief control
- Provide intelligent assistance through AI insights
- Build trust through transparent change tracking
- Enable collaboration through document sharing
- Create single source of truth for project requirements

**Business Impact:**
- Higher client satisfaction through control and transparency
- Better brief quality through AI suggestions
- Reduced miscommunication through clear change tracking
- Faster project setup through document insights

---

## Goals & Success Criteria

### Functional Goals

**Goal 1: Brief Management**
- Allow clients to review, edit, and save project brief
- Success metric: 95%+ of brief edits save successfully
- Verification method: User testing, error monitoring
- Edge cases: Concurrent edits, network failures, large documents

**Goal 2: Document Organization**
- Enable document upload, categorization, and management
- Success metric: 100% of supported file types upload successfully
- Verification method: File type testing, size limit testing
- Edge cases: Large files, unsupported formats, corrupted files

**Goal 3: Change Tracking**
- Track all brief changes with version history
- Success metric: 100% of changes are tracked accurately
- Verification method: Version comparison testing
- Edge cases: Rapid edits, concurrent changes, format changes

**Goal 4: Collaboration**
- Enable client-agency collaboration through comments
- Success metric: Comments are visible and functional
- Verification method: User testing, real-time update testing
- Edge cases: Multiple users, comment conflicts

**Goal 5: Context Building**
- Extract insights from uploaded documents automatically
- Success metric: 80%+ of document insights are relevant
- Verification method: User feedback, relevance testing
- Edge cases: Unreadable documents, non-text files, large documents

**Goal 6: Transparency**
- Show all changes, versions, and activity in one place
- Success metric: Users can access all history easily
- Verification method: User testing, navigation testing
- Edge cases: Many versions, long activity feeds

**Goal 7: AI Assistance**
- Provide AI-generated summaries and recommendations
- Success metric: 85%+ of AI insights are helpful
- Verification method: User feedback, relevance testing
- Edge cases: Empty briefs, very long briefs, technical content

---

## Real-World Examples & Applications

### Example 1: Fashion Brand Brief Management

**Scenario:** Luxe Threads updates their project brief and uploads brand guidelines.

**User Actions:**
- Client opens Brief Tab (default landing)
- Client reviews current brief content
- Client uploads "Spring 2025 Collection Lookbook" PDF
- Client edits "Project Goals" to add sustainability focus

**AI Processing:**
- Assistant Agent analyzes uploaded PDF
- Extracts color palette and key themes
- Generates document insights in right panel
- Suggests updating "Project Goals" to include sustainability

**AI Output:**
- Document insights: "PDF contains color palette (pastels, earth tones), sustainability messaging, seasonal themes"
- Recommendations: "Consider adding 'Sustainability Focus' to Project Goals based on lookbook content"
- Brief summary: Updated with new goals
- Change analysis: "Added sustainability goal to Project Goals section"

**User Experience:**
- Client sees immediate insights from uploaded document
- AI suggestions are relevant and helpful
- Client feels assisted, not replaced
- Changes are tracked transparently

---

### Example 2: Real Estate Agency Brief Update

**Scenario:** Urban Properties updates target audience in brief.

**User Actions:**
- Client opens Brief Tab
- Client edits "Target Audience" section in rich text editor
- Client adds "First-time commercial buyers" to audience list
- Client saves changes

**AI Processing:**
- Assistant Agent analyzes brief changes
- Generates updated brief summary
- Suggests refining "Lead Gen System" configuration
- Updates change analysis

**AI Output:**
- Brief summary: Updated with new target audience
- Recommendations: "Consider refining Lead Gen System configuration to match first-time buyer demographic"
- Change analysis: "Updated Target Audience to include first-time commercial buyers"
- Activity feed: Shows brief update with timestamp

**User Experience:**
- Client sees immediate AI response to changes
- Recommendations are contextual and helpful
- Change tracking is clear and transparent
- Client feels supported in brief refinement

---

## Industry Wireframe & UI/UX Layout

### Desktop Layout (1024px+)

**Left Panel:**
- Fixed width: 20% of viewport
- Sticky positioning: Remains visible during scroll
- Background: Light neutral (#FAF8F6)
- Content: Project summary, brief status, change history, navigation

**Center Panel:**
- Width: 50% of viewport
- Max-width: 900px for optimal readability
- Padding: 48px top, 32px sides, 48px bottom
- Content: Rich text editor, document upload area, change tracking
- Scrollable: Content area scrolls independently

**Right Panel:**
- Fixed width: 30% of viewport
- Sticky positioning: Remains visible during scroll
- Background: Dark neutral (#1A1A1A) for intelligence panel
- Content: AI insights, activity feed, recommendations

### Mobile Layout (768px and below)

**Layout Changes:**
- Left panel: Collapsed or minimal
- Center panel: Full width, reduced padding
- Right panel: Collapsible section or separate tab

**Touch Interactions:**
- Large tap targets for buttons
- Easy document upload via drag-and-drop or file picker
- Expandable sections for version history
- Swipe navigation between sections

---

## Gemini 3 Features & Tools

### Required Features

**Text Generation:**
- Purpose: Generate brief summaries and recommendations
- Implementation: Natural language generation based on brief content
- Output: Brief summaries, recommendations, contextual help
- Performance: Must complete within 3 seconds for good UX

**Function Calling:**
- Purpose: Trigger document analysis when files are uploaded
- Implementation: Call Edge Function to analyze documents
- Output: Document insights, extracted information
- Performance: Must complete within 10 seconds for document analysis

### Optional Features

**Streaming:**
- Purpose: Real-time brief summary generation
- Implementation: Stream text as it's generated
- Benefits: Perceived speed, engagement
- Performance: First chunk within 2 seconds

**RAG (Retrieval Augmented Generation):**
- Purpose: Search uploaded documents for context
- Implementation: Vector search through document embeddings
- Output: Relevant document excerpts for context
- Performance: Search completes within 2 seconds

### Model Selection

**Gemini 3 Flash:**
- Rationale: Fast response time critical for brief summaries
- Performance: Sub-2 second first token, complete in 3-5 seconds
- Cost: Lower cost enables frequent updates
- Quality: Sufficient for brief summaries and recommendations

---

## AI Agent: Assistant Agent

### Agent Profile

**Agent Type:** Assistant & Document Analysis Specialist  
**Model:** Gemini 3 Flash  
**Primary Responsibility:** Brief summary generation and document insights  
**Persona:** Helpful project assistant with document analysis capabilities

### Input Requirements

**Required Input:**
- Current brief content
- Uploaded documents (when available)
- Brief change history

**Context:**
- Project information (company, industry, phase)
- Previous brief versions
- Agency comments

### Processing Logic

**Step 1: Brief Analysis**
- Analyze current brief content
- Identify key sections and themes
- Extract important information

**Step 2: Document Analysis (if documents uploaded)**
- Extract text from uploaded documents
- Identify key themes and information
- Generate document insights

**Step 3: Change Analysis**
- Compare current brief to previous version
- Identify what changed
- Highlight significant changes

**Step 4: Recommendation Generation**
- Generate suggestions based on brief content
- Consider document insights
- Provide contextual recommendations

**Step 5: Summary Generation**
- Create brief summary
- Highlight key points
- Use natural language

### Output Structure

**Brief Summary:**
- AI-generated summary of current brief
- Key points highlighted
- Natural language format

**Change Analysis:**
- What changed in latest update
- Significant changes highlighted
- Change context provided

**Document Insights:**
- Extracted information from documents
- Key themes identified
- Relevant excerpts highlighted

**Recommendations:**
- AI suggestions based on brief content
- Contextual and actionable
- Natural language format

---

## Core Prompts & Edge Functions

### Core Prompt: Brief Summary Generation

**Purpose:** Generate comprehensive brief summary from current content.

**Prompt Structure:**
- System context: Role as helpful project assistant
- Task: Summarize brief content and highlight key points
- Input: Current brief content, project context
- Output format: Natural language summary
- Constraints: Must be accurate, concise, helpful

**Key Instructions:**
- Summarize brief content accurately
- Highlight key points and themes
- Use natural, helpful language
- Provide context when relevant
- Be concise but comprehensive

### Core Prompt: Document Analysis

**Purpose:** Extract insights from uploaded documents.

**Prompt Structure:**
- System context: Document analysis specialist
- Task: Extract key information and themes from documents
- Input: Document content, document type, project context
- Output format: Structured insights with key themes
- Constraints: Must be accurate, relevant, actionable

**Key Instructions:**
- Extract key information from documents
- Identify themes and patterns
- Provide relevant excerpts
- Connect document content to brief
- Be accurate and helpful

### Core Prompt: Change Analysis

**Purpose:** Analyze what changed in brief updates.

**Prompt Structure:**
- System context: Change tracking specialist
- Task: Compare brief versions and identify changes
- Input: Current brief, previous brief, change history
- Output format: Change analysis with highlights
- Constraints: Must be accurate, clear, helpful

**Key Instructions:**
- Compare brief versions accurately
- Identify significant changes
- Highlight what changed
- Provide change context
- Be clear and helpful

### Edge Function Architecture

**Function Name:** `analyze-document`

**Purpose:** Analyze uploaded documents and extract insights.

**Input:**
- Document file (PDF, DOCX, XLSX, images, text)
- Document type and metadata
- Project context

**Processing:**
- Extract text from document
- Analyze content for key themes
- Generate document insights
- Connect insights to brief content

**Output:**
- Document insights (key themes, information)
- Relevant excerpts
- Recommendations based on document content

**Error Handling:**
- Handle unsupported file types gracefully
- Provide fallback for unreadable documents
- Log errors for monitoring
- User-friendly error messages

**Performance:**
- Target: Complete within 10 seconds
- Document extraction: 3-5 seconds
- Analysis: 3-5 seconds
- Timeout: 30 seconds maximum

---

## Progress Summary

**Current Status:** Planning and documentation complete  
**Next Steps:** Implementation of Assistant Agent, document upload system, change tracking  
**Blockers:** None identified  
**Dependencies:** Supabase setup, document storage, Edge Functions  
**Estimated Completion:** 8-10 days from start of implementation

**Key Deliverables:**
- Assistant Agent | Rich text editor | Document upload/storage | Change tracking
- Document analysis Edge Function | AI insights | Real-time activity feed

**Success Metrics:**
- 95%+ brief edits save successfully | 100% file types upload | 100% changes tracked
- 80%+ document insights relevant | 85%+ AI insights helpful
- <3s summary generation | <10s document analysis


# System Diagrams & Visual Documentation

This document contains the visual architecture for the Sun AI Agency platform.

---

## 1. System Architecture (C4 Model)

### Context Diagram (Level 1)
Shows the system in relation to external entities.

```mermaid
C4Context
    title System Context Diagram - Sun AI Agency

    Person(customer, "Business Owner", "A user seeking AI automation strategies.")
    System(sunAI, "Sun AI Platform", "Generates strategies and manages execution.")
    
    System_Ext(google_search, "Google Search", "Verifies business existence & market trends.")
    System_Ext(gemini, "Gemini API", "LLM provider (Flash/Pro) for reasoning.")
    System_Ext(supabase, "Supabase", "Auth, Database, and Edge Runtime.")

    Rel(customer, sunAI, "Uses")
    Rel(sunAI, google_search, "Queries via Agent")
    Rel(sunAI, gemini, "Sends Prompts")
    Rel(sunAI, supabase, "Persists State")
```

### Container Diagram (Level 2)
Shows the high-level technology choices.

```mermaid
C4Container
    title Container Diagram - Application Architecture

    Person(user, "User", "Client or Agency Member")

    Container_Boundary(c1, "Sun AI Agency Application") {
        Container(web_app, "Web Application", "React, Vite, Tailwind", "Delivers the Wizard and Dashboard UI.")
        Container(edge_func, "Edge Functions", "Deno, TypeScript", "Hosts AI Agents (Analyst, Planner, etc.) securely.")
        ContainerDb(database, "Database", "PostgreSQL", "Stores user profiles, projects, and roadmaps.")
        Container(vector_store, "Vector Store", "pgvector", "Stores document embeddings for RAG.")
    }

    System_Ext(gemini_api, "Google Gemini 3", "Inference Engine")

    Rel(user, web_app, "Interacts via HTTPS")
    Rel(web_app, edge_func, "Invokes via RPC/Fetch")
    Rel(edge_func, gemini_api, "Generates Content")
    Rel(edge_func, database, "Reads/Writes Data")
    Rel(web_app, database, "Real-time subscriptions")
```

---

## 2. Agent Orchestration (Block Diagram)

Visualizes how the specific AI Agents interact with models and tools.

```mermaid
block-beta
    columns 3
    
    block:frontend
        UI["React Frontend"]
    end

    block:gateway
        API["Edge Function Gateway"]
    end

    block:agents
        Analyst["🕵️ Analyst<br>(Flash)"]
        Extractor["🔬 Extractor<br>(Flash)"]
        Optimizer["⚖️ Optimizer<br>(Flash)"]
        Scorer["💯 Scorer<br>(Flash)"]
        Planner["📅 Planner<br>(Pro + Thinking)"]
        Orchestrator["🎼 Orchestrator<br>(Flash)"]
    end

    block:tools
        Search(("Google Search"))
        Code(("Code Exec"))
        Schema(("JSON Schema"))
    end

    UI --> API
    API --> Analyst
    API --> Extractor
    API --> Optimizer
    API --> Scorer
    API --> Planner
    API --> Orchestrator

    Analyst --> Search
    Scorer --> Code
    Planner --> Schema
    Extractor --> Schema
```

---

## 3. Wizard Logic Flow (State Diagram)

Tracks the user's progression through the onboarding wizard.

```mermaid
stateDiagram-v2
    [*] --> Step1_Context
    
    state Step1_Context {
        [*] --> InputUrl
        InputUrl --> Verifying : onBlur
        Verifying --> Detected : Analyst Agent
        Detected --> [*]
    }

    Step1_Context --> Step2_Diagnostics : Continue
    
    state Step2_Diagnostics {
        [*] --> LoadPack
        LoadPack --> GenerateQs : Extractor Agent
        GenerateQs --> UserAnswers
        UserAnswers --> [*]
    }

    Step2_Diagnostics --> Step3_Systems : Continue

    state Step3_Systems {
        [*] --> RankSystems : Optimizer Agent
        RankSystems --> SelectCards
        SelectCards --> [*]
    }

    Step3_Systems --> Step4_Readiness : Continue

    state Step4_Readiness {
        [*] --> CheckList
        CheckList --> CalcScore : Scorer Agent
        CalcScore --> [*]
    }

    Step4_Readiness --> Step5_Plan : Continue

    state Step5_Plan {
        [*] --> Thinking : Planner Agent
        Thinking --> Sequencing
        Sequencing --> RenderTimeline
        RenderTimeline --> [*]
    }

    Step5_Plan --> Dashboard : Launch Project
    Dashboard --> [*]
```

---

## 4. Roadmap Generation (Sequence Diagram)

Detailed view of the most complex interaction: Step 5 "The Planner".

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant UI as Frontend
    participant API as Edge Function
    participant Planner as Planner Agent
    participant Gemini as Gemini 3 Pro

    User->>UI: Clicks "Generate Plan"
    UI->>UI: Bundles AppState (Context, Pain Points, Systems, Readiness)
    UI->>API: POST /generate-roadmap
    
    API->>Planner: Initialize Agent
    Planner->>Gemini: Send Prompt + Context
    note right of Gemini: Thinking Budget: 2048 tokens
    
    loop Reasoning Process
        Gemini->>Gemini: Analyze Dependencies
        Gemini->>Gemini: Check Readiness Gaps
        Gemini->>Gemini: Sequence Phases (1, 2, 3)
    end

    Gemini-->>Planner: Return JSON (Structured Output)
    Planner-->>API: Validate Schema
    API-->>UI: Return Roadmap Data
    UI->>User: Render Vertical Timeline
```

---

## 5. Database Schema (Entity Relationship Diagram)

Represents the Supabase PostgreSQL structure.

```mermaid
erDiagram
    PROFILES ||--o{ PROJECTS : owns
    ORGANIZATIONS ||--|{ TEAM_MEMBERS : contains
    PROJECTS ||--o{ WIZARD_SESSIONS : tracks
    PROJECTS ||--o{ ROADMAPS : has
    PROJECTS ||--o{ INVOICES : bills
    
    ROADMAPS ||--|{ ROADMAP_PHASES : divides_into
    ROADMAP_PHASES ||--|{ TASKS : contains
    ROADMAP_PHASES ||--|{ DELIVERABLES : produces
    
    CLIENTS ||--o{ PROJECTS : requests

    PROFILES {
        uuid id PK
        string email
        string full_name
        string role
    }

    PROJECTS {
        uuid id PK
        uuid client_id FK
        string status
        jsonb wizard_data
    }

    TASKS {
        uuid id PK
        uuid phase_id FK
        string title
        string status
        string priority
        uuid assigned_to FK
    }

    ROADMAPS {
        uuid id PK
        uuid project_id FK
        date created_at
        jsonb ai_metadata
    }
```

---

## 6. Frontend Components (Class Diagram)

Conceptual structure of the React codebase and state management.

```mermaid
classDiagram
    class App {
        +AppState state
        +nextStep()
        +updateData()
    }

    class WizardLayout {
        +LeftPanel
        +CenterPanel
        +RightPanel
    }

    class Step1Context {
        +BusinessData data
        +AnalystAgent agent
        +handleUrlBlur()
    }

    class Step5Plan {
        +Roadmap roadmap
        +PlannerAgent agent
        +streamThinking()
    }

    class Dashboard {
        +activeTab string
        +renderContent()
    }

    class AppState {
        +step number
        +completed boolean
        +data UserData
        +aiState AIState
    }

    class AIState {
        +questions Question[]
        +recommendations System[]
        +readiness Analysis
        +roadmap Phase[]
    }

    App *-- AppState
    App *-- WizardLayout
    WizardLayout *-- Step1Context
    WizardLayout *-- Step5Plan
    App --> Dashboard : onComplete
```

---

## 7. Requirement Diagram

Mapping functional requirements to the implementing Agents.

```mermaid
requirementDiagram

    requirement Verify_Business {
        id: 1
        text: "The system must verify the business URL exists and detect industry."
        type: Functional
        risk: Medium
        verifymethod: Test
    }

    element Analyst_Agent {
        type: Agent
    }

    requirement Generate_Strategy {
        id: 2
        text: "The system must create a 3-phase roadmap based on user constraints."
        type: Functional
        risk: High
        verifymethod: Inspection
    }

    element Planner_Agent {
        type: Agent
    }

    requirement Score_Readiness {
        id: 3
        text: "The system must mathematically calculate a readiness score."
        type: Functional
        risk: Low
        verifymethod: Analysis
    }

    element Scorer_Agent {
        type: Agent
    }

    Analyst_Agent - satisfies -> Verify_Business
    Planner_Agent - satisfies -> Generate_Strategy
    Scorer_Agent - satisfies -> Score_Readiness
```

---

## 8. User Journey Map

The emotional and functional path of the user.

```mermaid
journey
    title Sun AI Agency - Client Onboarding Journey
    section Discovery
      Land on Home Page: 5: Visitor
      Read Value Prop: 4: Visitor
      Click "Start Audit": 5: Visitor
    section The Wizard (Discovery)
      Enter URL (Step 1): 5: User
      See AI "Verification": 6: User (Impressed)
      Answer Pain Points (Step 2): 4: User (Reflecting)
    section The Solution (Aha Moment)
      See System Recs (Step 3): 5: User (Hopeful)
      See Readiness Score (Step 4): 3: User (Concerned/Validated)
      View 30-Day Plan (Step 5): 7: User (Excited)
    section Execution
      Enter Dashboard: 6: Client
      See Tasks Generated: 6: Client
      Upload First Brief: 5: Client
```

---

## 9. ZenUML (Analyst Logic)

Simplified logic flow for the first step of the application.

```zenuml
// Step 1: Analyst Agent Logic
User->App: Enter URL
if (URL is valid) {
    App->Analyst: analyze(url)
    Analyst->GoogleSearch: query(brand)
    GoogleSearch->Analyst: results
    Analyst->App: stream(intelligence)
    Analyst->App: return(industry_enum)
    App->User: update_ui(industry)
} else {
    App->User: show_error
}
```

---

## 10. Deployment Architecture

Cloud infrastructure view.

```mermaid
graph TD
    subgraph "Client Side"
        Browser[User Browser]
    end

    subgraph "Vercel (Frontend)"
        Static[Static Assets]
        Vite[Vite/React App]
    end

    subgraph "Supabase (Backend)"
        Auth[GoTrue Auth]
        DB[(PostgreSQL)]
        Edge[Edge Functions (Deno)]
    end

    subgraph "Google Cloud"
        Gemini[Gemini 1.5/3.0 API]
        Search[Google Search API]
    end

    Browser -->|HTTPS| Vite
    Browser -->|Auth| Auth
    Browser -->|Data/RPC| Edge
    
    Edge -->|Query| DB
    Edge -->|Prompt| Gemini
    Edge -->|Grounding| Search
```

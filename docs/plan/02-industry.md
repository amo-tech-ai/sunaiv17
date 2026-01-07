
# Sun AI Agency — Industry Pack System Plan

**Date:** January 6, 2025  
**Status:** Strategic Industry Plan  
**Purpose:** Define industry-specific AI consulting through modular Industry Pack System

---

## Executive Summary

Sun AI Agency delivers **industry-specific AI consulting** through a modular **Industry Pack System**. Each industry pack customizes the core wizard flow with vertical-specific prompts, diagnostics, AI system names, business language, KPIs, and scoring logic.

**Core Principle:** Core Wizard Flow + Industry Pack Customization

**Target Industries:** Fashion E-commerce, Real Estate (Rentals + Buying), Tourism (Tours + Experiences), Events (Planning + Management + Marketing), with expansion to SaaS and Healthcare in future phases.

**Outcome:** Each industry receives customized AI recommendations that feel like they were written by a senior operator in that specific vertical, not a generic AI chatbot.

---

## Industry Pack Architecture

### Core + Pack Model

**Core Components (Shared Across All Industries):**
- Five-step wizard flow structure
- Database schema (wizard sessions, answers, assessments, roadmaps)
- Authentication and authorization
- Rate limiting and security policies
- Three-panel layout system

**Industry Pack Components (Customized Per Vertical):**
- Research prompts and search query templates
- Diagnostic question templates and problem examples
- AI system names and descriptions
- Readiness assessment criteria and risk factors
- Roadmap phase templates
- Industry-specific KPIs and ROI calculations
- Business language and terminology

---

## Target Industries

### 1. Fashion E-commerce

**Business Types:**
- Direct-to-consumer (DTC) fashion brands
- Boutique retailers
- Luxury fashion houses
- Wholesale-hybrid models

**Common Channels:**
- Instagram, TikTok, Meta Ads
- Google Shopping, Email/SMS marketing
- Shopify, WooCommerce, custom platforms

**Typical Business Problems:**
- High product views but low add-to-cart conversion
- Returns driven by sizing confusion
- Creative fatigue on Meta and TikTok
- Manual catalog updates slow seasonal drops
- Inventory forecasting done manually
- Product descriptions written individually

**Key AI Systems:**
- PDP Conversion Optimizer (product page optimization)
- Fit & Size Intelligence Agent (reduce returns)
- UGC Content Supply Chain (user-generated content automation)
- Drop Launch Orchestrator (seasonal collection automation)
- Catalog Enrichment Engine (product data automation)
- Inventory Prediction System (demand forecasting)
- Returns Reduction Engine (fit guidance automation)
- Social Media Content Automator (content generation)

**Industry KPIs:**
- Conversion rate (product views to purchases)
- Average order value (AOV)
- Return rate (sizing-related returns)
- CAC payback period (customer acquisition cost)
- Sell-through rate (inventory velocity)
- Content production time (creative asset creation)

---

### 2. Real Estate (Rentals + Buying)

**Business Types:**
- Rental brokers and property managers
- Buyer agents and real estate teams
- Property marketplaces
- Landlords with multiple properties

**Common Channels:**
- Google Search and Maps, Instagram/TikTok
- WhatsApp (dominant in many markets)
- Email/SMS, Listing portals (Zillow, Realtor.com)
- Google Business Profile

**Typical Business Problems:**
- Leads come in but response time is too slow (WhatsApp/calls missed)
- Too many unqualified tours (wrong budget, wrong move-in date)
- Listings lack strong neighborhood storytelling
- No automated follow-up after tours
- Buying clients stuck because financing/pre-approval is unclear
- Property matching done manually
- Commission pipeline not visible

**Key AI Systems:**
- WhatsApp Lead Concierge (instant lead response)
- Tour Scheduling Orchestrator (automated booking)
- Qualification & Budget Filter Agent (pre-qualification)
- Neighborhood Storytelling Engine (listing optimization)
- Listing Enrichment System (property data automation)
- Follow-Up Automation Engine (post-tour nurture)
- Property Matching Intelligence (client-property matching)
- Commission Pipeline Tracker (sales visibility)

**Industry KPIs:**
- Lead response time (minutes to first contact)
- Lead-to-tour conversion rate
- Tour-to-close rate (qualified tours to signed lease/purchase)
- Commission per agent
- Pipeline visibility (deals in progress)
- Listing update time (time to publish new listings)

---

### 3. Tourism (Tours + Experiences)

**Business Types:**
- Tour operators (day trips, multi-day tours)
- Experience providers (food tours, nightlife, culture, adventure)
- Destination management companies (DMCs)
- Travel agencies focused on local experiences
- Concierge and WhatsApp-first booking businesses

**Common Channels:**
- Google Search and Maps, Instagram/TikTok
- WhatsApp (dominant booking channel in many markets)
- TripAdvisor, Booking.com, Viator, GetYourGuide
- Email marketing

**Typical Business Problems:**
- WhatsApp inquiries don't convert because replies are slow or inconsistent
- Itinerary pages unclear (what's included, pickup, timing, language)
- Reviews exist but aren't leveraged to drive bookings
- Seasonality causes revenue dips with no offers/calendar strategy
- Upsells missing (private upgrade, add-ons, airport transfer, photo package)
- Manual booking confirmations and itinerary updates
- No automated follow-up after tours

**Key AI Systems:**
- WhatsApp Booking Concierge (instant booking assistant)
- Itinerary Builder & Upsell Engine (customized tour creation)
- Review-to-Reputation Flywheel (automated review collection)
- Google Maps Visibility Optimizer (local SEO and maps optimization)
- Dynamic Pricing & Availability Advisor (seasonal pricing optimization)
- Day-Of Ops Runbook Generator (operational checklists)
- Follow-Up & Referral Automations (post-tour nurture)

**Industry KPIs:**
- Inquiry response time (minutes to first reply)
- Inquiry-to-booking conversion rate
- Average booking value (ABV)
- Review rating and review volume growth
- Repeat/referral rate
- Cancellation rate

---

### 4. Events (Planning + Management + Marketing)

**Business Types:**
- Event planners and producers
- Venues
- Conference and summit organizers
- Nightlife, concerts, festivals
- Corporate events
- Community events
- Sponsors and brand activations
- Ticketing-driven event businesses

**Common Channels:**
- Instagram/TikTok, Email marketing
- Google Search and Maps
- Ticketing platforms (Eventbrite, Ticketmaster, custom)
- Facebook Events

**Typical Business Problems:**
- Ticket conversion is low (pricing tiers unclear, weak urgency, landing page weak)
- Sponsorship pipeline is inconsistent (no packages, no outreach system)
- Marketing assets are slow (no content calendar, no templates, no reels scripts)
- Vendor coordination is chaotic (no run-of-show, late confirmations)
- Venue constraints discovered too late (capacity, permits, noise rules)
- Post-event follow-up missing (no retention or next-event conversion)
- No CRM for sponsors, VIPs, or exhibitors

**Key AI Systems:**
- Ticket Funnel Optimizer (conversion optimization)
- Dynamic Pricing & Tier Architect (revenue optimization)
- Sponsor Package Generator (sponsorship sales)
- Sponsor Outreach Copilot (sponsor prospecting)
- Venue Fit & Capacity Planner (venue selection automation)
- Run-of-Show Orchestrator (operational timeline automation)
- Vendor Coordination Command Center (vendor management)
- Event Content Supply Chain (marketing asset automation)
- Post-Event Retention Automations (attendee nurture)
- Exhibitor Sales Pipeline Agent (exhibitor sales CRM)

**Industry KPIs:**
- Ticket conversion rate
- Revenue per attendee (RPA)
- Sponsor pipeline velocity (contacts to meetings to closed)
- Cost per acquisition (CPA)
- Show-up rate and attendance rate
- Net Promoter Score (NPS) and satisfaction
- On-time vendor confirmations
- Time-to-publish content assets

---

## Use Cases

### Use Case 1: Fashion Brand Onboarding

**Scenario:** A luxury DTC fashion brand wants to understand how AI can improve their e-commerce operations.

**Step 1: Business Context**
- Company enters name, website URL, and description
- AI uses Google Search Grounding to verify brand existence and positioning
- Deep Search analyzes competitors, market trends, and brand positioning
- URL Context Tool analyzes website for product pages, pricing, conversion elements
- Output: "Luxe Threads operates a premium DTC model with strong brand presence. Your Shopify storefront is well-designed, but customer data collection is manual."

**Step 2: Industry Diagnostics**
- Fashion pack loads automatically based on detected industry
- Four diagnostic questions generated:
  - Sales: "What's blocking your revenue growth right now?" (Options: High views/low cart, sizing confusion, inventory issues)
  - Content: "Where is content production slowing you down?" (Options: Creative fatigue, manual descriptions, UGC sourcing)
  - Speed: "What operational task takes too long?" (Options: Catalog updates, inventory forecasting, returns processing)
  - Priority: "What's your highest-priority goal this quarter?" (Options: Increase conversion, reduce returns, scale content)
- AI systems mapped: "PDP Conversion Optimizer", "Fit & Size Intelligence Agent", "UGC Content Supply Chain"

**Step 3: System Selection**
- User selects problems: "High views/low cart" and "Sizing confusion"
- AI recommends: "PDP Conversion Optimizer" and "Fit & Size Intelligence Agent"
- User selects both systems
- ROI projections shown: "Expected 15% conversion increase, 30% return rate reduction"

**Step 4: Readiness Assessment**
- Readiness score calculated: 72/100
- Data readiness: Product data quality good, customer email lists need work
- Infrastructure: Shopify API access confirmed, webhook capabilities ready
- Culture: Team comfortable with automated content, hesitant about AI-generated descriptions
- Quick wins: Implement fit guide immediately, optimize top 10 product pages

**Step 5: Strategic Roadmap**
- Phase 1 (Days 1-30): Product Data + PDP Foundation
  - Consolidate product data
  - Optimize top 20 product pages
  - Implement fit guide
- Phase 2 (Days 31-60): Conversion + Content Systems
  - Deploy PDP Conversion Optimizer
  - Launch Fit & Size Intelligence Agent
  - Set up UGC Content Supply Chain
- Phase 3 (Days 61-90): Automation + Retention
  - Predictive inventory system
  - Personalization engine
  - Retention automation
- KPIs tracked: Conversion rate, AOV, return rate, CAC payback

---

### Use Case 2: Real Estate Brokerage

**Scenario:** A real estate brokerage managing 200+ properties wants to automate lead response and qualification.

**Step 1: Business Context**
- Company enters name, website URL, service area
- AI researches: "Urban Properties real estate", "Urban Properties listings", "commercial real estate CRM"
- URL Context analyzes property listings, lead capture forms, response time signals
- Deep Search cross-references market position, competitor analysis, industry trends
- Output: "Urban Properties manages 200+ commercial properties with manual listing updates. Your website shows strong SEO performance, but lead qualification happens via email chains."

**Step 2: Industry Diagnostics**
- Real Estate pack loads automatically
- Four diagnostic questions:
  - Sales: "What's blocking your lead conversion?" (Options: Slow response time, unqualified tours, weak follow-up)
  - Content: "Where are listings falling short?" (Options: Weak neighborhood stories, poor photos, unclear details)
  - Speed: "What takes too long in your process?" (Options: Tour scheduling, lead qualification, listing updates)
  - Priority: "What's your biggest challenge?" (Options: Finding leads, closing deals, property management)
- AI systems mapped: "WhatsApp Lead Concierge", "Tour Scheduling Orchestrator", "Qualification & Budget Filter Agent"

**Step 3: System Selection**
- User selects: "Slow response time" and "Unqualified tours"
- AI recommends: "WhatsApp Lead Concierge" and "Qualification & Budget Filter Agent"
- ROI projections: "Expected 40% faster response time, 50% reduction in unqualified tours"

**Step 4: Readiness Assessment**
- Readiness score: 68/100
- Data readiness: Lead data in email, no centralized CRM
- Infrastructure: WhatsApp Business API needed, CRM integration required
- Culture: Team open to automation, some resistance to AI qualification
- Quick wins: Set up automated WhatsApp replies, create qualification form

**Step 5: Strategic Roadmap**
- Phase 1 (Days 1-30): Lead Capture + Response Foundation
  - Set up WhatsApp Business API
  - Integrate CRM system
  - Deploy automated lead responses
- Phase 2 (Days 31-60): Qualification + Automation
  - Launch Qualification & Budget Filter Agent
  - Deploy Tour Scheduling Orchestrator
  - Set up follow-up automations
- Phase 3 (Days 61-90): Content + Intelligence
  - Neighborhood Storytelling Engine
  - Listing Enrichment System
  - Commission Pipeline Tracker
- KPIs tracked: Response time, lead-to-tour rate, tour-to-close rate, commission per agent

---

### Use Case 3: Tour Operator

**Scenario:** A WhatsApp-first tour operator wants to improve booking conversion and reduce manual inquiry handling.

**Step 1: Business Context**
- Company enters name, destination, booking website
- AI researches: "Medellin Food Tours", "Colombia tour operator reviews", "WhatsApp tour booking"
- URL Context analyzes booking flow, itinerary pages, pricing clarity
- Deep Search analyzes competitor positioning, review strategies, OTA presence
- Output: "Medellin Food Tours operates a WhatsApp-first booking model with strong local reviews. Your website has clear itineraries, but inquiry response time varies significantly."

**Step 2: Industry Diagnostics**
- Tourism pack loads automatically
- Four diagnostic questions:
  - Sales: "What's blocking booking conversion?" (Options: Slow WhatsApp replies, unclear itineraries, missing upsells)
  - Content: "Where does content fall short?" (Options: Weak reviews strategy, unclear pickup details, poor OTA listings)
  - Speed: "What operational task takes too long?" (Options: Booking confirmations, itinerary updates, review requests)
  - Priority: "What's your biggest operational challenge?" (Options: Inquiry management, seasonality swings, review generation)
- AI systems mapped: "WhatsApp Booking Concierge", "Itinerary Builder & Upsell Engine", "Review-to-Reputation Flywheel"

**Step 3: System Selection**
- User selects: "Slow WhatsApp replies" and "Unclear itineraries"
- AI recommends: "WhatsApp Booking Concierge" and "Itinerary Builder & Upsell Engine"
- ROI projections: "Expected 60% faster response time, 25% increase in booking value through upsells"

**Step 4: Readiness Assessment**
- Readiness score: 75/100
- Data readiness: Booking data in WhatsApp chats, no centralized system
- Infrastructure: WhatsApp Business API ready, booking system integration needed
- Culture: Team highly receptive to automation, understands importance of speed
- Quick wins: Set up automated WhatsApp replies, create itinerary templates

**Step 5: Strategic Roadmap**
- Phase 1 (Days 1-30): Booking Foundation
  - Deploy WhatsApp Booking Concierge
  - Integrate booking system
  - Set up automated confirmations
- Phase 2 (Days 31-60): Conversion + Content
  - Launch Itinerary Builder & Upsell Engine
  - Deploy Review-to-Reputation Flywheel
  - Optimize Google Maps presence
- Phase 3 (Days 61-90): Automation + Retention
  - Dynamic Pricing Advisor
  - Day-Of Ops Runbook Generator
  - Follow-Up & Referral Automations
- KPIs tracked: Response time, inquiry-to-booking rate, ABV, review rating and volume

---

### Use Case 4: Event Production Company

**Scenario:** An event production company wants to streamline ticket sales, sponsor acquisition, and vendor coordination.

**Step 1: Business Context**
- Company enters name, event type, ticketing platform
- AI researches: "Tech Summit 2025", "conference event production", "sponsor acquisition strategies"
- URL Context analyzes ticketing pages, sponsor packages, event landing pages
- Deep Search analyzes competitor events, sponsor rates, vendor market
- Output: "Tech Summit operates a B2B conference model with strong speaker lineup. Your ticketing conversion is below industry average, and sponsor pipeline lacks systematic outreach."

**Step 2: Industry Diagnostics**
- Events pack loads automatically
- Four diagnostic questions:
  - Sales: "What's blocking revenue growth?" (Options: Low ticket conversion, weak sponsor pipeline, missing upsells)
  - Content: "Where does marketing fall short?" (Options: Slow content production, weak email campaigns, poor social presence)
  - Speed: "What operational task takes too long?" (Options: Vendor coordination, sponsor outreach, content creation)
  - Priority: "What's your highest-priority goal?" (Options: Increase ticket sales, close more sponsors, improve operations)
- AI systems mapped: "Ticket Funnel Optimizer", "Sponsor Package Generator", "Run-of-Show Orchestrator"

**Step 3: System Selection**
- User selects: "Low ticket conversion" and "Weak sponsor pipeline"
- AI recommends: "Ticket Funnel Optimizer" and "Sponsor Package Generator"
- ROI projections: "Expected 30% ticket conversion increase, 40% sponsor pipeline velocity improvement"

**Step 4: Readiness Assessment**
- Readiness score: 65/100
- Data readiness: Ticketing data available, sponsor contacts in email
- Infrastructure: Ticketing platform API ready, CRM integration needed
- Culture: Team open to automation, sponsor outreach currently manual
- Quick wins: Optimize ticket landing page, create sponsor package templates

**Step 5: Strategic Roadmap**
- Phase 1 (Days 1-30): Offer + Ticket Foundation
  - Deploy Ticket Funnel Optimizer
  - Create Dynamic Pricing & Tier Architect
  - Optimize landing pages
- Phase 2 (Days 31-60): Sponsorship + Content
  - Launch Sponsor Package Generator
  - Deploy Sponsor Outreach Copilot
  - Set up Event Content Supply Chain
- Phase 3 (Days 61-90): Operations + Retention
  - Run-of-Show Orchestrator
  - Vendor Coordination Command Center
  - Post-Event Retention Automations
- KPIs tracked: Ticket conversion rate, RPA, sponsor pipeline velocity, show-up rate

---

## Real-World Examples

### Example 1: Luxury Fashion Brand (Fashion Pack)

**Company:** Luxe Threads — Premium DTC fashion brand selling $200-$500 apparel

**Step 1 Research Output:**
- Detected Model: "Premium DTC Fashion Brand"
- Digital Maturity: Level 3 (Automated flows, UGC content)
- Primary Lever: "High-Margin Seasonal Drops"
- Observations:
  - Strong brand presence on Instagram and TikTok
  - Product pages lack social proof (no UGC gallery)
  - Size guide is generic, not personalized
  - Returns are 28% (industry average: 18%)
  - Creative team spends 20 hours/week on social content

**Step 2 Diagnostic Output:**
- Sales Question: "What's blocking your revenue growth right now?"
- Problems Identified:
  - High product views (45% traffic) but low add-to-cart (8% conversion)
  - Returns driven by sizing confusion (65% of returns cite fit issues)
  - Creative fatigue on Meta and TikTok (content production slowing)
- AI Systems Recommended:
  - PDP Conversion Optimizer (addresses low conversion)
  - Fit & Size Intelligence Agent (addresses returns)
  - UGC Content Supply Chain (addresses creative fatigue)

**Step 3 System Selection:**
- User selects: PDP Conversion Optimizer and Fit & Size Intelligence Agent
- ROI Projections: 15% conversion increase ($450K annual revenue), 30% return rate reduction ($120K annual savings)

**Step 4 Readiness Score:**
- Overall: 72/100
- Data: 80/100 (Product data quality excellent)
- Infrastructure: 70/100 (Shopify API access ready, webhooks configured)
- Culture: 65/100 (Team comfortable with automation, hesitant on AI descriptions)

**Step 5 Roadmap:**
- Phase 1: Product Data + PDP Foundation (30 days)
  - Consolidate product data
  - Optimize top 20 product pages
  - Implement personalized fit guide
- Phase 2: Conversion + Content Systems (30 days)
  - Deploy PDP Conversion Optimizer
  - Launch Fit & Size Intelligence Agent
- Phase 3: Automation + Retention (30 days)
  - Predictive inventory system
  - Personalization engine

---

### Example 2: Urban Property Management (Real Estate Pack)

**Company:** Urban Properties — Commercial property management with 200+ units

**Step 1 Research Output:**
- Detected Model: "Commercial Property Management Company"
- Digital Maturity: Level 2 (Basic website, manual processes)
- Primary Lever: "High-Intent Google Leads"
- Observations:
  - Strong Google Business Profile with 4.8 stars
  - Website shows properties but lead forms are basic
  - No automated response system (leads answered manually)
  - Average response time: 4 hours (industry average: 15 minutes)
  - 60% of leads never receive a follow-up

**Step 2 Diagnostic Output:**
- Sales Question: "What's blocking your lead conversion?"
- Problems Identified:
  - Leads come in but response time is too slow (WhatsApp/calls missed)
  - Too many unqualified tours (wrong budget, wrong move-in date)
  - No automated follow-up after tours
- AI Systems Recommended:
  - WhatsApp Lead Concierge (addresses slow response)
  - Qualification & Budget Filter Agent (addresses unqualified tours)
  - Follow-Up Automation Engine (addresses missing follow-up)

**Step 3 System Selection:**
- User selects: WhatsApp Lead Concierge and Qualification & Budget Filter Agent
- ROI Projections: 40% faster response time (3x more qualified leads), 50% reduction in unqualified tours ($200K annual time savings)

**Step 4 Readiness Score:**
- Overall: 68/100
- Data: 60/100 (Lead data in email, no centralized CRM)
- Infrastructure: 70/100 (WhatsApp Business API available, CRM integration needed)
- Culture: 75/100 (Team open to automation, understands importance of speed)

**Step 5 Roadmap:**
- Phase 1: Lead Capture + Response Foundation (30 days)
  - Set up WhatsApp Business API
  - Integrate CRM system
  - Deploy automated lead responses
- Phase 2: Qualification + Automation (30 days)
  - Launch Qualification & Budget Filter Agent
  - Deploy Tour Scheduling Orchestrator
- Phase 3: Content + Intelligence (30 days)
  - Neighborhood Storytelling Engine
  - Commission Pipeline Tracker

---

## Gemini 3 Features & Tools Strategy

### Core Features (Required for All Industries)

**1. Google Search Grounding**
- **Purpose:** Verify business existence, research industry trends, analyze competitors
- **Usage:** Step 1 (Business Context)
- **Implementation:** Multi-query parallel searches with result synthesis
- **Industry Customization:** Each pack provides industry-specific search query templates

**2. Structured Outputs (JSON Schema)**
- **Purpose:** Guarantee valid, structured responses for diagnostic questions and system recommendations
- **Usage:** Steps 2-5 (Diagnostics, Systems, Readiness, Roadmap)
- **Implementation:** Industry-specific schemas with enum constraints (system names, KPIs)
- **Industry Customization:** Schemas constrained to industry pack values

**3. Thinking Mode (Extended Reasoning)**
- **Purpose:** Deep reasoning for complex strategic decisions
- **Usage:** Steps 2, 4, 5 (Diagnostics, Readiness, Roadmap)
- **Implementation:** Thinking budgets (4096 tokens for complex reasoning, 1024 for faster decisions)
- **Industry Customization:** Industry context provided to thinking process

**4. Streaming**
- **Purpose:** Real-time progressive intelligence updates in right panel
- **Usage:** Step 1 (Research), Step 5 (Roadmap generation), Dashboard Intelligence
- **Implementation:** Structured streaming with JSON chunks (text, citations, observations)
- **Industry Customization:** Industry-specific narrative templates

### Advanced Features (Optional Enhancement)

**5. Deep Search**
- **Purpose:** Multi-layered research combining Google Search, URL Context, and cross-referencing
- **Usage:** Step 1 (Enhanced research)
- **Implementation:** Layer 1 (Google Search), Layer 2 (URL Context), Layer 3 (Cross-reference), Layer 4 (Industry insights)
- **Industry Customization:** Industry-specific source prioritization

**6. URL Context Tool**
- **Purpose:** Analyze specific URLs (company website, competitor sites, industry reports)
- **Usage:** Step 1 (Website analysis)
- **Implementation:** Extract structured data from web pages, combine with Google Search
- **Industry Customization:** Industry-specific analysis focus (product pages for fashion, listings for real estate)

**7. Function Calling**
- **Purpose:** Trigger automations and workflows
- **Usage:** Dashboard task execution (Phase 2+)
- **Implementation:** Invoke Edge Functions, trigger automations
- **Industry Customization:** Industry-specific automation workflows

**8. Interactions API**
- **Purpose:** Chat persistence and context management
- **Usage:** Global Assistant Agent (Phase 2+)
- **Implementation:** Store conversation history, maintain context across sessions
- **Industry Customization:** Industry-specific conversation context

**9. Code Execution**
- **Purpose:** Mathematical calculations for scoring and ROI projections
- **Usage:** Scorer Agent, Optimizer Agent
- **Implementation:** Python calculations for complexity scores, ROI projections
- **Industry Customization:** Industry-specific calculation formulas

**10. Retrieval Augmented Generation (RAG)**
- **Purpose:** Search internal documents and knowledge base
- **Usage:** Future feature for document search (Phase 3)
- **Implementation:** pgvector for document search
- **Industry Customization:** Industry-specific knowledge bases

---

## AI Agent Types

### Core Agents (Required for Wizard)

**1. Analyst Agent (Research)**
- **Model:** Gemini 3 Flash
- **Purpose:** Business verification and intelligence gathering
- **Used In:** Step 1 (Business Context)
- **Tools:** Google Search Grounding, Deep Search (optional), URL Context (optional)
- **Industry Customization:** Industry-specific search queries and analysis focus

**2. Extractor Agent (Consultant)**
- **Model:** Gemini 3 Flash → Pro (for complex reasoning)
- **Purpose:** Generate industry-specific diagnostic questions
- **Used In:** Step 2 (Industry Diagnostics)
- **Tools:** Structured Outputs, Thinking Mode (4096 tokens), Industry Pack
- **Industry Customization:** Industry-specific question templates, problems, and AI system mappings

**3. Optimizer Agent (Architect)**
- **Model:** Gemini 3 Flash
- **Purpose:** Recommend AI systems based on business problems
- **Used In:** Step 3 (System Selection)
- **Tools:** Structured Outputs, Thinking Mode (1024 tokens), Industry Pack
- **Industry Customization:** System names constrained to industry pack

**4. Scorer Agent (Analyst)**
- **Model:** Gemini 3 Flash/Pro
- **Purpose:** Calculate readiness scores and identify gaps
- **Used In:** Step 4 (Readiness Assessment)
- **Tools:** Structured Outputs, Thinking Mode (4096 tokens), Code Execution
- **Industry Customization:** Industry-specific readiness criteria and risk factors

**5. Planner Agent (Strategic)**
- **Model:** Gemini 3 Pro
- **Purpose:** Generate three-phase strategic roadmaps
- **Used In:** Step 5 (Strategy & Phases)
- **Tools:** Structured Outputs, Thinking Mode (4096 tokens), Streaming (optional), Industry Pack
- **Industry Customization:** Industry-specific phase templates, KPIs, and ROI calculations

### Advanced Agents (Phase 2+ Dashboard Features)

**6. Orchestrator Agent (Execution)**
- **Model:** Gemini 3 Pro
- **Purpose:** Break down roadmap phases into granular tasks
- **Used In:** Dashboard Tasks Tab
- **Tools:** Structured Outputs, Function Calling
- **Industry Customization:** Industry-specific task templates

**7. Market Analyst Agent (Intelligence)**
- **Model:** Gemini 3 Flash
- **Purpose:** Provide market intelligence and competitive analysis
- **Used In:** Dashboard Overview (Market Pulse)
- **Tools:** Google Search Grounding, Streaming
- **Industry Customization:** Industry-specific news sources and trend analysis

**8. Scenario Planner Agent (What-If Analysis)**
- **Model:** Gemini 3 Pro
- **Purpose:** Generate alternative roadmap scenarios
- **Used In:** Dashboard Roadmap Tab (Future feature)
- **Tools:** Thinking Mode (4096 tokens), Structured Outputs
- **Industry Customization:** Industry-specific scenario templates

**9. Action Agent (Task Execution)**
- **Model:** Gemini 3 Flash
- **Purpose:** Execute specific task steps
- **Used In:** Dashboard Tasks (AI Action buttons)
- **Tools:** Function Calling, Text Generation
- **Industry Customization:** Industry-specific action templates

**10. Monitor Agent (System Health)**
- **Model:** Gemini 3 Flash
- **Purpose:** Monitor AI system health and performance
- **Used In:** Dashboard Systems Tab
- **Tools:** Streaming, Structured Outputs
- **Industry Customization:** Industry-specific monitoring metrics

### Communication Agents (Phase 3+)

**11. Notification Agent (Messaging)**
- **Model:** Gemini 3 Flash
- **Purpose:** Generate update messages and notifications
- **Used In:** Real-time collaboration (Phase 3)
- **Tools:** Text Generation
- **Industry Customization:** Industry-specific notification templates

**12. Integration Agent (Data Sync)**
- **Model:** Gemini 3 Flash
- **Purpose:** Sync data across integrated systems
- **Used In:** Integration Marketplace (Phase 3)
- **Tools:** Function Calling
- **Industry Customization:** Industry-specific integration workflows

**13. Analytics Agent (Insights)**
- **Model:** Gemini 3 Pro
- **Purpose:** Generate insights and performance reports
- **Used In:** Analytics Dashboard (Phase 3)
- **Tools:** Code Execution, Structured Outputs
- **Industry Customization:** Industry-specific analytics and KPIs

**14. Assistant Agent (User Help)**
- **Model:** Gemini 3 Flash
- **Purpose:** Context-aware help and guidance
- **Used In:** Global chat assistant (Phase 2+)
- **Tools:** Interactions API, Text Generation
- **Industry Customization:** Industry-specific help content

---

## Feature Matrix by Industry

### Fashion E-commerce

| Feature | Step 1 | Step 2 | Step 3 | Step 4 | Step 5 | Dashboard |
|---------|--------|--------|--------|--------|--------|-----------|
| Google Search | ✅ Required | ❌ No | ❌ No | ❌ No | ❌ No | ⚠️ Optional |
| Deep Search | ⚠️ Optional | ❌ No | ❌ No | ❌ No | ❌ No | ❌ No |
| URL Context | ⚠️ Optional | ❌ No | ❌ No | ❌ No | ❌ No | ❌ No |
| Structured Outputs | ❌ No | ✅ Required | ✅ Required | ✅ Required | ✅ Required | ❌ No |
| Thinking Mode | ❌ No | ✅ 4096 | ✅ 1024 | ✅ 4096 | ✅ 4096 | ❌ No |
| Streaming | ❌ No | ❌ No | ❌ No | ❌ No | ⚠️ Optional | ✅ Required |

**Industry-Specific Focus:**
- Product page optimization (PDP conversion)
- Fit and size intelligence (return reduction)
- Content automation (UGC, social media)
- Inventory prediction (demand forecasting)

---

### Real Estate

| Feature | Step 1 | Step 2 | Step 3 | Step 4 | Step 5 | Dashboard |
|---------|--------|--------|--------|--------|--------|-----------|
| Google Search | ✅ Required | ❌ No | ❌ No | ❌ No | ❌ No | ⚠️ Optional |
| Deep Search | ⚠️ Optional | ❌ No | ❌ No | ❌ No | ❌ No | ❌ No |
| URL Context | ⚠️ Optional | ❌ No | ❌ No | ❌ No | ❌ No | ❌ No |
| Structured Outputs | ❌ No | ✅ Required | ✅ Required | ✅ Required | ✅ Required | ❌ No |
| Thinking Mode | ❌ No | ✅ 4096 | ✅ 1024 | ✅ 4096 | ✅ 4096 | ❌ No |
| Streaming | ❌ No | ❌ No | ❌ No | ❌ No | ⚠️ Optional | ✅ Required |

**Industry-Specific Focus:**
- Lead response automation (WhatsApp, email)
- Tour scheduling and qualification
- Listing optimization (neighborhood storytelling)
- Commission pipeline tracking

---

### Tourism

| Feature | Step 1 | Step 2 | Step 3 | Step 4 | Step 5 | Dashboard |
|---------|--------|--------|--------|--------|--------|-----------|
| Google Search | ✅ Required | ❌ No | ❌ No | ❌ No | ❌ No | ⚠️ Optional |
| Deep Search | ⚠️ Optional | ❌ No | ❌ No | ❌ No | ❌ No | ❌ No |
| URL Context | ⚠️ Optional | ❌ No | ❌ No | ❌ No | ❌ No | ❌ No |
| Structured Outputs | ❌ No | ✅ Required | ✅ Required | ✅ Required | ✅ Required | ❌ No |
| Thinking Mode | ❌ No | ✅ 4096 | ✅ 1024 | ✅ 4096 | ✅ 4096 | ❌ No |
| Streaming | ❌ No | ❌ No | ❌ No | ❌ No | ⚠️ Optional | ✅ Required |

**Industry-Specific Focus:**
- WhatsApp booking automation
- Itinerary clarity and upsells
- Review reputation management
- Seasonal pricing optimization

---

### Events

| Feature | Step 1 | Step 2 | Step 3 | Step 4 | Step 5 | Dashboard |
|---------|--------|--------|--------|--------|--------|-----------|
| Google Search | ✅ Required | ❌ No | ❌ No | ❌ No | ❌ No | ⚠️ Optional |
| Deep Search | ⚠️ Optional | ❌ No | ❌ No | ❌ No | ❌ No | ❌ No |
| URL Context | ⚠️ Optional | ❌ No | ❌ No | ❌ No | ❌ No | ❌ No |
| Structured Outputs | ❌ No | ✅ Required | ✅ Required | ✅ Required | ✅ Required | ❌ No |
| Thinking Mode | ❌ No | ✅ 4096 | ✅ 1024 | ✅ 4096 | ✅ 4096 | ❌ No |
| Streaming | ❌ No | ❌ No | ❌ No | ❌ No | ⚠️ Optional | ✅ Required |

**Industry-Specific Focus:**
- Ticket funnel optimization
- Sponsor acquisition automation
- Vendor coordination (run-of-show)
- Event content production

---

## Success Criteria

### Industry Pack Quality

- Each industry pack produces distinct, industry-specific outputs (no generic SaaS language)
- Diagnostic questions reflect real business workflows (fashion: drops, sizing; real estate: tours, listings)
- AI system names are industry-specific and memorable (not "AI Agent #1")
- KPIs match industry standards (fashion: conversion rate, AOV; real estate: lead response time)
- Readiness criteria reflect industry realities (fashion: product data quality; real estate: WhatsApp access)

### User Experience

- Users feel like they're speaking with a senior operator in their industry
- Recommendations feel personalized and actionable
- Language matches industry terminology (fashion: PDP, drops; real estate: tours, listings)
- Roadmaps reflect realistic industry timelines and dependencies

### Technical Performance

- Step 1 research completes in under 30 seconds
- Step 2 diagnostics complete in under 45 seconds
- Steps 3-5 complete in under 60 seconds each
- Streaming latency under 2 seconds for first chunk
- Industry pack loading time under 500ms

---

## Implementation Roadmap

### Phase 1: Industry Pack Infrastructure (Week 1)

**Goals:**
- Create modular industry pack system
- Implement Fashion pack as pilot
- Test with real Fashion e-commerce company

**Tasks:**
- Create industry pack directory structure
- Define TypeScript interfaces for pack structure
- Create pack loader utility
- Implement Fashion E-commerce pack (prompts, diagnostics, systems, KPIs)
- Test Fashion pack end-to-end

---

### Phase 2: Enhanced Gemini 3 Features (Week 2)

**Goals:**
- Implement Deep Search utility
- Add URL Context tool integration
- Enhance streaming with structured chunks

**Tasks:**
- Implement Deep Search (multi-query Google Search synthesis)
- Add URL Context tool to Step 1 research
- Enhance streaming with JSON chunks (text, citations, observations)
- Test performance and latency

---

### Phase 3: Additional Industry Packs (Weeks 3-4)

**Goals:**
- Create Real Estate, Tourism, and Events packs
- Validate each pack with real companies
- Ensure distinct outputs per industry

**Tasks:**
- Create Real Estate pack (rentals + buying)
- Create Tourism pack (tours + experiences)
- Create Events pack (planning + management + marketing)
- Test each pack with real companies
- Validate industry-specific outputs

---

## Future Industries

### SaaS B2B (Future)

**Common Problems:**
- Demo-to-trial conversion is low
- Onboarding takes too long
- Churn happens in first 90 days
- Sales pipeline visibility is weak

**Potential AI Systems:**
- Demo Funnel Optimizer
- Onboarding Acceleration Agent
- Churn Prevention Intelligence
- Sales Pipeline Copilot

---

### Healthcare (Future)

**Common Problems:**
- Appointment scheduling is manual
- Patient intake takes too long
- Follow-up communication is inconsistent
- Compliance documentation is burdensome

**Potential AI Systems:**
- Appointment Scheduling Orchestrator
- Intake Automation Agent
- Patient Communication Engine
- Compliance Documentation Assistant

---

## Quality Standards

### Industry Pack Design Principles

1. **Real Business Language:** Use industry-specific nouns and verbs, avoid generic SaaS terms
2. **Workflow Reflection:** Diagnostic questions must reflect actual business workflows
3. **Memorable System Names:** AI systems should have descriptive, industry-specific names
4. **Realistic KPIs:** KPIs must match industry standards and be measurable
5. **Honest Readiness:** Readiness criteria must reflect realistic industry requirements

### Gemini 3 Feature Usage

1. **Google Search Grounding:** Always use for Step 1 research, industry-specific queries
2. **Structured Outputs:** Always enforce JSON schemas with industry constraints
3. **Thinking Mode:** Use appropriate budgets (4096 for complex, 1024 for simple)
4. **Streaming:** Provide progressive updates in right panel intelligence narrative
5. **Deep Search:** Use for comprehensive research when available
6. **URL Context:** Use for website analysis when website URL provided

---

**Last Updated:** January 6, 2025  
**Status:** Strategic Industry Plan  
**Next Review:** After Fashion pack implementation

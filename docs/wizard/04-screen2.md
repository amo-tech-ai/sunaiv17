
# Screen 2: The "Strict Selection" Diagnostic Rule

**Role:** The Senior Consultant  
**Core Directive:** **Select, Don't Invent.**  
**Status:** Approved Specification  

---

## 1. The Core System Rule (The Constitution)

The AI Agent (Extractor) is **strictly forbidden** from generating new questions or rewriting question text.

**It may ONLY:**
1.  **Load** the specific `Industry Diagnostic Pack` (e.g., Real Estate).
2.  **Select** the 4-6 most relevant questions based on Step 1 context.
3.  **Prioritize** them (e.g., put "Revenue" questions first if margins are low).
4.  **Explain** "Why we are asking this" in the Right Panel.

**It must NOT:**
1.  Invent new questions.
2.  Change the phrasing of options.
3.  Ask generic "AI Survey" questions (e.g., "Do you want to be efficient?").

**Why?**
*   **Trust:** Users trust specific, hard-hitting industry language. They ignore generic fluff.
*   **Mapping:** Every predefined question maps 1:1 to a System in Screen 3. If the AI invents a question, it breaks the logic chain to the solution.

---

## 2. Allowed Question Categories

Every question on Screen 2 must fall into one of these four buckets. If it doesn't, it is cut.

### A. Revenue Bottlenecks (The "Money" Bucket)
*   **Goal:** Find where money is leaking.
*   **Trigger for System:** Systems that generate leads, increase conversion, or recover lost sales.
*   **Example:** "Visitors browse but don't buy." (Maps to: *Conversion Booster*)

### B. Execution Friction (The "Time" Bucket)
*   **Goal:** Find where humans are wasting time.
*   **Trigger for System:** Systems that automate admin, scheduling, or support.
*   **Example:** "Answering the same questions repeatedly." (Maps to: *AI Concierge*)

### C. Scaling Limits (The "Growth" Bucket)
*   **Goal:** Find what breaks if the business doubles tomorrow.
*   **Trigger for System:** Systems that organize data, content, or processes at scale.
*   **Example:** "Content creation can't keep up with demand." (Maps to: *Content Studio*)

### D. Readiness & Control (The "Safety" Bucket)
*   **Goal:** Determine the pace of implementation.
*   **Trigger for Roadmap:** Determines if Phase 1 is "Aggressive Launch" or "Foundation Building".
*   **Example:** "How fast do you want to move?"

---

## 3. UI/UX Layout (3-Panel Logic)

### Left Panel: The Anchor (Context)
*   **Visual:** Fixed Sidebar.
*   **Content:**
    *   **Industry Badge:** "Real Estate" (Locked).
    *   **Tech Stack:** "WhatsApp" + "Zillow" (Detected in Step 1).
*   **Goal:** Remind the user: *"We are asking these questions because you are a [Industry] business using [Tech]."*

### Center Panel: The Diagnostic Form (Work)
*   **Visual:** Vertical Scroll. Clean, high-contrast cards.
*   **Structure:**
    *   **Section 1:** North Star (Single Select).
    *   **Section 2:** Revenue Pain (Multi-Select).
    *   **Section 3:** Time Drain (Multi-Select).
    *   **Section 4:** Readiness (Slider/Single Select).
*   **Interaction:** Instant visual feedback. Clicking an option highlights the card border.

### Right Panel: The Consultant (Intelligence)
*   **Visual:** Terminal-style stream.
*   **Dynamic Content:**
    *   *Default:* "Analyzing your sector..."
    *   *On Hover (Question):* Explains **WHY** this question matters.
    *   *On Select (Option):* Validates the choice.
    *   *Example:* User selects "Slow Response". Right Panel: *"Speed to lead is critical. In Real Estate, 78% of deals go to the first responder."*

---

## 4. Real-World Example: Real Estate Industry

**Context:** Residential Brokerage.
**Constraint:** Use **ultra-simple** language.

### Section 1: The Money (Revenue)
**"Where are you losing deals right now?"**
*   [ ] "Leads take too long to answer" -> *(Maps to: WhatsApp Speed Bot)*
*   [ ] "We get leads, but they are unqualified" -> *(Maps to: Qualification Gatekeeper)*
*   [ ] "Past clients forget about us" -> *(Maps to: Database Reactivator)*

### Section 2: The Grind (Time)
**"What does your team hate doing?"**
*   [ ] "Scheduling viewings via email tag" -> *(Maps to: Auto-Scheduler)*
*   [ ] "Writing listing descriptions" -> *(Maps to: Content Engine)*
*   [ ] "Entering data into the CRM" -> *(Maps to: CRM Sync)*

### Section 3: The Pace (Readiness)
**"How fast should we implement?"**
*   ( ) "Fix it all right now." -> *(Aggressive Roadmap)*
*   ( ) "Start with one quick win." -> *(Conservative Roadmap)*

---

## 5. Technical Architecture & Wiring

### AI Agent: Extractor (`gemini-3-pro`)
*   **Input:** `IndustryType` (e.g., 'real_estate').
*   **Resource:** `INDUSTRY_PACKS` (Static JSON file).
*   **Logic:**
    1.  Look up `INDUSTRY_PACKS['real_estate']`.
    2.  Filter questions based on Step 1 context (e.g., if they didn't mention a CRM, maybe hide CRM specific questions or prioritize them if it's a known gap).
    3.  **Strictly** output the chosen questions as JSON.
*   **Output:** `DiagnosticSchema` (passed to Frontend).

### Database (Supabase)
*   **Read:** `industry_packs` (or hardcoded TS file for MVP).
*   **Write:** `wizard_answers` table.
    *   `question_id`: "re_speed_leak"
    *   `answer_value`: "Leads take too long"
    *   `mapped_system`: "whatsapp_bot"

### Edge Function (`extractor`)
*   **Validation:** Before returning to UI, check that every `mapped_system_id` in the options actually exists in the `SYSTEMS` catalog. If not, fallback to a default.

---

## 6. Production Checklist

- [ ] **Data:** `industryPacks.ts` populated with high-quality, simple questions for target industries.
- [ ] **Agent:** `extractor` function configured to **select** from packs, not **generate** text.
- [ ] **UI:** `Step2Diagnostics.tsx` handles the "4 Section" layout.
- [ ] **Intelligence:** Right Panel wired to show `ai_explanation` on hover.

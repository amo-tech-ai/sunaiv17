
# Real-World Scenarios: Wizard Screen 3 (System Selection)

**Focus:** The "Prescription Phase" driven by the **Optimizer Agent**.
**Model:** `gemini-3-pro-preview` (Reasoning & Custom Text Generation).

This document illustrates how the AI listens to the user's specific complaints (Step 2) and prescribes the exact "medicine" (Step 3). It shows the difference between a generic recommendation and a **context-aware prescription**.

---

## 1. Tourism Industry (The Adventure Tour Operator)

**Context:** A mid-sized operator running 3-day trekking tours in South America.
**Step 2 Inputs (The Headache):**
*   *"We are missing inquiries because our customers are in Europe/Asia and we are asleep."* (Speed)
*   *"Updating PDF itineraries manually every season is a pain."* (Operations)

### 🥇 Recommendation #1: The "24/7 Sales Agent"
*   **System ID:** `whatsapp_assistant`
*   **Why the AI chose this:** The AI detects a specific "Time Zone Mismatch." The business is open 9-5 locally, but their customers are buying at 2 AM. A static website can't answer questions; a bot can.
*   **UI Badge:** "Recommended" (Gold)

**Generated ROI Text (What the user sees):**
> "Acts as your night-shift sales agent. Captures bookings from European & Asian time zones while your local team sleeps, recovering an estimated ~15% of lost inquiry volume."

### 🥈 Recommendation #2: The "Upsell Engine"
*   **System ID:** `conversion_booster` (Renamed: *Itinerary Builder*)
*   **Why the AI chose this:** The user complained about "manual PDFs." The AI knows that static PDFs are dead ends. By digitizing them, the AI can inject automatic upsells (like premium gear rentals) that a PDF can't do.
*   **UI Badge:** "High Value"

**Generated ROI Text:**
> "Digitizes your static trekking PDFs into live links. Automatically pitches high-margin add-ons like 'Private Tent Upgrades' and 'Gear Rentals' before the trip starts."

---

## 2. Events Industry (The Tech Conference)

**Context:** An annual B2B tech summit organizing 2,000+ attendees.
**Step 2 Inputs (The Headache):**
*   *"Sponsor acquisition is messy and disorganized."* (Sales)
*   *"Vendor coordination is a nightmare during the week of the event."* (Speed)

### 🥇 Recommendation #1: The "Revenue Rescuer"
*   **System ID:** `lead_gen` (Renamed: *Sponsor Outreach Copilot*)
*   **Why the AI chose this:** Sponsorships are high-ticket items ($10k-$50k). The AI prioritizes this because fixing the "money pipe" has the highest immediate impact on the business's success.
*   **UI Badge:** "Revenue Critical"

**Generated ROI Text:**
> "Automates personalized outreach to Tier-2 tech sponsors who usually get ignored. Fills your Expo Hall 30% faster than manual email chains, securing revenue earlier in the cycle."

### 🥈 Recommendation #2: The "Chaos Controller"
*   **System ID:** `whatsapp_assistant` (Renamed: *Run-of-Show Orchestrator*)
*   **Why the AI chose this:** "Nightmare week-of" signals a logistical bottleneck. The AI prescribes a centralized communication brain to handle the hundreds of "Where do I park?" questions from vendors.

**Generated ROI Text:**
> "Centralizes 50+ vendor communications into one automated dashboard. Prevents 'Where is the truck?' chaos on event day by sending automated load-in schedules and maps."

---

## 3. B2B SaaS (The HR Tech Startup)

**Context:** A subscription software platform for employee engagement.
**Step 2 Inputs (The Headache):**
*   *"Users sign up but quit (churn) in the first 90 days."* (Retention)
*   *"We book demos, but prospects don't show up."* (Sales)

### 🥇 Recommendation #1: The "Leaky Bucket Fix"
*   **System ID:** `crm_autopilot` (Renamed: *Onboarding Acceleration Agent*)
*   **Why the AI chose this:** In SaaS, keeping a customer is more important than finding a new one. The AI identifies "Churn" as the silent killer and prescribes an automated onboarding safety net.
*   **UI Badge:** "Retention Critical"

**Generated ROI Text:**
> "Watches for inactive users during their first 90 days. Triggers automated, helpful 'nudge' emails to drive feature adoption exactly when they are most likely to quit."

### 🥈 Recommendation #2: The "Pipeline Cleaner"
*   **System ID:** `lead_gen` (Renamed: *Demo Show-Rate Bot*)
*   **Why the AI chose this:** "Ghosting" on demos means the prospect forgot or lost interest. The solution isn't more leads; it's better reminders.

**Generated ROI Text:**
> "Sends automated SMS/Email reminders with value-add content 24 hours before the call. Increases demo attendance rates by ~20% by keeping the prospect warm."

---

## 4. Local Services (High-End Landscaping)

**Context:** A luxury landscaping firm doing $2M/year in revenue.
**Step 2 Inputs (The Headache):**
*   *"I spend all day driving to quotes, only to find out they have no budget."* (Efficiency)
*   *"Clients struggle to visualize the final result, so they hesitate to buy."* (Sales)

### 🥇 Recommendation #1: The "Bouncer"
*   **System ID:** `lead_gen` (Renamed: *Project Qualification Bot*)
*   **Why the AI chose this:** The owner is wasting expensive time (driving) on low-value tasks (talking to people with no money). The AI sets up a digital "Gatekeeper" to filter leads before the owner gets in the truck.
*   **UI Badge:** "Time Saver"

**Generated ROI Text:**
> "Filters out leads with budgets under $10k automatically via SMS. Saves you ~10 hours of driving time per week by ensuring you only visit qualified, high-budget properties."

### 🥈 Recommendation #2: The "Visual Closer"
*   **System ID:** `content_studio` (Renamed: *AI Landscape Visualizer*)
*   **Why the AI chose this:** The client said "Visuals" are the friction point. The AI prescribes an image generation tool to instantly show the "After" photo, removing the client's fear of the unknown.

**Generated ROI Text:**
> "Instantly generates realistic 'Before & After' visualizations for your proposals. Increases close rates on high-ticket installations by helping clients see the dream."

---

## 5. Real Estate (The Boutique Agency)

**Context:** A residential brokerage with 5 agents in a competitive city.
**Step 2 Inputs (The Headache):**
*   *"We get leads from Zillow, but by the time we call them, they've hired someone else."* (Speed)
*   *"My agents waste half their day texting back-and-forth just to schedule viewings."* (Efficiency)

### 🥇 Recommendation #1: The "Speed-to-Lead" Bot
*   **System ID:** `whatsapp_assistant` (Renamed: *Instant Lead Concierge*)
*   **Why the AI chose this:** In Real Estate, "Speed to Lead" is the primary driver of conversion. 5 minutes of delay can mean a lost commission. A human can't reply in 10 seconds 24/7; AI can.
*   **UI Badge:** "Commission Saver"

**Generated ROI Text:**
> "Engages new Zillow/Realtor.com leads via SMS in <30 seconds. Qualifies their budget and timeline instantly, increasing your lead-to-appointment ratio by ~40%."

### 🥈 Recommendation #2: The "Calendar Sync"
*   **System ID:** `conversion_booster` (Renamed: *Viewing Auto-Scheduler*)
*   **Why the AI chose this:** Scheduling friction kills momentum. The AI removes the "Does Tuesday at 4 work?" email tag by letting qualified buyers book directly into agent calendars.

**Generated ROI Text:**
> "Allows pre-qualified buyers to book viewings directly into agent calendars based on property location logic. Saves your team ~15 hours of admin work per week."

---

## 6. Healthcare (The Cosmetic Dental Clinic)

**Context:** A private dental practice focusing on high-value cosmetic treatments (Invisalign, Veneers).
**Step 2 Inputs (The Headache):**
*   *"Patients book consultations but often cancel last minute or just don't show up."* (Reliability)
*   *"We need more high-value cosmetic patients, not just routine check-ups."* (Revenue)

### 🥇 Recommendation #1: The "No-Show Killer"
*   **System ID:** `crm_autopilot` (Renamed: *Appointment Guard*)
*   **Why the AI chose this:** An empty chair for a cosmetic dentist costs $500+/hour. The AI prescribes a robust reminder system to protect that inventory.
*   **UI Badge:** "Revenue Protection"

**Generated ROI Text:**
> "Automated SMS/WhatsApp reminders that require confirmation 24h prior. Drastically reduces no-show rates by ~60% by adding friction to cancellations and ease to rescheduling."

### 🥈 Recommendation #2: The "Smile Simulator"
*   **System ID:** `content_studio` (Renamed: *AI Smile Visualizer*)
*   **Why the AI chose this:** Cosmetic dentistry is an emotional sale. The patient needs to *see* the result to buy. The AI prescribes visualization tools to close the deal.

**Generated ROI Text:**
> "Instantly generates a 'Before & After' simulation of the patient's smile based on a simple photo. Increases emotional buy-in and acceptance rates for high-ticket ($5k+) treatment plans."

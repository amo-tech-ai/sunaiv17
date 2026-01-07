
# Real-World Scenarios: Readiness Assessment (Screen 4)

**Focus:** The "Audit Phase" driven by the **Scorer Agent**.
**Model:** `gemini-3-pro-preview` (Reasoning & Code Execution).
**Goal:** To move beyond a generic "Checklist" and provide a strategic "Risk Assessment."

---

## 1. Introduction: Core vs. Advanced Logic

How the AI processes the user's checklist inputs:

*   **Core Logic (The Calculator):** Simple math. If the user unchecks "Budget Approved", the score drops by 20 points. This uses **Code Execution** to ensure the score (0-100) is mathematically precise.
*   **Advanced Logic (The Strategist):** Deep reasoning. The AI looks at *which* Systems were selected in Step 3 and compares them to the *specific* gaps in Step 4. It identifies **dependencies** that a simple calculator would miss.

---

## 2. Fashion E-commerce (The "Data" Trap)

**Context:** A clothing brand selected the **"Fit Intelligence Agent"** (Step 3) to reduce returns.
**User Input (Step 4):**
*   ✅ Tools Ready (Shopify)
*   ✅ Budget Approved
*   ❌ **Data Ready (False)** — *User thinks: "I have data, but it's messy."*

### The Analysis

| Level | What the AI Does | The Output (What the User Sees) |
| :--- | :--- | :--- |
| **Core** | Subtracts 25 points for "Data Ready = False". | **Score:** 75/100 |
| **Advanced** | **Gemini Thinking:** "The user wants 'Fit Intelligence'. This system *requires* structured historical return data (e.g., 'Too small' vs 'Too big') to train the model. Without clean data, this specific system is useless." | **Critical Risk:** "Model Starvation: The Fit Agent requires tagged return reasons to function. Implementing this without cleaning your data first will result in 0% accuracy." |

**🚀 Quick Win:** "Install a 'Return Reasons' plugin on Shopify today to start collecting structured data immediately."

---

## 3. Real Estate (The "Compliance" Block)

**Context:** A brokerage selected the **"WhatsApp Lead Concierge"** (Step 3) to reply to leads instantly.
**User Input (Step 4):**
*   ✅ Data Ready (CRM is good)
*   ✅ Team Owner (Sales Manager is ready)
*   ❌ **Tools Ready (False)** — *User thinks: "We use personal WhatsApp on our phones."*

### The Analysis

| Level | What the AI Does | The Output (What the User Sees) |
| :--- | :--- | :--- |
| **Core** | Subtracts 25 points for "Tools Ready = False". | **Score:** 75/100 |
| **Advanced** | **Gemini Thinking:** "The 'WhatsApp Concierge' requires the Meta Business API. It *cannot* run on personal phone numbers due to Terms of Service. If they try to automate personal numbers, they will get banned." | **Blocking Risk:** "API Incompatibility: You cannot automate personal WhatsApp numbers safely. You must upgrade to a WhatsApp Business API account before we can deploy the Concierge." |

**🚀 Quick Win:** "Verify your Business Manager ID with Meta (Takes ~24 hours)."

---

## 4. Tourism / Tours (The "Analog" Gap)

**Context:** A tour operator selected the **"Itinerary Upsell Engine"** (Step 3) to sell add-ons automatically.
**User Input (Step 4):**
*   ✅ Budget Approved
*   ❌ **Data Ready (False)** — *User thinks: "We use paper calendars and Excel."*
*   ❌ **Tools Ready (False)**

### The Analysis

| Level | What the AI Does | The Output (What the User Sees) |
| :--- | :--- | :--- |
| **Core** | Subtracts 50 points for two missing items. | **Score:** 50/100 (Needs Work) |
| **Advanced** | **Gemini Thinking:** "The 'Upsell Engine' triggers emails *after* a booking is made. If bookings are on paper, there is no digital trigger. They don't need AI yet; they need a Booking System." | **Strategic Pivot:** "Foundation Gap: You cannot automate upsells without a digital trigger. We must pause the AI implementation and install a Booking Engine (e.g., Rezdy/FareHarbor) first." |

**🚀 Quick Win:** "Select a Booking Platform (We recommend X or Y for your region)."

---

## 5. Events / Conferences (The "Human" Bottleneck)

**Context:** An event organizer selected **"Sponsor Outreach Copilot"** (Step 3) to generate 100s of leads.
**User Input (Step 4):**
*   ✅ Data Ready (Lead lists are bought)
*   ✅ Tools Ready (Email tool is set)
*   ❌ **Team Owner (False)** — *User thinks: "I want AI to do it because I have no sales staff."*

### The Analysis

| Level | What the AI Does | The Output (What the User Sees) |
| :--- | :--- | :--- |
| **Core** | Subtracts 25 points. | **Score:** 75/100 |
| **Advanced** | **Gemini Thinking:** "The 'Outreach Copilot' generates conversations, but AI cannot sign high-ticket contracts ($10k+). If there is no human 'Team Owner' to take the closing calls, the leads will die." | **Operational Risk:** "The Closing Gap: This system will generate ~20 meetings/week. Without a dedicated Human Sales Lead assigned to take these calls, you will burn through high-value leads with no ROI." |

**🚀 Quick Win:** "Assign a 'Sponsorship Manager' or clear 10 hours/week on your own calendar before launch."

---

## 6. Summary of AI Logic

| Feature | Logic Type | Why it builds trust |
| :--- | :--- | :--- |
| **Score Calculation** | **Python Code Execution** | "The math is real. It's not a hallucination." |
| **Risk Detection** | **Gemini Thinking** | "It understands *my* specific problem, not just generic advice." |
| **Quick Wins** | **Industry Knowledge Base** | "It gives me something I can fix *today*." |


# Screen 4: Executive Summary — Wireframe & Content Strategy

**Goal:** Transform the user's inputs into a high-value strategic asset.
**Layout:** 3-Panel Console (Left: Context, Center: The Brief, Right: The Consultant).
**AI Model:** `gemini-3-pro-preview` (Narrative Generation).

---

## 1. 3-Panel UX Layout Logic

### Left Panel (20%) — The Client Brief (Context Anchor)
*   **Purpose:** Summarizes *who* the client is based on Step 1 & 2 inputs.
*   **Visuals:**
    *   **Top:** Sun AI Logo + "Executive Brief".
    *   **Profile Card:**
        *   Business Name (e.g., "Luxe Threads")
        *   **Industry:** Fashion E-commerce
        *   **Model:** "DTC Luxury Brand" (Extracted from URL)
    *   **The Mission:**
        *   "Goal: Reduce Return Rate" (From Step 2)
        *   "Current Stack: Shopify, Instagram" (From Step 1)
    *   **Navigation:** "Edit Brief" link (subtle).

### Center Panel (50%) — The Strategic Analysis (Scrollable)
*   **Purpose:** The core deliverable. High-impact visual summary.
*   **Visuals:**
    *   **Section 1: The Readiness Score (Current State)**
        *   **Visual:** Large Animated Radial Dial (0-100).
        *   **Label:** "78/100 - Strong Foundation".
        *   **Subtext:** "Your infrastructure is ready for Level 2 Automation."
    
    *   **Section 2: The Strategy Narrative (AI Generated)**
        *   **Headline:** "Turning Returns into Retention"
        *   **Body:** 2 paragraphs of consultant-grade text connecting their Pain to the Solution.
        *   *Focus:* Explain clearly **HOW** AI improves their specific business.

    *   **Section 3: The Solution Stack**
        *   Display the 2-3 selected systems (e.g., Fit Intelligence, Content Studio).
        *   *Format:* Horizontal cards with Icon + Name + "Why it fits".

    *   **Section 4: Projected Impact Scores (The "Additional Scores")**
        *   *Visual:* 3 Horizontal Bar Charts showing "Before AI" vs "After AI".
        *   **Efficiency Score:** 40% -> 85% (Reason: Automation of manual tasks).
        *   **Speed Velocity:** 2/10 -> 9/10 (Reason: Instant Lead Response).
        *   **Revenue Potential:** High (Reason: Recovering lost leads).

    *   **Footer (Sticky):**
        *   **CTA Button:** "Reveal 30-Day Execution Plan" (Pulsing).

### Right Panel (30%) — The Consultant (Live Stream)
*   **Purpose:** Trust & Transparency. Explains the *reasoning* behind the scores.
*   **Visuals:**
    *   **Streaming Text Area:** "Analyzing your infrastructure..." -> "Score calculated based on..."
    *   **"Why these Scores?":**
        *   **Strengths (Green):** "Strong Data Foundation (Shopify)."
        *   **Risks (Red):** "Missing SMS Infrastructure."
    *   **Interactive Context:**
        *   *User hovers over "Efficiency Score"* -> Right Panel explains: "We project a 45% gain because the 'Content Studio' removes 15 hours of manual drafting per week."

---

## 2. Real-World Content Examples (The "Flavor")

What the AI actually writes in the **Center Panel Narrative** and **Right Panel Analysis**.

### Industry A: Fashion E-commerce (DTC)
*   **Context:** High returns, manual instagram posting.
*   **Selected:** Fit Intelligence, Content Studio.

#### Center Panel (The Strategy)
> **Headline:** Turning Returns into Retention.
>
> **Narrative:** "In the high-stakes world of DTC fashion, returns are the silent profit killer. Your current return rate is draining liquidity that should be fueling growth.
>
> By deploying **Fit Intelligence**, we move from reactive refunds to proactive sizing guidance. Combined with the **Content Studio**, you will not only reduce operational drag but also 10x your creative output on Instagram without hiring more staff."

#### Center Panel (Impact Scores)
*   **Efficiency:** ⬆️ **+40%** (Automating size queries)
*   **Margins:** ⬆️ **+15%** (Reducing return logistics costs)

#### Right Panel (The Logic)
> **Analysis:** "I've scored you **78/100 (Strong Foundation)**.
>
> **Why?** Your use of Shopify (Step 1) means we have clean data to train the Fit model immediately. However, the lack of a dedicated CRM (Step 2) acts as a drag on the score, as we cannot easily retarget customers who had fit issues."

---

### Industry B: Real Estate Brokerage
*   **Context:** Missed leads on weekends, manual scheduling.
*   **Selected:** WhatsApp Concierge, Tour Scheduler.

#### Center Panel (The Strategy)
> **Headline:** Owning the "Speed to Lead" Advantage.
>
> **Narrative:** "Real estate is won in the first 5 minutes. Currently, your manual process means valuable Zillow leads are going cold during off-hours. This is a solvable leakage.
>
> The **WhatsApp Concierge** ensures every inquiry receives an instant, human-like qualification, 24/7. Pairing this with the **Tour Scheduler** removes the friction of 'email tag', creating a seamless path from 'Curious' to 'Viewing'."

#### Center Panel (Impact Scores)
*   **Response Speed:** ⚡ **Instant** (Prev: 4 hours)
*   **Lead Velocity:** ⬆️ **3x** (24/7 coverage)

#### Right Panel (The Logic)
> **Analysis:** "I've scored you **62/100 (Foundation Building)**.
>
> **Why?** While your deal volume is high, the lack of an existing API-ready CRM is a significant blocker. We cannot deploy the WhatsApp bot safely until we bridge that data gap. This lowers your readiness score significantly but clarifies our Phase 1 priority."

---

### Industry C: High-Ticket B2B SaaS
*   **Context:** Long sales cycles, ghosting after demos.
*   **Selected:** CRM Autopilot, Content Studio.

#### Center Panel (The Strategy)
> **Headline:** Automating Trust at Scale.
>
> **Narrative:** "Your product is strong, but your pipeline is leaking during the critical 'consideration' phase. Prospects are forgetting you between the Demo and the Contract.
>
> We will deploy **CRM Autopilot** to keep these leads warm with hyper-personalized touches, powered by assets from the **Content Studio**. This shifts your sales team from 'chasing' to 'closing'."

#### Center Panel (Impact Scores)
*   **Pipeline Health:** 🟢 **95/100** (Automated follow-ups)
*   **Sales Admin Time:** ⬇️ **-60%** (AI drafting)

#### Right Panel (The Logic)
> **Analysis:** "I've scored you **85/100 (Scale Ready)**.
>
> **Why?** You already have Salesforce and a structured data lake. This infrastructure allows us to plug in the Autopilot agent immediately. Your main risk is simply content volume—your current library is too small to feed the nurturing engine."

---

## 3. UI States & Transitions

### A. The "Synthesizing" State (Loading)
*   **Center Panel:**
    *   Skeleton loader for text.
    *   Pulsing Gemini Icon.
    *   Text: "Connecting specific pain points to solutions..."
*   **Right Panel:**
    *   Fast-scrolling terminal text:
    *   *Verifying Industry benchmarks...*
    *   *Calculating ROI projection...*
    *   *Drafting executive summary...*

### B. The "Ready" State (Success)
*   **Center Panel:**
    *   Score animates from 0 -> 78.
    *   Narrative types out (fast stream).
    *   System cards slide in.
    *   Impact Bars animate width.
*   **Right Panel:**
    *   Settles into a calm "Consultant View" highlighting the key Risk/Win.

### C. The "Action" State (Clicking CTA)
*   **Transition:**
    *   Center panel slides LEFT.
    *   Right panel expands or morphs.
    *   Screen 5 (The Roadmap) slides in from the RIGHT.

---

## 4. Key Data Points for Frontend Wiring

To render this screen, the frontend needs this specific JSON object from the `summary` Edge Function:

```typescript
interface SummaryResponse {
  score: number; // 0-100 (Readiness)
  label: string; // "Ready to Scale"
  headline: string; // "Turning Returns into Retention"
  narrative: string; // The 2 paragraphs
  
  // The Impact Scores (New Section)
  impactScores: {
    efficiency: { score: number, label: string }; // e.g. {85, "+40%"}
    velocity: { score: number, label: string };   // e.g. {90, "Instant"}
    revenue: { score: number, label: string };    // e.g. {75, "High Potential"}
  };
  
  // Right Panel Logic
  analysis: {
    strengths: string[];
    risks: string[];
    reasoning: string; // "Why this score..."
  }
}
```

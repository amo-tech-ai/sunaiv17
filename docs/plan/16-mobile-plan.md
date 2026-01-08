# Mobile Optimization Plan: Sun AI Agency Wizard

**Target Architecture:** Single-Column Vertical Stack (Mobile) vs. 3-Panel Layout (Desktop)  
**Device Context:** iPhone 14/15 Pro, Pixel 7/8 dimensions (Safe Area logic applies).

---

## 1. Mobile UX Principles (Wizard-Specific)

### The "Thumb Zone" Imperative
*   **Principle:** 75% of interactions must happen in the bottom third of the screen.
*   **Application:** All navigation (Next/Back) and primary selections (Radio/Checkbox) must be reachable without shifting grip. Top-left "Back" buttons are forbidden; use bottom-left secondary actions instead.

### Context Retention, Not Recall
*   **Principle:** Mobile users have lower working memory due to environmental distractions.
*   **Application:** Do not hide the "Why" (Right Panel Intelligence) completely. Use "Micro-Context"—dismissible inline tips or bottom sheets—so users don't have to remember Step 1 data while on Step 3.

### Input Velocity
*   **Principle:** Typing on mobile is high-friction. Tapping is low-friction.
*   **Application:** Convert text inputs to pill selections where possible. Use `inputmode` attributes (e.g., `url`, `email`) to trigger the correct keyboard layout immediately.

### Perceived Latency Management
*   **Principle:** Mobile networks vary. AI generation feels slower on a phone.
*   **Application:** Use Optimistic UI. When a user selects a system, immediately highlight it visually before the server confirms. Stream AI text token-by-token to prove "aliveness."

---

## 2. Screen-by-Screen Mobile Layout Plan

### Global Mobile Structure
*   **Header (Fixed):** Minimal logo + Progress Bar (4px height) + Step Counter (e.g., "3 of 5").
*   **Footer (Fixed/Sticky):** Primary CTA Button ("Continue"). Background blur `backdrop-filter: blur(10px)` to ensure contrast over scrolling content.

### Screen 1: Business Context
*   **Structure:** Vertical Form.
*   **Hidden:** "Right Panel" stream is hidden by default. Replaced by a "Live Analysis" Toast notification that appears at the top when fields blur.
*   **Scroll:** Fields scroll behind the sticky footer.
*   **Tap Targets:** Inputs must be 48px height.
*   **Specifics:** "Industry" dropdown becomes a native bottom sheet picker (better than HTML select on mobile).

### Screen 2: Industry Diagnostics
*   **Structure:** Stacked Cards.
*   **Layout:** One question per screen view (if complex) OR vertical scroll with distinct section dividers.
*   **Interaction:** Tapping an option (Radio/Checkbox) immediately highlights the entire card border, not just the tiny box.
*   **Right Panel (Intelligence):** Converted to an "AI Insight" toggle (Lightbulb icon) inside the question card. Tapping expands an inline accordion with the context.

### Screen 3: System Recommendations
*   **Structure:** Vertical List of Cards (No horizontal carousels—they hide complexity).
*   **Behavior:**
    *   **Collapsed State:** Shows System Name, "Recommended" Badge, and ROI Headline.
    *   **Expanded State (Tap):** Reveals full description and features.
*   **Sticky:** The "2/3 Selected" counter sits on top of the "Continue" button in the sticky footer.

### Screen 4: Executive Summary
*   **Structure:** Long-form vertical dashboard.
*   **Hierarchy:**
    1.  **Readiness Score:** Massive radial dial (centered).
    2.  **Strategy:** Text block (expandable "Read More").
    3.  **Impact:** Stacked Bar Charts (re-oriented from horizontal to vertical if needed, or keeping horizontal bars but full-width).
    4.  **Intelligence:** The "Consultant Logic" (Right Panel) moves to a "View Analysis" text link at the bottom of the Readiness Score.

### Screen 5: Roadmap
*   **Structure:** Vertical Timeline.
*   **Behavior:**
    *   Phase headers are sticky within the scroll container.
    *   Tasks are collapsed accordions.
*   **Tap Targets:** The "Launch Project" button must be the only dominant element at the end of the scroll.

---

## 3. Mobile Interaction Rules

### Selection Patterns
*   **Multi-Select:** Use Stackable Pills or List Items.
    *   *Rule:* If options < 5 words, use Pills (Wrap layout).
    *   *Rule:* If options > 5 words, use Full-width List Items.
*   **Single-Select:** Never use native radio buttons. Use Selectable Cards.
    *   *State:* Selected = Thick Accent Border + Background Tint + Checkmark Icon.

### Content Density
*   **Max Options:** No more than 5 options visible at once. If > 5, show "Show More" accordion.
*   **Text Size:** Minimum body text: 16px (prevents iOS auto-zoom on input focus).

### AI Intelligence (The "Right Panel" Problem)
*   **Solution:** The Bottom Sheet Pattern.
*   **Trigger:** A floating "AI Insights" bubble or specific "Why?" icons next to questions.
*   **Behavior:** Tapping opens a half-height sheet with the "Right Panel" content. This keeps the user on the form while reading context.

---

## 4. Sticky & Fixed Elements

### 1. The "Action Floor" (Sticky Footer)
*   **Height:** 80px (Includes Safe Area).
*   **Content:** Primary CTA ("Next" / "Analyze").
*   **Z-Index:** 50 (Above all content).
*   **Why:** One-handed users cannot reach the top. If content varies in length, the button position shouldn't move.

### 2. The "Context Ceiling" (Sticky Header)
*   **Height:** 60px.
*   **Content:** Back Arrow (Left), Logo (Center), Step Indicator (Right).
*   **Why:** Allows rapid retreat ("I clicked the wrong thing") without scrolling up.

### 3. iOS Safe Area
*   **Rule:** Add `padding-bottom: env(safe-area-inset-bottom)` to the sticky footer container.
*   **Why:** Prevents the CTA from overlapping the iPhone home swipe bar.

---

## 5. Performance & Perceived Speed

### Skeleton Loaders
*   **Rule:** Never show a blank screen or a generic spinner for > 300ms.
*   **Implementation:** Use a "Shimmer" skeleton matching the layout of the cards (Screen 3) or the timeline (Screen 5).

### Streaming Text
*   **Rule:** Lock layout height.
*   **Implementation:** When AI text streams, pre-allocate a min-height container to prevent the "Next" button from jumping down as text generates. Cumulative Layout Shift (CLS) destroys mobile UX.

### Progressive Disclosure
*   **Rule:** Load the "Critical Path" first.
*   **Screen 3:** Render the "Recommended" systems immediately (if cached) or skeletons. Render the non-recommended systems 200ms later.

---

## 6. Accessibility & Touch Guidelines

*   **Tap Targets:** Minimum 48x48px for all interactive elements. This includes the padding around a text link.
*   **Reachability:**
    *   *Green Zone (Easy):* Bottom 30%. Place CTAs here.
    *   *Yellow Zone (Stretch):* Middle 40%. Place inputs here.
    *   *Red Zone (Hard):* Top 30%. Place read-only context here.
*   **Input Focus:** When an input is focused, scroll the page so the input is centered in the available view (above the keyboard).
*   **Contrast:** Text colors must meet WCAG AA (4.5:1). Light gray text on white backgrounds is invisible outdoors (sun glare).

---

## 7. Mobile Failure Modes (Critical)

### The "Keyboard Trap"
*   **Issue:** Keyboard opens, covers the input field or the "Next" button.
*   **Prevention:** Listen for window resize/focus events. Add padding to bottom of scroll container equal to keyboard height.

### The "Accidental Refresh"
*   **Issue:** Pull-to-refresh triggers on a web app, destroying wizard progress.
*   **Prevention:** CSS `overscroll-behavior-y: none;` on the body element. Save state to localStorage on every keystroke/click.

### The "Tiny Touch"
*   **Issue:** User tries to tap a specific radio button but misses.
*   **Prevention:** Make the entire `<div>` container the label/click target.

### The "Lost Context"
*   **Issue:** User gets a phone call, returns, and app resets.
*   **Prevention:** Robust state persistence in Supabase/Local Storage. Resume exactly where left off.

### The "Scroll Prison"
*   **Issue:** A map or text area inside the page scrolls instead of the page itself.
*   **Prevention:** Disable scroll on internal components unless focused. Use full-page scroll for the wizard flow.

---

## 8. Production Checklist

### UX
- [ ] Primary CTA is sticky at bottom.
- [ ] No horizontal scrolling required.
- [ ] Back button is accessible (bottom left or top left with large padding).
- [ ] Progress is visible but unobtrusive.

### Performance
- [ ] Skeleton screens implemented for AI wait times.
- [ ] `inputmode` set correctly on all fields.
- [ ] Images (if any) are lazy-loaded or WebP.

### Accessibility
- [ ] Tap targets > 48px.
- [ ] Font size > 16px.
- [ ] Color contrast passes WCAG AA.
- [ ] Focus states visible for keyboard/screen reader users.

### Real-World Testing
- [ ] Test on actual device (not just Chrome DevTools).
- [ ] Test in bright sunlight (contrast check).
- [ ] Test with "Throttled 4G" network speed.
- [ ] Test completing the form using only one thumb.
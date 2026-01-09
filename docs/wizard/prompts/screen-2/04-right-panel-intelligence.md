# RIGHT PANEL: CONTEXTUAL INTELLIGENCE

**Role:** The "Why" Engine
**UX Pattern:** Reactive Education

---

## 1. PURPOSE

The Right Panel prevents the user from feeling like they are filling out a tax form. It explains the *strategic value* of the question they are currently answering.

---

## 2. INTERACTION STATES

### State A: Idle (Default)
*   **Content:** "Industry Context".
*   **Text:** Shows the `description` field from the Industry Pack.
*   *Example:* "Fashion brands often lose 20% of revenue to returns. Let's see how you compare."

### State B: Hover / Focus
*   **Trigger:** User hovers over a specific option (e.g., "Manual Sizing Questions").
*   **Content:** The `ai_explanation` field from the option data.
*   *Example:* "Answering size queries manually distracts your support team from high-value sales conversations."

### State C: Selection
*   **Trigger:** User selects an option.
*   **Content:** "Insight Recorded."
*   *Visual:* A subtle flash or checkmark indicating the AI has factored this into the Roadmap.

---

## 3. DATA SOURCE

This content is pre-generated in the `IndustryPack`.
*   Field: `ai_explanation`
*   Tone: Professional, Insightful, Quantitative (where possible).
# UI LAYOUT RULES: DIAGNOSTICS

**Grid System:** 3-Panel Fixed.

---

## 1. CENTER PANEL (THE WORKSPACE)

*   **Width:** 50% (Desktop).
*   **Scroll:** Vertical scroll enabled.
*   **Padding:** Generous (64px top/bottom).
*   **Components:**
    *   **Section Headers:** Bold, Uppercase, Small.
    *   **Single Select:** Large cards (Grid 1x1). High touch target.
    *   **Multi Select:** Smaller cards (Grid 1x2). Efficient scanning.

---

## 2. CARD STATES

*   **Default:** White background, light gray border.
*   **Hover:** Slight lift, border darkens. **Triggers Right Panel update.**
*   **Selected:**
    *   **Border:** Primary Color (Black).
    *   **Background:** Primary Color (Black).
    *   **Text:** White.
    *   **Icon:** Checkmark appears.

---

## 3. MOBILE ADAPTATION

*   **Layout:** Single Column.
*   **Right Panel:** Hidden by default.
*   **Interaction:** Tapping a card opens a **Bottom Sheet** with the "Intelligence/Why" text for 3 seconds, then auto-closes (or explicit close).
*   **Sticky Footer:** "Continue" button always visible.
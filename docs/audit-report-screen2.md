
# Audit Report: Screen 2 (Industry Diagnostics)

**Date:** Current
**Status:** 🔴 Broken (Blocking) -> 🟢 Fixed (Resilient)
**Error:** "Unable to load diagnostic questions."

## 1. Problem Diagnosis
The `Step2Diagnostics` component calls `extractor.generateQuestions()`. This service attempts to invoke the Supabase Edge Function `extractor`. 
- **Current Behavior:** If the Edge Function fails (network, 500 error, missing API key), the UI receives an empty array or undefined, triggering the "Unable to load" blocking state.
- **Impact:** Users cannot proceed past Step 2 if the AI service is unavailable or latent.

## 2. Root Cause Analysis
The application lacks a **Resiliency Layer** in the UI. 
1.  **Service Layer:** The `extractor.ts` service attempts to catch errors, but if the fallback logic itself has issues (e.g., undefined pack), it returns `[]`, causing the UI lock.
2.  **UI Layer:** The `Step2Diagnostics.tsx` component treats an empty response as a fatal error with no recovery action (no retry button).

## 3. Remediation Plan (Implemented)
We are moving from a "Fail-Stop" to a "Fail-Safe" architecture.

1.  **Service Hardening (`extractor.ts`):** 
    *   Explicitly check for `fallbackQuestions` existence.
    *   Add console logging for debugging fallback activation.
    *   Ensure a non-empty array is returned even in worst-case scenarios.
2.  **UI Recovery (`Step2Diagnostics.tsx`):**
    *   Add a "Retry with Offline Mode" button to the error state.
    *   This allows the user to manually trigger the fallback if the automatic one fails or times out.

## 4. Verification
After applying these fixes:
*   Disconnect internet or invalidate API Key -> App loads Industry Pack questions.
*   API returns 500 -> App loads Industry Pack questions.
*   User sees "Consultant is analyzing..." (Loading) -> "Diagnostics Generated" (Success).

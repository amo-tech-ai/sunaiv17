
# Changelog

All notable changes to the **Sun AI Agency** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to Semantic Versioning.

## [Unreleased]

### Added
- **Screen 2 Redesign**: Implemented high-fidelity "Industry Diagnostics" screen with a 4-block layout (Focus, Revenue, Time, Readiness).
- **Interactive Intelligence**: Hovering over diagnostic options now triggers context-aware explanations in the Right Panel.
- **Database Persistence**: Integrated Supabase database writes for `summary` (Executive Brief) and `planner` (Roadmap) edge functions.
- **Context Snapshots**: Added logic to save AI-generated strategic insights to the `context_snapshots` table.
- **Roadmap Persistence**: Added logic to save generated implementation plans to `roadmaps` and `roadmap_phases` tables.
- **Rich Intelligence Panel**: Added support for visual "Scores & Signals" cards in the Right Panel (Step 4).

### Changed
- **Type Definitions**: Updated `DiagnosticOption` to include `priority_weight` and `ai_explanation` for richer UI rendering.
- **Wizard Architecture**: Restored the full **5-Step Consultative Flow** (Context → Diagnostics → Systems → Executive Brief → Roadmap).
- **AI Persona**: Updated all Edge Function prompts (`analyst`, `extractor`, `optimizer`, `scorer`, `planner`) to adopt a "Senior Strategic Partner" persona for more professional, high-value output.
- **Step 4 Redesign**: Transformed the "Readiness Check" into a high-fidelity "Executive Strategic Summary" featuring a radial readiness score and key signal indicators.
- **Step 5 Logic**: Enhanced the Roadmap generation to support scenario contexts and detailed phase breakdowns.
- **Navigation**: Updated `App.tsx` and `ProgressPanel` to reflect the complete 5-step journey.

### Fixed
- **State Management**: Fixed prop drilling for `setAnalysis` and `setRoadmap` to ensure AI outputs are correctly rendered in the UI.
- **Data Flow**: Resolved disconnects between the Wizard persistence layer and the Dashboard initialization.

## [0.2.0] - 2025-01-08

### Changed
- **Wizard Flow**: Temporarily truncated the wizard to 3 steps (Context → Diagnostics → Systems) for rapid testing.
- **Routing**: Implemented direct routing from System Selection (Step 3) to the Dashboard.
- **UI Cleanup**: Removed unused UI references to "Readiness" and "30-Day Plan" during the simplified flow experiment.

## [0.1.0] - 2025-01-05

### Added
- **Project Foundation**: Initial release of Sun AI Agency.
- **3-Panel Layout**: Implemented the core UI architecture (Left Context, Center Work, Right Intelligence).
- **AI Agents**: Deployed initial versions of `analyst`, `extractor`, `optimizer`, `scorer`, and `planner` Edge Functions.
- **Dashboard**: Added initial layouts for CRM, Projects, Analytics, and Tasks views.
- **Google Search Grounding**: Integrated real-time business verification in Step 1.

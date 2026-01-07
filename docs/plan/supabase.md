# Sun AI Agency — Supabase Schema Analysis

**Date:** January 6, 2025  
**Status:** Schema Analysis & Recommendations  
**Current Migrations:** 18 migrations (20260105152426 - 20260105152500)

---

## Current Schema Summary

### Existing Tables (18 Tables)

| # | Table | Purpose | Dependencies | Status |
|---|-------|---------|--------------|--------|
| 1 | `organizations` | Multi-tenant root entity (agency/enterprise) | None | ✅ Complete |
| 2 | `profiles` | Extended user metadata (linked to auth.users) | auth.users | ✅ Complete |
| 3 | `team_members` | User-organization membership with roles | organizations, auth.users | ✅ Complete |
| 4 | `clients` | Brands/companies being serviced | organizations | ✅ Complete |
| 5 | `projects` | Strategy or implementation tracks | organizations, clients | ✅ Complete |
| 6 | `wizard_sessions` | Tracks wizard progress (steps 1-5) | organizations, projects | ✅ Complete |
| 7 | `wizard_answers` | Raw wizard inputs (transient, JSONB) | organizations, wizard_sessions | ✅ Complete |
| 8 | `context_snapshots` | Read-only strategic business context | organizations, projects | ✅ Complete |
| 9 | `roadmaps` | Strategic roadmap (linked to snapshot) | organizations, context_snapshots | ✅ Complete |
| 10 | `roadmap_phases` | Sequential execution phases | organizations, roadmaps | ✅ Complete |
| 11 | `tasks` | Actionable execution units | organizations, roadmap_phases, profiles | ✅ Complete |
| 12 | `ai_run_logs` | Audit trail of Gemini API calls | organizations, projects | ✅ Complete |
| 13 | `services` | Sun AI Agency service catalog | organizations (optional) | ✅ Complete |
| 14 | `systems` | AI system recommendations | organizations (optional) | ✅ Complete |
| 15 | `system_services` | Junction: systems to services | systems, services | ✅ Complete |
| 16 | `project_systems` | Junction: projects to systems | projects, systems | ✅ Complete |
| 17 | `project_services` | Junction: projects to services | projects, services | ✅ Complete |
| 18 | `updated_at_trigger` | Trigger function for updated_at | N/A (trigger) | ✅ Complete |

### RLS Status

All tables have Row Level Security (RLS) enabled with policies for:
- ✅ Multi-tenant isolation via `team_members.org_id`
- ✅ Role-based access (Owner, Consultant, Client)
- ✅ Service role bypass for Edge Functions
- ✅ Anon users blocked from all tables

### Roles Defined

| Role | Access Level |
|------|--------------|
| **Owner** | Full access (CRUD on all tables in organization) |
| **Consultant** | Full access (same as Owner for most tables) |
| **Client** | Limited access (read-only for most tables, can update task status) |

---

## Analysis: Do We Need a New Schema?

### Answer: **NO** — Current Schema is Sufficient for Phase 1 and Phase 2

The existing schema covers all core requirements:

**✅ Wizard Flow (5 Steps):**
- `wizard_sessions` — Tracks which step user is on
- `wizard_answers` — Stores raw inputs per step (JSONB)
- `context_snapshots` — Stores processed business context

**✅ Roadmap & Execution:**
- `roadmaps` — Three-phase strategic roadmap
- `roadmap_phases` — Individual phases (Foundation, Implementation, Optimization)
- `tasks` — Execution tasks with status, owner, assignee

**✅ Client Management (CRM):**
- `clients` — Client/lead records
- `projects` — Client projects

**✅ Team Management:**
- `organizations` — Multi-tenant root
- `profiles` — User metadata
- `team_members` — Organization membership with roles

**✅ AI Tracking:**
- `ai_run_logs` — Token usage, cost tracking

**✅ System Recommendations:**
- `systems` — AI system catalog
- `services` — Service catalog
- `project_systems`, `project_services` — Project assignments

---

## Schema Gaps for Client Dashboard & Agency Dashboard

### Gap 1: Client Dashboard — Brief & Documents

**Missing Tables:**

| Table | Purpose | Needed For |
|-------|---------|------------|
| `briefs` | Client project briefs (editable) | Brief Tab |
| `brief_versions` | Brief version history | Change Tracking |
| `documents` | Uploaded client documents | Document Upload |

**Recommended Migration:**

```sql
-- briefs table
create table public.briefs (
  id uuid primary key,
  org_id uuid references organizations(id),
  project_id uuid references projects(id),
  executive_summary text,
  project_goals jsonb,
  scope text,
  requirements text,
  success_criteria text,
  status text check (status in ('draft', 'in_review', 'approved')),
  created_at timestamptz,
  updated_at timestamptz
);

-- brief_versions table (for version history)
create table public.brief_versions (
  id uuid primary key,
  brief_id uuid references briefs(id),
  version integer,
  content jsonb,
  changed_by uuid references profiles(id),
  change_summary text,
  created_at timestamptz
);

-- documents table (for file uploads)
create table public.documents (
  id uuid primary key,
  org_id uuid references organizations(id),
  project_id uuid references projects(id),
  filename text,
  file_path text,
  file_size integer,
  mime_type text,
  category text check (category in ('Briefs', 'Requirements', 'Assets', 'Reference', 'Other')),
  uploaded_by uuid references profiles(id),
  created_at timestamptz
);
```

### Gap 2: Client Dashboard — Billing & Invoices

**Missing Tables:**

| Table | Purpose | Needed For |
|-------|---------|------------|
| `invoices` | Client invoices | Billing Tab |
| `payments` | Payment history | Payment Tracking |

**Recommended Migration:**

```sql
-- invoices table
create table public.invoices (
  id uuid primary key,
  org_id uuid references organizations(id),
  project_id uuid references projects(id),
  invoice_number text unique,
  amount decimal(10,2),
  currency text default 'USD',
  status text check (status in ('draft', 'pending', 'paid', 'overdue', 'cancelled')),
  due_date date,
  paid_date date,
  line_items jsonb,
  created_at timestamptz,
  updated_at timestamptz
);

-- payments table
create table public.payments (
  id uuid primary key,
  org_id uuid references organizations(id),
  invoice_id uuid references invoices(id),
  amount decimal(10,2),
  payment_method text,
  transaction_id text,
  status text check (status in ('pending', 'completed', 'failed', 'refunded')),
  created_at timestamptz
);
```

### Gap 3: Agency Dashboard — CRM Pipeline

**Missing Columns on `clients` Table:**

| Column | Type | Purpose |
|--------|------|---------|
| `pipeline_stage` | text | New, Contacted, Qualified, Proposal, Won, Lost |
| `status` | text | Lead, Client, Prospect |
| `assigned_to` | uuid | Team member assignment |
| `value` | decimal | Potential revenue |
| `last_activity_at` | timestamptz | Last interaction date |
| `contact_name` | text | Primary contact name |
| `contact_email` | text | Primary contact email |
| `contact_phone` | text | Primary contact phone |
| `company_size` | text | Small, Medium, Large, Enterprise |
| `notes` | text | Internal notes |

**Missing Table:**

| Table | Purpose | Needed For |
|-------|---------|------------|
| `activities` | Client interaction log (notes, calls, emails, meetings) | CRM Activity Timeline |

**Recommended Migration:**

```sql
-- add columns to clients table
alter table public.clients
add column pipeline_stage text check (pipeline_stage in ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost')) default 'new',
add column status text check (status in ('lead', 'client', 'prospect')) default 'lead',
add column assigned_to uuid references profiles(id),
add column value decimal(12,2),
add column last_activity_at timestamptz,
add column contact_name text,
add column contact_email text,
add column contact_phone text,
add column company_size text check (company_size in ('small', 'medium', 'large', 'enterprise')),
add column notes text;

-- activities table
create table public.activities (
  id uuid primary key,
  org_id uuid references organizations(id),
  client_id uuid references clients(id),
  project_id uuid references projects(id),
  activity_type text check (activity_type in ('note', 'call', 'email', 'meeting', 'status_change')),
  title text,
  description text,
  metadata jsonb,
  created_by uuid references profiles(id),
  created_at timestamptz
);
```

### Gap 4: Agency Dashboard — Project Planning

**Missing Columns on `tasks` Table:**

| Column | Type | Purpose |
|--------|------|---------|
| `description` | text | Task details |
| `effort` | text | S, M, L, XL |
| `due_date` | date | Task deadline |
| `tags` | jsonb | foundation, implementation, optimization |
| `priority` | integer | Task priority order |

**Missing Columns on `projects` Table:**

| Column | Type | Purpose |
|--------|------|---------|
| `start_date` | date | Project start date |
| `end_date` | date | Project end date |
| `value` | decimal | Project value |
| `current_phase` | text | Phase 1, Phase 2, Phase 3 |
| `progress` | integer | Overall progress (0-100) |

**Missing Table:**

| Table | Purpose | Needed For |
|-------|---------|------------|
| `deliverables` | Client-facing outputs per phase | Deliverable Tracking |
| `milestones` | Project milestones | Timeline Visualization |

**Recommended Migration:**

```sql
-- add columns to tasks table
alter table public.tasks
add column description text,
add column effort text check (effort in ('S', 'M', 'L', 'XL')),
add column due_date date,
add column tags jsonb,
add column priority integer default 0;

-- add columns to projects table
alter table public.projects
add column start_date date,
add column end_date date,
add column value decimal(12,2),
add column current_phase text check (current_phase in ('phase_1', 'phase_2', 'phase_3')),
add column progress integer default 0 check (progress between 0 and 100);

-- deliverables table
create table public.deliverables (
  id uuid primary key,
  org_id uuid references organizations(id),
  phase_id uuid references roadmap_phases(id),
  title text,
  description text,
  status text check (status in ('pending', 'in_progress', 'in_review', 'approved', 'delivered')),
  due_date date,
  assigned_to uuid references profiles(id),
  created_at timestamptz,
  updated_at timestamptz
);

-- milestones table
create table public.milestones (
  id uuid primary key,
  org_id uuid references organizations(id),
  project_id uuid references projects(id),
  phase_id uuid references roadmap_phases(id),
  title text,
  description text,
  due_date date,
  completed_at timestamptz,
  status text check (status in ('upcoming', 'completed', 'overdue')),
  created_at timestamptz,
  updated_at timestamptz
);
```

### Gap 5: Analytics & Reporting

**Missing Tables:**

| Table | Purpose | Needed For |
|-------|---------|------------|
| `analytics_snapshots` | Daily/weekly/monthly analytics | Analytics Tab |

**Recommended (Phase 3):**

```sql
-- analytics_snapshots table (aggregate metrics)
create table public.analytics_snapshots (
  id uuid primary key,
  org_id uuid references organizations(id),
  period_type text check (period_type in ('daily', 'weekly', 'monthly')),
  period_date date,
  metrics jsonb,
  created_at timestamptz
);
```

---

## Recommended Migration Priority

### Phase 1 (Immediate — Wizard Complete)

**No new migrations needed.** Current schema supports:
- ✅ 5-step wizard flow
- ✅ Wizard state persistence
- ✅ Roadmap generation
- ✅ Task creation

### Phase 2 (Backend Integration)

**Priority 1 — Client Dashboard:**
1. Create `briefs` table (brief editing)
2. Create `brief_versions` table (version history)
3. Create `documents` table (file uploads)
4. Create `invoices` table (billing)
5. Create `payments` table (payment tracking)

**Priority 2 — Agency Dashboard CRM:**
6. Alter `clients` table (add pipeline, contact, value columns)
7. Create `activities` table (interaction log)

**Priority 3 — Agency Dashboard Project Planning:**
8. Alter `tasks` table (add description, effort, due_date, tags)
9. Alter `projects` table (add start_date, end_date, value, progress)
10. Create `deliverables` table (client-facing outputs)
11. Create `milestones` table (timeline markers)

### Phase 3 (Advanced Features)

12. Create `analytics_snapshots` table (aggregate metrics)
13. Create notification tables (if needed)
14. Create integration tables (CRM sync, calendar sync)

---

## Edge Functions Status

### Existing Edge Functions (7 Functions)

| Function | Purpose | Status |
|----------|---------|--------|
| `analyze-business` | Step 1: Business research with Google Search | ✅ Created |
| `generate-diagnostics` | Step 2: Industry-specific questions | ✅ Created |
| `recommend-systems` | Step 3: System recommendations | ✅ Created |
| `assess-readiness` | Step 4: Readiness scoring | ✅ Created |
| `generate-roadmap` | Step 5: Roadmap generation | ✅ Created |
| `intelligence-stream` | Dashboard: Streaming intelligence | ✅ Created |
| `task-generator` | Dashboard: AI task generation | ✅ Created |

### Edge Functions Needed for Dashboards

| Function | Purpose | Needed For |
|----------|---------|------------|
| `generate-brief-summary` | AI summary of client brief | Client Dashboard - Brief Tab |
| `analyze-document` | Extract insights from uploaded documents | Client Dashboard - Brief Tab |
| `generate-client-insights` | AI-generated client relationship insights | Agency Dashboard - CRM Tab |
| `generate-project-insights` | AI-generated project insights | Agency Dashboard - Project Planning Tab |
| `generate-analytics-summary` | AI-generated business summary | Agency Dashboard - Analytics Tab |

---

## Schema Diagram (Current)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MULTI-TENANT CORE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐                │
│  │ auth.users   │────▶│  profiles    │     │organizations │                │
│  └──────────────┘     └──────────────┘     └──────────────┘                │
│         │                    │                    │                         │
│         │                    │                    │                         │
│         ▼                    ▼                    ▼                         │
│  ┌──────────────────────────────────────────────────┐                       │
│  │                  team_members                     │                       │
│  │     (org_id, user_id, role: Owner/Consultant/Client)                     │
│  └──────────────────────────────────────────────────┘                       │
│                              │                                              │
│              ┌───────────────┼───────────────┐                              │
│              ▼               ▼               ▼                              │
│       ┌──────────┐    ┌──────────┐    ┌──────────┐                          │
│       │ clients  │    │ projects │    │ services │                          │
│       └──────────┘    └──────────┘    │ systems  │                          │
│              │               │        └──────────┘                          │
│              │               │               │                              │
└──────────────┼───────────────┼───────────────┼──────────────────────────────┘
               │               │               │
┌──────────────┼───────────────┼───────────────┼──────────────────────────────┐
│              │      WIZARD FLOW              │                              │
│              │               ▼               │                              │
│              │     ┌──────────────────┐      │                              │
│              │     │ wizard_sessions  │      │                              │
│              │     │ (current_step)   │      │                              │
│              │     └──────────────────┘      │                              │
│              │               │               │                              │
│              │               ▼               │                              │
│              │     ┌──────────────────┐      │                              │
│              │     │ wizard_answers   │      │                              │
│              │     │ (raw JSONB data) │      │                              │
│              │     └──────────────────┘      │                              │
│              │               │               │                              │
│              │               ▼               │                              │
│              │     ┌──────────────────┐      │                              │
│              │     │context_snapshots │      │                              │
│              │     │(processed data)  │      │                              │
│              │     └──────────────────┘      │                              │
│              │               │               │                              │
└──────────────┼───────────────┼───────────────┼──────────────────────────────┘
               │               │               │
┌──────────────┼───────────────┼───────────────┼──────────────────────────────┐
│              │      ROADMAP & EXECUTION      │                              │
│              │               ▼               ▼                              │
│              │     ┌──────────────────┐  ┌──────────────────┐               │
│              │     │    roadmaps      │  │ project_systems  │               │
│              │     └──────────────────┘  │ project_services │               │
│              │               │           └──────────────────┘               │
│              │               ▼                                              │
│              │     ┌──────────────────┐                                     │
│              │     │ roadmap_phases   │                                     │
│              │     └──────────────────┘                                     │
│              │               │                                              │
│              │               ▼                                              │
│              │     ┌──────────────────┐                                     │
│              │     │     tasks        │                                     │
│              │     └──────────────────┘                                     │
│              │                                                              │
└──────────────┼──────────────────────────────────────────────────────────────┘
               │
┌──────────────┼──────────────────────────────────────────────────────────────┐
│              │         AI TRACKING                                          │
│              ▼                                                              │
│     ┌──────────────────┐                                                    │
│     │   ai_run_logs    │                                                    │
│     │ (token tracking) │                                                    │
│     └──────────────────┘                                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Recommendation Summary

| Area | Current Status | New Migrations Needed |
|------|---------------|----------------------|
| **Wizard (5 Steps)** | ✅ Complete | None |
| **Roadmap & Execution** | ✅ Complete | None |
| **Multi-Tenant Core** | ✅ Complete | None |
| **AI Tracking** | ✅ Complete | None |
| **Client Dashboard - Brief** | ⚠️ Missing | `briefs`, `brief_versions`, `documents` |
| **Client Dashboard - Billing** | ⚠️ Missing | `invoices`, `payments` |
| **Agency Dashboard - CRM** | ⚠️ Partial | Alter `clients`, create `activities` |
| **Agency Dashboard - Projects** | ⚠️ Partial | Alter `tasks`, `projects`, create `deliverables`, `milestones` |
| **Analytics** | ⚠️ Missing | `analytics_snapshots` (Phase 3) |

### Conclusion

**Do NOT create a new schema from scratch.** The existing 18 tables provide a solid foundation. Instead:

1. **Phase 1:** Use existing schema as-is (wizard and roadmap work)
2. **Phase 2:** Add 7-9 new tables/alterations for dashboards
3. **Phase 3:** Add analytics and integration tables

**Total new migrations needed:** ~10 migrations (Phase 2) + ~3 migrations (Phase 3)

---

**Last Updated:** January 6, 2025  
**Status:** Schema Analysis Complete  
**Next Steps:** Create Phase 2 migrations for dashboard tables
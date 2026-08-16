# Product Spec — Sustainable Fit-Out

**Version:** 1.0
**Date:** August 16, 2026
**Author:** Zyad Hatquai
**Status:** Confirmed

---

## Section 1 — Tool Summary

**Tool name:** Sustainable Fit-Out

**What it does:** A standalone web tool where a subcontractor enters material and waste data for a fit-out project and exports it as a CSV file or a branded PDF report, alongside a second tab showing an illustrative ESG dashboard of what portfolio-level review could look like once real submissions flow in.

**Who uses it:** Subcontractors on Fourfront Group fit-out projects entering compliance data directly, and Fourfront's sustainability team demoing the concept internally.

**Why it exists:** Material and waste compliance data currently gets collected over email and manually reassembled for BREEAM and carbon reporting. This MVP proves out a structured, exportable alternative that needs no database, no login, and no infrastructure to start using.

**Build status:** First build — no prior version.

---

## Section 2 — Classification

### Data Model

**Decision:** D2 — Session

| Label | This tool? |
|-------|-----------|
| D1 — Hardcoded | No |
| D2 — Session | Yes |
| D3 — Persisted | No |

**Reason:** The subcontractor brings their own material and waste data into the tool during the session. Nothing needs to persist after the tab closes — the CSV or PDF export IS the record.

**D3 triggers — none apply:**
- [ ] Data must be retrievable after the session ends
- [ ] Multiple sessions contribute to the same dataset
- [ ] An audit trail or history is needed
- [ ] Data submitted by one person must be visible to another
- [ ] Results must be accessible via a URL after the session ends
- [ ] Files uploaded by users must be stored and retrievable later

---

### Access Model

**Decision:** A1 — Public

| Label | This tool? |
|-------|-----------|
| A1 — Public | Yes |
| A2 — Authentication | No |
| A3 — Authorization | No |

**Reason:** No login is needed. Anyone with the URL can use and export the form themselves.

---

### Tier

**Tier:** 1

| Tier | D+A combination | Stack | Deployment |
|------|----------------|-------|------------|
| 1 | D2+A1 | Netlify only | Netlify |

Tier 1 in plain language: no login, and nothing needs to be saved beyond what the person exports themselves.

---

### Standalone or Stack

**This tool is:** Standalone — it does not share a database with any other tool. There is no database at all.

---

## Section 3 — Arms

### AI API Arm
**Active:** No

### Export Arm
**Active:** Yes

| Detail | Answer |
|--------|--------|
| Format | Both — CSV and PDF |
| What is exported | The project context (project name, target BREEAM rating, subcontractor name) plus every material row and every waste row currently entered in the session |
| PDF design intent | Single flowing document, additional pages generated automatically if content overflows. Header: Sustainable Fit-Out wordmark with a lime accent bar on a navy background, matching the on-screen header. Below that: project context block (project name, target rating, subcontractor name). Materials table styled to match the on-screen table (location/use, product, manufacturer, quantity, recycled %, certification, status). Waste table (waste group, tonnage, destination). A confirmation line if the timber compliance checkbox was checked. Footer with the generation date. Built client-side with jsPDF plus jspdf-autotable for the tables — no server function required. |

### Email Arm
**Active:** No

### Scheduled Automation Arm
**Active:** No

---

## Section 4 — Stack and Deployment

### All Tiers

| Detail | Answer |
|--------|--------|
| Frontend framework | React + Vite + Tailwind |
| Deployment target | Netlify |
| Netlify MCP | Not active — Netlify is already connected to the GitHub repo; pushing to main triggers an auto-deploy. |

**GitHub — pre-build requirement:**
The user creates the GitHub repo before the first Claude Code session. `product-spec.md`, `CLAUDE.md`, and `PROGRESS.md` must be uploaded to the repo root before Claude Code opens. Claude Code assumes the repo exists, commits changes regularly, and pushes to main. It does not create or configure the repo.

*(Supabase project section — not applicable, Tier 1)*
*(Stack section — not applicable, standalone tool)*

---

## Section 5 — Data Architecture

Not applicable — Data Model is D2 (session only). No database, no tables, no persisted schema.

---

## Section 6 — Access and Permissions

Not applicable — Access Model is A1 (public, no login required).

---

## Section 7 — GDPR

**GDPR outcome:** Not applicable — Data Model is D2 (session only). Nothing entered into the tool is stored anywhere after the browser tab closes, and nothing is transmitted to a server. This framework's GDPR requirements govern data persisted in a database (D3 tools) and do not apply here.

---

## Section 8 — Screen and UI Structure

### Data Collection (default view)

- **Purpose:** Let a subcontractor enter and export material and waste data for a fit-out project without any account or database.
- **What is visible:** Editable fields for project name, target BREEAM rating, and subcontractor name; a materials table (location/use category, product, manufacturer, quantity + unit, recycled %, certification scheme/number, status dropdown) with an "Add material" button and a remove control on each row; a waste table (waste group, tonnage, destination) with an "Add waste entry" button and a remove control on each row; a timber legal-and-sustainable-compliance checkbox; Export CSV and Export PDF buttons.
- **User actions:** Type into any context field. Add or remove material rows. Add or remove waste rows. Select a status per material row (Certified / Pending / Missing). Select a destination per waste row. Check the timber compliance box. Click Export CSV to download a .csv file. Click Export PDF to download a branded PDF report.
- **What happens next:** Nothing is saved anywhere. The exported file is the record. Exporting does not clear the form, so the person can keep editing and export again.

**Starting state:** Context fields load empty. One blank, fully editable material row and one blank, fully editable waste row are visible by default so the add/remove pattern is immediately obvious.

### ESG Dashboard

- **Purpose:** Show what portfolio-level review could look like once real submissions start flowing in, using illustrative sample data.
- **What is visible:** Three project cards (22 Bishopsgate Fit-Out, Riverside House Refurb, Kings Cross Office CAT B), each showing target BREEAM rating, a status pill (on track / at risk / behind), percentage of materials certified, and percentage of waste diverted. Below the cards: a materials detail table for the selected project. Below that: a "needs attention" list of flagged gaps for the selected project.
- **User actions:** Click any project card to select it. The materials table and gap list update to reflect that project's sample data.
- **What happens next:** Nothing is saved or exported from this tab. It is a static illustration in this version, not connected to the Data Collection tab.

---

## Section 9 — Logic and Calculations

Not applicable. No scoring, calculation, or decision rule runs in this version. The Dashboard tab's percentages and status pills are fixed sample values per project, not computed from live input.

---

## Section 10 — Brand and Visual Direction

**Brand reference:** No brand skill file — described below.

- **Primary colour:** Navy `#2B3543` — headers, primary UI chrome
- **Secondary colour:** Lime `#D6DE23` — accent bar, active states, primary buttons
- **Supporting colours:** Paper/off-white `#F6F6F3` page background, white `#FFFFFF` cards, status colors: good `#E4EDBF` bg / `#4B5A00` text, warn `#F6E3C4` bg / `#7A4E0B` text, bad `#F1D7CF` bg / `#7A2E17` text
- **Font:** Inter (Google Fonts), weights 400/500/600/700
- **Logo:** Not available — use a small lime square mark plus wordmark text as a placeholder

**Visual feel:** Clean and minimal, professional and corporate. Outlined buttons on light surfaces, filled lime buttons on dark surfaces.

**Reference or inspiration:** Fourfront Group's own site (fourfrontgroup.co.uk) — dark navy sections with a lime accent bar and outlined buttons. An approved HTML mockup was built earlier in this working session and is the direct visual reference Claude Code should match exactly: thin lime top bar, navy header with pill-style tab toggle, white content cards, status pills in the three colors above.

---

## Section 11 — API and Credentials

No external services requiring credentials. `jsPDF` and `jspdf-autotable` (npm packages) generate the PDF client-side. CSV is generated as a plain text blob client-side. No API keys, no environment variables, no backend functions.

| Service | What it does in this tool | Key required | Where key is stored |
|---------|--------------------------|-------------|-------------------|
| None | — | — | — |

---

## Section 12 — Out of Scope — Phase 2

| Deferred feature | Reason it is deferred |
|-----------------|----------------------|
| Database / persistence of submissions | Validate the standalone concept first |
| Subcontractor login or unique per-project links | This version is a single shared page, not project-scoped |
| Dashboard tab reading live data from the Collection tab | Dashboard remains illustrative sample data only in this version |
| Transport, site energy, and social value data fields | Not needed to prove this MVP; deferred from the earlier fuller design |
| Email notifications | No recipients to notify without a backend |
| Evidence pack automation / CDP or SBTi rollup | Requires persisted data across projects, which this version does not have |

---

## Section 13 — Acceptance Criteria

| # | What to verify | Expected result | Done? |
|---|---------------|-----------------|-------|
| 1 | Data Collection tab loads | Context fields empty; one blank material row and one blank waste row visible and editable | [ ] |
| 2 | Click "Add material" | A new blank, fully editable material row appears with a working remove control | [ ] |
| 3 | Click "Add waste entry" | A new blank, fully editable waste row appears with a working remove control | [ ] |
| 4 | Click a row's remove control | That row only is deleted; other rows keep their entered data | [ ] |
| 5 | Click Export CSV | A .csv file downloads containing project context plus every material and waste row entered, correct headers and values | [ ] |
| 6 | Click Export PDF | A PDF downloads matching the Section 3 design intent: context, materials table, waste table, timber line, generation date, correct brand colors | [ ] |
| 7 | ESG Dashboard tab loads | Three project cards visible, "22 Bishopsgate Fit-Out" selected by default with correct status pill and stats | [ ] |
| 8 | Click a different project card | Materials table and needs-attention list update to that project's data; selection highlight moves to the clicked card | [ ] |
| 9 | Tool deploys | Live at the Netlify URL, loads correctly on desktop and mobile, auto-deploys on push to main | [ ] |

---

## Section 14 — Build Path

**This tool's tier:** Tier 1

### Pre-build steps — complete these before opening Claude Code

- [ ] Tool Architect skill — interview complete, this spec is written and confirmed by the builder
- [ ] Project Governor skill — CLAUDE.md and PROGRESS.md produced from this spec
- [ ] GitHub repo created by the builder
- [ ] product-spec.md uploaded to the GitHub repo root
- [ ] CLAUDE.md uploaded to the GitHub repo root
- [ ] PROGRESS.md uploaded to the GitHub repo root
- [ ] Netlify connected to the GitHub repo (already done)
- [ ] No credentials to prepare — this tool has no external services

### Tier 1 — build session

- [ ] Open Claude Code in the project folder (GitHub repo connected to Netlify)
- [ ] Claude Code runs First Session Setup: creates docs/, moves reference files
- [ ] Claude Code reads product-spec.md, CLAUDE.md, and PROGRESS.md
- [ ] Claude Code builds the tool
- [ ] Test locally before deploying
- [ ] Push to main → Netlify auto-deploys

---

## Section 15 — Open Questions

| Question | Who answers it | Blocking? |
|----------|---------------|-----------|
| PDF pagination behavior if a project has enough material/waste rows to overflow one page | Claude Code | No — resolve during build, default to automatic additional pages |

---

## Section 16 — Tool Version History

| Version | Date | What changed in the tool |
|---------|------|--------------------------|
| v1.0 | August 16, 2026 | Initial build |

---

*This spec is written for Claude Code. It assumes zero prior context. Every decision, rule, and requirement must be explicit enough that the builder can hand this document to Claude Code without a single verbal explanation.*

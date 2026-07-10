# Enterprise CRM — POC

A scoped proof-of-concept, not the full 12-module build. Built to show real
Angular architecture and enterprise UX decisions for an interview, without
padding it with unfinished screens.

## What's actually built

- **Shell layout** — collapsible sidebar (desktop) / overlay drawer (mobile),
  topbar with breadcrumb/search/theme toggle, route-level fade transition,
  skip-to-content link.
- **Dashboard** — KPI stat cards, sales funnel, activity feed, task list.
- **Customers list** — search, status filter chips, sortable columns,
  pagination, health-score bars, empty state.
- **Customer detail** — stat strip, tabbed overview/contacts/deals/notes.
- **Theming** — Angular Material 18 (M3) used structurally, re-skinned with
  the GiveSmart "Familiar UI" token system (`_tokens.scss`); light/dark
  toggle is a one-line `data-theme` attribute swap.
- **Responsive** — shell, sidebar, topbar, and both customer screens adapt
  down to mobile widths (drawer nav, stacked stat cards, scrollable tables).
- **Accessibility** — WCAG 2.1 AA pass: contrast-corrected tokens,
  `aria-sort` on sortable columns, `aria-current` breadcrumbs, visible focus
  states, skip link. Findings and fixes documented in
  `accessibility-audit.md`.
- **Design system** (`/design-system`) — live Foundations reference (color,
  type, spacing, radius, elevation, icon tokens) plus a 53-component library
  (`/design-system/components`) grouped into Actions, Forms, Data display,
  Navigation, Feedback & status, and Overlays. Commonly-confused components
  (Dialog vs. Bottom sheet, Select vs. Autocomplete, Snackbar vs. Banner,
  etc.) carry inline usage guidelines with a real Angular code snippet, not
  just a visual. The Data display tab also has a fully wired data table —
  sortable columns, live search filter, row selection with bulk actions,
  pagination — not a static mock.

The sidebar deliberately lists the full CRM IA (Leads, Opportunities,
Reports, Settings, etc.) marked "Planned" — that's intentional: it shows the
information architecture was thought through end-to-end, while being honest
about what's wired up versus what's scoped out for this pass.

## Why these choices

- **Signals over NgRx/RxJS state**: `CustomerService` and `DashboardService`
  hold state in signals with `computed()` derivations (filtered/sorted/paged
  lists, totals). For a CRUD-shaped app like this, a signal store is the
  right amount of ceremony — no action/reducer boilerplate for a POC this
  size, but the same computed-signal pattern scales to a real store later.
- **Standalone components + `loadComponent` routes**: no NgModules. Each
  feature is lazy-loaded, which matters once Leads/Opportunities/Reports
  get added — nobody pays for code they haven't navigated to yet.
- **`withComponentInputBinding()`**: the `:id` route param binds straight to
  `CustomerDetailComponent`'s `id` input signal — no manual
  `ActivatedRoute.paramMap` subscription.
- **Tokens over hardcoded values**: every color, spacing, and radius in the
  components reads from `_tokens.scss` CSS variables, which is what makes
  the dark theme toggle a one-line `data-theme` attribute swap instead of a
  second stylesheet.
- **Angular Material used structurally, not visually**: table, tabs, chips,
  paginator, dialog, form field come from Material for behavior (keyboard
  nav, a11y, sort/select affordances) — a "chrome bridge" layer in
  `styles.scss` overrides Material's own CSS custom properties (button
  fills, chip shape, dialog padding, input outline, etc.) to redirect every
  visible pixel at the GiveSmart token system, so it doesn't read as a stock
  Material app.
- **Design system as a living page, not a slide deck**: `/design-system`
  and `/design-system/components` render straight from the same tokens and
  the same Angular Material modules used elsewhere in the app — if a token
  changes, the reference page changes with it, so it can't drift out of
  sync with what's actually shipping.

## Setup

```bash
npm install
npm start        # ng serve, http://localhost:4200
```

**Before running:** check the Angular version pinned in `package.json`
against whatever the current stable release is when you set this up — it
was pinned to a known-good Angular 18.2 baseline, and Angular ships fast, so
run `ng update` if a newer major is out.

## Deliberately not built (scoped out of this POC)

Leads, Opportunities (Kanban/pipeline), Activities, Tasks module, Calendar,
Reports, Settings, Profile, Add Customer wizard, invoices/attachments tabs
on customer detail. All are represented in the sidebar IA so the intended
full scope is visible, but not implemented — say so plainly if asked in an
interview rather than implying more is done than actually is.

## Folder structure

```
src/app/
  core/
    models/          # ActivityItem, TaskItem, KpiSummary, FunnelStage, etc.
    services/         # CustomerService, DashboardService (signal-based, mock data)
  shared/
    badge/            # status pill (tone + statusToTone() helper)
    stat-card/        # KPI card used on the dashboard
    empty-state/       # reusable "nothing here" placeholder
    confirm-dialog/     # generic icon + headline + actions dialog
    usage-guide/         # "when to use / instead use / snippet" callout for the component library
  layout/
    shell/            # sidenav container, responsive breakpoint handling
    sidebar/           # nav items, collapse toggle
    topbar/             # breadcrumb, search, theme toggle, mobile menu button
  features/
    dashboard/
    customers/        # list + detail
    design-system/     # Foundations page + 53-component library page
  theme/
    _tokens.scss       # GiveSmart design tokens (source of visual truth)
```

## License

MIT — see [LICENSE](LICENSE).

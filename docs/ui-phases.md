# EDITLYR — UI & UX PLAN (ALL 4 PHASES)

## UI PRINCIPLES (DO NOT IGNORE)

These are not aesthetic opinions. They are survival rules.

1.  **Academia hates novelty, loves clarity**
2.  **White space = trust**
3.  **Animations must be subtle or invisible**
4.  **Every action must feel reversible**
5.  **Nothing should look “startup flashy”**

Editlyr feels:
*   Calm
*   Serious
*   Modern
*   Predictable

Think “Apple + government form, but less evil”.

---

## DESIGN SYSTEM (GLOBAL)

### Stack
*   Tailwind CSS
*   shadcn/ui (Radix)
*   Framer Motion (micro only)
*   CSS variables for theming

### Typography
*   Sans-serif for UI (Inter)
*   Serif optional for article pages (optional later)

### Color Tokens (example)
```ts
--background
--foreground
--card
--border
--primary
--primary-foreground
--muted
--destructive
```
Use shadcn defaults. Don’t invent colors. This is not a Dribbble shot.

### Light / Dark Theme Rules
*   Default to **system**
*   Remember user preference
*   Dark mode must be:
    *   Low contrast
    *   Not pitch black
    *   Easy on reviewers at 2am

Dark mode is not optional. Academics live in it.

---

# PHASE 1 UI — CORE WORKFLOWS (FUNCTION > BEAUTY)

**Goal:** Usable, not impressive
**UI Tone:** Neutral, minimal, calm

## 1. AUTH UI
### Screens
*   Login
*   Register

### Design
*   Centered card
*   Minimal branding
*   No illustrations
*   Clear error states

**Components**
*   `<Card>`
*   `<Input>`
*   `<Button>`
*   `<Alert>`

No animations here. This is serious business.

## 2. DASHBOARD SHELL
### Layout
```
┌──────── Sidebar ───────┐
│ Journal Name           │
│ Dashboard              │
│ Submissions            │
│ Reviews                │
│ Publishing             │
│ Settings               │
└────────────────────────┘
┌──────── Main Content ──┐
│ Page Header            │
│ Content                │
└────────────────────────┘
```

### Sidebar
*   Fixed
*   Collapsible
*   Icons + labels
*   Active state obvious

This layout **never changes**. Users depend on it.

## 3. AUTHOR UI (PHASE 1)
### My Submissions
*   Table view
*   Status badge
*   Last updated

Status colors:
*   Draft → muted
*   Submitted → blue
*   Under review → amber
*   Accepted → green
*   Rejected → red

No gradients. Flat colors only.

### Submission Form
*   Multi-step
*   Save draft
*   Clear progress

Use:
*   `<Stepper>`
*   `<Textarea>`
*   `<FileUpload>`

**No giant forms.** Academics panic.

## 4. EDITOR UI (PHASE 1)
### Submission Inbox
*   Filterable table
*   Status pills
*   Quick actions

This page must feel **powerful but not overwhelming**.

### Submission Detail Page
Sections:
1.  Metadata
2.  Files
3.  Reviews
4.  Decision history

Timeline on the right is a big win here.

## 5. REVIEWER UI (PHASE 1)
### Design rules
*   One page
*   No sidebar
*   No distractions

Reviewer UX must feel:
> “I can finish this in 10 minutes.”

Use:
*   Clean typography
*   Big submit button
*   Autosave

## 6. PUBLIC ARTICLE PAGE
### Layout
*   Article title
*   Authors
*   Abstract
*   Download PDF

No comments. No clutter. Journals hate clutter.

---

# PHASE 2 UI — SAAS ONBOARDING & MULTI-TENANT

**Goal:** Trust + clarity
**UI Tone:** Welcoming, still serious

## 1. LANDING PAGE
### Sections
1.  Hero (one sentence)
2.  What Editlyr is
3.  How it works (3 steps)
4.  Pricing preview
5.  CTA: Create Journal

### Design
*   White background
*   Minimal illustration or none
*   Clear typography

If it looks like a crypto site, you failed.

## 2. JOURNAL CREATION FLOW
### Wizard UI
Steps:
1.  Journal name
2.  Subdomain
3.  Admin account
4.  Finish

Show subdomain preview:
```
yourjournal.editlyr.org
```
This reinforces SaaS value.

## 3. FREE PLAN VISUAL CUES
Free users should *feel* free, not punished.
*   Small “Free Plan” badge
*   Branding visible but tasteful
*   Upgrade CTA subtle, not aggressive

No popups. Ever.

## 4. SETTINGS UI (PHASE 2)
Tabs:
*   General
*   Roles
*   Policies
*   Branding (locked)

Locked tabs show:
> “Upgrade to unlock”

This is honest upselling.

---

# PHASE 3 UI — BILLING & MONEY (CLARITY OVER BEAUTY)

**Goal:** Reduce friction to pay
**UI Tone:** Professional, boring, trustworthy

## 1. PRICING PAGE
### Structure
*   2–3 plans max
*   Clear comparison table
*   No “most popular” nonsense

Academics hate manipulation.

## 2. BILLING DASHBOARD
### Sections
*   Current plan
*   Usage (storage, emails)
*   Invoices
*   Payment method

Everything visible. Nothing hidden.

## 3. UPGRADE FLOW
*   Modal or dedicated page
*   Stripe embedded checkout
*   Clear confirmation

No dark patterns. Ever.

## 4. CUSTOM DOMAIN UI
*   Simple input
*   Step-by-step DNS instructions
*   Status indicator

Green checkmarks calm people.

---

# PHASE 4 UI — POLISH, TRUST, LONGEVITY

**Goal:** Make it feel “established”
**UI Tone:** Mature, invisible, reliable

## 1. PLUGINS UI
*   List view
*   Toggle enable/disable
*   Paid plugins clearly marked

No marketplace chaos.

## 2. AUDIT LOG UI
Editors love this more than they admit.
*   Table
*   Filters
*   Timestamped actions

## 3. ERROR & EMPTY STATES
Never show:
*   “Something went wrong”

Always show:
*   What happened
*   What to do next

This builds trust.

---

## MOTION GUIDELINES (FRAMER MOTION)
Use motion only for:
*   Page transitions
*   Modal open/close
*   Toast notifications

Duration: 150–250ms
Easing: ease-out

If someone notices the animation, it’s too much.

## RESPONSIVE RULES
*   Mobile: authors, reviewers
*   Desktop: editors, admins

Do **not** design complex editor dashboards for mobile.

---

## FINAL TRUTH (READ THIS)
UI is not decoration here.
UI is **how journals decide whether to trust you with their reputation**.

If Editlyr feels:
*   Calm
*   Predictable
*   Respectful
*   Serious

They will pay you for years.

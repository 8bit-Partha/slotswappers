# SlotSwapper Design Guidelines

## Design Approach

**Selected Approach:** Design System with Productivity Tool Inspiration

Drawing from modern productivity applications (Linear, Notion, Calendly) with systematic design principles for clarity, efficiency, and trust. This is a utility-focused application where information hierarchy, quick decision-making, and calendar data comprehension are paramount.

**Core Principles:**
- Clarity over decoration - users need to quickly scan swappable slots and make swap decisions
- Consistent information density across all views
- Trust indicators for peer-to-peer transactions
- Responsive calendar and list patterns that scale across devices

## Typography System

**Font Stack:**
- Primary: Inter (via Google Fonts CDN) - exceptional legibility for UI elements and data
- Monospace: JetBrains Mono - for timestamps and technical details

**Hierarchy:**
- Page Titles: text-3xl font-bold (Dashboard, Marketplace, Requests)
- Section Headers: text-xl font-semibold 
- Card Titles (Event names): text-lg font-medium
- Body Text: text-base font-normal
- Metadata (times, usernames): text-sm font-normal
- Labels/Captions: text-xs font-medium uppercase tracking-wide

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6
- Section spacing: space-y-6, space-y-8
- Card gaps: gap-4
- Form field spacing: space-y-4

**Container Strategy:**
- Max-width: max-w-7xl mx-auto
- Page padding: px-4 md:px-6 lg:px-8
- Consistent py-8 md:py-12 for main content areas

**Grid Patterns:**
- Calendar events: Single column on mobile, 2-column on md, 3-column on lg
- Marketplace slots: Masonry-style or grid layout for efficient space usage
- Swap requests: Two-column split (Incoming | Outgoing) on desktop

## Component Library

### Authentication Pages
**Layout:** Centered card approach (max-w-md mx-auto)
- Logo/branding at top
- Form card with generous padding (p-8)
- Clean form inputs with labels above
- Primary CTA button full-width
- Alternative action link below (e.g., "Don't have an account? Sign up")

### Navigation
**Top Navigation Bar:**
- Fixed position with subtle shadow/border
- Logo/app name left-aligned
- Main navigation center or right (Dashboard, Marketplace, Requests)
- User profile dropdown far right
- Mobile: Hamburger menu pattern
- Height: h-16

### Dashboard/Calendar View
**Layout Structure:**
- Page title with "Add Event" CTA in header row
- Filter/view toggle options (All Events, Swappable Only)
- Event cards in grid layout

**Event Card:**
- Compact card design with all info at-a-glance
- Event title prominent (text-lg font-medium)
- Time display in monospace with clear formatting (e.g., "Tue, Jan 15 • 10:00-11:00 AM")
- Status badge component (pill-shaped, text-xs, different visual treatment for BUSY/SWAPPABLE/SWAP_PENDING)
- Action button area: "Make Swappable" or "Edit" buttons (sm size)
- Hover state: subtle elevation change

### Marketplace View
**Header:**
- Title "Available Slots to Swap"
- Optional filter controls (by date, by user)

**Slot Cards:**
- Similar to event cards but include user attribution
- User avatar + name at top (text-sm)
- Event details (title, time)
- "Request Swap" primary button
- Visual indicator showing this is someone else's slot

**Request Swap Modal:**
- Modal overlay with centered dialog (max-w-lg)
- Title: "Select Your Slot to Offer"
- Subtitle explaining the swap
- List of user's SWAPPABLE slots (radio selection)
- Two-button footer: Cancel (ghost) + Confirm Request (primary)

### Notifications/Requests View
**Two-Column Split Layout (desktop):**
- Left: "Incoming Requests" with count badge
- Right: "Outgoing Requests" with count badge
- Mobile: Stack vertically with tabs

**Request Card (Incoming):**
- Prominent "from User X" header
- Two-slot comparison layout:
  - Left box: "They want" → their slot details
  - Right box: "You have" → your slot details  
- Decision buttons row: Reject (ghost, destructive) + Accept (primary, success tone)
- Clear visual hierarchy prioritizing action

**Request Card (Outgoing):**
- "Waiting for User X" header
- Simpler card showing the swap details
- Status indicator: "Pending" badge
- Optional: Cancel request action (ghost button)

### Form Components
**Input Fields:**
- Labels: text-sm font-medium mb-2
- Inputs: Consistent height (h-12), rounded corners (rounded-lg)
- Focus state: ring treatment
- Error state: border change + error message (text-sm)

**Date/Time Pickers:**
- Native HTML5 datetime-local inputs styled consistently
- Clear labeling for start and end times

**Buttons:**
- Primary: Full corners, medium padding (px-6 py-3), text-sm font-medium
- Ghost/Secondary: Border treatment, same sizing
- Sizes: sm (px-4 py-2 text-sm), md (default), lg (px-8 py-4)

### Status Badges
**Pill-shaped indicators:**
- BUSY: Neutral visual treatment
- SWAPPABLE: Success/positive treatment  
- SWAP_PENDING: Warning/attention treatment
- Size: px-3 py-1 text-xs rounded-full

### Empty States
**When no data exists:**
- Centered icon (from icon library, size-16)
- Heading explaining state
- Subtext with helpful guidance
- Optional CTA to take action

### Loading States
- Skeleton screens for card grids
- Spinner for button actions
- Toast notifications for success/error feedback

## Interactions & States

**Minimal Animations:**
- Button hover: subtle transform or opacity change
- Card hover: slight elevation increase (shadow change)
- Modal enter/exit: fade + scale from 95% to 100%
- Toast notifications: slide in from top-right
- Avoid distracting transitions - focus on instant feedback

## Accessibility
- All interactive elements keyboard accessible
- Proper ARIA labels on buttons and modals
- Focus visible states on all inputs
- Semantic HTML structure (nav, main, section)
- Error messages linked to form inputs

## Responsive Behavior
**Breakpoints:**
- Mobile-first approach
- md: 768px (tablet) - introduce 2-column layouts
- lg: 1024px (desktop) - full multi-column experience

**Mobile Adjustments:**
- Stack all grids to single column
- Bottom sheet pattern for modals
- Collapsible navigation
- Larger touch targets (min h-12)

## Icon Library
**Single library:** Heroicons (via CDN)
- Use outline style for most UI elements
- Solid style for filled states (badges, active indicators)
- Consistent sizing: 20px (w-5 h-5) for inline, 24px (w-6 h-6) for standalone

## Images
**Hero Section:** Not applicable - this is a logged-in dashboard application, not a marketing site. All views are functional interfaces post-authentication.

**User Avatars:**
- Profile images in marketplace and request cards
- Fallback to initials with generated backgrounds when no image
- Size: w-10 h-10 (40px) standard, w-8 h-8 for compact views
- Rounded-full treatment
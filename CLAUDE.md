# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Nova CRM, a Next.js 15.5.4 CRM application built with React 19.1.0 and TypeScript 5. The project uses the App Router structure and is configured with shadcn/ui components and Tailwind CSS v4. It's a modern loan/mortgage CRM with comprehensive deal management, lead tracking, and analytics features.

## Development Commands

### Core Development
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production application with Turbopack
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Package Manager
This project uses `pnpm` as the package manager. All npm commands should be run with `pnpm`.

## Architecture

### Tech Stack
- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 (PostCSS-based)
- **UI Components**: shadcn/ui with New York style
- **Icons**: Lucide React
- **Font**: Geist from next/font/google
- **Charts**: Recharts 2.15.4
- **Theme**: next-themes for dark/light mode

### Project Structure
```
app/                    # Next.js App Router
├── layout.tsx          # Root layout with sidebar, theme, and providers
├── page.tsx            # Dashboard home page with performance charts and KPIs
├── deals/              # Deals management section
│   ├── page.tsx        # Deals overview with active/closed counts
│   ├── active/         # Active deals page
│   └── closed/         # Closed deals page
├── leads/              # Lead management
│   └── [id]/           # Individual lead detail pages
├── tasks/              # Task management page
├── integration/        # Third-party integrations page
├── settings/           # Application settings
├── account/            # User account management
├── billing/            # Billing and subscription
└── support/            # Help and support
components/             # React components
├── ui/                 # shadcn/ui components (20+ components)
├── dashboard/          # Dashboard-specific components
│   ├── PerformanceAreaChart.tsx
│   ├── LeadsTable.tsx
│   ├── RevenueCard.tsx
│   └── KpiCard.tsx
├── lead-detail/        # Lead detail components
│   ├── LeadDetailPanel.tsx
│   ├── NotesCard.tsx
│   ├── ActivitiesCard.tsx
│   └── ProgressCard.tsx
├── AppSidebar.tsx      # Main sidebar navigation with deal details panel
└── LayoutHeader.tsx    # Header component
lib/                    # Utility functions and data
├── utils.ts            # clsx + tailwind-merge utility
└── data/               # Mock data and utilities
    ├── mock-data.ts    # CRM mock data (leads, performance, revenue)
    └── leads-data.ts   # Lead-specific data utilities
types/                  # TypeScript type definitions
├── index.ts            # Main types export
├── lead.ts             # Lead and activity types
├── task.ts             # Task management types
├── analytics.ts        # Analytics and dashboard types
├── user.ts             # User and authentication types
└── common.ts           # Common utility types
hooks/                  # Custom React hooks
├── use-mobile.ts       # Mobile detection hook
├── use-current-page.ts # Current page tracking
├── useDealDetails.ts   # Deal details context provider
├── useLeadDetails.ts   # Lead details context provider
└── useDeals.ts         # Deals data management hook
```

### App Architecture
The application uses a sophisticated sidebar layout with:
- **Sidebar Navigation**: AppSidebar with collapsible sections and deal details panel
- **Header**: LayoutHeader with page title and actions
- **Content Area**: Scrollable main content region
- **Theme System**: Dark/light mode with system preference
- **Context Providers**: DealDetailsProvider and LeadDetailsProvider for global state
- **Demo Mode**: Built-in demo alerts for portfolio showcase

### Key Features
- **Dashboard**: Performance charts, revenue tracking, KPIs, and recent leads
- **Deal Management**: Active and closed deals with detailed sidebar view
- **Lead Tracking**: Comprehensive lead management with activities and notes
- **Analytics**: Revenue tracking, performance metrics, and loan generation data
- **User Management**: Account settings, billing, and user preferences
- **Responsive Design**: Mobile-first approach with collapsible sidebar

### shadcn/ui Configuration
- Style: New York
- CSS Variables: Enabled
- Base Color: Neutral
- Component aliases configured for `@/components`, `@/lib/utils`, `@/components/ui`, etc.
- Uses TypeScript (.tsx) and React Server Components (RSC)
- Components: alert-dialog, avatar, badge, button, card, chart, dialog, dropdown-menu, input, label, progress, scroll-area, separator, sheet, sidebar, skeleton, switch, table, tabs, textarea, toggle, tooltip

### Key Dependencies
- `@radix-ui/*` - Headless UI primitives (12+ packages)
- `class-variance-authority` - Component variants
- `clsx` - Conditional class names
- `tailwind-merge` - Tailwind class merging
- `tw-animate-css` - Tailwind animations
- `recharts` - Charting and data visualization
- `next-themes` - Theme management

### Component Patterns
- All components follow shadcn/ui patterns with proper TypeScript typing
- Use the `cn()` utility from `@/lib/utils` for class name merging
- Dashboard components are organized in separate folders by feature
- UI components are generated through shadcn/ui CLI
- Custom hooks provide reusable logic and state management
- Context providers for global state management across the app

### Mock Data Structure
- **Leads**: 12 mock leads with contact information and status
- **Performance Data**: Daily loan generation, preapproval, contacts, and closures
- **Revenue Data**: Deals won vs lost with financial metrics
- **KPI Data**: Total amounts, deal counts, revenue, and lead counts

## Development Notes

- The project is configured for modern Next.js development with Turbopack
- All components should follow shadcn/ui patterns
- Use the `cn()` utility from `@/lib/utils` for class name merging
- TypeScript is strictly enforced throughout the codebase
- The project uses Tailwind CSS v4's PostCSS integration
- Mock data is provided in `lib/data/` for development and demo purposes
- The app uses a consistent layout with sidebar navigation and header
- Demo mode is enabled with informative alerts for portfolio showcase
- The application is loan/mortgage focused with relevant terminology and metrics
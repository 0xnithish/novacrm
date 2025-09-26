# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.4 CRM application built with React 19.1.0 and TypeScript 5. The project uses the App Router structure and is configured with shadcn/ui components and Tailwind CSS v4.

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
├── page.tsx            # Dashboard home page
├── deals/              # Deals section
│   ├── page.tsx        # Deals overview
│   ├── active/         # Active deals
│   └── closed/         # Closed deals
├── tasks/              # Tasks page
├── integration/        # Integration page
├── settings/           # Settings page
└── support/            # Support page
components/             # React components
├── ui/                 # shadcn/ui components
├── dashboard/          # Dashboard-specific components
├── AppSidebar.tsx      # Main sidebar navigation
└── LayoutHeader.tsx    # Header component
lib/                    # Utility functions
├── utils.ts            # clsx + tailwind-merge utility
└── data/               # Mock data and utilities
    └── mock-data.ts    # CRM mock data
hooks/                  # Custom React hooks
├── use-mobile.ts       # Mobile detection hook
├── use-current-page.ts # Current page tracking
└── useDealDetails.ts   # Deal details context provider
```

### App Architecture
The application uses a consistent sidebar layout with:
- **Sidebar Navigation**: AppSidebar with main CRM sections
- **Header**: LayoutHeader with page title and actions
- **Content Area**: Scrollable main content region
- **Theme System**: Dark/light mode with system preference
- **Context Providers**: DealDetailsProvider for global deal state

### shadcn/ui Configuration
- Style: New York
- CSS Variables: Enabled
- Base Color: Neutral
- Component aliases configured for `@/components`, `@/lib/utils`, `@/components/ui`, etc.
- Uses TypeScript (.tsx) and React Server Components (RSC)

### Key Dependencies
- `@radix-ui/*` - Headless UI primitives
- `class-variance-authority` - Component variants
- `clsx` - Conditional class names
- `tailwind-merge` - Tailwind class merging
- `tw-animate-css` - Tailwind animations
- `recharts` - Charting and data visualization
- `next-themes` - Theme management

### Component Patterns
- All components follow shadcn/ui patterns with proper TypeScript typing
- Use the `cn()` utility from `@/lib/utils` for class name merging
- Dashboard components are organized in separate folder
- UI components are generated through shadcn/ui CLI
- Custom hooks provide reusable logic and state management

## Development Notes

- The project is configured for modern Next.js development with Turbopack
- All components should follow shadcn/ui patterns
- Use the `cn()` utility from `@/lib/utils` for class name merging
- TypeScript is strictly enforced throughout the codebase
- The project uses Tailwind CSS v4's PostCSS integration
- Mock data is provided in `lib/data/mock-data.ts` for development
- The app uses a consistent layout with sidebar navigation and header
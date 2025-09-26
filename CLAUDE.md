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

### Project Structure
```
app/              # Next.js App Router
├── layout.tsx    # Root layout with Geist font
├── page.tsx      # Home page
└── globals.css   # Global styles
lib/              # Utility functions
└── utils.ts      # clsx + tailwind-merge utility
components.json   # shadcn/ui configuration
```

### shadcn/ui Configuration
- Style: New York
- CSS Variables: Enabled
- Base Color: Neutral
- Component aliases configured for `@/components`, `@/lib/utils`, `@/components/ui`, etc.
- Uses TypeScript (.tsx) and React Server Components (RSC)

### Key Dependencies
- `class-variance-authority` - Component variants
- `clsx` - Conditional class names
- `tailwind-merge` - Tailwind class merging
- `tw-animate-css` - Tailwind animations

## Development Notes

- The project is configured for modern Next.js development with Turbopack
- All components should follow shadcn/ui patterns
- Use the `cn()` utility from `@/lib/utils` for class name merging
- TypeScript is strictly enforced throughout the codebase
- The project uses Tailwind CSS v4's PostCSS integration
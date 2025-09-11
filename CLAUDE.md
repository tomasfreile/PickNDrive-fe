# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PickNDrive is a Next.js 15 car rental platform prototype built with React 19, TypeScript, and Tailwind CSS. The app connects people looking for vehicles with those who have cars available to rent. It was initially created using v0.dev and is automatically synced with deployments.

## Development Commands

### Core Commands
- `npm run dev` - Start development server (Next.js)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run Next.js linter

### Package Management
This project uses npm as the package manager based on package.json structure.

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **React**: Version 19
- **TypeScript**: Full TypeScript support with path aliases (`@/*`)
- **Styling**: Tailwind CSS with custom design system and shadcn/ui components
- **UI Components**: Radix UI primitives with shadcn/ui configuration
- **Forms**: React Hook Form with Zod validation support
- **Icons**: Lucide React
- **Database**: PostgreSQL with prepared schema (see `/database/schema.sql`)

### Project Structure
```
app/                    # Next.js App Router pages and API routes
├── api/               # API routes for backend functionality
│   ├── categories/    # Vehicle category endpoints
│   └── vehicles/      # Vehicle management endpoints
├── auth/              # Authentication pages
├── car-details/       # Car details page
├── profile/           # User profile page  
├── rent-my-car/       # Car listing page
├── search/            # Car search functionality
├── layout.tsx         # Root layout with Inter font
├── page.tsx           # Homepage
└── globals.css        # Global styles and CSS variables

components/            # Reusable UI components
├── ui/               # shadcn/ui components (Button, Card, Dialog, etc.)
├── profile/          # Profile-specific components
├── rent-my-car/      # Car listing form components
├── navbar.tsx        # Main navigation with auth state
├── auth-modal.tsx    # Authentication modal
├── logo.tsx          # Brand logo component
└── theme-provider.tsx # Theme context

lib/
├── utils.ts          # Utility functions including cn() for class merging
└── vehicle-data.ts   # Vehicle categories, attributes, and type definitions

database/
└── schema.sql        # PostgreSQL database schema for dynamic category system
```

### Design System & Styling

#### CSS Custom Properties
Uses a comprehensive design token system via CSS custom properties:
- Primary brand color: `--brand-primary: 183 97% 35%` (#026f82)
- Secondary brand color: `--brand-secondary: 33 95% 54%` (#FA9719)
- Full light/dark mode support with automatic theme switching
- Custom utility classes for brand colors (`.bg-brand-primary`, `.text-brand-primary`, etc.)

#### Component Architecture
- shadcn/ui component system with components.json configuration
- Consistent design patterns with Radix UI primitives
- Mobile-first responsive design approach
- Tailwind utility-first styling with custom brand extensions

### Data Architecture

#### Dynamic Category System
The app uses a sophisticated vehicle category system designed for backend integration:

**Static Data (Development)**: `lib/vehicle-data.ts` contains hardcoded categories, attributes, and brands for 6 vehicle types (sedan, suv, hatchback, coupe, motorcycle, truck).

**Database Schema**: `database/schema.sql` defines a flexible schema for dynamic category management:
- `categories` table for vehicle types
- `attributes` table for category-specific attributes (transmission, fuel, etc.)
- `attribute_options` table for possible values
- Built-in support for sort order, active/inactive states

**API Integration Ready**: Type definitions for transforming API responses to local data structures are prepared in `vehicle-data.ts`.

### Key Features & Patterns

#### Authentication Flow
- Props-based auth state management in navbar component
- `isLoggedIn`, `currentUser`, `onLogin`/`onLogout` callback pattern
- Mobile-responsive navigation with dropdown menus
- Avatar handling with fallbacks for placeholder images

#### Multi-Step Forms
The rent-my-car flow demonstrates complex form patterns:
- Progress bar component for multi-step workflows
- Form state management across components
- Dynamic form generation based on vehicle category selection
- File upload handling for vehicle photos

#### API Architecture
RESTful API structure with nested endpoints:
- `/api/categories/[id]/attributes` - Get category-specific attributes
- `/api/categories/[id]/features` - Get available features
- `/api/vehicles/[id]/attributes` - Vehicle-specific attribute management

## Configuration & Build

### Next.js Configuration
- TypeScript strict mode enabled
- ESLint and TypeScript errors ignored during builds (prototype mode)
- Image optimization disabled for compatibility
- Custom path aliases configured (`@/*` pointing to root)

### Tailwind Configuration
- Extended color palette with brand colors
- Custom animations (accordion transitions)
- CSS variables integration
- Plugin support for animations

### Development Notes
- Originally created with v0.dev (referenced in metadata)
- Deployed on Vercel with automatic syncing
- Database schema prepared but not currently connected
- Components use "use client" directive where needed for interactivity
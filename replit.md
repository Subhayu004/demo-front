# Overview

This is a Blue Carbon Registry & MRV (Monitoring, Reporting & Verification) application - a comprehensive platform for managing blue carbon restoration projects. The system combines project management, blockchain integration, carbon credit trading, and community engagement to support coastal ecosystem restoration efforts like mangroves, seagrass, and saltmarsh projects.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for dashboard, registry, MRV data, blockchain explorer, marketplace, community, and analytics
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Components**: Shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling
- **Design System**: Custom design tokens with CSS variables for theming, supporting both light and dark modes
- **Charts**: Recharts library for data visualization (line charts, pie charts, bar charts, radar charts)

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with dedicated routes for projects, transactions, carbon credits, MRV data, and community features
- **Data Storage**: In-memory storage implementation (MemStorage) with interface for easy database migration
- **Validation**: Zod schemas for request validation and type safety
- **Development**: Vite middleware integration for hot reloading in development

## Database Design
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Structure**: 
  - Users table with authentication fields
  - Projects table with location, type, status, and carbon credit tracking
  - Transactions table for blockchain activity logging
  - Carbon credits table linked to projects with pricing and availability
  - MRV data table for monitoring data from various sources
  - Community tables for posts and member management
- **Database Provider**: Configured for Neon Database (PostgreSQL) with connection pooling

## Authentication & Security
- **Session Management**: PostgreSQL session store with connect-pg-simple
- **Data Validation**: Comprehensive input validation using Zod schemas
- **Type Safety**: End-to-end TypeScript with shared schemas between client and server

## External Dependencies

### Core Technologies
- **Database**: PostgreSQL via Neon Database (@neondatabase/serverless)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **UI Framework**: React with comprehensive Radix UI component ecosystem
- **Styling**: Tailwind CSS with class-variance-authority for component variants
- **Charts**: Recharts for data visualization
- **Date Handling**: date-fns for date formatting and manipulation

### Development Tools
- **Build System**: Vite with TypeScript support and React plugin
- **Code Quality**: TypeScript compiler with strict mode enabled
- **Development Experience**: Replit-specific plugins for error overlay and cartographer
- **Testing**: Data test IDs implemented throughout components for testing support

### Third-Party Integrations
- **Image Assets**: Unsplash for stock imagery in MRV and project displays
- **Session Storage**: PostgreSQL-based session management
- **Font Loading**: Google Fonts integration for typography
- **Development Banner**: Replit development environment integration

The application is structured as a monorepo with client, server, and shared code directories, enabling type-safe communication between frontend and backend while maintaining clear separation of concerns.
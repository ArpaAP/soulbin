# AGENTS.md

This file provides guidance to AI Agents when working with code in this repository.

## Project Overview

SoulBin is an AI-based emotional analysis chat service built with Next.js 16, React 19, and Tailwind CSS v4. The project uses pnpm as the package manager and includes the React Compiler for optimization.

## Development Commands

```bash
# Build the project (required before deployment)
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Format code with Prettier
pnpm format

# Check formatting without modifying files
pnpm format:check

# Prisma commands
pnpm prisma generate       # Generate Prisma Client
pnpm prisma migrate dev    # Create and apply migrations in development
pnpm prisma migrate deploy # Apply migrations in production
pnpm prisma studio         # Open Prisma Studio GUI
pnpm prisma db push        # Push schema changes without migrations
```

**IMPORTANT**: Do not run `pnpm dev` as specified in local configuration.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: Version 19.2.0 with React Compiler enabled
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives (checkbox, select, slot)
- **Utilities**: class-variance-authority, clsx, tailwind-merge
- **Icons**: lucide-react
- **Authentication**: BetterAuth with Google OAuth
- **Database ORM**: Prisma 7.0.0
- **Database**: PostgreSQL (with @prisma/adapter-pg)
- **Package Manager**: pnpm 10.23.0
- **Language**: TypeScript 5

## Design System & Styling

### Tailwind CSS v4

This project uses **Tailwind CSS v4** with a custom design system defined in `src/app/globals.css`.

**IMPORTANT**: Tailwind CSS v4 has significant changes from v3. For detailed information about the `@theme` directive, theme customization patterns, and v4-specific syntax, refer to [**docs/TAILWIND-V4.md**](docs/TAILWIND-V4.md).

### Figma Design Integration

**CRITICAL**: This project is designed based on Figma designs using Figma Desktop MCP integration.

For comprehensive guidance on integrating Figma designs, including:

- Complete design token definitions and synchronization rules
- Component architecture patterns
- Figma MCP tools usage
- Step-by-step integration workflow

See [**docs/FIGMA-DESIGN-SYSTEM.md**](docs/FIGMA-DESIGN-SYSTEM.md).

### Quick Reference: Design Tokens

Design tokens are defined in `src/app/globals.css` using `@theme inline` and mirror Figma design variables:

- **Typography**: `text-h1` ~ `text-h6`, `text-b1` ~ `text-b3`, `text-l1`, `text-l2`, `text-c1`, `text-c2`
- **Spacing**: `g0` ~ `g8` (0px, 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px)
- **Border Radius**: `br1` ~ `br4` (4px, 8px, 12px, 16px)
- **Colors**: `primary-green`, `white`, `black`, `error`, `gray-border`, `gray-text`

### Critical Tailwind v4 Usage Rules

1. **DO NOT use `var()` syntax**: `py-g0` ✅ / `py-[var(--spacing-g0)]` ❌
2. **Border Width - Use Arbitrary Values**: For border widths defined in Figma (1px, 1.5px, 2px, etc.), use arbitrary values like `border-[1.5px]` or `border-b-[1.5px]` directly. ❌ Do NOT use custom utilities like `border-bw2` (Tailwind v4 does not support the `--border-width-*` namespace)
3. **Border requires thickness**: `border-[1.5px] border-gray-border` ✅ / `border-gray-border` ❌
4. **No tailwind.config.ts**: Use `@theme inline` in globals.css instead

## Project Structure

```
prisma/
├── schema.prisma            # Prisma schema definition (includes BetterAuth models)
└── migrations/              # Database migrations
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...all]/
│   │           └── route.ts # BetterAuth API handler
│   ├── fonts/               # Custom fonts (Pretendard Variable)
│   ├── components-demo/     # Component showcase pages
│   ├── globals.css          # Tailwind config and design tokens (synced with Figma)
│   ├── layout.tsx           # Root layout with Pretendard font
│   └── page.tsx             # Home page
├── components/
│   └── ui/                  # Reusable UI components
│       ├── button.tsx
│       ├── select.tsx
│       ├── outlined-select.tsx
│       └── lined-select.tsx
├── generated/
│   └── prisma/              # Generated Prisma Client
└── lib/
    ├── auth.ts              # BetterAuth server instance
    ├── auth-client.ts       # BetterAuth client utilities
    ├── prisma.ts            # Prisma Client instance
    └── utils.ts             # cn() utility for class merging
```

## Key Configuration Files

- **next.config.ts**: React Compiler enabled (`reactCompiler: true`)
- **tsconfig.json**: Path alias `@/*` maps to `./src/*`
- **postcss.config.mjs**: Uses `@tailwindcss/postcss` plugin
- **.prettierrc**: Import ordering, 100 char print width, single quotes
- **prisma.config.ts**: Prisma configuration (schema path, migrations path, datasource)
- **prisma/schema.prisma**: Database schema definition

## Database & ORM

### Prisma Configuration

This project uses **Prisma 7.0.0** as the ORM with **PostgreSQL** database.

**Key Features**:

- **Database Adapter**: Uses `@prisma/adapter-pg` for PostgreSQL connection
- **Custom Output Path**: Prisma Client is generated to `src/generated/prisma`
- **Environment Variable**: Database connection string via `DATABASE_URL`

**File Structure**:

- `prisma/schema.prisma`: Database schema definition (generator + datasource)
- `prisma/migrations/`: Database migration files
- `prisma.config.ts`: Prisma configuration (schema path, migrations path)
- `src/lib/prisma.ts`: Singleton Prisma Client instance with adapter

**Usage Pattern**:

```typescript
import prisma from '@/lib/prisma';

// Use prisma client for database operations
const users = await prisma.user.findMany();
```

**Important Notes**:

- Prisma Client is configured with PostgreSQL adapter for connection pooling
- Singleton pattern prevents multiple instances in development (hot reload safe)
- Always run `pnpm prisma generate` after schema changes
- Import client from `@/generated/prisma/client`, not `@prisma/client`

## Authentication & Authorization

### BetterAuth Configuration

This project uses **BetterAuth** for authentication with **Google OAuth** integration.

**Official Documentation Access**:

- **Primary documentation**: Access BetterAuth docs via `https://www.better-auth.com/llms.txt`
- **Specific guides**: Documentation is structured with subpaths:
  - Installation: `https://www.better-auth.com/llms.txt/docs/installation.md`
  - Next.js integration: `https://www.better-auth.com/llms.txt/docs/integrations/next.md`
  - Prisma adapter: `https://www.better-auth.com/llms.txt/docs/adapters/prisma.md`
  - Google OAuth: `https://www.better-auth.com/llms.txt/docs/authentication/google.md`

**IMPORTANT**: When working with BetterAuth, always reference the official documentation via the URLs above for the most accurate and up-to-date information.

**File Structure**:

- `src/lib/auth.ts`: Server-side BetterAuth instance with Prisma adapter and Google OAuth
- `src/lib/auth-client.ts`: Client-side utilities (signIn, signUp, signOut, useSession)
- `src/app/api/auth/[...all]/route.ts`: API route handler for authentication endpoints
- `prisma/schema.prisma`: Includes BetterAuth models (User, Session, Account, Verification)

**Environment Variables**:

```env
BETTER_AUTH_SECRET=<generated-secret>
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<google-oauth-client-id>
GOOGLE_CLIENT_SECRET=<google-oauth-client-secret>
DATABASE_URL=<postgresql-connection-string>
```

**Usage Patterns**:

Client-side (React components):

```typescript
'use client';
import { authClient } from '@/lib/auth-client';

// Google OAuth sign-in
await authClient.signIn.social({ provider: 'google' });

// Sign out
await authClient.signOut();

// Access session in client component
const { data: session } = authClient.useSession();
```

Server-side (Server Components, Route Handlers):

```typescript
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

// Get session in Server Component
const session = await auth.api.getSession({
  headers: await headers(),
});

if (!session) {
  // User is not authenticated
  redirect('/sign-in');
}

// Access user data
const user = session.user; // { id, name, email, image, ... }
```

**Google OAuth Setup**:

1. Create OAuth credentials in [Google Cloud Console](https://console.cloud.google.com/)
2. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google` (development)
3. Add production redirect URI: `https://your-domain.com/api/auth/callback/google`
4. Update `.env` with `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

**Database Schema**:

BetterAuth models are integrated into Prisma schema:

- **User**: User accounts with email, name, image
- **Session**: Active user sessions with token and expiration
- **Account**: OAuth provider accounts (Google, etc.)
- **Verification**: Email verification tokens

After schema changes, run:

```bash
pnpm prisma migrate dev    # Create and apply migrations
pnpm prisma generate       # Regenerate Prisma Client
```

## Font Configuration

The project uses **Pretendard Variable** font loaded locally:

- Font file: `src/app/fonts/PretendardVariable.woff2`
- Variable: `--font-pretendard`
- Weight range: 45-920
- Applied in layout.tsx with `antialiased` class

## UI Component Patterns

### Component Architecture

UI components in `src/components/ui/` are **based on Shadcn/ui patterns** but **customized to match Figma designs**.

**IMPORTANT**: When creating or modifying UI components:

1. Start with Shadcn/ui component structure as the foundation
2. Replace Shadcn's default styling with design tokens from `globals.css`
3. Adjust variants to match Figma specifications exactly
4. Maintain accessibility features from Radix UI primitives

Components use:

- **Shadcn/ui patterns** as the base architecture
- **Radix UI** primitives for accessibility
- **class-variance-authority (cva)** for variant management
- **cn()** utility from `@/lib/utils` for conditional class merging
- **Slot pattern** from @radix-ui/react-slot for polymorphic components
- **Custom design tokens** from `globals.css` instead of Shadcn defaults

## Import Order (Prettier)

Imports are automatically sorted by Prettier in this order:

1. React imports
2. Third-party modules
3. @/components, @/pages
4. @/hooks, @/services
5. @/assets, @/constants, @/utils, @/styles
6. Relative imports

## Language and Metadata

- **Language**: Korean (`lang="ko"` in HTML)
- **App Name**: SoulBin
- **Description**: AI 기반 감정분석 채팅 서비스

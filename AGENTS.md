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
```

**IMPORTANT**: Do not run `pnpm dev` as specified in local configuration.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: Version 19.2.0 with React Compiler enabled
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives (checkbox, select, slot)
- **Utilities**: class-variance-authority, clsx, tailwind-merge
- **Icons**: lucide-react
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
- **Border Width**: `bw1` (1px), `bw2` (1.5px), `bw3` (2px)
- **Border Radius**: `br1` ~ `br4` (4px, 8px, 12px, 16px)
- **Colors**: `primary-green`, `white`, `black`, `error`, `gray-border`, `gray-text`

### Critical Tailwind v4 Usage Rules

1. **DO NOT use `var()` syntax**: `py-g0` ✅ / `py-[var(--spacing-g0)]` ❌
2. **Border requires thickness**: `border-[1.5px] border-gray-border` ✅ / `border-gray-border` ❌
3. **No tailwind.config.ts**: Use `@theme inline` in globals.css instead

## Project Structure

```
src/
├── app/
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
└── lib/
    └── utils.ts             # cn() utility for class merging
```

## Key Configuration Files

- **next.config.ts**: React Compiler enabled (`reactCompiler: true`)
- **tsconfig.json**: Path alias `@/*` maps to `./src/*`
- **postcss.config.mjs**: Uses `@tailwindcss/postcss` plugin
- **.prettierrc**: Import ordering, 100 char print width, single quotes

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

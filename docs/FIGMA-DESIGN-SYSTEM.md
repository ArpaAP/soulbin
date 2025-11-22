# Figma Design System Integration Guide

This document provides comprehensive rules for integrating Figma designs into the SoulBin codebase using Model Context Protocol (MCP).

## 1. Design System Structure

### Token Definitions

**Location**: `src/app/globals.css` (lines 4-146)

**Format**: Tailwind CSS v4 `@theme inline` directive

**CRITICAL**: All design tokens in `globals.css` are **directly synchronized with Figma design variables**. Any changes to Figma variables MUST be reflected in this file, and vice versa.

#### Token Structure

```css
@theme inline {
  /* Typography tokens with multi-property structure */
  --text-h1: 2.5rem;
  --text-h1--line-height: 3.5rem;
  --text-h1--letter-spacing: -0.0625rem;
  --text-h1--font-weight: 700;

  /* Spacing tokens */
  --spacing-g0: 0px;
  --spacing-g1: 4px;
  /* ... */

  /* Border tokens */
  --border-width-bw1: 1px;
  --radius-br1: 4px;
  /* ... */

  /* Color tokens */
  --color-primary-green: #62c762;
  --color-white: #ffffff;
  /* ... */
}
```

#### Available Design Tokens

**Typography Classes** (use directly in className):

- Headings: `text-h1`, `text-h2`, `text-h3`, `text-h4`, `text-h5`, `text-h6`
  - Each includes: font-size, line-height, letter-spacing, font-weight
  - Example: `text-h1` = 40px/56px, -1px spacing, weight 700
- Body: `text-b1` (16px), `text-b2` (14px), `text-b3` (13px)
- Labels: `text-l1` (16px), `text-l2` (14px)
- Captions: `text-c1` (13px), `text-c2` (11px)

**Spacing Tokens** (gap system):

- `g0` through `g8`: 0px, 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px
- Usage: `py-g2`, `px-g4`, `gap-g3`, `mt-g5`

**Border Tokens**:

- Width: `bw1` (1px), `bw2` (1.5px), `bw3` (2px)
- Radius: `br1` (4px), `br2` (8px), `br3` (12px), `br4` (16px)
- Usage: `border-[1.5px]` or `border-bw2`, then `rounded-br2`

**Color Tokens**:

- `primary-green`: #62c762
- `white`: #ffffff
- `black`: #000000
- `error`: #ff4130
- `gray-border`: #dadee9
- `gray-text`: #4d4d4d

### Token Transformation System

**NO transformation system**: Tokens are used directly via Tailwind CSS v4's `@theme inline` directive.

**DO NOT** use CSS variables manually:

- ❌ WRONG: `py-[var(--spacing-g0)]`
- ✅ CORRECT: `py-g0`

## 2. Component Library

### Location

- **Path**: `src/components/ui/`
- **Pattern**: One component per file (e.g., `button.tsx`, `select.tsx`)

### Component Architecture

**Framework**: React 19.2.0 with React Compiler (enabled in `next.config.ts`)

**Component Pattern**:

```tsx
import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

const componentVariants = cva('base classes using design tokens', {
  variants: {
    variant: {
      /* ... */
    },
    size: {
      /* ... */
    },
  },
  defaultVariants: {
    /* ... */
  },
});

function Component({ className, variant, size, ...props }: ComponentProps) {
  return (
    <Element
      data-slot="component-name"
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Component, componentVariants };
```

### Key Architectural Patterns

1. **Radix UI Primitives**: Used for accessible, unstyled foundation
   - Install from `@radix-ui/react-*`
   - Example: `@radix-ui/react-select`, `@radix-ui/react-checkbox`

2. **Class Variance Authority (CVA)**: For variant management
   - Define base styles + variant options
   - Export both component and variants

3. **Slot Pattern**: For polymorphic "asChild" components
   - Allows rendering as different HTML elements
   - See `button.tsx:48` for example

4. **cn() Utility**: For conditional class merging
   - Location: `src/lib/utils.ts`
   - Combines `clsx` + `tailwind-merge`
   - Usage: `cn(baseClass, conditionalClass, className)`

5. **Data Attributes**: For component identification
   - Pattern: `data-slot="component-name"`
   - Used in all UI components

### Component Documentation

**No Storybook**: Components are showcased in `src/app/components-demo/page.tsx`

## 3. Frameworks & Libraries

### UI Framework

- **Next.js 16.0.3** (App Router)
- **React 19.2.0** with React Compiler enabled
- **TypeScript 5**

### Styling System

- **Tailwind CSS v4** (CRITICAL: v4 has breaking changes from v3)
- **PostCSS Plugin**: `@tailwindcss/postcss` (see `postcss.config.mjs`)
- **Additional**: `tw-animate-css` for animations

### Key Dependencies

```json
{
  "@radix-ui/react-*": "Accessible primitives",
  "class-variance-authority": "Variant management",
  "clsx": "Conditional class names",
  "tailwind-merge": "Merge Tailwind classes",
  "lucide-react": "Icon system"
}
```

### Build System

- **Bundler**: Next.js built-in (Turbopack/Webpack)
- **Package Manager**: pnpm 10.23.0 (REQUIRED)
- **React Compiler**: Enabled for automatic memoization

### Build Commands

```bash
pnpm build    # REQUIRED before deployment
pnpm start    # Production server
pnpm lint     # ESLint
pnpm format   # Prettier formatting
```

**DO NOT RUN**: `pnpm dev` (per project configuration)

## 4. Asset Management

### Storage Location

- **Fonts**: `src/app/fonts/`
  - Pretendard Variable: `PretendardVariable.woff2`
- **Images**: No dedicated folder yet (TBD based on Figma assets)

### Asset Loading

**Fonts** (see `src/app/layout.tsx`):

```tsx
import localFont from 'next/font/local';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
});

// Apply in <body>:
<body className={`${pretendard.variable} antialiased`}>
```

**Font Configuration**:

- Variable name: `--font-pretendard`
- Weight range: 45-920
- Applied globally with `antialiased` smoothing
- Full fallback chain in `globals.css:149-164`

### Asset Optimization

- **Fonts**: Loaded as local woff2 (optimized)
- **Images**: Use Next.js `<Image>` component (automatic optimization)

### CDN Configuration

- **None currently configured**
- Next.js automatic image optimization via `/_next/image`

## 5. Icon System

### Library

**lucide-react** (v0.554.0)

### Icon Storage

- **Location**: NPM package (no local storage)
- **Import**: Named imports from `lucide-react`

### Icon Usage Pattern

```tsx
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

// In component:
<ChevronDownIcon className="size-4 opacity-50" />;
```

### Icon Naming Convention

- **PascalCase** with "Icon" suffix
- Examples: `CheckIcon`, `ChevronDownIcon`, `ChevronUpIcon`

### Icon Sizing

- Default size controlled via component classes
- Standard size: `size-4` (16px), `size-[22px]` (buttons)
- Use `[&_svg:not([class*='size-'])]:size-4` pattern for automatic sizing

## 6. Styling Approach

### CSS Methodology

**Tailwind CSS v4 Utility-First**

**Configuration**: No `tailwind.config.ts` file (v4 uses inline theme)

### Global Styles

**Location**: `src/app/globals.css`

**Structure**:

```css
@import 'tailwindcss';
@import 'tw-animate-css';

@theme inline {
  /* ... */
}

body {
  /* font stack */
}

:root {
  /* CSS variables for semantic colors */
}

@layer base {
  /* ... */
}
```

### Responsive Design

**Tailwind Breakpoints** (default):

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Usage**: `sm:text-h2 md:text-h1`

### Critical Styling Rules for Figma Integration

#### 1. NEVER Use `var()` Syntax

```tsx
// ❌ WRONG
className = 'py-[var(--spacing-g0)]';

// ✅ CORRECT
className = 'py-g0';
```

#### 2. ALWAYS Specify Border Thickness

Tailwind v4 requires explicit border width:

```tsx
// ❌ WRONG (color only won't work)
className = 'border-gray-border';

// ✅ CORRECT
className = 'border-[1.5px] border-gray-border';
// OR
className = 'border-bw2 border-gray-border rounded-br2';
```

#### 3. Use Design Token Classes Directly

```tsx
// Typography
className = 'text-h1'; // Not text-[40px]
className = 'text-l2'; // Not text-[14px]

// Spacing
className = 'py-g2 px-g4 gap-g3'; // Not py-[8px]

// Border radius
className = 'rounded-br2'; // Not rounded-[8px]

// Colors
className = 'bg-primary-green text-white';
```

#### 4. Class Merging with cn()

```tsx
import { cn } from '@/lib/utils';

className={cn(
  "base-classes",
  variant === 'primary' && "variant-classes",
  className  // Allow prop override
)}
```

### Dark Mode

- **System**: CSS variables in `:root` (see `globals.css:167-200`)
- **No dark mode toggle implemented yet**

## 7. Project Structure

```
soulbin/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── fonts/               # Local font files
│   │   │   └── PretendardVariable.woff2
│   │   ├── components-demo/     # Component showcase
│   │   │   └── page.tsx
│   │   ├── globals.css          # ⚠️ CRITICAL: Figma-synced design tokens
│   │   ├── layout.tsx           # Root layout with font config
│   │   ├── page.tsx             # Home page
│   │   └── favicon.ico
│   ├── components/
│   │   └── ui/                  # Reusable UI components
│   │       ├── button.tsx
│   │       ├── select.tsx
│   │       ├── outlined-select.tsx
│   │       └── lined-select.tsx
│   └── lib/
│       └── utils.ts             # cn() utility
├── docs/
│   ├── TAILWIND-V4.md          # Tailwind v4 reference
│   └── FIGMA-DESIGN-SYSTEM.md  # This file
├── .claude/                     # Claude Code configuration
├── CLAUDE.md                    # Project instructions
├── CLAUDE.local.md             # Local overrides (not in git)
├── next.config.ts              # React Compiler enabled
├── tsconfig.json               # Path aliases (@/*)
├── postcss.config.mjs          # Tailwind v4 PostCSS
├── .prettierrc                 # Import ordering
└── package.json                # Dependencies

```

### Feature Organization Pattern

- **App Router structure**: One folder per route
- **Components**: Shared in `src/components/ui/`
- **Utilities**: In `src/lib/`

### Import Path Aliases

**Configuration**: `tsconfig.json:22`

```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

**Usage**:

```tsx
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
```

### Import Ordering (Prettier)

**Configuration**: `.prettierrc:9-24`

**Order**:

1. React imports
2. Third-party modules
3. `@/components`, `@/pages`
4. `@/hooks`, `@/services`
5. `@/assets`, `@/constants`, `@/utils`, `@/styles`
6. Relative imports (`./`, `../`)

**Auto-sorted** by Prettier plugin.

## 8. Figma Integration Workflow

### Step 1: Extract Design from Figma

Use MCP Figma Desktop tools:

```typescript
// Get design context (includes code, styles, assets)
mcp__figma -
  desktop__get_design_context({
    nodeId: '123:456', // From Figma URL
    clientLanguages: 'typescript',
    clientFrameworks: 'react,next,tailwind',
  });

// Get variable definitions
mcp__figma -
  desktop__get_variable_defs({
    nodeId: '123:456',
  });

// Get screenshot for reference
mcp__figma -
  desktop__get_screenshot({
    nodeId: '123:456',
  });
```

### Step 2: Sync Design Tokens

1. Compare Figma variables with `src/app/globals.css`
2. Update `@theme inline` block if variables changed
3. Ensure token naming matches pattern:
   - Typography: `--text-{style}`
   - Spacing: `--spacing-g{0-8}`
   - Border: `--border-width-bw{1-3}`, `--radius-br{1-4}`
   - Colors: `--color-{name}`

### Step 3: Create Component

1. Check if Radix UI primitive exists for accessibility
2. Create file in `src/components/ui/{component}.tsx`
3. Use CVA for variants
4. Apply design tokens from globals.css
5. Export component + variants

### Step 4: Implementation Checklist

- [ ] Design tokens used (no hardcoded values)
- [ ] Border has explicit thickness (`border-[1.5px]`)
- [ ] No `var()` syntax used
- [ ] Typography classes used (`text-h1`, not `text-[40px]`)
- [ ] Spacing uses gap system (`py-g2`, not `py-[8px]`)
- [ ] Component has `data-slot` attribute
- [ ] Imports follow Prettier order
- [ ] TypeScript types defined
- [ ] Responsive design considered

### Step 5: Verify

```bash
pnpm format   # Auto-format
pnpm lint     # Check for errors
pnpm build    # Ensure build succeeds
```

## 9. Common Patterns from Existing Components

### Button Component Pattern

**File**: `src/components/ui/button.tsx`

**Key Features**:

- CVA variants: `flat`, `outline`, `destructive`, `secondary`, `ghost`, `link`
- Size variants: `default`, `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`
- Pseudo-element hover effects using `before:` and `after:` modifiers
- Polymorphic with `asChild` prop (Slot pattern)
- Design token usage: `gap-g1`, `text-l1`, `rounded-br2`, `bg-primary-green`

**Border thickness example**:

```tsx
// outline variant (line 14-15)
'border-[1.5px] border-primary-green bg-transparent text-primary-green rounded-br2';
```

### Select Component Pattern

**File**: `src/components/ui/select.tsx`

**Key Features**:

- Wraps Radix UI primitives
- Multiple sub-components exported
- Size variants via data attributes: `data-size={size}`
- Portal-based dropdown rendering
- Scroll buttons for long lists
- Design token usage throughout

### Conditional Styling Pattern

```tsx
className={cn(
  "base styles",
  variant === 'primary' && "primary styles",
  size === 'lg' && "large styles",
  disabled && "disabled styles",
  className  // User override
)}
```

## 10. Figma-Specific MCP Tools Reference

### Available Tools

1. `mcp__figma-desktop__get_design_context` - Get full design with code
2. `mcp__figma-desktop__get_variable_defs` - Get design variables
3. `mcp__figma-desktop__get_screenshot` - Visual reference
4. `mcp__figma-desktop__get_metadata` - Structure overview (XML)
5. `mcp__figma-desktop__create_design_system_rules` - Generate rules doc

### Node ID Extraction

From Figma URL: `https://figma.com/design/:fileKey/:fileName?node-id=1-2`
Extract node ID: `1:2` (replace hyphen with colon)

### Tool Parameters

```typescript
{
  nodeId: "1:2",              // Optional, defaults to selected
  clientLanguages: "typescript",
  clientFrameworks: "react,next,tailwind",
  forceCode: false            // Only set true if explicitly requested
}
```

## 11. Critical Reminders

### Tailwind CSS v4 Breaking Changes

- No `tailwind.config.ts` file
- Theme in `@theme inline` directive
- Direct token usage (no `var()`)
- Border thickness required

### Figma Synchronization

- `globals.css` tokens = Figma variables
- Must stay in sync
- Always check Figma before adding new tokens
- Update tokens if Figma design system changes

### Development Rules

- Never run `pnpm dev`
- Always use `pnpm build` before deployment
- Format with `pnpm format` before committing

### Language & Localization

- Primary language: Korean (`lang="ko"`)
- App name: SoulBin
- Description: "AI 기반 감정분석 채팅 서비스"

---

**Last Updated**: 2025-11-22
**Tailwind Version**: v4
**Next.js Version**: 16.0.3
**React Version**: 19.2.0

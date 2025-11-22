# Tailwind CSS v4 Theme Customization Guide

This document provides essential information about Tailwind CSS v4 theme customization that you must reference when working with Tailwind in this project.

## Core Concept: The @theme Directive

Tailwind v4 introduces the `@theme` directive as the primary mechanism for defining design tokens. Unlike v3's configuration files, theme variables are now CSS-based and explicitly declared.

**Key distinction:** Theme variables are special CSS variables defined using the `@theme` directive that influence which utility classes exist in your project.

## Basic Syntax

```css
@import 'tailwindcss';

@theme {
  --color-mint-500: oklch(0.72 0.11 178);
}
```

This automatically generates corresponding utility classes like `bg-mint-500` and `text-mint-500`.

## Customization Patterns

### Extending the Default Theme

Add new design tokens while keeping defaults:

```css
@theme {
  --font-script: Great Vibes, cursive;
}
```

### Overriding Defaults

Redefine existing tokens:

```css
@theme {
  --breakpoint-sm: 30rem;
}
```

### Complete Theme Replacement

Use the asterisk syntax to reset entire namespaces:

```css
@theme {
  --color-*: initial;
  --color-white: #fff;
  --color-purple: #3f3cbb;
}
```

Or disable all defaults entirely:

```css
@theme {
  --*: initial;
  --spacing: 4px;
  --font-body: Inter, sans-serif;
}
```

## Theme Variable Namespaces

Each namespace maps to specific utilities:

| Namespace          | Generates               | Examples                               |
| ------------------ | ----------------------- | -------------------------------------- |
| `--color-*`        | Color utilities         | `bg-*`, `text-*`, `fill-*`, `border-*` |
| `--font-*`         | Font family utilities   | `font-sans`, `font-serif`              |
| `--text-*`         | Font size utilities     | `text-sm`, `text-lg`                   |
| `--breakpoint-*`   | Responsive variants     | `sm:`, `md:`, `lg:`                    |
| `--spacing-*`      | Padding, margin, sizing | `p-*`, `m-*`, `w-*`, `h-*`             |
| `--radius-*`       | Border radius utilities | `rounded-*`                            |
| `--shadow-*`       | Box shadow utilities    | `shadow-*`                             |
| `--animate-*`      | Animation utilities     | `animate-*`                            |
| `--border-width-*` | Border width utilities  | `border-*` (when used with width)      |

## Advanced Features

### Animation Keyframes

Define keyframe animations within `@theme`:

```css
@theme {
  --animate-fade-in: fade-in 0.3s ease-out;
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
```

### Referencing Other Variables: `@theme inline`

Use the `inline` option when variables reference other CSS variables:

```css
@theme inline {
  --font-sans: var(--font-inter);
  --color-primary: var(--color-green-500);
}
```

**IMPORTANT**: This is what we use in our `globals.css` file when referencing CSS variables!

### Generating All CSS Variables: `@theme static`

Force generation of unused variables:

```css
@theme static {
  --color-primary: var(--color-red-500);
}
```

## Why @theme Instead of :root?

The `@theme` directive serves dual purposes:

1. Defining CSS variables
2. Instructing Tailwind to generate corresponding utility classes

This explicit syntax ensures design tokens are always top-level and properly enforced. Regular `:root` variables won't generate utility classes.

## Practical Examples

### Custom Color System

```css
@import 'tailwindcss';

@theme {
  --color-*: initial;
  --color-brand-light: oklch(0.95 0.05 200);
  --color-brand-dark: oklch(0.3 0.15 200);
}
```

Now only `bg-brand-light`, `text-brand-dark`, etc. are available—eliminating unused utilities.

### Custom Typography Scale

```css
@theme {
  --text-*: initial;
  --text-xs: 0.75rem;
  --text-xs--line-height: 1rem;
  --text-sm: 0.875rem;
  --text-sm--line-height: 1.25rem;
}
```

### Custom Spacing System

```css
@theme {
  --spacing-*: initial;
  --spacing-0: 0px;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
}
```

## Usage Across Projects

Share theme definitions via separate CSS files:

```css
/* packages/brand/theme.css */
@theme {
  --*: initial;
  --color-primary: oklch(...);
}
```

```css
/* app.css */
@import 'tailwindcss';
@import '../brand/theme.css';
```

This enables consistent design systems across monorepos or published packages.

## Critical Differences from Tailwind CSS v3

1. **No tailwind.config.js/ts**: Configuration is now done via CSS `@theme` directive
2. **CSS-first approach**: Theme tokens are CSS variables, not JavaScript objects
3. **Explicit utility generation**: Only defined theme variables generate utilities
4. **No JIT magic**: You must explicitly define what you want to use
5. **var() requires @theme inline**: When referencing other CSS variables, use `@theme inline`

## Common Pitfalls to Avoid

1. ❌ **Don't use var() in utilities directly**: Instead of `py-[var(--spacing-g0)]`, define it in `@theme` and use `py-g0`
2. ❌ **Don't forget border thickness**: Border color alone won't work, always specify width like `border-[1.5px] border-gray`
3. ❌ **Don't mix :root and @theme**: Use `@theme` for design tokens that should generate utilities
4. ❌ **Don't forget the asterisk for resets**: Use `--color-*: initial` to clear all color defaults

## Reference

Official documentation: https://tailwindcss.com/docs/theme

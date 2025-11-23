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
- **Form Management**: React Hook Form 7.66.1
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

## Form Management

### React Hook Form

This project uses **React Hook Form 7.66.1** for form state management and validation.

**Key Features**:

- Performant, flexible form validation
- TypeScript support with type-safe form data
- Native HTML form validation
- Minimal re-renders with React 19 compatibility
- Integration with Radix UI components via Controller

**Basic Usage Pattern**:

```typescript
'use client';
import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: '이메일을 입력해주세요' })} />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        {...register('password', {
          required: '비밀번호를 입력해주세요',
          minLength: { value: 8, message: '비밀번호는 최소 8자 이상이어야 합니다' },
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">제출</button>
    </form>
  );
}
```

**Integration with Radix UI Components**:

For controlled components like Radix UI Select, use `Controller`:

```typescript
import { Controller, useForm } from 'react-hook-form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

type FormData = {
  category: string;
};

function MyForm() {
  const { control, handleSubmit } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Controller
        name="category"
        control={control}
        rules={{ required: '카테고리를 선택해주세요' }}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">옵션 1</SelectItem>
              <SelectItem value="option2">옵션 2</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
    </form>
  );
}
```

**Best Practices**:

1. **Type Safety**: Always define TypeScript types for form data
2. **Validation**: Use built-in validation rules or custom validators
3. **Error Handling**: Display errors using `formState.errors`
4. **Controlled Components**: Use `Controller` for Radix UI and other controlled components
5. **Performance**: Leverage uncontrolled components (`register`) when possible for better performance
6. **Native HTML**: Prefer native HTML attributes for basic validation (required, pattern, etc.)

**Common Patterns**:

```typescript
// With default values
const { register } = useForm<FormData>({
  defaultValues: {
    email: '',
    name: '',
  },
});

// With custom validation
register('email', {
  validate: (value) => value.includes('@') || '유효한 이메일 주소를 입력해주세요',
});

// Multiple validation rules
register('password', {
  required: '필수 입력 항목입니다',
  minLength: { value: 8, message: '최소 8자 이상이어야 합니다' },
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message: '영문과 숫자를 포함해야 합니다',
  },
});

// Watch form values
const watchedValue = watch('fieldName');

// Reset form
reset();

// Set value programmatically
setValue('fieldName', 'newValue');
```

## Server Actions

### Next.js Server Actions

This project **prioritizes the use of Next.js Server Actions** for server-side operations instead of traditional API routes.

**IMPORTANT**: Always prefer Server Actions over API routes (`/api/*`) for server-side logic, database operations, and mutations.

**What are Server Actions?**

Server Actions are asynchronous functions that run on the server and can be called directly from Client Components or Server Components. They provide a seamless way to handle server-side logic without creating separate API endpoints.

**File Structure**:

```
src/
├── actions/              # Server Actions (grouped by domain)
│   ├── auth.ts          # Authentication actions
│   ├── diary.ts         # Diary-related actions
│   └── user.ts          # User-related actions
└── app/
    └── ...
```

**Basic Usage Pattern**:

```typescript
// src/actions/diary.ts
'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function createDiary(formData: FormData) {
  // 1. Authentication check
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: '로그인이 필요합니다' };
  }

  // 2. Data validation
  const content = formData.get('content') as string;
  if (!content || content.trim().length === 0) {
    return { error: '내용을 입력해주세요' };
  }

  // 3. Database operation
  try {
    const diary = await prisma.diary.create({
      data: {
        content,
        userId: session.user.id,
      },
    });

    // 4. Revalidate cached data
    revalidatePath('/dashboard/diary');

    return { success: true, diary };
  } catch (error) {
    console.error('Diary creation error:', error);
    return { error: '일기 작성 중 오류가 발생했습니다' };
  }
}
```

**Using Server Actions in Client Components**:

```typescript
'use client';

import { createDiary } from '@/actions/diary';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export function DiaryForm() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append('content', data.content);

    const result = await createDiary(formData);

    if (result.error) {
      setError(result.error);
    } else {
      // Success handling
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea {...register('content')} />
      {error && <p className="text-error">{error}</p>}
      <button type="submit">작성</button>
    </form>
  );
}
```

**Using Server Actions with FormData (Progressive Enhancement)**:

```typescript
'use client';

import { createDiary } from '@/actions/diary';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? '작성 중...' : '작성'}
    </button>
  );
}

export function DiaryForm() {
  const [state, formAction] = useFormState(createDiary, null);

  return (
    <form action={formAction}>
      <textarea name="content" required />
      {state?.error && <p className="text-error">{state.error}</p>}
      <SubmitButton />
    </form>
  );
}
```

**Server Actions in Server Components**:

```typescript
// src/app/dashboard/diary/page.tsx
import { createDiary } from '@/actions/diary';

export default function DiaryPage() {
  return (
    <form action={createDiary}>
      <textarea name="content" required />
      <button type="submit">작성</button>
    </form>
  );
}
```

**TypeScript Type Safety**:

```typescript
'use server';

import { z } from 'zod'; // Optional: Use Zod for validation

const diarySchema = z.object({
  content: z.string().min(1, '내용을 입력해주세요'),
  mood: z.enum(['happy', 'sad', 'angry', 'neutral']),
});

type DiaryInput = z.infer<typeof diarySchema>;

export async function createDiary(input: DiaryInput) {
  // Validate input
  const validated = diarySchema.safeParse(input);

  if (!validated.success) {
    return { error: validated.error.errors[0].message };
  }

  // ... rest of the implementation
}
```

**Best Practices**:

1. **Always use 'use server' directive**: Place at the top of the file or individual function
2. **Authentication**: Always verify user authentication in Server Actions
3. **Validation**: Validate all input data before processing
4. **Error Handling**: Return error objects instead of throwing errors
5. **Type Safety**: Use TypeScript types for input and return values
6. **Revalidation**: Use `revalidatePath()` or `revalidateTag()` to update cached data
7. **File Organization**: Group related actions in domain-specific files (auth.ts, diary.ts, etc.)
8. **Response Pattern**: Return consistent response objects (`{ success: boolean, data?: T, error?: string }`)
9. **Progressive Enhancement**: Use `useFormState` and `useFormStatus` for better UX
10. **Avoid API Routes**: Only create API routes for webhooks, external integrations, or non-form submissions

**Common Patterns**:

```typescript
// Pattern 1: Mutation with revalidation
export async function updateUser(userId: string, data: UpdateUserInput) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.id !== userId) {
    return { error: '권한이 없습니다' };
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data,
  });

  revalidatePath('/dashboard/profile');
  return { success: true, user };
}

// Pattern 2: Delete with redirect
export async function deleteDiary(diaryId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: '로그인이 필요합니다' };
  }

  await prisma.diary.delete({
    where: {
      id: diaryId,
      userId: session.user.id, // Ensure user owns the diary
    },
  });

  revalidatePath('/dashboard/diary');
  redirect('/dashboard/diary');
}

// Pattern 3: Data fetching (prefer Server Components, but allowed for client-side fetching)
export async function getDiaryList(page: number = 1) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: '로그인이 필요합니다' };
  }

  const diaries = await prisma.diary.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * 10,
    take: 10,
  });

  return { success: true, diaries };
}
```

**When NOT to use Server Actions**:

- **Webhooks**: Use API routes for external service callbacks
- **RESTful APIs**: Use API routes when building public APIs
- **Real-time endpoints**: Use API routes with streaming or WebSocket
- **Third-party integrations**: Use API routes when external services need to call your endpoints

**Integration with React Hook Form**:

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { createDiary } from '@/actions/diary';
import { useState, useTransition } from 'react';

type FormData = {
  content: string;
  mood: string;
};

export function DiaryForm() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: FormData) => {
    startTransition(async () => {
      const result = await createDiary(data);

      if (result.error) {
        setError(result.error);
      } else {
        setError(null);
        reset(); // Clear form on success
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea {...register('content', { required: true })} />
      <select {...register('mood')}>
        <option value="happy">행복</option>
        <option value="sad">슬픔</option>
      </select>
      {error && <p className="text-error">{error}</p>}
      <button type="submit" disabled={isPending}>
        {isPending ? '작성 중...' : '작성'}
      </button>
    </form>
  );
}
```

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

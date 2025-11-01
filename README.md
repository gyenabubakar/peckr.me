# peckr.me

A TanStack Start application built with React, TypeScript, Convex, and Valibot.

## Tech Stack

- **Framework**: TanStack Start (React + TanStack Router)
- **Backend**: Convex
- **Validation**: Valibot
- **Styling**: Tailwind CSS
- **UI Components**: shadcn (customized for this project)
- **State Management**: TanStack Store & TanStack Query

## Project Structure: Feature-Based Architecture

This project follows a **feature-based architecture** where each business domain is organized as a self-contained feature module. This approach promotes better code organization, maintainability, and team collaboration by grouping related functionality together.

### Structure Overview

```
src/
├── features/           # Feature-specific modules
│   ├── auth/
│   ├── user-profile/
│   └── ...
├── lib/               # Global utilities and helpers
├── components/        # Reusable UI components (not feature-specific)
├── hooks/             # Global custom hooks
├── data/              # Global data and constants
├── routes/            # TanStack Router route files
└── integrations/      # Third-party integrations (Convex, TanStack Query, etc.)
```

### Feature Organization

Each feature follows a consistent internal structure:

```
features/{feature-name}/
├── ui/               # Feature-specific React components
│   └── index.ts      # Re-exports all UI components
├── hooks/            # Feature-specific custom hooks
│   └── index.ts      # Re-exports all hooks
├── schemas/          # Valibot validation schemas
│   └── index.ts      # Re-exports all schemas
├── types/            # TypeScript type definitions
│   └── index.ts      # Re-exports all types
├── rpc/              # TanStack server functions
│   └── index.ts      # Re-exports all RPC functions
└── constants.ts      # Feature-specific constants
```

### Nested Features

Features can contain sub-features that follow the same organizational principles. For example, a "moderation" feature might contain several sub-features:

```
features/moderation/           # Top-level feature
├── dashboard/                 # Sub-feature
│   ├── ui/                    # Sub-feature UI components
│   ├── hooks/                 # Sub-feature hooks
│   ├── types/                 # Sub-feature type definitions
│   └── ...                    # Other sub-feature folders
├── analytics/                 # Another sub-feature
│   ├── ui/
│   ├── hooks/
│   ├── types/
│   └── ...
└── ...                        # Other sub-features
```

Each sub-feature maintains its own internal structure identical to a top-level feature, promoting consistency and maintainability throughout the codebase.

### Creating New Features

The project includes a utility script to automatically generate new features with the proper folder structure. This ensures consistency across all features and saves development time.

#### Usage

```bash
# Create a feature with all default folders/files
tsx feature <feature-name>

# Create a feature with interactive folder/file selection
tsx feature <feature-name> --config
# or
tsx feature <feature-name> -c
```

#### Examples

```bash
# Create an authentication feature
tsx feature auth

# Create a user profile feature
tsx feature user-profile

# Create nested features (sub-features)
tsx feature moderation/dashboard
tsx feature user-profile/settings

# Create with custom selection of folders
tsx feature analytics --config
# This will prompt you to select which folders/files to include

# Deep nesting (will show warning and ask for confirmation)
tsx feature moderation/dashboard/analytics
```

#### What Gets Created

**Default mode** (without `--config`):

```
src/features/[feature-name]/
├── ui/
│   └── index.ts          # Empty index file for UI component exports
├── hooks/
│   └── index.ts          # Empty index file for hook exports
├── schemas/
│   └── index.ts          # Empty index file for Valibot schema exports
├── types/
│   └── index.ts          # Empty index file for type exports
├── rpc/
│   └── index.ts          # Empty index file for server function exports
└── constants.ts          # Feature-specific constants
```

**Interactive mode** (with `--config`):

The script will prompt you for each folder/file:

```
📋 Select which folders/files to include (y/N):

  Include ui/ folder? (Y/n):
  Include hooks/ folder? (Y/n):
  Include schemas/ folder? (Y/n):
  Include types/ folder? (Y/n):
  Include rpc/ folder? (Y/n):
  Include constants.ts file? (Y/n):
```

Press Enter to accept (default is Yes), or type `n` to skip.

All files are created empty, providing a clean starting point for your feature development while maintaining the established architectural patterns.

### Key Principles

#### 1. **Index File Re-exports**

Every folder within a feature **must** have an `index.ts` file that re-exports the module's public API. This enables clean imports without deep paths:

```typescript
// ✅ Clean imports
import { useAuth } from '~/features/auth/hooks';
import { loginSchema } from '~/features/auth/schemas';
import { UserType } from '~/features/auth/types';
import { LoginForm } from '~/features/auth/ui';
// ❌ Avoid deep paths
import { LoginForm } from '~/features/auth/ui/login-form';
```

#### 2. **Server Functions with RPC**

TanStack Server Functions go in the `rpc/` folder. Use `createServerFn()` to define server-only logic:

```typescript
// features/auth/rpc/login.ts
import { createServerFn } from '@tanstack/react-start';
import * as v from 'valibot';
import { LoginSchema } from '../schemas';

export const loginUser = createServerFn({ method: 'POST' })
  .inputValidator(LoginSchema)
  .handler(async ({ data }) => {
    // Server-side logic with validated data
    const { email, password } = data;
    // ... authenticate user
    return { success: true, userId: '123' };
  });
```

Usage in components with `useServerFn()`:

```typescript
// features/auth/ui/login-form.tsx
import { useServerFn } from '@tanstack/react-start';
import { loginUser } from '../rpc';

function LoginForm() {
  const login = useServerFn(loginUser);

  async function handleSubmit(data: LoginData) {
    const result = await login({ data });
    // Handle result
  }
}
```

#### 3. **Validation with Valibot**

All forms and data validation use Valibot schemas defined in the `schemas/` folder:

```typescript
// features/auth/schemas/login.ts
import * as v from 'valibot';

export const LoginSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
});
```

#### 4. **Global vs Feature-Specific**

- **`lib/`**: Contains utilities and helpers used across multiple features
- **`components/`**: Houses reusable UI components that aren't tied to specific business logic
- **`hooks/`**: Global custom hooks used across the application
- **`features/`**: Contains domain-specific code that encapsulates business logic

### Benefits

- **Modularity**: Features can be developed and tested independently
- **Scalability**: Easy to add new features without affecting existing ones
- **Team Collaboration**: Different teams can work on different features with minimal conflicts
- **Code Reuse**: Common patterns are established across features
- **Maintainability**: Related code is co-located, making it easier to understand and modify

## Path Aliases

The project uses path aliases for clean imports:

- `~/*` - Maps to `./src/*`
- `shadcn` - Maps to `./src/_shadcn`
- `shadcn/*` - Maps to `./src/_shadcn/*`

Examples:

```typescript
import { cn } from 'shadcn/lib/utils';
import { Button } from 'shadcn/ui/button';
import { useAuth } from '~/features/auth/hooks';
import { formatDate } from '~/lib/utils';
```

## Getting Started

To run this application:

```bash
pnpm install
pnpm dev
```

## Building For Production

To build this application for production:

```bash
pnpm build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing:

```bash
pnpm test
```

## Linting & Formatting

This project uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/):

```bash
pnpm lint
pnpm format
pnpm typecheck
```

Git hooks are configured with Husky to run linting on commit. To bypass hooks when needed (use sparingly):

```bash
HUSKY=0 git commit -m "..."
HUSKY=0 git push
```

## Setting up Convex

- Set the `VITE_CONVEX_URL` and `CONVEX_DEPLOYMENT` environment variables in your `.env.local`
- Or run `npx convex init` to set them automatically
- Run `npx convex dev` to start the Convex server

### Shadcn Components

All shadcn components have been installed in `src/_shadcn/ui/`. To add new components:

```bash
pnpx shadcn@latest add <component-name>
```

**Important**: Avoid modifying shadcn components unless absolutely necessary. For global styles, update `src/styles.css`.

## Coding Standards

### Function Declarations

Prefer `function` keyword over arrow functions for top-level functions:

```typescript
// ✅ Do this
function handleClick(e: MouseEvent) {}

export function loader(event: LoaderEvent) {}

// ❌ Don't do this
const handleClick = (e: MouseEvent) => {};
export const loader = (event: LoaderEvent) => {};
```

**Exceptions** where arrow functions are preferred:

```typescript
// ✅ Callback arguments
runSomething((err, data) => {});

// ✅ Array methods
items.map((item) => item.id);
```

### Object Methods

Prefer ES6 method syntax:

```typescript
// ✅ Do this
const obj = {
  method() {},
};

// ❌ Don't do this
const obj = {
  method: function () {},
  method2: () => {},
};
```

Use arrow functions for simple one-liners:

```typescript
const obj = {
  getId: () => this.id,
};
```

### Type Definitions

- Prefer `interface` over `type` for object types
- Don't define complex types inline - define them separately

```typescript
// ✅ Do this
interface UserFormProps {
  userId: string;
  onSubmit: (data: UserData) => void;
}

function UserForm(props: UserFormProps) {}

// ❌ Don't do this
function UserForm(props: { userId: string; onSubmit: (data: UserData) => void }) {}
```

### Validation Schemas

Define Valibot schemas for every form in the feature's `schemas/` folder (or `lib/schemas/` for shared schemas).

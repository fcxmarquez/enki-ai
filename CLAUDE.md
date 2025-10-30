# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- **Do not execute `pnpm dev`, because the terminal won't stop and will interrupt your workflow. Instead request the user to run for you to continue**

### Database Management

- `pnpm migrate:generate` - Generate database migrations
- `pnpm migrate:push` - Generate and push migrations to database
- `npx drizzle-kit push` - Push schema changes to database

### Testing & Quality Assurance

- `pnpm storybook` - Run Storybook development server
- `pnpm build-storybook` - Build Storybook for production
- `npx tsx --noEmit && pnpm lint && pnpm build` - Complete quality check (run this after finishing tasks)

### Git Workflow

- Use conventional commits with commitizen (husky installed)
- Use `git commit --no-verify` to bypass hooks when needed
- Follows @commitlint/config-conventional standards

## Architecture Overview

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Package Manager**: pnpm
- **State Management**: Zustand with persistence
- **Database**: Supabase PostgreSQL with Drizzle ORM
- **UI Components**: shadcn/ui + Tailwind CSS
- **AI Integration**: LangChain (OpenAI & Anthropic)
- **Data Fetching**: TanStack Query
- **Animations**: Motion library
- **Forms**: React Hook Form

### Project Structure

#### `/app` - Next.js App Router

- Main application layout with sidebar navigation
- Authentication pages (login, callback, auth-error)
- Global providers setup (QueryClient, ThemeProvider, ErrorBoundary)

#### `/components` - UI Components

- **Organized by functionality**: Buttons, Inputs, Modals, Feedback, etc.
- **UI components**: shadcn/ui components in `/ui` directory
- **Navigation**: Sidebar, nav actions, chat history, model selector
- **Chat**: Conversation components, bubble chat, input chat

#### `/db` - Database Layer

- **Schema**: Drizzle schema definitions for users, conversations, messages
- **Migrations**: Auto-generated SQL migrations
- **Relations**: Database relationships and constraints

#### `/store` - State Management

- **Zustand store with slices pattern**:
  - `uiSlice` - UI state (modals, status)
  - `chatSlice` - Chat conversations and messages
  - `configSlice` - API keys and model configuration
  - `userSlice` - User authentication state
- **Persistence**: Chat conversations and config are persisted to localStorage
- **Selectors**: Exported hooks for accessing store state

#### `/fetch` - API Layer

- **Chat mutations**: `useSendMessage`, `useSendMessageStream` with TanStack Query
- **Service integration**: Uses ChatService for AI model communication

#### `/lib` - Utilities & Services

- **ChatService**: Singleton service for AI model interactions
  - Supports OpenAI (GPT, O-series) and Anthropic (Claude) models
  - Handles streaming responses and model-specific configuration
  - Reasoning models (o3, o4-mini) don't use temperature parameter

## Key Implementation Details

### State Management Pattern

- Zustand store with multiple slices for separation of concerns
- Persisted state with version migration support
- Exported selector hooks for component consumption

### AI Integration

- ChatService singleton manages model instances
- Supports both OpenAI and Anthropic via LangChain
- Streaming responses with chunk-by-chunk processing
- Model-specific configuration (temperature, reasoning models)

### Database Schema

- Users table with Supabase auth integration
- Conversations belong to users
- Messages cascade delete with conversations
- Requires manual Supabase trigger setup for user creation

### Authentication

- Supabase authentication (currently disabled for rebuild - see providers.tsx)
- Row Level Security policies for data access
- OAuth integration (Google) mentioned in README

### Environment Setup

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL`

## Development Guidelines

### Code Quality

- Always run `npx tsx --noEmit && pnpm lint && pnpm build` after completing tasks
- Use conventional commit messages
- Follow existing component patterns and naming conventions

### Linear Task Management

- When working with Linear MCP or Linear Tasks, never move tasks to completed status

### Testing

- Vitest configured with Storybook integration
- Browser testing with Playwright
- Storybook for component development and testing

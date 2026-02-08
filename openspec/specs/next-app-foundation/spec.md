# Next.js App Foundation

## Purpose

Provides the core Next.js application framework with TypeScript, Tailwind CSS, and essential configuration for building the Pompidou catalogue website.

---

## Requirements

### Requirement: Next.js App Router Setup

The application SHALL use Next.js 16 with the App Router architecture for routing and rendering.

#### Scenario: Application boots successfully
- **WHEN** the development server starts
- **THEN** the application serves on port 3000
- **AND** the App Router handles routing

#### Scenario: TypeScript compilation
- **WHEN** TypeScript files are processed
- **THEN** they compile without errors
- **AND** type checking is enforced

---

### Requirement: Tailwind CSS Styling

The application SHALL use Tailwind CSS 4 for styling with proper configuration.

#### Scenario: Tailwind classes are applied
- **WHEN** components use Tailwind utility classes
- **THEN** the CSS is generated correctly
- **AND** the styling renders as expected

#### Scenario: Global styles load
- **WHEN** the application renders
- **THEN** global CSS from `globals.css` is applied
- **AND** base Tailwind styles are available

---

### Requirement: Root Layout Configuration

The application SHALL provide a root layout with metadata and consistent structure.

#### Scenario: Metadata is set
- **WHEN** any page loads
- **THEN** the page title is "Pompidou - Autonomous Dev System Catalogue"
- **AND** the meta description includes "80+ evaluated tools across 5 phases"

#### Scenario: HTML structure
- **WHEN** the root layout renders
- **THEN** it includes proper HTML lang attribute
- **AND** body has antialiased class for font smoothing
- **AND** children are rendered within the body

---

### Requirement: Development Environment

The application SHALL support standard Next.js development workflow.

#### Scenario: Development server
- **WHEN** `npm run dev` is executed
- **THEN** the server starts with hot reload enabled
- **AND** changes are reflected without full restart

#### Scenario: Production build
- **WHEN** `npm run build` is executed
- **THEN** optimized production bundles are created
- **AND** static generation occurs where applicable

#### Scenario: Linting
- **WHEN** `npm run lint` is executed
- **THEN** ESLint checks are performed
- **AND** Next.js-specific rules are enforced

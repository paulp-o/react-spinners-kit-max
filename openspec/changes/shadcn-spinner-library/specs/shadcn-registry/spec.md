## ADDED Requirements

### Requirement: Valid registry.json schema
The project SHALL produce a `registry.json` file conforming to the shadcn registry schema at `https://ui.shadcn.com/schema/registry.json`.

#### Scenario: Schema validation
- **WHEN** the registry.json is validated against the shadcn schema
- **THEN** validation passes with no errors

### Requirement: Installable via npx shadcn add
Users SHALL be able to install the spinner component via `npx shadcn add <registry-url>/spinner`.

#### Scenario: shadcn CLI installation
- **WHEN** a user runs `npx shadcn add https://paulp-o.github.io/react-spinners-kit-max/r/spinner`
- **THEN** the Spinner component files and CSS keyframes are copied to the user's project
- **AND** required dependencies (class-variance-authority, clsx, tailwind-merge) are added to package.json

### Requirement: CSS keyframes included in registry
The registry item SHALL include all spinner CSS keyframes in the `css` field so they are automatically injected into the user's CSS.

#### Scenario: Keyframes auto-injection
- **WHEN** a user installs the spinner via shadcn CLI
- **THEN** all 36 spinner `@keyframes` definitions are added to the user's global CSS

### Requirement: Tailwind v3 and v4 compatibility
The registry SHALL provide CSS that works with both Tailwind v3 (tailwind.config.js) and Tailwind v4 (@theme directive).

#### Scenario: Tailwind v4 project
- **WHEN** installed in a Tailwind v4 project
- **THEN** animations work via `@theme` CSS variable integration

#### Scenario: Tailwind v3 project
- **WHEN** installed in a Tailwind v3 project
- **THEN** animations work with plain CSS @keyframes (no config extension needed)

### Requirement: Registry hosted on GitHub Pages
The registry JSON SHALL be served from `paulp-o.github.io/react-spinners-kit-max/r/`.

#### Scenario: Registry accessible
- **WHEN** fetching `https://paulp-o.github.io/react-spinners-kit-max/r/registry.json`
- **THEN** a valid JSON response is returned with the spinner component listed

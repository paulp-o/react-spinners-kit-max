## Why

react-spinners-kit (36 spinner components) has been unmaintained for 8 years. It depends on React 16, styled-components v4, prop-types, and Babel 6-era tooling — all of which cause dependency conflicts in modern React 18+ projects. There is no drop-in alternative that provides the same visual variety with modern tooling.

## What Changes

- **New package**: `react-spinners-kit-max` — a complete modernization of all 36 spinners from react-spinners-kit
- **shadcn-compatible registry**: Installable via `npx shadcn add` from a hosted registry on GitHub Pages
- **npm package**: Also published as a standard npm package for non-shadcn users
- **Unified API**: Single `<Spinner variant="ball" />` component with variant selection instead of 36 separate imports
- **Modern stack**: TypeScript, Tailwind CSS (v3 + v4), CSS keyframes (1:1 conversion from original styled-components), CSS variables for theming
- **Monorepo**: Turborepo with `packages/spinners` (library) + `apps/docs` (documentation site)
- **Documentation site**: Interactive playground with live preview, customization controls, deployed to GitHub Pages
- **Accessibility**: `role="status"`, `aria-label`, `prefers-reduced-motion` support

## Capabilities

### New Capabilities
- `spinner-components`: All 36 spinner animations ported from react-spinners-kit with 1:1 visual fidelity. CSS keyframes extracted from styled-components, timing/transform values preserved exactly. Complex cases use inline styles.
- `spinner-api`: Unified `<Spinner variant="..." />` component with size variants (sm/md/lg/xl + custom pixel size), CSS variable color theming, and loading/a11y props.
- `shadcn-registry`: Registry JSON hosted on GitHub Pages (`paulp-o.github.io/react-spinners-kit-max/registry.json`) enabling `npx shadcn add` installation.
- `npm-package`: Standard npm package distribution with Vite library mode build, ESM + CJS output, TypeScript declarations.
- `docs-site`: Interactive documentation with spinner previews, customization playground (size/color controls), code copy, and install commands. Deployed to GitHub Pages.

### Modified Capabilities
<!-- None — this is a greenfield project -->

## Impact

- **Dependencies**: React 18+, Tailwind CSS (v3 or v4), `class-variance-authority`, `clsx`, `tailwind-merge`
- **Build**: Vite library mode (packages/spinners), Next.js or similar (apps/docs), Turborepo orchestration
- **Testing**: Vitest + Testing Library for component tests
- **Deployment**: GitHub Pages (docs + registry), npm registry (package). GitHub account: `paulp-o` exclusively
- **No breaking changes**: Greenfield project, no existing users

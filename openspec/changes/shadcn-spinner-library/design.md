## Context

react-spinners-kit provides 36 CSS-animated spinner components built with styled-components + React 16. The library is abandoned (8 years) and incompatible with modern React. We are creating a greenfield modernization as a shadcn-compatible copy-paste library.

Original tech: styled-components v4 `keyframes` helper, prop-types, polished (CSS helpers), Webpack 4.
Target tech: TypeScript, Tailwind CSS (v3+v4), CSS keyframes, CVA, CSS variables, Vite, Turborepo.

User constraints:
- Original animation fidelity is the #1 priority — every timing function, transform value, and keyframe step must be preserved exactly
- Single unified `<Spinner variant="ball" />` API (not individual component imports)
- Must work with both Tailwind v3 (tailwind.config.js) and v4 (@theme)
- GitHub account `paulp-o` exclusively for all deployments

## Goals / Non-Goals

**Goals:**
- Port all 36 spinners with pixel-perfect animation fidelity to the original
- Provide shadcn registry installable via `npx shadcn add`
- Publish as npm package simultaneously
- Unified Spinner component with variant selection, size variants (sm/md/lg/xl + custom px), CSS variable theming
- Interactive docs site with playground, deployed to GitHub Pages
- Basic a11y (role=status, aria-label, prefers-reduced-motion)

**Non-Goals:**
- Creating new spinner designs beyond the original 36
- Server-side rendering optimization (spinners are inherently client-side)
- Supporting React < 18
- Mobile-native (React Native) support
- Animated transitions between spinner variants

## Decisions

### 1. Animation implementation: CSS keyframes extracted from styled-components
**Decision**: Extract all keyframes from styled-components `keyframes` template literals and convert to plain CSS `@keyframes`. Preserve exact timing functions (`cubic-bezier(...)`) and transform values. For dynamic keyframes that depend on props (e.g., size-dependent translations), use CSS custom properties or inline styles.

**Alternatives considered**:
- Keep styled-components as dependency → adds 12KB+ bundle, conflicts with Tailwind philosophy
- Use framer-motion → unnecessary overhead for pure CSS animations, adds bundle size
- CSS Modules → doesn't integrate with shadcn/Tailwind ecosystem

**Rationale**: Pure CSS keyframes have zero JS runtime cost, run on compositor thread (GPU), and are the shadcn-native approach. Original animations are all CSS-based already.

### 2. Tailwind v3 + v4 dual support
**Decision**: Ship CSS keyframes in a standalone `.css` file that users import. For Tailwind v4, provide `@theme` block with `--animate-*` variables. For Tailwind v3, provide `tailwind.config.js` extension snippet. The registry `css` field injects keyframes automatically for shadcn users.

**Alternatives considered**:
- v4 only → excludes large v3 user base
- Runtime style injection → conflicts with SSR, adds complexity

### 3. Unified Spinner API with CVA
**Decision**: Single `<Spinner />` component using `class-variance-authority` for variants. `variant` prop selects which spinner animation to render (each variant maps to a different internal render function). `size` accepts both named variants (sm/md/lg/xl) and custom pixel numbers.

**Alternatives considered**:
- 36 individual components → poor DX, 36 registry entries needed
- Generic wrapper + lazy loading → unnecessary complexity for CSS-only animations

### 4. Color theming via CSS variables
**Decision**: Use `--spinner-color` and `--spinner-secondary-color` CSS variables, defaulting to `currentColor`. Integrates naturally with shadcn's CSS variable theming system. Users override via className or style prop.

### 5. Monorepo structure (Turborepo + pnpm)
**Decision**:
```
packages/
  spinners/        # The library (Vite library mode build)
    src/
      spinners/    # 36 spinner render functions
      spinner.tsx  # Unified <Spinner /> component
      styles.css   # All keyframes
      index.ts     # Exports
apps/
  docs/            # Documentation site (GitHub Pages)
```

### 6. Registry hosting on GitHub Pages
**Decision**: `registry.json` served from `paulp-o.github.io/react-spinners-kit-max/r/`. The docs site and registry share the same GitHub Pages deployment. npm package published separately.

## Risks / Trade-offs

- **[Risk] Some styled-components keyframes use dynamic props (size-dependent transforms)** → Mitigation: Use CSS custom properties (`--spinner-size`) set via inline style, referenced in keyframes. Falls back to inline styles for truly dynamic cases.
- **[Risk] 36 spinner variants in one component increases bundle** → Mitigation: Each variant's render function is small (JSX + className). Total CSS ~15-20KB uncompressed. Tree-shaking not possible with variant approach but acceptable for the use case.
- **[Risk] Tailwind v3/v4 dual support maintenance burden** → Mitigation: The CSS keyframes are framework-agnostic. Only the config integration differs, and it's documented once.
- **[Risk] GitHub Pages has no server-side logic** → Mitigation: Registry is static JSON, no server needed. Docs use static export.

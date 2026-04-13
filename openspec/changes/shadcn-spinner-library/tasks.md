## 1. Project Scaffolding

- [x] 1.1 Initialize Turborepo monorepo with pnpm workspaces (root package.json, pnpm-workspace.yaml, turbo.json)
- [x] 1.2 Scaffold `packages/spinners` with Vite library mode config, TypeScript, React 18+ peer dep
- [x] 1.3 Add shared dependencies: class-variance-authority, clsx, tailwind-merge
- [x] 1.4 Create `packages/spinners/src/lib/utils.ts` with `cn()` utility (clsx + tailwind-merge)
- [x] 1.5 Configure Vitest for packages/spinners

## 2. Fetch Original Source Code

- [x] 2.1 Clone/download react-spinners-kit source into `opensrc/` for reference
- [x] 2.2 Document all 36 spinners' keyframe definitions, timing functions, and DOM structures

## 3. CSS Keyframes Extraction

- [x] 3.1 Extract CSS @keyframes from all 36 styled-components spinners into `packages/spinners/src/styles.css`
- [x] 3.2 Preserve exact timing functions (cubic-bezier), transform values, animation durations, and keyframe percentages
- [x] 3.3 Convert dynamic/prop-dependent keyframes to use CSS custom properties (--spinner-size, etc.)
- [x] 3.4 Add prefers-reduced-motion media query to pause/simplify all animations

## 4. Spinner Render Functions (Batch 1: Spinners 1-12)

- [x] 4.1 Implement BallSpinner, GridSpinner, SwapSpinner, BarsSpinner render functions in TypeScript
- [x] 4.2 Implement WaveSpinner, PushSpinner, FireworkSpinner, StageSpinner render functions
- [x] 4.3 Implement HeartSpinner, GuardSpinner, CircleSpinner, SpiralSpinner render functions

## 5. Spinner Render Functions (Batch 2: Spinners 13-24)

- [x] 5.1 Implement PulseSpinner, SequenceSpinner, DominoSpinner, ImpulseSpinner render functions
- [x] 5.2 Implement CubeSpinner, FillSpinner, SphereSpinner, FlagSpinner render functions
- [x] 5.3 Implement ClapSpinner, RotateSpinner, SwishSpinner, GooSpinner render functions

## 6. Spinner Render Functions (Batch 3: Spinners 25-36)

- [x] 6.1 Implement CombSpinner, PongSpinner, RainbowSpinner, RingSpinner render functions
- [x] 6.2 Implement HoopSpinner, FlapperSpinner, MagicSpinner, JellyfishSpinner render functions
- [x] 6.3 Implement TraceSpinner, ClassicSpinner, WhisperSpinner, MetroSpinner render functions

## 7. Unified Spinner Component

- [x] 7.1 Create `<Spinner />` component with CVA variants (variant, size) and CSS variable theming
- [x] 7.2 Add variant prop (union type of 36 spinner names) mapping to render functions
- [x] 7.3 Add size prop supporting named variants (sm/md/lg/xl) and custom pixel numbers
- [x] 7.4 Add a11y: role="status", default aria-label="Loading", className/style forwarding via cn()
- [x] 7.5 Create index.ts barrel export

## 8. Build & Package

- [x] 8.1 Configure Vite library mode build (ESM + CJS output, externalize React)
- [x] 8.2 Generate TypeScript declarations (.d.ts)
- [x] 8.3 Configure package.json exports (main, module, types, styles.css)
- [x] 8.4 Verify build output works: ESM import, CJS require, CSS import

## 9. shadcn Registry

- [x] 9.1 Create registry.json conforming to shadcn schema with spinner component entry
- [x] 9.2 Include CSS keyframes in registry css field for auto-injection
- [x] 9.3 Declare dependencies (cva, clsx, tailwind-merge) in registry item
- [x] 9.4 Test registry with `npx shadcn add` against local server

## 10. Testing

- [x] 10.1 Write Vitest tests: all 36 variants render without errors
- [x] 10.2 Write tests: size variants (sm/md/lg/xl/custom px) apply correct dimensions
- [x] 10.3 Write tests: a11y attributes (role, aria-label) are present
- [x] 10.4 Write tests: className and style forwarding works correctly

## 11. Documentation Site

- [x] 11.1 Scaffold docs app in `apps/docs` with static site framework + Tailwind
- [x] 11.2 Build spinner gallery page showing all 36 spinners with live animations
- [x] 11.3 Build customization playground (size slider, color picker, live preview)
- [x] 11.4 Add code copy buttons and install command display (shadcn + npm)
- [x] 11.5 Configure static export for GitHub Pages deployment

## 12. Deployment

- [x] 12.1 Set up GitHub Actions for GitHub Pages deployment (docs + registry.json) under paulp-o account
- [x] 12.2 Configure npm publish workflow
- [x] 12.3 Verify registry URL accessible at paulp-o.github.io/react-spinners-kit-max/r/registry.json
- [x] 12.4 Verify npm package installable and functional

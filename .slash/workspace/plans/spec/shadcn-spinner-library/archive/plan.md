---
created: 2026-04-14T00:00:00Z
last_updated: 2026-04-14T00:00:00Z
type: spec
change_id: shadcn-spinner-library
status: done
trigger: "Modernize react-spinners-kit (36 spinners) into a shadcn-compatible copy-paste library with npm package, registry, and docs site"
---

# Plan: shadcn-Compatible Spinner Library (react-spinners-kit-max)

## Background & Research

### Research Files
- `.slash/workspace/research/original-repo-analysis.md` — Full analysis of all 36 original spinners, props, defaults, DOM structures
- `.slash/workspace/research/shadcn-registry-patterns.md` — shadcn registry schema, third-party patterns, Magic UI examples
- `.slash/workspace/research/modern-spinner-patterns.md` — CSS keyframes in Tailwind v4, CVA patterns, a11y, performance
- `.slash/workspace/research/spec-shadcn-spinner-library-registry-schema.md` — Latest 2025-2026 registry JSON schema, `npx shadcn build`, GitHub Pages hosting

### Project State
- **Completely greenfield** — no package.json, no src/, no tsconfig. Only `openspec/`, `opensrc/`, `.slash/`, `AGENTS.md`, `.gitignore` exist.
- **Original source available** at `opensrc/repos/github.com/dmitrymorozoff/react-spinners-kit/` — all 36 spinner JS files with styled-components keyframes.

### Target Monorepo Structure
```
react-spinners-kit-max/
├── package.json                    # Root workspace
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.json                   # Root TS config (references)
├── packages/
│   └── spinners/
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       ├── vitest.config.ts
│       ├── src/
│       │   ├── index.ts            # Barrel export
│       │   ├── spinner.tsx         # Unified <Spinner /> component
│       │   ├── types.ts            # Shared types
│       │   ├── lib/
│       │   │   └── utils.ts        # cn() utility
│       │   ├── styles.css          # All @keyframes
│       │   └── spinners/           # 36 render functions
│       │       ├── ball.tsx
│       │       ├── grid.tsx
│       │       ├── swap.tsx
│       │       └── ... (33 more)
│       ├── __tests__/
│       │   ├── setup.ts
│       │   ├── spinner.test.tsx    # Unified component tests
│       │   └── spinners/           # Per-spinner tests
│       │       ├── ball.test.tsx
│       │       └── ...
│       └── registry/
│           └── registry.json
├── apps/
│   └── docs/
│       ├── package.json
│       ├── vite.config.ts
│       ├── index.html
│       ├── src/
│       │   ├── main.tsx
│       │   ├── App.tsx
│       │   ├── components/
│       │   │   ├── Gallery.tsx
│       │   │   ├── Playground.tsx
│       │   │   └── CodeBlock.tsx
│       │   └── styles/
│       │       └── globals.css
│       └── public/
│           └── r/                  # Registry output
│               └── registry.json
└── .github/
    └── workflows/
        ├── deploy-pages.yml
        └── publish-npm.yml
```

### Original Spinner Categories

**OneColor spinners (27)** — accept `color` prop:
BallSpinner, GridSpinner, SwapSpinner, BarsSpinner, WaveSpinner, PushSpinner, FireworkSpinner, StageSpinner, HeartSpinner, CircleSpinner, PulseSpinner, DominoSpinner, FillSpinner, SphereSpinner, FlagSpinner, ClapSpinner, RotateSpinner, GooSpinner, CombSpinner, PongSpinner, RainbowSpinner, RingSpinner, HoopSpinner, FlapperSpinner, MagicSpinner, JellyfishSpinner, ClassicSpinner, MetroSpinner

**TwoColor spinners (9)** — accept `frontColor`/`backColor` props:
GuardSpinner, SpiralSpinner, SequenceSpinner, ImpulseSpinner, CubeSpinner, SwishSpinner, TraceSpinner, WhisperSpinner

### Keyframe Pattern Categories

**Static keyframes (no prop interpolation)** — can be pure CSS `@keyframes`:
CircleSpinner, CubeSpinner, GuardSpinner, MagicSpinner, PulseSpinner, HeartSpinner, FillSpinner, SphereSpinner, FlagSpinner, RotateSpinner, CombSpinner, RingSpinner, HoopSpinner, FlapperSpinner, ClassicSpinner, MetroSpinner, SwishSpinner, StageSpinner, DominoSpinner, RainbowSpinner, ClapSpinner, SwapSpinner, PushSpinner, FireworkSpinner, PongSpinner, GooSpinner, TraceSpinner, WhisperSpinner, SequenceSpinner, SpiralSpinner, ImpulseSpinner

**Dynamic keyframes (prop-dependent transforms)** — need CSS custom properties:
BallSpinner (translateX uses size), GridSpinner (position uses size), JellyfishSpinner (translateY uses size), BarsSpinner (may use size), WaveSpinner (may use size)

### Key Code Patterns

**cn() utility** (`packages/spinners/src/lib/utils.ts`):
```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Spinner variant type** (`packages/spinners/src/types.ts`):
```ts
export type SpinnerVariant =
  | "ball" | "grid" | "swap" | "bars" | "wave" | "push"
  | "firework" | "stage" | "heart" | "guard" | "circle" | "spiral"
  | "pulse" | "sequence" | "domino" | "impulse" | "cube" | "fill"
  | "sphere" | "flag" | "clap" | "rotate" | "swish" | "goo"
  | "comb" | "pong" | "rainbow" | "ring" | "hoop" | "flapper"
  | "magic" | "jellyfish" | "trace" | "classic" | "whisper" | "metro";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: SpinnerVariant;
  size?: "sm" | "md" | "lg" | "xl" | number;
  loading?: boolean;
  "aria-label"?: string;
}
```

**Unified Spinner component pattern** (`packages/spinners/src/spinner.tsx`):
```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./lib/utils";
import type { SpinnerVariant, SpinnerProps } from "./types";
// import all 36 render functions
import { renderBall } from "./spinners/ball";
// ...

const spinnerVariants = cva("inline-flex items-center justify-center", {
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-8 h-8",
      lg: "w-12 h-12",
      xl: "w-16 h-16",
    },
  },
  defaultVariants: { size: "md" },
});

const renderers: Record<SpinnerVariant, (props: InternalRenderProps) => React.ReactNode> = {
  ball: renderBall,
  grid: renderGrid,
  // ... all 36
};

function Spinner({ variant, size = "md", loading = true, className, style, "aria-label": ariaLabel = "Loading", ...props }: SpinnerProps) {
  if (!loading) return null;
  const sizeValue = typeof size === "number" ? size : undefined;
  const sizeVariant = typeof size === "string" ? size : undefined;
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={cn(spinnerVariants({ size: sizeVariant }), className)}
      style={{
        ...(sizeValue ? { width: sizeValue, height: sizeValue, "--spinner-size": `${sizeValue}px` } : {}),
        ...style,
      } as React.CSSProperties}
      {...props}
    >
      {renderers[variant]({ size: sizeValue })}
    </div>
  );
}
```

**Individual spinner render function pattern** (e.g., `packages/spinners/src/spinners/circle.tsx`):
```tsx
import type { InternalRenderProps } from "../types";

export function renderCircle({ size }: InternalRenderProps) {
  return (
    <div
      className="w-full h-full rounded-full border-2 border-[var(--spinner-color,currentColor)] border-r-transparent animate-[spinner-circle_0.75s_linear_infinite]"
    />
  );
}
```

**CSS keyframes pattern** (`packages/spinners/src/styles.css`):
```css
/* Static keyframes */
@keyframes spinner-circle {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Dynamic keyframes using CSS custom properties */
@keyframes spinner-ball {
  0% { transform: translateX(0) scale(1); }
  25% { transform: translateX(calc(var(--spinner-size, 40px) / 2)) scale(0.25); }
  50% { transform: translateX(0) scale(1); }
  75% { transform: translateX(calc(var(--spinner-size, 40px) / -2)) scale(0.25); }
  100% { transform: translateX(0) scale(1); }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  [role="status"] * {
    animation-duration: 0s !important;
    animation-play-state: paused !important;
  }
}
```

**Original BallSpinner source** (`opensrc/repos/github.com/dmitrymorozoff/react-spinners-kit/src/components/ball/index.js`):
```js
import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const motion = props => keyframes`
    0% { transform: translateX(0) scale(1); }
    25% { transform: translateX(${props.size / 2}${props.sizeUnit}) scale(0.25); }
    50% { transform: translateX(0) scale(1); }
    75% { transform: translateX(${-props.size / 2}${props.sizeUnit}) scale(0.25); }
    100% { transform: translateX(0) scale(1); }
`;

const Ball = styled.div`
    width: ${props => `${props.size / 5}${props.sizeUnit}`};
    height: ${props => `${props.size / 5}${props.sizeUnit}`};
    border-radius: 50%;
    background-color: ${props => props.color};
    animation: ${props => motion(props)} 3s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
`;

export const BallSpinner = ({ size, color, loading, sizeUnit }) => {
    return loading && <Ball size={size} color={color} sizeUnit={sizeUnit} />;
};

BallSpinner.defaultProps = { loading: true, size: 40, color: "#00ff89", sizeUnit: "px" };
```

**Original CircleSpinner source** (static keyframes example):
```js
const rotate = keyframes`
    100% { transform: rotate(360deg); }
`;

const Wrapper = styled.div`
    display: inline-block;
    width: ${props => `${props.size}${props.sizeUnit}`};
    height: ${props => `${props.size}${props.sizeUnit}`};
    border: 3px solid ${props => props.color};
    border-right-color: transparent;
    border-radius: 50%;
    animation: ${rotate} 0.75s linear infinite;
`;
```

**Original CubeSpinner source** (3D transform example):
```js
const rotate = keyframes`
    0% { transform: rotateX(0) rotateY(0) rotateZ(0); }
    50% { transform: rotateX(180deg) rotateY(180deg) rotateZ(0); }
    100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(0); }
`;
// Uses perspective, transform-style: preserve-3d, 6 Side elements
```

**shadcn registry.json structure** (from research):
```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "react-spinners-kit-max",
  "homepage": "https://paulp-o.github.io/react-spinners-kit-max",
  "items": [
    {
      "name": "spinner",
      "type": "registry:ui",
      "title": "Spinner",
      "description": "36 animated spinner variants with CSS keyframes",
      "dependencies": ["class-variance-authority", "clsx", "tailwind-merge"],
      "registryDependencies": ["utils"],
      "files": [
        { "path": "components/ui/spinner.tsx", "type": "registry:component" },
        { "path": "components/ui/spinners/ball.tsx", "type": "registry:component" }
      ],
      "css": {
        "@keyframes spinner-circle": { "0%": { "transform": "rotate(0deg)" }, "100%": { "transform": "rotate(360deg)" } }
      },
      "cssVars": {
        "theme": { "--animate-spinner-circle": "spinner-circle 0.75s linear infinite" }
      }
    }
  ]
}
```

**Vite library mode config** (`packages/spinners/vite.config.ts`):
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ReactSpinnersKitMax",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: { globals: { react: "React", "react-dom": "ReactDOM" } },
    },
  },
});
```

### Default Sizes & Colors (from original source)
| Spinner | Default Size | Default Color(s) |
|---------|-------------|-------------------|
| BallSpinner | 40 | #00ff89 |
| BarsSpinner | 40 | #00ff89 |
| CircleSpinner | 30 | #fff |
| CubeSpinner | 25 | front:#00ff89 back:#4b4c56 |
| DominoSpinner | 100 | #686769 |
| FillSpinner | 20 | #686769 |
| FireworkSpinner | 40 | #fff |
| FlagSpinner | 40 | #fff |
| GridSpinner | 40 | #fff |
| GuardSpinner | 40 | front:#00ff89 back:#686769 |
| HeartSpinner | 40 | #fff |
| ImpulseSpinner | 40 | front:#00ff89 back:#4b4c56 |
| PulseSpinner | 40 | #fff |
| PushSpinner | 30 | #686769 |
| SequenceSpinner | 40 | front:#00ff89 back:#686769 |
| SphereSpinner | 30 | #fff |
| SpiralSpinner | 40 | front:#00ff89 back:#686769 |
| StageSpinner | 40 | #fff |
| SwapSpinner | 40 | #686769 |
| WaveSpinner | 30 | #fff |
| ClapSpinner | 30 | front:#00ff89 back:#686769 |
| RotateSpinner | 45 | #00ff89 |
| SwishSpinner | 40 | front:#4b4c56 back:#fff |
| GooSpinner | 55 | #fff |
| CombSpinner | 100 | #fff |
| PongSpinner | 60 | #4b4c56 |
| RainbowSpinner | 50 | #fff |
| RingSpinner | 30 | #00ff89 |
| HoopSpinner | 45 | #4b4c56 |
| FlapperSpinner | 30 | #00ff89 |
| MagicSpinner | 70 | #fff |
| JellyfishSpinner | 60 | #4b4c56 |
| TraceSpinner | 70 | front:#00ff89 back:#4b4c56 |
| ClassicSpinner | 30 | #fff |
| MetroSpinner | 40 | #fff |
| WhisperSpinner | 50 | front:#4b4c56 back:#00ff89 |

---

## Testing Plan (TDD — tests first)

### Test Infrastructure
- [ ] T1. Create `packages/spinners/__tests__/setup.ts` with jsdom environment, Testing Library cleanup, and CSS custom property mocking
- [ ] T2. Create `packages/spinners/vitest.config.ts` with jsdom environment, setup file reference, coverage config

### Core Component Tests (write BEFORE implementation)
- [ ] T3. Create `packages/spinners/__tests__/spinner.test.tsx` — test unified `<Spinner />` renders without error for every one of the 36 variant values (parameterized test using `it.each`)
- [ ] T4. In same file — test `size="sm"`, `size="md"`, `size="lg"`, `size="xl"` apply correct Tailwind dimension classes (`w-4 h-4`, `w-8 h-8`, `w-12 h-12`, `w-16 h-16`)
- [ ] T5. In same file — test `size={48}` (number) sets inline width/height to 48px and `--spinner-size` CSS variable
- [ ] T6. In same file — test default `size` is `"md"` when no size prop provided
- [ ] T7. In same file — test `role="status"` and `aria-label="Loading"` are present by default
- [ ] T8. In same file — test custom `aria-label="데이터 로딩 중"` overrides the default
- [ ] T9. In same file — test `className="mt-4"` is forwarded and merged with internal classes
- [ ] T10. In same file — test `style={{ color: "red" }}` is forwarded to root element
- [ ] T11. In same file — test `loading={false}` renders null (nothing in the DOM)
- [ ] T12. In same file — test `loading={true}` (default) renders the spinner
- [ ] T13. In same file — test TypeScript: invalid variant string causes type error (compile-time, verify via type assertion in test)

### Individual Spinner Render Tests
- [ ] T14. Create `packages/spinners/__tests__/spinners/render-all.test.tsx` — for each of the 36 render functions, verify: (a) returns valid JSX, (b) root element has animation-related CSS class or inline style, (c) correct number of child elements matches original DOM structure
- [ ] T15. In same file — test that BallSpinner (dynamic keyframe) correctly references `--spinner-size` CSS variable in its animation
- [ ] T16. In same file — test that CubeSpinner has exactly 6 child elements (faces) with 3D transform styles
- [ ] T17. In same file — test that GuardSpinner renders 9 cube elements
- [ ] T18. In same file — test that JellyfishSpinner renders 6 ring elements with staggered animation-delay

### CSS Tests
- [ ] T19. Create `packages/spinners/__tests__/styles.test.ts` — verify `styles.css` file exists and contains `@keyframes` for all 36 spinners (string matching on keyframe names)
- [ ] T20. In same file — verify `@media (prefers-reduced-motion: reduce)` block exists in styles.css

### Build Output Tests
- [ ] T21. Create `packages/spinners/__tests__/build.test.ts` — after build: verify `dist/index.mjs` (ESM) exists, `dist/index.cjs` (CJS) exists, `dist/index.d.ts` (types) exists, `dist/styles.css` exists
- [ ] T22. In same file — verify package.json `exports` field maps correctly to built files

---

## Implementation Plan

### Group 1: Project Scaffolding
- [ ] I1. Create root `package.json` with `name: "react-spinners-kit-max"`, `private: true`, `packageManager: "pnpm@9.x"`, and scripts (`build`, `dev`, `test`, `lint`)
- [ ] I2. Create `pnpm-workspace.yaml` with `packages: ["packages/*", "apps/*"]`
- [ ] I3. Create `turbo.json` with pipeline: `build` (depends on `^build`), `test`, `dev`, `lint`
- [ ] I4. Create root `tsconfig.json` with project references to `packages/spinners` and `apps/docs`
- [ ] I5. Create `packages/spinners/package.json` with: name `react-spinners-kit-max`, version `0.1.0`, `main` → `dist/index.cjs`, `module` → `dist/index.mjs`, `types` → `dist/index.d.ts`, `exports` field, `files: ["dist", "src"]`, peerDependencies `react >=18`, dependencies `class-variance-authority`, `clsx`, `tailwind-merge`, devDependencies `react`, `react-dom`, `@types/react`, `typescript`, `vite`, `@vitejs/plugin-react`, `vite-plugin-dts`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`
- [ ] I6. Create `packages/spinners/tsconfig.json` with `jsx: "react-jsx"`, strict mode, path aliases
- [ ] I7. Create `packages/spinners/vite.config.ts` — Vite library mode, ESM + CJS output, externalize React, dts plugin
- [ ] I8. Run `pnpm install` from root to install all dependencies

### Group 2: Core Utilities & Types
- [ ] I9. Create `packages/spinners/src/lib/utils.ts` with `cn()` utility (clsx + tailwind-merge)
- [ ] I10. Create `packages/spinners/src/types.ts` with `SpinnerVariant` union type (36 names), `SpinnerProps` interface, `InternalRenderProps` interface

### Group 3: CSS Keyframes Extraction
- [ ] I11. Create `packages/spinners/src/styles.css` — extract ALL `@keyframes` from the 36 original styled-components spinners in `opensrc/repos/github.com/dmitrymorozoff/react-spinners-kit/src/components/`. Each keyframe named `spinner-{variant}` (e.g., `spinner-ball`, `spinner-circle`). Preserve EXACT timing percentages, transform values, opacity values from originals.
- [ ] I12. In `styles.css` — convert dynamic keyframes (BallSpinner, GridSpinner, JellyfishSpinner, WaveSpinner, BarsSpinner) to use `calc()` with `var(--spinner-size, 40px)` instead of prop interpolation
- [ ] I13. In `styles.css` — add `@media (prefers-reduced-motion: reduce)` block that sets `animation-play-state: paused` on all `[role="status"] *` elements
- [ ] I14. In `styles.css` — add helper animation utility classes if needed (e.g., staggered delay classes for multi-element spinners)

### Group 4: Spinner Render Functions — Batch 1 (1-12)
- [ ] I15. Create `packages/spinners/src/spinners/ball.tsx` — `renderBall` function: single div with `--spinner-size` CSS var, animation `spinner-ball 3s cubic-bezier(0.165, 0.84, 0.44, 1) infinite`
- [ ] I16. Create `packages/spinners/src/spinners/grid.tsx` — `renderGrid` function: 9 child divs in 3x3 layout, each with staggered animation, dynamic positioning via `--spinner-size`
- [ ] I17. Create `packages/spinners/src/spinners/swap.tsx` — `renderSwap` function
- [ ] I18. Create `packages/spinners/src/spinners/bars.tsx` — `renderBars` function
- [ ] I19. Create `packages/spinners/src/spinners/wave.tsx` — `renderWave` function
- [ ] I20. Create `packages/spinners/src/spinners/push.tsx` — `renderPush` function
- [ ] I21. Create `packages/spinners/src/spinners/firework.tsx` — `renderFirework` function
- [ ] I22. Create `packages/spinners/src/spinners/stage.tsx` — `renderStage` function
- [ ] I23. Create `packages/spinners/src/spinners/heart.tsx` — `renderHeart` function
- [ ] I24. Create `packages/spinners/src/spinners/guard.tsx` — `renderGuard` function: 9 CubeWrapper elements, each with 2 Side children, TwoColor support via `--spinner-color` / `--spinner-secondary-color`
- [ ] I25. Create `packages/spinners/src/spinners/circle.tsx` — `renderCircle` function: single div, border-based, 0.75s linear rotate
- [ ] I26. Create `packages/spinners/src/spinners/spiral.tsx` — `renderSpiral` function: TwoColor support

### Group 5: Spinner Render Functions — Batch 2 (13-24)
- [ ] I27. Create `packages/spinners/src/spinners/pulse.tsx` — `renderPulse` function: 3 child elements, staggered delays
- [ ] I28. Create `packages/spinners/src/spinners/sequence.tsx` — `renderSequence` function: TwoColor
- [ ] I29. Create `packages/spinners/src/spinners/domino.tsx` — `renderDomino` function
- [ ] I30. Create `packages/spinners/src/spinners/impulse.tsx` — `renderImpulse` function: TwoColor, 3 scaling balls
- [ ] I31. Create `packages/spinners/src/spinners/cube.tsx` — `renderCube` function: 6 Side elements, perspective, preserve-3d, TwoColor
- [ ] I32. Create `packages/spinners/src/spinners/fill.tsx` — `renderFill` function
- [ ] I33. Create `packages/spinners/src/spinners/sphere.tsx` — `renderSphere` function
- [ ] I34. Create `packages/spinners/src/spinners/flag.tsx` — `renderFlag` function
- [ ] I35. Create `packages/spinners/src/spinners/clap.tsx` — `renderClap` function: TwoColor (listed as OneColor in some refs but has frontColor/backColor in original)
- [ ] I36. Create `packages/spinners/src/spinners/rotate.tsx` — `renderRotate` function
- [ ] I37. Create `packages/spinners/src/spinners/swish.tsx` — `renderSwish` function: TwoColor
- [ ] I38. Create `packages/spinners/src/spinners/goo.tsx` — `renderGoo` function

### Group 6: Spinner Render Functions — Batch 3 (25-36)
- [ ] I39. Create `packages/spinners/src/spinners/comb.tsx` — `renderComb` function
- [ ] I40. Create `packages/spinners/src/spinners/pong.tsx` — `renderPong` function
- [ ] I41. Create `packages/spinners/src/spinners/rainbow.tsx` — `renderRainbow` function
- [ ] I42. Create `packages/spinners/src/spinners/ring.tsx` — `renderRing` function
- [ ] I43. Create `packages/spinners/src/spinners/hoop.tsx` — `renderHoop` function
- [ ] I44. Create `packages/spinners/src/spinners/flapper.tsx` — `renderFlapper` function
- [ ] I45. Create `packages/spinners/src/spinners/magic.tsx` — `renderMagic` function: dynamic child count (size/12), staggered delays
- [ ] I46. Create `packages/spinners/src/spinners/jellyfish.tsx` — `renderJellyfish` function: 6 Ring elements, animation-delay per index, dynamic translateY via `--spinner-size`
- [ ] I47. Create `packages/spinners/src/spinners/trace.tsx` — `renderTrace` function: TwoColor
- [ ] I48. Create `packages/spinners/src/spinners/classic.tsx` — `renderClassic` function
- [ ] I49. Create `packages/spinners/src/spinners/whisper.tsx` — `renderWhisper` function: 3x3 grid, TwoColor
- [ ] I50. Create `packages/spinners/src/spinners/metro.tsx` — `renderMetro` function

### Group 7: Unified Spinner Component
- [ ] I51. Create `packages/spinners/src/spinner.tsx` — unified `<Spinner />` with CVA variants, variant→renderer map, size prop (named + custom px), CSS variable color theming (`--spinner-color`, `--spinner-secondary-color` defaulting to `currentColor`), `role="status"`, `aria-label="Loading"`, className/style forwarding via `cn()`
- [ ] I52. Create `packages/spinners/src/index.ts` — barrel export: `export { Spinner } from "./spinner"`, `export type { SpinnerVariant, SpinnerProps } from "./types"`, side-effect CSS import note in JSDoc

### Group 8: Build & Package Verification
- [ ] I53. Verify `pnpm build` from packages/spinners succeeds — produces `dist/index.mjs`, `dist/index.cjs`, `dist/index.d.ts`, `dist/styles.css`
- [ ] I54. Verify `pnpm test` passes all tests from T3-T22
- [ ] I55. Update `packages/spinners/package.json` `exports` field to include `"./styles.css": "./dist/styles.css"` alongside main exports

### Group 9: shadcn Registry
- [ ] I56. Create `packages/spinners/registry/registry.json` — full shadcn registry with: `$schema`, `name: "react-spinners-kit-max"`, `homepage`, single item `"spinner"` with type `registry:ui`, all files listed, all `@keyframes` in `css` field, animation CSS variables in `cssVars.theme`, dependencies `["class-variance-authority", "clsx", "tailwind-merge"]`
- [ ] I57. Add script `registry:build` to `packages/spinners/package.json` that runs `npx shadcn build registry/registry.json -o ../../apps/docs/public/r`
- [ ] I58. Verify registry JSON validates against `https://ui.shadcn.com/schema/registry.json` schema

### Group 10: Documentation Site
- [ ] I59. Create `apps/docs/package.json` with Vite + React, link to local `react-spinners-kit-max` package
- [ ] I60. Create `apps/docs/vite.config.ts` with base path `/react-spinners-kit-max/` for GitHub Pages
- [ ] I61. Create `apps/docs/index.html` — HTML shell with Tailwind CSS
- [ ] I62. Create `apps/docs/src/styles/globals.css` — import Tailwind + spinner styles.css
- [ ] I63. Create `apps/docs/src/main.tsx` — React 18 createRoot entry point
- [ ] I64. Create `apps/docs/src/App.tsx` — layout with header, gallery section, playground section
- [ ] I65. Create `apps/docs/src/components/Gallery.tsx` — grid of all 36 spinners with labels, live animations
- [ ] I66. Create `apps/docs/src/components/Playground.tsx` — spinner selector dropdown, size slider (sm/md/lg/xl + custom px input), color picker (sets `--spinner-color`), live preview, code snippet display
- [ ] I67. Create `apps/docs/src/components/CodeBlock.tsx` — code display with copy-to-clipboard button, shows both `npx shadcn add` and `npm install` commands
- [ ] I68. Configure static export in `apps/docs/vite.config.ts` for GitHub Pages deployment

### Group 11: CI/CD & Deployment
- [ ] I69. Create `.github/workflows/deploy-pages.yml` — GitHub Actions: checkout, pnpm setup, install, build packages/spinners, build registry, build docs, deploy to GitHub Pages on `paulp-o` account
- [ ] I70. Create `.github/workflows/publish-npm.yml` — GitHub Actions: on release tag, build, publish to npm
- [ ] I71. Ensure `paulp-o` account is configured — verify git remote points to `paulp-o/react-spinners-kit-max`

### Group 12: Final Verification
- [ ] I72. Run full test suite (`pnpm test`) — all tests pass
- [ ] I73. Run full build (`pnpm build`) — no errors, clean output
- [ ] I74. Verify `npx shadcn add http://localhost:5173/r/spinner.json` works against local dev server (manual test documented)
- [ ] I75. Verify docs site runs locally with all 36 spinners visible and interactive

---

## Parallelization Plan

### Batch 1 (sequential — single coder)
- [ ] Coder A: Scaffolding [I1-I8] → files: `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.json`, `packages/spinners/package.json`, `packages/spinners/tsconfig.json`, `packages/spinners/vite.config.ts`

### Batch 2 (parallel — after Batch 1)
- [ ] Coder A: Test infrastructure + all test files [T1-T22] → files: `packages/spinners/vitest.config.ts`, `packages/spinners/__tests__/**`
- [ ] Coder B: Core utilities + types + CSS keyframes [I9-I14] → files: `packages/spinners/src/lib/utils.ts`, `packages/spinners/src/types.ts`, `packages/spinners/src/styles.css`

### Batch 3 (parallel — after Batch 2)
- [ ] Coder A: Spinner render functions 1-12 [I15-I26] → files: `packages/spinners/src/spinners/ball.tsx`, `packages/spinners/src/spinners/grid.tsx`, `packages/spinners/src/spinners/swap.tsx`, `packages/spinners/src/spinners/bars.tsx`, `packages/spinners/src/spinners/wave.tsx`, `packages/spinners/src/spinners/push.tsx`, `packages/spinners/src/spinners/firework.tsx`, `packages/spinners/src/spinners/stage.tsx`, `packages/spinners/src/spinners/heart.tsx`, `packages/spinners/src/spinners/guard.tsx`, `packages/spinners/src/spinners/circle.tsx`, `packages/spinners/src/spinners/spiral.tsx`
- [ ] Coder B: Spinner render functions 13-24 [I27-I38] → files: `packages/spinners/src/spinners/pulse.tsx`, `packages/spinners/src/spinners/sequence.tsx`, `packages/spinners/src/spinners/domino.tsx`, `packages/spinners/src/spinners/impulse.tsx`, `packages/spinners/src/spinners/cube.tsx`, `packages/spinners/src/spinners/fill.tsx`, `packages/spinners/src/spinners/sphere.tsx`, `packages/spinners/src/spinners/flag.tsx`, `packages/spinners/src/spinners/clap.tsx`, `packages/spinners/src/spinners/rotate.tsx`, `packages/spinners/src/spinners/swish.tsx`, `packages/spinners/src/spinners/goo.tsx`
- [ ] Coder C: Spinner render functions 25-36 [I39-I50] → files: `packages/spinners/src/spinners/comb.tsx`, `packages/spinners/src/spinners/pong.tsx`, `packages/spinners/src/spinners/rainbow.tsx`, `packages/spinners/src/spinners/ring.tsx`, `packages/spinners/src/spinners/hoop.tsx`, `packages/spinners/src/spinners/flapper.tsx`, `packages/spinners/src/spinners/magic.tsx`, `packages/spinners/src/spinners/jellyfish.tsx`, `packages/spinners/src/spinners/trace.tsx`, `packages/spinners/src/spinners/classic.tsx`, `packages/spinners/src/spinners/whisper.tsx`, `packages/spinners/src/spinners/metro.tsx`

### Batch 4 (sequential — after Batch 3, single coder)
- [ ] Coder A: Unified Spinner component + barrel export + build verification [I51-I55] → files: `packages/spinners/src/spinner.tsx`, `packages/spinners/src/index.ts`, `packages/spinners/package.json` (exports update)

### Batch 5 (parallel — after Batch 4)
- [ ] Coder A: shadcn registry [I56-I58] → files: `packages/spinners/registry/registry.json`, `packages/spinners/package.json` (script addition only)
- [ ] Coder B: Docs site scaffold + pages [I59-I68] → files: `apps/docs/**`

### Batch 6 (sequential — after Batch 5, single coder)
- [ ] Coder A: CI/CD + deployment configs [I69-I71] → files: `.github/workflows/deploy-pages.yml`, `.github/workflows/publish-npm.yml`

### Batch 7 (sequential — after Batch 6, single coder)
- [ ] Coder A: Final verification [I72-I75] → (read-only verification, no file changes)

### Dependencies
- **Batch 1 → Batch 2**: Tests and source files need package.json, tsconfig, vitest config to exist
- **Batch 2 → Batch 3**: Spinner render functions import from `types.ts` and reference classes from `styles.css`
- **Batch 3 → Batch 4**: Unified `<Spinner />` imports all 36 render functions
- **Batch 4 → Batch 5**: Registry needs built output; docs need the spinner package to import
- **Batch 5 → Batch 6**: CI/CD deploys the docs and registry output
- **Batch 6 → Batch 7**: Final verification after everything is wired

### Risk Areas
- **CSS fidelity**: The highest risk is in I11-I12 (keyframe extraction). Dynamic keyframes that interpolate `props.size` in translateX/translateY must be carefully converted to `calc(var(--spinner-size) / N)` equivalents. Each of the 5 dynamic spinners must be visually verified.
- **3D spinners**: CubeSpinner and GuardSpinner use `transform-style: preserve-3d` and `perspective` — these must use inline styles since Tailwind doesn't have direct utilities for these.
- **MagicSpinner dynamic child count**: Original creates `Math.floor(size/12)` children. In the new API, when size is a named variant (sm/md/lg/xl), we need to map to a fixed child count. When size is a custom number, we compute dynamically.
- **Registry `css` field size**: All 36 `@keyframes` in the registry JSON `css` field could be large. Verify shadcn CLI handles this correctly.
- **Batch 3 file isolation**: Three coders work on different spinner files — no shared files, but all spinners must follow the same `renderXxx` function signature from `types.ts` (defined in Batch 2). Mismatched signatures will cause Batch 4 integration failures.

---

## Done Criteria
- [ ] All 36 spinner variants render correctly in tests (T3, T14)
- [ ] Size variants (sm/md/lg/xl/custom px) work correctly (T4-T6)
- [ ] A11y attributes present (T7-T8)
- [ ] className/style forwarding works (T9-T10)
- [ ] loading prop works (T11-T12)
- [ ] `prefers-reduced-motion` is supported (T20)
- [ ] Build produces ESM + CJS + .d.ts + styles.css (T21-T22)
- [ ] Registry JSON validates against shadcn schema (I58)
- [ ] `npx shadcn add` works against local server (I74)
- [ ] Docs site shows all 36 spinners with interactive controls (I75)
- [ ] All tests pass: `pnpm test` exits 0 (I72)
- [ ] All builds succeed: `pnpm build` exits 0 (I73)
- [ ] Diagnostics clean (no TypeScript errors)
- [ ] OpenSpec tasks checked: tasks.md groups 1-12 (all 39 tasks)

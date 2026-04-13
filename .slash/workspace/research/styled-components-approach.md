# Research: styled-components for React 18+ Copy-Paste Spinner Library

**Date**: 2026-04-14

## Summary

This research evaluates whether to use styled-components v6 for a copy-paste spinner library that will be distributed via shadcn registry. The analysis finds that styled-components v6.3.x is compatible with React 18+ and React 19, supports Next.js App Router RSC natively, but carries a ~12-13KB gzipped bundle size overhead. For a copy-paste library, styled-components can be declared as a dependency in the shadcn registry JSON, though this introduces friction for users who prefer Tailwind-only setups. goober offers a lighter (~1.25KB) alternative with a mostly-compatible API, but lacks some advanced features like `.attrs()` and has lower specificity. The research recommends either: (1) using pure CSS keyframes with inline CSS variables for dynamic styling, or (2) bundling styled-components if the visual fidelity requirement justifies the dependency.

---

## 1. React 18+ and React 19 Compatibility

### Finding: styled-components v6 works with React 18+ and React 19

**Evidence**: [styled-components v6.3.8 compatible with React 19.0.0](https://depfixer.com/compatibility/react-19-styled-components-6) — No compatibility issues detected.

**Evidence**: styled-components v6.1.18+ includes React 19 fixes:

> fix react 19 compatibility (#5578) — Quickfix for react 19 for non browser environments ([Release Notes](https://github.com/styled-components/styled-components/compare/styled-components@6.1.14...styled-components@6.1.19))

**Evidence**: styled-components v6.3.0 added native React Server Components (RSC) support:

> styled-components now automatically detects RSC environments and handles CSS delivery appropriately: No `'use client'` directive required; Automatic CSS injection via inline `<style>` tags that React 19 hoists; Works out of the box with Next.js App Router ([Release Notes](https://github.com/styled-components/styled-components/releases/tag/styled-components%406.3.0))

**SSR Compatibility**: The v6.3.0 release notes indicate RSC works without StyledComponentsRegistry in Next.js App Router:

> ThemeProvider and StyleSheetManager become no-ops in RSC. Use CSS custom properties for theming instead ([styled-components.com/docs/faqs](https://www.styled-components.com/docs/faqs))

**Caveat**: A known React 19 warning existed (fixed in v6.3.10-prerelease.0):

> React expected the `href` prop for a `<style>` tag opting into hoisting semantics using the `precedence` prop — Fixed in v6.3.10 ([Issue #5663](https://github.com/styled-components/styled-components/issues/5663))

---

## 2. Implications for End Users

### 2.1 Does the user need to install styled-components separately?

**Yes**. For a copy-paste library, styled-components would be a peer dependency. The user must install it:

```bash
npm install styled-components
```

**Evidence**: The shadcn registry supports declaring npm dependencies in the registry item JSON:

> The `dependencies` property is used to specify the dependencies of your registry item. This is for `npm` packages. ([shadcn registry docs](https://v4.shadcn.com/docs/registry/registry-item-json))

```json
{
  "name": "my-spinner",
  "type": "registry:ui",
  "dependencies": ["styled-components"],
  "files": [{ "path": "spinners/my-spinner.tsx" }]
}
```

### 2.2 Bundle size impact

**styled-components**: ~12.6KB min+gzipped (base bundle)

> Base bundle size: 12.6 kB ([goober README](https://github.com/cristianbote/goober#comparison-and-tradeoffs))

> <13kB gzipped. Small enough to disappear in your bundle. ([styled-components README](https://github.com/styled-components/styled-components))

**Breakdown**: At build time, the user's bundle grows by approximately:

- **Minified**: ~14KB (per Bundlephobia)
- **Gzipped**: ~12-13KB
- **Decompressed**: ~45-50KB

This is a non-trivial addition for a spinner library — spinners are typically small visual components, and adding 12KB for styling infrastructure is significant.

### 2.3 SSR Compatibility (Next.js App Router)

**Finding: Works, but requires understanding**

styled-components v6.3.0+ supports Next.js App Router RSC without configuration. However:

- **With RSC**: Works automatically (no `'use client'` needed)
- **Classic SSR** (getServerSideProps): Requires StyledComponentsRegistry wrapper

**Evidence**: styled-components now works in RSC without any wrapper or directive ([Release Notes v6.3.0](https://github.com/styled-components/styled-components/releases/tag/styled-components%406.3.0))

**Migration note**: For v5 patterns using StyledComponentsRegistry, see migration guide:

> v6 uses the newer stylis v4; if you are providing `stylisPlugins` to `StyleSheetManager`, ensure the plugin is compatible ([FAQs](https://www.styled-components.com/docs/faqs))

---

## 3. Lighter Alternatives

### 3.1 goober

**Size**: ~1.25KB (gzip) — **10x smaller** than styled-components

> Base bundle size: 1.25 kB ([goober README](https://github.com/cristianbote/goober#comparison-and-tradeoffs))

**API Compatibility**:

| Feature | goober | styled-components |
|---------|--------|----------------|
| `css` api | ✅ | ✅ |
| `styled` | ✅ | ✅ |
| `styled.<tag>` | ✅* | ✅ |
| `as` | ✅ | ✅ |
| `.withComponent` | ❌ | ✅ |
| `.attrs` | ❌ | ✅ |
| `shouldForwardProp` | ✅ | ✅ |
| `keyframes` | ✅ | ✅ |
| Theming | ✅ | ✅ |
| SSR | ✅ | ✅ |

**Caveats**:

1. **Selector specificity**: Uses single class (`.hash`) vs styled-components' double class (`.hash.hash`), which can cause specificity issues when migrating ([Issue #607](https://github.com/cristianbote/goober/issues/607))

2. **No default export**: Must use `import { styled } from 'goober'` rather than `import styled from 'goober'`

3. **Missing features**: No `.attrs()`, no `.withComponent()`, no native React Native target

4. **Performance**: Benchmarks show goober is slower than styled-components in SSR:
   > goober x 200,437 ops/sec vs styled-components x 12,650 ops/sec ([goober benchmarks](https://github.com/cristianbote/goober#benchmarks))

### 3.2 @emotion/styled (not recommended for this use case)

- **Size**: ~7.4KB (base) — larger than goober, smaller than styled-components
- **API**: Nearly identical to styled-components
- **Issues**: Requires @emotion/react peer dependency, complex setup

---

## 4. shadcn Registry: Dependency Declaration

### 4.1 Can styled-components be declared as a dependency?

**Yes**. The shadcn registry JSON schema supports `dependencies`:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "my-spinner",
  "type": "registry:ui",
  "dependencies": ["styled-components"],
  "files": [
    {
      "path": "ui/spinner.tsx",
      "content": "...",
      "type": "registry:component"
    }
  ]
}
```

**Evidence**: [shadcn registry item schema](https://v4.shadcn.com/docs/registry/registry-item-json):

> The `dependencies` property is used to specify the dependencies of your registry item. This is for `npm` packages.

**Behavior**: When a user runs `npx shadcn add my-spinner`, the CLI will:

1. Install `styled-components` via npm
2. Copy the component files into the project
3. Resolve any `registryDependencies` (other shadcn components)

### 4.2 Will it conflict with user's existing Tailwind setup?

**No direct conflict**, but:

1. **Two styling systems**: The user's project may already use Tailwind. Introducing styled-components adds a second styling paradigm.

2. **Bundle bloat**: The user gets 12KB of styled-components even if they only use one spinner.

3. **Mental overhead**: Developers must understand both Tailwind utility classes and styled-components' CSS-in-JS patterns.

4. **No conflict with Tailwind classes**: styled-components generates unique scoped class names that won't conflict with Tailwind's utility classes.

---

## 5. Alternative: Plain CSS with Keyframes

### 5.1 Can plain CSS achieve the same dynamic styling?

**Yes**, with CSS custom properties and CSS variables. This pattern works well for spinners:

```tsx
// Spinner.tsx
interface SpinnerProps {
  size?: number;
  color?: string;
  speed?: number;
}

export function Spinner({
  size = 50,
  color = 'currentColor',
  speed = 1
}: SpinnerProps) {
  return (
    <div
      className="spinner"
      style={{
        '--spinner-size': `${size}px`,
        '--spinner-color': color,
        '--spinner-speed': `${speed}s`,
      } as React.CSSProperties}
    />
  );
}
```

```css
/* spinners.css */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: var(--spinner-size);
  height: var(--spinner-size);
  border: 3px solid var(--spinner-color);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin var(--spinner-speed) linear infinite;
}
```

### 5.2 What spinner animations truly NEED dynamic styling?

The research finds that most complex spinners can be replicated with CSS-only techniques:

| Spinner Type | Dynamic Requirement | CSS Solution |
|-------------|--------------------|-------------|
| Circle spinner | Color, size, speed | CSS variables |
| Multiple rings | Individual timing offsets | `animation-delay` |
| Grid/pulse dots | Scale/opacity by nth-child | CSS `:nth-child()` |
| Bar loader | Width percentage | CSS variables |
| Complex paths | SVG stroke-dasharray | JavaScript (required) |

**When dynamic styling is needed**:

1. **Interpolation from props**: `background: ${props => props.$primary ? 'blue' : 'red'}` — CSS custom properties can replace this
2. **Calculated values**: `width: ${props => props.count * 10}px` — CSS `calc()` can handle most
3. **Conditional keyframes**: Different animation curves based on props — CSS variables can switch animation names

**When CSS is insufficient**:

1. **SVG path morphing**: Complex shapes that require JavaScript calculation
2. **Physics-based animations**: Spring/timing functions that require JS interpolation

---

## 6. Real-World Examples: Libraries Shipping styled-components

### 6.1 react-loaders-spinners

- **NPM**: [react-loaders-spinners](https://www.npmjs.com/package/react-loaders-spinners)
- **Style**: Uses `styled-components` as peer dependency (not bundled)
- **Downloads**: ~44/week
- **Approach**: Zero-dependency library, expects user to have styled-components

### 6.2 react-awesome-spinners

- **NPM**: [react-awesome-spinners](https://www.npmjs.com/package/react-awesome-spinners)
- **Style**: Uses `styled-components` v4.3.2+ as peer dependency
- **Downloads**: ~662/week
- **API**: `size`, `color`, `sizeUnit` props

### 6.3 Other component libraries

- **Styled UI libraries**: emotion, styled-components-based design systems
- **Pattern**: Declare `styled-components` as peerDependency, not bundled

---

## 7. Recommendations

### Recommendation 1: Pure CSS (Preferred for Copy-Paste)

For a shadcn/copy-paste distribution model, pure CSS with CSS variables is recommended because:

- **Zero dependencies**: User doesn't need to install anything extra
- **Bundle size**: Only the CSS they actually use (typically <2KB for all 36 spinners)
- **Tailwind compatibility**: Works alongside Tailwind without conflicts
- **SSR-safe**: Classic CSS works everywhere without runtime

**Tradeoff**: Some advanced dynamic styling patterns require creative CSS variable usage.

### Recommendation 2: If Visual Fidelity Is Critical

If the CSS conversion genuinely loses visual fidelity (which is rare for spinners), consider:

1. **Option A**: Use styled-components as an optional peer dependency:
   - Export two versions: CSS-only and styled-components
   - Let users choose via shadcn registry

2. **Option B**: Use goober for lighter weight:
   - ~1.25KB vs 12KB
   - Accept specificity caveats for simple spinners

### Recommendation 3: Ship as NPM Package (Not Copy-Paste)

If you want to bundle styled-components internally:

- Ship as an npm package (e.g., `@mycompany/spinners`)
- Tree-shake unused spinners
- Bundle styled-components once, not per-component
- This is how react-spinners, react-loaders-spinners work

---

## 8. Key Takeaways

1. **styled-components v6.3.x works with React 18/19** and Next.js App Router RSC — no technical blockers

2. **12KB bundle cost** is significant for a spinner library — users pay this for every spinner, even simple ones

3. **shadcn registry supports dependencies** — `styled-components` can be declared in registry JSON

4. **Pure CSS + CSS variables** can achieve most dynamic spinner effects — fewer dependencies, better for copy-paste

5. **goober is 10x smaller** but has API gaps and specificity issues

6. **The original conversion likely lost fidelity** due to CSS variable design, not CSS limitations — review whether the CSS approach can be improved before adding styled-components

---

## References

- [styled-components v6.3.0 Release Notes](https://github.com/styled-components/styled-components/releases/tag/styled-components%406.3.0)
- [styled-components React 19 Compatibility](https://depfixer.com/compatibility/react-19-styled-components-6)
- [shadcn Registry Schema](https://v4.shadcn.com/docs/registry/registry-item-json)
- [goober README](https://github.com/cristianbote/goober)
- [goober Issue #607: Selector Specificity](https://github.com/cristianbote/goober/issues/607)
- [react-loaders-spinners (NPM)](https://www.npmjs.com/package/react-loaders-spinners)
- [react-awesome-spinners (NPM)](https://www.npmjs.com/package/react-awesome-spinners)
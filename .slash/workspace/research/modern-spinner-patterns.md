# Best Practices Guide: Spinner/Loading Animations in Modern React (2024-2026)

Date: April 14, 2026

## Executive Summary

This guide covers the best practices for implementing spinner/loading animations in React applications using Tailwind CSS, with a focus on Tailwind v4, accessibility, TypeScript patterns, and shadcn/ui compatibility. The research addresses the migration of 40+ spinners from styled-components to Tailwind CSS animations.

---

## 1. CSS Keyframe Animations in Tailwind v4

### Defining Custom Keyframes

In Tailwind v4, custom animations are defined using the `@theme` directive in your CSS file. The pattern involves:

1. Defining the `--animate-*` CSS variable
2. Defining the corresponding `@keyframes`

```css
/* globals.css */
@import "tailwindcss";

@theme {
  --animate-spin-clockwise: spin-clockwise 1s linear infinite;
  --animate-spin-counterclockwise: spin-counterclockwise 1s linear infinite;
  
  @keyframes spin-clockwise {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes spin-counterclockwise {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(-360deg); }
  }
}
```

**Usage in components:**
```tsx
<div className="animate-spin-clockwise" />
```

### Important v4 Syntax Notes

- Always use `@keyframes` (not `@keyFrames` - case matters)
- Include semicolons after `--animate-*` definitions
- Keyframes must be inside `@theme` block for Tailwind to generate utilities

**Common v4 gotchas:**
- If your animation name spans multiple lines, ensure proper whitespace handling
- Use kebab-case for animation names in CSS (e.g., `animate-slide-up` vs `animate-slideUp`)

---

## 2. Tailwind v4 vs v3: Animation Configuration Differences

| Aspect | Tailwind v3 | Tailwind v4 |
|--------|-------------|-------------|
| **Configuration** | `tailwind.config.js` (JavaScript) | `@theme` in CSS |
| **Keyframes** | Defined in `theme.extend.keyframes` | Defined in `@theme` block |
| **Animation** | Defined in `theme.extend.animation` | Via `--animate-*` CSS variables |
| **Build** | PostCSS plugin | `@tailwindcss/postcss` or `@tailwindcss/vite` |
| **Performance** | Fast (JIT compiler) | 40-60% faster (Oxide engine) |

### v3 Configuration (Legacy)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'spin-clockwise': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'spin-clockwise': 'spin-clockwise 1s linear infinite',
      },
    },
  },
}
```

### v4 Configuration (Modern)

```css
/* app.css */
@import "tailwindcss";

@theme {
  --animate-spin-clockwise: spin-clockwise 1s linear infinite;
  
  @keyframes spin-clockwise {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
}
```

### Migration Strategy

For migrating from v3 to v4:
1. Move keyframes and animation definitions from `tailwind.config.js` to `@theme` in CSS
2. Use kebab-case for animation names (v4 converts camelCase to kebab-case)
3. Update PostCSS config: use `@tailwindcss/postcss` instead of `tailwindcss` and `autoprefixer`

---

## 3. Framer Motion vs Pure CSS for Spinner Animations

### Comparison Matrix

| Feature | Pure CSS | Framer Motion (Motion) |
|---------|----------|------------------------|
| **Bundle Size** | 0 KB | ~55 KB gzipped |
| **Performance** | Excellent (GPU accelerated) | Excellent (WAAPI-based) |
| **Accessibility** | Manual (`prefers-reduced-motion`) | Built-in reduced motion support |
| **Complexity** | Low | Medium-High |
| **Dynamic Props** | Limited | Full support |
| **Learning Curve** | Low | Medium |

### When to Use Pure CSS

- Simple spinner animations (rotation, pulse, bounce)
- Performance-critical applications
- Zero-dependency philosophy
- Most loading states that don't need complex orchestration

```tsx
// Best for: Simple spinners
export function SimpleSpinner({ className }: { className?: string }) {
  return (
    <svg 
      className={cn("animate-spin text-primary", className)} 
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
```

### When to Use Framer Motion

- Complex orchestration (multiple elements, stagger effects)
- Physics-based animations
- Layout animations (AnimatePresence)
- Gesture-based interactions

```tsx
// Best for: Complex loading states with variants
import { motion } from "framer-motion";

const spinnerVariants = {
  spinning: {
    rotate: 360,
    transition: { duration: 1, repeat: Infinity, ease: "linear" }
  },
  idle: { rotate: 0 }
};

export function MotionSpinner({ isLoading = true }) {
  return (
    <motion.div
      animate={isLoading ? "spinning" : "idle"}
      variants={spinnerVariants}
    />
  );
}
```

### Recommendation for 40+ Spinners

**Use pure CSS for spinners** because:
1. Spinners are typically simple rotational/pulsing animations
2. Zero bundle size impact
3. Native `animate-spin` utility already available
4. `prefers-reduced-motion` can be handled with CSS variants
5. Framer Motion is overkill for basic loading indicators

---

## 4. Accessibility (A11y) for Spinners

### Essential ARIA Attributes

```tsx
interface SpinnerProps extends React.ComponentProps<"svg"> {
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function Spinner({ label = "Loading", size = "md", className, ...props }: SpinnerProps) {
  const sizeClasses = {
    sm: "size-4",
    md: "size-6", 
    lg: "size-8"
  };
  
  return (
    <svg
      role="status"
      aria-label={label}
      className={cn("animate-spin", sizeClasses[size], className)}
      {...props}
    >
      {/* Spinner content */}
    </svg>
  );
}
```

### Key Accessibility Requirements

1. **`role="status"`** - Creates an ARIA live region for screen readers
2. **`aria-label`** - Provides text description (default: "Loading")
3. **`aria-hidden="true"`** - On decorative elements (if using separate visual + SR content)
4. **Screen reader text** - For complex spinners, use visually-hidden text

### prefers-reduced-motion Support

Tailwind provides built-in variants for reduced motion:

```css
/* Tailwind's built-in support */
@media (prefers-reduced-motion: reduce) {
  .animate-spin {
    animation-duration: 1s; /* Slower animation */
  }
}
```

**Manual implementation pattern:**
```tsx
function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  
  return prefersReduced;
}
```

**Component usage:**
```tsx
export function AccessibleSpinner({ className }: { className?: string }) {
  const reducedMotion = usePrefersReducedMotion();
  
  return (
    <svg
      role="status"
      aria-label="Loading"
      className={cn(
        "animate-spin",
        reducedMotion && "motion-reduce:animate-spin-slow",
        className
      )}
    />
  );
}
```

---

## 5. TypeScript Patterns for Spinner Component Props

### Size Variants with CVA

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva(
  "inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent",
  {
    variants: {
      size: {
        xs: "h-4 w-4",
        sm: "h-6 w-6",
        md: "h-8 w-8",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: VariantProps<typeof spinnerVariants>["size"];
}

function Spinner({ size, className, ...props }: SpinnerProps) {
  return (
    <div 
      role="status" 
      className={cn(spinnerVariants({ size }), className)} 
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
```

### Color Theming with CSS Variables

```css
/* globals.css */
@theme {
  --color-spinner-primary: var(--spinner-primary);
  --animate-spin: spin 1s linear infinite;
}
```

```tsx
// Using CSS variables for color theming
interface ColorfulSpinnerProps {
  color?: "primary" | "secondary" | "muted";
}

export function ColorfulSpinner({ color = "primary" }: ColorfulSpinnerProps) {
  const colorMap = {
    primary: "var(--primary)",
    secondary: "var(--secondary)", 
    muted: "var(--muted)"
  };
  
  return (
    <svg 
      className="animate-spin" 
      style={{ color: colorMap[color] }}
    >
      {/* ... */}
    </svg>
  );
}
```

### Polymorphic Spinner Pattern

```tsx
import { cn } from "@/lib/utils";

type SpinnerElement = "svg" | "div" | "span";

interface BaseSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

type PolymorphicSpinnerProps<C extends SpinnerElement> = 
  BaseSpinnerProps & 
  OmitReact.ComponentPropsWithoutRef<C>;

function createSpinner<C extends SpinnerElement>(element: C) {
  return function Spinner({ size = "md", className, ...props }: PolymorphicSpinnerProps<C>) {
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-6 w-6", 
      lg: "h-8 w-8"
    };
    
    const Component = element;
    
    return (
      <Component 
        role="status"
        aria-label="Loading"
        className={cn("animate-spin", sizeClasses[size], className)}
        {...props}
      />
    );
  };
}

export const SvgSpinner = createSpinner("svg");
export const DivSpinner = createSpinner("div");
```

---

## 6. shadcn/ui Patterns: cn Utility and CSS Variables

### The cn() Utility

shadcn/ui provides a utility function that combines `clsx` and `tailwind-merge`:

```tsx
// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Why this matters:**
- `clsx` - Conditionally builds className strings
- `tailwind-merge` - Resolves Tailwind class conflicts (later classes win)

```tsx
// Example: Without cn(), conflicts aren't handled properly
cn("px-4 py-2", "px-6")  // => "py-2 px-6" (correct!)
// Without tailwind-merge: "px-4 py-2 px-6" (wrong - both padding classes applied)
```

### CSS Variables Approach in shadcn/ui

```css
/* globals.css */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-muted: var(--muted);
  --radius: var(--radius);
  --animate-spin: spin 1s linear infinite;
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.922 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.92 0 0);
}
```

### Official shadcn/ui Spinner Component

```tsx
// components/ui/spinner.tsx
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon 
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
```

**Usage:**
```tsx
<Spinner />
<Spinner className="size-6" />
<Spinner className="text-blue-500" />
<Button disabled>
  <Spinner className="mr-2" />
  Loading...
</Button>
```

### Creating shadcn-Compatible Spinners

```tsx
// components/ui/custom-spinner.tsx
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const customSpinnerVariants = cva(
  "inline-flex items-center justify-center animate-spin rounded-full border-2 border-current border-r-transparent",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
      },
      variant: {
        default: "text-primary",
        inverted: "text-white",
        muted: "text-muted-foreground",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

interface CustomSpinnerProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof customSpinnerVariants> {}

function CustomSpinner({ 
  size, 
  variant, 
  className, 
  ...props 
}: CustomSpinnerProps) {
  return (
    <div 
      role="status"
      aria-label="Loading"
      className={cn(
        customSpinnerVariants({ size, variant }),
        className
      )}
      {...props}
    />
  );
}
```

---

## 7. Performance Considerations: CSS vs JS Animations

### Performance Comparison

| Factor | CSS Animations | JavaScript Animations |
|--------|---------------|----------------------|
| **Thread** | Compositor thread (GPU) | Main JS thread |
| **Frame Rate** | Consistent 60fps | Can be blocked by JS |
| **Bundle Impact** | Zero | +30-55 KB |
| **Interruption** | Not easily | Fully controllable |
| **Complex Choreography** | Limited | Excellent |

### Best Practices for Spinner Performance

**1. Animate only transform and opacity:**

```css
/* Good - GPU accelerated */
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Avoid - triggers layout */
@keyframes badSpin {
  to { left: 360deg; } /* layout thrashing */
}
```

**2. Use `will-change` sparingly:**

```tsx
// Only for complex animations, not simple spinners
<div className="will-change-transform" /> {/* Not needed for simple spinners */}
```

**3. Prefer Tailwind utilities:**

```tsx
// Good - uses existing, optimized animations
<div className="animate-spin" />

// Avoid - custom keyframes add CSS weight
<style>{`@keyframes custom-spin { to { transform: rotate(360deg); } }`}</style>
```

**4. For 40+ spinners:**

- Use shared base animation utilities
- Consolidate keyframe definitions
- Use CSS custom properties for dynamic values (color, size)

```css
@theme {
  --animate-spin: spin 1s linear infinite;
  
  /* CSS variables for dynamic customization */
  --spinner-size: 1rem;
  --spinner-color: currentColor;
  --spinner-border-width: 2px;
}
```

---

## 8. Migration Checklist for 40+ Spinners

### Phase 1: Setup
- [ ] Install Tailwind v4 (or stay on v3 with updated config)
- [ ] Set up `cn()` utility from shadcn/ui
- [ ] Define base animation keyframes in `@theme`
- [ ] Configure CSS variables for theming

### Phase 2: Component Migration
- [ ] Create base Spinner component with CVA variants
- [ ] Implement size variants (xs, sm, md, lg, xl)
- [ ] Add color theming via CSS variables
- [ ] Include accessibility attributes
- [ ] Add prefers-reduced-motion support

### Phase 3: Testing
- [ ] Test all size variants
- [ ] Verify color theming works in light/dark mode
- [ ] Test with screen reader
- [ ] Test reduced motion preference
- [ ] Verify no regression in visual appearance

---

## Quick Reference: Recommended Patterns

### Minimal Spinner (CSS-only)
```tsx
<svg className="animate-spin size-6" role="status" aria-label="Loading">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
</svg>
```

### Full-Featured Spinner (shadcn-compatible)
```tsx
// Using CVA for type-safe variants
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin rounded-full border-2 border-current border-r-transparent", {
  variants: { size: { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-8 w-8" } },
  defaultVariants: { size: "md" },
});

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spinnerVariants> {}

function Spinner({ size, className, ...props }: SpinnerProps) {
  return <div role="status" aria-label="Loading" className={cn(spinnerVariants({ size }), className)} {...props} />;
}
```

---

## References

- [Tailwind v4 @theme documentation](https://tailwindcss.com/docs/theme)
- [Tailwind v4 Functions and Directives](https://tailwindcss.com/docs/functions)
- [shadcn/ui Spinner](https://ui.shadcn.com/docs/components/spinner)
- [Motion (Framer Motion) Performance Guide](https://motion.dev/docs/performance)
- [class-variance-authority documentation](https://cva.style/docs/getting-started)
- [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
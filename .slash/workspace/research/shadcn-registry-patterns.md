# Building a shadcn-Compatible Component Registry

A complete guide for converting react-spinners-kit into a shadcn-installable library.

## Overview

shadcn/ui revolutionized component distribution by using a **copy-paste approach** with CLI automation. Instead of publishing an npm package, you create a **registry** — a JSON endpoint that tells the shadcn CLI where to find component files. When users run `npx shadcn add`, the CLI downloads and installs components directly into their project.

This guide covers everything you need to build a shadcn-compatible registry for your component library.

---

## 1. How the shadcn Registry System Works

### Registry Architecture

The registry system consists of two key files:

1. **`registry.json`** — The root manifest listing all available components
2. **`registry-item.json`** — Individual component definitions (can also be inline in registry.json)

The CLI fetches the registry, resolves dependencies, and copies files to the user's project.

### Schema: registry.json

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "your-registry-name",
  "homepage": "https://your-website.com",
  "items": [
    // Component definitions go here
  ]
}
```

### Schema: Registry Item

Each component is defined as a registry item with these properties:

```json
{
  "name": "component-name",
  "type": "registry:component",
  "title": "Component Title",
  "description": "What this component does",
  "dependencies": ["framer-motion", "lucide-react"],
  "registryDependencies": ["button", "utils"],
  "files": [
    {
      "path": "registry/path/to/component.tsx",
      "type": "registry:component",
      "target": "components/ui/component.tsx"
    }
  ],
  "cssVars": { /* CSS variables */ },
  "css": { /* CSS rules like @keyframes */ }
}
```

### Registry Item Types

| Type | Use Case |
|------|----------|
| `registry:component` | Simple single-file components |
| `registry:block` | Complex multi-file components |
| `registry:ui` | UI primitives and base components |
| `registry:hook` | React hooks |
| `registry:lib` | Utility libraries |
| `registry:page` | Page/routes |
| `registry:file` | Config files, env files |
| `registry:style` | Style configurations |
| `registry:theme` | Theme definitions |
| `registry:example` | Demo/example files |

### Key Properties Explained

**`dependencies`**: NPM packages to install (e.g., `framer-motion`, `lucide-react`). Supports versions like `"package@1.0.0"`.

**`registryDependencies`**: Other registry items to install first. Can be:
- Local: `"button"`, `"card"`
- Namespaced: `"@acme/input-form"`
- Remote URLs: `"https://example.com/r/component.json"`

**`files`**: The actual source files. Each file has:
- `path`: Location in your registry
- `type`: Registry type for the file
- `target`: Where to install in user's project (optional, derived from their config)

**`css`**: CSS rules to inject into user's project. Supports:
- `@keyframes` animations
- `@layer` styles
- `@utility` custom utilities
- `@plugin` Tailwind plugins

**`cssVars`**: CSS variables to add to the theme:
```json
{
  "cssVars": {
    "theme": {
      "animate-spin": "spin 1s linear infinite"
    },
    "light": {
      "brand": "oklch(66.2% 0.225 25.9)"
    },
    "dark": {
      "brand": "oklch(66.2% 0.225 25.9)"
    }
  }
}
```

---

## 2. How Third-Party Libraries Publish Components

### Approach 1: Namespaced Registry (shadcn CLI 3.0+)

Add your registry to users' `components.json`:

```json
{
  "registries": {
    "@yourorg": "https://your-registry-url.com/registry/{name}.json"
  }
}
```

Users then install with:
```bash
npx shadcn@latest add @yourorg/spinner-fade
```

### Approach 2: Direct URL Installation

```bash
npx shadcn@latest add https://your-registry.com/registry/spinner-fade.json
```

### Real Examples

**Aceternity UI** — https://ui.aceternity.com/registry/bento-grid.json
```json
{
  "name": "bento-grid",
  "type": "registry:ui",
  "dependencies": ["@tabler/icons-react"],
  "files": [
    {
      "path": "components/ui/bento-grid.tsx",
      "type": "registry:ui",
      "target": "components/ui/bento-grid.tsx"
    }
  ],
  "author": "Manu Arora <hi@manuarora.in>",
  "title": "Bento Grid"
}
```

**Magic UI** — Full registry at https://raw.githubusercontent.com/magicuidesign/magicui/main/registry.json

Key observations from Magic UI:
- They use `registry:ui` type for most components
- Dependencies are explicitly listed (motion, framer-motion, etc.)
- CSS animations defined via `cssVars` + `css` properties
- Complex components reference other registry items via `registryDependencies`

---

## 3. Exact File Structure Needed

### Recommended Structure

```
your-library/
├── registry.json              # Root registry manifest
├── components/
│   ├── ui/
│   │   ├── spinner-circle.tsx
│   │   ├── spinner-dots.tsx
│   │   └── ...
│   └── lib/
│       └── utils.ts           # Common utils (cn function)
├── registry/                  # Registry source files (for build)
│   ├── your-library/
│   │   ├── spinner-circle.tsx
│   │   └── spinner-dots.tsx
│   └── index.json             # Optional: per-component JSON files
├── tailwind.config.js         # For local development
└── package.json
```

### For React Spinners Kit (40+ components)

Given you have 40+ spinner components, structure like:

```
react-spinners-kit/
├── registry.json
├── components/
│   └── ui/
│       ├── spinners/
│       │   ├── circle-spin.tsx
│       │   ├── dots-bounce.tsx
│       │   ├── pulse-ring.tsx
│       │   └── ... (40+ files)
│       └── index.ts          # Barrel export
├── lib/
│   └── utils.ts              # cn() utility
└── registry/                 # Source for registry build
    └── react-spinners-kit/
        ├── spinner-circle.tsx
        ├── spinner-dots.tsx
        └── ...
```

### Build Script Pattern

Use the shadcn CLI's `build` command to generate your registry.json from source files:

```bash
npx shadcn registry build
```

This parses your source files and generates the registry JSON automatically.

---

## 4. How Dependencies Are Declared

### In Registry Items

```json
{
  "name": "animated-spinner",
  "type": "registry:ui",
  "dependencies": [
    "framer-motion",
    "clsx",
    "tailwind-merge",
    "lucide-react@0.300.0"
  ],
  "registryDependencies": [
    "utils",
    "button"
  ],
  "files": [
    {
      "path": "registry/spinner.tsx",
      "type": "registry:ui",
      "target": "components/ui/spinner.tsx"
    }
  ]
}
```

### Dependency Types

| Property | Purpose |
|----------|---------|
| `dependencies` | Runtime NPM packages |
| `devDependencies` | Development-only packages |
| `registryDependencies` | Other registry items to install first |

### For React Spinners Kit

Given your spinners likely use CSS animations or simple SVG rendering, minimal dependencies needed:

```json
{
  "name": "pulse-ring",
  "type": "registry:ui",
  "dependencies": ["clsx", "tailwind-merge"],
  "registryDependencies": ["utils"],
  "files": [...]
}
```

If you add Framer Motion for complex animations:
```json
{
  "dependencies": ["framer-motion", "clsx", "tailwind-merge"]
}
```

---

## 5. CSS Animations in shadcn Components

### Two Approaches: Tailwind v3 vs v4

**Tailwind v3** (legacy):
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        'spin-slow': 'spin-slow 2s linear infinite'
      }
    }
  }
}
```

**Tailwind v4** (current recommended):
```css
/* globals.css */
@theme {
  --animate-spin-slow: spin-slow 2s linear infinite;
  
  @keyframes spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
}
```

### In Registry Items

Use the `css` property to define animations:

```json
{
  "name": "pulse-spinner",
  "type": "registry:ui",
  "css": {
    "@keyframes pulse-ring": {
      "0%": { transform: "scale(0)", opacity: "1" },
      "100%": { transform: "scale(1)", opacity: "0" }
    }
  },
  "cssVars": {
    "theme": {
      "animate-pulse-ring": "pulse-ring 1.5s ease-out infinite"
    }
  }
}
```

### Animation Library: tw-animate-css

shadcn now recommends using `tw-animate-css` instead of the old `tailwindcss-animate` plugin:

```css
/* In user's globals.css */
@import "tw-animate-css";
```

This provides pre-built animations that registry items can reference.

### For React Spinners Kit

For pure CSS/spinner components, use inline styles or CSS variables:

```json
{
  "name": "circle-spin",
  "type": "registry:ui",
  "css": {
    "@keyframes circle-spin": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" }
    }
  }
}
```

Or use Tailwind utilities directly in the component:
```tsx
<div className="animate-spin" />
```

---

## 6. Best Examples of Animation-Heavy shadcn-Compatible Libraries

### Magic UI (Recommended Reference)

- **URL**: https://magicui.design
- **Registry**: https://raw.githubusercontent.com/magicuidesign/magicui/main/registry.json
- **GitHub**: magicuidesign/magicui (15k stars)
- **Components**: 50+ animated components
- **CLI**: Works with `npx shadcn add @magicui/[component]`

Key patterns:
- Extensive use of `cssVars` + `css` for animations
- Heavy use of Framer Motion (`motion` package)
- Components like `meteors`, `aurora-text`, `marquee`, `border-beam`

Example from their registry (meteors):
```json
{
  "name": "meteors",
  "type": "registry:ui",
  "title": "Meteors",
  "files": [...],
  "cssVars": {
    "theme": {
      "animate-meteor": "meteor 5s linear infinite"
    }
  },
  "css": {
    "@keyframes meteor": {
      "0%": { transform: "rotate(var(--angle)) translateX(0)", opacity: "1" },
      "70%": { opacity: "1" },
      "100%": { transform: "rotate(var(--angle)) translateX(-500px)", opacity: "0" }
    }
  }
}
```

### Aceternity UI

- **URL**: https://ui.aceternity.com
- **GitHub**: (28k stars)
- **Components**: 80+ visual effects components
- **Installation**: Via their own CLI or shadcn CLI integration

Features:
- 3D effects (Three.js for Globe, Vortex)
- Glowing borders, magnetic buttons
- Particle backgrounds
- Heavier dependencies but stunning visuals

### Other Notable Libraries

| Library | Focus | Stars |
|---------|-------|-------|
| Origin UI | Application components | Growing |
| Cult UI | Animated components (dock, OS-style) | Growing |
| Spectrum UI | 250+ copy-paste components | Growing |
| shadcn Blocks | Full page sections | - |

### For Spinners Specifically

Since your library is spinners (40+ components), study:
1. How they handle simple animations (spin, pulse, bounce)
2. CSS-only approaches vs Framer Motion
3. Size/color customization via props and Tailwind classes

---

## 7. Registry Approach vs Direct Copy-Paste

### Comparison

| Aspect | Registry Approach | Direct Copy-Paste |
|--------|------------------|------------------|
| Installation | `npx shadcn add component` | Manual copy from docs |
| Dependencies | Auto-installed | Manual installation |
| Updates | CLI can update | Manual re-copy |
| Discovery | CLI shows available | Browse docs |
| Versioning | Can support | Not inherent |
| Integration | Seamless with shadcn | Independent |

### Why Registry is Better for Libraries

1. **Automatic dependency resolution** — Users don't manually install packages
2. **Consistent with shadcn workflow** — Same CLI they already use
3. **Discoverable** — Shows in CLI component list
4. **Updateable** — Can push updates to all users
5. **Professional** — Matches how shadcn/ui itself distributes

### For React Spinners Kit

Registry approach is ideal because:
- 40+ components would be tedious to copy manually
- Users likely already using shadcn
- Easy to maintain and update
- Stand out as "proper" library vs random GitHub repo

---

## Quick Start: Your Registry

### Step 1: Create registry.json

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "react-spinners-kit",
  "homepage": "https://your-repo.com",
  "items": []
}
```

### Step 2: Add Component Definitions

```json
{
  "name": "circle-spin",
  "type": "registry:ui",
  "title": "Circle Spin",
  "description": "A simple rotating circle spinner",
  "registryDependencies": ["utils"],
  "files": [
    {
      "path": "registry/spinners/circle-spin.tsx",
      "type": "registry:ui",
      "target": "components/ui/spinners/circle-spin.tsx"
    }
  ]
}
```

### Step 3: Host It

Options:
1. **GitHub Pages**: Commit registry.json, enable Pages
2. **Vercel**: Deploy as static site
3. **Dedicated domain**: e.g., `registry.yourlibrary.com`

### Step 4: Document Installation

Users add to their `components.json`:
```json
{
  "registries": {
    "@yourorg": "https://your-registry.com/registry/{name}.json"
  }
}
```

Then install:
```bash
npx shadcn@latest add @yourorg/circle-spin
```

---

## Additional Resources

- **shadcn Registry Docs**: https://ui.shadcn.com/docs/registry
- **Registry Schema**: https://ui.shadcn.com/schema/registry-item.json
- **shadcn CLI**: https://ui.shadcn.com/docs/cli
- **Magic UI Registry**: https://raw.githubusercontent.com/magicuidesign/magicui/main/registry.json
- **Aceternity Docs**: https://ui.aceternity.com/components/cli

---

*Document generated for react-spinners-kit shadcn-compatible library planning. Last updated: April 2026.*
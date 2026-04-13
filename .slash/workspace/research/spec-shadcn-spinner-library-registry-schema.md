# Research: shadcn/ui Registry JSON Schema (2025-2026)

Date: 2026-04-14

## Summary

The shadcn/ui registry system is a code distribution platform that allows distributing components, hooks, pages, configs, and other files as JSON metadata. The schema has evolved significantly in 2025-2026 with the v4 release introducing `registry:base`, `registry:font` types, namespaced registries, and enhanced CSS variable support. The `npx shadcn build` command automates registry generation from source files, making it straightforward to host a custom registry on GitHub Pages.

---

## 1. Registry JSON Schema (2025-2026 Version)

The official schema is available at: **https://ui.shadcn.com/schema/registry-item.json**

### Core Fields

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "component-name",
  "type": "registry:ui",
  "title": "Human Readable Title",
  "description": "Brief description of the component",
  "author": "username <https://github.com/username>",
  "dependencies": ["package-name"],
  "devDependencies": ["dev-package"],
  "registryDependencies": ["button", "https://example.com/r/other.json"],
  "files": [
    {
      "path": "registry/new-york/component-name.tsx",
      "type": "registry:component",
      "content": "...",
      "target": "components/ui/component-name.tsx"
    }
  ],
  "cssVars": { "theme": {}, "light": {}, "dark": {} },
  "css": {},
  "tailwind": {},
  "envVars": {},
  "meta": {},
  "docs": "markdown string",
  "categories": ["form", "data-display"]
}
```

### Registry Item Types

| Type | Description |
|------|-------------|
| `registry:ui` | UI component |
| `registry:component` | Generic component |
| `registry:block` | Pre-built block/example |
| `registry:hook` | React hook |
| `registry:lib` | Utility library |
| `registry:page` | Full page |
| `registry:file` | Config file |
| `registry:theme` | Theme definition |
| `registry:style` | Style preset |
| `registry:base` | Complete design system base (v4) |
| `registry:font` | Font metadata (v4) |
| `registry:item` | Generic item |

### File Object Schema

```json
{
  "path": "string (required)",
  "type": "registry:component | registry:ui | registry:hook | etc.",
  "content": "string (file source code)",
  "target": "string (optional - custom output path)"
}
```

For `registry:file` and `registry:page` types, `target` is required. For other types, only `path` and `type` are required.

---

## 2. How the `css` Field Works for Injecting @keyframes

The `css` field injects CSS rules directly into the project's `globals.css` file. It supports:

- `@keyframes` animations
- `@layer base`, `@layer components`, `@layer utilities`
- `@utility` custom utilities (Tailwind v4)
- `@plugin` Tailwind plugins
- Regular selectors and nested rules

### Example: CSS Animation Registration

```json
{
  "name": "animated-spinner",
  "type": "registry:ui",
  "css": {
    "@keyframes spin-slow": {
      "0%": { "transform": "rotate(0deg)" },
      "100%": { "transform": "rotate(360deg)" }
    },
    "@keyframes pulse-ring": {
      "0%": { "transform": "scale(0.8)", "opacity": "1" },
      "50%": { "transform": "scale(1)", "opacity": "0.5" },
      "100%": { "transform": "scale(0.8)", "opacity": "1" }
    }
  },
  "cssVars": {
    "theme": {
      "--animate-spin-slow": "spin-slow 2s linear infinite",
      "--animate-pulse-ring": "pulse-ring 1.5s ease-in-out infinite"
    }
  }
}
```

**How it works:**

1. The `css` object's keys are written directly to `globals.css` as at-rules or selectors
2. For `@keyframes`, the key becomes the animation name (e.g., `@keyframes spin-slow`)
3. The animation can then be referenced via CSS variables in `cssVars.theme` or directly in component styles
4. The CLI merges these into the project's CSS during component installation

**Evidence** ([shadcn-ui/ui docs](https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/registry/registry-item-json.mdx#L303)):

```json
"@keyframes wiggle": {
  "0%, 100%": { "transform": "rotate(-3deg)" },
  "50%": { "transform": "rotate(3deg)" }
}
```

---

## 3. How the `cssVars` Field Works for Theme/Light/Dark

The `cssVars` field defines CSS custom properties that are merged into the project. It has three scopes:

### Schema Structure

```json
{
  "cssVars": {
    "theme": {
      "font-sans": "Inter, sans-serif",
      "radius": "0.5rem",
      "--custom-var": "value"
    },
    "light": {
      "background": "oklch(1 0 0)",
      "foreground": "oklch(0.145 0 0)",
      "primary": "oklch(0.546 0.245 262.881)",
      "brand": "oklch(0.205 0.015 18)"
    },
    "dark": {
      "background": "oklch(0.141 0.005 285.823)",
      "foreground": "oklch(0.985 0 0)",
      "primary": "oklch(0.546 0.245 262.881)",
      "brand": "oklch(0.205 0.015 18)"
    }
  }
}
```

### Each Scope

| Scope | Purpose | Usage |
|-------|--------|-------|
| `theme` | Theme-level variables (fonts, radius, breakpoints) | Tailwind v4 `@theme` directive |
| `light` | Variables applied in light mode | Automatic dark-mode detection |
| `dark` | Variables applied in dark mode | Automatic dark-mode detection |

### How It Works

1. **Tailwind v4 Integration**: `cssVars.theme` values are injected as CSS custom properties available to the `@theme` directive
2. **Color Mode Detection**: The CLI writes light/dark values to `globals.css` with built-in dark mode support (`:root` and `.dark` selectors)
3. **Automatic Merging**: Component installation merges these into existing CSS variables
4. **Custom Colors**: Add new brand colors under `light.brand` and `dark.brand` for use as `bg-brand` utility classes

**Evidence** ([shadcn-ui/ui examples](https://ui.shadcn.com/docs/registry/examples)):

```json
"cssVars": {
  "theme": { "font-heading": "Poppins, sans-serif" },
  "light": { "brand": "20 14.3% 4.1%", "radius": "0.5rem" },
  "dark": { "brand": "20 14.3% 4.1%" }
}
```

---

## 4. How `npx shadcn build` Works

The `build` command auto-generates registry JSON files from source files.

### Usage

```bash
npx shadcn build [registry_file] [-o, --output <path>] [-c, --cwd <path>] [-v, --verbose]
```

- **registry_file**: Path to `registry.json` (default: `./registry.json`)
- **output**: Destination directory (default: `./public/r`)
- **cwd**: Working directory (default: current directory)

### Build Process

1. **Reads registry.json**: Parses the registry index file containing all items
2. **Resolves dependencies**: Recursively resolves `registryDependencies` 
3. **Reads source files**: Reads file contents from filesystem
4. **Injects content**: Embeds source code into JSON `content` fields
5. **Validates**: Validates against registry-item schema
6. **Writes JSON**: Outputs individual item JSON files and master `registry.json`

### Package.json Integration

```json
{
  "scripts": {
    "registry:build": "shadcn build"
  }
}
```

### Example Output Structure

```
public/r/
├── registry.json
├── button.json
├── card.json
├── animated-spinner.json
└── ...
```

**Evidence** ([shadcn-ui/ui commit](https://github.com/shadcn-ui/ui/commit/cb742e98252fe8aa5cad3377d06e1d8a884953db)):

```typescript
// packages/shadcn/src/commands/build.ts
export const build = new Command()
  .name("build")
  .description("build components for a shadcn registry")
  .argument("[registry]", "path to registry.json file", "./registry.json")
  .option("-o, --output <path>", "destination directory for json files", "./public/r")
```

---

## 5. Monorepo Structure for GitHub Pages Registry

The official registry template is at **https://github.com/shadcn-ui/registry-template**

### Recommended Directory Structure

```
my-registry/
├── apps/
│   └── web/                    # Next.js app for GitHub Pages
│       ├── public/
│       │   └── r/
│       │       ├── registry.json
│       │       ├── component-1.json
│       │       └── component-2.json
│       ├── src/
│       │   └── app/
│       │       └── r/
│       │           └── [name]/
│       │               └── route.ts
│       └── package.json
├── packages/
│   └── ui/                     # Components package
│       ├── src/
│       │   ├── components/
│       │   │   └── ui/
│       │   │       └── spinner.tsx
│       │   ├── hooks/
│       │   └── utils/
│       ├── registry.json          # Registry definition
│       ├── components.json
│       └── package.json
├── pnpm-workspace.yaml
└── package.json
```

### registry.json Structure

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "mycompany",
  "homepage": "https://mycompany.github.io/my-registry",
  "items": [
    {
      "name": "animated-spinner",
      "type": "registry:ui",
      "title": "Animated Spinner",
      "description": "A custom spinner component with CSS animations",
      "dependencies": ["clsx", "tailwind-merge"],
      "registryDependencies": ["utils"],
      "files": [
        {
          "path": "components/ui/spinner.tsx",
          "type": "registry:component"
        }
      ],
      "cssVars": {
        "theme": {
          "--animate-spin": "spin 1s linear infinite"
        }
      },
      "css": {
        "@keyframes spin": {
          "0%": { "transform": "rotate(0deg)" },
          "100%": { "transform": "rotate(360deg)" }
        }
      }
    }
  ]
}
```

### Build Script for Monorepo

```json
// packages/ui/package.json
{
  "scripts": {
    "registry:build": "shadcn build",
    "registry:copy": "node scripts/copy-to-web.mjs"
  }
}
```

```javascript
// Copy to web public directory
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../public/r');
const destDir = path.join(__dirname, '../../apps/web/public/r');

fs.cpSync(srcDir, destDir, { recursive: true });
```

### GitHub Pages Configuration

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Setup repo
        uses: actions/checkout@v4
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Build registry
        run: pnpm --filter @mycompany/ui registry:build
      - name: Copy to web
        run: pnpm --filter @mycompany/ui registry:copy
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: apps/web/public
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Serving via GitHub Pages

When deployed, components are available at:
- Registry index: `https://username.github.io/repo/r/registry.json`
- Individual items: `https://username.github.io/repo/r/component-name.json`

**Evidence** ([shadcn-ui/registry-template](https://github.com/shadcn-ui/registry-template)):

> A template for running your own registry. The template uses a `registry.json` file to define components and their files. The `shadcn build` command is used to build the registry. The registry items are served as static files under `public/r/[name].json`.

---

## 6. v2/v3 Schema Changes (2025-2026)

### v4 (2026) - Latest Changes

1. **New Types**: `registry:base`, `registry:font`
2. **Enhanced CSS Variables**: `cssVars.theme`, `cssVars.light`, `cssVars.dark` structure
3. **Namespaced Registries**: Support for `@namespace/name` format
4. **Registry Search/View Commands**: `shadcn search`, `shadcn view`

### v3 (August 2025) - CLI 3.0

1. **Namespaced Registries**: Configure as `@namespace` in `components.json`
2. **Authentication Support**: Bearer tokens, API keys
3. **Search & Discovery**: `search`, `view`, `list` commands
4. **MCP Server**: Model Context Protocol integration

### Key Schema Migration Notes

- **Legacy `style` field**: No longer used. Use `registry:style` items instead
- **cssVars format change**: Now requires `theme`/`light`/`dark` keys (was flat in v3)
- **`tailwind` config**: Deprecated in favor of `cssVars.theme` for Tailwind v4
- **Type values**: Use new types (`registry:ui`, `registry:component`) not legacy values

### Migration from v3 to v4

**Evidence** ([shadcn-ui/ui discussion #9949](https://github.com/shadcn-ui/ui/discussions/9949)):

> 1. Update your registry item schema to reference the current schema: `"$schema": "https://ui.shadcn.com/schema/registry-item.json"`
> 2. Drop the "style": "new-york" field - the current system uses named styles
> 3. Use `registry:base` for complete design system configuration
> 4. For `cssVars`, migrate to the new format with `theme`, `light`, `dark` keys

---

## 7. Example: Registry Item with CSS Animations

Complete example of a spinner component with CSS keyframe animations:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "animated-spinner",
  "type": "registry:ui",
  "title": "Animated Spinner",
  "description": "A customizable spinner component with multiple animation styles",
  "author": "yourname <https://github.com/yourname>",
  "dependencies": ["clsx", "tailwind-merge", "class-variance-authority"],
  "registryDependencies": ["utils"],
  "files": [
    {
      "path": "components/ui/spinner.tsx",
      "type": "registry:component"
    }
  ],
  "cssVars": {
    "theme": {
      "--animate-spinner-wave": "spinner-wave 1.4s ease-in-out infinite",
      "--animate-spinner-pulse": "spinner-pulse 1.4s ease-in-out infinite",
      "--animate-spinner-dots": "spinner-dots 1.4s ease-in-out infinite"
    },
    "light": {
      "spinner-background": "oklch(0.95 0 0)",
      "spinner-foreground": "oklch(0.546 0.245 262.881)"
    },
    "dark": {
      "spinner-background": "oklch(0.25 0 0)",
      "spinner-foreground": "oklch(0.546 0.245 262.881)"
    }
  },
  "css": {
    "@keyframes spinner-wave": {
      "0%, 80%, 100%": { "transform": "scale(0)" },
      "40%": { "transform": "scale(1)" }
    },
    "@keyframes spinner-pulse": {
      "0%": { "transform": "scale(0)", "opacity": "1" },
      "50%": { "transform": "scale(0.5)", "opacity": "0.5" },
      "100%": { "transform": "scale(0)", "opacity": "1" }
    },
    "@keyframes spinner-dots": {
      "0%": { "transform": "translateY(0)" },
      "25%": { "transform": "translateY(-5px)" },
      "50%": { "transform": "translateY(0)" },
      "75%": { "transform": "translateY(5px)" },
      "100%": { "transform": "translateY(0)" }
    }
  },
  "categories": ["feedback", "loading"],
  "docs": "## Animated Spinner\n\nA customizable spinner component..."
}
```

### Component Source (components/ui/spinner.tsx)

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "inline-block animate-[var(--animate-spinner-wave)]",
  {
    variants: {
      variant: {
        wave: "animate-[var(--animate-spinner-wave)]",
        pulse: "animate-[var(--animate-spinner-pulse)]",
        dots: "animate-[var(--animate-spinner-dots)]",
      },
      size: {
        sm: "h-4 w-4",
        md: "h-8 w-8",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "wave",
      size: "md",
    },
  }
)

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(spinnerVariants({ variant, size }), className)}
        {...props}
      >
        <div className="w-full h-full rounded-full bg-[var(--spinner-foreground)] opacity-20" />
      </div>
    )
  }
)
Spinner.displayName = "Spinner"

export { Spinner, spinnerVariants }
```

---

## Recommendations

1. **Use the official registry template** as a starting point: `npx create-next-app@latest --example https://github.com/shadcn-ui/registry-template`
2. **Pin registry versions** in URLs to avoid breaking changes: `https://example.com/r/{name}.json?v1.0.0`
3. **Add authentication** for private registries using bearer tokens in `components.json`
4. **Use Tailwind v4** with the new `cssVars.theme` format
5. **Test installation** locally before deploying: `npx shadcn add http://localhost:3000/r/component.json`
6. **Include all dependencies** explicitly in `dependencies` array - don't rely on transitive deps
7. **Use `registry:base`** for complete design system packages that configure fonts, colors, icons
8. **Keep registry items flat** - no nested items in the registry structure

---

## Links

- Official Registry Docs: https://ui.shadcn.com/docs/registry
- Registry Item Schema: https://ui.shadcn.com/schema/registry-item.json
- Registry JSON Schema: https://ui.shadcn.com/schema/registry.json
- Registry Template: https://github.com/shadcn-ui/registry-template
- Shadcn CLI Reference: https://ui.shadcn.com/docs/cli
- Examples: https://ui.shadcn.com/docs/registry/examples
- v4 Blog Post: https://shadcnstudio.com/blog/shadcn-cli-v4-registry-base-and-registry-font
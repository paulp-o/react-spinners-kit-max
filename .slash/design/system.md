# Design System: react-spinners-kit-max

## Craft Decisions

- **Direction**: "Midnight Laboratory." The UI must recede into the background completely. Spinners are pure movement and energy; everything else should be static, sharp, and cold. Think high-end developer tools, IDEs, and Vercel/shadcn style. 
- **Signature**: "The Spotlight." The interface is mostly borders and dark surfaces. The only actual "color" or life comes from the spinners themselves. The interactive elements (hovered cards) provide a subtle glow or contrast shift, placing the spinner in the "spotlight."
- **Depth**: "Borders-Only." No drop shadows. Flat, architectural layouts using 1px solid borders (`zinc-800` or `zinc-900`) on pure black backgrounds. 
- **Spacing**: 8px base unit.
  - Micro: 4px / 8px (Inner padding for badges, tight gaps)
  - Component: 16px / 24px (Card padding, standard gaps)
  - Section: 64px / 128px (Breathing room between Hero, Gallery, and Footer)
- **Typography**: 
  - Sans: **Inter** (clean, invisible, legible at small sizes). Used for prose, headers, and UI copy.
  - Mono: **JetBrains Mono** or **Geist Mono**. Used for code snippets, variant names, and installation commands.
- **Color Temperature**: Cold. We use Zinc (desaturated cool gray) instead of Slate or Gray.

## Color Palette

- **Background (Canvas)**: `#000000` (Pure Black)
- **Surface (Cards/Panels)**: `zinc-950` (`#09090b`)
- **Surface Hover**: `zinc-900` (`#18181b`)
- **Border Default**: `zinc-900` (`#18181b`)
- **Border Active/Hover**: `zinc-800` (`#27272a`)
- **Text Primary**: `zinc-50` (`#fafafa`)
- **Text Secondary**: `zinc-400` (`#a1a1aa`)
- **Text Muted**: `zinc-500` (`#71717a`)
- **Accent**: Pure White (`#ffffff`) for active states, or user-selected hex for the spinners.

## Component Patterns

### 1. The Showcase Card
- **Background**: `zinc-950`
- **Border**: 1px solid `zinc-900`
- **Hover State**: Border shifts to `zinc-700`, surface shifts to `zinc-900`. Cursor becomes pointer.
- **Content**: Centered spinner (defaulting to `zinc-400`). On hover, the spinner color transitions to `zinc-50` (white) to show activity.
- **Label**: Bottom-left or centered, 12px mono font, `zinc-500` shifting to `zinc-300` on hover.

### 2. Code Snippet Blocks
- **Background**: `#000000` (inset feel) inside a `zinc-950` panel.
- **Border**: 1px solid `zinc-800`.
- **Text**: 13px mono, `zinc-300`.
- **Action**: Absolute positioned Copy button (icon only) in the top right. Opacity 0 default, fades to 1 on `group-hover`.

### 3. Controls & Sliders (Playground)
- **Track**: `zinc-900`, 4px height, rounded-full.
- **Thumb**: `zinc-50`, 16px width/height, absolute, no shadow, 1px border `zinc-300`.
- **Labels**: 12px Inter, `zinc-400` uppercase (`SIZE`, `COLOR`, `SPEED`).

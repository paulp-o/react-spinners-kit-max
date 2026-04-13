# Design System: Unified Studio Layout (Gallery + Playground)

## The Problem
The classic docs layout (Hero → Gallery → Playground) forces horizontal or vertical context switching. Users find a spinner they like, then lose it when scrolling down to configure it. It breaks the evaluation loop.

## Craft Decisions
- **Direction:** "Pro Tool Inspector". Think Figma or VSCode, not a marketing page. We want dense, functional, immediate feedback. 
- **Signature:** Split-pane architecture. The playground isn't a section you scroll to; it's a persistent state you interact with.
- **Depth:** Borders-only. Pure flat `#000` background with `zinc-950` surfaces and `zinc-900` borders. No drop shadows. We rely on the existing Aceternity background effects for visual richness, keeping the UI layers stark and technical.
- **Spacing:** Base unit 4px (Tailwind standard). Tight density in the controls, spacious isolation in the preview.

## Layout Architecture: The Split Pane

### Desktop (>= lg)
We abandon the single-column scroll.
- **Left Canvas (60-70%):** The Gallery Grid. A scrollable masonry or CSS grid of all 36 spinners. 
- **Right Inspector (30-40%, max-width 480px):** Sticky `h-screen` side panel. This is the Playground. It never moves. 

**WHY:** This allows the user to click sequentially through the gallery on the left, instantly seeing the isolated, configurable version on the right without moving their eyes off the central axis.

### Mobile (< lg)
- **Main View:** The Gallery Grid.
- **Interaction:** Tapping a spinner brings up a **Sticky Bottom Sheet (Drawer)** containing the Inspector.
- **WHY:** Screen real estate is too precious for side-by-side. The bottom sheet keeps the selected spinner context immediately above the thumb reach area.

## Component Patterns

### 1. The Gallery Cards (Left Pane)
- **Visual:** `bg-zinc-950`, `border-zinc-900`. Extremely minimal. Just the spinner centered in a 120px square.
- **States:** 
  - *Default:* Muted border.
  - *Hover:* Subtle glow (using the existing BorderBeam or a lighter zinc border).
  - *Active (Selected):* `border-zinc-500` or a primary brand color to clearly indicate which spinner is loaded in the Inspector.

### 2. The Inspector Panel (Right Pane)
A structured, top-to-bottom configuration flow:

**A. Header**
- Spinner Name (Monospace, e.g., `<Pulse />`)
- Variant Dropdown (to quickly switch without returning to the grid)

**B. The Stage (Preview)**
- A large, isolated box (`bg-black`, subtle inset shadow/border) showing the active spinner.
- Much larger than the gallery cards to show detail.

**C. Control Group: Size**
- Segmented Control (Toggle group) for `sm`, `md`, `lg`, `xl`, and a custom number input.
- **WHY:** Segmented controls require one click. Dropdowns require two. For sizes, one click is mandatory for a good UX loop.

**D. Control Group: Quick Themes (Color Presets)**
Instead of forcing users to use the color picker immediately, we provide 1-click emotional presets.
- **UI:** A row of circular swatches (24px). Each circle is split diagonally (top-left = Primary, bottom-right = Secondary).
- **The Presets:**
  - **Neon:** `#00ff89` / `#4b4c56` (The Cyberpunk default)
  - **Ocean:** `#06b6d4` / `#0e7490` (Deep, technical)
  - **Sunset:** `#f97316` / `#dc2626` (Warm, urgent)
  - **Purple:** `#a855f7` / `#7c3aed` (Web3 / Crypto aesthetic)
  - **Rose:** `#f43f5e` / `#be123c` (Elegant, alert)
  - **Mono:** `#ffffff` / `#71717a` (Stark, minimal)
- **Custom:** Full hex/color pickers below the presets for fine-tuning.

**E. The Code Output**
- Syntax highlighted block.
- Auto-updates instantly as controls change.
- Prominent "Copy" button in the top right of the code block.

## Anti-Patterns to Avoid
- **Scrolling to Configure:** The Playground must always be in the viewport once a spinner is clicked.
- **Hidden Controls:** Do not hide the color or size options behind accordions or tabs. The Inspector should show all levers at a glance.
- **Layout Shift:** Changing the size of the spinner in the Inspector must not push the code block up and down. Give "The Stage" a fixed minimum height (e.g., `min-h-[200px]`).
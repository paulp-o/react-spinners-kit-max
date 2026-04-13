# Page Design: Docs & Showcase Site

## 1. Hero Section
**Vibe**: Bold, immediately obvious, engineering-focused.

- **Layout**: Centered content, max-width 4xl, generous vertical padding (128px top/bottom).
- **Background**: Pure black. Perhaps a very faint radial gradient in the absolute center (`zinc-900` fading to black) to highlight the hero text.
- **Visual**: A massive, 128px version of the most complex/beautiful spinner (e.g., `guard` or `cube`) running in pure white right above the headline.
- **Headline**: "React Spinners Kit, Maxed Out." (Inter, tracking-tighter, 5xl to 7xl, `zinc-50`).
- **Subheadline**: "36 beautifully animated, shadcn-compatible spinners for modern React apps. Drop-in ready." (Inter, 18px, `zinc-400`, max-w-2xl).
- **Actions**:
  - Primary Button: "Browse Gallery" (White background, Black text, rounded-md).
  - Secondary Button: "GitHub" (Transparent, 1px `zinc-800` border, White text).
- **Quick Install**: A sleek, inline code snippet box right below the buttons: 
  `npx shadcn add https://paulp-o.github.io/react-spinners-kit-max/r/registry.json`
  Include a quick-copy icon on the right.

## 2. Gallery Section (The Core Showcase)
**Vibe**: Dense, overwhelming variety, fun to interact with. Mimics a high-end icon library grid (like Lucide).

- **Layout**: Auto-fill CSS grid. `grid-template-columns: repeat(auto-fill, minmax(140px, 1fr))`. Gap: 16px.
- **Cards**: Square aspect ratio. 
  - Each card represents one variant.
  - Spinner sits dead center.
  - Variant name sits at the bottom in monospace.
- **Interaction**:
  - The gallery is interactive. Clicking a card selects that spinner and pins it to the Playground Section (or opens a modal/sidebar).

## 3. Playground Section (Live Customization)
**Vibe**: A focused "DevTools" inspector panel.

- **Layout**: Two-column layout (Grid: 1fr 1fr or 2fr 1fr).
  - **Left / Top Column (Canvas)**: Large, padded area (min-h 300px) with a toggleable background (pure black vs. faint checkerboard) to test transparency. The selected spinner is rendered huge in the center.
  - **Right / Bottom Column (Controls)**:
    - **Variant Picker**: A dropdown or horizontal scroll list to switch variants.
    - **Size**: A slider (16px to 128px).
    - **Color 1**: Hex input + visual color swatch.
    - **Color 2**: (Shown only if the variant supports two colors). Secondary color picker.
    - **Speed**: A multiplier slider (0.5x, 1x, 2x).
- **Live Code Output**: Below the controls, a code block that dynamically updates as the user tweaks settings.
  ```tsx
  <Spinner variant="pushing-bounce" size="lg" color="#3b82f6" />
  ```

## 4. Installation & Usage Section
**Vibe**: Clear, unambiguous, copy-paste ready.

- **Layout**: Centered, max-w-3xl, readable prose width.
- **Tabs**: "shadcn/ui (Recommended)" vs "npm package".
- **Step 1: Install**: Provide the CLI command.
- **Step 2: Import**: Provide the import statement.
- **Step 3: Render**: Provide the component usage.
- **Typography**: Prose styling. `zinc-300` text, 1.6 line height. Inline code in `zinc-200` with `zinc-800` backgrounds.

## 5. Footer
**Vibe**: Minimal, respectful to original authors.

- **Layout**: Single row, flex-between, 64px vertical padding, top border 1px `zinc-900`.
- **Left Content**: "Based on the original react-spinners-kit by Dmitry Morozoff. Remixed for shadcn." (`zinc-500`, 14px).
- **Right Content**: Links to GitHub, npm, and the original repo. Hover states turn text to `zinc-300`.
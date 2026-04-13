## ADDED Requirements

### Requirement: All 36 original spinners ported
The system SHALL provide all 36 spinner animations from react-spinners-kit: BallSpinner, GridSpinner, SwapSpinner, BarsSpinner, WaveSpinner, PushSpinner, FireworkSpinner, StageSpinner, HeartSpinner, GuardSpinner, CircleSpinner, SpiralSpinner, PulseSpinner, SequenceSpinner, DominoSpinner, ImpulseSpinner, CubeSpinner, FillSpinner, SphereSpinner, FlagSpinner, ClapSpinner, RotateSpinner, SwishSpinner, GooSpinner, CombSpinner, PongSpinner, RainbowSpinner, RingSpinner, HoopSpinner, FlapperSpinner, MagicSpinner, JellyfishSpinner, TraceSpinner, ClassicSpinner, WhisperSpinner, MetroSpinner.

#### Scenario: Every spinner renders
- **WHEN** each of the 36 variant values is passed to the Spinner component
- **THEN** the component renders a visible animated element without errors

### Requirement: Animation fidelity with original
Each spinner's CSS keyframes SHALL preserve the exact timing functions (cubic-bezier values), transform values, animation durations, and keyframe percentages from the original styled-components implementation.

#### Scenario: Keyframe values match original
- **WHEN** comparing the CSS keyframes output of any spinner to the original styled-components keyframes
- **THEN** all percentage steps, transform values, opacity values, and timing functions are identical

#### Scenario: Dynamic keyframes use CSS custom properties
- **WHEN** a spinner's original keyframes depend on component props (e.g., size-dependent translateX)
- **THEN** the implementation uses CSS custom properties (e.g., `--spinner-size`) to achieve the same dynamic behavior

### Requirement: Pure CSS animations
All spinner animations SHALL be implemented using CSS `@keyframes` with zero JavaScript animation runtime.

#### Scenario: No JS animation libraries
- **WHEN** the built package is inspected
- **THEN** no JavaScript animation library (framer-motion, react-spring, GSAP, etc.) is included as a dependency

### Requirement: Prefers-reduced-motion support
All spinners SHALL respect the `prefers-reduced-motion: reduce` media query.

#### Scenario: Reduced motion
- **WHEN** the user's OS has reduced motion enabled
- **THEN** all spinner animations are paused or simplified

## ADDED Requirements

### Requirement: Unified Spinner component
The system SHALL export a single `<Spinner />` component that accepts a `variant` prop to select which of the 36 spinner animations to display.

#### Scenario: Variant selection
- **WHEN** `<Spinner variant="ball" />` is rendered
- **THEN** the BallSpinner animation is displayed

#### Scenario: Invalid variant
- **WHEN** an invalid variant string is passed
- **THEN** TypeScript compilation fails (variant is a union type of valid strings)

### Requirement: Size variants
The Spinner component SHALL accept a `size` prop supporting both named variants (`sm`, `md`, `lg`, `xl`) and custom pixel numbers.

#### Scenario: Named size variant
- **WHEN** `<Spinner variant="ball" size="lg" />` is rendered
- **THEN** the spinner renders at the predefined large size

#### Scenario: Custom pixel size
- **WHEN** `<Spinner variant="ball" size={48} />` is rendered
- **THEN** the spinner renders at exactly 48px

#### Scenario: Default size
- **WHEN** no size prop is provided
- **THEN** the spinner renders at the `md` size

### Requirement: Color theming via CSS variables
The Spinner SHALL use `--spinner-color` CSS variable for primary color and `--spinner-secondary-color` for two-color spinners, defaulting to `currentColor`.

#### Scenario: Default color inheritance
- **WHEN** no color customization is provided
- **THEN** the spinner uses the parent element's text color via `currentColor`

#### Scenario: CSS variable override
- **WHEN** `style={{ '--spinner-color': '#ff0000' }}` is passed
- **THEN** the spinner renders in red

#### Scenario: className override
- **WHEN** a Tailwind class like `className="[--spinner-color:theme(colors.blue.500)]"` is passed
- **THEN** the spinner renders in blue

### Requirement: Accessibility attributes
The Spinner SHALL render with `role="status"` and a default `aria-label="Loading"` that can be overridden.

#### Scenario: Default a11y
- **WHEN** `<Spinner variant="ball" />` is rendered
- **THEN** the DOM element has `role="status"` and `aria-label="Loading"`

#### Scenario: Custom aria-label
- **WHEN** `<Spinner variant="ball" aria-label="데이터 로딩 중" />` is rendered
- **THEN** the DOM element has the custom aria-label

### Requirement: className and style forwarding
The Spinner SHALL forward `className` and `style` props to the root element, merging with internal classes via `cn()` utility.

#### Scenario: Additional className
- **WHEN** `<Spinner variant="ball" className="mt-4" />` is rendered
- **THEN** the root element includes both internal spinner classes and the `mt-4` class

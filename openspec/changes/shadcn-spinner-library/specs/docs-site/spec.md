## ADDED Requirements

### Requirement: Interactive spinner gallery
The docs site SHALL display all 36 spinners in a gallery view with their names.

#### Scenario: Gallery view
- **WHEN** a user visits the docs site
- **THEN** all 36 spinners are visible with live animations and their variant names

### Requirement: Customization playground
The docs site SHALL provide controls to adjust spinner size and color in real-time.

#### Scenario: Size adjustment
- **WHEN** a user changes the size slider/selector
- **THEN** the selected spinner updates its size in real-time

#### Scenario: Color adjustment
- **WHEN** a user picks a color
- **THEN** the selected spinner updates its color in real-time

### Requirement: Code copy functionality
The docs site SHALL provide copy-to-clipboard buttons for installation commands and usage code.

#### Scenario: Copy install command
- **WHEN** a user clicks the copy button next to the shadcn install command
- **THEN** the command is copied to clipboard

### Requirement: Install command display
The docs site SHALL show both the shadcn CLI command and npm install command for each spinner.

#### Scenario: Dual install methods
- **WHEN** viewing a spinner's documentation
- **THEN** both `npx shadcn add ...` and `npm install ...` commands are displayed

### Requirement: GitHub Pages deployment
The docs site SHALL be deployable to GitHub Pages under the `paulp-o` account.

#### Scenario: Static export
- **WHEN** the docs site is built
- **THEN** it produces a static output deployable to GitHub Pages without server-side logic

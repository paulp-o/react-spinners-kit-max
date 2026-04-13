## ADDED Requirements

### Requirement: npm package publication
The library SHALL be published to npm as `react-spinners-kit-max`.

#### Scenario: npm install
- **WHEN** a user runs `npm install react-spinners-kit-max`
- **THEN** the package is installed with TypeScript declarations, ESM and CJS entry points

### Requirement: Vite library mode build
The package SHALL be built using Vite library mode producing both ESM and CJS outputs.

#### Scenario: ESM import
- **WHEN** a user imports `import { Spinner } from 'react-spinners-kit-max'`
- **THEN** the ESM bundle is resolved correctly

#### Scenario: CJS require
- **WHEN** a user requires `const { Spinner } = require('react-spinners-kit-max')`
- **THEN** the CJS bundle is resolved correctly

### Requirement: TypeScript declarations
The package SHALL include `.d.ts` type declarations for the Spinner component and all its props.

#### Scenario: Type inference
- **WHEN** using the Spinner component in a TypeScript project
- **THEN** the `variant` prop shows autocomplete for all 36 spinner names
- **AND** the `size` prop shows autocomplete for named variants and accepts numbers

### Requirement: CSS file export
The package SHALL export a CSS file containing all keyframe animations that users must import.

#### Scenario: CSS import
- **WHEN** a user adds `import 'react-spinners-kit-max/styles.css'`
- **THEN** all spinner keyframe animations are available

### Requirement: React 18+ peer dependency
The package SHALL declare React 18+ as a peer dependency.

#### Scenario: React version check
- **WHEN** inspecting package.json peerDependencies
- **THEN** react is listed as `>=18.0.0`

# AI Usage Log

## Overview

AI coding assistance was used during development of the Tapza Care React Native assignment for implementation support, debugging, refactoring, and reviewing specific features.

The final implementation decisions, feature priorities, testing, and manual verification were reviewed and validated during development.

## Main Areas Where AI Assistance Was Used

### 1. Project Setup and Architecture

AI assistance was used to help establish the initial Expo/React Native structure and organize the application around:

- Expo Router navigation
- Feature-based organization
- Shared components
- Application state
- Mock API services
- Theme and design tokens

The project was kept dependency-light and existing Expo/RN capabilities were preferred over adding unnecessary packages.

### 2. Config-Driven Home

AI assistance was used to implement the configuration-driven Home screen.

The Home screen supports:

- Hero banners
- Category chips
- Quick actions
- Service grid
- Doctor carousel
- Offer strips
- Runtime configuration changes
- Unknown section handling
- Loading and skeleton states
- Error and retry states
- Cached last-known-good configuration

Two configurations were supported so the Home layout and visual content can change without changing the rendering code.

### 3. Booking Flow

AI assistance was used to implement the doctor appointment booking flow, including:

- Doctor selection
- Date selection
- Slot selection
- Gesture-driven bottom sheet
- Booking confirmation
- Loading states
- Empty/error states
- Optimistic booking state
- 409 conflict handling
- Booking history persistence

A bug where a previous booking success state appeared when starting a new booking was identified during manual testing and corrected by separating temporary booking state from confirmed booking history.

### 4. Prescriptions and Dose Tracking

AI assistance was used to implement:

- Prescription list
- Prescription details
- Medicine schedules
- Morning/afternoon/night dose tracking
- Dose completion state
- Persistent dose status
- Loading, empty, error, and retry states

Dose state is persisted locally so it remains available after an app restart.

### 5. Resilience and Mock API

AI assistance was used to build a mock API layer capable of simulating realistic backend conditions.

The application supports testing:

- Normal network
- Slow network
- Failed network
- Empty doctor responses
- Empty slot responses
- Empty prescription responses
- Booking 409 conflicts

A Test Tools panel was added to the submitted APK so reviewers can trigger these scenarios without modifying source code.

The settings are persisted locally so a failure scenario can remain selected after an app restart.

### 6. Accessibility

AI assistance was used to review and improve accessibility across the main flows.

The implementation includes:

- Large touch targets
- Accessibility labels
- Accessibility roles and states
- Font scaling support
- Theme contrast considerations
- Non-color-only error and state communication
- Accessible booking and Test Tools controls

### 7. Responsive UI and Themes

AI assistance was used to identify areas where fixed dimensions could cause layout problems and to improve responsive behavior.

The application supports:

- Responsive layouts
- Light theme
- Festival theme
- Dark theme
- Centralized theme/design tokens
- Font scaling

Dark-theme issues found during manual testing were corrected in areas such as booking and prescription details.

### 8. Splash Screen and Initialization

AI assistance was used to improve the initial application loading experience and ensure the native splash screen transitions correctly into the application without creating an unnecessary second loading experience.

## Decisions and Rejected Approaches

### Avoiding unnecessary dependencies

Additional libraries were considered where appropriate, but the implementation intentionally avoided unnecessary dependencies because the required functionality could be implemented using the existing Expo/RN stack.

### Automated testing

Automated Jest/unit tests were considered as part of the assignment requirements.

Due to the limited 48-hour assignment window, implementation time was prioritized toward the core user flows, resilience behavior, accessibility, responsive UI, and submission requirements.

TypeScript validation was still performed using:

```bash
npx tsc --noEmit
```

### Broad production audits

Repeated full-project audits were avoided once the core requirements were implemented and manually validated. This reduced unnecessary changes and kept the implementation focused on the assignment requirements.

## Validation Approach

Validation was performed through:

- Manual UI testing
- Booking flow testing
- Prescription and dose tracking testing
- App restart persistence testing
- Network failure simulation
- Slow network simulation
- Empty response testing
- Booking conflict testing
- Theme switching
- Accessibility checks
- TypeScript validation

## Final Note

AI was used as a development assistant rather than as a replacement for implementation decisions. Features were manually tested, issues were identified during testing, and implementation choices were adjusted based on the assignment requirements and observed application behavior.

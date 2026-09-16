# Tapza Care

Tapza Care is a React Native healthcare app built for the Tapza Care assignment. It uses TypeScript, Expo, config-driven UI, appointment booking, prescriptions and reminders, resilience controls, accessibility support, and responsive themed layouts.

## Tech Stack

- React Native 0.86.3
- Expo SDK 57
- React 19
- TypeScript
- Expo Router
- Redux Toolkit
- AsyncStorage
- React Native Reanimated and Gesture Handler
- Mock API layer

## Getting Started

```bash
npm install
npx expo start
```

Press `a` in the Expo terminal to open the Android app.

Validate TypeScript with:

```bash
npx tsc --noEmit
```

## Key Features

- Config-driven Home screen
- Normal and Festival configurations
- Runtime configuration switching without changing source code
- Safe handling of unknown section types
- Hero banner, category chips, quick actions, services, doctors, and offers
- Doctor appointment booking
- Date and gesture-driven slot selection
- Optimistic booking with 409 conflict handling
- Persistent booking history
- Prescriptions and medicine schedules
- Morning, afternoon, and night dose tracking
- Persistent dose status
- Loading, empty, error, and retry states
- Cached last-known-good Home configuration
- Slow and failed network simulation
- Accessibility support
- Responsive layouts
- Light, Festival, and Dark themes

## Architecture

- Expo Router provides file-based navigation and booking/prescription routes.
- Redux Toolkit manages Home, booking, and prescription state.
- Features are organized by domain under `src/features`.
- The mock API service layer simulates configuration, doctor, slot, booking, and prescription requests.
- AsyncStorage persists booking history, dose status, cached Home configuration, and reviewer test settings.
- Home configuration is validated before rendering and uses a section registry for extensible section types.

## Mock API / Test Tools

The submitted APK intentionally includes Test Tools so reviewers can test resilience without modifying source code.

Access them at:

**Profile → Test Tools**

Available controls:

- Normal network
- Slow network
- Failed network
- Empty doctors
- Empty slots
- Empty prescriptions
- Booking 409 conflict
- Reset all

Test Tool settings persist across app restarts. **Reset all** returns every setting to its normal state.

## Resilience Scenarios

- Failed Home configuration uses the cached configuration when available.
- Slow requests display loading and skeleton states.
- Failed requests provide retry actions.
- Empty responses display usable empty states.
- Booking conflicts do not show false success.
- Users can retry failed requests or choose another slot after a conflict.

## Accessibility

- Interactive controls use approximately 44pt or larger touch targets.
- Buttons, selectable controls, and important content expose accessibility labels, roles, and states.
- Text supports system font scaling.
- Contrast is maintained across Light, Festival, and Dark themes.
- Error, empty, selected, taken, and offline states are not communicated by color alone.

## Project Structure

```text
src/
   app/
      (tabs)/
      booking/
      prescriptions/
   features/
      home/
      booking/
      prescriptions/
      development/
   state/
   services/
      mock/
   components/
   theme/
   types/
```

## Validation

```bash
npx tsc --noEmit
```

Automated Jest or unit tests were not added.

## Submission Notes

## Submission

### Android APK

[Download Android APK](https://github.com/moulikrishna-nagiri/tapza-care/releases/download/v1.0.0/app-release.apk)

### Demo Video

The 2 minute demo video is available in the `docs` directory.

### Screenshots

Screenshots demonstrating the main features, booking flow, prescriptions, themes, and resilience scenarios are available in the `docs` directory.

### AI Usage

AI was used as a development assistant for implementation guidance, debugging, code suggestions, documentation, and reviewing approaches.

All generated changes were reviewed, tested, and validated manually. Detailed prompts, decisions, and rejected approaches are documented in `AI_LOG.md`.

## Notes

This project uses a mock backend; no external backend is required.

The app is designed so reviewers can demonstrate failure and recovery scenarios directly from the submitted APK.

Detailed AI usage and prompts are documented separately in `AI_LOG.md`.

# Read Journey

Read Journey is a responsive book tracking app built with React and Chakra UI. It lets users sign in, browse recommended books, add titles to their library, and track active reading progress with diary and statistics views.

## Features

- Authentication flow with login and registration
- Recommended books page with filtering and pagination
- Personal library with status filters
- Reading tracker with start/stop progress actions
- Progress diary and reading statistics
- Completion modal when a book is finished
- Responsive layout for mobile, tablet, and desktop

## Tech Stack

- React 19
- Vite
- Chakra UI
- React Router
- Zustand
- React Hook Form
- Yup
- Axios

## Project Structure

- `src/pages` - page-level views
- `src/components` - reusable UI and feature components
- `src/layouts` - app layouts
- `src/stores` - Zustand stores
- `src/services` - API helpers
- `src/hooks` - custom hooks
- `src/assets` - icons and images

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run lint

```bash
npm run lint
```

## Pages

- `/` - welcome/auth entry
- `/login` - login page
- `/register` - registration page
- `/recommended` - recommended books
- `/library` - personal library
- `/reading/:id` - reading detail and progress page

## API

The app communicates with the Read Journey backend API through Axios. The API base URL is defined in `src/services/api.js`.

## Notes

- The app uses persisted Zustand stores for auth and reading state.
- Some cards and dialogs depend on book `status` values such as `unread`, `in-progress`, and `done`.


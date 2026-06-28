# Cinexplore

A mobile movie discovery app built with React Native and Expo. Browse popular movies, search the TMDB catalog, view detailed movie information, and save your favorites locally.

## Features

- **Browse Popular Movies** — Home screen shows trending and popular movies from TMDB
- **Search** — Search the full TMDB movie catalog with real-time results
- **Movie Details** — View poster, genres, runtime, ratings, budget, revenue, production companies, and more
- **Favorites** — Save movies locally with a heart toggle on the detail screen; persisted across app restarts
- **Trending Section** — Tracks search activity via Appwrite to surface top searched movies

## Tech Stack

| Layer | Library | Purpose |
|---|---|---|
| Framework | [Expo SDK 56](https://expo.dev) | Managed React Native workflow |
| UI | [React Native 0.85](https://reactnative.dev) + [React 19](https://react.dev) | Core UI framework |
| Navigation | [Expo Router](https://docs.expo.dev/router/introduction/) | File-based routing with typed routes |
| Styling | [NativeWind](https://www.nativewind.dev) + [Tailwind CSS 4](https://tailwindcss.com) | Utility-first styling for React Native |
| State Management | [Zustand](https://zustand.docs.pmnd.rs) | Lightweight store for favorites |
| Local Storage | [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | Persistence layer for Zustand |
| Movie API | [TMDB API](https://developer.themoviedb.org/docs) | Movie data, posters, and metadata |
| Backend | [Appwrite](https://appwrite.io) | Tracks search trends via cloud database |
| Icons | [@expo/vector-icons](https://icons.expo.fyi) | Ionicons for UI icons |
| Animations | [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) | Layout and transition animations |

## Project Structure

```
src/
├── app/                        # Expo Router pages
│   ├── _layout.tsx             # Root stack layout
│   ├── (tabs)/                 # Tab navigator
│   │   ├── _layout.tsx         # Floating tab bar
│   │   ├── index.tsx           # Home — popular & trending
│   │   ├── search.tsx          # Search movies
│   │   └── saved.tsx           # Saved favorites
│   ├── movie/
│   │   └── [id].tsx            # Movie detail screen
│   └── globals.css             # Tailwind entry
├── components/
│   ├── MovieCard.tsx           # Movie poster grid card
│   ├── SearchBar.tsx           # Search input component
│   └── TrendingCard.tsx        # Horizontal trending card
├── services/
│   ├── api.ts                  # TMDB API client
│   ├── appwrite.ts             # Appwrite SDK setup & queries
│   └── useFetch.ts             # Data fetching hook with abort
├── store/
│   └── useFavoritesStore.ts    # Zustand favorites store
├── constants/
│   ├── icons.ts                # Icon asset imports
│   └── images.ts               # Image asset imports
└── assets/                     # Fonts, icons, images
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A [TMDB API key](https://developer.themoviedb.org/docs/getting-started)
- An [Appwrite](https://appwrite.io) project with a database and collection for search tracking

### Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd cinexplore
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:
   ```
   EXPO_PUBLIC_MOVIE_API_KEY=<your-tmdb-bearer-token>
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=<your-appwrite-project-id>
   EXPO_PUBLIC_APPWRITE_PROJECT_NAME=<your-appwrite-project-name>
   EXPO_PUBLIC_APPWRITE_ENDPOINT=<your-appwrite-endpoint>
   EXPO_PUBLIC_APPWRITE_DATABASE_ID=<your-appwrite-database-id>
   EXPO_PUBLIC_APPWRITE_COLLECTION_ID=<your-appwrite-collection-id>
   ```

4. Start the development server:
   ```bash
   npx expo start
   ```

5. Open on a device or simulator using the Expo Go app or a development build.

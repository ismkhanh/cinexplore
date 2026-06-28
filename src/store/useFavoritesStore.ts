import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FavoritesState {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (movieId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (movie) => {
        const exists = get().favorites.some((m) => m.id === movie.id);
        if (exists) {
          set({ favorites: get().favorites.filter((m) => m.id !== movie.id) });
        } else {
          set({ favorites: [...get().favorites, movie] });
        }
      },
      isFavorite: (movieId) => {
        return get().favorites.some((m) => m.id === movieId);
      },
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

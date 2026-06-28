import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(useCallback((signal?: AbortSignal) => fetchMovies(undefined, signal), []));

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(useCallback(() => getTrendingMovies(), []))

  
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          marginBottom: 10,
          paddingRight: 5,
        }}
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        ListHeaderComponent={
          <>
            <Image
              style={{ marginTop: insets.top + 20 }}
              source={icons.logo}
              className="w-12 h-10 mb-5 mx-auto"
            />
            {moviesLoading ? (
              <View className="items-center justify-center py-20">
                <ActivityIndicator size="large" color="#ab8bff" />
              </View>
            ) : moviesError ? (
              <View className="items-center justify-center py-20">
                <Text className="text-white text-lg">{moviesError}</Text>
              </View>
            ) : (
              <>
                <SearchBar
                  onPress={() => router.navigate("/search")}
                  placeholder="Search movies..."
                  editable={false}
                />

                {trendingLoading ? (
                  <ActivityIndicator size="small" color="#ab8bff" className="mt-5" />
                ) : trendingMovies && trendingMovies.length > 0 && (
                  <>
                    <Text className="text-white text-2xl font-semibold mt-5 mb-3">Top Searched Movies</Text>
                    <FlatList
                      data={trendingMovies}
                      keyExtractor={(item) => item.movie_id.toString()}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{ gap: 16 }}
                      renderItem={({ item, index }) => (
                        <TrendingCard movie={item} index={index} />                        
                      )}
                    />
                  </>
                )}

                <Text className="text-white text-2xl font-semibold mt-5 mb-3">Popular Movies</Text>
              </>
            )}
          </>
        }
      />
    </View>
  );
}

import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { icons } from "@constants/icons";
import { images } from "@constants/images";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(useCallback((signal: AbortSignal) => fetchMovies(undefined, signal), []));

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
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <Image
              source={icons.logo}
              className="w-12 h-10 mt-20 mb-5 mx-auto"
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
                  onPress={() => router.push("/search")}
                  placeholder="Search movies..."
                />
                <Text className="text-white text-2xl font-semibold mt-5 mb-3">Popular Movies</Text>
              </>
            )}
          </>
        }
      />
    </View>
  );
}

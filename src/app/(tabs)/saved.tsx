import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { FlatList, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Saved = () => {
  const insets = useSafeAreaInsets();
  const favorites = useFavoritesStore((s) => s.favorites);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <FlatList
        data={favorites}
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
            <Text className="text-white text-2xl font-semibold mb-3">
              Saved Movies
            </Text>
          </>
        }
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Text className="text-light-300 text-base">
              No saved movies yet
            </Text>
            <Text className="text-light-300 text-sm mt-2">
              Tap the heart icon on a movie to save it
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Saved;

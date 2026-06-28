import { icons } from '@/constants/icons';
import { fetchMovieDetails, TMDB } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    data: movie,
    loading,
    error,
  } = useFetch(useCallback(() => fetchMovieDetails(id as string), []));

  if (loading) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <ActivityIndicator size="large" color="#ab8bff" />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View className="flex-1 bg-primary items-center justify-center px-5">
        <Text className="text-white text-lg text-center">{error ?? 'Movie not found'}</Text>
        <Pressable onPress={() => router.back()} className="mt-4">
          <Text className="text-accent text-base">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}>
        {/* Backdrop */}
        <View className="relative">
          <Image
            source={{ uri: movie.poster_path ? `${TMDB.IMAGE_URL}${movie.poster_path}` : undefined }}
            className="w-full h-[550px]"
            resizeMode="cover"
          />

          {/* Gradient overlay */}
          <View className="absolute bottom-0 left-0 right-0 h-30 bg-primary opacity-80" />

        </View>

        {/* Content */}
        <View className="px-5 -mt-20">
          <Text className="text-white text-3xl font-bold">{movie.title}</Text>

          {/* Year, Runtime, Rating */}
          <View className="flex-row items-center mt-2 gap-4">
            <Text className="text-light-300 text-sm">
              {movie.release_date?.split('-')[0]}
            </Text>
            {movie.runtime && (
              <Text className="text-light-300 text-sm">
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </Text>
            )}
            <View className="flex-row items-center">
              <Image source={icons.star} className="size-4" tintColor="#FACC15" />
              <Text className="text-white text-sm font-bold ml-1">
                {(movie.vote_average / 2).toFixed(1)}
              </Text>
            </View>
          </View>

          {/* Genres */}
          {movie.genres.length > 0 && (
            <View className="flex-row flex-wrap gap-2 mt-4">
              {movie.genres.map((genre) => (
                <View key={genre.id} className="bg-dark-100 rounded-full px-3 py-1">
                  <Text className="text-light-200 text-xs">{genre.name}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Tagline */}
          {movie.tagline && (
            <Text className="text-light-300 text-sm italic mt-4">"{movie.tagline}"</Text>
          )}

          {/* Overview */}
          {movie.overview && (
            <View className="mt-5">
              <Text className="text-white text-lg font-semibold mb-2">Overview</Text>
              <Text className="text-light-200 text-sm leading-6">{movie.overview}</Text>
            </View>
          )}

          {/* Info Grid */}
          <View className="mt-5 gap-4">
            <InfoRow label="Status" value={movie.status} />
            <InfoRow label="Budget" value={movie.budget > 0 ? `$${(movie.budget / 1_000_000).toFixed(0)}M` : 'N/A'} />
            <InfoRow label="Revenue" value={movie.revenue > 0 ? `$${(movie.revenue / 1_000_000).toFixed(0)}M` : 'N/A'} />
            <InfoRow label="Language" value={movie.spoken_languages?.[0]?.english_name ?? 'N/A'} />
          </View>

          {/* Production Companies */}
          {movie.production_companies.length > 0 && (
            <View className="mt-5">
              <Text className="text-white text-lg font-semibold mb-2">Production</Text>
              <Text className="text-light-200 text-sm">
                {movie.production_companies.map((c) => c.name).join(' • ')}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom back button */}
      <Pressable
        onPress={() => router.back()}
        style={{ marginBottom: insets.bottom + 10 }}
        className="absolute bottom-0 left-0 right-0 mx-5 bg-accent rounded-full py-3 items-center flex-row justify-center gap-2"
      >
        <Image source={icons.arrow} className="size-5 rotate-180" tintColor="#fff" />
        <Text className="text-white text-base font-semibold">Go Back</Text>
      </Pressable>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between">
      <Text className="text-light-300 text-sm">{label}</Text>
      <Text className="text-light-200 text-sm font-semibold">{value}</Text>
    </View>
  );
}

export default MovieDetails

import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { trackSearch } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const insets = useSafeAreaInsets();

     const {
        data: movies,
        loading,
        error,
        fetchData,
        reset,
    } = useFetch(useCallback((signal?: AbortSignal) => fetchMovies(searchQuery, signal), [searchQuery]), false);

    useEffect(() => {
        if (!searchQuery.trim()) {
            reset();
            return;
        }

        const timer = setTimeout(() => {
            fetchData();
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        if (movies && movies.length > 0 && searchQuery.trim()) {
            trackSearch(searchQuery, movies[0]);
        }
    }, [movies]);

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" resizeMode="contain" />
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MovieCard {...item} />}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 20,
                    marginVertical: 10,
                }}
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <Image 
                            style={{ marginTop: insets.top + 20 }}
                            source={icons.logo} className="w-12 h-10 mb-5 mx-auto" resizeMode="contain" />
                        <SearchBar
                            placeholder="Search movies..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoFocus
                        /> 
                        { loading && (
                                <ActivityIndicator size="large" color="#ab8bff" />
                        )}

                        { error && (
                           <Text className="text-red text-lg">{error}</Text>
                        )}

                        {
                            !loading && !error && searchQuery.trim() && movies && movies.length > 0 && (
                                <Text className="text-white text-xl font-bold mt-2 mb-2">
                                    Search Results For:
                                    <Text className="text-accent"> {searchQuery}</Text>
                                </Text>
                            )
                        }
                    </>
                }
                ListEmptyComponent={
                    !loading && !error ? (
                        <View className='mt-10 px-5'>
                            <Text className='text-gray-500 text-center'>{searchQuery.trim() ? 'No moves found' : 'Search for movies'}</Text>
                        </View>
                    ) : null
                }

            />
        </View>
    )
}

export default Search
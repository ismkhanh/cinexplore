import { icons } from '@/constants/icons'
import { TMDB } from '@/services/api'
import { Link } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const MovieCard = ({ id, title, poster_path, vote_average, release_date }: Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild>
        <TouchableOpacity className="w-[30%]">
            <Image
                source={{ uri: poster_path ? `${TMDB.IMAGE_URL}${poster_path}` : undefined }}
                className="w-full h-52 rounded-lg bg-dark-300"
                resizeMode="cover"
            />
            <Text className="text-sm font-bold mt-2 text-white" numberOfLines={1}>
                {title}
            </Text>
            <View className="flex-row items-center justify-between mt-1">
                <View className="flex-row items-center">
                    <Image source={icons.star} className="size-4" tintColor="#FACC15" />
                    <Text className="text-xs text-white font-bold ml-1">{Math.round(vote_average) / 2}</Text>
                </View>
                <Text className="text-xs text-white font-bold">{release_date?.split('-')[0]}</Text>
            </View>
        </TouchableOpacity>
    </Link>
  )
}

export default MovieCard

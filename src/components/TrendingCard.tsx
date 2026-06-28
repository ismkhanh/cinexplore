import { images } from '@/constants/images'
import MaskedView from '@react-native-masked-view/masked-view'
import { Link } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const TrendingCard = ({ movie, index }: TrendingCardProps) => {
    return (
        <Link href={`/movie/${movie.movie_id}`} asChild>
            <TouchableOpacity className="w-32 relative">
                <Image
                    source={{ uri: movie.poster_url }}
                    className="w-32 h-48 rounded-lg"
                    resizeMode="cover"
                />
                <View className="absolute bottom-2 -right-8">
                    <MaskedView
                        maskElement={
                            <Text className="text-5xl font-black">{index + 1}</Text>
                        }
                    >
                        <Image
                            source={images.rankingGradient}
                            className="size-14"
                            resizeMode="cover"
                        />
                    </MaskedView>
                </View>
                <Text className="text-white text-sm font-bold mt-2" numberOfLines={1}>
                    {movie.title}
                </Text>
            </TouchableOpacity>
        </Link>
    )
}

export default TrendingCard

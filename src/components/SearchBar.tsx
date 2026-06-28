import { icons } from '@constants/icons'
import { Image, TextInput, View } from 'react-native'

interface Props {
  onPress?: () => void
  placeholder: string
}
const SearchBar = ({ onPress, placeholder }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-4 py-3">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value=""
        className="flex-1 ml-2 text-white h-11"
        placeholderTextColor="#ab8bff"
      />
    </View>
  )
}

export default SearchBar

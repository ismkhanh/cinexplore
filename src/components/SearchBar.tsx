import { icons } from '@/constants/icons'
import { Image, Pressable, Text, TextInput, View } from 'react-native'

interface Props {
  onPress?: () => void
  placeholder: string
  value?: string
  onChangeText?: (text: string) => void
  autoFocus?: boolean
  editable?: boolean
}

const SearchBar = ({ onPress, placeholder, value, onChangeText, autoFocus, editable = true }: Props) => {
    const content = (
        <>
            <Image
                source={icons.search}
                className="size-5"
                resizeMode="contain"
                tintColor="#ab8bff"
            />
            {editable ? (
                <TextInput
                    autoFocus={autoFocus}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    className="flex-1 ml-2 text-white h-11"
                    placeholderTextColor="#ab8bff"
                />
            ) : (
                <View className="flex-1 ml-2 h-11 justify-center">
                    <Text className="text-[#ab8bff]">{placeholder}</Text>
                </View>
            )}
        </>
    );

    if (!editable) {
        return (
            <Pressable
                onPress={onPress}
                className="flex-row items-center bg-dark-200 rounded-full px-4 py-3"
            >
                {content}
            </Pressable>
        );
    }

    return (
        <View className="flex-row items-center bg-dark-200 rounded-full px-4 py-3">
            {content}
        </View>
    );
}

export default SearchBar

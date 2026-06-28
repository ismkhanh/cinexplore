import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from 'expo-router';
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tabs = [
  { name: "index", title: "Home", icon: icons.home },
  { name: "search", title: "Search", icon: icons.search },
  { name: "saved", title: "Save", icon: icons.save },
  { name: "profile", title: "Profile", icon: icons.person },
];

function FloatingTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ marginBottom: insets.bottom + 20 }}
      className="absolute bottom-0 left-5 right-5 h-[52px] flex-row bg-[#0f0D23] rounded-full border border-[#0f0D23] overflow-hidden"
    >
      {state.routes.map((route: any, index: number) => {
        const tab = tabs[index];
        const focused = state.index === index;

        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            className="flex-1 h-full justify-center items-center"
          >
            {focused ? (
              <ImageBackground
                source={images.highlight}
                className="flex-row h-full w-full justify-center items-center rounded-full overflow-hidden"
              >
                <Image
                  source={tab.icon}
                  tintColor="#151312"
                  className="size-5"
                />
                <Text className="text- text-base font-semibold ml-2">
                  {tab.title}
                </Text>
              </ImageBackground>
            ) : (
              <Image
                source={tab.icon}
                tintColor="#A8B5DB"
                className="size-5"
              />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

export default function _Layout() {
  return (
    <Tabs 
        tabBar={(props) => <FloatingTabBar {...props} />}
        screenOptions={{ animation: 'shift' }} 
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{ headerShown: false }}
        />
      ))}
    </Tabs>
  );
}

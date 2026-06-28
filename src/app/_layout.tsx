import { Stack } from "expo-router";
import client from "@/services/appwrite";
import './globals.css';

client.ping().then(() => {
  console.log("Appwrite connected successfully");
}).catch((error) => {
  console.error("Appwrite connection failed:", error);
});

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade' }} />
    <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
  </Stack>
}

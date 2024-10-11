import { Children, useEffect, useState } from "react";
import { Stack, SplashScreen } from "expo-router";
import { PaperProvider } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFonts,
  JetBrainsMono_400Regular,
} from '@expo-google-fonts/jetbrains-mono'
import { NotoSans_400Regular } from '@expo-google-fonts/noto-sans'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { Themes } from "@/utils/theme"
import { ThemeProvider, useTheme as useGetTheme } from "@/hooks/theme";

type Theme = 'light' | 'dark'

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [loaded, error] = useFonts({
    NotoSans_400Regular,
    JetBrainsMono_400Regular,
    ...MaterialCommunityIcons.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return(
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  )
}


function RootLayoutNav() {
  const { theme } = useGetTheme()


  useEffect(() => {
    (async () => {
      const savedTheme = (await AsyncStorage.getItem("theme")) as
        | Theme
        | "light";
      if (savedTheme) {
        AsyncStorage.setItem("theme", savedTheme);
      }
    })();
  }, [theme]);

  return (
    <PaperProvider
      theme={Themes[theme]["cyan"]}
    >
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </PaperProvider>
  );
}

export default RootLayout

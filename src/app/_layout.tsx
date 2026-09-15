import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { useAppSelector } from "@/hooks/app-hooks";
import { loadMockSettings } from "@/services/mock/mockApi";
import { store } from "@/state/store";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [mockSettingsLoaded, setMockSettingsLoaded] = useState(false);

  useEffect(() => {
    void loadMockSettings().then(() => setMockSettingsLoaded(true));
  }, []);

  if (!mockSettingsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <RootStatusBar />
            <AnimatedSplashOverlay />
            <Stack screenOptions={{ headerShown: false }} />
          </ThemeProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function RootStatusBar() {
  const { data, isFestival } = useAppSelector((state) => state.config);
  const backgroundColor = data?.theme.background ?? "#F5FBFA";

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(backgroundColor);
  }, [backgroundColor]);

  return <StatusBar style={isFestival ? "light" : "dark"} />;
}

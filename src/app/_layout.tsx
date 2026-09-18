import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { useAppSelector } from "@/hooks/app-hooks";
import { loadMockSettings } from "@/services/mock/mockApi";
import { store } from "@/state/store";
import { AppThemeProvider, useAppTheme } from "@/theme/app-theme";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [mockSettingsLoaded, setMockSettingsLoaded] = useState(false);

  useEffect(() => {
    const initializationTimeout = new Promise<void>((resolve) => {
      setTimeout(resolve, 1500);
    });
    void Promise.race([loadMockSettings(), initializationTimeout])
      .catch(() => undefined)
      .finally(() => {
        setMockSettingsLoaded(true);
        void SplashScreen.hideAsync();
      });
  }, []);

  if (!mockSettingsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <AppThemeProvider>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <RootStatusBar />
              <Stack screenOptions={{ headerShown: false }} />
            </ThemeProvider>
          </AppThemeProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function RootStatusBar() {
  const { isFestival } = useAppSelector((state) => state.config);
  const { theme } = useAppTheme();
  const backgroundColor = theme.colors.background;

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(backgroundColor);
  }, [backgroundColor]);

  return (
    <StatusBar style={theme.mode === "dark" || isFestival ? "light" : "dark"} />
  );
}

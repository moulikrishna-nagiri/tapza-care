import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { store } from '@/state/store';
import { useAppSelector } from '@/hooks/app-hooks';
import { loadMockSettings } from '@/services/mock/mockApi';

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
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
  const backgroundColor = data?.theme.background ?? '#F5FBFA';

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(backgroundColor);
  }, [backgroundColor]);

  return <StatusBar style={isFestival ? 'light' : 'dark'} />;
}

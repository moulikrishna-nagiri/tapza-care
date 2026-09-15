import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

import { theme as normalTheme, type Theme } from './theme';

export type AppThemeMode = 'normal' | 'festival' | 'dark';

export type AppTheme = Theme & {
  mode: AppThemeMode;
  colors: Theme['colors'] & { onPrimary: string; overlay: string; warning: string; disabled: string };
};

const THEME_KEY = 'tapza-care/app-theme-mode';
const festivalColors = { ...normalTheme.colors, primary: '#8B3A62', secondary: '#E88B8B', background: '#FFF8F4', text: '#3E2632', mutedText: '#806D74', accent: '#E5A93D' };
const darkColors = { ...normalTheme.colors, primary: '#72C7C0', secondary: '#3C817F', background: '#10252A', surface: '#19363D', text: '#F2FBF9', mutedText: '#B7CFCC', accent: '#F3C86B', border: '#31545A', success: '#6BC792', danger: '#F28B8B' };

const AppThemeContext = createContext<{ theme: AppTheme; setMode: (mode: AppThemeMode) => void }>({
  theme: { ...normalTheme, mode: 'normal', colors: { ...normalTheme.colors, onPrimary: '#FFFFFF', overlay: 'rgba(18, 52, 59, 0.35)', warning: '#F4B942', disabled: '#9AAEAC' } },
  setMode: () => undefined,
});

export function AppThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<AppThemeMode>('normal');
  useEffect(() => { AsyncStorage.getItem(THEME_KEY).then((value) => { if (value === 'normal' || value === 'festival' || value === 'dark') setMode(value); }); }, []);
  const updateMode = (nextMode: AppThemeMode) => { setMode(nextMode); void AsyncStorage.setItem(THEME_KEY, nextMode); };
  const value = useMemo(() => ({ theme: { ...normalTheme, mode, colors: { ...(mode === 'festival' ? festivalColors : mode === 'dark' ? darkColors : normalTheme.colors), onPrimary: mode === 'dark' ? '#10252A' : '#FFFFFF', overlay: mode === 'dark' ? 'rgba(0, 0, 0, 0.55)' : 'rgba(18, 52, 59, 0.35)', warning: '#F4B942', disabled: mode === 'dark' ? '#5B7478' : '#9AAEAC' } }, setMode: updateMode }), [mode]);
  return <AppThemeContext.Provider value={value}>{children}</AppThemeContext.Provider>;
}

export function useAppTheme() {
  return useContext(AppThemeContext);
}

import { Platform } from 'react-native';

export const theme = {
  colors: {
    primary: '#176B87',
    secondary: '#64CCC5',
    background: '#F5FBFA',
    surface: '#FFFFFF',
    text: '#12343B',
    mutedText: '#61767A',
    accent: '#F4B942',
    border: '#DCEAE8',
    success: '#2D8A62',
    danger: '#C84B4B',
    onPrimary: '#FFFFFF',
    overlay: 'rgba(18, 52, 59, 0.35)',
    warning: '#F4B942',
    disabled: '#9AAEAC',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radii: {
    sm: 8,
    md: 16,
    lg: 24,
    pill: 999,
  },
  typography: {
    body: Platform.select({ ios: 'System', default: 'normal' }),
    display: Platform.select({ ios: 'System', default: 'normal' }),
  },
};

export type Theme = typeof theme;

import type { PropsWithChildren } from 'react';
import { ImageBackground, StyleSheet, View, type ViewProps } from 'react-native';

import type { SectionBackground as SectionBackgroundConfig } from '@/types/config';

type SectionBackgroundProps = PropsWithChildren<ViewProps> & {
  background?: SectionBackgroundConfig;
};

export function SectionBackground({
  children,
  background = { kind: 'color', value: '#F5FBFA' },
  style,
  ...props
}: SectionBackgroundProps) {
  const color = background.kind === 'gradient' ? background.value.split(',')[0] : background.value;
  const content = <View style={styles.content}>{children}</View>;
  if (background.kind === 'image') return <ImageBackground source={{ uri: background.value }} style={[styles.container, style]} {...props}>{<View style={styles.imageOverlay}>{content}</View>}</ImageBackground>;
  return <View style={[styles.container, { backgroundColor: color }, style]} {...props}><View pointerEvents="none" style={[styles.accent, { backgroundColor: background.kind === 'gradient' ? background.value.split(',')[1] ?? color : '#DDF3EF' }]} />{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  content: {
    width: '100%',
  },
  imageOverlay: {
    backgroundColor: 'rgba(245, 251, 250, 0.9)',
  },
  accent: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    top: -90,
    right: -50,
    opacity: 0.75,
  },
});

import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, type SharedValue } from 'react-native-reanimated';

import type { SectionConfig } from '@/types/config';
import { theme } from '@/theme/theme';
import { useAppTheme } from '@/theme/app-theme';

type HomeHeaderProps = { section: SectionConfig; scrollY: SharedValue<number>; onAction: (action?: string) => void };

export function HomeHeader({ section, scrollY }: HomeHeaderProps) {
  const { theme: appTheme } = useAppTheme();
  const styles = createStyles(appTheme.colors);
  const item = section.items[0] as { greeting?: string; subtitle?: string } | undefined;
  const expandedStyle = useAnimatedStyle(() => ({ opacity: interpolate(scrollY.value, [0, 90], [1, 0], 'clamp'), transform: [{ translateY: interpolate(scrollY.value, [0, 90], [0, -12], 'clamp') }] }));
  const compactStyle = useAnimatedStyle(() => ({ opacity: interpolate(scrollY.value, [0, 90], [0, 1], 'clamp'), transform: [{ translateY: interpolate(scrollY.value, [0, 90], [12, 0], 'clamp') }] }));

  return (
    <View style={styles.container} accessibilityRole="header">
      <Animated.View style={[styles.expanded, expandedStyle]}>
        <View>
          <Animated.Text style={styles.greeting}>{item?.greeting ?? 'Good morning'}</Animated.Text>
          <Animated.Text style={styles.subtitle}>{item?.subtitle ?? 'How can we help you today?'}</Animated.Text>
        </View>
        <Pressable accessibilityLabel="Open notifications" accessibilityRole="button" style={styles.notification}><Animated.Text style={styles.bell}>!</Animated.Text></Pressable>
      </Animated.View>
      <Animated.View pointerEvents="none" style={[styles.compact, compactStyle]}><Animated.Text style={styles.compactTitle}>Tapza Care</Animated.Text><Animated.Text style={styles.bell}>!</Animated.Text></Animated.View>
    </View>
  );
}

const createStyles = (colors: typeof theme.colors) => StyleSheet.create({
  container: { minHeight: 92, justifyContent: 'center' },
  expanded: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  compact: { ...StyleSheet.absoluteFill, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  greeting: { color: colors.text, fontSize: 25, fontWeight: '700' },
  subtitle: { color: colors.mutedText, fontSize: 15, marginTop: 6 },
  compactTitle: { color: colors.text, fontSize: 19, fontWeight: '700' },
  notification: { width: 48, height: 48, minHeight: 48, borderRadius: 24, backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center' },
  bell: { color: colors.primary, fontSize: 22, fontWeight: '800' },
});

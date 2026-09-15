import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import Animated, { interpolate, useAnimatedStyle, type SharedValue } from 'react-native-reanimated';

import type { HeroItem, SectionConfig } from '@/types/config';
import { theme } from '@/theme/theme';

type HeroBannerProps = { section: SectionConfig; scrollY: SharedValue<number>; onAction: (action?: string) => void };

export function HeroBanner({ section, scrollY, onAction }: HeroBannerProps) {
  const item = section.items[0] as HeroItem;
  const imageStyle = useAnimatedStyle(() => ({ transform: [{ translateY: interpolate(scrollY.value, [0, 300], [0, 35], 'clamp') }, { scale: interpolate(scrollY.value, [0, 300], [1, 1.08], 'clamp') }] }));
  return <View style={styles.container}><Animated.View style={[StyleSheet.absoluteFill, imageStyle]}><Image source={item.imageUrl} contentFit="cover" style={styles.image} accessibilityLabel="Healthcare consultation" /></Animated.View><View style={styles.overlay} /><View style={styles.content}><Text style={styles.eyebrow}>{item.eyebrow}</Text><Text style={styles.title}>{item.title}</Text><Text style={styles.subtitle}>{item.subtitle}</Text><Pressable accessibilityRole="button" accessibilityLabel={item.ctaLabel} onPress={() => onAction()} style={styles.cta}><Text style={styles.ctaText}>{item.ctaLabel}</Text></Pressable></View></View>;
}

const styles = StyleSheet.create({ container: { minHeight: 270, borderRadius: 24, overflow: 'hidden', justifyContent: 'flex-end' }, image: { ...StyleSheet.absoluteFill }, overlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(10, 42, 48, 0.56)' }, content: { padding: 24, maxWidth: 360 }, eyebrow: { color: '#A8E7DE', fontSize: 12, fontWeight: '700', letterSpacing: 1 }, title: { color: '#FFFFFF', fontSize: 30, lineHeight: 35, fontWeight: '800', marginTop: 8 }, subtitle: { color: '#E8F5F3', fontSize: 15, lineHeight: 22, marginTop: 8 }, cta: { minHeight: 46, alignSelf: 'flex-start', backgroundColor: '#FFFFFF', borderRadius: 23, paddingHorizontal: 19, justifyContent: 'center', marginTop: 18 }, ctaText: { color: theme.colors.primary, fontSize: 15, fontWeight: '700' } });

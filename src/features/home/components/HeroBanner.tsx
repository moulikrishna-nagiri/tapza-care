import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";

import { useAppTheme } from "@/theme/app-theme";
import { theme } from "@/theme/theme";
import type { HeroItem, SectionConfig } from "@/types/config";

type HeroBannerProps = {
  section: SectionConfig;
  scrollY: SharedValue<number>;
  onAction: (action?: string) => void;
};

export function HeroBanner({ section, scrollY, onAction }: HeroBannerProps) {
  const { theme: appTheme } = useAppTheme();
  const styles = createStyles(appTheme.colors);
  const item = section.items[0] as HeroItem | undefined;
  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(scrollY.value, [0, 300], [0, 35], "clamp") },
      { scale: interpolate(scrollY.value, [0, 300], [1, 1.08], "clamp") },
    ],
  }));
  if (!item) return null;
  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageStyle]}>
        <Image
          source={item.imageUrl}
          contentFit="cover"
          style={styles.image}
          accessibilityLabel="Healthcare consultation"
        />
      </Animated.View>
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.eyebrow}>{item.eyebrow}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={item.ctaLabel}
          onPress={() => onAction()}
          style={styles.cta}
        >
          <Text style={styles.ctaText}>{item.ctaLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const createStyles = (colors: typeof theme.colors) =>
  StyleSheet.create({
    container: {
      minHeight: 270,
      borderRadius: 24,
      overflow: "hidden",
      justifyContent: "flex-end",
    },
    image: { ...StyleSheet.absoluteFill },
    overlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: colors.overlay,
    },
    content: { padding: 24, maxWidth: 360 },
    eyebrow: {
      color: colors.secondary,
      fontSize: 12,
      fontWeight: "700",
      letterSpacing: 1,
    },
    title: {
      color: colors.onPrimary,
      fontSize: 30,
      lineHeight: 35,
      fontWeight: "800",
      marginTop: 8,
    },
    subtitle: {
      color: colors.onPrimary,
      fontSize: 15,
      lineHeight: 22,
      marginTop: 8,
    },
    cta: {
      minHeight: 46,
      alignSelf: "flex-start",
      backgroundColor: colors.surface,
      borderRadius: 23,
      paddingHorizontal: 19,
      justifyContent: "center",
      marginTop: 18,
    },
    ctaText: { color: colors.primary, fontSize: 15, fontWeight: "700" },
  });

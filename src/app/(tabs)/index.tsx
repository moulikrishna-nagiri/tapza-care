import type { RelativePathString } from "expo-router";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionBackground } from "@/components/SectionBackground";
import { Skeleton } from "@/components/Skeleton";
import {
  sectionRegistry,
  type SectionRendererProps,
} from "@/config/sectionRegistry";
import { loadConfig, setFestivalMode } from "@/features/home/configSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/app-hooks";
import { useAppTheme } from "@/theme/app-theme";
import { theme } from "@/theme/theme";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { theme: appTheme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const { data, loading, error, isFestival, isStale } = useAppSelector(
    (state) => state.config,
  );
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  useEffect(() => {
    dispatch(loadConfig({ isFestival }));
  }, [dispatch, isFestival]);
  const handleAction = (action?: string) => {
    if (action === "prescriptions") return router.push("/prescriptions");
    if (action === "profile" || action === "records")
      return router.push("/profile");
    if (action === "booking")
      return router.push("/booking" as RelativePathString);
    return router.push("/bookings");
  };
  if (loading && !data) return <LoadingHome />;
  if (!data)
    return (
      <ErrorState
        message={error ?? "We could not load your home screen."}
        onRetry={() => dispatch(loadConfig({ isFestival }))}
      />
    );
  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: appTheme.colors.background }]}
    >
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
      >
        <View style={styles.modeRow}>
          <Text
            style={[styles.modeLabel, { color: appTheme.colors.mutedText }]}
          >
            {isStale
              ? "Offline: showing saved content"
              : data.theme.festival.name || "Personal care"}
          </Text>
          <Pressable
            accessibilityRole="switch"
            accessibilityState={{ checked: isFestival }}
            accessibilityLabel="Toggle festival mode"
            onPress={() => dispatch(setFestivalMode(!isFestival))}
            style={[
              styles.modeButton,
              { borderColor: appTheme.colors.primary },
            ]}
          >
            <Text
              style={[
                styles.modeButtonText,
                { color: appTheme.colors.primary },
              ]}
            >
              {isFestival ? "Normal view" : "Festival view"}
            </Text>
          </Pressable>
        </View>
        {isStale && (
          <View style={styles.offlineBanner}>
            <Text accessibilityRole="alert" style={styles.offlineTitle}>
              Showing saved content
            </Text>
            <Text style={styles.offlineText}>
              We could not refresh the latest Home configuration.
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Retry refreshing Home configuration"
              onPress={() => dispatch(loadConfig({ isFestival }))}
              style={styles.offlineRetry}
            >
              <Text style={styles.offlineRetryText}>Retry now</Text>
            </Pressable>
          </View>
        )}
        {data.sections.map((section, index) => {
          const Component = sectionRegistry[section.type];
          if (!Component) return null;
          return (
            <AnimatedSection key={section.id} delay={index * 55}>
              <SectionBackground
                background={section.background}
                style={styles.section}
              >
                <View style={styles.sectionInner}>
                  {section.title && (
                    <Text
                      style={[
                        styles.sectionTitle,
                        { color: appTheme.colors.text },
                      ]}
                    >
                      {section.title}
                    </Text>
                  )}
                  <Component
                    {...({
                      section,
                      scrollY,
                      onAction: handleAction,
                    } satisfies SectionRendererProps)}
                  />
                </View>
              </SectionBackground>
            </AnimatedSection>
          );
        })}
        {error && (
          <View style={styles.errorRow}>
            <Text accessibilityRole="alert" style={styles.staleText}>
              {error}
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Retry loading home configuration"
              onPress={() => dispatch(loadConfig({ isFestival }))}
              style={styles.retry}
            >
              <Text
                style={[styles.retryText, { color: appTheme.colors.primary }]}
              >
                Try again
              </Text>
            </Pressable>
          </View>
        )}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
function LoadingHome() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.loading}>
        <Skeleton width="65%" height={28} />
        <Skeleton width="45%" height={18} />
        <Skeleton height={250} radius={24} />
        <Skeleton width="35%" height={22} />
        <View style={styles.loadingRow}>
          <Skeleton width="48%" height={132} radius={18} />
          <Skeleton width="48%" height={132} radius={18} />
        </View>
      </View>
    </SafeAreaView>
  );
}
function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.error}>
        <Text style={styles.errorTitle}>Your care is still here</Text>
        <Text style={styles.errorText}>{message}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Retry loading home screen"
          onPress={onRetry}
          style={styles.retry}
        >
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 40 },
  section: { marginTop: 18, borderRadius: 24 },
  sectionInner: { padding: 16 },
  sectionTitle: { fontSize: 21, fontWeight: "800", marginBottom: 12 },
  modeRow: {
    minHeight: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modeLabel: { fontSize: 13, fontWeight: "600" },
  modeButton: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  modeButtonText: { fontSize: 12, fontWeight: "700" },
  offlineBanner: {
    borderRadius: 14,
    backgroundColor: "#173F4B",
    padding: 14,
    marginTop: 12,
  },
  offlineTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  offlineText: { color: "#E6F5F2", fontSize: 13, lineHeight: 19, marginTop: 4 },
  offlineRetry: {
    minHeight: 44,
    alignSelf: "flex-start",
    justifyContent: "center",
    marginTop: 4,
  },
  offlineRetryText: { color: "#A8E7DE", fontSize: 13, fontWeight: "800" },
  errorRow: { alignItems: "center", marginTop: 12 },
  staleText: {
    color: theme.colors.mutedText,
    textAlign: "center",
    fontSize: 12,
  },
  loading: { flex: 1, gap: 16, padding: 16 },
  loadingRow: { flexDirection: "row", justifyContent: "space-between" },
  error: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  errorTitle: { color: theme.colors.text, fontSize: 24, fontWeight: "800" },
  errorText: {
    color: theme.colors.mutedText,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 12,
  },
  retry: { minHeight: 44, justifyContent: "center", paddingHorizontal: 16 },
  retryText: { fontSize: 13, fontWeight: "800" },
});

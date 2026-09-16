import type { PropsWithChildren } from "react";
import {
    ImageBackground,
    StyleSheet,
    View,
    type ViewProps,
} from "react-native";

import { useAppTheme } from "@/theme/app-theme";
import type { SectionBackground as SectionBackgroundConfig } from "@/types/config";

type SectionBackgroundProps = PropsWithChildren<ViewProps> & {
  background?: SectionBackgroundConfig;
};

export function SectionBackground({
  children,
  background = { kind: "color", value: "#F5FBFA" },
  style,
  ...props
}: SectionBackgroundProps) {
  const { theme } = useAppTheme();
  const color =
    background.kind === "gradient"
      ? background.value.split(",")[0]
      : background.value;
  const content = <View style={styles.content}>{children}</View>;
  if (background.kind === "image")
    return (
      <ImageBackground
        source={{ uri: background.value }}
        style={[styles.container, style]}
        {...props}
      >
        <View
          style={[
            styles.imageOverlay,
            theme.mode === "dark" && styles.darkImageOverlay,
          ]}
        >
          {content}
        </View>
      </ImageBackground>
    );
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.mode === "dark" ? theme.colors.surface : color,
        },
        style,
      ]}
      {...props}
    >
      <View
        pointerEvents="none"
        style={[
          styles.accent,
          {
            backgroundColor:
              theme.mode === "dark"
                ? theme.colors.border
                : background.kind === "gradient"
                  ? (background.value.split(",")[1] ?? color)
                  : "#DDF3EF",
          },
        ]}
      />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  content: {
    width: "100%",
  },
  imageOverlay: {
    backgroundColor: "rgba(245, 251, 250, 0.9)",
  },
  darkImageOverlay: {
    backgroundColor: "rgba(16, 37, 42, 0.88)",
  },
  accent: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    top: -90,
    right: -50,
    opacity: 0.75,
  },
});

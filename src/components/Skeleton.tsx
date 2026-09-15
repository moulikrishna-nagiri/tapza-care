import { StyleSheet, View, type ViewProps } from 'react-native';
import { useAppTheme } from '@/theme/app-theme';

type SkeletonProps = ViewProps & {
  width?: number | `${number}%`;
  height?: number;
  radius?: number;
};

export function Skeleton({ width = '100%', height = 16, radius = 8, style, ...props }: SkeletonProps) {
  const { theme } = useAppTheme();
  return (
    <View
      accessibilityLabel="Loading"
      accessibilityRole="progressbar"
      style={[styles.base, { backgroundColor: theme.colors.border, width, height, borderRadius: radius }, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: { opacity: 0.8 },
});

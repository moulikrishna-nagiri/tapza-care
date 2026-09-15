import { StyleSheet, View, type ViewProps } from 'react-native';

type SkeletonProps = ViewProps & {
  width?: number | `${number}%`;
  height?: number;
  radius?: number;
};

export function Skeleton({ width = '100%', height = 16, radius = 8, style, ...props }: SkeletonProps) {
  return (
    <View
      accessibilityLabel="Loading"
      accessibilityRole="progressbar"
      style={[styles.base, { width, height, borderRadius: radius }, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#DCE7E6',
    opacity: 0.8,
  },
});

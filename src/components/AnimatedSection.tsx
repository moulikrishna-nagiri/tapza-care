import type { PropsWithChildren } from 'react';
import { View, type ViewProps } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

type AnimatedSectionProps = PropsWithChildren<ViewProps> & {
  delay?: number;
};

export function AnimatedSection({ children, delay = 0, style, ...props }: AnimatedSectionProps) {
  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(450)} style={style} {...props}>
      {children}
    </Animated.View>
  );
}

export type SectionContentProps = PropsWithChildren<ViewProps>;

export function SectionContent({ children, ...props }: SectionContentProps) {
  return <View {...props}>{children}</View>;
}

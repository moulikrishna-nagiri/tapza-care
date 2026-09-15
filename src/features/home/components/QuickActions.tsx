import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

import type { QuickActionItem, SectionConfig } from '@/types/config';
import { theme } from '@/theme/theme';
import { useAppTheme } from '@/theme/app-theme';

type Props = { section: SectionConfig; scrollY: SharedValue<number>; onAction: (action: string) => void };
export function QuickActions({ section, onAction }: Props) {
  const { theme: appTheme } = useAppTheme();
  const styles = createStyles(appTheme.colors);
  const items = section.items as QuickActionItem[];
  return <View style={styles.grid}>{items.map((item) => <Pressable key={item.id} accessibilityRole="button" accessibilityLabel={item.title} onPress={() => onAction(item.action)} style={({ pressed }) => [styles.card, pressed && styles.pressed]}><View style={styles.icon}><Text style={styles.iconText}>{item.icon}</Text></View><Text style={styles.title}>{item.title}</Text><Text style={styles.subtitle}>{item.subtitle}</Text></Pressable>)}</View>;
}
const createStyles = (colors: typeof theme.colors) => StyleSheet.create({ grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 }, card: { width: '48%', minHeight: 132, borderRadius: 18, backgroundColor: colors.surface, padding: 16, justifyContent: 'space-between' }, pressed: { opacity: 0.75 }, icon: { width: 40, height: 40, borderRadius: 14, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }, iconText: { color: colors.primary, fontSize: 19, fontWeight: '800' }, title: { color: colors.text, fontSize: 16, fontWeight: '700', marginTop: 12 }, subtitle: { color: colors.mutedText, fontSize: 12, lineHeight: 18, marginTop: 4 } });

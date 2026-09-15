import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import { useState } from 'react';

import type { CategoryItem, SectionConfig } from '@/types/config';
import { theme } from '@/theme/theme';

type Props = { section: SectionConfig; scrollY: SharedValue<number>; onAction: (action?: string) => void };
export function CategoryChips({ section }: Props) {
  const [selected, setSelected] = useState('general');
  const items = section.items as CategoryItem[];
  return <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.content}>{items.map((item) => <Pressable key={item.id} accessibilityRole="button" accessibilityState={{ selected: selected === item.id }} accessibilityLabel={`${item.label} care category`} onPress={() => setSelected(item.id)} style={[styles.chip, selected === item.id && styles.selected]}><Text style={[styles.icon, selected === item.id && styles.selectedText]}>{item.icon}</Text><Text style={[styles.label, selected === item.id && styles.selectedText]}>{item.label}</Text></Pressable>)}</ScrollView>;
}
const styles = StyleSheet.create({ content: { gap: 10, paddingVertical: 4 }, chip: { minHeight: 48, borderRadius: 24, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.surface, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', gap: 8 }, selected: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }, icon: { width: 23, height: 23, borderRadius: 12, textAlign: 'center', textAlignVertical: 'center', backgroundColor: '#E3F3F0', color: theme.colors.primary, fontWeight: '800' }, label: { color: theme.colors.text, fontSize: 14, fontWeight: '600' }, selectedText: { color: '#FFFFFF' } });

import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { theme } from '@/theme/theme';

type DateSelectorProps = { dates: string[]; selectedDate: string; onSelect: (date: string) => void };

function formatDate(date: string) {
  const value = new Date(`${date}T12:00:00`);
  return { weekday: value.toLocaleDateString('en-US', { weekday: 'short' }), day: value.toLocaleDateString('en-US', { day: '2-digit' }), month: value.toLocaleDateString('en-US', { month: 'short' }) };
}

export function DateSelector({ dates, selectedDate, onSelect }: DateSelectorProps) {
  return <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.content}>{dates.map((date, index) => { const formatted = formatDate(date); const selected = date === selectedDate; return <Pressable key={date} accessibilityRole="button" accessibilityLabel={`Select appointment date ${date}`} accessibilityState={{ selected }} onPress={() => onSelect(date)} style={[styles.date, selected && styles.selected]}><Text style={[styles.weekday, selected && styles.selectedText]}>{index === 0 ? 'Today' : formatted.weekday}</Text><Text style={[styles.day, selected && styles.selectedText]}>{formatted.day}</Text><Text style={[styles.month, selected && styles.selectedText]}>{formatted.month}</Text></Pressable>; })}</ScrollView>;
}

const styles = StyleSheet.create({ content: { gap: 10, paddingVertical: 4 }, date: { width: 76, minHeight: 88, borderRadius: theme.radii.md, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.surface, justifyContent: 'center', alignItems: 'center' }, selected: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }, weekday: { color: theme.colors.mutedText, fontSize: 12, fontWeight: '700' }, day: { color: theme.colors.text, fontSize: 22, fontWeight: '800', marginTop: 3 }, month: { color: theme.colors.mutedText, fontSize: 12, marginTop: 1 }, selectedText: { color: '#FFFFFF' } });

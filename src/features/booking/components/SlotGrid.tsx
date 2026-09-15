import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Slot } from '@/types/booking';
import { theme } from '@/theme/theme';
import { useAppTheme } from '@/theme/app-theme';

type SlotGridProps = { slots: Slot[]; selectedSlotId: string | null; onSelect: (slot: Slot) => void };

function formatTime(value: string) { return new Date(value).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }); }

export function SlotGrid({ slots, selectedSlotId, onSelect }: SlotGridProps) {
  const { theme: appTheme } = useAppTheme();
  const styles = createStyles(appTheme.colors);
  if (!slots.length) return <Text style={styles.empty}>No appointments available for this date. Try another date.</Text>;
  return <View style={styles.grid}>{slots.map((slot) => { const selected = slot.id === selectedSlotId; return <Pressable key={slot.id} disabled={!slot.available} accessibilityRole="button" accessibilityLabel={`${selected ? 'Selected' : 'Select'} ${formatTime(slot.startsAt)} appointment slot${slot.available ? '' : ', unavailable'}`} accessibilityState={{ selected, disabled: !slot.available }} onPress={() => onSelect(slot)} style={[styles.slot, !slot.available && styles.unavailable, selected && styles.selected]}><Text style={[styles.time, selected && styles.selectedText, !slot.available && styles.unavailableText]}>{selected ? '✓ ' : ''}{formatTime(slot.startsAt)}</Text>{!slot.available && <Text style={styles.unavailableText}>Unavailable</Text>}</Pressable>; })}</View>;
}

const createStyles = (colors: typeof theme.colors) => StyleSheet.create({ grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 }, slot: { width: '48%', minHeight: 52, borderRadius: theme.radii.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center' }, selected: { backgroundColor: colors.primary, borderColor: colors.primary }, unavailable: { backgroundColor: colors.background, borderColor: colors.border }, time: { color: colors.text, fontSize: 14, fontWeight: '700' }, selectedText: { color: colors.onPrimary ?? '#FFFFFF' }, unavailableText: { color: colors.mutedText, fontSize: 11, marginTop: 2 }, empty: { color: colors.mutedText, fontSize: 15, lineHeight: 22 } });

import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Slot } from '@/types/booking';
import { theme } from '@/theme/theme';

type SlotGridProps = { slots: Slot[]; selectedSlotId: string | null; onSelect: (slot: Slot) => void };

function formatTime(value: string) { return new Date(value).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }); }

export function SlotGrid({ slots, selectedSlotId, onSelect }: SlotGridProps) {
  if (!slots.length) return <Text style={styles.empty}>No appointments available for this date. Try another date.</Text>;
  return <View style={styles.grid}>{slots.map((slot) => { const selected = slot.id === selectedSlotId; return <Pressable key={slot.id} disabled={!slot.available} accessibilityRole="button" accessibilityLabel={`Select ${formatTime(slot.startsAt)} appointment slot${slot.available ? '' : ', unavailable'}`} accessibilityState={{ selected, disabled: !slot.available }} onPress={() => onSelect(slot)} style={[styles.slot, !slot.available && styles.unavailable, selected && styles.selected]}><Text style={[styles.time, selected && styles.selectedText, !slot.available && styles.unavailableText]}>{selected ? '✓ ' : ''}{formatTime(slot.startsAt)}</Text>{!slot.available && <Text style={styles.unavailableText}>Unavailable</Text>}</Pressable>; })}</View>;
}

const styles = StyleSheet.create({ grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 }, slot: { width: '48%', minHeight: 52, borderRadius: theme.radii.md, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.surface, justifyContent: 'center', alignItems: 'center' }, selected: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }, unavailable: { backgroundColor: '#EEF2F2', borderColor: '#E0E7E6' }, time: { color: theme.colors.text, fontSize: 14, fontWeight: '700' }, selectedText: { color: '#FFFFFF' }, unavailableText: { color: theme.colors.mutedText, fontSize: 11, marginTop: 2 }, empty: { color: theme.colors.mutedText, fontSize: 15, lineHeight: 22 } });

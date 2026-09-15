import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { DosePeriod } from '@/types/prescription';
import { theme } from '@/theme/theme';

type DoseRowProps = { period: DosePeriod; taken: boolean; loading: boolean; onPress: () => void };

export const DoseRow = memo(function DoseRow({ period, taken, loading, onPress }: DoseRowProps) {
  const label = period[0].toUpperCase() + period.slice(1);
  return <View style={styles.row}><Text style={styles.period}>{label}</Text><Pressable disabled={taken || loading} accessibilityRole="button" accessibilityLabel={`${taken ? 'Dose taken' : 'Mark'} ${label.toLowerCase()} dose as taken`} accessibilityState={{ disabled: taken || loading }} onPress={onPress} style={[styles.button, taken && styles.taken, loading && styles.loading]}><Text style={[styles.buttonText, taken && styles.takenText]}>{taken ? '✓ Taken' : loading ? 'Saving...' : 'Mark as taken'}</Text></Pressable></View>;
});

const styles = StyleSheet.create({ row: { minHeight: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: theme.colors.border }, period: { color: theme.colors.text, fontSize: 15, fontWeight: '700' }, button: { minHeight: 44, minWidth: 126, paddingHorizontal: 12, borderRadius: 22, borderWidth: 1, borderColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center' }, taken: { backgroundColor: theme.colors.success, borderColor: theme.colors.success }, loading: { opacity: 0.6 }, buttonText: { color: theme.colors.primary, fontSize: 12, fontWeight: '800' }, takenText: { color: '#FFFFFF' } });

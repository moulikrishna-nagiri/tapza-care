import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { DosePeriod } from '@/types/prescription';
import { theme } from '@/theme/theme';
import { useAppTheme } from '@/theme/app-theme';

type DoseRowProps = { medicineName: string; period: DosePeriod; taken: boolean; loading: boolean; onPress: () => void };

export const DoseRow = memo(function DoseRow({ medicineName, period, taken, loading, onPress }: DoseRowProps) {
  const { theme: appTheme } = useAppTheme();
  const styles = createStyles(appTheme.colors);
  const label = period[0].toUpperCase() + period.slice(1);
  return <View style={styles.row}><Text style={styles.period}>{label}</Text><Pressable disabled={taken || loading} accessibilityRole="button" accessibilityLabel={`${taken ? 'Taken' : 'Mark'} ${label.toLowerCase()} dose for ${medicineName} as taken`} accessibilityState={{ disabled: taken || loading, selected: taken }} onPress={onPress} style={[styles.button, taken && styles.taken, loading && styles.loading]}><Text style={[styles.buttonText, taken && styles.takenText]}>{taken ? '✓ Taken' : loading ? 'Saving...' : 'Mark as taken'}</Text></Pressable></View>;
});

const createStyles = (colors: typeof theme.colors) => StyleSheet.create({ row: { minHeight: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: colors.border }, period: { color: colors.text, fontSize: 15, fontWeight: '700' }, button: { minHeight: 44, minWidth: 126, paddingHorizontal: 12, borderRadius: 22, borderWidth: 1, borderColor: colors.primary, justifyContent: 'center', alignItems: 'center' }, taken: { backgroundColor: colors.success, borderColor: colors.success }, loading: { opacity: 0.6 }, buttonText: { color: colors.primary, fontSize: 12, fontWeight: '800' }, takenText: { color: colors.onPrimary ?? '#FFFFFF' } });

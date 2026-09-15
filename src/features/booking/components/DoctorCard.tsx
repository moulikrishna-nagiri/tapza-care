import { Image } from 'expo-image';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/theme/app-theme';
import type { Doctor } from '@/types/doctor';
import { theme } from '@/theme/theme';

type DoctorCardProps = { doctor: Doctor; onPress: () => void };

export const DoctorCard = memo(function DoctorCard({ doctor, onPress }: DoctorCardProps) {
  const { theme: appTheme } = useAppTheme();
  const styles = createStyles(appTheme.colors);
  return <Pressable accessibilityRole="button" accessibilityLabel={`Book an appointment with ${doctor.name}`} onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}><Image source={doctor.photoUrl} contentFit="cover" style={styles.photo} accessibilityLabel={`Photo of ${doctor.name}`} /><View style={styles.details}><Text style={styles.name}>{doctor.name}</Text><Text style={styles.specialty}>{doctor.specialty}</Text><Text style={styles.languages}>{doctor.languages.join(' • ')}</Text><View style={styles.footer}><View><Text style={styles.nextLabel}>Next available</Text><Text style={styles.next}>{doctor.nextAvailableAt ?? 'Check availability'}</Text></View><Text style={styles.fee}>INR {doctor.feeInr.toLocaleString('en-IN')}</Text></View><View style={styles.button}><Text style={styles.buttonText}>Book appointment</Text></View></View></Pressable>;
});

const createStyles = (colors: typeof theme.colors) => StyleSheet.create({ card: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: theme.radii.lg, padding: theme.spacing.sm, marginBottom: theme.spacing.md, borderWidth: 1, borderColor: colors.border }, pressed: { opacity: 0.78 }, photo: { width: 104, height: 148, borderRadius: theme.radii.md }, details: { flex: 1, padding: theme.spacing.sm, justifyContent: 'space-between' }, name: { color: colors.text, fontSize: 17, fontWeight: '800' }, specialty: { color: colors.mutedText, fontSize: 14, marginTop: 4 }, languages: { color: colors.mutedText, fontSize: 12, marginTop: 8 }, footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 12 }, nextLabel: { color: colors.mutedText, fontSize: 11 }, next: { color: colors.success, fontSize: 12, fontWeight: '700', marginTop: 3 }, fee: { color: colors.text, fontSize: 14, fontWeight: '800' }, button: { minHeight: 44, borderRadius: 22, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginTop: 12 }, buttonText: { color: colors.onPrimary, fontSize: 13, fontWeight: '700' } });

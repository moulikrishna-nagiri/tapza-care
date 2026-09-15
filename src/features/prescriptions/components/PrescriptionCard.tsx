import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Prescription } from '@/types/prescription';
import { theme } from '@/theme/theme';

type PrescriptionCardProps = { prescription: Prescription; onPress: () => void };

export const PrescriptionCard = memo(function PrescriptionCard({ prescription, onPress }: PrescriptionCardProps) {
  const formattedDate = new Date(`${prescription.date}T12:00:00`).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  return <Pressable accessibilityRole="button" accessibilityLabel={`View prescription from ${prescription.doctorName}`} onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}><View style={styles.header}><View style={styles.doctor}><Text style={styles.doctorName}>{prescription.doctorName || 'Doctor not listed'}</Text><Text style={styles.specialty}>{prescription.doctorSpecialty || 'Specialty not listed'}</Text></View><Text style={styles.date}>{formattedDate}</Text></View><Text style={styles.diagnosis}>{prescription.diagnosis || 'Diagnosis not provided'}</Text><View style={styles.footer}><Text style={styles.medicineCount}>{prescription.medicines.length} {prescription.medicines.length === 1 ? 'medicine' : 'medicines'}</Text><Text style={styles.action}>View details  ›</Text></View></Pressable>;
});

const styles = StyleSheet.create({ card: { backgroundColor: theme.colors.surface, borderRadius: theme.radii.lg, borderWidth: 1, borderColor: theme.colors.border, padding: theme.spacing.md, marginBottom: theme.spacing.md }, pressed: { opacity: 0.78 }, header: { flexDirection: 'row', justifyContent: 'space-between', gap: theme.spacing.sm }, doctor: { flex: 1 }, doctorName: { color: theme.colors.text, fontSize: 17, fontWeight: '800' }, specialty: { color: theme.colors.mutedText, fontSize: 13, marginTop: 4 }, date: { color: theme.colors.mutedText, fontSize: 12 }, diagnosis: { color: theme.colors.text, fontSize: 16, fontWeight: '700', marginTop: theme.spacing.lg }, footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: theme.spacing.lg }, medicineCount: { color: theme.colors.mutedText, fontSize: 13 }, action: { color: theme.colors.primary, fontSize: 13, fontWeight: '800' } });

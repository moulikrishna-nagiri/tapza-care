import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DoseRow } from './DoseRow';
import type { DosePeriod, Medicine } from '@/types/prescription';
import { theme } from '@/theme/theme';
import { useAppTheme } from '@/theme/app-theme';

type MedicineCardProps = { medicine: Medicine; prescriptionId: string; date: string; statuses: Record<string, boolean>; loadingStatuses: Record<string, boolean>; getKey: (medicineId: string, period: DosePeriod) => string; onDose: (medicineId: string, period: DosePeriod) => void };

export const MedicineCard = memo(function MedicineCard({ medicine, prescriptionId, date, statuses, loadingStatuses, getKey, onDose }: MedicineCardProps) {
  const { theme: appTheme } = useAppTheme();
  const styles = createStyles(appTheme.colors);
  const schedule: DosePeriod[] = ['morning', 'afternoon', 'night'];
  return <View style={styles.card}><Text style={styles.name}>{medicine.name || 'Medicine not listed'}</Text><Text style={styles.meta}>{medicine.dosage || 'Dosage not provided'} · {medicine.duration || 'Duration not provided'}</Text><Text style={styles.instructions}>{medicine.instructions || 'Follow your doctor’s instructions.'}</Text>{schedule.filter((period) => medicine.schedule?.[period]).map((period) => { const key = getKey(medicine.id, period); return <DoseRow key={`${prescriptionId}-${medicine.id}-${period}-${date}`} medicineName={medicine.name || 'medicine'} period={period} taken={Boolean(statuses[key])} loading={Boolean(loadingStatuses[key])} onPress={() => onDose(medicine.id, period)} />; })}</View>;
});

const createStyles = (colors: typeof theme.colors) => StyleSheet.create({ card: { backgroundColor: colors.surface, borderRadius: theme.radii.lg, borderWidth: 1, borderColor: colors.border, padding: theme.spacing.md, marginTop: theme.spacing.md }, name: { color: colors.text, fontSize: 18, fontWeight: '800' }, meta: { color: colors.primary, fontSize: 14, fontWeight: '700', marginTop: 6 }, instructions: { color: colors.mutedText, fontSize: 13, lineHeight: 20, marginTop: 8, marginBottom: 12 } });

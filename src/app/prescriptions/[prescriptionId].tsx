import { useEffect, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector } from '@/hooks/app-hooks';
import { MedicineCard } from '@/features/prescriptions/components/MedicineCard';
import { getDoseKey, loadDoseStatuses, loadPrescriptions, markDoseTaken, setSelectedPrescription } from '@/features/prescriptions/prescriptionsSlice';
import { Skeleton } from '@/components/Skeleton';
import { theme } from '@/theme/theme';
import type { DosePeriod } from '@/types/prescription';

function todayKey() { const date = new Date(); return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-'); }

export default function PrescriptionDetailScreen() {
  const { prescriptionId } = useLocalSearchParams<{ prescriptionId: string }>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { prescriptions, loading, doseStatuses, doseLoading } = useAppSelector((state) => state.prescriptions);
  const prescription = prescriptions.find((item) => item.id === prescriptionId);
  const date = useMemo(todayKey, []);

  useEffect(() => { dispatch(setSelectedPrescription(prescriptionId ?? null)); if (!prescriptions.length) dispatch(loadPrescriptions()); dispatch(loadDoseStatuses()); }, [dispatch, prescriptionId, prescriptions.length]);

  if (loading && !prescription) return <SafeAreaView style={styles.safe}><View style={styles.loading}><Skeleton width="65%" height={30} /><Skeleton width="45%" height={18} /><Skeleton height={100} radius={18} /><Skeleton height={180} radius={18} /></View></SafeAreaView>;
  if (!prescription) return <SafeAreaView style={styles.safe}><View style={styles.center}><Text style={styles.errorTitle}>Prescription not found</Text><Text style={styles.errorText}>This prescription is unavailable or may have been removed.</Text><Pressable accessibilityRole="button" accessibilityLabel="Go back to prescriptions" onPress={() => router.back()} style={styles.back}><Text style={styles.backText}>Back to prescriptions</Text></Pressable></View></SafeAreaView>;

  const onDose = (medicineId: string, period: DosePeriod) => dispatch(markDoseTaken({ prescriptionId: prescription.id, medicineId, period, date }));
  const getKey = (medicineId: string, period: DosePeriod) => getDoseKey(prescription.id, medicineId, period, date);
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.content}><Text style={styles.title}>Prescription details</Text><View style={styles.summary}><Text style={styles.doctor}>{prescription.doctorName || 'Doctor not listed'}</Text><Text style={styles.specialty}>{prescription.doctorSpecialty || 'Specialty not listed'}</Text><Text style={styles.date}>Prescribed {new Date(`${prescription.date}T12:00:00`).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</Text><Text style={styles.diagnosis}>{prescription.diagnosis || 'Diagnosis not provided'}</Text></View><Text style={styles.sectionTitle}>Medicines</Text>{prescription.medicines.length ? prescription.medicines.map((medicine) => <MedicineCard key={medicine.id} medicine={medicine} prescriptionId={prescription.id} date={date} statuses={doseStatuses} loadingStatuses={doseLoading} getKey={getKey} onDose={onDose} />) : <Text style={styles.errorText}>No medicines were included in this prescription.</Text>}</ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: theme.colors.background }, content: { padding: 16, paddingBottom: 32 }, title: { color: theme.colors.text, fontSize: 28, fontWeight: '800' }, summary: { backgroundColor: theme.colors.surface, borderRadius: theme.radii.lg, borderWidth: 1, borderColor: theme.colors.border, padding: theme.spacing.lg, marginTop: theme.spacing.lg }, doctor: { color: theme.colors.text, fontSize: 19, fontWeight: '800' }, specialty: { color: theme.colors.primary, fontSize: 14, fontWeight: '700', marginTop: 5 }, date: { color: theme.colors.mutedText, fontSize: 13, marginTop: 16 }, diagnosis: { color: theme.colors.text, fontSize: 17, fontWeight: '700', marginTop: 10 }, sectionTitle: { color: theme.colors.text, fontSize: 21, fontWeight: '800', marginTop: 26 }, loading: { gap: 14, padding: 16 }, center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 28 }, errorTitle: { color: theme.colors.text, fontSize: 22, fontWeight: '800', textAlign: 'center' }, errorText: { color: theme.colors.mutedText, fontSize: 15, lineHeight: 22, textAlign: 'center', marginTop: 10 }, back: { minHeight: 44, justifyContent: 'center', marginTop: 18 }, backText: { color: theme.colors.primary, fontWeight: '800' } });
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector } from '@/hooks/app-hooks';
import { Skeleton } from '@/components/Skeleton';
import { BookingSuccess } from '@/features/booking/components/BookingSuccess';
import { BookingSummary } from '@/features/booking/components/BookingSummary';
import { DateSelector } from '@/features/booking/components/DateSelector';
import { SlotBottomSheet } from '@/features/booking/components/SlotBottomSheet';
import { clearBookingError, loadDoctors, loadSlots, setSelectedDate, setSelectedDoctor, setSelectedSlot, submitBooking } from '@/features/booking/bookingSlice';
import { theme } from '@/theme/theme';
import type { Slot } from '@/types/booking';

function toDateKey(date: Date) { return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-'); }
function upcomingDates() { return Array.from({ length: 7 }, (_, index) => { const date = new Date(); date.setHours(12, 0, 0, 0); date.setDate(date.getDate() + index); return toDateKey(date); }); }

export default function DoctorBookingScreen() {
  const { doctorId } = useLocalSearchParams<{ doctorId: string }>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const dates = useMemo(upcomingDates, []);
  const [sheetVisible, setSheetVisible] = useState(false);
  const { doctors, selectedDate, selectedSlotId, slots, loadingDoctors, loadingSlots, bookingStatus, booking, error } = useAppSelector((state) => state.booking);
  const doctor = doctors.find((item) => item.id === doctorId);
  const selectedSlot = slots.find((slot) => slot.id === selectedSlotId);
  const date = selectedDate ?? dates[0];

  useEffect(() => { if (!doctors.length) dispatch(loadDoctors()); }, [dispatch, doctors.length]);
  useEffect(() => { dispatch(setSelectedDoctor(doctorId ?? null)); dispatch(setSelectedDate(date)); }, [date, dispatch, doctorId]);
  useEffect(() => { if (doctorId && date) dispatch(loadSlots({ doctorId, date })); }, [date, dispatch, doctorId]);

  if (bookingStatus === 'confirmed' && booking) return <SafeAreaView style={styles.safe}><BookingSuccess booking={booking} onBookings={() => router.replace('/bookings')} onHome={() => router.replace('/')} /></SafeAreaView>;
  if (!doctor && loadingDoctors) return <SafeAreaView style={styles.safe}><View style={styles.loading}><Skeleton width="70%" height={30} /><Skeleton width="45%" height={20} /><Skeleton width="100%" height={54} /><Skeleton width="100%" height={54} /></View></SafeAreaView>;
  if (!doctor) return <SafeAreaView style={styles.safe}><View style={styles.center}><Text style={styles.title}>Doctor unavailable</Text><Text style={styles.subtitle}>Please return and choose another doctor.</Text></View></SafeAreaView>;

  const handleDate = (nextDate: string) => { dispatch(clearBookingError()); dispatch(setSelectedDate(nextDate)); setSheetVisible(false); };
  const handleSlot = (slot: Slot) => dispatch(setSelectedSlot(slot.id));
  const handleConfirm = () => { if (selectedSlot) dispatch(submitBooking({ doctor, slot: selectedSlot })); };
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.content}><Text style={styles.title}>{doctor.name}</Text><Text style={styles.subtitle}>{doctor.specialty} · INR {doctor.feeInr.toLocaleString('en-IN')} consultation</Text><Text style={styles.sectionTitle}>Select date</Text><DateSelector dates={dates} selectedDate={date} onSelect={handleDate} /><Text style={styles.sectionTitle}>Select time</Text><Pressable accessibilityRole="button" accessibilityLabel="Open available appointment times" onPress={() => setSheetVisible(true)} style={styles.timeButton}><Text style={styles.timeButtonText}>{selectedSlot ? new Date(selectedSlot.startsAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : loadingSlots ? 'Loading available slots...' : 'Choose an available time'}</Text><Text style={styles.chevron}>›</Text></Pressable>{selectedSlot && <View style={styles.selectedNote}><Text style={styles.selectedNoteText}>Selected appointment time</Text></View>}{selectedSlot && <BookingSummary doctor={doctor} date={date} slot={selectedSlot} loading={bookingStatus === 'pending'} onConfirm={handleConfirm} error={error} onRetry={handleConfirm} />}{!selectedSlot && error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}{!selectedSlot && !loadingSlots && !slots.length && <Text style={styles.empty}>No appointments available for this date. Try another date.</Text>}{loadingSlots && <View style={styles.loading}><Skeleton width="100%" height={52} /><Skeleton width="100%" height={52} /></View>}</ScrollView><SlotBottomSheet visible={sheetVisible} slots={slots} selectedSlotId={selectedSlotId} onSelect={handleSlot} onConfirm={() => setSheetVisible(false)} onClose={() => setSheetVisible(false)} /></SafeAreaView>;
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: theme.colors.background }, content: { padding: 20, paddingBottom: 40 }, title: { color: theme.colors.text, fontSize: 27, fontWeight: '800' }, subtitle: { color: theme.colors.mutedText, fontSize: 15, lineHeight: 22, marginTop: 8 }, sectionTitle: { color: theme.colors.text, fontSize: 19, fontWeight: '800', marginTop: 28, marginBottom: 12 }, timeButton: { minHeight: 54, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.surface, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, timeButtonText: { color: theme.colors.text, fontSize: 15, fontWeight: '700' }, chevron: { color: theme.colors.primary, fontSize: 28 }, selectedNote: { padding: 12, borderRadius: 12, backgroundColor: '#E5F4EF', marginTop: 12 }, selectedNoteText: { color: theme.colors.success, fontSize: 13, fontWeight: '700' }, error: { color: theme.colors.danger, fontSize: 14, lineHeight: 20, marginTop: 16 }, empty: { color: theme.colors.mutedText, fontSize: 15, lineHeight: 22, marginTop: 16 }, loading: { gap: 12, marginTop: 16, padding: 20 }, center: { flex: 1, padding: 24, justifyContent: 'center' } });

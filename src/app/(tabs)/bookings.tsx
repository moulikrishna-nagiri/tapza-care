import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import type { RelativePathString } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';

import { PlaceholderScreen, placeholderStyles } from '@/components/PlaceholderScreen';
import { useAppDispatch, useAppSelector } from '@/hooks/app-hooks';
import { loadBookings } from '@/features/booking/bookingSlice';
import { theme } from '@/theme/theme';

export default function BookingsScreen() {
  const router = useRouter(); const dispatch = useAppDispatch(); const bookings = useAppSelector((state) => state.booking.bookings);
  useEffect(() => { dispatch(loadBookings()); }, [dispatch]);
  return <PlaceholderScreen title="My Bookings" actionLabel="Book an Appointment" onAction={() => router.push('/booking' as RelativePathString)}>{!bookings.length && <Text style={placeholderStyles.heading}>No upcoming appointments</Text>}{bookings.map((booking) => <View key={booking.id} style={styles.booking}><Text style={styles.name}>{booking.doctor?.name ?? 'Doctor appointment'}</Text><Text style={styles.specialty}>{booking.doctor?.specialty}</Text><Text style={styles.date}>{new Date(`${booking.date}T12:00:00`).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</Text><Text style={styles.time}>{booking.slot ? new Date(booking.slot.startsAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : ''}</Text><Text style={styles.status}>Confirmed</Text></View>)}</PlaceholderScreen>;
}
const styles = StyleSheet.create({ booking: { backgroundColor: theme.colors.surface, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, padding: 16, marginTop: 20 }, name: { color: theme.colors.text, fontSize: 17, fontWeight: '800' }, specialty: { color: theme.colors.mutedText, marginTop: 4 }, date: { color: theme.colors.text, fontWeight: '700', marginTop: 16 }, time: { color: theme.colors.text, marginTop: 4 }, status: { color: theme.colors.success, fontWeight: '700', marginTop: 12 } });

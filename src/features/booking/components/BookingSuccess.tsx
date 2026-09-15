import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import type { Booking } from '@/types/booking';
import { theme } from '@/theme/theme';

type BookingSuccessProps = { booking: Booking; onBookings: () => void; onHome: () => void };

export function BookingSuccess({ booking, onBookings, onHome }: BookingSuccessProps) {
  const scale = useSharedValue(0); const opacity = useSharedValue(0);
  useEffect(() => { scale.value = withSpring(1); opacity.value = withTiming(1, { duration: 350 }); }, [opacity, scale]);
  const circleStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const contentStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const date = new Date(`${booking.date}T12:00:00`).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  const time = booking.slot ? new Date(booking.slot.startsAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '';
  return <View style={styles.container}><Animated.View style={[styles.circle, circleStyle]}><Text style={styles.check}>✓</Text></Animated.View><Animated.View style={contentStyle}><Text style={styles.title}>Appointment confirmed!</Text><Text style={styles.subtitle}>{booking.doctor?.name}</Text><Text style={styles.detail}>{date}</Text><Text style={styles.detail}>{time}</Text><Text style={styles.message}>Your appointment has been successfully booked.</Text><Pressable accessibilityRole="button" accessibilityLabel="View my bookings" onPress={onBookings} style={styles.primary}><Text style={styles.primaryText}>View my bookings</Text></Pressable><Pressable accessibilityRole="button" accessibilityLabel="Back to home" onPress={onHome} style={styles.secondary}><Text style={styles.secondaryText}>Back to home</Text></Pressable></Animated.View></View>;
}

const styles = StyleSheet.create({ container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: theme.spacing.xl }, circle: { width: 92, height: 92, borderRadius: 46, backgroundColor: theme.colors.success, justifyContent: 'center', alignItems: 'center', marginBottom: 24 }, check: { color: '#FFFFFF', fontSize: 48, fontWeight: '700' }, title: { color: theme.colors.text, fontSize: 25, fontWeight: '800', textAlign: 'center' }, subtitle: { color: theme.colors.text, fontSize: 18, fontWeight: '700', textAlign: 'center', marginTop: 24 }, detail: { color: theme.colors.mutedText, fontSize: 15, textAlign: 'center', marginTop: 6 }, message: { color: theme.colors.mutedText, fontSize: 15, lineHeight: 22, textAlign: 'center', marginTop: 24 }, primary: { minHeight: 50, borderRadius: 25, backgroundColor: theme.colors.primary, minWidth: 220, alignItems: 'center', justifyContent: 'center', marginTop: 28 }, primaryText: { color: '#FFFFFF', fontWeight: '700' }, secondary: { minHeight: 48, justifyContent: 'center', alignItems: 'center', marginTop: 8 }, secondaryText: { color: theme.colors.primary, fontWeight: '700' } });

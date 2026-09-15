import { Image } from 'expo-image';
import { memo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

import type { SectionConfig } from '@/types/config';
import type { Doctor } from '@/types/doctor';
import { theme } from '@/theme/theme';

type Props = { section: SectionConfig; scrollY: SharedValue<number>; onAction: (action?: string) => void };
const DoctorCard = memo(function DoctorCard({ doctor, onAction }: { doctor: Doctor; onAction: () => void }) { return <View style={styles.card}><Image source={doctor.photoUrl} contentFit="cover" style={styles.photo} accessibilityLabel={`Photo of ${doctor.name}`} /><Text style={styles.name}>{doctor.name}</Text><Text style={styles.specialty}>{doctor.specialty}</Text><Text style={styles.available}>{doctor.nextAvailableAt ? `Next: ${doctor.nextAvailableAt}` : 'Availability to be confirmed'}</Text><View style={styles.row}><Text style={styles.fee}>INR {doctor.feeInr.toLocaleString('en-IN')}</Text><Pressable accessibilityRole="button" accessibilityLabel={`Book appointment with ${doctor.name}`} onPress={onAction} style={styles.button}><Text style={styles.buttonText}>Book</Text></Pressable></View></View> });
export function DoctorCarousel({ section, onAction }: Props) { const doctors = section.items as Doctor[]; if (!doctors.length) return <Text style={styles.empty}>No doctors available right now.</Text>; return <FlatList data={doctors} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(item) => item.id} renderItem={({ item }) => <DoctorCard doctor={item} onAction={onAction} />} contentContainerStyle={styles.list} />; }
const styles = StyleSheet.create({ list: { gap: 12 }, card: { width: 248, padding: 12, borderRadius: 20, backgroundColor: theme.colors.surface }, photo: { width: '100%', height: 150, borderRadius: 14 }, name: { color: theme.colors.text, fontSize: 17, fontWeight: '700', marginTop: 12 }, specialty: { color: theme.colors.mutedText, fontSize: 13, marginTop: 4 }, available: { color: theme.colors.success, fontSize: 12, fontWeight: '600', marginTop: 12 }, row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }, fee: { color: theme.colors.text, fontSize: 14, fontWeight: '800' }, button: { minHeight: 40, paddingHorizontal: 13, borderRadius: 20, backgroundColor: theme.colors.primary, justifyContent: 'center' }, buttonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' }, empty: { color: theme.colors.mutedText, fontSize: 14 } });

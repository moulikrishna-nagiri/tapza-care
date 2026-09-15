import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

import type { OfferItem, SectionConfig } from '@/types/config';

type Props = { section: SectionConfig; scrollY: SharedValue<number>; onAction: (action?: string) => void };
export function OfferStrip({ section, onAction }: Props) { const item = section.items[0] as OfferItem | undefined; if (!item) return null; return <View style={styles.container}><View style={styles.copy}><Text style={styles.badge}>{item.badge}</Text><Text style={styles.title}>{item.title}</Text><Text style={styles.subtitle}>{item.subtitle}</Text></View><Pressable accessibilityRole="button" accessibilityLabel={item.ctaLabel} onPress={() => onAction()} style={styles.button}><Text style={styles.buttonText}>{item.ctaLabel}</Text></Pressable></View>; }
const styles = StyleSheet.create({ container: { borderRadius: 20, padding: 20, backgroundColor: '#176B87', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }, copy: { flex: 1 }, badge: { color: '#A8E7DE', fontSize: 11, fontWeight: '800', letterSpacing: 1 }, title: { color: '#FFFFFF', fontSize: 18, lineHeight: 23, fontWeight: '800', marginTop: 6 }, subtitle: { color: '#D8EFEC', fontSize: 12, lineHeight: 18, marginTop: 5 }, button: { minHeight: 44, borderRadius: 22, backgroundColor: '#FFFFFF', justifyContent: 'center', paddingHorizontal: 14 }, buttonText: { color: '#176B87', fontWeight: '700', fontSize: 12 } });

import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

import type { SectionConfig, ServiceItem } from '@/types/config';
import { theme } from '@/theme/theme';

type Props = { section: SectionConfig; scrollY: SharedValue<number>; onAction: (action?: string) => void };
export function ServiceGrid({ section, onAction }: Props) {
  const items = section.items as ServiceItem[];
  if (!items.length) return <Text style={styles.empty}>No services available right now.</Text>;
  return <View style={styles.grid}>{items.map((item) => <View key={item.id} style={styles.card}><View><Image source={item.imageUrl} contentFit="cover" style={styles.image} accessibilityLabel={item.name} />{item.badge && <Text style={styles.badge}>{item.badge}</Text>}</View><Text style={styles.name}>{item.name}</Text><Text style={styles.description}>{item.description}</Text><View style={styles.footer}><Text style={styles.price}>INR {item.priceInr.toLocaleString('en-IN')}</Text><Pressable accessibilityRole="button" accessibilityLabel={`Book ${item.name}`} onPress={() => onAction()} style={styles.button}><Text style={styles.buttonText}>Book</Text></Pressable></View></View>)}</View>;
}
const styles = StyleSheet.create({ grid: { flexDirection: 'row', gap: 12 }, card: { flex: 1, minWidth: 0, backgroundColor: theme.colors.surface, borderRadius: 18, padding: 10 }, image: { height: 112, borderRadius: 13 }, badge: { position: 'absolute', top: 8, left: 8, color: theme.colors.primary, backgroundColor: '#FFFFFF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, fontSize: 11, fontWeight: '700' }, name: { color: theme.colors.text, fontWeight: '700', fontSize: 16, marginTop: 12 }, description: { color: theme.colors.mutedText, fontSize: 12, marginTop: 4 }, footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }, price: { color: theme.colors.text, fontSize: 14, fontWeight: '800' }, button: { minHeight: 40, paddingHorizontal: 12, borderRadius: 20, backgroundColor: theme.colors.primary, justifyContent: 'center' }, buttonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' }, empty: { color: theme.colors.mutedText, fontSize: 14 } });

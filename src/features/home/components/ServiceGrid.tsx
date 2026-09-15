import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

import type { SectionConfig, ServiceItem } from '@/types/config';
import { theme } from '@/theme/theme';
import { useAppTheme } from '@/theme/app-theme';

type Props = { section: SectionConfig; scrollY: SharedValue<number>; onAction: (action?: string) => void };
export function ServiceGrid({ section, onAction }: Props) {
  const { theme: appTheme } = useAppTheme();
  const styles = createStyles(appTheme.colors);
  const items = section.items as ServiceItem[];
  if (!items.length) return <Text style={styles.empty}>No services available right now.</Text>;
  return <View style={styles.grid}>{items.map((item) => <View key={item.id} style={styles.card}><View><Image source={item.imageUrl} contentFit="cover" style={styles.image} accessibilityLabel={item.name} />{item.badge && <Text style={styles.badge}>{item.badge}</Text>}</View><Text style={styles.name}>{item.name}</Text><Text style={styles.description}>{item.description}</Text><View style={styles.footer}><Text style={styles.price}>INR {item.priceInr.toLocaleString('en-IN')}</Text><Pressable accessibilityRole="button" accessibilityLabel={`Book ${item.name}`} onPress={() => onAction()} style={styles.button}><Text style={styles.buttonText}>Book</Text></Pressable></View></View>)}</View>;
}
const createStyles = (colors: typeof theme.colors) => StyleSheet.create({ grid: { flexDirection: 'row', gap: 12 }, card: { flex: 1, minWidth: 0, backgroundColor: colors.surface, borderRadius: 18, padding: 10 }, image: { height: 112, borderRadius: 13 }, badge: { position: 'absolute', top: 8, left: 8, color: colors.primary, backgroundColor: colors.surface, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, fontSize: 11, fontWeight: '700' }, name: { color: colors.text, fontWeight: '700', fontSize: 16, marginTop: 12 }, description: { color: colors.mutedText, fontSize: 12, lineHeight: 18, marginTop: 4 }, footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }, price: { color: colors.text, fontSize: 14, fontWeight: '800' }, button: { minHeight: 44, paddingHorizontal: 12, borderRadius: 22, backgroundColor: colors.primary, justifyContent: 'center' }, buttonText: { color: colors.onPrimary, fontSize: 12, fontWeight: '700' }, empty: { color: colors.mutedText, fontSize: 14, lineHeight: 20 } });

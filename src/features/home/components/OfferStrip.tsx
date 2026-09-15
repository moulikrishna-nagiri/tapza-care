import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

import type { OfferItem, SectionConfig } from '@/types/config';
import { useAppTheme } from '@/theme/app-theme';
import { theme } from '@/theme/theme';

type Props = { section: SectionConfig; scrollY: SharedValue<number>; onAction: (action?: string) => void };
export function OfferStrip({ section, onAction }: Props) { const { theme: appTheme } = useAppTheme(); const styles = createStyles(appTheme.colors); const item = section.items[0] as OfferItem | undefined; if (!item) return null; return <View style={styles.container}><View style={styles.copy}><Text style={styles.badge}>{item.badge}</Text><Text style={styles.title}>{item.title}</Text><Text style={styles.subtitle}>{item.subtitle}</Text></View><Pressable accessibilityRole="button" accessibilityLabel={item.ctaLabel} onPress={() => onAction()} style={styles.button}><Text style={styles.buttonText}>{item.ctaLabel}</Text></Pressable></View>; }
const createStyles = (colors: typeof theme.colors) => StyleSheet.create({ container: { borderRadius: 20, padding: 20, backgroundColor: colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }, copy: { flex: 1 }, badge: { color: colors.secondary, fontSize: 11, fontWeight: '800', letterSpacing: 1 }, title: { color: colors.onPrimary, fontSize: 18, lineHeight: 23, fontWeight: '800', marginTop: 6 }, subtitle: { color: colors.onPrimary, fontSize: 12, lineHeight: 18, marginTop: 5 }, button: { minHeight: 44, borderRadius: 22, backgroundColor: colors.surface, justifyContent: 'center', paddingHorizontal: 14 }, buttonText: { color: colors.primary, fontWeight: '700', fontSize: 12 } });

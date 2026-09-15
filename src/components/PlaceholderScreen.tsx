import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '@/theme/theme';

type PlaceholderScreenProps = {
  title: string;
  children: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
};

export function PlaceholderScreen({ title, children, actionLabel, onAction }: PlaceholderScreenProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {children}
        {actionLabel && onAction && (
          <Pressable accessibilityRole="button" accessibilityLabel={actionLabel} onPress={onAction} style={styles.button}>
            <Text style={styles.buttonText}>{actionLabel}</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

export const placeholderStyles = StyleSheet.create({
  heading: { color: theme.colors.text, fontSize: 20, fontWeight: '700', marginTop: 40 },
  body: { color: theme.colors.mutedText, fontSize: 16, lineHeight: 24, marginTop: 10 },
  item: { color: theme.colors.text, fontSize: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  content: { flex: 1, padding: 24 },
  title: { color: theme.colors.text, fontSize: 30, fontWeight: '800' },
  button: { minHeight: 48, alignSelf: 'flex-start', justifyContent: 'center', borderRadius: 24, backgroundColor: theme.colors.primary, paddingHorizontal: 22, marginTop: 32 },
  buttonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});

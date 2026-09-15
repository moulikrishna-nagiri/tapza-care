import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { Slot } from '@/types/booking';
import { SlotGrid } from './SlotGrid';
import { theme } from '@/theme/theme';
import { useAppTheme } from '@/theme/app-theme';

type SlotBottomSheetProps = { visible: boolean; slots: Slot[]; selectedSlotId: string | null; onSelect: (slot: Slot) => void; onConfirm: () => void; onClose: () => void };

export function SlotBottomSheet({ visible, slots, selectedSlotId, onSelect, onConfirm, onClose }: SlotBottomSheetProps) {
  const { theme: appTheme } = useAppTheme();
  const styles = createStyles(appTheme.colors);
  const insets = useSafeAreaInsets();
  const offset = useSharedValue(700);
  const startOffset = useSharedValue(700);
  useEffect(() => { offset.value = visible ? withTiming(0, { duration: 260, easing: Easing.out(Easing.cubic) }) : withTiming(700, { duration: 220, easing: Easing.in(Easing.cubic) }); }, [offset, visible]);
  const gesture = Gesture.Pan().onStart(() => { startOffset.value = offset.value; }).onUpdate((event) => { offset.value = Math.max(0, startOffset.value + event.translationY); }).onEnd((event) => { if (event.translationY > 120) { offset.value = withTiming(700, { duration: 180, easing: Easing.in(Easing.cubic) }, (finished) => { if (finished) runOnJS(onClose)(); }); } else { offset.value = withTiming(0, { duration: 180, easing: Easing.out(Easing.cubic) }); } });
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: offset.value }] }));
  if (!visible) return null;
  return <View pointerEvents="box-none" style={StyleSheet.absoluteFill}><Pressable accessibilityLabel="Close time selection" accessibilityRole="button" onPress={onClose} style={styles.scrim} /><GestureDetector gesture={gesture}><Animated.View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }, animatedStyle]}><View style={styles.handle} /><Text style={styles.title}>Available time slots</Text><SlotGrid slots={slots} selectedSlotId={selectedSlotId} onSelect={onSelect} /><Pressable disabled={!selectedSlotId} accessibilityRole="button" accessibilityLabel="Confirm selected time" onPress={onConfirm} style={[styles.confirm, !selectedSlotId && styles.disabled]}><Text style={styles.confirmText}>Confirm time</Text></Pressable></Animated.View></GestureDetector></View>;
  return <View pointerEvents="box-none" style={StyleSheet.absoluteFill}><Pressable accessibilityLabel="Close time selection" accessibilityRole="button" onPress={onClose} style={styles.scrim} /><GestureDetector gesture={gesture}><Animated.View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }, animatedStyle]}><View style={styles.handle} /><Text style={styles.title}>Available time slots</Text><SlotGrid slots={slots} selectedSlotId={selectedSlotId} onSelect={onSelect} /><Pressable disabled={!selectedSlotId} accessibilityRole="button" accessibilityLabel={selectedSlotId ? 'Confirm selected time' : 'Select a time before confirming'} accessibilityState={{ disabled: !selectedSlotId }} onPress={onConfirm} style={[styles.confirm, !selectedSlotId && styles.disabled]}><Text style={styles.confirmText}>Confirm time</Text></Pressable></Animated.View></GestureDetector></View>;
}

const createStyles = (colors: typeof theme.colors) => StyleSheet.create({ scrim: { ...StyleSheet.absoluteFill, backgroundColor: colors.overlay }, sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: colors.background, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 20, elevation: 14 }, handle: { width: 44, height: 5, borderRadius: 3, backgroundColor: colors.border, alignSelf: 'center', marginBottom: 18 }, title: { color: colors.text, fontSize: 21, fontWeight: '800', marginBottom: 16 }, confirm: { minHeight: 50, borderRadius: 25, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginTop: 20 }, disabled: { opacity: 0.45 }, confirmText: { color: colors.onPrimary, fontWeight: '700', fontSize: 15 } });

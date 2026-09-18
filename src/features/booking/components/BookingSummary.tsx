import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";
import { theme } from "@/theme/theme";
import type { Slot } from "@/types/booking";
import type { Doctor } from "@/types/doctor";

type BookingSummaryProps = {
  doctor: Doctor;
  date: string;
  slot: Slot;
  loading: boolean;
  onConfirm: () => void;
  onRetry?: () => void;
  error?: string | null;
};

export function BookingSummary({
  doctor,
  date,
  slot,
  loading,
  onConfirm,
  onRetry,
  error,
}: BookingSummaryProps) {
  const { theme: appTheme } = useAppTheme();
  const styles = createStyles(appTheme.colors);
  const formattedDate = new Date(`${date}T12:00:00`).toLocaleDateString(
    "en-US",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" },
  );
  const formattedTime = new Date(slot.startsAt).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Appointment summary</Text>
      <Text style={styles.name}>{doctor.name}</Text>
      <Text style={styles.specialty}>{doctor.specialty}</Text>
      <View style={styles.divider} />
      <Text style={styles.label}>Date and time</Text>
      <Text style={styles.value}>{formattedDate}</Text>
      <Text style={styles.value}>{formattedTime}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Consultation</Text>
        <Text style={styles.fee}>
          INR {doctor.feeInr.toLocaleString("en-IN")}
        </Text>
      </View>
      {error && (
        <View>
          <Text accessibilityRole="alert" style={styles.error}>
            {error}
          </Text>
          {onRetry && (
            <Pressable
              onPress={onRetry}
              accessibilityRole="button"
              accessibilityLabel="Try booking again"
              style={styles.retry}
            >
              <Text style={styles.retryText}>Try again</Text>
            </Pressable>
          )}
        </View>
      )}
      <Pressable
        disabled={loading}
        accessibilityRole="button"
        accessibilityLabel="Confirm appointment"
        onPress={onConfirm}
        style={[styles.confirm, loading && styles.disabled]}
      >
        <Text style={styles.confirmText}>
          {loading ? "Confirming appointment..." : "Confirm appointment"}
        </Text>
      </Pressable>
    </View>
  );
}

const createStyles = (colors: typeof theme.colors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: theme.radii.lg,
      padding: theme.spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },
    title: {
      color: colors.text,
      fontSize: 19,
      fontWeight: "800",
      marginBottom: 20,
    },
    name: { color: colors.text, fontSize: 17, fontWeight: "700" },
    specialty: { color: colors.mutedText, marginTop: 4 },
    divider: { height: 1, backgroundColor: colors.border, marginVertical: 18 },
    label: { color: colors.mutedText, fontSize: 12, fontWeight: "600" },
    value: {
      color: colors.text,
      fontSize: 15,
      fontWeight: "700",
      marginTop: 5,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 18,
    },
    fee: { color: colors.text, fontSize: 16, fontWeight: "800" },
    confirm: {
      minHeight: 50,
      borderRadius: 25,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 24,
    },
    disabled: { opacity: 0.6 },
    confirmText: { color: colors.onPrimary, fontSize: 15, fontWeight: "700" },
    error: {
      color: colors.danger,
      fontSize: 14,
      lineHeight: 20,
      marginTop: 18,
    },
    retry: { minHeight: 44, alignSelf: "flex-start", justifyContent: "center" },
    retryText: { color: colors.primary, fontWeight: "700" },
  });

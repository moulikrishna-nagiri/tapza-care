import { useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import {
    FlatList,
    Pressable,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Skeleton } from "@/components/Skeleton";
import { PrescriptionCard } from "@/features/prescriptions/components/PrescriptionCard";
import {
    loadDoseStatuses,
    loadPrescriptions,
} from "@/features/prescriptions/prescriptionsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/app-hooks";
import { theme } from "@/theme/theme";

export default function PrescriptionsScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { prescriptions, loading, error } = useAppSelector(
    (state) => state.prescriptions,
  );
  const reload = useCallback(() => {
    dispatch(loadPrescriptions());
    dispatch(loadDoseStatuses());
  }, [dispatch]);
  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={prescriptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PrescriptionCard
            prescription={item}
            onPress={() =>
              router.push({
                pathname: "/prescriptions/[prescriptionId]",
                params: { prescriptionId: item.id },
              })
            }
          />
        )}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={reload} />
        }
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Prescriptions</Text>
            <Text style={styles.subtitle}>
              Keep track of your medicines and daily doses.
            </Text>
            {error && prescriptions.length > 0 && (
              <View style={styles.errorBanner}>
                <Text accessibilityRole="alert" style={styles.errorText}>
                  {error}
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Retry loading prescriptions"
                  onPress={reload}
                  style={styles.retry}
                >
                  <Text style={styles.retryText}>Try again</Text>
                </Pressable>
              </View>
            )}
            {loading && !prescriptions.length && (
              <View style={styles.skeleton}>
                <Skeleton height={154} radius={20} />
                <Skeleton height={154} radius={20} />
              </View>
            )}
            {!loading && !prescriptions.length && (
              <View style={styles.empty}>
                <Text style={styles.emptyTitle}>
                  {error
                    ? "We could not load prescriptions"
                    : "No prescriptions yet"}
                </Text>
                <Text style={styles.emptyText}>
                  {error ??
                    "Your prescriptions will appear here after a consultation."}
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Retry loading prescriptions"
                  onPress={reload}
                  style={styles.retry}
                >
                  <Text style={styles.retryText}>Try again</Text>
                </Pressable>
              </View>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 16, paddingBottom: 32 },
  title: { color: theme.colors.text, fontSize: 30, fontWeight: "800" },
  subtitle: {
    color: theme.colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 22,
  },
  skeleton: { gap: 14 },
  errorBanner: {
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    padding: 12,
    marginBottom: 16,
  },
  errorText: { color: theme.colors.danger, fontSize: 13, lineHeight: 19 },
  empty: { alignItems: "center", paddingVertical: 56 },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  emptyText: {
    color: theme.colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 10,
  },
  retry: { minHeight: 44, justifyContent: "center", marginTop: 12 },
  retryText: { color: theme.colors.primary, fontWeight: "800" },
});

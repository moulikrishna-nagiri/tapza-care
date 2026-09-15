import { useFocusEffect, useRouter } from "expo-router";
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
import { loadDoctors, resetBookingFlow } from "@/features/booking/bookingSlice";
import { DoctorCard } from "@/features/booking/components/DoctorCard";
import { useAppDispatch, useAppSelector } from "@/hooks/app-hooks";
import { theme } from "@/theme/theme";

export default function DoctorSelectionScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { doctors, loadingDoctors, error } = useAppSelector(
    (state) => state.booking,
  );
  useFocusEffect(
    useCallback(() => {
      dispatch(resetBookingFlow());
    }, [dispatch]),
  );
  useEffect(() => {
    if (!doctors.length) dispatch(loadDoctors());
  }, [dispatch, doctors.length]);

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={doctors}
        keyExtractor={(doctor) => doctor.id}
        renderItem={({ item }) => (
          <DoctorCard
            doctor={item}
            onPress={() =>
              router.push({
                pathname: "/booking/[doctorId]",
                params: { doctorId: item.id },
              })
            }
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={loadingDoctors}
            onRefresh={() => dispatch(loadDoctors())}
          />
        }
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Book an appointment</Text>
            <Text style={styles.subtitle}>Find the right doctor for you.</Text>
            {error && doctors.length > 0 && (
              <View style={styles.errorBanner}>
                <Text accessibilityRole="alert" style={styles.errorText}>
                  {error}
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Retry loading doctors"
                  onPress={() => dispatch(loadDoctors())}
                  style={styles.retry}
                >
                  <Text style={styles.retryText}>Try again</Text>
                </Pressable>
              </View>
            )}
            {loadingDoctors && !doctors.length && (
              <View style={styles.skeleton}>
                <Skeleton height={150} radius={16} />
                <Skeleton height={150} radius={16} />
              </View>
            )}
            {!loadingDoctors && !doctors.length && (
              <View>
                <Text style={styles.empty}>
                  {error ?? "No doctors are available right now."}
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Retry loading doctors"
                  onPress={() => dispatch(loadDoctors())}
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
  title: { color: theme.colors.text, fontSize: 28, fontWeight: "800" },
  subtitle: {
    color: theme.colors.mutedText,
    fontSize: 16,
    marginTop: 8,
    marginBottom: 22,
  },
  skeleton: { gap: 14 },
  empty: {
    color: theme.colors.mutedText,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 24,
  },
  errorBanner: {
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    padding: 12,
    marginBottom: 16,
  },
  errorText: { color: theme.colors.danger, fontSize: 13, lineHeight: 19 },
  retry: {
    minHeight: 44,
    alignSelf: "flex-start",
    justifyContent: "center",
    marginTop: 12,
  },
  retryText: { color: theme.colors.primary, fontWeight: "700" },
});

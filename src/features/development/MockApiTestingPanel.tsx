import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
    loadMockSettings,
    mockSettings,
    resetMockSettings,
    setMockBookingConflict,
    setMockEmptyResponses,
    setMockNetworkMode,
    type MockNetworkMode,
} from "@/services/mock/mockApi";
import { theme } from "@/theme/theme";
import { useAppTheme, type AppThemeMode } from "@/theme/app-theme";

type EmptySetting = "emptyDoctors" | "emptySlots" | "emptyPrescriptions";

export function MockApiTestingPanel() {
  const { theme: appTheme, setMode } = useAppTheme();
  const styles = createStyles(appTheme.colors);
  const [settings, setSettings] = useState(() => ({ ...mockSettings }));
  useEffect(() => {
    void loadMockSettings().then(() => setSettings({ ...mockSettings }));
  }, []);
  const sync = () => setSettings({ ...mockSettings });
  const updateNetwork = (mode: MockNetworkMode) => {
    setMockNetworkMode(mode);
    sync();
  };
  const updateEmpty = (setting: EmptySetting) => {
    setMockEmptyResponses({ [setting]: !mockSettings[setting] });
    sync();
  };
  const updateConflict = () => {
    setMockBookingConflict(!mockSettings.bookingConflict);
    sync();
  };
  const reset = () => {
    resetMockSettings();
    sync();
  };

  return (
    <View style={[styles.container, { backgroundColor: appTheme.colors.surface, borderColor: appTheme.colors.border }]}>
      <Text style={styles.title}>Test Tools</Text>
      <Text style={styles.subtitle}>
        Use these controls to simulate API/network conditions.
      </Text>
      <Text style={styles.label}>Network mode</Text>
      <View style={styles.row}>
        {(["normal", "slow", "failed"] as MockNetworkMode[]).map((mode) => (
          <ToggleButton
            key={mode}
            label={mode}
            active={settings.networkMode === mode}
            onPress={() => updateNetwork(mode)}
          />
        ))}
      </View>
      <Text style={styles.label}>Empty responses</Text>
      <SettingRow
        label="Doctors"
        active={settings.emptyDoctors}
        onPress={() => updateEmpty("emptyDoctors")}
      />
      <SettingRow
        label="Slots"
        active={settings.emptySlots}
        onPress={() => updateEmpty("emptySlots")}
      />
      <SettingRow
        label="Prescriptions"
        active={settings.emptyPrescriptions}
        onPress={() => updateEmpty("emptyPrescriptions")}
      />
      <Text style={styles.label}>Booking conflict</Text>
      <SettingRow
        label="409 Conflict"
        active={settings.bookingConflict}
        onPress={updateConflict}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Reset mock API settings"
        onPress={reset}
        style={styles.reset}
      >
        <Text style={styles.resetText}>Reset all</Text>
      </Pressable>
      <Text style={[styles.label, { color: appTheme.colors.text }]}>App appearance</Text>
      <View style={styles.row}>{(['normal', 'festival', 'dark'] as AppThemeMode[]).map((mode) => <Pressable key={mode} accessibilityRole="radio" accessibilityState={{ selected: appTheme.mode === mode }} accessibilityLabel={`Use ${mode} appearance`} onPress={() => setMode(mode)} style={[styles.toggle, appTheme.mode === mode && { backgroundColor: appTheme.colors.primary, borderColor: appTheme.colors.primary }]}><Text style={[styles.toggleText, appTheme.mode === mode && styles.activeText]}>{mode}</Text></Pressable>)}</View>
    </View>
  );
}

function ToggleButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const { theme: appTheme } = useAppTheme();
  const styles = createStyles(appTheme.colors);
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected: active }}
      accessibilityLabel={`Set network mode to ${label}`}
      onPress={onPress}
      style={[styles.toggle, active && styles.active]}
    >
      <Text style={[styles.toggleText, active && styles.activeText]}>
        {label}
      </Text>
    </Pressable>
  );
}

function SettingRow({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const { theme: appTheme } = useAppTheme();
  const styles = createStyles(appTheme.colors);
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: active }}
      accessibilityLabel={`${label} ${active ? "on" : "off"}`}
      onPress={onPress}
      style={styles.settingRow}
    >
      <Text style={styles.settingLabel}>{label}</Text>
      <View style={[styles.switch, active && styles.activeSwitch]}>
        <Text style={[styles.switchText, active && styles.activeText]}>
          {active ? "ON" : "OFF"}
        </Text>
      </View>
    </Pressable>
  );
}

const createStyles = (colors: typeof theme.colors) => StyleSheet.create({
  container: {
    marginTop: 28,
    padding: theme.spacing.md,
    borderRadius: theme.radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: { color: colors.text, fontSize: 19, fontWeight: "800" },
  subtitle: { color: colors.mutedText, fontSize: 13, lineHeight: 19, marginTop: 4 },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 22,
    marginBottom: 8,
  },
  row: { flexDirection: "row", gap: 8 },
  toggle: {
    minHeight: 44,
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  toggleText: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  activeText: { color: "#FFFFFF" },
  settingRow: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLabel: { color: colors.text, fontSize: 15 },
  switch: {
    minWidth: 58,
    minHeight: 32,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  activeSwitch: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  switchText: {
    color: colors.mutedText,
    fontSize: 11,
    fontWeight: "800",
  },
  reset: {
    minHeight: 48,
    borderRadius: 24,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  resetText: { color: colors.text, fontSize: 14, fontWeight: "800" },
});

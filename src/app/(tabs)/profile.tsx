import { Text } from "react-native";

import {
    PlaceholderScreen,
    placeholderStyles,
} from "@/components/PlaceholderScreen";
import { MockApiTestingPanel } from "@/features/development/MockApiTestingPanel";
import { useAppTheme } from "@/theme/app-theme";

export default function ProfileScreen() {
  const { theme } = useAppTheme();
  return (
    <PlaceholderScreen title="Profile">
      <Text style={[placeholderStyles.heading, { color: theme.colors.text }]}>Patient Profile</Text>
      <Text style={[placeholderStyles.item, { color: theme.colors.text, borderBottomColor: theme.colors.border }]}>My Details</Text>
      <Text style={[placeholderStyles.item, { color: theme.colors.text, borderBottomColor: theme.colors.border }]}>Settings</Text>
      <Text style={[placeholderStyles.item, { color: theme.colors.text, borderBottomColor: theme.colors.border }]}>Help &amp; Support</Text>
      <MockApiTestingPanel />
    </PlaceholderScreen>
  );
}

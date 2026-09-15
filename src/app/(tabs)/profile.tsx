import { Text } from "react-native";

import {
    PlaceholderScreen,
    placeholderStyles,
} from "@/components/PlaceholderScreen";
import { MockApiTestingPanel } from "@/features/development/MockApiTestingPanel";

export default function ProfileScreen() {
  return (
    <PlaceholderScreen title="Profile">
      <Text style={placeholderStyles.heading}>Patient Profile</Text>
      <Text style={placeholderStyles.item}>My Details</Text>
      <Text style={placeholderStyles.item}>Settings</Text>
      <Text style={placeholderStyles.item}>Help &amp; Support</Text>
      <MockApiTestingPanel />
    </PlaceholderScreen>
  );
}

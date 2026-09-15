import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { PlaceholderScreen, placeholderStyles } from '@/components/PlaceholderScreen';

export default function PrescriptionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <PlaceholderScreen title="Prescription">
      <Text style={placeholderStyles.body}>Prescription details placeholder for {id}.</Text>
    </PlaceholderScreen>
  );
}

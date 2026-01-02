import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';

// Import the actual tracker screen component
import SymptomTrackerScreen from '../tracker';

export default function TrackerTab() {
  // Load the Inter font
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Render the symptom tracker screen
  return <SymptomTrackerScreen />;
}

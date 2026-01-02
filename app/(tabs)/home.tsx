import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';

// Import the actual home screen component
import HomeDashboardScreen from '../home';

export default function HomeTab() {
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

  // Render the home dashboard screen
  return <HomeDashboardScreen />;
}

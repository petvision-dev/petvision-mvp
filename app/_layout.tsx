import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Platform, Text } from 'react-native';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';

import { ThemeProvider } from '@/components/ThemeProvider';
import { useColorScheme } from '@/components/useColorScheme';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  console.error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY');
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Load ALL fonts in one place
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_800ExtraBold,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) {
      console.error('Font loading error:', error);
      // On web, we should still render even if fonts fail
      SplashScreen.hideAsync();
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // On web, don't block rendering - fonts will load async
  if (Platform.OS === 'web') {
    // Always render on web to avoid blank page
    return <RootLayoutNav fontsLoaded={loaded} />;
  }

  // Show loading indicator while fonts load (native only)
  if (!loaded && !error) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0df2a6" />
      </View>
    );
  }

  return <RootLayoutNav fontsLoaded={loaded} />;
}

function RootLayoutNav({ fontsLoaded }: { fontsLoaded: boolean }) {
  const colorScheme = useColorScheme();

  // Don't render if no publishable key
  if (!publishableKey) {
    return (
      <ThemeProvider>
        <View style={styles.loadingContainer}>
          <Text style={{ color: '#fff', textAlign: 'center', padding: 20 }}>
            Missing Clerk Publishable Key. Please check environment variables.
          </Text>
        </View>
      </ThemeProvider>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ClerkLoaded>
        <ThemeProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding/pet-profile" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#10221c',
  },
});

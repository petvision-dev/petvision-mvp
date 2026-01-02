import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { MaterialIcons } from '@expo/vector-icons';

export default function CameraScreen() {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="close" size={24} color={theme.textMain} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textMain }]}>
          AI Health Analysis
        </Text>
        <View style={{ width: 40 }} />
      </View>
      
      <View style={styles.content}>
        <View style={[styles.cameraPlaceholder, { backgroundColor: isDark ? '#162b24' : '#e6f7f2' }]}>
          <MaterialIcons name="photo-camera" size={64} color={theme.primary} />
          <Text style={[styles.placeholderText, { color: theme.textMain }]}>
            Camera functionality will be implemented in the next phase
          </Text>
        </View>
        
        <View style={styles.instructions}>
          <View style={[styles.instructionCard, { backgroundColor: theme.surface }]}>
            <MaterialIcons name="info" size={24} color={theme.primary} style={styles.instructionIcon} />
            <Text style={[styles.instructionText, { color: theme.textMain }]}>
              This screen will use the device camera to analyze your pet's health conditions using AI.
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={() => router.back()}
          >
            <Text style={[styles.buttonText, { color: isDark ? theme.background : '#0d1c17' }]}>
              Return to Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  cameraPlaceholder: {
    flex: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    padding: 24,
  },
  placeholderText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
    marginTop: 16,
    maxWidth: 280,
  },
  instructions: {
    gap: 24,
  },
  instructionCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  instructionIcon: {
    marginRight: 16,
  },
  instructionText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    flex: 1,
    lineHeight: 20,
  },
  button: {
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
});

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { MaterialIcons } from '@expo/vector-icons';

// Pet species options
const SPECIES_OPTIONS = [
  { id: 'dog', label: 'Dog', emoji: '🐕' },
  { id: 'cat', label: 'Cat', emoji: '🐈' },
  { id: 'other', label: 'Other', emoji: '🐾' },
];

export default function PetProfileSetupScreen() {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  
  // State for form fields
  const [petName, setPetName] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('dog');
  const [breed, setBreed] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  
  // Load the Inter font
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  
  // Handle photo selection
  const handleSelectPhoto = () => {
    // This will be implemented with expo-image-picker
    console.log('Select photo');
  };
  
  // Handle save and continue
  const handleSaveProfile = () => {
    // Save profile data and navigate to next screen
    router.push('/home');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back-ios-new" size={24} color={theme.textMain} />
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: theme.textMain }]}>
          Pet Profile Setup
        </Text>
        
        <View style={{ width: 40 }} />
      </View>
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressText, { color: theme.textMain }]}>Step 1 of 3</Text>
          <Text style={[styles.progressPercentage, { color: theme.primary }]}>33%</Text>
        </View>
        
        <View style={[styles.progressBar, { backgroundColor: isDark ? '#1f3830' : '#cee8e0' }]}>
          <View 
            style={[styles.progressFill, { backgroundColor: theme.primary, width: '33%' }]} 
          />
        </View>
      </View>
      
      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Headline */}
        <View style={styles.headlineContainer}>
          <Text style={[styles.headline, { color: theme.textMain }]}>
            Let's meet your pet
          </Text>
          <Text style={[styles.subheadline, { color: theme.textSecondary }]}>
            Create a profile to start monitoring their health.
          </Text>
        </View>
        
        {/* Photo Upload */}
        <View style={styles.photoSection}>
          <TouchableOpacity 
            style={[styles.photoUpload, { 
              backgroundColor: theme.surface,
              borderColor: `${theme.primary}40`
            }]}
            onPress={handleSelectPhoto}
          >
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.petPhoto} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <View style={[styles.photoIconContainer, { backgroundColor: `${theme.primary}10` }]}>
                  <MaterialIcons name="add-a-photo" size={40} color={theme.primary} />
                  <Text style={[styles.photoText, { color: theme.primary }]}>ADD PHOTO</Text>
                </View>
              </View>
            )}
            
            {/* Edit Badge */}
            <View style={[styles.editBadge, { backgroundColor: theme.primary }]}>
              <MaterialIcons name="edit" size={18} color={isDark ? theme.background : '#0d1c17'} />
            </View>
          </TouchableOpacity>
          
          {/* AI Tip Card */}
          <View style={[styles.tipCard, { 
            backgroundColor: theme.surface,
            borderColor: `${theme.primary}20`
          }]}>
            <View style={[styles.tipIcon, { backgroundColor: `${theme.primary}10` }]}>
              <MaterialIcons name="auto-awesome" size={20} color={theme.primary} />
            </View>
            
            <View style={styles.tipContent}>
              <Text style={[styles.tipTitle, { color: theme.textMain }]}>AI Analysis Tip</Text>
              <Text style={[styles.tipText, { color: theme.textSecondary }]}>
                A clear, front-facing photo helps our AI detect potential health issues and mood changes accurately.
              </Text>
            </View>
          </View>
        </View>
        
        {/* Form Fields */}
        <View style={styles.form}>
          {/* Name Input */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.textMain }]}>
              What's their name?
            </Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.surface,
                borderColor: isDark ? '#333' : '#eee',
                color: theme.textMain
              }]}
              placeholder="e.g. Bella"
              placeholderTextColor={isDark ? '#666' : '#ccc'}
              value={petName}
              onChangeText={setPetName}
            />
          </View>
          
          {/* Species Selection */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.textMain }]}>
              Species
            </Text>
            <View style={styles.speciesGrid}>
              {SPECIES_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.speciesOption,
                    { 
                      backgroundColor: selectedSpecies === option.id 
                        ? `${theme.primary}10` 
                        : theme.surface,
                      borderColor: selectedSpecies === option.id 
                        ? theme.primary 
                        : isDark ? '#333' : '#eee',
                      borderWidth: selectedSpecies === option.id ? 2 : 1,
                    }
                  ]}
                  onPress={() => setSelectedSpecies(option.id)}
                >
                  <Text style={styles.speciesEmoji}>{option.emoji}</Text>
                  <Text style={[
                    styles.speciesLabel, 
                    { 
                      color: selectedSpecies === option.id 
                        ? theme.textMain 
                        : theme.textSecondary,
                      fontFamily: selectedSpecies === option.id 
                        ? 'Inter_700Bold' 
                        : 'Inter_500Medium'
                    }
                  ]}>
                    {option.label}
                  </Text>
                  
                  {selectedSpecies === option.id && (
                    <View style={styles.selectedCheck}>
                      <MaterialIcons name="check-circle" size={16} color={theme.primary} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Breed Input */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.textMain }]}>
              Breed
            </Text>
            <View style={styles.searchInputContainer}>
              <MaterialIcons 
                name="search" 
                size={24} 
                color={isDark ? '#666' : '#ccc'} 
                style={styles.searchIcon} 
              />
              <TextInput
                style={[styles.searchInput, { 
                  backgroundColor: theme.surface,
                  borderColor: isDark ? '#333' : '#eee',
                  color: theme.textMain
                }]}
                placeholder="Search breed..."
                placeholderTextColor={isDark ? '#666' : '#ccc'}
                value={breed}
                onChangeText={setBreed}
              />
            </View>
          </View>
          
          {/* Birthday Input */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.textMain }]}>
              Birthday or Approximate Age
            </Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.surface,
                borderColor: isDark ? '#333' : '#eee',
                color: theme.textMain
              }]}
              placeholder="MM/DD/YYYY"
              placeholderTextColor={isDark ? '#666' : '#ccc'}
              value={birthdate}
              onChangeText={setBirthdate}
            />
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Action Button */}
      <View style={[styles.bottomBar, { 
        backgroundColor: theme.background,
        borderTopColor: `${isDark ? '#333' : '#eee'}50`
      }]}>
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: theme.primary }]}
          onPress={handleSaveProfile}
        >
          <Text style={[styles.saveButtonText, { color: isDark ? theme.background : '#0d1c17' }]}>
            Save Profile
          </Text>
          <MaterialIcons 
            name="arrow-forward" 
            size={24} 
            color={isDark ? theme.background : '#0d1c17'} 
          />
        </TouchableOpacity>
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
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
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
  progressContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  progressPercentage: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headlineContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  headline: {
    fontSize: 28,
    fontFamily: 'Inter_800ExtraBold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subheadline: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  photoUpload: {
    width: 144,
    height: 144,
    borderRadius: 72,
    borderWidth: 2,
    borderStyle: 'dashed',
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoText: {
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  petPhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 72,
  },
  editBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  tipCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
  },
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    marginBottom: 2,
  },
  tipText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
  },
  form: {
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  searchInputContainer: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 1,
  },
  searchInput: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingLeft: 44,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  speciesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  speciesOption: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 80,
  },
  speciesEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  speciesLabel: {
    fontSize: 14,
  },
  selectedCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  bottomBar: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  saveButton: {
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  saveButtonText: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    marginRight: 8,
  },
});

import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { MaterialIcons } from '@expo/vector-icons';

export default function WelcomeScreen() {
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
    <View style={styles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Background Image */}
      <ImageBackground 
        source={require('@/assets/images/welcome-bg.jpg')} 
        style={styles.backgroundImage}
      >
        {/* Gradient Overlays */}
        <View style={styles.gradientTop} />
        <LinearGradient
          colors={['transparent', 'rgba(16, 34, 28, 0.9)', 'rgba(16, 34, 28, 1)']}
          style={styles.gradientBottom}
        />
      </ImageBackground>
      
      {/* Content */}
      <View style={styles.content}>
        {/* AI Companion Badge */}
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <MaterialIcons name="pets" size={18} color={theme.primary} />
            <Text style={[styles.badgeText, { color: theme.textMain }]}>AI Companion</Text>
          </View>
        </View>
        
        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.title}>
            Hello, {'\n'}
            <Text style={{ color: theme.primary }}>Furry Friend!</Text>
          </Text>
          
          <Text style={styles.subtitle}>
            Keep your pet happy and healthy with our smart visual analysis.
          </Text>
          
          {/* Pagination Dots */}
          <View style={styles.pagination}>
            <View style={[styles.paginationDotActive, { backgroundColor: theme.primary }]} />
            <View style={styles.paginationDot} />
            <View style={styles.paginationDot} />
          </View>
          
          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.primaryButton, { backgroundColor: theme.primary }]}
              onPress={() => router.push('/onboarding/pet-profile')}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => router.push('/auth/login')}
            >
              <Text style={styles.secondaryButtonText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10221c',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  badgeContainer: {
    alignItems: 'flex-end',
    marginTop: 48,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.5,
    color: '#fff',
  },
  mainContent: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  title: {
    fontSize: 36,
    fontFamily: 'Inter_800ExtraBold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter_500Medium',
    color: '#ccc',
    textAlign: 'center',
    maxWidth: 280,
    marginBottom: 32,
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  paginationDotActive: {
    width: 32,
    height: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0df2a6',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#0d1c17',
  },
  secondaryButton: {
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
  },
});

import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/components/ThemeProvider';
import { MaterialIcons } from '@expo/vector-icons';

// Web-compatible alert
const showAlert = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}: ${message}`);
  } else {
    const { Alert } = require('react-native');
    Alert.alert(title, message);
  }
};

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const { theme, isDark } = useTheme();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded || isSubmitting) return;
    
    setError('');
    setIsSubmitting(true);

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
        const errorMessage = 'Sign in incomplete. Please try again.';
        setError(errorMessage);
        showAlert('Error', errorMessage);
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      const errorMessage = err.errors?.[0]?.message || 'Failed to sign in';
      setError(errorMessage);
      showAlert('Error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <MaterialIcons name="pets" size={64} color={theme.primary} />
            <Text style={[styles.title, { color: theme.textMain }]}>
              Welcome Back
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Sign in to continue caring for your pet
            </Text>

            {error ? (
              <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>
            ) : null}

            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: theme.surface,
                  color: theme.textMain,
                  borderColor: error ? theme.error : theme.border
                }
              ]}
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email address"
              placeholderTextColor={theme.textSecondary}
              onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
              keyboardType="email-address"
              autoComplete="email"
            />

            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: theme.surface,
                  color: theme.textMain,
                  borderColor: error ? theme.error : theme.border
                }
              ]}
              value={password}
              placeholder="Password"
              placeholderTextColor={theme.textSecondary}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              autoComplete="password"
            />

            <TouchableOpacity 
              style={[styles.button, { backgroundColor: theme.primary, opacity: isSubmitting ? 0.7 : 1 }]}
              onPress={onSignInPress}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>{isSubmitting ? 'Signing In...' : 'Sign In'}</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: theme.textSecondary }]}>
                Don't have an account?{' '}
              </Text>
              <Link href="/(auth)/sign-up" asChild>
                <TouchableOpacity>
                  <Text style={[styles.link, { color: theme.primary }]}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    marginTop: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginBottom: 32,
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  input: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    marginBottom: 16,
    borderWidth: 1,
  },
  button: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  link: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
});

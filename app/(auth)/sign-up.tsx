import * as React from 'react';
import { 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/components/ThemeProvider';
import { MaterialIcons } from '@expo/vector-icons';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const { theme, isDark } = useTheme();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.errors?.[0]?.message || 'Failed to sign up');
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
        Alert.alert('Error', 'Verification incomplete. Please try again.');
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.errors?.[0]?.message || 'Failed to verify');
    }
  };

  if (pendingVerification) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.content}>
              <MaterialIcons name="mail-outline" size={64} color={theme.primary} />
              <Text style={[styles.title, { color: theme.textMain }]}>
                Verify your email
              </Text>
              <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                We sent a verification code to {emailAddress}
              </Text>

              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: theme.surface,
                    color: theme.textMain,
                    borderColor: theme.border
                  }
                ]}
                value={code}
                placeholder="Enter verification code"
                placeholderTextColor={theme.textSecondary}
                onChangeText={(code) => setCode(code)}
                keyboardType="number-pad"
                autoComplete="one-time-code"
              />

              <TouchableOpacity 
                style={[styles.button, { backgroundColor: theme.primary }]}
                onPress={onVerifyPress}
              >
                <Text style={styles.buttonText}>Verify Email</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }

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
              Create Account
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Join PetVision to start caring for your furry friend
            </Text>

            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: theme.surface,
                  color: theme.textMain,
                  borderColor: theme.border
                }
              ]}
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email address"
              placeholderTextColor={theme.textSecondary}
              onChangeText={(email) => setEmailAddress(email)}
              keyboardType="email-address"
              autoComplete="email"
            />

            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: theme.surface,
                  color: theme.textMain,
                  borderColor: theme.border
                }
              ]}
              value={password}
              placeholder="Password"
              placeholderTextColor={theme.textSecondary}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              autoComplete="password-new"
            />

            <TouchableOpacity 
              style={[styles.button, { backgroundColor: theme.primary }]}
              onPress={onSignUpPress}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: theme.textSecondary }]}>
                Already have an account?{' '}
              </Text>
              <Link href="/(auth)/sign-in" asChild>
                <TouchableOpacity>
                  <Text style={[styles.link, { color: theme.primary }]}>
                    Sign In
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

import { useClerk } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';
import { MaterialIcons } from '@expo/vector-icons';

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  const { theme } = useTheme();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Router will automatically redirect to sign-in due to auth protection
      router.replace('/');
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: theme.surface, borderColor: theme.border }]}
      onPress={handleSignOut}
    >
      <MaterialIcons name="logout" size={20} color={theme.textMain} />
      <Text style={[styles.buttonText, { color: theme.textMain }]}>Sign Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
});

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { MaterialIcons } from '@expo/vector-icons';
import { UserProfileImage } from '@/components/PlaceholderAssets';

export default function ProfileScreen() {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  
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

  // Menu items
  const menuItems = [
    { id: 'pets', icon: 'pets', label: 'My Pets', badge: '2' },
    { id: 'history', icon: 'history', label: 'Health History' },
    { id: 'reminders', icon: 'notifications', label: 'Reminders', badge: '3' },
    { id: 'vets', icon: 'medical-services', label: 'My Vets' },
    { id: 'settings', icon: 'settings', label: 'Settings' },
    { id: 'help', icon: 'help', label: 'Help & Support' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.textMain }]}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <MaterialIcons name="settings" size={24} color={theme.textMain} />
        </TouchableOpacity>
      </View>
      
      {/* Main Content */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* User Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: theme.surface }]}>
          <View style={styles.profileHeader}>
            <UserProfileImage size={80} style={styles.profileImage} />
            
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: theme.textMain }]}>Jessica Smith</Text>
              <Text style={[styles.profileEmail, { color: theme.textSecondary }]}>jessica.smith@example.com</Text>
              
              <TouchableOpacity 
                style={[styles.editProfileButton, { borderColor: theme.primary }]}
                onPress={() => console.log('Edit profile')}
              >
                <Text style={[styles.editProfileText, { color: theme.primary }]}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={[styles.statsContainer, { borderTopColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primary }]}>2</Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Pets</Text>
            </View>
            
            <View style={[styles.statDivider, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]} />
            
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primary }]}>12</Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Health Checks</Text>
            </View>
            
            <View style={[styles.statDivider, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]} />
            
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primary }]}>3</Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Reminders</Text>
            </View>
          </View>
        </View>
        
        {/* Menu */}
        <View style={styles.menuSection}>
          <Text style={[styles.sectionTitle, { color: theme.textMain }]}>Account</Text>
          
          <View style={[styles.menuCard, { backgroundColor: theme.surface }]}>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => console.log(`Navigate to ${item.id}`)}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={[styles.menuIconContainer, { backgroundColor: `${theme.primary}10` }]}>
                      <MaterialIcons name={item.icon as any} size={20} color={theme.primary} />
                    </View>
                    <Text style={[styles.menuItemLabel, { color: theme.textMain }]}>{item.label}</Text>
                  </View>
                  
                  <View style={styles.menuItemRight}>
                    {item.badge && (
                      <View style={[styles.badge, { backgroundColor: theme.primary }]}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                      </View>
                    )}
                    <MaterialIcons name="chevron-right" size={20} color={isDark ? '#666' : '#ccc'} />
                  </View>
                </TouchableOpacity>
                
                {index < menuItems.length - 1 && (
                  <View style={[styles.menuDivider, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
        
        {/* Logout Button */}
        <TouchableOpacity 
          style={[styles.logoutButton, { borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }]}
          onPress={() => router.push('/')}
        >
          <MaterialIcons name="logout" size={20} color={isDark ? '#f87171' : '#ef4444'} />
          <Text style={[styles.logoutText, { color: isDark ? '#f87171' : '#ef4444' }]}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={[styles.versionText, { color: isDark ? '#666' : '#999' }]}>
          Version 1.0.0
        </Text>
      </ScrollView>
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
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 100,
  },
  profileCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
  },
  editProfileButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  editProfileText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  statsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingVertical: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  statDivider: {
    width: 1,
    height: '80%',
    alignSelf: 'center',
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  menuCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemLabel: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
  },
  menuDivider: {
    height: 1,
    marginLeft: 56,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 8,
  },
  versionText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
});

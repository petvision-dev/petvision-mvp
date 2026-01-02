import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { PetProfileImage, BackgroundImage } from '@/components/PlaceholderAssets';

export default function HomeDashboardScreen() {
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

  // Quick action buttons
  const quickActions = [
    { id: 'vet', icon: 'medical-services', label: 'Vet Connect', color: 'blue' },
    { id: 'symptoms', icon: 'edit-note', label: 'Log Symptoms', color: 'orange' },
    { id: 'diet', icon: 'restaurant', label: 'Diet Tracker', color: 'purple' },
    { id: 'vaccines', icon: 'vaccines', label: 'Vaccines', color: 'pink' },
  ];
  
  // Activity items
  const activityItems = [
    {
      id: '1',
      type: 'success',
      title: 'Skin Analysis Complete',
      description: 'No issues detected. Looking healthy!',
      time: '2 hours ago',
    },
    {
      id: '2',
      type: 'warning',
      title: 'Vaccination Reminder',
      description: 'Rabies booster is due soon.',
      time: 'Due in 3 days',
    },
  ];
  
  // Handle navigation
  const handleNavigation = (screen: string) => {
    switch (screen) {
      case 'profile':
        router.push('/profile');
        break;
      case 'tracker':
        router.push('/tracker');
        break;
      case 'analysis':
        router.push('/camera');
        break;
      case 'history':
        router.push('/history');
        break;
      case 'settings':
        router.push('/settings');
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Top App Bar */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: theme.textSecondary }]}>Good Morning,</Text>
          <Text style={[styles.username, { color: theme.textMain }]}>Jessica</Text>
        </View>
        
        <TouchableOpacity style={styles.notificationButton}>
          <MaterialIcons name="notifications" size={28} color={theme.textMain} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>
      
      {/* Main Content */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Profile Header */}
        <View style={[styles.profileCard, { backgroundColor: theme.surface }]}>
          <View style={styles.profileImageContainer}>
            <PetProfileImage size={80} style={styles.profileImage} />
            <View style={[styles.petBadge, { backgroundColor: theme.primary, borderColor: theme.surface }]}>
              <MaterialIcons name="pets" size={12} color={isDark ? theme.background : '#0d1c17'} />
            </View>
          </View>
          
          <View style={styles.profileInfo}>
            <View style={styles.profileHeader}>
              <View>
                <Text style={[styles.petName, { color: theme.textMain }]}>Bella</Text>
                <Text style={[styles.petBreed, { color: theme.textSecondary }]}>Golden Retriever</Text>
              </View>
              <View style={styles.healthStatus}>
                <Text style={styles.healthStatusText}>Healthy</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Health Score Widget */}
        <View style={[styles.scoreCard, { backgroundColor: theme.surface }]}>
          <View style={styles.scoreHeader}>
            <View style={styles.scoreTitle}>
              <MaterialIcons name="favorite" size={20} color={theme.primary} />
              <Text style={[styles.scoreTitleText, { color: theme.textMain }]}>Wellness Score</Text>
            </View>
            <Text style={styles.scoreValue}>
              92<Text style={[styles.scoreMax, { color: theme.textSecondary }]}>/100</Text>
            </Text>
          </View>
          
          <View style={[styles.progressBar, { backgroundColor: isDark ? '#333' : '#cee8e0' }]}>
            <View style={[styles.progressFill, { backgroundColor: theme.primary, width: '92%' }]} />
          </View>
          
          <Text style={[styles.lastUpdated, { color: theme.textSecondary }]}>
            Last updated: Today, 9:00 AM
          </Text>
        </View>
        
        {/* AI Health Scan Card */}
        <TouchableOpacity 
          style={styles.heroCard}
          onPress={() => handleNavigation('analysis')}
        >
          <BackgroundImage height={220} style={styles.heroImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
            style={styles.heroGradient}
          />
          
          <View style={styles.heroContent}>
            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>AI Powered</Text>
            </View>
            
            <Text style={styles.heroTitle}>New Health Scan</Text>
            <Text style={styles.heroSubtitle}>
              Detect skin issues or eye conditions instantly with AI.
            </Text>
            
            <TouchableOpacity 
              style={[styles.analysisButton, { backgroundColor: theme.primary }]}
              onPress={() => handleNavigation('analysis')}
            >
              <MaterialIcons name="photo-camera" size={20} color={isDark ? theme.background : '#0d1c17'} />
              <Text style={[styles.analysisButtonText, { color: isDark ? theme.background : '#0d1c17' }]}>
                Start Analysis
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        
        {/* Quick Action Grid */}
        <View style={styles.quickActionGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity 
              key={action.id}
              style={[styles.quickActionButton, { backgroundColor: theme.surface }]}
              onPress={() => handleNavigation(action.id)}
            >
              <View style={[
                styles.quickActionIcon, 
                { 
                  backgroundColor: isDark 
                    ? `${action.color}900/20` 
                    : `${action.color}50`
                }
              ]}>
                <MaterialIcons 
                  name={action.icon as any} 
                  size={24} 
                  color={isDark ? `${action.color}400` : `${action.color}600`} 
                />
              </View>
              <Text style={[styles.quickActionLabel, { color: theme.textMain }]}>
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.textMain }]}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={[styles.viewAllButton, { color: theme.primary }]}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.activityList}>
            {activityItems.map((item) => (
              <View 
                key={item.id} 
                style={[
                  styles.activityItem, 
                  { 
                    backgroundColor: theme.surface,
                    borderLeftColor: item.type === 'success' ? theme.success : theme.warning,
                  }
                ]}
              >
                <View style={[
                  styles.activityIconContainer,
                  {
                    backgroundColor: item.type === 'success' 
                      ? (isDark ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)')
                      : (isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)')
                  }
                ]}>
                  <MaterialIcons 
                    name={item.type === 'success' ? 'check-circle' : 'notifications-active'} 
                    size={20} 
                    color={item.type === 'success' 
                      ? (isDark ? '#4ade80' : '#22c55e')
                      : (isDark ? '#fbbf24' : '#f59e0b')
                    } 
                  />
                </View>
                
                <View style={styles.activityContent}>
                  <Text style={[styles.activityTitle, { color: theme.textMain }]}>{item.title}</Text>
                  <Text style={[styles.activityDescription, { color: theme.textSecondary }]}>
                    {item.description}
                  </Text>
                  <Text style={styles.activityTime}>{item.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {/* Daily Tip */}
        <View style={styles.tipCard}>
          <View style={styles.tipIconBackground}>
            <MaterialIcons name="lightbulb" size={72} color="rgba(255,255,255,0.1)" />
          </View>
          
          <View style={styles.tipContent}>
            <View style={styles.tipBadge}>
              <MaterialIcons name="tips-and-updates" size={12} color="#bfdbfe" />
              <Text style={styles.tipBadgeText}>Daily Tip</Text>
            </View>
            
            <Text style={styles.tipTitle}>Hydration is Key</Text>
            <Text style={styles.tipDescription}>
              Ensure Bella has access to fresh water, especially after exercise. Golden Retrievers can overheat easily.
            </Text>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { 
        backgroundColor: theme.surface,
        borderTopColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
      }]}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => {}}
        >
          <MaterialIcons name="home" size={24} color={theme.primary} />
          <Text style={[styles.navLabel, { color: theme.primary, fontFamily: 'Inter_700Bold' }]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('profile')}
        >
          <MaterialIcons name="pets" size={24} color="#999" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navFab}
          onPress={() => handleNavigation('analysis')}
        >
          <View style={[styles.fabButton, { 
            backgroundColor: theme.primary,
            borderColor: isDark ? theme.background : theme.surface
          }]}>
            <MaterialIcons name="add" size={28} color={isDark ? theme.background : '#0d1c17'} />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('history')}
        >
          <MaterialIcons name="history" size={24} color="#999" />
          <Text style={styles.navLabel}>History</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('settings')}
        >
          <MaterialIcons name="settings" size={24} color="#999" />
          <Text style={styles.navLabel}>Settings</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  username: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
  notificationButton: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: '#fff',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 100,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#0df2a6',
  },
  petBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  profileInfo: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  petName: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  petBreed: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  healthStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 20,
  },
  healthStatusText: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: '#22c55e',
  },
  scoreCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scoreTitleText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  scoreValue: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#0df2a6',
  },
  scoreMax: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  lastUpdated: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    textAlign: 'right',
    marginTop: 12,
  },
  heroCard: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    height: 220,
    marginBottom: 24,
  },
  heroImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  heroContent: {
    position: 'relative',
    padding: 20,
    flex: 1,
    justifyContent: 'flex-end',
  },
  aiBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: 'rgba(13, 242, 166, 0.2)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(13, 242, 166, 0.3)',
    marginBottom: 4,
  },
  aiBadgeText: {
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    color: '#0df2a6',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#e5e5e5',
    marginBottom: 16,
  },
  analysisButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  analysisButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  quickActionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quickActionButton: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  activitySection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
  },
  viewAllButton: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    borderLeftWidth: 4,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  activityTime: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#999',
  },
  tipCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#3b82f6',
    overflow: 'hidden',
    position: 'relative',
  },
  tipIconBackground: {
    position: 'absolute',
    right: -20,
    top: -20,
    opacity: 0.1,
    transform: [{ rotate: '15deg' }],
  },
  tipContent: {
    position: 'relative',
    zIndex: 1,
  },
  tipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  tipBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: '#bfdbfe',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tipTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#dbeafe',
    lineHeight: 20,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderTopWidth: 1,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
    color: '#999',
    marginTop: 4,
  },
  navFab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0df2a6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    marginTop: -32,
  },
});

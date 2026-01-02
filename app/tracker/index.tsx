import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { MaterialIcons } from '@expo/vector-icons';
import { PetProfileImage, ConditionImage } from '@/components/PlaceholderAssets';

export default function SymptomTrackerScreen() {
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

  // Quick log categories
  const quickLogCategories = [
    { id: 'weight', icon: 'monitor-weight', label: 'Weight', color: 'primary' },
    { id: 'skin', icon: 'spa', label: 'Skin', color: 'orange' },
    { id: 'mood', icon: 'sentiment-satisfied', label: 'Mood', color: 'blue' },
    { id: 'stool', icon: 'water-drop', label: 'Stool', color: 'purple' },
  ];
  
  // Recent history items
  const historyItems = [
    {
      id: '1',
      type: 'high',
      icon: 'error',
      title: 'Skin Irritation',
      subtitle: 'High severity - Left ear',
      time: 'Today 9:41 AM',
      description: 'Buddy has been scratching his left ear frequently. Noticed redness and some inflammation.',
      hasImage: true,
    },
    {
      id: '2',
      type: 'normal',
      icon: 'monitor-weight',
      title: 'Weight Check',
      subtitle: '24.5 lbs (+0.2)',
      time: 'Yesterday',
    },
    {
      id: '3',
      type: 'normal',
      icon: 'sentiment-satisfied',
      title: 'Morning Walk Mood',
      subtitle: 'Playful & Energetic',
      time: 'Mon, Oct 24',
    },
  ];
  
  // Handle navigation
  const handleNavigation = (screen: string) => {
    switch (screen) {
      case 'home':
        router.push('/home');
        break;
      case 'vet':
        router.push('/vet');
        break;
      case 'profile':
        router.push('/profile');
        break;
      case 'ai-scan':
        router.push('/camera');
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={[styles.profileImageContainer, { 
            borderColor: theme.primary,
            borderWidth: 2,
          }]}>
            <PetProfileImage size={40} style={styles.profileImage} />
          </View>
          <Text style={[styles.headerTitle, { color: theme.textMain }]}>Symptom Tracker</Text>
        </View>
        
        <TouchableOpacity style={styles.notificationButton}>
          <MaterialIcons name="notifications" size={24} color={theme.textMain} />
        </TouchableOpacity>
      </View>
      
      {/* Main Content */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Profile Context */}
        <View style={styles.profileContext}>
          <View style={styles.profileContextHeader}>
            <View>
              <Text style={[styles.profileContextTitle, { color: theme.textMain }]}>
                How is Buddy feeling?
              </Text>
              <Text style={[styles.profileContextSubtitle, { color: theme.textSecondary }]}>
                Log a new symptom or check history
              </Text>
            </View>
            
            {/* Mini chart */}
            <View style={[styles.miniChart, { 
              backgroundColor: theme.surface,
              borderColor: isDark ? theme.border : '#eee',
            }]}>
              <View style={styles.chartBars}>
                <View style={[styles.chartBar, { height: '40%', backgroundColor: `${theme.primary}30` }]} />
                <View style={[styles.chartBar, { height: '60%', backgroundColor: `${theme.primary}40` }]} />
                <View style={[styles.chartBar, { height: '30%', backgroundColor: `${theme.primary}50` }]} />
                <View style={[styles.chartBar, { height: '80%', backgroundColor: `${theme.primary}80` }]} />
                <View style={[styles.chartBar, { height: '50%', backgroundColor: theme.primary }]} />
              </View>
            </View>
          </View>
        </View>
        
        {/* AI Scan Button */}
        <TouchableOpacity 
          style={[styles.aiScanButton, { backgroundColor: theme.primary }]}
          onPress={() => handleNavigation('ai-scan')}
        >
          <MaterialIcons name="auto-awesome" size={26} color={isDark ? theme.background : '#0d1c17'} />
          <Text style={[styles.aiScanText, { color: isDark ? theme.background : '#0d1c17' }]}>
            AI Scan Symptom
          </Text>
        </TouchableOpacity>
        
        {/* Quick Log Section */}
        <View style={styles.quickLogSection}>
          <Text style={[styles.sectionTitle, { color: theme.textMain }]}>Quick Log</Text>
          
          <View style={styles.quickLogGrid}>
            {quickLogCategories.map((category) => (
              <TouchableOpacity 
                key={category.id}
                style={[styles.quickLogItem, { 
                  backgroundColor: theme.surface,
                  borderColor: isDark ? theme.border : '#eee',
                }]}
              >
                <View style={[
                  styles.quickLogIcon,
                  { 
                    backgroundColor: category.color === 'primary' 
                      ? `${theme.primary}10` 
                      : isDark 
                        ? `${category.color}900/30` 
                        : `${category.color}100`
                  }
                ]}>
                  <MaterialIcons 
                    name={category.icon as any} 
                    size={24} 
                    color={category.color === 'primary' 
                      ? theme.primary 
                      : isDark 
                        ? `${category.color}400` 
                        : `${category.color}600`
                    } 
                  />
                </View>
                <Text style={[styles.quickLogLabel, { color: theme.textMain }]}>{category.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* History Section */}
        <View style={styles.historySection}>
          <View style={styles.historySectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.textMain }]}>Recent History</Text>
            <TouchableOpacity>
              <Text style={[styles.viewAllButton, { color: theme.primary }]}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.historyList}>
            {historyItems.map((item) => (
              <View 
                key={item.id} 
                style={[
                  styles.historyItem, 
                  { 
                    backgroundColor: theme.surface,
                    borderColor: item.type === 'high' ? '#ef4444' : isDark ? theme.border : '#eee',
                    borderLeftColor: item.type === 'high' ? '#ef4444' : isDark ? theme.border : '#eee',
                  }
                ]}
              >
                <View style={styles.historyItemHeader}>
                  <View style={styles.historyItemMain}>
                    <View style={[
                      styles.historyItemIcon,
                      {
                        backgroundColor: item.type === 'high' 
                          ? (isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)')
                          : item.icon === 'monitor-weight'
                            ? `${theme.primary}10`
                            : item.icon === 'sentiment-satisfied'
                              ? (isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)')
                              : (isDark ? 'rgba(124, 58, 237, 0.2)' : 'rgba(124, 58, 237, 0.1)')
                      }
                    ]}>
                      <MaterialIcons 
                        name={item.icon as any} 
                        size={24} 
                        color={item.type === 'high' 
                          ? (isDark ? '#f87171' : '#ef4444')
                          : item.icon === 'monitor-weight'
                            ? theme.primary
                            : item.icon === 'sentiment-satisfied'
                              ? (isDark ? '#93c5fd' : '#3b82f6')
                              : (isDark ? '#c4b5fd' : '#7c3aed')
                        } 
                      />
                    </View>
                    
                    <View>
                      <Text style={[styles.historyItemTitle, { color: theme.textMain }]}>
                        {item.title}
                      </Text>
                      <Text style={[styles.historyItemSubtitle, { color: theme.textSecondary }]}>
                        {item.subtitle}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={[styles.historyItemTime, { 
                    color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
                    backgroundColor: isDark ? theme.background : '#f5f5f5',
                  }]}>
                    {item.time}
                  </Text>
                </View>
                
                {item.description && (
                  <View style={styles.historyItemContent}>
                    <Text style={[styles.historyItemDescription, { color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)' }]}>
                      {item.description}
                    </Text>
                    
                    {item.hasImage && (
                      <View style={[styles.historyItemImage, { backgroundColor: isDark ? '#333' : '#f0f0f0' }]}>
                        <ConditionImage width={96} height={96} style={styles.conditionImage} />
                      </View>
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { 
        backgroundColor: isDark ? 'rgba(22, 43, 36, 0.95)' : 'rgba(245, 248, 247, 0.95)',
        borderTopColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
      }]}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => handleNavigation('home')}
        >
          <MaterialIcons name="home" size={24} color={theme.textSecondary} />
          <Text style={[styles.navLabel, { color: theme.textSecondary }]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => {}}
        >
          <MaterialIcons name="favorite" size={24} color={theme.primary} />
          <Text style={[styles.navLabel, { color: theme.primary, fontFamily: 'Inter_700Bold' }]}>Tracker</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('vet')}
        >
          <MaterialIcons name="calendar-month" size={24} color={theme.textSecondary} />
          <Text style={[styles.navLabel, { color: theme.textSecondary }]}>Vet</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('profile')}
        >
          <MaterialIcons name="pets" size={24} color={theme.textSecondary} />
          <Text style={[styles.navLabel, { color: theme.textSecondary }]}>Profile</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
  },
  notificationButton: {
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
    padding: 16,
    paddingBottom: 100,
  },
  profileContext: {
    marginBottom: 24,
  },
  profileContextHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profileContextTitle: {
    fontSize: 24,
    fontFamily: 'Inter_800ExtraBold',
    marginBottom: 4,
  },
  profileContextSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  miniChart: {
    width: 80,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '100%',
    gap: 2,
  },
  chartBar: {
    width: 6,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  aiScanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    height: 56,
    borderRadius: 12,
    marginBottom: 24,
  },
  aiScanText: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
  },
  quickLogSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    marginBottom: 12,
  },
  quickLogGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickLogItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  quickLogIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickLogLabel: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  historySection: {
    marginBottom: 24,
  },
  historySectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllButton: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  historyList: {
    gap: 12,
  },
  historyItem: {
    borderRadius: 12,
    borderWidth: 1,
    borderLeftWidth: 4,
    overflow: 'hidden',
  },
  historyItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  historyItemMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  historyItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    marginBottom: 2,
  },
  historyItemSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  historyItemTime: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  historyItemContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingLeft: 68,
  },
  historyItemDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
    marginBottom: 12,
  },
  historyItemImage: {
    width: 96,
    height: 96,
    borderRadius: 8,
    overflow: 'hidden',
  },
  conditionImage: {
    width: '100%',
    height: '100%',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 8,
    borderTopWidth: 1,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  navLabel: {
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
    marginTop: 4,
  },
});

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BackgroundImage, ArticleImage } from '@/components/PlaceholderAssets';

export default function EducationalResourcesScreen() {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
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

  // Categories
  const categories = [
    'All',
    'Preventive Care',
    'Nutrition',
    'Common Ailments',
    'Behavior',
    'Senior Pets',
  ];
  
  // Recent articles
  const articles = [
    {
      id: '1',
      title: '5 Signs of Dehydration in Cats You Should Not Ignore',
      category: 'Common Ailments',
      readTime: '3 min read',
      image: 'cat-drinking',
    },
    {
      id: '2',
      title: 'Understanding Flea Prevention: A Complete Guide',
      category: 'Preventive Care',
      readTime: '5 min read',
      image: 'dog-collar',
    },
    {
      id: '3',
      title: 'Is Chocolate Really That Bad for Your Dog?',
      category: 'Nutrition',
      readTime: '2 min read',
      image: 'chocolate',
    },
    {
      id: '4',
      title: 'Socializing Your New Puppy: First Steps',
      category: 'Puppy Care',
      readTime: '4 min read',
      image: 'puppy-playing',
    },
  ];
  
  // Handle navigation
  const handleNavigation = (screen: string) => {
    switch (screen) {
      case 'home':
        router.push('/home');
        break;
      case 'plan':
        router.push('/plan');
        break;
      case 'camera':
        router.push('/camera');
        break;
      case 'profile':
        router.push('/profile');
        break;
      case 'article':
        router.push('/resources/article');
        break;
      case 'analysis':
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
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color={theme.textMain} />
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: theme.textMain }]}>Health Library</Text>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { 
          backgroundColor: theme.surface,
          borderColor: isDark ? '#333' : '#eee',
        }]}>
          <View style={styles.searchIcon}>
            <MaterialIcons name="search" size={24} color={theme.primary} />
          </View>
          
          <TextInput
            style={[styles.searchInput, { color: theme.textMain }]}
            placeholder="Search symptoms, articles..."
            placeholderTextColor={isDark ? '#666' : '#ccc'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      {/* Categories */}
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              { 
                backgroundColor: activeCategory === category 
                  ? theme.primary 
                  : theme.surface,
                borderColor: activeCategory === category 
                  ? theme.primary 
                  : isDark ? '#333' : '#eee',
              }
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text style={[
              styles.categoryLabel,
              { 
                color: activeCategory === category 
                  ? isDark ? theme.background : '#0d1c17'
                  : isDark ? '#ccc' : '#666',
                fontFamily: activeCategory === category 
                  ? 'Inter_700Bold' 
                  : 'Inter_600SemiBold',
              }
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Main Content */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Featured Article */}
        <TouchableOpacity 
          style={styles.featuredCard}
          onPress={() => handleNavigation('article')}
        >
          <BackgroundImage height={220} style={styles.featuredImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.9)']}
            style={styles.featuredGradient}
          />
          
          <View style={styles.featuredContent}>
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>Featured</Text>
            </View>
            
            <Text style={styles.featuredTitle}>Why Regular Vet Visits Save Lives</Text>
            
            <View style={styles.featuredMeta}>
              <View style={styles.featuredReadTime}>
                <MaterialIcons name="schedule" size={18} color={theme.primary} />
                <Text style={styles.featuredReadTimeText}>5 MIN READ</Text>
              </View>
              
              <View style={styles.metaDot} />
              
              <Text style={styles.featuredAuthor}>Dr. Emily Chen</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        {/* AI Promo Banner */}
        <TouchableOpacity 
          style={[styles.aiPromoBanner, { backgroundColor: isDark ? '#15231e' : '#0d1c17' }]}
          onPress={() => handleNavigation('analysis')}
        >
          <View style={styles.aiPromoGlow1} />
          <View style={styles.aiPromoGlow2} />
          
          <View style={styles.aiPromoContent}>
            <Text style={styles.aiPromoTitle}>Symptom Checker AI</Text>
            <Text style={styles.aiPromoDescription}>
              Not sure what's wrong? Scan your pet to get instant insights.
            </Text>
            
            <TouchableOpacity 
              style={[styles.aiPromoButton, { backgroundColor: theme.primary }]}
              onPress={() => handleNavigation('analysis')}
            >
              <MaterialIcons name="document-scanner" size={20} color={isDark ? theme.background : '#0d1c17'} />
              <Text style={[styles.aiPromoButtonText, { color: isDark ? theme.background : '#0d1c17' }]}>
                Analyze Now
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.aiPromoIcon}>
            <MaterialIcons name="smart-toy" size={32} color={theme.primary} />
          </View>
        </TouchableOpacity>
        
        {/* Recent Articles */}
        <View style={styles.articlesSection}>
          <View style={styles.articlesSectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.textMain }]}>Recent Articles</Text>
            <TouchableOpacity>
              <View style={styles.viewAllButton}>
                <Text style={{ color: theme.primary, fontFamily: 'Inter_700Bold', fontSize: 14 }}>
                  View All
                </Text>
                <MaterialIcons name="chevron-right" size={16} color={theme.primary} />
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.articlesList}>
            {articles.map((article) => (
              <TouchableOpacity 
                key={article.id} 
                style={[styles.articleCard, { 
                  backgroundColor: theme.surface,
                  borderColor: isDark ? '#333' : '#eee',
                }]}
                onPress={() => handleNavigation('article')}
              >
                <ArticleImage width={96} height={96} style={styles.articleImage} />
                
                <View style={styles.articleContent}>
                  <View style={styles.articleHeader}>
                    <Text style={[styles.articleCategory, { color: theme.primary }]}>
                      {article.category}
                    </Text>
                    <MaterialIcons name="bookmark" size={22} color={isDark ? '#444' : '#ddd'} />
                  </View>
                  
                  <Text style={[styles.articleTitle, { color: theme.textMain }]}>
                    {article.title}
                  </Text>
                  
                  <View style={styles.articleReadTime}>
                    <MaterialIcons name="schedule" size={14} color={isDark ? '#666' : '#999'} />
                    <Text style={[styles.articleReadTimeText, { color: isDark ? '#666' : '#999' }]}>
                      {article.readTime}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
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
          <MaterialIcons name="grid-view" size={26} color="#999" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('plan')}
        >
          <MaterialIcons name="calendar-today" size={26} color="#999" />
          <Text style={styles.navLabel}>Plan</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navFab}
          onPress={() => handleNavigation('camera')}
        >
          <View style={[styles.fabButton, { 
            backgroundColor: theme.primary,
          }]}>
            <MaterialIcons name="photo-camera" size={32} color={isDark ? theme.background : '#0d1c17'} />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
        >
          <MaterialIcons name="menu-book" size={26} color={theme.primary} />
          <Text style={[styles.navLabelActive, { color: theme.primary }]}>Library</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('profile')}
        >
          <MaterialIcons name="person" size={26} color="#999" />
          <Text style={styles.navLabel}>Profile</Text>
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
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
  },
  searchBar: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  searchIcon: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  categoryChip: {
    height: 44,
    paddingHorizontal: 24,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginRight: 8,
  },
  categoryLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  featuredCard: {
    width: '100%',
    aspectRatio: 16/10,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featuredGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(13, 242, 166, 0.9)',
    borderRadius: 8,
    marginBottom: 12,
  },
  featuredBadgeText: {
    fontSize: 10,
    fontFamily: 'Inter_800ExtraBold',
    color: '#0d1c17',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  featuredTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    marginBottom: 8,
    lineHeight: 30,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  featuredReadTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featuredReadTimeText: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    color: '#ddd',
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#999',
  },
  featuredAuthor: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: '#ddd',
  },
  aiPromoBanner: {
    padding: 24,
    borderRadius: 24,
    marginBottom: 24,
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden',
  },
  aiPromoGlow1: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#0df2a6',
    opacity: 0.2,
    transform: [{ translateX: 64 }, { translateY: -64 }],
  },
  aiPromoGlow2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#3b82f6',
    opacity: 0.2,
    transform: [{ translateX: -48 }, { translateY: 48 }],
  },
  aiPromoContent: {
    flex: 1,
    paddingRight: 16,
  },
  aiPromoTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    marginBottom: 6,
  },
  aiPromoDescription: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#999',
    marginBottom: 16,
    lineHeight: 20,
  },
  aiPromoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  aiPromoButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  aiPromoIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  articlesSection: {
    marginBottom: 24,
  },
  articlesSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articlesList: {
    gap: 16,
  },
  articleCard: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  articleImage: {
    width: 96,
    height: 96,
    borderRadius: 12,
  },
  articleContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  articleCategory: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  articleTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    lineHeight: 22,
    marginBottom: 8,
  },
  articleReadTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  articleReadTimeText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
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
    paddingTop: 8,
    paddingBottom: 20,
    borderTopWidth: 1,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
  },
  navLabel: {
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
    color: '#999',
    marginTop: 4,
  },
  navLabelActive: {
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    marginTop: 4,
  },
  navFab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,
  },
});

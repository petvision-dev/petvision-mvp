import React from 'react';
import { Tabs } from 'expo-router';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '@/components/ThemeProvider';

// Custom tab bar icon component
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
  size?: number;
}) {
  const { name, color, size = 24 } = props;
  return <MaterialIcons name={name} size={size} color={color} />;
}

export default function TabLayout() {
  const { theme, isDark } = useTheme();

  // Custom tab bar style
  const tabBarStyle = {
    backgroundColor: theme.surface,
    borderTopWidth: 1,
    borderTopColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
    height: 80,
    paddingBottom: 20,
    paddingTop: 8,
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: tabBarStyle,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: 'Inter_500Medium',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tracker"
        options={{
          title: 'Tracker',
          tabBarIcon: ({ color }) => <TabBarIcon name="favorite" color={color} />,
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: theme.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -24,
              borderWidth: 4,
              borderColor: isDark ? theme.background : theme.surface,
            }}>
              <TabBarIcon name="photo-camera" color={isDark ? theme.background : '#0d1c17'} size={32} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: 'Library',
          tabBarIcon: ({ color }) => <TabBarIcon name="menu-book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}

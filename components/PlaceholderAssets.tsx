import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from './ThemeProvider';

// This component provides placeholder images for the app
// until real images are available

interface PlaceholderImageProps {
  type: 'pet' | 'user' | 'background' | 'article' | 'condition';
  width?: number;
  height?: number;
  iconSize?: number;
  style?: any;
}

export function PlaceholderImage({ type, width = 100, height = 100, iconSize = 40, style }: PlaceholderImageProps) {
  const { theme, isDark } = useTheme();
  
  // Determine background color and icon based on type
  let backgroundColor = isDark ? '#162b24' : '#e6f7f2';
  let icon: React.ComponentProps<typeof MaterialIcons>['name'] = 'image';
  
  switch (type) {
    case 'pet':
      icon = 'pets';
      break;
    case 'user':
      icon = 'person';
      break;
    case 'background':
      backgroundColor = isDark ? '#10221c' : '#f5f8f7';
      icon = 'landscape';
      break;
    case 'article':
      icon = 'description';
      break;
    case 'condition':
      icon = 'healing';
      break;
    default:
      break;
  }
  
  return (
    <View 
      style={[
        styles.container, 
        { 
          width, 
          height, 
          backgroundColor,
          ...style 
        }
      ]}
    >
      <MaterialIcons name={icon} size={iconSize} color={theme.primary} />
    </View>
  );
}

// Specific placeholder components for common use cases
export function PetProfileImage({ size = 80, style = {} }: { size?: number, style?: any }) {
  return <PlaceholderImage type="pet" width={size} height={size} style={{ borderRadius: size / 2, ...style }} />;
}

export function UserProfileImage({ size = 80, style = {} }: { size?: number, style?: any }) {
  return <PlaceholderImage type="user" width={size} height={size} style={{ borderRadius: size / 2, ...style }} />;
}

export function BackgroundImage({ width = "100%", height = 200, style = {} }: { width?: any, height?: number, style?: any }) {
  return <PlaceholderImage type="background" width={width} height={height} style={style} />;
}

export function ArticleImage({ width = 100, height = 100, style = {} }: { width?: number, height?: number, style?: any }) {
  return <PlaceholderImage type="article" width={width} height={height} style={{ borderRadius: 8, ...style }} />;
}

export function ConditionImage({ width = 100, height = 100, style = {} }: { width?: number, height?: number, style?: any }) {
  return <PlaceholderImage type="condition" width={width} height={height} style={{ borderRadius: 8, ...style }} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

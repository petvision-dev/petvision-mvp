import { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import Colors from '../constants/Colors';

// Define the theme context type
type ThemeContextType = {
  theme: typeof Colors.light;
  isDark: boolean;
  toggleTheme: () => void;
};

// Create the theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Get the device color scheme
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  
  // Update theme when device color scheme changes
  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);
  
  // Toggle theme function
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  
  // Current theme based on dark mode state
  const theme = isDark ? Colors.dark : Colors.light;
  
  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use the theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';  // Using useRouter from expo-router
import { useUnistyles } from 'react-native-unistyles'; // Using useUnistyles for consistent theming
import { StyleSheet } from 'react-native-unistyles';


interface TabBarContainerProps {}

const UITabBarContainer = () => {
  const router = useRouter();  // Using useRouter hook
  const pathname = usePathname();  // Get the current path to highlight active tab
  const { theme } = useUnistyles();  // Use the theme from unistyles
  
  // Function to get the icon color based on the current path
  const getTabBarIconColor = (tabName: string) => {
    console.log(pathname);  // For debugging: check the current path
    // Check if the current path matches the tab name (case insensitive)
    return pathname?.toLowerCase().includes(tabName.toLowerCase()) 
      ? theme.colors.cramly // If it's active, return cramly color
      : 'black';  // Otherwise, return default color (black)
  };

  return (
    <View style={styles.tabBarContainer}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => router.push('/dashboard/notes')}  // Navigate to the Notes screen
      >
        <Ionicons 
          name="document-text-outline" 
          size={30} 
          color={getTabBarIconColor('Notes')} // Apply color based on active state
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => router.push('/dashboard')}  // Navigate to the Chat screen
      >
        <Ionicons 
          name="chatbubble-ellipses-outline" 
          size={30} 
          color={getTabBarIconColor('Chat')} // Apply color based on active state
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => router.push('/dashboard/tests')}  // Navigate to the Tests screen
      >
        <Ionicons 
          name="flask-outline" 
          size={30} 
          color={getTabBarIconColor('Tests')} // Apply color based on active state
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create((theme)=>({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: theme.s(60), 
    paddingBottom: theme.s(5), 
    backgroundColor:'white'
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default UITabBarContainer;

import "../theme/theme"
import { Stack } from 'expo-router';
import { View, Text, SafeAreaView } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller'; // Import the KeyboardProvider

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Wrap the whole layout with KeyboardProvider */}
      <KeyboardProvider>
        <Stack
          screenOptions={{
            headerShown: false, // Hides the header for every screen
          }}
        />
      </KeyboardProvider>
    </SafeAreaView>
  );
}

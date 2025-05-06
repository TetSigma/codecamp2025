import "../theme/theme"
import { Stack } from 'expo-router';
import { View, Text, SafeAreaView } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardProvider>
        <Stack
          screenOptions={{
            headerShown: false, 
          }}
        />
      </KeyboardProvider>
    </SafeAreaView>
  );
}

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}

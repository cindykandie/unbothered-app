import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
        <Stack.Screen name="return" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="notes" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="challenges/index" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="challenges/unbothered/index" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="challenges/unbothered/previous-days" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="challenges/unbothered/[id]" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="challenges/softening-the-need-to-win/index" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="challenges/softening-the-need-to-win/previous-days" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="challenges/softening-the-need-to-win/[id]" options={{ animation: 'slide_from_right' }} />
      </Stack>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});

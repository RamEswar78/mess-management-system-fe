import { Stack } from 'expo-router';
import React from 'react';
export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="(student)" options={{ title: 'Home' }} />
      <Stack.Screen name="(coordinator)" options={{ title: 'About' }} />
    </Stack>
  );
}

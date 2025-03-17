// app/personalize.tsx
import React from 'react';
import WelcomeSreen2 from '../screens/welcomeScreen/welcomeScreen2';
import { Stack } from 'expo-router';

export default function Personalize() {
  return (
    <Stack.Screen
      options={{
        headerShown: false,
      }}
    />
  );
}

export default function PersonalizeScreenWrapper() {
  return <WelcomeSreen2 />;
}
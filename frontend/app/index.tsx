
// app/index.tsx
import React from 'react';
import WelcomeScreen from '../src/screens/WelcomeScreen/WelcomeScreen1';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeStackNavigation from '@/src/navigation/WelcomeStackNavigation';



export default function Index() {
  return  (
    <NavigationContainer>
      <WelcomeStackNavigation />
    </NavigationContainer> 
  );
}

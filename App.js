import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootStack from './navigation/RootStack';
import { FavoriteProvider } from './context/FavoriteContext';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <FavoriteProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </FavoriteProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
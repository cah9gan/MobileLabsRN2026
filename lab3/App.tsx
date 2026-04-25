import 'react-native-gesture-handler';
import React from 'react';
import './global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GameProvider, useGame } from './src/context/GameContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MainScreen from './src/screens/MainScreen';
import ChallengesScreen from './src/screens/ChallengesScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

function AppContent() {
  const { theme } = useGame();
  const isDark = theme === 'dark';

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerStyle: { backgroundColor: isDark ? '#111' : '#fff' },
        headerTintColor: isDark ? '#fff' : '#000',
        tabBarStyle: { backgroundColor: isDark ? '#111' : '#fff' }
      }}>
        <Tab.Screen name="Clicker" component={MainScreen} />
        <Tab.Screen name="Challenges" component={ChallengesScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <GameProvider>
          <AppContent />
        </GameProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
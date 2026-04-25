import 'react-native-gesture-handler'; // Завжди залишаємо першим рядком
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Вбудовані іконки Expo
import { useColorScheme } from 'react-native';

// Імпортуємо наші екрани (переконайся, що ти створив ці файли)
import CameraScreen from './src/CameraScreen';
import MapScreen from './src/MapScreen';
import SettingsScreen from './src/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  // Використовуємо хук з React Native для визначення теми
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Налаштування іконок для кожного екрану
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Камера') {
              iconName = focused ? 'camera' : 'camera-outline';
            } else if (route.name === 'Карта') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Налаштування') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#3b82f6', // Синій колір (blue-500) для активного табу
          tabBarInactiveTintColor: 'gray',
          // Динамічна зміна кольорів хедера та нижньої панелі залежно від теми
          headerStyle: { backgroundColor: isDark ? '#111827' : '#ffffff' }, // gray-900 або white
          headerTintColor: isDark ? '#ffffff' : '#000000',
          tabBarStyle: { backgroundColor: isDark ? '#111827' : '#ffffff', borderTopWidth: 0 },
        })}
      >
        <Tab.Screen name="Камера" component={CameraScreen} />
        <Tab.Screen name="Карта" component={MapScreen} />
        <Tab.Screen name="Налаштування" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
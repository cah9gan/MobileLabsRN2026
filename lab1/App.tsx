import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Глобальный Header */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://ztu.edu.ua/wp-content/uploads/2020/05/logo_ztu_ukr.png' }} 
          style={styles.logo} 
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>FirstMobileApp</Text>
      </View>

      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={({ route }) => ({ 
            headerShown: false, 
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: '#007bff', 
            tabBarInactiveTintColor: 'gray',
            tabBarIcon: ({ focused, color, size }) => {
              // Сразу задаем значение по умолчанию, чтобы TypeScript был спокоен
              let iconName: keyof typeof Ionicons.glyphMap = 'help-circle-outline';

              if (route.name === 'Головна') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Фотогалерея') {
                iconName = focused ? 'images' : 'images-outline';
              } else if (route.name === 'Профіль') {
                iconName = focused ? 'person' : 'person-outline';
              }

              // Теперь переменная 100% имеет строку, и ошибки не будет
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Головна" component={HomeScreen} />
          <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
          <Tab.Screen name="Профіль" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>

      {/* Глобальный Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Ганчевський Олександр Олександрович, група ІПЗ-22-2</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  logo: { width: 150, height: 40 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 10 },
  tabBar: { backgroundColor: '#f8f8f8', paddingBottom: 5 },
  footer: { padding: 15, backgroundColor: '#f1f1f1', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#ccc' },
  footerText: { fontSize: 12, color: '#555', fontStyle: 'italic' }
});
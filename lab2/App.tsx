import 'react-native-gesture-handler';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MainScreen from './src/screens/MainScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ContactsScreen from './src/screens/ContactsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  return (
    // Устранение двойного header-a: отключаем хедер у Stack, так как он есть у Drawer
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
      {/* Для экрана деталей включаем хедер обратно, чтобы появилась кнопка "Назад" */}
      <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 10 }}>
        <Image 
          source={{ uri: 'https://ui-avatars.com/api/?name=Олександр+Ганчевський&background=0D8ABC&color=fff' }} 
          style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }} 
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Олександр Ганчевський</Text>
        <Text style={{ color: 'gray', marginTop: 5 }}>Група ІПЗ-22-2</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator drawerContent={CustomDrawerContent}>
            <Drawer.Screen name="Новини" component={HomeStack} />
            <Drawer.Screen name="Контакти" component={ContactsScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
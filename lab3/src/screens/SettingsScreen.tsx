import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useGame } from '../context/GameContext';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useGame();
  const isDark = theme === 'dark';

  return (
    <View className={`flex-1 items-center p-5 pt-10 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <View className={`w-full p-4 rounded-xl flex-row justify-between items-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
          Темна тема
        </Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
        />
      </View>
    </View>
  );
}
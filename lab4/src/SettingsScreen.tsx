import React from 'react';
import { View, Text, Switch, StyleSheet, useColorScheme, Appearance } from 'react-native';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const toggleColorScheme = () => {
    Appearance.setColorScheme(isDark ? 'light' : 'dark');
  };

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
        <Text style={[styles.text, isDark ? styles.textDark : styles.textLight]}>
          Темна тема
        </Text>
        <Switch
          value={isDark}
          onValueChange={toggleColorScheme}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  containerLight: { backgroundColor: '#f3f4f6' },
  containerDark: { backgroundColor: '#111827' },
  card: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardLight: { backgroundColor: '#ffffff' },
  cardDark: { backgroundColor: '#1f2937' },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textLight: { color: '#000000' },
  textDark: { color: '#ffffff' },
});
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

export default function GalleryScreen() {
  const data = Array(10).fill({ id: Math.random().toString() });

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={() => <View style={styles.photoPlaceholder} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 5, backgroundColor: '#fff' },
  photoPlaceholder: {
    flex: 1,
    height: 150,
    margin: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  }
});
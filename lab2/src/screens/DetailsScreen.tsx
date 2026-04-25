import React, { useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function DetailsScreen({ route, navigation }: any) {
  const { item } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ title: item.title });
  }, [navigation, item.title]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 15 },
  image: { width: '100%', height: 250, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  desc: { fontSize: 16, lineHeight: 24, color: '#333' }
});
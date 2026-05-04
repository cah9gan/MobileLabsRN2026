import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { PRODUCTS } from '../../../data/products';

export default function Details() {
  const { id } = useLocalSearchParams(); 
  
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) return <Text style={styles.container}>Товар не знайдено</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{product.image}</Text>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.desc}>{product.desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  icon: { fontSize: 100, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold' },
  price: { fontSize: 20, color: 'green', marginVertical: 10 },
  desc: { fontSize: 16, textAlign: 'center', color: '#555' }
});
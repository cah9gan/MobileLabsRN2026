import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { PRODUCTS } from '../../data/products';

export default function Catalog() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Button title="Вийти" onPress={logout} color="red"/>
      <FlatList data={PRODUCTS} keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/details/${item.id}`} asChild>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.icon}>{item.image}</Text>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: '#ccc', alignItems: 'center' },
  icon: { fontSize: 40, marginRight: 15 },
  name: { fontSize: 18, fontWeight: 'bold' },
  price: { color: 'green', marginTop: 5 }
});
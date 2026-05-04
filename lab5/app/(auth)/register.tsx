import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const { register } = useAuth();

  const handleRegister = () => {
    register();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>
      <TextInput placeholder="Ім'я" style={styles.input}/>
      <TextInput placeholder="Email" style={styles.input}/>
      <TextInput placeholder="Пароль" secureTextEntry style={styles.input}/>
      <Button title="Зареєструватися" onPress={handleRegister}/>
      <Link href="/login" style={styles.link}>Вже є акаунт? Увійти</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  link: { color: 'blue', marginTop: 15, textAlign: 'center' }
});
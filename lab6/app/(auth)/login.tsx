import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Помилка', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вхід</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none"/>
      <TextInput placeholder="Пароль" value={password} onChangeText={setPassword} secureTextEntry style={styles.input}/>
      <Button title="Увійти" onPress={handleLogin}/>
      <Link href="/register" style={styles.link}>Немає акаунту? Реєстрація</Link>
      <Link href="/reset" style={styles.link}>Забули пароль?</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5, color: '#000', backgroundColor: '#fff' },
  link: { color: 'blue', marginTop: 15, textAlign: 'center' }
});
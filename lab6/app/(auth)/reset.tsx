import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const { resetPassword } = useAuth();

  const handleReset = async () => {
    try {
      await resetPassword(email);
      Alert.alert('Успіх', 'Лист для скидання пароля надіслано!');
      router.replace('/login');
    } catch (error: any) {
      Alert.alert('Помилка', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Відновлення пароля</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none"/>
      <Button title="Відправити лист" onPress={handleReset}/>
      <Link href="/login" style={styles.link}>Повернутися до входу</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5, color: '#000', backgroundColor: '#fff' },
  link: { color: 'blue', marginTop: 15, textAlign: 'center' }
});
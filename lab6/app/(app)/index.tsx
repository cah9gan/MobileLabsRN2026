import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { db } from '../../src/config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Profile() {
  const { user, logout, deleteAccount } = useAuth();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [passwordForDelete, setPasswordForDelete] = useState('');

  // Завантажуємо дані профілю
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name || '');
        setAge(data.age || '');
        setCity(data.city || '');
      }
    };
    fetchProfile();
  }, [user]);

  // Зберігаємо дані в Firestore (валідація по uid)
  const handleSave = async () => {
    try {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, { name, age, city }, { merge: true });
      Alert.alert('Успіх', 'Профіль збережено!');
    } catch (error: any) {
      Alert.alert('Помилка', error.message);
    }
  };

  // Видалення акаунта
  const handleDelete = async () => {
    if (!passwordForDelete) {
      Alert.alert('Увага', 'Введіть пароль для підтвердження видалення.');
      return;
    }
    Alert.alert('Підтвердження', 'Ви впевнені?', [
      { text: 'Скасувати', style: 'cancel' },
      { text: 'Видалити', style: 'destructive', onPress: async () => {
        try {
          await deleteAccount(passwordForDelete);
          // Вийде автоматично через onAuthStateChanged
        } catch (error: any) {
          Alert.alert('Помилка видалення', error.message);
        }
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Мій Профіль</Text>
      
      <Text style={styles.label}>Email: {user?.email}</Text>
      <TextInput placeholder="Ім'я" value={name} onChangeText={setName} style={styles.input}/>
      <TextInput placeholder="Вік" value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input}/>
      <TextInput placeholder="Місто" value={city} onChangeText={setCity} style={styles.input}/>
      
      <Button title="Зберегти дані" onPress={handleSave}/>
      
      <View style={styles.divider}/>
      
      <TextInput placeholder="Пароль для видалення акаунта" value={passwordForDelete} onChangeText={setPasswordForDelete} secureTextEntry style={styles.input}/>
      <Button title="Видалити акаунт" color="red" onPress={handleDelete}/>
      
      <View style={styles.divider}/>
      
      <Button title="Вийти" color="gray" onPress={logout}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 10, color: 'gray' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5, color: '#000', backgroundColor: '#fff' },
  divider: { height: 20 }
});
import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>
      
      <Text style={styles.label}>Електронна пошта</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Пароль</Text>
      <TextInput style={styles.input} secureTextEntry />

      <Text style={styles.label}>Пароль (ще раз)</Text>
      <TextInput style={styles.input} secureTextEntry />

      <Text style={styles.label}>Прізвище</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Ім'я</Text>
      <TextInput style={styles.input} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Зареєструватися</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 14, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen() {
  const news = Array(6).fill({ title: 'Заголовок новини', date: 'Дата новини', text: 'Короткий текст новини' });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Новини</Text>
      {news.map((item, index) => (
        <View key={index} style={styles.newsCard}>
          <Text style={styles.newsTitle}>{item.title}</Text>
          <Text style={styles.newsDate}>{item.date}</Text>
          <Text style={styles.newsText}>{item.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  pageTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  newsCard: { padding: 15, marginBottom: 10, backgroundColor: '#f9f9f9', borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
  newsTitle: { fontSize: 16, fontWeight: 'bold' },
  newsDate: { fontSize: 12, color: '#888', marginTop: 4 },
  newsText: { fontSize: 14, marginTop: 8 },
});
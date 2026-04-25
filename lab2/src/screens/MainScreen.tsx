import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { initialNews, NewsItem } from '../data/news';

export default function MainScreen({ navigation }: any) {
  const [news, setNews] = useState(initialNews);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setNews([{ id: Date.now().toString(), title: 'Нова гаряча подія!', description: 'Стрічку щойно оновлено.', image: 'https://picsum.photos/seed/picsum/400/200' }, ...initialNews]);
      setRefreshing(false);
    }, 1500);
  };

  const loadMore = () => {
    const moreNews = [
      { id: Date.now().toString() + '1', title: 'Архівна новина 1', description: 'Завантажено з архіву.', image: 'https://picsum.photos/seed/1/400/200' },
      { id: Date.now().toString() + '2', title: 'Архівна новина 2', description: 'Завантажено з архіву.', image: 'https://picsum.photos/seed/2/400/200' },
    ];
    setNews(prev => [...prev, ...moreNews]);
  };

  const renderItem = ({ item }: { item: NewsItem }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('Details', { item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={news}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={<Text style={styles.headerTitle}>Останні події</Text>}
      ListFooterComponent={<ActivityIndicator size="small" color="#0000ff" style={{ margin: 20 }} />}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={5}
      contentContainerStyle={{ padding: 15 }}
    />
  );
}

const styles = StyleSheet.create({
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  card: { backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden', elevation: 3 },
  image: { width: '100%', height: 150 },
  textContainer: { padding: 15 },
  title: { fontSize: 18, fontWeight: 'bold' },
  desc: { color: '#666', marginTop: 5 }
});
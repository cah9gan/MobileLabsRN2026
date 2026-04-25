import React from 'react';
import { SectionList, Text, View, StyleSheet } from 'react-native';
import { contactsData } from '../data/contacts';

export default function ContactsScreen() {
  return (
    <SectionList
      sections={contactsData}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item}</Text>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={{ padding: 15 }}
    />
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 20, fontWeight: 'bold', backgroundColor: '#e9ecef', paddingVertical: 8, paddingHorizontal: 10, marginTop: 10, borderRadius: 5 },
  item: { paddingVertical: 15, paddingHorizontal: 15 },
  itemText: { fontSize: 16 },
  separator: { height: 1, backgroundColor: '#e0e0e0', marginLeft: 15 }
});
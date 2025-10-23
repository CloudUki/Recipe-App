import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for recipes..."
        onChangeText={setQuery}
        value={query}
        onSubmitEditing={handleSearch}
        onIconPress={handleSearch}
        style={styles.searchbar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchbar: {
    elevation: 2,
  },
});
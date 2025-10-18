import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function RecipeCard({ recipe, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{recipe.title}</Text>
        <View style={styles.info}>
          <Text style={styles.infoText}>⏱️ {recipe.readyInMinutes} min</Text>
          <Text style={styles.infoText}>🍽️ {recipe.servings} servings</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    color: '#666',
    fontSize: 14,
  },
});
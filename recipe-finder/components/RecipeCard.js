import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function RecipeCard({ recipe, onPress }) {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Cover source={{ uri: recipe.image }} style={styles.image} />
      <Card.Content style={styles.content}>
        <Text variant="titleMedium" numberOfLines={2} style={styles.title}>
          {recipe.title}
        </Text>
        <Text variant="bodySmall" style={styles.info}>
          ⏱️ {recipe.readyInMinutes} min  •  🍽️ {recipe.servings} servings
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 3,
  },
  image: {
    height: 180,
  },
  content: {
    paddingTop: 12,
  },
  title: {
    marginBottom: 8,
  },
  info: {
    color: '#666',
  },
});
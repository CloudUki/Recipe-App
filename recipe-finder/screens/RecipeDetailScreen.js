import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRecipeDetails } from '../services/recipeAPI';

export default function RecipeDetailScreen({ route, navigation }) {
  const id = route?.params?.id;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('No recipe ID provided');
      setLoading(false);
      return;
    }
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    try {
      const data = await getRecipeDetails(id);
      setRecipe(data);
    } catch (error) {
      console.error('Error loading recipe:', error);
      setError('Failed to load recipe');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading recipe...</Text>
      </SafeAreaView>
    );
  }

  if (error || !id) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>{error || 'Invalid recipe'}</Text>
      </SafeAreaView>
    );
  }

  if (!recipe) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>Recipe not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        
        <View style={styles.content}>
          <Text style={styles.title}>{recipe.title}</Text>
          
          <View style={styles.meta}>
            <Text style={styles.metaText}>
              ⏱️ {recipe.readyInMinutes || 'N/A'} min
            </Text>
            <Text style={styles.metaText}>
              🍽️ {recipe.servings || 'N/A'} servings
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 ? (
              recipe.extendedIngredients.map((ing, index) => (
                <Text key={index} style={styles.ingredient}>
                  • {ing.original}
                </Text>
              ))
            ) : (
              <Text style={styles.noData}>No ingredients available</Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.instructions}>
              {recipe.instructions?.replace(/<[^>]*>/g, '') || 'No instructions available'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#d00',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  meta: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  metaText: {
    color: '#666',
    fontSize: 16,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 5,
    lineHeight: 24,
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  noData: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
});
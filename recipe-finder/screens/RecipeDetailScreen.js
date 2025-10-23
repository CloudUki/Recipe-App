import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, Divider, Chip } from 'react-native-paper';
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
        <ActivityIndicator size="large" animating={true} color="#2563eb" />
        <Text style={styles.loadingText}>Loading recipe...</Text>
      </SafeAreaView>
    );
  }

  if (error || !id) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text variant="titleMedium" style={styles.errorText}>
          {error || 'Invalid recipe'}
        </Text>
      </SafeAreaView>
    );
  }

  if (!recipe) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text variant="titleMedium" style={styles.errorText}>
          Recipe not found
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        
        <View style={styles.content}>
          <Text variant="headlineMedium" style={styles.title}>
            {recipe.title}
          </Text>
          
          <View style={styles.metaContainer}>
            <Chip icon="clock-outline" style={styles.chip}>
              {recipe.readyInMinutes || 'N/A'} min
            </Chip>
            <Chip icon="silverware-fork-knife" style={styles.chip}>
              {recipe.servings || 'N/A'} servings
            </Chip>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.section}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Ingredients
            </Text>
            {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 ? (
              recipe.extendedIngredients.map((ing, index) => (
                <Text key={index} variant="bodyMedium" style={styles.ingredient}>
                  • {ing.original}
                </Text>
              ))
            ) : (
              <Text variant="bodyMedium" style={styles.noData}>
                No ingredients available
              </Text>
            )}
          </View>

          <Divider style={styles.divider} />

          <View style={styles.section}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Instructions
            </Text>
            <Text variant="bodyMedium" style={styles.instructions}>
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
    marginTop: 16,
    color: '#666',
  },
  errorText: {
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
    marginBottom: 16,
    fontWeight: 'bold',
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  chip: {
    backgroundColor: '#e3f2fd',
  },
  divider: {
    marginVertical: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: 'bold',
  },
  ingredient: {
    marginBottom: 4,
    lineHeight: 24,
  },
  instructions: {
    lineHeight: 24,
    color: '#333',
  },
  noData: {
    color: '#999',
    fontStyle: 'italic',
  },
});
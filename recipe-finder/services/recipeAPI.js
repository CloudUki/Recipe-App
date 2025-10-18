import axios from 'axios';
import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig.extra.apiKey;
const BASE_URL = 'https://api.spoonacular.com';

export const searchRecipes = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
      params: {
        apiKey: API_KEY,
        query: query,
        addRecipeInformation: true,
        number: 50,
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getRecipeDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/${id}/information`, {
      params: { apiKey: API_KEY }
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
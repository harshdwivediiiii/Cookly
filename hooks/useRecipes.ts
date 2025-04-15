import { useState, useEffect } from 'react';  // <-- Import useState and useEffect

interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  // Add other recipe-specific fields
}

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);  // Type recipes as an array of Recipe objects
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch('/api/recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);  // Empty dependency array ensures the effect runs only once when the component mounts

  const addRecipe = (recipe: Recipe) => {
    setRecipes([...recipes, recipe]);
  };

  const updateRecipe = (id: string, updatedRecipe: Recipe) => {
    setRecipes(recipes.map(recipe => (recipe.id === id ? updatedRecipe : recipe)));
  };

  const deleteRecipe = (id: string) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  return { recipes, loading, addRecipe, updateRecipe, deleteRecipe };
}

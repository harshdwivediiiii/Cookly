// lib/recipeActions.ts
import { connectToDatabase } from "./db";
import { ObjectId } from "mongodb";

// Define a type for Recipe and Review
interface Review {
  rating: number;
  comment: string;
}

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string;
  category: string;
  averageRating?: number;
  reviews?: Review[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Create a recipe
export async function createRecipe(recipe: Recipe) {
  validateRecipe(recipe);
  const db = await connectToDatabase();
  const recipes = db.collection("recipes");

  const newRecipe = {
    ...recipe,
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: recipe.reviews || [],
    averageRating: recipe.averageRating || 0,
  };

  const result = await recipes.insertOne(newRecipe);
  return result;
}

// Get all recipes with pagination
export async function getRecipes(page: number = 1, limit: number = 10) {
  const db = await connectToDatabase();
  const recipes = db.collection("recipes");

  const skip = (page - 1) * limit;
  const result = await recipes.find().skip(skip).limit(limit).toArray();

  const totalCount = await recipes.countDocuments();

  return {
    data: result,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
    totalCount,
  };
}

// Search recipes by name or ingredients
export async function searchRecipes(query: string) {
  const db = await connectToDatabase();
  const recipes = db.collection("recipes");

  const regex = new RegExp(query, "i");

  const result = await recipes.find({
    $or: [
      { name: { $regex: regex } },
      { ingredients: { $regex: regex } },
    ],
  }).toArray();

  return result;
}

// Get a recipe by ID
export async function getRecipeById(id: string) {
  const db = await connectToDatabase();
  const recipes = db.collection("recipes");
  return await recipes.findOne({ _id: new ObjectId(id) });
}

// Update a recipe by ID
export async function updateRecipe(id: string, updatedRecipe: Recipe) {
  const db = await connectToDatabase();
  const recipes = db.collection("recipes");

  const recipeToUpdate = {
    ...updatedRecipe,
    updatedAt: new Date(),
  };

  return await recipes.updateOne(
    { _id: new ObjectId(id) },
    { $set: recipeToUpdate }
  );
}

// Delete a recipe by ID
export async function deleteRecipe(id: string) {
  const db = await connectToDatabase();
  const recipes = db.collection("recipes");
  return await recipes.deleteOne({ _id: new ObjectId(id) });
}

// ✅ Add a review and rating for a recipe
export async function addReviewToRecipe(id: string, review: Review) {
  const db = await connectToDatabase();
  const recipes = db.collection<Recipe>("recipes");

  await recipes.updateOne(
    { _id: new ObjectId(id) },
    {
      $push: {
        reviews: {
          rating: review.rating,
          comment: review.comment,
        }
      },
      $set: { updatedAt: new Date() }
    }
  );

  // Recalculate average rating
  const averageRating = await calculateAverageRating(id);

  // Update average rating
  await recipes.updateOne(
    { _id: new ObjectId(id) },
    { $set: { averageRating } }
  );

  return { success: true, averageRating };
}

// Helper function to calculate the average rating
async function calculateAverageRating(id: string): Promise<number> {
  const db = await connectToDatabase();
  const recipes = db.collection("recipes");

  const recipe = await recipes.findOne({ _id: new ObjectId(id) });
  if (!recipe || !recipe.reviews || recipe.reviews.length === 0) return 0;

  const totalRating = recipe.reviews.reduce((acc: number, review: Review) => acc + review.rating, 0);
  return totalRating / recipe.reviews.length;
}

// Filter recipes by category
export async function filterRecipesByCategory(category: string) {
  const db = await connectToDatabase();
  const recipes = db.collection("recipes");

  const result = await recipes.find({ category }).toArray();
  return result;
}

// Sort recipes by rating (descending) or date (ascending)
export async function sortRecipes(sortBy: "rating" | "date", order: "asc" | "desc" = "desc") {
    const db = await connectToDatabase();
    const recipes = db.collection("recipes");
  
    const sortOptions: { [key: string]: 1 | -1 } = {};
  
    if (sortBy === "rating") {
      sortOptions["averageRating"] = order === "desc" ? -1 : 1;
    } else {
      sortOptions["createdAt"] = order === "desc" ? -1 : 1;
    }
  
    const result = await recipes.find().sort(sortOptions).toArray();
    return result;
  }

// Bulk insert recipes
export async function bulkInsertRecipes(recipesArray: Recipe[]) {
  const db = await connectToDatabase();
  const recipes = db.collection("recipes");

  const result = await recipes.insertMany(
    recipesArray.map(recipe => ({
      ...recipe,
      createdAt: new Date(),
      updatedAt: new Date(),
      reviews: recipe.reviews || [],
      averageRating: recipe.averageRating || 0,
    }))
  );

  return result;
}

// Export recipes as JSON
export async function exportRecipesAsJSON() {
  const db = await connectToDatabase();
  const recipes = db.collection("recipes");

  const result = await recipes.find().toArray();
  return result;
}

// Validate recipe data before insertion
export function validateRecipe(recipe: Recipe) {
  if (!recipe.name || !recipe.ingredients || !recipe.instructions) {
    throw new Error("Missing required fields: name, ingredients, instructions");
  }
}

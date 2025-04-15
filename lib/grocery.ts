// Define types for ingredients and meals
interface Ingredient {
    name: string;
    quantity: number;
  }
  
  interface Meal {
    id: string;
    meal: string;
    ingredients: Ingredient[];
    dietaryPreferences: string[];
    dietaryRestrictions: string[];
    reviews: { rating: number; review: string }[];
  }
  
  // Categorize ingredients based on type (e.g., vegetables, proteins, dairy, etc.)
  export function categorizeIngredients(ingredientList: string[]): { [category: string]: string[] } {
    const categories = {
      grains: ["Rice", "Quinoa", "Flour", "Pasta", "Bread"],
      vegetables: ["Tomatoes", "Onions", "Potatoes", "Cauliflower", "Spinach", "Cucumber", "Carrot"],
      proteins: ["Chicken", "Paneer", "Eggs", "Chickpeas", "Tofu", "Lentils"],
      dairy: ["Yogurt", "Cheese", "Butter", "Cream"],
      spices: ["Cumin", "Coriander", "Turmeric", "Garam Masala", "Chili Powder", "Cinnamon"],
      beverages: ["Lemon", "Mint", "Almond Milk", "Tea", "Coffee"],
    };
  
    const categorized = {
      grains: [] as string[],
      vegetables: [] as string[],
      proteins: [] as string[],
      dairy: [] as string[],
      spices: [] as string[],
      beverages: [] as string[],
    };
  
    ingredientList.forEach((ingredient) => {
      for (const category in categories) {
        if (categories[category as keyof typeof categories].includes(ingredient)) {
          categorized[category as keyof typeof categorized].push(ingredient);
          break;
        }
      }
    });
  
    return categorized;
  }
  
  // Filter meals based on dietary preferences (e.g., vegetarian, vegan, gluten-free, etc.)
  export function filterMealsByDietaryPreference(meals: Meal[], dietaryPreference: string): Meal[] {
    return meals.filter((meal) => meal.dietaryPreferences.includes(dietaryPreference));
  }
  
  // Adjust ingredients and quantities based on the number of servings
  export function adjustServingSize(ingredientList: Ingredient[], servings: number): Ingredient[] {
    return ingredientList.map((ingredient) => ({
      ...ingredient,
      quantity: ingredient.quantity * servings,
    }));
  }
  
  // Add nutritional information to meals (calories, protein, fats, carbs, etc.)
  export function addNutritionalInfo(meals: Meal[]): Meal[] {
    return meals.map((meal) => ({
      ...meal,
      nutritionalInfo: {
        calories: 500, // Example data
        protein: 20,   // Example data
        fats: 10,      // Example data
        carbs: 60,     // Example data
      },
    }));
  }
  
  // Generate a shopping list with quantities for all meals in the weekly meal plan
  export function generateShoppingListWithQuantities(weeklyMeals: Meal[]): { [ingredient: string]: number } {
    const groceryList: { [ingredient: string]: number } = {};

    weeklyMeals.forEach((meal) => {
      meal.ingredients.forEach((ingredient: Ingredient) => {
        if (!groceryList[ingredient.name]) {
          groceryList[ingredient.name] = 0;
        }
        groceryList[ingredient.name] += ingredient.quantity;
      });
    });
  
    return groceryList;
  }
  
  // Suggest meals based on leftover ingredients
  export function suggestMealsForLeftovers(leftovers: string[]): { meal: string; ingredients: string[] }[] {
    const possibleMeals = [
      { meal: "Aloo Gobi", ingredients: ["Potatoes", "Cauliflower"] },
      { meal: "Paneer Butter Masala", ingredients: ["Paneer", "Tomatoes", "Cream"] },
      { meal: "Vegetable Biryani", ingredients: ["Rice", "Carrot", "Cauliflower", "Peas"] },
      // Add more possible meals here
    ];
  
    return possibleMeals.filter((meal) =>
      meal.ingredients.every((ingredient) => leftovers.includes(ingredient))
    );
  }
  
  // Generate a personalized meal plan based on user preferences (e.g., allergies, dietary restrictions)
  export function generatePersonalizedPlan(userPreferences: { allergies: string[] }, weeklyMeals: Meal[]): Meal[] {
    return weeklyMeals.filter((meal) =>
      meal.dietaryRestrictions.every((restriction) => !userPreferences.allergies.includes(restriction))
    );
  }
  
  // Rate a meal based on user feedback
  export function rateMeal(mealId: string, rating: number, review: string, meals: Meal[]): void {
    const meal = meals.find((meal) => meal.id === mealId);
    if (meal) {
      meal.reviews.push({ rating, review });
    }
  }
  
  // Provide daily meal inspiration or new recipes to try
  export function getDailyMealInspiration(): { meal: string; cuisine: string; difficulty: string } {
    const inspirations = [
      { meal: "Vegan Buddha Bowl", cuisine: "Global", difficulty: "Moderate" },
      { meal: "Vegetable Biryani", cuisine: "Indian", difficulty: "Advanced" },
      { meal: "Chole Bhature", cuisine: "Indian", difficulty: "Moderate" },
      // Add more inspirations here
    ];
    const randomIndex = Math.floor(Math.random() * inspirations.length);
    return inspirations[randomIndex];
  }
  
  // Add meal prep instructions and tips for the meals
  export function addMealPrepInstructions(meals: Meal[]): Meal[] {
    return meals.map((meal) => {
      let prepInstructions = "";
      if (meal.meal === "Biryani") {
        prepInstructions = "Soak rice before cooking, marinate chicken overnight for best results.";
      } else if (meal.meal === "Masoor Dal with Roti") {
        prepInstructions = "Soak dal for an hour before cooking.";
      }
      return {
        ...meal,
        prepInstructions,
      };
    });
  }
  
  // Generate a grocery list from the weekly meals
  export function generateGroceryList(weeklyMeals: Meal[]): string[] {
    const groceryList: string[] = [];
  
    weeklyMeals.forEach((meal) => {
      switch (meal.meal) {
        case "Spaghetti":
          groceryList.push("Pasta", "Tomato Sauce", "Parmesan");
          break;
        case "Chicken Curry":
          groceryList.push("Chicken", "Curry Powder", "Coconut Milk");
          break;
        case "Paneer Butter Masala":
          groceryList.push("Paneer", "Tomatoes", "Cream", "Garam Masala");
          break;
        case "Chole Bhature":
          groceryList.push("Chickpeas", "Flour", "Ghee");
          break;
        case "Biryani":
          groceryList.push("Rice", "Chicken", "Onions", "Yogurt", "Spices");
          break;
        // Add more cases for different meals
        default:
          break;
      }
    });
  
    return groceryList;
  }
  
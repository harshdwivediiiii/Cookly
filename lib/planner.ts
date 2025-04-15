interface Meal {
  day: string;
  meal: string;
  mealType: string;
  cuisine: string;
  difficulty: string;
  prepTime: string;
  cookTime: string;
  calories: number;
  protein: number;
  sides: string;
  customOption: string;
  occasions: string[];
}

export async function createPlanner(plannerData: Meal[]) {
  try {
    console.log("Planner created successfully:", plannerData);
    return plannerData;
  } catch (error) {
    console.error("Error creating planner:", error);
    throw new Error("Failed to create planner");
  }
}
export function  getPlanner(): Promise<Meal[]> {
  try {
    const plannerData: Meal[] = [
      // Monday
      { 
        day: "Monday", 
        meal: "Paneer Butter Masala with Naan", 
        mealType: "Vegetarian", 
        cuisine: "North Indian", 
        difficulty: "Moderate", 
        prepTime: "30 mins", 
        cookTime: "20 mins", 
        calories: 600, 
        protein: 25, 
        sides: "Raita, Salad", 
        customOption: "Can be made with tofu for vegan option", 
        occasions: ["Lunch", "Dinner"]
      },
  
      // Tuesday
      { 
        day: "Tuesday", 
        meal: "Chicken Tikka Masala with Rice", 
        mealType: "Non-Vegetarian", 
        cuisine: "North Indian", 
        difficulty: "Advanced", 
        prepTime: "45 mins", 
        cookTime: "30 mins", 
        calories: 700, 
        protein: 35, 
        sides: "Naan, Pickle", 
        customOption: "Can be made with tofu for vegan option", 
        occasions: ["Lunch", "Dinner", "Guest Gathering"]
      },
  
      // Wednesday
      { 
        day: "Wednesday", 
        meal: "Chole Bhature", 
        mealType: "Vegetarian", 
        cuisine: "North Indian", 
        difficulty: "Moderate", 
        prepTime: "1 hour", 
        cookTime: "30 mins", 
        calories: 750, 
        protein: 20, 
        sides: "Onion Salad, Pickle", 
        customOption: "No changes", 
        occasions: ["Brunch", "Lunch"]
      },
  
      // Thursday
      { 
        day: "Thursday", 
        meal: "Masoor Dal with Roti", 
        mealType: "Vegetarian", 
        cuisine: "North Indian", 
        difficulty: "Easy", 
        prepTime: "10 mins", 
        cookTime: "20 mins", 
        calories: 500, 
        protein: 18, 
        sides: "Papad, Cucumber Raita", 
        customOption: "Add ghee for a richer flavor", 
        occasions: ["Lunch", "Dinner", "Dieting"]
      },
  
      // Friday
      { 
        day: "Friday", 
        meal: "Biryani (Veg or Chicken)", 
        mealType: "Both", 
        cuisine: "Hyderabadi", 
        difficulty: "Advanced", 
        prepTime: "1 hour", 
        cookTime: "45 mins", 
        calories: 800, 
        protein: 30, 
        sides: "Raita, Boiled Eggs", 
        customOption: "Veg or Chicken available", 
        occasions: ["Lunch", "Dinner", "Guest Gathering"]
      },
  
      // Saturday
      { 
        day: "Saturday", 
        meal: "Aloo Gobi with Paratha", 
        mealType: "Vegetarian", 
        cuisine: "North Indian", 
        difficulty: "Easy", 
        prepTime: "20 mins", 
        cookTime: "30 mins", 
        calories: 550, 
        protein: 12, 
        sides: "Pickle, Raita", 
        customOption: "Add cheese for extra richness", 
        occasions: ["Brunch", "Evening Snack"]
      },
  
      // Sunday
      { 
        day: "Sunday", 
        meal: "Rogan Josh with Rice", 
        mealType: "Non-Vegetarian", 
        cuisine: "Kashmiri", 
        difficulty: "Advanced", 
        prepTime: "40 mins", 
        cookTime: "60 mins", 
        calories: 750, 
        protein: 40, 
        sides: "Salad, Pickle", 
        customOption: "Can substitute lamb with chicken", 
        occasions: ["Dinner", "Guest Gathering"]
      },
  
      // Special Meals for Dieting or Occasions
      { 
        day: "Monday", 
        meal: "Quinoa Salad with Grilled Vegetables", 
        mealType: "Vegetarian", 
        cuisine: "Modern", 
        difficulty: "Easy", 
        prepTime: "20 mins", 
        cookTime: "15 mins", 
        calories: 350, 
        protein: 10, 
        sides: "Lemon Dressing, Fresh Herbs", 
        customOption: "Can be served with grilled tofu", 
        occasions: ["Dieting", "Lunch"]
      },
  
      { 
        day: "Tuesday", 
        meal: "Fruit Smoothie Bowl", 
        mealType: "Vegetarian", 
        cuisine: "Global", 
        difficulty: "Easy", 
        prepTime: "10 mins", 
        cookTime: "0 mins", 
        calories: 250, 
        protein: 8, 
        sides: "Nuts, Seeds", 
        customOption: "Add protein powder for an extra boost", 
        occasions: ["Breakfast", "Brunch"]
      },
  
      { 
        day: "Wednesday", 
        meal: "Egg Salad Wrap", 
        mealType: "Non-Vegetarian", 
        cuisine: "Western", 
        difficulty: "Easy", 
        prepTime: "15 mins", 
        cookTime: "10 mins", 
        calories: 400, 
        protein: 20, 
        sides: "Green Salad, Yogurt", 
        customOption: "Can substitute eggs with grilled chicken", 
        occasions: ["Lunch", "Dieting"]
      },
  
      { 
        day: "Thursday", 
        meal: "Vegan Buddha Bowl", 
        mealType: "Vegan", 
        cuisine: "Global", 
        difficulty: "Moderate", 
        prepTime: "30 mins", 
        cookTime: "20 mins", 
        calories: 500, 
        protein: 15, 
        sides: "Tahini Dressing, Avocado", 
        customOption: "Can be served with roasted chickpeas", 
        occasions: ["Dinner", "Dieting"]
      },
  
      { 
        day: "Friday", 
        meal: "Chia Pudding with Berries", 
        mealType: "Vegetarian", 
        cuisine: "Global", 
        difficulty: "Easy", 
        prepTime: "5 mins", 
        cookTime: "0 mins", 
        calories: 200, 
        protein: 5, 
        sides: "Nuts, Berries", 
        customOption: "Can add honey for sweetness", 
        occasions: ["Breakfast", "Evening Snack"]
      },
  
      { 
        day: "Saturday", 
        meal: "Vegetable Samosas with Mint Chutney", 
        mealType: "Vegetarian", 
        cuisine: "Indian", 
        difficulty: "Moderate", 
        prepTime: "40 mins", 
        cookTime: "20 mins", 
        calories: 400, 
        protein: 8, 
        sides: "Mint Chutney, Green Salad", 
        customOption: "Can be made with a gluten-free wrapper", 
        occasions: ["Brunch", "Guest Gathering", "Evening Snack"]
      },
  
      { 
        day: "Sunday", 
        meal: "Homemade Lemonade", 
        mealType: "Vegetarian", 
        cuisine: "Global", 
        difficulty: "Easy", 
        prepTime: "10 mins", 
        cookTime: "0 mins", 
        calories: 150, 
        protein: 0, 
        sides: "Mint, Lemon Slices", 
        customOption: "Can add a pinch of salt for a savory version", 
        occasions: ["Beverage", "Guest Gathering"]
      }
    ];
    console.log("Fetched planner data:", plannerData);
    return Promise.resolve(plannerData); // Returning a promise that resolves to plannerData
  } catch (error) {
    console.error("Error fetching planner data:", error);
    throw new Error("Failed to retrieve planner");
  }
}
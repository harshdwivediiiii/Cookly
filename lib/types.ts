// types.ts
export interface Recipe {
    id: string;
    name: string;
    ingredients: string[];
    instructions: string;
  }
  
  export interface Planner {
    date: string;
    meals: string[];
  }
  
  export interface GroceryItem {
    name: string;
    quantity: number;
  }
  
  export interface GroceryList {
    date: string;
    items: GroceryItem[];
  }
  
  export interface Meal {
    id: string;
    name: string;
    ingredients: string[];
    instructions: string;   
  }
  
  export interface MealPlan {
    date: string;
    meals: Meal[];
  }
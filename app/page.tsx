"use client";

import { RecipeCard } from '@/components/RecipeCard';
import React from 'react';

const Page = () => {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <RecipeCard
        title="Delicious Pasta"
        ingredients={["Pasta", "Tomato Sauce", "Cheese"]}
        tags={["Italian", "Main Course"]}
        imageUrl="https://example.com/image.jpg"
        prepTime="30 minutes"
        servings={4}
        isBookmarked={false}
        onView={() => console.log("View recipe")}
        onDelete={() => console.log("Delete recipe")}
        onBookmark={() => console.log("Bookmark recipe")}
        onDuplicate={() => console.log("Duplicate recipe")}
      />
    </div>
  );
};

export default Page;

// /app/api/recipes/[id]/route.ts

import { NextResponse } from "next/server";
import { getRecipeById, updateRecipe, deleteRecipe } from "@/lib/recipeActions"; // Assuming you have these actions

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const recipe = await getRecipeById(id);
    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    return NextResponse.json(recipe);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: "Failed to retrieve recipe" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const updatedRecipe = await req.json();

  try {
    const result = await updateRecipe(id, updatedRecipe);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: "Failed to update recipe" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const result = await deleteRecipe(id);
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Recipe deleted" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: "Failed to delete recipe" }, { status: 500 });
  }
}

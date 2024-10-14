import React from "react";
import RecipeItem from "../component/RecipeItem";
import { promises as fs } from "fs";
import path from "path";
import { Recipe } from "../../types/Recipe";

type RecipeProps = {
  params: { id: string };
};

export default async function RecipeDetailPage({ params }: RecipeProps) {
  // Fetch the data from the JSON file
  const filePath = path.join(process.cwd(), "public/data/dummy.json");
  const data = await fs.readFile(filePath, "utf-8");
  const recipes: Recipe[] = JSON.parse(data).recipes;

  // Find the recipe that matches the ID in the URL
  const recipe = recipes.find((recipe) => recipe.id === parseInt(params.id));

  // Handle the case when the recipe is not found
  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>Category: {recipe.category}</p>
      <p>Rating: {recipe.rating}</p>
      <RecipeItem recipe={recipe} />
    </div>
  );
}

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
  const comments: Comment[] = JSON.parse(data).comments;

  // Find the recipe that matches the ID in the URL
  const recipe = recipes.find((recipe) => recipe.id === parseInt(params.id));

  // Handle the case when the recipe is not found
  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      <div>
        <div>
          <h1>{recipe.name}</h1>
          <p>{recipe.category}</p>
        </div>
        <div>
          <p>{recipe.rating}</p>
          Like
        </div>
      </div>
      <div>
        <h2>Used Equipment</h2>
        <ul>
          {recipe.equipment.map((equipment, index) => (
            <li key={index}>{equipment}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div>
        <div>
          <h2>Instructions</h2>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
        <div>
          <h2>Comments</h2>
          {recipe.comments.map((comment, index) => (
            <div key={index}>
              <p>
                <strong>{comment.user}:</strong>
              </p>
              <p>{comment.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

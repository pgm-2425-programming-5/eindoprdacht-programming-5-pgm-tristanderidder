import React from "react";
import { promises as fs } from "fs";
import path from "path";
import { Recipe } from "../../types/Recipe";
import styles from "./styles/RecipeDetail.module.css";

import { query } from "../../graphql/queries";
import { gql, request } from "graphql-request";


type RecipeProps = {
  params: { id: string };
};

async function fetchRecipes(): Promise<Recipe[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const dataQuery = query;

  const response: { recipes: Recipe[] } = await request(
    baseUrl + "/graphql",
    dataQuery
  );
  return response.recipes;
}

export default async function RecipeDetailPage({ params }: RecipeProps) {
  const recipes = await fetchRecipes();

  // Debug logs to inspect values
  console.log("params.id:", params.id);
  console.log("recipes:", recipes);

  
  // Ensure both are trimmed strings when comparing
  const recipe = recipes.find(
    (recipe) => recipe.documentId.toString().trim() === params.id.trim()
  );

  // Handle case when recipe is not found
  if (!recipe) {
    console.log("No matching recipe found for ID:", params.id);
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      <div className="absolute w-screen h-[50vh] z-0 "></div>
      <div
        className={`flex flex-col gap-10  relative z-[1] top-[20rem] rounded-2xl text-secondary h-screen ${styles.card}`}
      >
        <div className="flex justify-between w-3/4 m-auto my-0 mt-10">
          <div>
            <h1 className="text-3xl">{recipe.name}</h1>
            <p>{recipe.category}</p>
          </div>
          <div>
            <p>{recipe.rating}</p>
            Like
          </div>
        </div>
        <div className="w-3/4 m-auto my-0 flex flex-col gap-10">
          <div>
            <h2 className="text-2xl">Used Equipment</h2>
            <ul className="flex gap-5">
              {recipe.equipment.map((equipment, index) => (
                <li
                  className="bg-secondary rounded-2xl w-[15rem] text-primary pl-5 py-5 flex items-center text-xl"
                  key={index}
                >
                  {equipment.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl">Ingredients</h2>
            <ul className="flex gap-5">
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  className="bg-secondary rounded-2xl w-[15rem] text-primary pl-5 py-5 flex items-center text-xl"
                  key={index}
                >
                  {ingredient.amount} {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl">Instructions</h2>
              <ol>
                {recipe.instructions.map((instruction, index) => (
                  <li className="text-accent text-base" key={index}>
                    <span>
                      Step {instruction.step}: {instruction.name}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="text-2xl">Comments</h2>
              <div className="flex flex-col gap-5">
                {recipe.comments.map((comment, index) => (
                  <div
                    className="bg-secondary text-accent rounded-2xl p-5"
                    key={index}
                  >
                    <p>
                      <strong>{comment.user}:</strong>
                    </p>
                    <p>{comment.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import RecipeItem from "../component/RecipeItem";
import { promises as fs } from "fs";
import path from "path";
import { Recipe } from "../../types/Recipe";
import styles from "./styles/RecipeDetail.module.css";

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
      <div className="absolute w-screen h-[50vh] z-0 ">
        <img
          src={`/images/${recipe.image}`}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
      </div>
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
                  className="bg-secondary rounded-2xl w-[10rem] text-primary pl-5 py-5 flex items-center text-xl"
                  key={index}
                >
                  {equipment}
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
                  {ingredient}
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
                    {instruction}
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

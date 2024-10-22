import React from "react";
import { Recipe } from "@/types/Recipe";
import RecipeFilter from "./component/RecipeFilter";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { gql, request } from "graphql-request";

async function fetchRecipes(): Promise<Recipe[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const query = gql`
    query Recipes {
      recipes {
        documentId
        name
        image {
          url
        }
        rating
        instructions {
          step
          name
        }
        ingredients {
          name
          amount
        }
        comments {
          documentId
          users_permissions_user {
            username
          }
          comment
        }
      }
    }
  `;

  const data = await request("/api/graphql", query);
  return data.recipes;
};

export const fetchCache = 'force-no-store';

export default async function RecipePage(){
  const recipes = await fetchRecipes();
  
  // async function deleteRecipe(recipeId: number){
  //   "use server";

  //   if(true){
  //     try {
  //       const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  //       const response = await fetch(`${baseUrl}/api/recipes/${recipeId}`, {
  //         method: "DELETE",
  //       });
  //       if (response.ok) {
  //         revalidatePath("/recipe");
  //         redirect("/recipe");
  //       } else {
  //         console.error("Failed to delete recipe");
  //       }
  //     } catch (error) {
  //       console.error("Failed to delete recipe", error);
  //     };
  //   }
  // }

  // async function editRecipe(recipeId: number){
  //   "use server";
  //   redirect(`/recipe/${recipeId}/edit`);
  // };

  return (
    <div>
      <RecipeFilter recipes={recipes} />
    </div>
  );
}

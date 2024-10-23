"use client";
import React, { useState, useEffect } from "react";
import RecipeItem from "../component/RecipeItem";
import { Recipe } from "../../types/Recipe";
import { gql, request } from "graphql-request";
import styles from "./styles/RecipeFilter.module.css";

import { query } from "../../graphql/queries";


// Fetch function for the recipes
async function fetchRecipes(): Promise<Recipe[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  
  const dataQuery = query;


  const response: { recipes: Recipe[] } = await request(
    baseUrl + "/graphql",
    dataQuery
  );
  return response.recipes;
}

export default function RecipeFilter() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  // Function to filter recipes based on category
  function sortRecipesByCategory(
    recipes: Recipe[],
    category: string
  ): Recipe[] {
    return recipes.filter((recipe) => recipe.category === category);
  }

  // Fetch recipes when the component mounts
  useEffect(() => {
    async function getRecipes() {
      const fetchedRecipes = await fetchRecipes();
      setRecipes(fetchedRecipes);
      setFilteredRecipes(fetchedRecipes); // Initialize with all recipes
    }
    getRecipes();
  }, []);

  // Update filtered recipes when category or recipes change
  useEffect(() => {
    if (selectedCategory) {
      setFilteredRecipes(sortRecipesByCategory(recipes, selectedCategory));
    } else {
      setFilteredRecipes(recipes);
    }
  }, [selectedCategory, recipes]);

  // Get unique categories
  const uniqueCategories = Array.from(
    new Set(recipes.map((recipe) => recipe.category))
  );

  return (
    <>
      {/* Category filter */}
      <ul className="flex flex-col gap-4 mb-6 text-3xl">
        <li
          onClick={() => setSelectedCategory("")}
          className={`cursor-pointer w-fit ${selectedCategory === "" ? `font-bold text-accent ${styles.active}` : ""}`}
        >
          All
        </li>
        {uniqueCategories.map((category) => (
          <li
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`cursor-pointer w-fit ${selectedCategory === category ? `font-bold text-accent ${styles.active}` : ""}`}
          >
            {category}
          </li>
        ))}
      </ul>

      {/* Filtered recipes list */}
      <div className="flex gap-8 flex-wrap w-10/12">
        {filteredRecipes.map((recipe) => (
          <RecipeItem key={recipe.documentId} recipe={recipe} />
        ))}
      </div>
    </>
  );
}

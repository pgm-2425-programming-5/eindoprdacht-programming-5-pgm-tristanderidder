"use client";
import React, { useState, useEffect } from "react";
import RecipeItem from "../component/RecipeItem";
import { Recipe } from "../../types/Recipe";
import styles from "./styles/RecipeFilter.module.css";

type RecipeFilterProps = {
  recipes: Recipe[];
};

export default function RecipeFilter({ recipes }: RecipeFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

  function sortRecipesByCategory(
    recipes: Recipe[],
    category: string
  ): Recipe[] {
    return recipes.filter((recipe) => recipe.category === category);
  }

  useEffect(() => {
    if (selectedCategory) {
      setFilteredRecipes(sortRecipesByCategory(recipes, selectedCategory));
    } else {
      setFilteredRecipes(recipes);
    }
  }, [selectedCategory, recipes]);

  const uniqueCategories = Array.from(
    new Set(recipes.map((recipe) => recipe.category))
  );

  return (
    <>
      <ul className={`flex flex-col gap-4 mb-6 text-3xl`}>
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
            className={`cursor-pointer w- ${selectedCategory === category ? `font-bold text-accent ${styles.active}` : ""}`}
          >
            {category}
          </li>
        ))}
      </ul>

      {/* Display filtered recipes */}
      <div className="flex gap-8 flex-wrap">
        {filteredRecipes.map((recipe) => (
          <RecipeItem key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import RecipeItem from "../component/RecipeItem";
import { Recipe } from "../../types/Recipe";

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

  return (
    <>
      <select
        onChange={(e) => setSelectedCategory(e.target.value)}
        value={selectedCategory}
      >
        <option value="">All</option>
        {Array.from(new Set(recipes.map((recipe) => recipe.category))).map(
          (category) => (
            <option key={category} value={category}>
              {category}
            </option>
          )
        )}
      </select>
      <div>
        {filteredRecipes.map((recipe) => (
          <RecipeItem key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}

import React from "react";
import RecipeItem from "./component/RecipeItem";
import { promises as fs } from "fs";
import path from "path";
import { Recipe } from "../types/Recipe";
import RecipeFilter from "./component/RecipeFilter";

type RecipeProps = {
  recipes: Recipe[];
};

export default async function RecipePage() {
  return (
    <div className="flex justify-around">
      <RecipeFilter/>
    </div>
  );
}

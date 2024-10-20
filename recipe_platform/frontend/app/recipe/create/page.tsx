"use client";
import React from "react";
import CreateRecipeForm from "../component/forms/CreatePostForm";

export default function CreateRecipe() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Recipe</h1>
      <CreateRecipeForm />
    </div>
  );
}

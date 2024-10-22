"use client";
import { useState } from "react";
import { Recipe } from "../../../types/Recipe";
import { useRouter } from "next/navigation";

// Common recipe categories
const categories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Beverage",
  "Appetizer",
  "Salad",
];

export default function CreateRecipeForm() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [category, setCategory] = useState(categories[0]);
  const [rating, setRating] = useState(0);
  const [equipment, setEquipment] = useState<string[]>([""]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe: Recipe = {
      id: Date.now(),
      name,
      ingredients,
      instructions,
      rating,
      category,
      equipment,
      comments: [],
      image: ""
    };

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    try {
      const response = await fetch(`${baseUrl}/api/recipes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        const result = await response.json();
        const id = result.id || newRecipe.id;
        router.push(`/recipes/${id}`);
      } else {
        console.error("Failed to create recipe:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  // Handlers for adding/removing dynamic fields
  const handleAddField = (
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => [...prev, ""]);
  };

  const handleRemoveField = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      {/* Name field */}
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-2 font-semibold text-gray-700">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Ingredients field (dynamically add/remove fields) */}
      <div className="flex flex-col">
        <label
          htmlFor="ingredients"
          className="mb-2 font-semibold text-gray-700"
        >
          Ingredients:
        </label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={ingredient}
              onChange={(e) =>
                handleInputChange(index, e.target.value, setIngredients)
              }
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index, setIngredients)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField(setIngredients)}
          className="text-blue-500"
        >
          Add Ingredient
        </button>
      </div>

      {/* Instructions field (dynamically add/remove fields) */}
      <div className="flex flex-col">
        <label
          htmlFor="instructions"
          className="mb-2 font-semibold text-gray-700"
        >
          Instructions:
        </label>
        {instructions.map((instruction, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={instruction}
              onChange={(e) =>
                handleInputChange(index, e.target.value, setInstructions)
              }
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index, setInstructions)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField(setInstructions)}
          className="text-blue-500"
        >
          Add Instruction
        </button>
      </div>

      {/* Equipment field (dynamically add/remove fields) */}
      <div className="flex flex-col">
        <label htmlFor="equipment" className="mb-2 font-semibold text-gray-700">
          Equipment:
        </label>
        {equipment.map((equip, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={equip}
              onChange={(e) =>
                handleInputChange(index, e.target.value, setEquipment)
              }
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index, setEquipment)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField(setEquipment)}
          className="text-blue-500"
        >
          Add Equipment
        </button>
      </div>

      {/* Category dropdown */}
      <div className="flex flex-col">
        <label htmlFor="category" className="mb-2 font-semibold text-gray-700">
          Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Rating field */}
      <div className="flex flex-col">
        <label htmlFor="rating" className="mb-2 font-semibold text-gray-700">
          Rating:
        </label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="0"
          max="5"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
}

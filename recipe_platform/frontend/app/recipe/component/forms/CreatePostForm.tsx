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
  const [ingredients, setIngredients] = useState<
    { amount: string; name: string }[]
  >([{ amount: "", name: "" }]);
  const [instructions, setInstructions] = useState<
    { step: string; name: string }[]
  >([{ step: "", name: "" }]);
  const [category, setCategory] = useState(categories[0]);
  const [rating, setRating] = useState(0);
  const [equipment, setEquipment] = useState<{ name: string }[]>([
    { name: "" },
  ]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe: Recipe = {
      documentId: Date.now(), // Changed from id to documentId to match type
      name,
      ingredients,
      instructions,
      rating,
      category,
      equipment,
      comments: [],
      image: { url: "" }, // Ensure this matches the expected structure
    };

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const token = localStorage.getItem("token");
    console.log("Token:", token);

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
        const id = result.id || newRecipe.documentId; // Ensure to use documentId
        router.push(`/recipes/${id}`);
      } else {
        console.error("Failed to create recipe:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  // Handlers for adding/removing dynamic fields
  const handleAddIngredient = () => {
    setIngredients((prev) => [...prev, { amount: "", name: "" }]);
  };

  const handleAddInstruction = () => {
    setInstructions((prev) => [...prev, { step: "", name: "" }]);
  };

  const handleAddEquipment = () => {
    setEquipment((prev) => [...prev, { name: "" }]);
  };

  const handleRemoveField = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    index: number,
    field: string,
    value: string,
    setter: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value }; // Update specific field
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

      {/* Ingredients field */}
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
              value={ingredient.amount}
              onChange={(e) =>
                handleInputChange(
                  index,
                  "amount",
                  e.target.value,
                  setIngredients
                )
              }
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
              placeholder="Amount"
            />
            <input
              type="text"
              value={ingredient.name}
              onChange={(e) =>
                handleInputChange(index, "name", e.target.value, setIngredients)
              }
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
              placeholder="Ingredient Name"
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
          onClick={handleAddIngredient}
          className="text-blue-500"
        >
          Add Ingredient
        </button>
      </div>

      {/* Instructions field */}
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
              type="number"
              value={instruction.step}
              onChange={(e) =>
                handleInputChange(
                  index,
                  "step",
                  e.target.value,
                  setInstructions
                )
              }
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Step"
            />
            <input
              type="text"
              value={instruction.name}
              onChange={(e) =>
                handleInputChange(
                  index,
                  "name",
                  e.target.value,
                  setInstructions
                )
              }
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
              placeholder="Instruction"
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
          onClick={handleAddInstruction}
          className="text-blue-500"
        >
          Add Instruction
        </button>
      </div>

      {/* Equipment field */}
      <div className="flex flex-col">
        <label htmlFor="equipment" className="mb-2 font-semibold text-gray-700">
          Equipment:
        </label>
        {equipment.map((equip, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={equip.name}
              onChange={(e) =>
                handleInputChange(index, "name", e.target.value, setEquipment)
              }
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
              placeholder="Equipment Name"
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
          onClick={handleAddEquipment}
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

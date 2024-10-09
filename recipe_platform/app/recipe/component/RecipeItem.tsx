import Link from "next/link";
import { Recipe } from "../../types/Recipe";

export default function RecipeItem({ recipe }: { recipe: Recipe }) {
    return (
      <div className="p-4 md:p-6">
        <Link href={`/recipe/${recipe.id}`}>
          <p className="font-bold mb-4">
            {recipe.name}
          </p>
          <div>{recipe.rating}</div>
          <div>{recipe.category}</div>
        </Link>
      </div>
    );
};
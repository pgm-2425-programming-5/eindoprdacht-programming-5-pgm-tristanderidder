import Link from "next/link";
import { Recipe } from "../../types/Recipe";

import styles from './styles/RecipeItem.module.css';

export default function RecipeItem({ recipe }: { recipe: Recipe }) {
    return (
      <div className={`p-4 md:p-6 ${styles.card}`}>
        <Link className={styles.cardlink} href={`/recipe/${recipe.id}`}>
          <p className={`font-bold mb-4 ${styles.name}`}>{recipe.name}</p>
          <div className={styles.rating}>{recipe.rating}</div>
          <div className={styles.category}>{recipe.category}</div>
        </Link>
      </div>
    );
};
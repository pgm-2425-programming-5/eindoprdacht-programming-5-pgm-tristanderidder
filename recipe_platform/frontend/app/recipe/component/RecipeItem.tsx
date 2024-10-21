import Link from "next/link";
import { Recipe } from "../../types/Recipe";

import styles from './styles/RecipeItem.module.css';

export default function RecipeItem({ recipe }: { recipe: Recipe }) {
    return (
      <div className={`rounded-2xl ${styles.card}`}>
        <Link className={styles.cardlink} href={`/recipe/${recipe.id}`}>
          <img
            src={`/images/${recipe.image}`}
            alt={recipe.name}
            className={`rounded-2xl ${styles.image}`}
          />
          <div className={`rounded-2xl text-secondary ${styles.card_text}`}>
            <p className={`text-2xl mb-4 ${styles.name}`}>{recipe.name}</p>
            <div className={styles.rating}>{recipe.rating}</div>
            <div className={styles.category}>{recipe.category}</div>
          </div>
        </Link>
      </div>
    );
};
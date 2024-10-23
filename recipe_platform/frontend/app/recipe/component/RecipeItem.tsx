import Link from "next/link";
import { Recipe } from "../../types/Recipe";

import styles from './styles/RecipeItem.module.css';

export default function RecipeItem({ recipe }: { recipe: Recipe }) {
  // Function to generate stars based on rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating); // Full stars
    const emptyStars = 5 - fullStars; // Empty stars
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-secondary">
          ★
        </span>
      ); // Full star
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={i + fullStars} className="text-accent">
          ☆
        </span>
      ); // Empty star
    }

    return stars;
  };

  return (
    <div className={`rounded-2xl ${styles.card}`}>
      <Link className={styles.cardlink} href={`/recipe/${recipe.documentId}`}>
        <img
          src={
            recipe.image.url.startsWith("http")
              ? recipe.image.url
              : `${process.env.NEXT_PUBLIC_BASE_URL}${recipe.image.url}`
          }
          alt={recipe.name}
          className={`rounded-2xl ${styles.image}`}
        />

        <div className={`rounded-2xl text-secondary ${styles.card_text}`}>
          <p className={`text-2xl mb-4 ${styles.name}`}>{recipe.name}</p>
          <div className={styles.rating}>
            {renderStars(recipe.rating)} {/* Render the stars here */}
          </div>
          <div className={styles.category}>{recipe.category}</div>
        </div>
      </Link>
    </div>
  );
}

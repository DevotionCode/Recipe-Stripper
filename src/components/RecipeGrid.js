"use client";
import styles from "./RecipeGrid.module.css";
import { useRouter } from "next/navigation";

export default function RecipeGrid({ recipes }) {
    const router = useRouter();

    if (!recipes || recipes.length === 0) return null;

    return (
        <div className={styles.grid}>
            {recipes.map((meal) => (
                <div
                    key={meal.idMeal}
                    className={styles.card}
                    onClick={() => router.push(`/recipe/${meal.idMeal}`)}
                >
                    <div className={styles.imageWrapper}>
                        <img src={meal.strMealThumb + "/preview"} alt={meal.strMeal} className={styles.image} />
                    </div>
                    <div className={styles.info}>
                        <h3>{meal.strMeal}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}

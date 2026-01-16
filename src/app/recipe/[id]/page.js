import { getRecipeById } from "@/lib/api";
import Link from "next/link";
import styles from "./page.module.css";

export default async function RecipePage({ params }) {
    const { id } = await params;
    const meal = await getRecipeById(id);

    if (!meal) {
        return (
            <div className="container" style={{ padding: "4rem", textAlign: "center" }}>
                <h1>Recipe not found</h1>
                <Link href="/" style={{ color: "var(--accent)", textDecoration: "underline" }}>
                    Go back home
                </Link>
            </div>
        );
    }

    // Parse ingredients
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push({ ingredient, measure });
        }
    }

    return (
        <main className={styles.recipeContainer}>
            <div className={styles.header}>
                <Link href="/" className={styles.backLink}>&larr; Back to Search</Link>
                <h1 className={styles.title}>{meal.strMeal}</h1>
                <div className={styles.meta}>
                    {meal.strCategory && <span className={styles.tag}>{meal.strCategory}</span>}
                    {meal.strArea && <span className={styles.tag}>{meal.strArea}</span>}
                </div>
            </div>

            <div className={styles.grid}>
                <div className={styles.leftCol}>
                    <div className={styles.imageWrapper}>
                        <img src={meal.strMealThumb} alt={meal.strMeal} className={styles.image} />
                    </div>

                    <div className={`${styles.card} glass`}>
                        <h3>Ingredients</h3>
                        <ul className={styles.ingredientList}>
                            {ingredients.map((item, idx) => (
                                <li key={idx} className={styles.ingredientItem}>
                                    <span className={styles.measure}>{item.measure}</span>
                                    <span className={styles.name}>{item.ingredient}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={styles.rightCol}>
                    <div className={`${styles.card} glass`}>
                        <h3>Instructions</h3>
                        <div className={styles.instructions}>
                            {meal.strInstructions.split(/\r\n|\n/).map((step, idx) => {
                                if (!step.trim()) return null;
                                return <p key={idx}>{step}</p>;
                            })}
                        </div>
                    </div>

                    {meal.strSource && (
                        <a href={meal.strSource} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
                            View Original Source &rarr;
                        </a>
                    )}
                    {meal.strYoutube && (
                        <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className={styles.youtubeLink}>
                            Watch on YouTube &rarr;
                        </a>
                    )}
                </div>
            </div>
        </main>
    );
}

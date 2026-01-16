"use client";

import { useState, useEffect } from "react";
import { getCategories } from "@/lib/api";
import styles from "./CategoryFilter.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function CategoryFilter({ onSelect, selected }) {
    const [categories, setCategories] = useState([]);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    const popularCategories = ["Vegetarian", "Vegan", "Breakfast", "Dessert", "Pasta", "Seafood"];

    // Filter to show only popular/common categories to avoid clutter, or show all?
    // User asked to select "tags genre vegetarien".
    // API returns keys like { strCategory: 'Beef' }
    const displayCategories = categories.filter(c => popularCategories.includes(c.strCategory));

    return (
        <div className={styles.container}>
            <div className={styles.scroll}>
                <button
                    className={`${styles.chip} ${!selected ? styles.active : ''}`}
                    onClick={() => onSelect(null)}
                >
                    {t("all")}
                </button>
                {displayCategories.map((cat) => (
                    <button
                        key={cat.strCategory}
                        className={`${styles.chip} ${selected === cat.strCategory ? styles.active : ''}`}
                        onClick={() => onSelect(cat.strCategory)}
                    >
                        {t(cat.strCategory.toLowerCase()) || cat.strCategory}
                    </button>
                ))}
            </div>
        </div>
    );
}

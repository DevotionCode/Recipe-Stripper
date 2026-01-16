"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import styles from "./page.module.css";
import { useLanguage } from "@/context/LanguageContext";
import CategoryFilter from "@/components/CategoryFilter";
import RecipeGrid from "@/components/RecipeGrid";
import { smartSearch, filterByCategory } from "@/lib/api";
import { translateQuery } from "@/lib/translationMap";

export default function Home() {
  const { t, language, toggleLanguage } = useLanguage();
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(async () => {
      // If we have a query, search
      if (query.trim().length > 1) {
        setLoading(true);
        // Translate query if needed
        const translatedQuery = translateQuery(query, language);
        const data = await smartSearch(translatedQuery);
        setRecipes(data || []);
        setLoading(false);
      }
      // If query is empty but we have a category, ignore (category logic handled separately)
      // If query is empty and NO category, clear.
      else if (query.trim() === "" && !selectedCategory) {
        setRecipes([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, selectedCategory]);


  const handleSearchChange = (newQuery) => {
    setQuery(newQuery);
    if (newQuery.trim().length > 0) {
      // If user types, clear the category selection so we search globally
      if (selectedCategory) {
        setSelectedCategory(null);
      }
    }
  };

  const handleCategorySelect = async (category) => {
    // If clicking same category, toggle off
    if (category === selectedCategory) {
      setSelectedCategory(null);
      setQuery("");
      setRecipes([]);
      return;
    }

    // Switch to category mode
    setSelectedCategory(category);
    setQuery(""); // Clear search bar text

    setLoading(true);
    const data = await filterByCategory(category);
    setRecipes(data || []);
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button onClick={toggleLanguage} className={styles.langBtn}>
          {language === "en" ? "🇫🇷 FR" : "🇬🇧 EN"}
        </button>
      </header>
      <main className="container">
        <section className={styles.hero}>
          <h1 className="animate-fade-in">{t("title")}</h1>
          <p className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t("subtitle")}
          </p>
          <div className="animate-fade-in" style={{ animationDelay: "0.2s", width: "100%" }}>
            <SearchBar value={query} onChange={handleSearchChange} placeholder={t("searchPlaceholder")} />
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.3s", width: "100%" }}>
            <CategoryFilter onSelect={handleCategorySelect} selected={selectedCategory} />
          </div>

          <div style={{ width: "100%" }}>
            {loading ? (
              <p style={{ textAlign: 'center', color: '#888' }}>{t("searching")}</p>
            ) : (
              <RecipeGrid recipes={recipes} />
            )}
            {!loading && recipes.length === 0 && (query.length > 1 || selectedCategory) && (
              <p style={{ textAlign: 'center', color: '#888' }}>{t("noResults")}</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

export const searchRecipes = async (query) => {
    if (!query) return [];
    try {
        const res = await fetch(`${API_BASE}/search.php?s=${query}`);
        const data = await res.json();
        return data.meals || [];
    } catch (error) {
        console.error("Failed to fetch recipes:", error);
        return [];
    }
};

export const getCategories = async () => {
    try {
        const res = await fetch(`${API_BASE}/list.php?c=list`);
        const data = await res.json();
        return data.meals || [];
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return [];
    }
};

export const filterByCategory = async (category) => {
    try {
        const res = await fetch(`${API_BASE}/filter.php?c=${category}`);
        const data = await res.json();
        return data.meals || [];
    } catch (error) {
        console.error("Failed to filter by category:", error);
        return [];
    }
};

export const filterByIngredient = async (ingredient) => {
    try {
        const res = await fetch(`${API_BASE}/filter.php?i=${ingredient}`);
        const data = await res.json();
        return data.meals || [];
    } catch (error) {
        // Ingredient not found often returns 0 results or error
        return [];
    }
};

export const smartSearch = async (query) => {
    if (!query) return [];

    // Run searches in parallel
    const [nameResults, categoryResults, ingredientResults] = await Promise.all([
        searchRecipes(query),
        filterByCategory(query),
        filterByIngredient(query)
    ]);

    // Combine and deduplicate
    const all = [...nameResults, ...categoryResults, ...ingredientResults];
    const unique = [];
    const seen = new Set();

    for (const meal of all) {
        if (!seen.has(meal.idMeal)) {
            seen.add(meal.idMeal);
            unique.push(meal);
        }
    }

    return unique;
};

export const getRecipeById = async (id) => {
    try {
        const res = await fetch(`${API_BASE}/lookup.php?i=${id}`);
        const data = await res.json();
        return data.meals ? data.meals[0] : null;
    } catch (error) {
        console.error("Failed to fetch recipe:", error);
        return null;
    }
};

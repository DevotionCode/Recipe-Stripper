export const translationMap = {
    // Categories
    "pates": "pasta",
    "pâtes": "pasta",
    "patés": "pasta",
    "boeuf": "beef",
    "bœuf": "beef",
    "poulet": "chicken",
    "porc": "pork",
    "chèvre": "goat",
    "chevre": "goat",
    "agneau": "lamb",
    "poisson": "seafood", // or fish
    "fruits de mer": "seafood",
    "vegetarien": "vegetarian",
    "végétarien": "vegetarian",
    "vegan": "vegan",
    "dessert": "dessert",
    "petit dej": "breakfast",
    "petit déjeuner": "breakfast",

    // Common Ingredients
    "tomate": "tomato",
    "pomme de terre": "potato",
    "fromage": "cheese",
    "oeuf": "egg",
    "oeufs": "eggs",
    "lait": "milk",
    "farine": "flour",
    "sucre": "sugar",
    "sel": "salt",
    "poivre": "pepper",
    "oignon": "onion",
    "ail": "garlic",
    "riz": "rice",
    "saumon": "salmon",
    "thon": "tuna",
    "avocat": "avocado",
    "chocolat": "chocolate",
    "fraise": "strawberry",
    "banane": "banana",
    "pomme": "apple",
    "crevette": "prawn", // API often uses prawn
    "crevettes": "prawn",
};

export const translateQuery = (query, language) => {
    if (language !== 'fr') return query;
    const lower = query.toLowerCase().trim();
    return translationMap[lower] || query;
};

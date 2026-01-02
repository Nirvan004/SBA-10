import React, { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";
import type { Meal } from "../types/recipe";

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (favorites.length === 0) {
      setRecipes([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchFavorites = async () => {
      try {
        const results = await Promise.all(
          favorites.map(async id => {
            const res = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );
            if (!res.ok) throw new Error("Failed to fetch recipe");
            const data = await res.json();
            return data.meals[0] as Meal;
          })
        );
        setRecipes(results);
      } catch (err: any) {
        setError(err.message || "Failed to fetch favorite recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  if (recipes.length === 0)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>You have no favorite recipes yet.</h2>
        <p>Browse categories or search for recipes to add favorites!</p>
      </div>
    );

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        My Favorite Recipes
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {recipes.map(recipe => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
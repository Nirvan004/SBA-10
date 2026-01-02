import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { MealDetail } from "../types/recipe";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { useFavorites } from "../context/FavoritesContext";

interface RecipeResponse {
  meals: MealDetail[];
}

const RecipeDetail: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch<RecipeResponse>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
  );

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  const recipe = data?.meals?.[0];
  if (!recipe) return <ErrorMessage message="Recipe not found." />;

  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure: measure || "" });
    }
  }

  const handleFavoriteClick = () => {
    if (isFavorite(recipe.idMeal)) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe.idMeal);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
        <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          border: "none",
          background: "#4f46e5",
          color: "white",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
        {recipe.strMeal}
      </h1>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
      />
      <div style={{ marginBottom: "1rem", textAlign: "center" }}>
        <strong>Category:</strong> {recipe.strCategory} | <strong>Area:</strong>{" "}
        {recipe.strArea}
      </div>
      <button
        onClick={handleFavoriteClick}
        style={{
          display: "block",
          margin: "0 auto 2rem auto",
          padding: "0.5rem 1rem",
          background: isFavorite(recipe.idMeal) ? "#ef4444" : "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {isFavorite(recipe.idMeal) ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>
            {item.ingredient} - {item.measure}
          </li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p style={{ whiteSpace: "pre-line" }}>{recipe.strInstructions}</p>
    </div>
  );
};

export default RecipeDetail;
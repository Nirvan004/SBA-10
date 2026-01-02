import React from "react";
import type { Meal } from "../types/recipe";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  recipe: Meal;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem", textAlign: "center" }}>
      <Link to={`/recipe/${recipe.idMeal}`}>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          style={{ width: "100%", borderRadius: "8px" }}
        />
        <h3>{recipe.strMeal}</h3>
      </Link>
    </div>
  );
};

export default RecipeCard;
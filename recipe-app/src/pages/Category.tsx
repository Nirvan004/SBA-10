import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Meal } from "../types/recipe";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";

interface CategoryMealsResponse {
  meals: Meal[];
}

const Category: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();

  const { data, loading, error } = useFetch<CategoryMealsResponse>(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data?.meals || data.meals.length === 0)
    return <ErrorMessage message="No recipes found for this category." />;

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        {categoryName} Recipes
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {data.meals.map(meal => (
          <RecipeCard key={meal.idMeal} recipe={meal} />
        ))}
      </div>
    </div>
  );
};

export default Category;

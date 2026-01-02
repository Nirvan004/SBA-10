import React from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Meal } from "../types/recipe";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";

interface SearchResponse {
  meals: Meal[] | null;
}

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const { data, loading, error } = useFetch<SearchResponse>(
    query
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          query
        )}`
      : ""
  );

  if (!query) return <ErrorMessage message="Please enter a search query." />;
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data?.meals || data.meals.length === 0)
    return <ErrorMessage message={`No recipes found for "${query}".`} />;

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Search Results for "{query}"
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

export default SearchResults;
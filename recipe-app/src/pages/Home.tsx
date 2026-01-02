import React from "react";
import { useFetch } from "../hooks/useFetch";
import type { Category } from "../types/recipe";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "react-router-dom";

interface CategoriesResponse {
  categories: Category[];
}

const Home: React.FC = () => {
  const { data, loading, error } = useFetch<CategoriesResponse>(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Recipe Categories</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {data?.categories.map(category => (
          <Link key={category.idCategory} to={`/category/${category.strCategory}`}>
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                textAlign: "center",
                padding: "1rem",
                cursor: "pointer",
              }}
            >
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <h3>{category.strCategory}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";

import NavBar from "./components/Navbar.tsx";
import Home from "./pages/Home";
import Category from "./pages/Category";
import RecipeDetail from "./pages/RecipeDetail";
import SearchResults from "./pages/SearchResults";
import Favorites from "./pages/Favorites";

import "./App.css";
const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/favorites" element={<Favorites />} />
          {/* Optional: 404 Not Found Route */}
          <Route
            path="*"
            element={
              <div style={{ padding: "2rem", textAlign: "center" }}>
                <h2>Page Not Found</h2>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
};

export default App;
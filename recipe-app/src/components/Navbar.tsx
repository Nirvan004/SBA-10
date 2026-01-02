import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  return (
    <nav style={{ padding: "1rem", background: "#4f46e5", color: "white", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
      <h2 style={{ margin: 0 }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Recipe Discovery</Link>
      </h2>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        <Link to="/favorites" style={{ color: "white", textDecoration: "none" }}>Favorites</Link>

        <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search recipes..."
            style={{ padding: "0.5rem", borderRadius: "4px", border: "none" }}
          />
          <button type="submit" style={{ padding: "0.5rem 1rem", borderRadius: "4px", border: "none", background: "#fff", color: "#4f46e5", cursor: "pointer" }}>
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <nav style={{ padding: "1rem", background: "#4f46e5", color: "white" }}>
      <h2 style={{ display: "inline-block", marginRight: "2rem" }}>Recipe Discovery</h2>
      <form onSubmit={handleSearch} style={{ display: "inline-block" }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search recipes..."
          style={{ padding: "0.5rem", borderRadius: "4px", border: "none" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem", borderRadius: "4px", border: "none", background: "#fff", color: "#4f46e5", cursor: "pointer" }}>
          Search
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
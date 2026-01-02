import React from "react";

const Spinner: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <div className="spinner" />
      <p>Loading...</p>
      <style>{`
        .spinner {
          margin: auto;
          border: 4px solid rgba(0,0,0,0.1);
          border-left-color: #4f46e5;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
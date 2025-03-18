"use client";
import React from "react";

function SearchForm({ onSubmit, query, setQuery, placeholder }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <div className="flex justify-center w-max-3xl w-full p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input input-bordered w-full focus:border-success focus:outline-success text-lg"
            placeholder={placeholder || "Search..."}
          />
          <button
            type="submit"
            className="btn btn-success text-white w-full sm:w-48 text-lg"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;

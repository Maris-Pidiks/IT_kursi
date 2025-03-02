"use client";

import React, { useState } from "react";
import SearchButtons from "./SearchButtons";
import ResultRecipes from "./ResultRecipes";
import SearchHeadline from "./SearchHeadline";

function Search() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]); // Initialize with an empty array

  const handleSearch = () => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setRecipes(data.meals || [])); // Update the recipes state with the meals array
    setQuery("");
  };

  const handleSearchByLetter = (letter) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setRecipes(data.meals || [])); // Update the recipes state with the meals array
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-8xl py-9">
        <SearchHeadline
          className="text-5xl font-bold mt-5 mb-10"
          title={"Search Recipes"}
        />
        <div className="flex justify-center my-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input input-bordered w-full max-w-md"
            placeholder="Search for recipes"
          />
          <button className="btn btn-success text-white ml-2" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="flex justify-center mb-4">
          <SearchButtons handleSearchByLetter={handleSearchByLetter} />
        </div>
        <ResultRecipes recipes={recipes} />
      </div>
    </div>
  );
}

export default Search;

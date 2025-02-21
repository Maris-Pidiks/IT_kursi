import React from "react";
import SearchRecipes from "./SearchRecipes";

function Header() {
  return (
    <div className=" mx-auto flex justify-center min-h-screen bg-base-200">
      <div className="text-center">
        <div className="max-w-8xl py-9">
          <h1 className="text-5xl font-bold mt-5 mb-2">Search for Recipes</h1>
          <SearchRecipes />
        </div>
      </div>
    </div>
  );
}

export default Header;

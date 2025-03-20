"use client";

import React from "react";
import Image from "next/image";

function ResultRecipes({ recipes }) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recipes &&
          recipes.map((recipe) => (
            <div key={recipe.idMeal} className="card bg-base-100 shadow-md">
              <figure>
                <Image src={recipe.strMealThumb} alt={recipe.strMeal} />
              </figure>
              <div className="card-body justify-center">
                <h2 className="card-title text-center text-2xl leading-tight mx-auto">
                  {recipe.strMeal}
                </h2>
                <p className="text-sm text-center">
                  <strong>Category:</strong> {recipe.strCategory}
                  <br />
                  <strong>Area:</strong> {recipe.strArea}
                </p>
                <div className="card-actions justify-center">
                  <a
                    href={recipe.strSource}
                    target="_blank"
                    className="btn btn-success text-white mt-2"
                  >
                    View Recipe
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ResultRecipes;

"use client";

import React from "react";

function SearchButtons({ handleSearchByLetter }) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="flex flex-wrap justify-center my-2">
      {letters.map((letter) => (
        <button
          key={letter}
          className="btn btn-success text-white w-10 my-2 mx-1"
          onClick={() => handleSearchByLetter(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

export default SearchButtons;

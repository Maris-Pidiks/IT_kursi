"use client";
import React from "react";

function SearchForm() {
  return (
    <div class="flex flex-row items-start">
      <form class="w-full text-center">
        <input
          type="text"
          //   onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full max-w-md"
          //   placeholder="{placeholder}"
        />
        {/* <button className="btn btn-success text-white ml-2" onClick={handleSearch}>
          Search
        </button> */}
      </form>
    </div>
  );
}

export default SearchForm;

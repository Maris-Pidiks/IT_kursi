// filepath: /Users/webdev/Desktop/GitRepos/IT_kursi/maris_home_16/next-app/src/app/components/SearchUsersHeader.js
"use client";
import React, { useState } from "react";
import ResultUsers from "./ResultUsers";
import { handleSearch } from "../utils/handleSearch";

function SearchUsersHeader() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const handleSearchClick = () => {
    const url = "https://api.github.com/search/users";
    handleSearch(url, query, setUsers, setError);
    setQuery(""); // Clear the input field after search
  };

  return (
    <div className="mx-auto flex justify-center min-h-screen bg-base-200">
      <div className="text-center">
        <div className="max-w-8xl py-9">
          <h1 className="text-5xl font-bold mt-5 mb-10">Search GitHub users</h1>

          <div className="flex justify-center mb-11">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchClick();
                }
              }}
              className="input input-bordered w-full max-w-md"
              placeholder="Search for users"
            />
            <button
              className="btn btn-success text-white ml-2"
              onClick={handleSearchClick}
            >
              Search
            </button>
          </div>
          {error !== null ? (
            <p className="text-error text-center mt-4">{error}</p>
          ) : (
            <ResultUsers users={users} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchUsersHeader;

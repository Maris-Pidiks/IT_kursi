"use client";
import React, { useState } from "react";
import ResultUsers from "./ResultUsers";

function SearchUsersHeader() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    const url = `https://api.github.com/search/users?q=${query}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.items.length === 0) {
          setError("No users found!");
        } else {
          setUsers(data.items);
          setError(null);
        }
        setQuery(""); // Clear the input field after search
      })
      .catch((error) => {
        setError("Error searching users!");
        setQuery(""); // Clear the input field even if there's an error
      });
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
                  handleSearch();
                }
              }}
              className="input input-bordered w-full max-w-md focus:border-success focus:outline-success"
              placeholder="Search for users"
            />
            <button className="btn btn-success text-white ml-2" onClick={handleSearch}>
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

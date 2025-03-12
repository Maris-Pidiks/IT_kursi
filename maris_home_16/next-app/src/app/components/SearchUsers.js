import React, { useState } from "react";
import SearchUsersHeader from "./SearchUsersHeader";
import ResultUsers from "./ResultUsers";

function SearchUsers() {
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
      })
      .catch((error) => {
        setError("Error searching users!");
      });
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <SearchUsersHeader />
      <div className="flex justify-center mb-4">
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
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
  );
}

export default SearchUsers;

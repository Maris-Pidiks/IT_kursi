"use client";
import React, { useState } from "react";
const HandleSearch = ({ url }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    event.preventDefault();
    const fullUrl = `${url}?query=${encodeURIComponent(searchTerm)}`;
    // You can use fetch or navigate based on your routing library
    // For example, if using React Router:
    // history.push(fullUrl);
  };
  return (
    <form onSubmit={handleSearch} className="flex flex-col items-start">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered mb-2"
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
};
export default HandleSearch;

"use client";

import { useState } from "react";

export default function SearchUsersForm({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-[500px] gap-2 mb-10 mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search GitHub users..."
        className="input input-bordered flex-1"
        required
      />
      <button type="submit" className="btn btn-success text-white ml-2">
        Search
      </button>
    </form>
  );
}

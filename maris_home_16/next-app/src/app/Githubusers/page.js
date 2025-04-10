"use client";

import { useState } from "react";
import SearchUsersForm from "../components/SearchUsersForm";
import Image from "next/image";

export default function GithubUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchTerm) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}`);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.items);
    } catch (err) {
      setError("Error fetching GitHub users. Please try again.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="con2tainer max-w-6xl mx-auto">
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200 w-full mt-10 ">
        <h1 className="text-4xl font-bold text-center mt-10 mb-8">GitHub Users Search</h1>

        <SearchUsersForm onSearch={handleSearch} />

        {isLoading && (
          <div className="flex justify-center my-8">
            <div className="loading loading-spinner loading-lg text-success"></div>
          </div>
        )}

        {error && (
          <div className="alert alert-error my-4">
            <span>{error}</span>
          </div>
        )}

        {users.length > 0 && !isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4  justify-center gap-4 p-10">
            {users.map((user) => (
              <div
                key={user.id}
                className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="card-body p-8">
                  <div className="flex flex-col justify-center items-center gap-8">
                    <div className="avatar">
                      <div className="w-40 h-40 rounded-full">
                        <Image
                          src={user.avatar_url}
                          alt={user.login}
                          width={128}
                          height={128}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <h2 className="card-title text-2xl mb-3 justify-center mx-auto">
                        {user.login}
                      </h2>
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn mx-auto btn-success btn-sm text-white"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import ResultGames from "./ResultGames";

export default function GetGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/steam");

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch games");
        }

        const data = await response.json();
        setGames(data);
      } catch (err) {
        console.error("Error fetching games:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>Error: {error}</p>
        <p className="text-sm mt-2">Please try again later</p>
      </div>
    );
  }

  return <ResultGames games={games} />;
}

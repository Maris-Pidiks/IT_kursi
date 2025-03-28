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
        const response = await fetch("/api/steam");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch games");
        }

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }

        console.log("Fetched games:", data); // Debug log
        setGames(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-error p-4">
        <p className="text-xl">Error: {error}</p>
        <button className="btn btn-primary mt-4" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  if (!games || games.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-xl">No games found</p>
      </div>
    );
  }

  return <ResultGames games={games} />;
}

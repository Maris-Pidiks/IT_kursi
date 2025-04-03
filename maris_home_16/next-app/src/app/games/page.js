"use client";

import GetGames from "../components/GetGames";

export default function GamesPage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Steam Games</h1>
      <GetGames />
    </main>
  );
}

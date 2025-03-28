import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.NEXT_PUBLIC_STEAM_API_KEY;

  try {
    // Fetch most purchased games from Steam
    const response = await fetch(
      "https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/"
    );

    if (!response.ok) {
      throw new Error("Steam API error");
    }

    const data = await response.json();
    const mostPlayed = data.response.ranks.slice(0, 9);

    // Get detailed information for each game
    const gamesWithDetails = await Promise.all(
      mostPlayed.map(async (game) => {
        try {
          const detailsResponse = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${game.appid}&cc=us&l=en&filters=basic,price_overview,categories,genres,release_date,screenshots`
          );

          if (!detailsResponse.ok) return null;

          const details = await detailsResponse.json();
          const gameData = details[game.appid]?.data;

          if (!gameData) return null;

          return {
            ...gameData,
            player_count: game.player_count,
            price_overview: gameData.price_overview || {
              final_formatted: "Free to Play",
            },
          };
        } catch (error) {
          console.error(`Error fetching game ${game.appid}:`, error);
          return null;
        }
      })
    );

    const validGames = gamesWithDetails
      .filter((game) => game !== null)
      .sort((a, b) => b.player_count - a.player_count);

    if (validGames.length === 0) {
      return NextResponse.json({ error: "No games found" }, { status: 404 });
    }

    return NextResponse.json(validGames);
  } catch (error) {
    console.error("Steam API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch games from Steam" },
      { status: 500 }
    );
  }
}

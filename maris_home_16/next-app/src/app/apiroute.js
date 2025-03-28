import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.NEXT_PUBLIC_STEAM_API_KEY;
  const STEAM_USER_ID = "76561199503258606";

  try {
    // Get recently played games
    const response = await fetch(
      `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${API_KEY}&steamid=${STEAM_USER_ID}&format=json`
    );

    if (!response.ok) {
      throw new Error(`Steam API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const games = data.response.games || [];

    // Get detailed information for each game
    const gamesWithDetails = await Promise.all(
      games.slice(0, 6).map(async (game) => {
        try {
          const detailsResponse = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${game.appid}&cc=us&l=en`
          );

          if (!detailsResponse.ok) {
            console.error(
              `Failed to fetch details for game ${game.appid}: ${detailsResponse.status}`
            );
            return null;
          }

          // Check if response is actually JSON
          const contentType = detailsResponse.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            console.error(`Invalid content type for game ${game.appid}: ${contentType}`);
            return null;
          }

          const details = await detailsResponse.json();

          if (!details[game.appid]?.success) {
            console.error(`No data available for game ${game.appid}`);
            return null;
          }

          return {
            ...game,
            ...details[game.appid].data,
            steam_appid: game.appid,
          };
        } catch (error) {
          console.error(`Error fetching details for game ${game.appid}:`, error);
          return null;
        }
      })
    );

    const validGames = gamesWithDetails.filter((game) => game !== null);

    if (validGames.length === 0) {
      return NextResponse.json(
        { error: "No valid games data available" },
        { status: 404 }
      );
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

import Image from "next/image";
export default function ResultGames({ games }) {
  if (!games || games.length === 0) {
    return <div className="text-center p-4">No games found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {games.map((game) => (
        <div key={game.steam_appid} className="card bg-base-100 shadow-xl">
          <figure>
            <Image
              src={game.header_image || "/placeholder-game.jpg"}
              alt={game.name}
              className="w-full h-48 object-cover"
            ></Image>
          </figure>
          <div className="card-body">
            <h2 className="card-title">{game.name}</h2>
            {game.release_date && (
              <p>Release Date: {new Date(game.release_date.date).toLocaleDateString()}</p>
            )}
            {game.price_overview && <p>Price: {game.price_overview.final_formatted}</p>}
            <div className="card-actions justify-end">
              <div className="flex flex-wrap gap-2">
                {game.categories?.map((category) => (
                  <span key={category.id} className="badge badge-outline">
                    {category.description}
                  </span>
                ))}
              </div>
              <a
                href={`https://store.steampowered.com/app/${game.steam_appid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                View on Steam
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

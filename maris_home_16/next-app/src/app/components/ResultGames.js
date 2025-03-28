import Image from "next/image";

export default function ResultGames({ games }) {
  if (!Array.isArray(games)) {
    console.error("Games is not an array:", games);
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <div key={game.steam_appid} className="card bg-base-100 shadow-xl">
          <figure className="relative h-48">
            {game.header_image && (
              <Image
                src={game.header_image}
                alt={game.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </figure>
          <div className="card-body">
            <h2 className="card-title text-lg">{game.name}</h2>
            {game.release_date && (
              <p className="text-sm">
                Released: {new Date(game.release_date.date).toLocaleDateString()}
              </p>
            )}
            {game.price_overview && (
              <p className="text-success font-bold">
                {game.price_overview.final_formatted}
              </p>
            )}
            <div className="card-actions flex-col gap-2">
              <div className="flex flex-wrap gap-1">
                {game.categories?.slice(0, 3).map((category) => (
                  <span key={category.id} className="badge badge-outline badge-sm">
                    {category.description}
                  </span>
                ))}
              </div>
              <a
                href={`https://store.steampowered.com/app/${game.steam_appid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success btn-sm w-full"
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

"use client";

import React from "react";

export default function ResultSpotify({ artist, albums, topTracks }) {
  return (
    <div className="container mx-auto p-4 mb-10">
      {artist && (
        <div className="bg-green-500 p-4 rounded-xl shadow px-10">
          <div className="hero bg-green-500 p-4 pt-20 rounded mb-4">
            <div className="hero-content p-0 flex-col lg:flex-row">
              <img
                src={artist.images[0]?.url || "https://via.placeholder.com/100"}
                alt={artist.name}
                className="w-full max-w-md mx-auto rounded-lg border-4 border-white shadow-2xl lg:mr-10"
              />
              <div>
                <h2 className="text-5xl mt-2 lg:text-6xl text-center text-md-left mb-5 font-bold text-white">
                  {artist.name}
                </h2>
                <p className="text-xl text-white">
                  <strong>Genres:</strong> {artist.genres.join(", ") || "Not specified"}
                </p>
                <p className="text-xl text-white">
                  <strong>Popularity:</strong> {artist.popularity}
                </p>
                <p className="text-xl text-white">
                  <strong>Link:</strong>{" "}
                  <a
                    href={artist.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline hover:text-green-200 hover:underline"
                  >
                    Spotify
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="albums-section mb-4">
            <h3 className="text-3xl font-bold mb-8 text-white">Albums:</h3>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {albums.map((album) => (
                <li key={album.id} className="card bg-base-100 shadow-md">
                  <a
                    href={album.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-body"
                  >
                    <img
                      src={album.images[0]?.url || "https://via.placeholder.com/100"}
                      alt={album.name}
                      className="rounded-lg"
                    />
                    <p className="text-center mt-2">{album.name}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="tracks-section"></div>
          <h3 className="text-3xl font-bold mt-10 mb-5  text-white">Top Tracks:</h3>
          <p className="text-white text-lg mb-10">
            {topTracks.map((track, index) => (
              <span key={track.id}>
                <a
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline hover:text-green-200 hover:underline"
                >
                  {track.name}
                </a>
                {index < topTracks.length - 1 && "  /  "}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}

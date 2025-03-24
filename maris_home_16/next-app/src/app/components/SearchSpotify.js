"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ResultSpotify from "./ResultSpotify";
import Form from "./Form";

const CLIENT_ID = "024078ae9f614aefbbbee63fda1049f9";
const REDIRECT_URI = "https://m-next.vercel.app/pages/Spotify"; // Ensure this matches the URI in Spotify Developer Dashboard
const SCOPES = "user-read-private user-read-email"; // Add the required scopes

function getTokenFromUrl() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get("access_token");
}

function authorize() {
  const authUrl = "https://accounts.spotify.com/authorize";
  const params = new URLSearchParams({
    response_type: "token",
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
  });
  window.location.href = `${authUrl}?${params.toString()}`;
}

export default function SearchSpotify() {
  const [accessToken, setAccessToken] = useState(null);
  const [artistName, setArtistName] = useState("");
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let token = getTokenFromUrl();
    if (token) {
      localStorage.setItem("spotify_access_token", token);
      window.history.replaceState({}, document.title, "/pages/Spotify");
      setAccessToken(token);
    } else {
      token = localStorage.getItem("spotify_access_token");
      if (!token) {
        setAccessToken(null);
      } else {
        setAccessToken(token);
      }
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);

    if (!artistName.trim()) {
      setError("Please enter an artist name.");
      return;
    }

    try {
      // Search for the artist
      const searchResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          artistName
        )}&type=artist&limit=1`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!searchResponse.ok) {
        if (searchResponse.status === 401) {
          // Token expired or invalid
          localStorage.removeItem("spotify_access_token");
          authorize();
          return;
        }
        throw new Error("Error searching for artist.");
      }

      const searchData = await searchResponse.json();

      if (searchData.artists.items.length === 0) {
        setError("Artist not found.");
        return;
      }

      const artist = searchData.artists.items[0];
      setArtist(artist);

      // Get top tracks
      const topTracksResponse = await fetch(
        `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!topTracksResponse.ok) {
        throw new Error("Error fetching top tracks.");
      }

      const topTracksData = await topTracksResponse.json();
      setTopTracks(topTracksData.tracks);

      // Get albums
      const albumsResponse = await fetch(
        `https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=album&market=US&limit=9`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!albumsResponse.ok) {
        throw new Error("Error fetching albums.");
      }

      const albumsData = await albumsResponse.json();
      setAlbums(albumsData.items);

      // Clear the search input
      setArtistName("");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  if (!accessToken) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <button className="btn btn-success" onClick={authorize}>
          Log in with Spotify
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen bg-base-200">
      <div className="w-full max-w-4xl mx-auto">
        <Image
          src="/assets/Spotify_Full_Logo_RGB_Green.png"
          alt="Spotify"
          width={350}
          height={350}
          className="mx-auto my-10"
        />

        <Form
          onSubmit={handleSearch}
          inputValue={artistName}
          onInputChange={(e) => setArtistName(e.target.value)}
          placeholder="Search artist"
          buttonText="Search"
        />

        {error && <p className="text-error text-center">{error}</p>}
        <ResultSpotify artist={artist} albums={albums} topTracks={topTracks} />
      </div>
    </div>
  );
}

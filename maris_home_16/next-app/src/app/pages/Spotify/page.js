// filepath: /Users/webdev/Desktop/GitRepos/IT_kursi/maris_home_16/next-app/src/app/pages/Spotify/Spotify.js
import React from "react";
import SearchHeadline from "../../components/SearchHeadline";
import ResultSpotify from "../../components/ResultSpotify";
import SearchSpotify from "@/app/components/SearchSpotify";
export default function Spotify() {
  return (
    <div className="bg-base-100 py-10">
      <SearchSpotify />
      <ResultSpotify />
    </div>
  );
}

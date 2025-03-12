"use client";
import React, { useState } from "react";
import ResultWeather from "./ResultWeather";
import ResultWeatherDays from "./ResultWeatherDays";
import { handleSearch } from "../utils/handleSearch";

function SearchWeather() {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearchClick = () => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?key=SSNZEMK7VV6FBH4MBW8LZJM6T`;
    handleSearch(url, query, setWeatherData, setError);
    setQuery(""); // Clear the input field after search
  };

  return (
    <div className="mx-auto flex justify-center min-h-screen bg-base-200">
      <div className="text-center">
        <div className="max-w-8xl py-9">
          <h1 className="text-5xl font-bold mt-5 mb-10 mx-5">Search Weather</h1>

          <div className="flex justify-center mb-11 max-w-3xl w-full mx-auto px-20">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchClick();
                }
              }}
              className="input input-bordered w-full max-w-md focus:border-success focus:outline-success"
              placeholder="Enter city"
            />
            <button
              className="btn btn-success text-white ml-2"
              onClick={handleSearchClick}
            >
              Search
            </button>
          </div>
          {error !== null ? (
            <p className="text-error text-center mt-4">{error}</p>
          ) : (
            <>
              <ResultWeather weatherData={weatherData} />
              <ResultWeatherDays weatherData={weatherData} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchWeather;

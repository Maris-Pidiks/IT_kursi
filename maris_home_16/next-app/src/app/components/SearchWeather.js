"use client";
import React, { useState } from "react";
import ResultWeather from "./ResultWeather";
import ResultWeatherDays from "./ResultWeatherDays";
import { handleSearch } from "../../utils/handleSearch";

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
      <div className="text-center w-full max-w-6xl px-4">
        <div className="py-9">
          <h1 className="text-5xl font-bold mt-5 mb-10">Search Weather</h1>

          <div className="flex flex-col sm:flex-row gap-2 justify-center mb-11 w-full max-w-xl mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchClick();
                }
              }}
              className="input input-bordered w-full focus:border-success focus:outline-success text-lg"
              placeholder="Enter city"
            />
            <button
              className="btn btn-success text-white w-full sm:w-48 text-lg"
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

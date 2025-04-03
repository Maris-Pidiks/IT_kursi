import React from "react";
import SearchWeather from "../components/SearchWeather";
import ResultWeatherDays from "../components/ResultWeatherDays";

export default function Weather() {
  return (
    <div className="min-w-sm mx-auto">
      <SearchWeather className="px-20" />
      <ResultWeatherDays className="px-20" />
    </div>
  );
}

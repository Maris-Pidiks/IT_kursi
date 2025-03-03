import React from "react";
import SearchWeather from "../../components/SearchWeather";
import ResultWeatherDays from "../../components/ResultWeatherDays";

export default function Weather() {
  return (
    <div>
      <SearchWeather />
      <ResultWeatherDays />
    </div>
  );
}

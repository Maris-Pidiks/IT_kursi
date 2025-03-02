// filepath: /Users/webdev/Desktop/GitRepos/IT_kursi/maris_home_16/next-app/src/app/components/ResultWeather.js
import React from "react";
import WeatherIcons from "./WeatherIcons";

function ResultWeather({ weatherData }) {
  if (!weatherData) {
    return null;
  }

  const condition = weatherData.currentConditions.icon;

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-xl w-full">
        <div className="card-body flex flex-row items-center mx-6">
          <WeatherIcons condition={condition} className="width: 50px" />
          <div className="ml-8">
            <h2 className="card-title text-left text-3xl text-bold uppercase mb-3">
              {weatherData.address}
            </h2>
            <p className="text-lg text-left">
              <strong>Temperature:</strong> {weatherData.currentConditions.temp}°C
            </p>
            <p className="text-lg text-left">
              <strong>Humidity:</strong> {weatherData.currentConditions.humidity}%
            </p>
            <p className="text-lg text-left">
              <strong>Wind Speed:</strong> {weatherData.currentConditions.windspeed} km/h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultWeather;

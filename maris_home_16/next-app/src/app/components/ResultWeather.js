// filepath: /Users/webdev/Desktop/GitRepos/IT_kursi/maris_home_16/next-app/src/app/components/ResultWeather.js
import React from "react";
import WeatherIcons from "./WeatherIcons";

function ResultWeather({ weatherData }) {
  if (!weatherData) {
    return null;
  }

  const condition = weatherData.currentConditions.icon;
  const tempCelsius = ((weatherData.currentConditions.temp - 32) * 5) / 9;

  return (
    <div className="container mx-auto px-20">
      <div className="card bg-base-100 shadow-xl mt-10 mb-10">
        <div className="card-body flex flex-row  gap-10 w-full items-center justify-center p-8">
          <div>
            <WeatherIcons condition={condition} size="large" />
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            {" "}
            <h2 className="card-title uppercase text-5xl mb-5">{weatherData.address}</h2>
            <p className="text-xl">
              <strong>Temperature:</strong> {Math.round(tempCelsius)}°C
              <br />
              <strong>Humidity:</strong> {weatherData.currentConditions.humidity}%
              <br />
              <strong>Wind Speed:</strong> {weatherData.currentConditions.windspeed} km/h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultWeather;

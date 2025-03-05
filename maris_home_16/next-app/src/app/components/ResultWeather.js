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
    <div className="container w-full min-w-2xl max-w-3/4 mx-auto px-20">
      <div className="card bg-base-100 shadow-xl w-full max-w-xl mt-10 mb-10 px-10 mx-auto">
        <div className="card-body flex flex-col md:flex-row gap-2 md:gap-10 w-full max-w-md items-center justify-center py-1 md:py-8 px-2 mx-auto my-5 mt-1 md:mb-0">
          <div>
            <WeatherIcons condition={condition} size="large" />
          </div>
          <div
            className="flex flex-col text-center md:text-left
          items-center md:items-start justify-center h-full"
          >
            {" "}
            <h2 className="card-title text-center md:text-left uppercase text-3xl mb-3">
              {weatherData.address}
            </h2>
            <p className="text-xl text-center md:text-left">
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

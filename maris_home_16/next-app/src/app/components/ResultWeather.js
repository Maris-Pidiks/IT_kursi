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
      <div className="card bg-base-100 shadow-xl mx-auto mt-10 mb-10 justify-center align-middle">
        <div className="card-body flex flex-row items-center">
          <div
            style={{
              marginRight: "5%",
              marginLeft: "5%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <WeatherIcons condition={condition} size="large" />
          </div>
          <div className="flex-col place-items-start">
            <h2 className="card-title uppercase text-3xl mb-5">{weatherData.address}</h2>
            <p className="text-3ml">
              <strong>Temperature:</strong> {Math.round(tempCelsius)}°C
            </p>
            <p className="text-3ml">
              <strong>Humidity:</strong> {weatherData.currentConditions.humidity}%
            </p>
            <p className="text-3ml">
              <strong>Wind Speed:</strong> {weatherData.currentConditions.windspeed} km/h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultWeather;

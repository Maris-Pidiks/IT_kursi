import React from "react";
import WeatherIcons from "./WeatherIcons";

function ResultWeather({ weatherData }) {
  // Early return if weatherData or required nested properties are missing
  if (!weatherData?.currentConditions) {
    return null;
  }

  // Safely access nested properties with optional chaining
  const condition = weatherData.currentConditions?.icon || "default";
  const temp = weatherData.currentConditions?.temp;
  const humidity = weatherData.currentConditions?.humidity;
  const windspeed = weatherData.currentConditions?.windspeed;

  // Calculate temperature only if temp is a number
  const tempCelsius = typeof temp === "number" ? Math.round(((temp - 32) * 5) / 9) : null;

  return (
    <div className="container w-full min-w-2xl max-w-3/4 mx-auto px-4 sm:px-20">
      <div className="card bg-base-100 shadow-xl w-full max-w-xl mt-10 mb-10 px-4 sm:px-10 mx-auto">
        <div className="card-body h-full flex flex-col md:flex-row gap-2 md:gap-10 w-full max-w-md items-center justify-center py-1 md:py-8 px-2 mx-auto my-5 mt-1 md:mb-0">
          <div className="flex-shrink-0">
            <WeatherIcons condition={condition} size="large" width={200} height={200} />
          </div>
          <div className="flex flex-col text-center md:text-left items-center md:items-start justify-center h-full flex-grow">
            <h2 className="card-title text-center md:text-left uppercase text-3xl mb-3">
              {weatherData.address || "Location unavailable"}
            </h2>
            <div className="flex flex-col gap-1">
              <p className="text-xl">
                <span className="font-semibold">Temperature:</span>{" "}
                {tempCelsius !== null ? `${tempCelsius}°C` : "N/A"}
              </p>
              <p className="text-xl">
                <span className="font-semibold">Humidity:</span>{" "}
                {typeof humidity === "number" ? `${humidity}%` : "N/A"}
              </p>
              <p className="text-xl">
                <span className="font-semibold">Wind Speed:</span>{" "}
                {typeof windspeed === "number" ? `${windspeed} km/h` : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultWeather;

// filepath: /Users/webdev/Desktop/GitRepos/IT_kursi/maris_home_16/next-app/src/app/components/ResultWeatherHours.js
import React from "react";
import WeatherIcons from "./WeatherIcons";

const ResultWeatherHours = ({ hours }) => {
  if (!hours || !hours.length) {
    return null;
  }

  const formatTime = (timeString) => {
    const [hour] = timeString.split(":");
    return `${hour.padStart(2, "0")}:00`;
  };

  return (
    <div className="grid grid-cols-4 min-w-2xl md:grid-cols-6 lg:grid-cols-10 gap-4 px-20 mb-20 max-w-7xl">
      {hours.map((hour, index) => {
        const tempCelsius = ((hour.temp - 32) * 5) / 9;
        return (
          <div key={index} className="card bg-base-100 shadow-xl p-1">
            <div className="card-body flex flex-col items-center justify-end gap-0 px-4 py-2">
              <h2 className="card-title text-sm font-bold my-1">
                {formatTime(hour.datetime)}
              </h2>
              <WeatherIcons condition={hour.icon} size="small" />

              <p className="text-3sm font-bold text-green-600 my-1">
                {Math.round(tempCelsius)}°C
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResultWeatherHours;

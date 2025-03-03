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
    <div className="container mx-auto px-1">
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 mb-10">
        {hours.map((hour, index) => {
          const tempCelsius = ((hour.temp - 32) * 5) / 9;
          return (
            <div key={index} className="card bg-base-100 shadow-xl">
              <div className="card-body flex flex-col items-center justify-between gap-0 p-4">
                <WeatherIcons condition={hour.icon} />
                <div className="flex-grow"></div>
                <h2 className="card-title text-xl font-bold mt-3">
                  {formatTime(hour.datetime)}
                </h2>
                <p className="text-xl font-bold text-green-500">
                  {Math.round(tempCelsius)}°C
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultWeatherHours;

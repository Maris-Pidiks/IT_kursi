"use client";

import React, { useState } from "react";
import WeatherIcons from "./WeatherIcons";
import ResultWeatherHours from "./ResultWeatherHours";

const ResultWeatherDays = ({ weatherData }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);

  if (!weatherData || !weatherData.days) {
    return null;
  }

  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleDayClick = (index) => {
    setSelectedDayIndex(selectedDayIndex === index ? null : index);
  };

  const handleCloseClick = () => {
    setSelectedDayIndex(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-20 max-w-7xl mx-auto">
        {weatherData.days.slice(0, 14).map((day, index) => {
          const tempCelsius = ((day.temp - 32) * 5) / 9;
          return (
            <div key={index} className="card bg-base-100 shadow-xl p-0">
              <div
                className="card-body flex flex-col items-center"
                onClick={() => handleDayClick(index)}
              >
                <h2 className="card-title text-xl font-bold">
                  {formatDate(day.datetime)}
                </h2>
                <WeatherIcons condition={day.icon} size="medium" />

                <p className="text-2xl text-bold text-green-600">
                  {Math.round(tempCelsius)}°C
                </p>
                <p className="text-sm">{day.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      {selectedDayIndex !== null && (
        <div className="mt-8">
          <div className="flex justify-between items-center mt-20 mb-4 px-20">
            <h2 className="text-3xl font-bold">Hourly Forecast</h2>
            <button
              className="text-3xl font-bold text-red-500"
              onClick={handleCloseClick}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <ResultWeatherHours hours={weatherData.days[selectedDayIndex].hours} />
        </div>
      )}
    </>
  );
};

export default ResultWeatherDays;

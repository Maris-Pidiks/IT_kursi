// filepath: /Users/webdev/Desktop/GitRepos/IT_kursi/maris_home_16/next-app/src/app/components/ResultWeatherDays.js
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

  return (
    <>
      <div className="container mx-auto px-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {weatherData.days.slice(0, 14).map((day, index) => {
            const tempCelsius = ((day.temp - 32) * 5) / 9;
            return (
              <div key={index} className="card bg-base-100 shadow-xl p-2">
                <div
                  className="card-body flex flex-col items-center justify-space-between gap-0 p-4"
                  onClick={() => handleDayClick(index)}
                >
                  <WeatherIcons condition={day.icon} />
                  <h2 className="card-title text-2xl font-bold mt-4">
                    {formatDate(day.datetime)}
                  </h2>
                  <p className="text-3xl text-bold text-green-500">
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
            <h2 className="text-3xl font-bold my-8">Hourly Forecast</h2>
            <ResultWeatherHours hours={weatherData.days[selectedDayIndex].hours} />
          </div>
        )}
      </div>
    </>
  );
};

export default ResultWeatherDays;

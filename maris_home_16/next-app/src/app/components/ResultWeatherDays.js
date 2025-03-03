// filepath: /Users/webdev/Desktop/GitRepos/IT_kursi/maris_home_16/next-app/src/app/components/ResultWeatherDays.js
"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import WeatherIcons from "./WeatherIcons";
import ResultWeatherHours from "./ResultWeatherHours";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const settings = {
    dots: true,
    infinite: false,
    speed: 900,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
          nextArrow: <CustomNextArrow />,
          prevArrow: <CustomPrevArrow />,
        },
      },
    ],
  };

  // Custom Next Arrow Component
  function CustomNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className}`}
        style={{ ...style, display: "block", right: "45px" }}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="w-6 h-6"
        >
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor" />
        </svg>
      </div>
    );
  }

  // Custom Previous Arrow Component
  function CustomPrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} `}
        style={{ ...style, display: "block", left: "45px", zIndex: 1 }}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="w-6 h-6"
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
        </svg>
      </div>
    );
  }

  return (
    <>
      <Slider {...settings} className="px-20 max-w-7xl mx-auto">
        {weatherData.days.slice(0, 14).map((day, index) => {
          const tempCelsius = ((day.temp - 32) * 5) / 9;
          return (
            <div key={index} className="p-2">
              <div
                className="card bg-base-100 shadow-xl pt-2 p-0 h-60 mb-5 cursor-pointer"
                onClick={() => handleDayClick(index)}
              >
                <div className="card-body flex flex-col items-center p-3">
                  <h2 className="card-title text-xl font-bold">
                    {formatDate(day.datetime)}
                  </h2>
                  <WeatherIcons condition={day.icon} size="medium" />
                  <p className="text-2xl text-bold text-green-600">
                    {Math.round(tempCelsius)}°C
                  </p>
                  <p className="text-xs mt-(-4)">{day.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      {selectedDayIndex !== null && (
        <div className="mt-8">
          <div className="flex justify-between items-center mt-20 mb-8 px-20">
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

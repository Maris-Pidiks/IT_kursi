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
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
      <div className="container min-w-2xl mx-auto px-4">
        <Slider {...settings} className="w-full max-w-7xl mx-auto px-20">
          {weatherData.days.slice(0, 14).map((day, index) => {
            const tempCelsius = ((day.temp - 32) * 5) / 9;
            return (
              <div key={index} className="p-2">
                <div
                  className="card h-72 md:h-68 bg-base-100 shadow-xl pt-2 p-0 pb-5 mb-5 cursor-pointer flex flex-col justify-between"
                  onClick={() => handleDayClick(index)}
                >
                  <div className="card-body flex flex-col items-center p-3 h-full">
                    <h2 className="card-title text-sm md:text-xl font-bold">
                      {formatDate(day.datetime)}
                    </h2>
                    <WeatherIcons condition={day.icon} size="medium" />
                    <p className="text-3xl font-bold text-green-600">
                      {Math.round(tempCelsius)}°C
                    </p>
                    <p className="text-xs px-4">{day.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
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

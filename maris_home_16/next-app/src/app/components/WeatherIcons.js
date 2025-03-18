import React from "react";

const WeatherIcons = ({ condition, size }) => {
  const getIconUrl = (condition) => {
    const iconMap = {
      "clear-day": "clear-day",
      "clear-night": "clear-night",
      "partly-cloudy-day": "partly-cloudy-day",
      "partly-cloudy-night": "partly-cloudy-night",
      cloudy: "cloudy",
      rain: "rain",
      sleet: "sleet",
      snow: "snow",
      wind: "wind",
      fog: "fog",
    };
    const encodedIconCode = iconMap[condition] || "default";
    return `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/2nd%20Set%20-%20Color/${encodedIconCode}.svg`;
  };

  const iconSize = {
    large: "150px",
    medium: "60px",
    small: "40px",
  };

  return (
    <img
      src={getIconUrl(condition)}
      alt={condition}
      style={{ width: iconSize[size], height: iconSize[size] }}
    />
  );
};

export default WeatherIcons;

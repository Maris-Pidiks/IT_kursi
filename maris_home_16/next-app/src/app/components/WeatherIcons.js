import React from "react";

const WeatherIcons = ({ condition }) => {
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

  return (
    <img
      src={getIconUrl(condition)}
      alt={condition}
      style={{ width: "200px", height: "200px" }}
    ></img>
  );
};

export default WeatherIcons;

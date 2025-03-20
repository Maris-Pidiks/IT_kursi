import React from "react";
import Image from "next/image";

function WeatherIcons({ condition, size = "medium", width, height, className = "" }) {
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

  const iconSize = {
    large: 150,
    medium: 60,
    small: 40,
  };

  const encodedIconCode = iconMap[condition] || "default";
  const iconUrl = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/2nd%20Set%20-%20Color/${encodedIconCode}.svg`;

  const finalWidth = width || iconSize[size];
  const finalHeight = height || iconSize[size];

  return (
    <Image
      src={iconUrl}
      alt={condition || "weather icon"}
      width={finalWidth}
      height={finalHeight}
      className={className}
    />
  );
}

export default WeatherIcons;

const input = document.querySelector(".input");
const searchForm = document.querySelector(".searchForm");
const searchBtn = document.querySelector(".searchBtn");
const weather = document.querySelector(".weather");

const apiKey = "SSNZEMK7VV6FBH4MBW8LZJM6T";

// Event Listeners
searchBtn.addEventListener("click", () => {
  if (input.value === "") {
    weather.innerHTML = `<p class="error">Please enter a city!</p>`;
  }
  if (input.value) {
    checkWeather(input.value);
    input.value = "";
  }
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    input.value = "";
  }
  if (event.key === "Enter" && input.value) {
    event.preventDefault();
    checkWeather(input.value);
    input.value = "";
  }
});

// Fetch weather forecast
const checkWeather = async (city) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`
    );
    const data = await response.json();
    console.log(data);

    const currentWeatherTemplate = document.getElementById(
      "current-weather-template"
    ).innerHTML;
    const hourForecastTemplate = document.getElementById(
      "hour-forecast-template"
    ).innerHTML;
    const forecastSectionTemplate = document.getElementById(
      "forecast-section-template"
    ).innerHTML;

    const currentWeatherHTML = currentWeatherTemplate
      .replace("{{icon}}", getWeatherIcon(data.currentConditions.icon))
      .replace("{{temp}}", Math.round(((data.currentConditions.temp - 32) * 5) / 9))
      .replace("{{city}}", data.address.toUpperCase())
      .replace("{{humidity}}", data.currentConditions.humidity)
      .replace("{{windSpeed}}", Math.round(data.currentConditions.windspeed));

    weather.innerHTML = currentWeatherHTML + forecastSectionTemplate;

    const tabsGrid = weather.querySelector(".tabs-grid");
    const forecastContent = weather.querySelector(".forecast-content");

    // Create tabs and content for each day
    data.days.slice(0, 14).forEach((day, index) => {
      const date = new Date(day.datetime);
      const dayName = date
        .toLocaleDateString("en-US", { weekday: "short" })
        .toUpperCase();
      const monthName = date.toLocaleDateString("en-US", { month: "short" });
      const dayNameLong = date.toLocaleDateString("en-US", { weekday: "long" });
      const monthNameLong = date.toLocaleDateString("en-US", { month: "long" });
      const dayNumber = date.getDate();

      // Create tab button
      const tabButton = document.createElement("button");
      tabButton.className = "forecast-tab";
      tabButton.innerHTML = `<p class="dayName">${dayName}</p><br>${monthName}<br>${dayNumber}`;
      tabsGrid.appendChild(tabButton);

      // Create content for this day
      const content = document.createElement("div");
      content.className = "forecast-day";
      content.style.display = "none";

      // Create hourly forecast HTML
      const hourlyHTML = day.hours
        .map((hour) => {
          const hourTime = hour.datetime.split(":")[0].padStart(2, "0");
          const formattedHour = `${hourTime}:00`;

          return hourForecastTemplate
            .replace("{{hourTime}}", formattedHour)
            .replace("{{icon}}", getWeatherIcon(hour.icon))
            .replace("{{temp}}", Math.round(((hour.temp - 32) * 5) / 9));
        })
        .join("");

      content.innerHTML = `
    <div class="forecast-header"><h4 class="forecast-date">${dayNameLong}, ${monthNameLong} ${dayNumber}</h4>
          <i class="fas fa-times close-forecast"></i></div>
              <div class="hourly-container">
      ${hourlyHTML}
    </div>
  </div>
`;

      content.querySelector(".close-forecast").addEventListener("click", () => {
        content.style.display = "none";
      });

      forecastContent.appendChild(content);

      // Add click event to tab
      tabButton.addEventListener("click", () => {
        document.querySelectorAll(".forecast-day").forEach((content) => {
          content.style.display = "none";
        });
        document.querySelectorAll(".forecast-tab").forEach((tab) => {
          tab.classList.remove("active");
        });
        content.style.display = "block";
        tabButton.classList.add("active");
      });
    });
  } catch (error) {
    weather.innerHTML = `<p class="error">Can't get data for ${city.toUpperCase()}!</p>`;
  }
};

// Icons from visualcrossing.com
function getWeatherIcon(iconCode) {
  if (!iconCode) iconCode = "clear-day";
  // URL encode the icon code to handle special characters
  const encodedIconCode = encodeURIComponent(iconCode);
  return `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/2nd%20Set%20-%20Color/${encodedIconCode}.svg`;
}

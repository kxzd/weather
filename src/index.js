const cityName = document.querySelector(".city-name");
const cityCurrentDate = document.querySelector(".current-date");
const cityCurrentTime = document.querySelector(".current-time");
const cityTemp = document.querySelector(".temp");
const cityWeatherType = document.querySelector(".weather-type");
const cityFeelsLike = document.querySelector(".feels-like");
const cityHumidity = document.querySelector(".humidity");
const cityWind = document.querySelector(".wind");
const weatherImage = document.querySelector(".weather-image");
const tempChange = document.querySelector(".temp-change");
const form = document.querySelector("form");
const input = document.querySelector("[data-search-input]");

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getDateTime(data) {
  const date = new Date();
  const time = date.getTime();
  const localOffset = date.getTimezoneOffset() * 60000;
  const utc = time + localOffset;
  const localTime = utc + 1000 * data.timezone;
  const dateAndTime = new Date(localTime);
  return dateAndTime;
}

function getWeatherImage(data) {
  const weather = data.weather[0].main;
  switch (weather) {
    case "Clear":
      weatherImage.src = "./img/clear.svg";
      break;
    case "Clouds":
      weatherImage.src = "./img/cloudy.svg";
      break;
    case "Rain":
    case "Drizzle":
    case "Mist":
      weatherImage.src = "./img/rain.svg";
      break;
    case "Thunderstorm":
      weatherImage.src = "./img/thunder.svg";
      break;
    case "Snow":
      weatherImage.src = "./img/snow.svg";
      break;
    default:
      weatherImage.src = "";
  }
}

async function getWeather(units, city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=7470ed2b0f9dc40d12a6d5af68a85501`;
  try {
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();

    cityName.innerText = `${data.name}, ${data.sys.country}`.toUpperCase();

    const dateAndTime = getDateTime(data);
    const date = dateAndTime.toLocaleDateString();
    const time = dateAndTime.toLocaleTimeString();

    cityCurrentDate.innerText = `${date}, `;
    cityCurrentTime.innerText = `${time}`;

    const weatherType = data.weather[0].description;
    cityWeatherType.innerText = capitaliseFirstLetter(weatherType);

    if (units === "metric") {
      cityTemp.innerText = `${Math.round(data.main.temp)}??C`;
      cityFeelsLike.innerText = `${Math.round(data.main.feels_like)}??C`;
      const windSpeed = Math.round(data.wind.speed * 3.6);
      cityWind.innerText = `${windSpeed} km/h`;
    } else if (units === "imperial") {
      cityTemp.innerText = `${Math.round(data.main.temp)}??F`;
      cityFeelsLike.innerText = `${Math.round(data.main.feels_like)}??F`;
      cityWind.innerText = `${Math.round(data.wind.speed)} mph`;
    }
    cityHumidity.innerText = `${data.main.humidity}%`;
    getWeatherImage(data);
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const citySearch = input.value;
  input.value = "";
  if (tempChange.innerText === "Display in ??C") {
    getWeather("imperial", citySearch);
  } else if (tempChange.innerText === "Display in ??F") {
    getWeather("metric", citySearch);
  }
});

tempChange.addEventListener("click", (e) => {
  if (tempChange.innerText === "Display in ??F") {
    tempChange.innerText = "Display in ??C";
    getWeather("imperial", cityName.innerText);
  } else if (tempChange.innerText === "Display in ??C") {
    tempChange.innerText = "Display in ??F";
    getWeather("metric", cityName.innerText);
  }
});

getWeather("metric", "New York");

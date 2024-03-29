import "../styles/WeatherWidget.css";

export const WeatherWidget = () => {
  const widgetsContainer = document.createElement("div");
  widgetsContainer.classList.add("widgets-container");
  const weatherWidget = document.createElement("div");
  weatherWidget.classList.add("weather-widget");

  const city = document.createElement("h2");
  city.classList.add("weather-widget-city");
  city.innerText = "Tbilisi";

  const weatherAndTemp = document.createElement("div");
  weatherAndTemp.classList.add("weather-and-temp");
  const weatherIcon = document.createElement("img");
  weatherIcon.classList.add("weather-icon");

  const temp = document.createElement("h2");

  const requestUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            resolve(`${lat},${lon}`);
          },
          () => {
            resolve("Tbilisi");
          }
        );
      } else {
        resolve("Tbilisi");
      }
    });
  };

  const getWeatherData = async () => {
    const location = await requestUserLocation();

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=e23a91944f1d47e890b132759231304&q=${location}`
    );
    const weatherData = await response.json();
    city.innerHTML = weatherData.location.name;
    weatherIcon.src = weatherData.current.condition.icon;
    temp.innerHTML = `${weatherData.current.temp_c}°C`;
    weatherAndTemp.append(weatherIcon, temp);
    weatherWidget.append(weatherAndTemp, city);
    return weatherData;
  };
  getWeatherData();
  const title = document.createElement("h1");
  title.innerHTML = "To Do List";
  title.classList.add("app-title");
  widgetsContainer.append(title, weatherWidget);
  return widgetsContainer;
};

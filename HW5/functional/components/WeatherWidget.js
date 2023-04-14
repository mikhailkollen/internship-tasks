export const WeatherWidget = () => {
  const weatherWidget = document.createElement("div");
  weatherWidget.classList.add("weather-widget");

  const city = document.createElement("h2");
  city.classList.add("weather-widget-city");
  city.innerText = "Tbilisi";

  const weatherAndTemp = document.createElement("div");
  weatherAndTemp.classList.add("weather-and-temp");
  const weatherIcon = document.createElement("img");

  const temp = document.createElement("h2");

  const getWeatherData = async () => {
    const response = await fetch(
      "https://api.weatherapi.com/v1/current.json?key=e23a91944f1d47e890b132759231304&q=Tbilisi"
    );
    // const response = await fetch(
    //   `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=Tbilisi`
    // );
    const weatherData = await response.json();
    console.log(weatherData);
    city.innerHTML = weatherData.location.name;
    weatherIcon.src = weatherData.current.condition.icon;
    temp.innerHTML = `${weatherData.current.temp_c}°C`;
    weatherAndTemp.append(weatherIcon, temp);
    weatherWidget.append(weatherAndTemp, city);
    return weatherData;
  };
  getWeatherData();

  return weatherWidget;
};

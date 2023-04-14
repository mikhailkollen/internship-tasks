export const WeatherWidget = () => {
  const weatherWidget = document.createElement("div");
  weatherWidget.classList.add("weather-widget");
  weatherWidget.innerHTML = `Hello there`;
  console.log("hi!");
  let weatherData = {};
  const getWeatherData = async () => {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=Tbilisi`
    );
    const data = await response.json();
    weatherData = data;
    console.log(weatherData);
    return data;
  };
  getWeatherData();

  return weatherWidget;
};

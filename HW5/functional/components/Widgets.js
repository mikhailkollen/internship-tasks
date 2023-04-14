import { WeatherWidget } from "./WeatherWidget.js";

export const Widgets = () => {
  const widgetsContainer = document.createElement("div");
  widgetsContainer.classList.add("widgets-container");
  const weatherWidget = WeatherWidget();
  widgetsContainer.appendChild(weatherWidget);
  return widgetsContainer;
};

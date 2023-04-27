import { WeatherWidget } from "./WeatherWidget.js";

export const Widgets = () => {
  const widgetsContainer = document.createElement("div");
  widgetsContainer.classList.add("widgets-container");
  const weatherWidget = WeatherWidget();
  const title = document.createElement("h1");
  title.innerHTML = "To Do List";
  title.classList.add("app-title");
  widgetsContainer.append(title, weatherWidget);
  return widgetsContainer;
};

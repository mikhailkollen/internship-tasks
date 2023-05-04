import { AllLists } from "./components/AllLists";
import { Button } from "./components/Button";
import { SearchInput } from "./components/Search";
import { Modal } from "./components/Modal";
import { WeatherWidget } from "./components/WeatherWidget";
import { updateTasks, showTodayTasks, addOverlay } from "./utils";
import { TodayTasksModal } from "./components/TodayTasksModal";
import "./styles/css-reset.css";
import "./styles/index.css";

(function () {
  let state: any = undefined;

  const useState = (initialValue: any): [any, (newValue: any) => void] => {
    state = state || initialValue;
    function setValue(newValue: any) {
      state = newValue;
      renderApp();
    }
    return [state, setValue];
  }

  function App(): HTMLElement {
    const [allTasks, setAllTasks] = useState([]);
    const getTasksFromTheServer = async () => {
      const response = await fetch("https://tough-bee-bonnet.cyclic.app/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
      const tasks = await response.json();
      if (tasks) {
        updateTasks(tasks, setAllTasks);
        showTodayTasks(tasks, TodayTasksModal);
      }
      return tasks;
    };

    window.addEventListener("load", async () => {
      await getTasksFromTheServer();
    });

    const div = document.createElement("div");
    div.classList.add("app");
    const modal = Modal({ children: { setAllTasks, allTasks } });
    const list = AllLists({ children: { allTasks, setAllTasks } });
    const button = Button({
      text: "+ New Task",
      onClick: () => {
      addOverlay();
      div.append(modal);}, 
      className: "add-task-button",
    });
    const searchInput = SearchInput({
      onInput: filterItems,
    });

    function filterItems(value: string) {
      const items = document.querySelectorAll("li");

      items.forEach((item: HTMLElement) => {
        if (item.dataset.value?.toLowerCase().includes(value.toLowerCase())) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    }

    const header = document.createElement("div");
    header.classList.add("header");
    const searchContainer = document.createElement("div");
    searchContainer.classList.add("search-container");
    searchContainer.append(searchInput, button);
    const weatherWidget = WeatherWidget();
    header.append(weatherWidget, searchContainer);
    div.append(header, list);

    return div;
  }

  /**
   * Render the app.
   * On change whole app is re-rendered.
   */
  function renderApp() {
    const appContainer = document.getElementById("functional") as HTMLElement;
    appContainer.innerHTML = "";
    appContainer.append(App());
  }

  // initial render
  renderApp();
})();

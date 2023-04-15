import { AllLists } from "./components/AllLists.js";
import { Button } from "./components/Button.js";
import { SearchInput } from "./components/Search.js";
import { Modal } from "./components/Modal.js";
import { Widgets } from "./components/Widgets.js";
import {
  checkIfToday,
  addOverlay,
  checkIfModalShownToday,
  setModalShown,
} from "./utils.js";
import { ListItem } from "./components/Item.js";
import { TodayTasksModal } from "./components/TodayTasksModal.js";

(function () {
  let state = undefined;

  /**
   * Global application state
   * @template T
   * @param {T} initialValue
   * @returns {[T, function(T): void]}
   */
  function useState(initialValue) {
    state = state || initialValue;

    function setValue(newValue) {
      state = newValue;
      renderApp();
    }

    return [state, setValue];
  }

  /**
   * Functional component for the list
   * @param items {string[]}
   * @returns {HTMLElement} - List element
   */

  /**
   * Button component
   * @param text {string}
   * @param onClick {function}
   * @returns {HTMLButtonElement} - Button element
   */

  /**
   * App container
   * @returns {HTMLDivElement} - The app container
   */

  function App() {
    const localStorageTasks = localStorage.getItem("tasks");
    const [allTasks, setAllTasks] = useState([]);

    const getTasksFromTheServer = async () => {
      const response = await fetch("http://localhost:3004/tasks/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
      const tasks = await response.json();
      if (tasks) {
        setAllTasks(tasks);
      }
      return tasks;
    };

    const todayTasks = allTasks.filter((task) => {
      if (!task.isCompleted) {
        return checkIfToday(task.date);
      }
    });
    if (todayTasks.length && checkIfModalShownToday() === false) {
      TodayTasksModal(todayTasks);
    }

    window.addEventListener("load", async () => {
      await getTasksFromTheServer();
    });

    const div = document.createElement("div");
    div.classList.add("app");
    const modal = Modal({ children: { setAllTasks, allTasks } });
    const list = AllLists({ allTasks, setAllTasks });
    const button = Button({
      text: "+ New Task",
      onClick: () => addItem(modal),
      className: "add-task-button",
    });
    const searchInput = SearchInput({
      onInput: filterItems,
    });

    function filterItems(value) {
      const items = document.querySelectorAll("li");

      // search between not completed items
      const unfinishedItems = [...items].filter(
        (item) => !item.classList.contains("completed")
      );
      unfinishedItems.forEach((item) => {
        if (item.dataset.value.toLowerCase().includes(value.toLowerCase())) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });

      // search between all items
      // items.forEach((item) => {
      //   if (item.dataset.value.toLowerCase().includes(value.toLowerCase())) {
      //     item.style.display = "flex";
      //   } else {
      //     item.style.display = "none";
      //   }
      // });
    }

    function addItem(modal) {
      const overlay = document.createElement("div");
      overlay.classList.add("overlay");
      document.body.append(overlay);
      overlay.addEventListener("click", () => {
        overlay.remove();
        const modalInput = document.querySelector("#modal-input");
        modalInput.value = "";
        modal.remove();
      });
      div.append(modal);
    }

    const header = document.createElement("div");
    header.classList.add("header");
    const searchContainer = document.createElement("div");
    searchContainer.classList.add("search-container");
    searchContainer.append(searchInput, button);
    const widgets = Widgets();
    header.append(widgets, searchContainer);
    div.append(header, list);

    return div;
  }

  /**
   * Render the app.
   * On change whole app is re-rendered.
   */
  function renderApp() {
    const appContainer = document.getElementById("functional");
    appContainer.innerHTML = "";
    appContainer.append(App());
  }

  // initial render
  renderApp();
})();

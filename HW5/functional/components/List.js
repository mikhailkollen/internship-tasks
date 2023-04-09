import { ListItem } from "./Item.js";
import { Button } from "./Button.js";

export function List({ allTasks, setAllTasks }) {
  const allLists = document.createElement("div");
  allLists.classList.add("all-lists");

  const list = document.createElement("div");
  list.classList.add("list");
  const title = document.createElement("h2");
  title.innerHTML = "All Tasks";
  title.classList.add("list-title");
  list.append(title);
  const completedList = document.createElement("div");
  completedList.classList.add("list");
  const completedTitle = document.createElement("h2");
  completedTitle.innerHTML = "Completed Tasks";
  completedTitle.classList.add("list-title");
  completedList.append(completedTitle);
  allLists.append(list);
  allLists.append(completedList);
  const tasks = document.createElement("ul");
  const completedTasks = document.createElement("ul");
  completedList.append(completedTasks);
  list.append(tasks);
  if (allTasks) {
    const listItems = allTasks.filter((task) => {
      if (task.status !== "completed") {
        return task;
      }
    });
    const completedListItems = allTasks.filter((task) => {
      if (task.status === "completed") {
        return task;
      }
    });
    const updateLocalStorage = (newTasks) => {
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    };
    const completedTaskElements = completedListItems.map((task) => {
      const li = ListItem({ task });
      const button = Button({
        onClick: () => {
          const newTasks = allTasks.filter((item) => item !== task);
          setAllTasks(newTasks);
          updateLocalStorage(newTasks);
          li.remove();
        },
      });
      button.classList.add("delete-button");
      li.append(button);
      li.firstChild.addEventListener("click", () => {
        if (li.classList.contains("completed")) {
          li.classList.remove("completed");
          completedTasks.append(li);
          const updatedLocalStorage = allTasks.map((item) => {
            if (item.title === task.title) {
              item.status = "completed";
            }
            return item;
          });
          updateLocalStorage(updatedLocalStorage);
          li.querySelector("button").style.display = "none";
        } else {
          li.classList.add("completed");
          tasks.append(li);
          const updatedLocalStorage = allTasks.map((item) => {
            if (item.title === task.title) {
              item.status = null;
            }
            return item;
          });
          updateLocalStorage(updatedLocalStorage);
          li.querySelector("button").style.display = "block";
        }
      });
      return li;
    });

    const taskElements = listItems.map((task) => {
      const li = ListItem({ task });
      const button = Button({
        onClick: () => {
          const newTasks = allTasks.filter((item) => item !== task);
          updateLocalStorage(newTasks);
          setAllTasks(newTasks);
          li.remove();
        },
      });
      button.classList.add("delete-button");

      li.append(button);

      li.firstChild.addEventListener("click", () => {
        if (li.classList.contains("completed")) {
          li.classList.remove("completed");
          completedTasks.append(li);
          const updatedLocalStorage = allTasks.map((item) => {
            if (item.title === task.title) {
              item.status = "completed";
            }
            return item;
          });
          updateLocalStorage(updatedLocalStorage);
          li.querySelector("button").style.display = "none";
        } else {
          li.classList.add("completed");
          tasks.append(li);
          const updatedLocalStorage = allTasks.map((item) => {
            if (item.title === task.title) {
              item.status = null;
            }
            return item;
          });
          updateLocalStorage(updatedLocalStorage);
          li.querySelector("button").style.display = "block";
        }
      });
      return li;
    });

    tasks.append(...taskElements);
    completedTasks.append(...completedTaskElements);
  }
  return allLists;
}

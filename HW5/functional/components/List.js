import { ListItem } from "./Item.js";
import { Button } from "./Button.js";
import { tagLabels } from "../utils.js";

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
  const unfinishedTasks = document.createElement("ul");
  const completedTasks = document.createElement("ul");
  completedList.append(completedTasks);
  list.append(unfinishedTasks);
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

    // Render completed tasks
    const completedTaskElements = completedListItems.map((task) => {
      const li = ListItem({ task });
      const checkbox = li.querySelector("input");
      const button = Button({
        onClick: () => {
          const newTasks = allTasks.filter((item) => item !== task);
          setAllTasks(newTasks);
          updateLocalStorage(newTasks);
          li.remove();
        },
        className: "delete-button",
      });
      li.append(button);
      button.style.display = "none";
      checkbox.addEventListener("change", () => {
        if (li.classList.contains("completed")) {
          li.classList.remove("completed");
          unfinishedTasks.append(li);
          const updatedLocalStorage = allTasks.map((item) => {
            if (item.title === task.title) {
              item.status = null;
            }
            return item;
          });
          li.querySelector("button").style.display = "block";
          let tag = li.querySelector(".tag-label");
          for (let i = 0; i < tagLabels.length; i++) {
            if (tagLabels[i].tag === tag.innerHTML) {
              tag.style.backgroundColor = tagLabels[i].bgColor;
              tag.style.color = tagLabels[i].color;
            }
          }
          updateLocalStorage(updatedLocalStorage);
        } else {
          li.classList.add("completed");
          completedTasks.append(li);
          const updatedLocalStorage = allTasks.map((item) => {
            if (item.title === task.title) {
              item.status = "completed";
            }
            return item;
          });
          li.querySelector("button").style.display = "none";
          let tag = li.querySelector(".tag-label");
          tag.style.backgroundColor = "#F5F5F5";
          tag.style.color = "#838383";
          updateLocalStorage(updatedLocalStorage);
        }
      });
      return li;
    });

    // Render unfinished tasks
    const taskElements = listItems.map((task) => {
      const li = ListItem({ task });
      const checkbox = li.querySelector("input");

      const button = Button({
        onClick: () => {
          const newTasks = allTasks.filter((item) => item !== task);
          updateLocalStorage(newTasks);
          setAllTasks(newTasks);
          li.remove();
        },
        className: "delete-button",
      });

      li.append(button);

      checkbox.addEventListener("change", () => {
        if (li.classList.contains("completed")) {
          li.classList.remove("completed");
          unfinishedTasks.append(li);
          const updatedLocalStorage = allTasks.map((item) => {
            if (item.title === task.title) {
              item.status = null;
            }
            return item;
          });
          li.querySelector("button").style.display = "block";
          let tag = li.querySelector(".tag-label");
          for (let i = 0; i < tagLabels.length; i++) {
            if (tagLabels[i].tag === tag.innerHTML) {
              tag.style.backgroundColor = tagLabels[i].bgColor;
              tag.style.color = tagLabels[i].color;
            }
          }
          updateLocalStorage(updatedLocalStorage);
        } else {
          li.classList.add("completed");
          completedTasks.append(li);
          const updatedLocalStorage = allTasks.map((item) => {
            if (item.title === task.title) {
              item.status = "completed";
            }
            return item;
          });
          li.querySelector("button").style.display = "none";
          let tag = li.querySelector(".tag-label");
          tag.style.backgroundColor = "#F5F5F5";
          tag.style.color = "#838383";
          updateLocalStorage(updatedLocalStorage);
        }
      });
      return li;
    });

    unfinishedTasks.append(...taskElements);
    completedTasks.append(...completedTaskElements);
  }
  return allLists;
}

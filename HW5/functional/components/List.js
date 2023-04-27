import { Button } from "./Button.js";
import { ListItem } from "./Item.js";
import { tagLabels } from "../utils.js";
import { updateLocalStorage } from "../utils.js";
import {
  deleteTaskFromTheServer,
  updateTaskOnTheServer,
  updateTasks,
} from "../utils.js";

export const List = ({
  listItems,
  allTasks,
  setAllTasks,
  titleText,
  titleClassName,
  listClassName,
}) => {
  const listContainer = document.createElement("div");
  listContainer.classList.add("list");
  const title = document.createElement("h2");
  title.innerHTML = titleText;
  title.classList.add(titleClassName);
  listContainer.append(title);

  const list = document.createElement("ul");
  list.classList.add(listClassName);

  const taskElements = listItems.map((task) => {
    const li = ListItem({ task, isModalTask: false });
    const checkbox = li.querySelector("input");
    const button = Button({
      onClick: () => {
        const newTasks = allTasks.filter((item) => item !== task);
        updateTasks(newTasks, setAllTasks);
        deleteTaskFromTheServer(task._id);
        li.remove();
      },
      className: "delete-button",
    });
    li.append(button);
    if (task.isCompleted === true) {
      button.style.display = "none";
    }

    checkbox.addEventListener("change", () => {
      if (li.classList.contains("completed")) {
        li.classList.remove("completed");
        const unfinishedTasks = document.querySelector(
          ".unfinished-tasks-list"
        );
        unfinishedTasks.append(li);
        const newTasks = allTasks.map((item) => {
          if (item._id === task._id) {
            item.isCompleted = false;
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
        updateTaskOnTheServer({ ...task, isCompleted: false });

        updateTasks(newTasks, setAllTasks);
      } else {
        li.classList.add("completed");
        const completedTasks = document.querySelector(".completed-tasks-list");
        completedTasks.append(li);
        const newTasks = allTasks.map((item) => {
          if (item._id === task._id) {
            item.isCompleted = true;
          }
          return item;
        });
        li.querySelector("button").style.display = "none";
        let tag = li.querySelector(".tag-label");
        tag.style.backgroundColor = "#F5F5F5";
        tag.style.color = "#838383";
        updateTaskOnTheServer({ ...task, isCompleted: true });
        updateTasks(newTasks, setAllTasks);
      }
    });
    return li;
  });
  list.append(...taskElements);
  listContainer.append(list);
  return listContainer;
};

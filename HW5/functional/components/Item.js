import { tagLabels, checkIfToday, checkIfTomorrow } from "../utils.js";

export const ListItem = ({ task }) => {
  const li = document.createElement("li");
  li.setAttribute("data-value", `${task.title}`);
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "list-item-checkbox");

  const label = document.createElement("label");
  label.setAttribute("class", "list-item");
  const taskTitle = document.createElement("p");
  taskTitle.classList.add("task-title");
  taskTitle.innerHTML = task.title;
  const tagContainer = document.createElement("div");
  tagContainer.classList.add("list-item-tag-container");
  const tag = document.createElement("span");
  tag.classList.add("tag-label");

  tag.innerHTML = task.tag;

  tagLabels.forEach((label) => {
    if (label.tag === task.tag) {
      tag.style.backgroundColor = label.bgColor;
      tag.style.color = label.color;
    }
  });

  const deadline = document.createElement("p");
  deadline.classList.add("deadline");

  if (checkIfToday(task.date)) {
    deadline.innerHTML = "Today";
  } else if (checkIfTomorrow(task.date)) {
    deadline.innerHTML = "Tomorrow";
  } else {
    const date = new Date(task.date).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
    deadline.innerHTML = date;
  }
  const tagDateContainer = document.createElement("div");
  tagDateContainer.classList.add("task-tag-container");
  tagDateContainer.append(tag, deadline);

  tagContainer.append(taskTitle, tagDateContainer);

  label.append(checkbox, tagContainer);
  label.classList.add("list-item-label");
  li.append(label);
  if (task.status) {
    checkbox.setAttribute("checked", "true");
    li.classList.add("completed");
    tag.style.backgroundColor = "#F5F5F5";
    tag.style.color = "#838383";
  }

  return li;
};

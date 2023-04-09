import { tagLabels } from "../tagLabels.js";

export const ListItem = ({ task }) => {
  const li = document.createElement("li");
  const date = new Date();
  const options = { weekday: "long", day: "numeric", month: "short" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const id = date.getTime();
  li.setAttribute("id", `${id}`);
  li.setAttribute("data-value", `${task.title}`);
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "list-item-checkbox");
  if (task.status) {
    checkbox.setAttribute("checked", "true");
    li.classList.add("completed");
  }

  checkbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      li.classList.add("completed");
    } else {
      li.classList.remove("completed");
    }
  });
  const label = document.createElement("label");
  label.setAttribute("class", "list-item");
  const div = document.createElement("div");
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
  deadline.innerHTML = task.date;
  const tagDateContainer = document.createElement("div");
  tagDateContainer.classList.add("tag-date-container");
  tagDateContainer.append(tag, deadline);

  tagContainer.append(taskTitle, tagDateContainer);

  label.append(checkbox, tagContainer);
  label.classList.add("list-item-label");
  li.append(label);

  return li;
};

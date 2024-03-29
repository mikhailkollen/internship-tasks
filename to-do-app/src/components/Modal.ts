import { addOverlay, tagLabels } from "../utils";
import { addTaskToTheServer, updateTasks } from "../utils";
import { StateProps, Task } from "../types";
import "../styles/Modal.css";

export const Modal = ({ children }: StateProps) => {
  const { setAllTasks, allTasks } = children;
  const modal = document.createElement("form");
  modal.classList.add("modal");
  modal.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
  });

  const title = document.createElement("label");
  title.classList.add("modal-title");
  title.textContent = "Add New Task";
  modal.appendChild(title);

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Task Title");
  input.setAttribute("id", "modal-input");
  modal.appendChild(input);

  const tagDateContainer = document.createElement("div");
  tagDateContainer.classList.add("tag-date-container");

  const tagContainer = document.createElement("div");
  tagContainer.classList.add("tag-container");

  for (let i = 0; i < tagLabels.length; i++) {
    const label = document.createElement("label");
    label.classList.add("tag-label");

    const radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "tags");
    radio.setAttribute("value", tagLabels[i].tag);
    if (i === 0) {
      radio.setAttribute("checked", "");
      label.style.borderColor = tagLabels[i].color;
      label.style.borderWidth = "1px";
      label.style.borderStyle = "solid";
    }
    radio.addEventListener("change", (e) => {
      let clickedLabel = (e.target as HTMLElement).parentElement;

      const otherLabels = Array.from(
        document.querySelectorAll(".tag-label")
      ).filter((label) => label !== clickedLabel && label instanceof HTMLElement);

      otherLabels.forEach((label) => {
        (label as HTMLElement).style.borderColor = "transparent";
        (label as HTMLElement).style.borderWidth = "0px";
        (label as HTMLElement).style.borderStyle = "none";
      });

      if (e.target && (e.target as HTMLInputElement).checked) {
        if (clickedLabel instanceof HTMLElement) {
          clickedLabel.style.borderColor = tagLabels[i].color;
          clickedLabel.style.borderWidth = "1px";
          clickedLabel.style.borderStyle = "solid";
        }
      } else {
        if (clickedLabel instanceof HTMLElement) {
          clickedLabel.style.borderColor = "transparent";
          clickedLabel.style.borderWidth = "0px";
          clickedLabel.style.borderStyle = "none";
        }
      }
    });
    const text = document.createTextNode(tagLabels[i].tag);
    label.appendChild(radio);
    label.appendChild(text);
    label.style.backgroundColor = tagLabels[i].bgColor;
    label.style.color = tagLabels[i].color;

    tagContainer.appendChild(label);
  }

  tagDateContainer.appendChild(tagContainer);
  const dateInput = document.createElement("input");
  dateInput.setAttribute("type", "date");
  dateInput.setAttribute("placeholder", "Due Date");
  dateInput.setAttribute("min", new Date().toISOString().split("T")[0]);
  dateInput.setAttribute("id", "modal-date");
  dateInput.value = new Date().toISOString().split("T")[0];
  tagDateContainer.appendChild(dateInput);
  modal.appendChild(tagDateContainer);

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancel-button");
  cancelButton.setAttribute("type", "button");
  cancelButton.textContent = "Cancel";
  cancelButton.onclick = () => {
    closeModal();
  };
  const addButton = document.createElement("button");
  addButton.classList.add("add-button");
  addButton.setAttribute("type", "submit");
  addButton.textContent = "Add";

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("modal-button-container");
  buttonContainer.append(cancelButton, addButton);
  modal.append(buttonContainer);

  input.addEventListener("input", (event) => {
    if (event.target instanceof HTMLInputElement) {
      const value = event.target.value.trim();
      addButton.classList.toggle("add-button-active", value !== "");
    }
  });

  const closeModal = () => {
    const overlay = document.querySelector(".overlay");
    input.value = "";
    dateInput.value = new Date().toISOString().split("T")[0];
    overlay?.remove();
    modal.remove();
  }

  const addTask = () => {
    const inputValue = input.value.trim();
    const dateValue = new Date(dateInput.value);
    if (inputValue === "") {
      alert("Please enter a valid task title");
      return;
    }
    const selectedTag = (document.querySelector(
      'input[name="tags"]:checked'
    ) as HTMLInputElement)?.value;

    const newTask: Task = {
      title: inputValue,
      isCompleted: false,
      tag: selectedTag,
      date: dateValue,
    };

    addTaskToTheServer(newTask).then((response) => {
      newTask._id = response._id;
      const newTasks = allTasks ? [...allTasks, newTask] : [newTask];
      updateTasks(newTasks, setAllTasks);
      closeModal();
    });
  }

  return modal;
}

import { tagLabels } from "../tagLabels.js";

export function Modal({ children }) {
  const { setAllTasks, allTasks } = children;

  const modal = document.createElement("form");
  modal.classList.add("modal");
  modal.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
  });

  const title = document.createElement("label");
  title.classList.add("list-title");
  title.textContent = "Add New Task";
  modal.appendChild(title);

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Task Title");
  input.setAttribute("id", "modal-input");
  modal.appendChild(input);

  // Create container for tags
  const tagDateContainer = document.createElement("div");
  tagDateContainer.classList.add("tag-date-container");

  // Create radio buttons for tags
  const tagContainer = document.createElement("div");
  tagContainer.classList.add("tag-container");

  const tagLabels = [
    { tag: "health", bgColor: "#3c86f44f", color: "#0053CF" },
    { tag: "work", bgColor: "#E8D7FF", color: "#9747FF" },
    { tag: "home", bgColor: "#E2F7E2", color: "#639462" },
    { tag: "other", bgColor: "#FFECC7", color: "#EA8C00" },
  ];
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
      for (let j = 0; j < tagLabels.length; j++) {
        const parent = document.querySelectorAll(".tag-label")[j];
        parent.style.borderColor = "transparent";
        parent.style.borderWidth = "0px";
        parent.style.borderStyle = "none";
      }
      if (e.target.checked) {
        const parent = e.target.parentElement;
        parent.style.borderColor = tagLabels[i].color;
        parent.style.borderWidth = "1px";
        parent.style.borderStyle = "solid";
      } else {
        const parent = e.target.parentElement;
        parent.style.borderColor = "transparent";
        parent.style.borderWidth = "0px";
        parent.style.borderStyle = "none";
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
    const value = event.target.value.trim();
    addButton.classList.toggle("add-button-active", value !== "");
  });

  function closeModal() {
    const overlay = document.querySelector(".overlay");
    input.value = "";
    dateInput.value = "";
    overlay.remove();
    modal.remove();
  }

  function addTask() {
    const inputValue = input.value.trim();
    const dateValue = new Date(dateInput.value).toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
    if (inputValue === "") {
      alert("Please enter a valid task title");
      return;
    }
    const selectedTag = document.querySelector(
      'input[name="tags"]:checked'
    ).value;
    const newTask = {
      title: inputValue,
      status: null,
      tag: selectedTag,
      date: dateValue,
    };
    const newTasks = allTasks ? [...allTasks, newTask] : [newTask];
    setAllTasks(newTasks);
    updateLocalStorage(newTasks);
    closeModal();
  }

  function updateLocalStorage(newTasks) {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  return modal;
}

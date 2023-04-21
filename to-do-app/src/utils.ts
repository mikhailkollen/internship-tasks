import { Task, Id, Modal, TodayTasksModalType } from "./types";

export const tagLabels = [
  { tag: "health", bgColor: "#3c86f44f", color: "#0053CF" },
  { tag: "work", bgColor: "#E8D7FF", color: "#9747FF" },
  { tag: "home", bgColor: "#E2F7E2", color: "#639462" },
  { tag: "other", bgColor: "#FFECC7", color: "#EA8C00" },
];

export const checkIfToday = (date: Date) => {
  const today = new Date();
  const checkDate = new Date(date);
  return (
    today.getDate() === checkDate.getDate() &&
    today.getMonth() === checkDate.getMonth() &&
    today.getFullYear() === checkDate.getFullYear()
  );
};

export const checkIfTomorrow = (date: Date) => {
  const today = new Date();
  const checkDate = new Date(date);
  return (
    today.getDate() + 1 === checkDate.getDate() &&
    today.getMonth() === checkDate.getMonth() &&
    today.getFullYear() === checkDate.getFullYear()
  );
};

export const updateLocalStorage = (newTasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(newTasks));
};

export const addTaskToTheServer = async (task: Task) => {
  const response = await fetch("https://tough-bee-bonnet.cyclic.app/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const deleteTaskFromTheServer = async (id: Id) => {
  const response = await fetch(`https://tough-bee-bonnet.cyclic.app/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const updateTaskOnTheServer = async (task: Task) => {
  const response = await fetch(
    `https://tough-bee-bonnet.cyclic.app/${task._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export const addOverlay = () => {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.append(overlay);
  overlay.addEventListener("click", () => {
    overlay.remove();
    const modal = document.querySelector(".modal");
    if (modal) {
      modal.remove();
    }
  });
  return overlay;
};

export const checkIfModalShownToday = () => {
  const localStorageModal = localStorage.getItem("todayTasksShown");
  if (!localStorageModal) {
    return false;
  }
  const today = new Date();
  const todayDate = `${today.getDate()}.${today.getMonth() + 1
    }.${today.getFullYear()}`;
  return localStorageModal === todayDate;
};

export const setModalShown = () => {
  const today = new Date();
  const todayDate = `${today.getDate()}.${today.getMonth() + 1
    }.${today.getFullYear()}`;
  localStorage.setItem("todayTasksShown", todayDate);
};

export const showTodayTasks = (tasks: Task[], TodayTasksModal: TodayTasksModalType) => {
  const todayTasks = tasks.filter((task) => {
    if (!task.isCompleted) {
      return checkIfToday(task.date);
    }
  });
  if (todayTasks.length && checkIfModalShownToday() === false) {
    TodayTasksModal(todayTasks);
  } else {
    setModalShown();
  }
};

export const updateTasks = (tasks: Task[], setAllTasks: (newValue: Task[]) => void) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  setAllTasks(tasks);
};

export const setCorrectTitle = (element: HTMLElement) => {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 6 && hours < 12) {
    element.innerHTML = "Good morning";
  } else if (hours >= 12 && hours < 18) {
    element.innerHTML = "Good afternoon";
  } else if (hours >= 18 && hours < 24) {
    element.innerHTML = "Good evening";
  } else if (hours >= 0 && hours < 6) {
    element.innerHTML = "Good night";
  }
};
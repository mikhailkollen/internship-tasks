export const tagLabels = [
  { tag: "health", bgColor: "#3c86f44f", color: "#0053CF" },
  { tag: "work", bgColor: "#E8D7FF", color: "#9747FF" },
  { tag: "home", bgColor: "#E2F7E2", color: "#639462" },
  { tag: "other", bgColor: "#FFECC7", color: "#EA8C00" },
];

export const checkIfToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  return (
    today.getDate() === checkDate.getDate() &&
    today.getMonth() === checkDate.getMonth() &&
    today.getFullYear() === checkDate.getFullYear()
  );
};

export const checkIfTomorrow = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  return (
    today.getDate() + 1 === checkDate.getDate() &&
    today.getMonth() === checkDate.getMonth() &&
    today.getFullYear() === checkDate.getFullYear()
  );
};

export const updateLocalStorage = (newTasks) => {
  localStorage.setItem("tasks", JSON.stringify(newTasks));
};

export const uniqueId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
};

export const addTaskToTheServer = async (task) => {
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

export const deleteTaskFromTheServer = async (id) => {
  const response = await fetch(`https://tough-bee-bonnet.cyclic.app/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const updateTaskOnTheServer = async (task) => {
  const response = await fetch(
    `https://tough-bee-bonnet.cyclic.app/${task.id}`,
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
    document.querySelector(".modal").remove();
  });
  return overlay;
};

export const checkIfModalShownToday = () => {
  const localStorageModal = localStorage.getItem("todayTasksShown");
  if (!localStorageModal) {
    return false;
  }
  const today = new Date();
  const todayDate = `${today.getDate()}.${
    today.getMonth() + 1
  }.${today.getFullYear()}`;
  return localStorageModal === todayDate;
};

export const setModalShown = (modal) => {
  const today = new Date();
  const todayDate = `${today.getDate()}.${
    today.getMonth() + 1
  }.${today.getFullYear()}`;
  localStorage.setItem("todayTasksShown", todayDate);
};

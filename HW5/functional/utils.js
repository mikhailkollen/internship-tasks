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

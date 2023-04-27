import { addOverlay } from "../utils.js";
import { ListItem } from "./Item.js";
import { Button } from "./Button.js";
import { setModalShown } from "../utils.js";

export const TodayTasksModal = (todayTasks) => {
  const overlay = addOverlay();
  const todayTasksModal = document.createElement("div");
  todayTasksModal.classList.add("today-tasks-modal", "modal");
  const todayTasksModalTitle = document.createElement("h2");
  todayTasksModalTitle.classList.add("list-title");
  todayTasksModalTitle.innerHTML = "Good morning";
  const todayTasksModalText = document.createElement("p");
  todayTasksModalText.classList.add("today-tasks-modal-text");
  todayTasksModalText.innerHTML = `You have ${todayTasks.length} task(s) planned for today:`;

  const todayTasksModalList = document.createElement("ul");
  todayTasksModalList.classList.add("today-tasks-modal-list");
  todayTasksModal.append(
    todayTasksModalTitle,
    todayTasksModalText,
    todayTasksModalList
  );
  todayTasks.forEach((task) => {
    const todayTasksModalListItem = ListItem({ task, isModalTask: true });
    todayTasksModalList.append(todayTasksModalListItem);
  });
  const todayTasksModalButton = Button({
    text: "OK",
    onClick: () => {
      todayTasksModal.remove();
      overlay.remove();
    },
    className: "today-tasks-modal-button",
  });
  todayTasksModal.append(todayTasksModalButton);
  document.body.append(todayTasksModal);
  setModalShown();
};

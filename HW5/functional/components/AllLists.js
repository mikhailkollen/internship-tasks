import { List } from "./List.js";

export function AllLists({ allTasks, setAllTasks }) {
  const allLists = document.createElement("div");
  allLists.classList.add("all-lists");

  if (allTasks) {
    const listItems = allTasks.filter((task) => {
      if (!task.isCompleted) {
        return task;
      }
    });
    const completedListItems = allTasks.filter((task) => {
      if (task.isCompleted) {
        return task;
      }
    });

    const completedTasksList = List({
      listItems: completedListItems,
      allTasks,
      setAllTasks,
      titleText: "Completed Tasks",
      titleClassName: "list-title",
      listClassName: "completed-tasks-list",
    });

    const unfinishedTasksList = List({
      listItems,
      allTasks,
      setAllTasks,
      titleText: "All Tasks",
      titleClassName: "list-title",
      listClassName: "unfinished-tasks-list",
    });

    allLists.append(unfinishedTasksList, completedTasksList);
  }
  return allLists;
}

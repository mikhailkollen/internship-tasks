import { ListItem } from "./Item.js";
import { Button } from "./Button.js";

export function ListCompleted({ completedTasks, setCompletedTasks }) {
  const ul = document.createElement("ul");
  const listItems = completedTasks.map((task) => {
    const li = ListItem({ task });
    return li;
  });

  ul.append(...listItems);
  return ul;
}

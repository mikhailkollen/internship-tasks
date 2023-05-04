type Id = string;
type Modal = HTMLDivElement;
type Tasks = Task[];
type TodayTasksModalType = (tasks: Tasks) => void;
type SetAllTasks = (tasks: Tasks) => void;


interface ButtonProps {
  text?: string;
  onClick: GlobalEventHandlers["onclick"];
  className?: string;
}

interface ListItemProps {
  task: Task;
  isModalTask?: boolean;
}

interface ListProps {
  listItems: Tasks,
  allTasks: Tasks,
  setAllTasks: SetAllTasks,
  titleText: string,
  titleClassName: string,
  listClassName: string,
}

interface StateProps {
  children: {
    setAllTasks: SetAllTasks
    allTasks: Tasks;
  };
};

interface InputProps {
  onInput: (value: string) => void;
}

interface Task {
  _id?: Id;
  title: string;
  isCompleted: boolean;
  tag: string;
  date: Date;
}


export type { Task, Id, Modal, TodayTasksModalType, ButtonProps, ListItemProps, StateProps, SetAllTasks, InputProps, ListProps };
// type Date = string;
type Id = string;
type Modal = HTMLDivElement;
type TodayTasksModalType = (tasks: Task[]) => void;

type SetAllTasks = (tasks: Array<Task>) => void;

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
  listItems: Task[],
  allTasks: Task[],
  setAllTasks: SetAllTasks,
  titleText: string,
  titleClassName: string,
  listClassName: string,
}

interface StateProps {
  children: {
    setAllTasks: SetAllTasks
    allTasks: Task[];
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
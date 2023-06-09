import { useContext } from "react";
import { TasksContext } from "../state/context";

export function Tasks() {
  console.log('tasks changed');
  const tasks = useContext(TasksContext);
  if (tasks.length === 7) {
    console.log("task length is 7");
  }
  return tasks.map(t => <li key={t.id}>{t.text}</li>);
}
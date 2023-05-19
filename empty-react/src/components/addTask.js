import { useContext } from "react";
import { TasksDispatchContext } from "../state/context";

export function AddTask() {
  const dispatch = useContext(TasksDispatchContext);
  return (<button onClick={() => {
    dispatch({
      type: 'added',
      payload: {
        id: Math.random() * 100,
        text: 'Some new task'
      }
    });
  }}>Add A dummy task</button>);
}
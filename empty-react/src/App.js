import { initialTasks } from './state/state';
import { tasksReducer } from './state/reducer';
import { useReducer } from 'react';
import { TasksContext, TasksDispatchContext } from './state/context';
import { Tasks } from './components/tasks';
import { AddTask } from './components/addTask';
function App() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );
  return (
    <TasksContext.Provider value={tasks} >
      <TasksDispatchContext.Provider value={dispatch}>
        <div>
          <h2>hello from reducer</h2>
          <AddTask />
          <div className="row">
            <ul>
              {tasks.map(t => <li key={t.id}>{t.text}</li>)}
            </ul>
            <ol>
              <Tasks />
            </ol>
          </div>
        </div>
      </TasksDispatchContext.Provider >
    </TasksContext.Provider >

  );
}

export default App;

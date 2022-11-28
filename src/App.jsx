import Title from "./components/Title/Title";
import AddTask from "./components/AddTask/AddTask";
import TasksList from "./components/TasksList/TasksList";

import "./App.less"

const App = () => {
  return (
    <div className="todolist">
      <Title />
      <AddTask />
      <TasksList />
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";

import { store } from "../../firebase";
import TaskTile from "../TaskTile/TaskTile";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fireQuery = query(collection(store, "tasks"));
    const createList = onSnapshot(fireQuery, (querySnapshot) => {
      let tempArr = [];
      querySnapshot.forEach((eachDoc) => {
        tempArr.push({ ...eachDoc.data(), id: eachDoc.id });
      });
      setTasks(tempArr);
    });
    return () => createList();
  }, []);
  return (
    <div className="todolist__tasks-list">
      {tasks.map((task) => {
        return (
          <TaskTile
            key={task.id}
            task={task}
          />
        );
      })}
    </div>
  );
};
export default TasksList;

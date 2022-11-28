import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";

import { store, storage } from "../../firebase";

import "./taskTile.less";

const toggleDone = async (task) => {
  await updateDoc(doc(store, "tasks", task.id), {
    isDone: !task.isDone,
  });
};
const handleDelete = async (id, path) => {
  if (path) {
    const fileRef = ref(storage, path);
    await deleteObject(fileRef);
  }
  await deleteDoc(doc(store, "tasks", id));
};

const TaskTile = ({ task }) => {
  const { title, desc, isDone, attach, attachPath, deadline } = task;
  const [fileUrl, setFileUrl] = useState("");
  const isTaskFailed = dayjs().isAfter(deadline) && !isDone;

  useEffect(() => {
    const fetchData = async () => {
      const fileRef = ref(storage, attachPath);
      const url = await getDownloadURL(fileRef);
      setFileUrl(url);
    };
    if (attachPath) fetchData();
  }, [attachPath]);

  return (
    <div className="todolist__task-tile task-tile">
      <div className="task-tile__content">
        <div style={{ textDecoration: isDone && "line-through" }}>
          <h3>{title}</h3>
        </div>
        <p style={{ display: isDone && "none" }}>{desc}</p>
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: isDone && "none" }}
        >
          {attach && attach}
        </a>
      </div>
      <div className="task-tile__controls">
        <div style={{ color: isTaskFailed && "red" }}>
          <p>Выполнить до:</p>
          <i>{dayjs(deadline).format("DD-MM-YYYY HH:mm")}</i>
          <br />
          {isTaskFailed && <b>Провалено!</b>}
        </div>
        <div>
          <button onClick={() => toggleDone(task)}>
            {isDone ? "Возобновить" : "Готово!"}
          </button>
        </div>
        <div>
          <button onClick={() => handleDelete(task.id, attachPath)}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};
export default TaskTile;

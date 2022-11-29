import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

import { store, storage } from "../../firebase";

import "./addTask.less";
/**
 * Компонент в котором создаем задачу.
 * Рендерит форму с инпутами(название задачи, описание, дэдлайн, файл картинки(опционально))
 * @returns {JSX.Element}
 */
const AddTask = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("00:00");
  const [file, setFile] = useState(null);
  /**
   * Функция очистки полей после отправки данных формы
   */
  const clearFields = () => {
    setTitle("");
    setDesc("");
    setDate("");
    setTime("00:00");
    setFile(null);
  };
  /**
   * Асинхронная функция для создания нового doc в collection firebase и,
   * опционально, выгружает файл в firebase storage
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const addTaskToStore = async (event) => {
    event.preventDefault();
    if (title !== "" && desc !== "" && date !== "") {
      const deadline = date.concat(" ", time);
      const attach = file ? file.name : null;
      const fileRef = file ? ref(storage, file.name) : null;
      await addDoc(collection(store, "tasks"), {
        title,
        desc,
        deadline,
        attach,
        attachPath: fileRef ? fileRef.fullPath : fileRef,
        isDone: false,
      });
      if (file) await uploadBytes(fileRef, file);
      clearFields();
    } else {
      alert("Введите заголовок задачи, описание и крайний срок выполнения");
    }
  };
  return (
    <form action="" onSubmit={addTaskToStore}>
      <div className="todolist__add-task add-task">
        <div className="add-task__title">
          <label>
            {`Заголовок `}
            <input
              type="text"
              placeholder="введите заголовок"
              value={title}
              onChange={(input) => setTitle(input.target.value)}
            />
          </label>
        </div>
        <div className="add-task__description">
          <label>
            {`Описание `}
            <input
              type="text"
              placeholder="введите описание"
              value={desc}
              onChange={(input) => setDesc(input.target.value)}
            />
          </label>
        </div>
        <div className="add-task__deadline">
          <div>Выполнить до</div>
          <label>
            {`Дата `}
            <input
              type="date"
              onChange={(input) => setDate(input.target.value)}
              value={date}
            />
          </label>
          <label>
            {` Время `}
            <input
              type="time"
              onChange={(input) => setTime(input.target.value)}
              value={time}
            />
          </label>
        </div>

        <div className="add-task__file">
          <label className="add-task__file-button">
            Прикрепить файл
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(input) => setFile(input.target.files[0])}
            />
          </label>
          <b>{file && ` ${file.name}`}</b>
        </div>
        <div className="add-task__button">
          <button>Добавить задачу</button>
        </div>
      </div>
    </form>
  );
};
export default AddTask;

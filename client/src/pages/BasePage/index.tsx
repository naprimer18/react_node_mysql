import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { logoutAction } from '../../store/Auth/actions';
//styles
import style from "./styles/index.module.scss";

export const BasePage = () => {
  const [currentTask, setCurrentTask] = useState("");
  const [tasks, setTasks] = useState([]);
  // const dispatch = useDispatch();
  const addMessage = async () => {
    if (currentTask) {
      const method = "POST";
      const body = JSON.stringify({ name: currentTask });
      const response = await fetch("/api/addTask", {
        method,
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("data ", data);
      getAllTask();
      setCurrentTask("");
    }
  };

  const getAllTask = async () => {
    const method = "GET";
    const requets = await fetch("/api/getAllTasks", { method });
    const data = await requets.json();
    console.log(data);
    setTasks(data.names);
  };

  useEffect(() => {
    getAllTask();
  }, []);

  const refreshCurrentMessage = (e: any) => {
    setCurrentTask(e.target.value);
  };

  const deleteTask = async (id: any) => {
    const method = "DELETE";
    const body = JSON.stringify({ id });
    const requets = await fetch("/api/deleteTask", {
      method,
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await requets.json();
    getAllTask();
    console.log(data.names);
  };

  return (
    <div>
      {/* Home
      <button onClick={logOut}>logOut</button> */}
      <div className={style.addTaskcontainer}>
        <input
          className={style.taskName}
          placeholder="Your task"
          value={currentTask}
          onChange={refreshCurrentMessage}
        />
        <button className={style.addTaskButton} onClick={addMessage}>
          Add
        </button>
      </div>
      {tasks.length
        ? tasks.map((item: any) => (
            <div key={item.id} className={style.taskListContainer}>
              <button
                className={style.deleteTaskButton}
                onClick={() => deleteTask(item.id)}
              >
                X
              </button>
              <div className={style.taskListItem}>{item.name}</div>
            </div>
          ))
        : null}
    </div>
  );
};

import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { taskStore } from "./stores/TaskStore";
import TaskList from "./components/TaskTree";
import './styles.scss';

// Основной компонент приложения
const App: React.FC = observer(() => {
    const [taskTitle, setTaskTitle] = useState("");

    // Метод для добавления новой задачи
    const addTask = () => {
        if (taskTitle.trim()) {
            taskStore.addTask(taskTitle);
            setTaskTitle("");
        }
    };

    return (
        <div>
            <h1 className="main_header">Дерево задач</h1>
            <input className="input_text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Задача"/>
            <button onClick={addTask}>Добавить задачу</button>
            <TaskList />
        </div>
    );
});

export default App;

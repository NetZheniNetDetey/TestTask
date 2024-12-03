import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { taskStore } from "../stores/TaskStore";
import { Task } from "../stores/TaskStore";

const TaskTree: React.FC<{ task: Task }> = observer(({ task }) => {
    const [subTaskTitle, setSubTaskTitle] = useState("");

    const addSubTask = () => {
        if (subTaskTitle.trim()) {
            task.addSubTask(subTaskTitle);
            setSubTaskTitle("");
        }
    };

    return (
        <div style={{ marginLeft: '20px' }}>
            <label>
                <input className="input_checkbox" type="checkbox" checked={task.completed} onChange={() => task.toggleCompletion()}
                />
                {task.title}
            </label>

            <div style={{ marginLeft: '20px' }}>
                <input
                    value={subTaskTitle}
                    onChange={(e) => setSubTaskTitle(e.target.value)}
                    placeholder="Подзадача"
                />
                <button onClick={addSubTask}>Добавить подзадачу</button>
            </div>

            {task.subTasks.length > 0 && (
                <div>
                    {task.subTasks.map(subTask => (
                        <TaskTree key={subTask.id} task={subTask} />
                    ))}
                </div>
            )}
        </div>
    );
});

const TaskList: React.FC = observer(() => {
    return (
        <div>
            {taskStore.tasks.map(task => (
                <TaskTree key={task.id} task={task} />
            ))}
        </div>
    );
});

export default TaskList;
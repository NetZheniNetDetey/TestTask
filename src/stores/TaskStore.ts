import { makeAutoObservable } from "mobx";

// Класс для представления отдельной задачи
export class Task {
    id: number;
    title: string;
    completed: boolean;
    subTasks: Task[];

    constructor(id: number, title: string) {
        this.id = id;
        this.title = title;
        this.completed = false; 
        this.subTasks = [];
        makeAutoObservable(this);
    }

    // Метод для переключения статуса завершенности задачи
    toggleCompletion() {
        this.completed = !this.completed;
        this.subTasks.forEach(subTask => subTask.toggleCompletion());
    }

    // Метод для добавления подзадачи
    addSubTask(title: string) {
        const newSubTask = new Task(Date.now(), title);
        this.subTasks.push(newSubTask);
    }
}

// Класс для управления списком задач
class TaskStore {
    tasks: Task[];

    constructor() {
        this.tasks = [];
        makeAutoObservable(this);
    }

    // Метод для добавления новой задачи
    addTask(title: string) {
        const newTask = new Task(Date.now(), title);
        this.tasks.push(newTask);
    }
}

// Экспортируем экземпляр хранилища задач
export const taskStore = new TaskStore();
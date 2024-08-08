import { save_to_storage, load_from_storage } from "./storage";
const name = 'todos'
export default class TodoList {
    constructor() {
        this.todos = [];
    }

    addTask(td) {
        this.todos.push(td);
        this.saveTasks();
    }

    updateTask(index, task) {
        this.todos[index] = task;
        this.saveTasks();
    }

    deleteTask(index) {
        this.todos.splice(index,1);
        this.saveTasks();
    }

    saveTasks() {
        save_to_storage(name, this.todos)
    }

    loadTasks() {
        this.todos = load_from_storage(name)
    }
}
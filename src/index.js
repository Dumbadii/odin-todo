import { format, getWeek, getYear } from "date-fns";
import TodoList from "./todoList";
import Todo from "./todo";
import "./style.css";
import {
  bindDeleteGetHandler,
  bindUpdateHandler,
  displayTodoList,
  bindNewHandler,
  bindTimeHandler,
  bindProjectHandler,
  listProjects,
} from "./view";

function updateTask(data) {
  const { key, title, description, dueDate, priority, done, project } = data;
  const task = new Todo(title, description, dueDate, priority, done, project);
  if (key == -1) list.addTask(task);
  else list.updateTask(key, task);
  refreshTasks();
}

bindUpdateHandler(updateTask);
bindDeleteGetHandler(
  (key) => {
    list.deleteTask(key);
    refreshTasks();
  },
  (key) => list.todos[key]
);
bindNewHandler(() => {
  return new Todo("", "", "2024-08-07", "Low", false);
});

bindProjectHandler((prj) => {
  currentProject = prj;
  refreshTasks();
});

bindTimeHandler((timeStr) => {
  if (timeStr === "Today") timeFilter = todayFilter;
  else if (timeStr === "Week") timeFilter = weekFilter;
  else timeFilter = allFilter;
  refreshTasks();
});

function refreshTasks() {
  const displayList = list.todos
    .filter(timeFilter)
    .filter(projectFilter(currentProject));
  displayTodoList(displayList);
}

const todayFilter = (todo) =>
  format(todo.dueDate, "MM/dd/yy") === format(new Date(), "MM/dd/yy");
const weekFilter = (todo) =>
  getWeek(todo.dueDate) === getWeek(new Date()) &&
  getYear(todo.dueDate) === getYear(new Date());
const allFilter = () => true;
const projectFilter = (prj) => (todo) =>
  prj === "All" ? true : todo.project === prj;

let timeFilter = allFilter;
let currentProject = "All";
let list = new TodoList();
list.loadTasks();
const projects = Array.from(new Set(list.todos.map((todo) => todo.project)));
console.log(projects);
listProjects(projects);
refreshTasks();

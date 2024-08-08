import TodoList from "./todoList";
import Todo from "./todo";
import "./style.css";


let list = new TodoList();
list.loadTasks();

const container = document.querySelector('.tasks');
const addTaskBtn = document.querySelector('.add-task')
const dialog = document.querySelector('dialog')
const taskInfo = document.querySelector('.task-info')
const dialogTitle = document.querySelector('.dialogTitle')

function displayTodoList(container) {
    container.innerHTML = list.todos.map((task, index) =>
        `
            <article ${task.done ? 'class="complete"' : ''}>
                <div class="headline">
                        <input type="checkbox" name="chkComplete" id="chkComplete" ${task.done ? 'checked' : ''}>
                    <label for="chkComplete">
                    ${task.title}
                    </label>
                    <button data-todoIndex=${index} class="editBtn">edit</button>
                    <button data-todoIndex=${index} class="deleteBtn">delete</button>
                </div>
                    <div>${task.description}</div>
                    <div>${task.dueDate}</div>
            </article>
`).join('')
}

displayTodoList(container);
addTaskBtn.addEventListener('click', (event) => {
    const task = new Todo('', '', '2024-08-07', 'Low', false);
    dialogTitle.textContent = 'Add a task';
    editTask(-1, task)
})

function editTask(key, task) {
    taskInfo.innerHTML = taskEditTemplate(key, task);
    dialog.showModal();
}
container.addEventListener('click', (event) => {
    const obj = event.target;
    if (obj.classList.contains('editBtn')) {
        dialogTitle.textContent = 'Edit task';
        const index = obj.dataset.todoindex;
        editTask(index, list.todos[index]);
    }
    if (obj.classList.contains('deleteBtn')) {
        let index = obj.dataset.todoindex;
        list.deleteTask(index);
        displayTodoList(container)
    }
})

function updateTask() {
    const { key, title, description, dueDate, priority, done } = getTaskData();
    const task = new Todo(title, description, dueDate, priority, done);
    if(key == -1)
        list.addTask(task)
    else
        list.updateTask(key, task)
}

function getTaskData() {
    const priority = document.querySelector('input[name="priority"]:checked').value;
    const titleInput = document.querySelector('input[name="titleText"]');
    const title = titleInput.value;
    const key = titleInput.dataset.key;
    const description = document.querySelector('input[name="descriptionText"]').value;
    const dueDate = document.querySelector('input[name="dueDate"]').value;
    const done = document.querySelector('input[name="completeCheck"]').checked;

    return { key, title, description, dueDate, priority, done }
}

const confirmBtn = document.querySelector('#confirmBtn')
confirmBtn.addEventListener('click', (e) => {
    updateTask();
    displayTodoList(container);
})

const taskEditTemplate = (key, task) => `
                <input type="text" name="titleText" data-key=${key} id="titleText" placeholder="Title" value="${task.title}">
                <input type="text" name="descriptionText" id="descriptionText" placeholder="Description" value="${task.description}">
                <div class="dueDateDiv">
                    <label for="dueDate">Due Date</label>
                    <input type="date" name="dueDate" id="dueDate" value="${task.dueDate}">
                </div>
                <fieldset>
                    <legend>Task Priority</legend>
                    <ul>
                        <li class="priority">
                            <input type="radio" name="priority" id="priHigh" value="High" ${task.priority === 'High' ? 'checked' : ''}>
                            <label for="priHigh">High</label>
                        </li>
                        <li>
                            <input type="radio" name="priority" id="priMedium" value="Medium" ${task.priority === 'Medium' ? 'checked' : ''}>
                            <label for="priMedium">Medium</label>
                        </li>
                        <li>
                            <input type="radio" name="priority" id="priLow" value="Low" ${task.priority === 'Low' ? 'checked' : ''}>
                            <label for="priLow">Low</label>
                        </li>
                    </ul>
                </fieldset>
                <div class="completeDiv">
                    <label for="completeCheck">Task Completed?</label>
                    <input type="checkbox" name="completeCheck" id="completeCheck" ${task.done ? 'checked' : ''}>
                </div>
`

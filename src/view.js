const confirmBtn = document.querySelector("#confirmBtn");
const container = document.querySelector(".tasks");
const addTaskBtn = document.querySelector(".add-task");
const dialog = document.querySelector("dialog");
const taskInfo = document.querySelector(".task-info");
const dialogTitle = document.querySelector(".dialogTitle");
const timeList = document.querySelector("#time-list");
const projectList = document.querySelector("#project-list");

function displayTodoList(tasks) {
  container.innerHTML = tasks
    .map(
      (task, index) =>
        `
            <article ${task.done ? 'class="complete"' : ""}>
                <div class="headline">
                        <input type="checkbox" name="chkComplete" id="chkComplete" ${
                          task.done ? "checked" : ""
                        }>
                    <label for="chkComplete">
                    ${task.title}
                    </label>
                    <div>[${task.project}]</div>
                    <button data-todoIndex=${index} class="editBtn">edit</button>
                    <button data-todoIndex=${index} class="deleteBtn">delete</button>
                </div>
                    <div>${task.description}</div>
                    <div>${task.dueDate}</div>
            </article>
`
    )
    .join("");
}

function getTaskData() {
  const priority = document.querySelector(
    'input[name="priority"]:checked'
  ).value;
  const titleInput = document.querySelector('input[name="titleText"]');
  const title = titleInput.value;
  const key = titleInput.dataset.key;
  const project = document.querySelector('input[name="projectText"]').value;
  const description = document.querySelector(
    'input[name="descriptionText"]'
  ).value;
  const dueDate = document.querySelector('input[name="dueDate"]').value;
  const done = document.querySelector('input[name="completeCheck"]').checked;

  return { key, title, description, dueDate, priority, done, project };
}

function editTask(key, task) {
  taskInfo.innerHTML = taskEditTemplate(key, task);
  dialog.showModal();
}
const taskEditTemplate = (key, task) => `
                <input type="text" name="projectText" id="projectText" placeholder="Project" value="${
                  task.project
                }">
                <input type="text" name="titleText" data-key=${key} id="titleText" placeholder="Title" value="${
  task.title
}">
                <input type="text" name="descriptionText" id="descriptionText" placeholder="Description" value="${
                  task.description
                }">
                <div class="dueDateDiv">
                    <label for="dueDate">Due Date</label>
                    <input type="date" name="dueDate" id="dueDate" value="${
                      task.dueDate
                    }">
                </div>
                <fieldset>
                    <legend>Task Priority</legend>
                    <ul>
                        <li class="priority">
                            <input type="radio" name="priority" id="priHigh" value="High" ${
                              task.priority === "High" ? "checked" : ""
                            }>
                            <label for="priHigh">High</label>
                        </li>
                        <li>
                            <input type="radio" name="priority" id="priMedium" value="Medium" ${
                              task.priority === "Medium" ? "checked" : ""
                            }>
                            <label for="priMedium">Medium</label>
                        </li>
                        <li>
                            <input type="radio" name="priority" id="priLow" value="Low" ${
                              task.priority === "Low" ? "checked" : ""
                            }>
                            <label for="priLow">Low</label>
                        </li>
                    </ul>
                </fieldset>
                <div class="completeDiv">
                    <label for="completeCheck">Task Completed?</label>
                    <input type="checkbox" name="completeCheck" id="completeCheck" ${
                      task.done ? "checked" : ""
                    }>
                </div>
`;
function bindNewHandler(handler) {
  addTaskBtn.addEventListener("click", () => {
    const task = handler();
    dialogTitle.textContent = "Add a task";
    editTask(-1, task);
  });
}

function bindUpdateHandler(handler) {
  confirmBtn.addEventListener("click", () => {
    const data = getTaskData();
    handler(data);
  });
}

function bindDeleteGetHandler(deleteHandler, getHandler) {
  container.addEventListener("click", (event) => {
    const obj = event.target;
    if (obj.classList.contains("editBtn")) {
      dialogTitle.textContent = "Edit task";
      const key = obj.dataset.todoindex;
      editTask(key, getHandler(key));
    }
    if (obj.classList.contains("deleteBtn")) {
      const key = obj.dataset.todoindex;
      deleteHandler(key);
    }
  });
}

function bindTimeHandler(handler) {
  timeList.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("li-time")) {
      const timeStr = target.textContent;
      handler(timeStr);
    }
  });
}

function listProjects(projects) {
  projectList.innerHTML = projects
    .map((prj) => `<li class="li-project">${prj}</li>`)
    .join("");
}
function bindProjectHandler(handler) {
  projectList.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("li-project")) {
      const project = target.textContent;
      handler(project);
    }
  });
}
export {
  displayTodoList,
  listProjects,
  bindUpdateHandler,
  bindDeleteGetHandler,
  bindNewHandler,
  bindProjectHandler,
  bindTimeHandler,
};

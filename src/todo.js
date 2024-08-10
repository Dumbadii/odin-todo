export default class Todo {
    constructor(title, description, dueDate, priority, done=false, project='default') {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = done;
        this.project = project;
    }

    complete() {
        this.done = true;
    }
}
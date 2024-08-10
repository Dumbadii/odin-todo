import Todo from "./todo";
function save_to_storage(name, item) {
    localStorage.setItem(name, JSON.stringify(item))
}

function load_from_storage(name) {
    const todos = JSON.parse(localStorage.getItem(name)) || []
    return todos.map(obj => new Todo(obj.title, obj.description, obj.dueDate, obj.priority, obj.done, obj.project))
}

export {save_to_storage, load_from_storage};
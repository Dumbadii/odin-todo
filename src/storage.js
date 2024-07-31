import Todo from "./todo";
function save_to_storage(name, item) {
    localStorage.setItem(name, JSON.stringify(item))
}

function load_from_storage(name) {
    const data = localStorage.getItem(name)
    if (data === null) return []
    let objs = JSON.parse(localStorage.getItem(name))
    return objs.map(obj => new Todo(obj.title, obj.description, obj.dueDate, obj.priority, obj.done))
}

export {save_to_storage, load_from_storage};
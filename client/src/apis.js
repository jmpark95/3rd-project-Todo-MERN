const baseURL = "/"

export function getAllTodos() {
    return fetch(baseURL).then((res) => res.json());
};

export function addNewTodo(newTodo) {
    return fetch(baseURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(newTodo),
    });
}

export function deleteTodo(id) {
    return fetch(`${baseURL}${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
}

//can't pass in state here for some reason. editingFieldText argument doesn't register as state?
// export function updateTodo(id, editingFieldText) {
//     return fetch(`http://localhost:8000/${id}`, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json;charset=utf-8",
//         },
//         body: JSON.stringify({ name: editingFieldText })
//     }
//     )
// }
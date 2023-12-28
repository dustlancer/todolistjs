'use strict';


let todoField = document.querySelector('.todoField');
let todoSubmit = document.querySelector('.todoSubmit');
let todos = document.querySelector('.todos');

let favToggle = document.querySelector('.favourites-toggle');

let todolist = [];

todoField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});

var elem = document.querySelector('.favourites-toggle');
var init = new Switchery(elem);


function addTodo() {
    if (todoField.value === "") {
        alert("Введите текст!");
        return;
    }
    let new_id = todolist.length;
    let new_todo = {id: new_id, text: todoField.value, isFavourite: false};
    todolist.push(new_todo);
    console.log(todolist)

    let lastTodo = todos.firstChild;

    todos.insertBefore(createTodoElement(new_todo), lastTodo);
    todoField.value = "";
}


function deleteTodo(event) {
    let todo = event.target.parentElement.parentElement;
    let todo_id = Number(todo.getAttribute('id'));

    todo.classList.add('fade-out');
    setTimeout(()=> {todo.remove()}, 500);

    removeTodoFromList(todo_id);
    // console.log(todolist);
}


function removeTodoFromList(_id) {
    todolist.forEach((item, index) =>{
        if (item.id === _id) {
            todolist.splice(index, 1);
        }
    });
}

function switchLikeCheckbox(e) {
    // console.log(todolist);
    let checkbox = e.target.parentElement.querySelector('input');
    // alert(checkbox);
    // console.log(checkbox.checked);
    
    checkbox.checked = !checkbox.checked;
    checkbox.dispatchEvent(new Event('change'));
}

function toggleLike(event) {
    let todoElement = event.target.parentElement.parentElement;
    let todo_id = Number(todoElement.getAttribute('id'));
    let like_button = event.target.parentElement.querySelector(".like-button");
    let todo = todolist.find(todo => {
        return todo.id === todo_id;
    });
    console.log(todo);

    if (event.target.checked) {
        todo.isFavourite = true;
        like_button.style.background = 'red';
        like_button.textContent = '🤍';
    } else {
        let like_button = event.target.parentElement.querySelector(".like-button");
        todo.isFavourite = false;
        like_button.style.background = 'white';
        like_button.textContent = '❤️';
    }
    // console.log(todolist);
}


function createTodoElement(todo) {
    const new_todo = document.createElement("div");
    new_todo.setAttribute('id', todo.id);
    new_todo.classList.add('todo');

    const todo_text = document.createElement("p");
    todo_text.classList.add('todo-text');
    todo_text.textContent = todo.text;

    const todo_options = document.createElement("div");
    todo_options.classList.add("todo-options");

    const like_button = document.createElement("button");
    like_button.classList.add("like-button");
    like_button.addEventListener('click', switchLikeCheckbox);
    like_button.style.background = todo.isFavourite ? "red" : "white";
    like_button.textContent = todo.isFavourite ? "🤍" : "❤️";

    const like_checkbox = document.createElement("input");
    like_checkbox.type = 'checkbox';
    like_checkbox.checked = todo.isFavourite;
    like_checkbox.id = "like-checkbox";
    like_checkbox.style.display = "none";
    like_checkbox.addEventListener("change", toggleLike);

    const delete_button = document.createElement("button");
    delete_button.textContent = "Удалить";
    delete_button.classList.add("delete-button");
    delete_button.addEventListener("click", deleteTodo)

    todo_options.appendChild(like_checkbox);
    todo_options.appendChild(like_button);
    todo_options.appendChild(delete_button);
    
    
    
    new_todo.appendChild(todo_text);
    new_todo.appendChild(todo_options);
    new_todo.classList.add("fade-in");

    return new_todo;
}

function clearTodos() {
    for(let i = 0; i < todos.children.length; i++){
        hideTodo(todos.children[i]);
    }
};

function hideTodo(todo) {
    todo.classList.remove('red');
    todo.classList.add('fade-out');

    setTimeout(()=> {
        todo.remove();
    }, 300);
}

function showFavourites() {
    const favouriteTodos = todolist.filter((todo) => todo.isFavourite === true);
    // console.log(favouriteTodos);
    for (let i = 0; i < favouriteTodos.length; i++) {
        let lastTodo = todos.firstChild;
        todos.insertBefore(createTodoElement(favouriteTodos[i]), lastTodo);
    }
}

function showAllTodos() {
    for (let i = 0; i < todolist.length; i++) {
        let lastTodo = todos.firstChild;
        todos.insertBefore(createTodoElement(todolist[i]), lastTodo)
    }
}



function toggleFavourites() {
    let hideTodosPromise = new Promise((resolve, reject) => {
        clearTodos();
        setTimeout(() => {
            resolve("result");
        }, 300);
    });

    if (favToggle.checked) {
        hideTodosPromise
            .then(
                result => {
                    showFavourites();
                },
                error => {
                    alert(error);
                }
            )
    } else {
        hideTodosPromise
            .then(
                result => {
                    showAllTodos();
                },
                error => {
                    alert(error);
                }
            )
    }
}
//find element
const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoAddButton = document.querySelector("#addTodoButton");
const todoLists = document.getElementById("lists");
const messageElement = document.getElementById("message");

//create todo

const createTodo = (todoId, todoValue) => {
  const todoElement = document.createElement("li");
  todoElement.id = todoId;
  todoElement.classList.add("li-style");
  todoElement.innerHTML = `
        <span> ${todoValue} </span>
        <span> <button class="btn" id="deleteButton"> <i class="fa fa-trash"></i> </button> </span>
    `;

  todoLists.appendChild(todoElement);

  const deleteButton = todoElement.querySelector("#deleteButton");
  deleteButton.addEventListener("click", deleteTodo);
};

//delete todo

const deleteTodo = (event) => {
  const selectedTodo = event.target.parentElement.parentElement.parentElement;

  todoLists.removeChild(selectedTodo);
  showMessage("Todo is deleted", "fail");

  let todos = getTodosFromLocalStorage();
  todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
  localStorage.setItem("mytodos", JSON.stringify(todos));
};

//show message

const showMessage = (text, status) => {
  messageElement.textContent = text;
  messageElement.classList.add(`bg-${status}`);

  setTimeout(() => {
    messageElement.textContent = "";
    messageElement.classList.remove(`bg-${status}`);
  }, 1000);
};

//getTodosfromLocalStorage

const getTodosFromLocalStorage = () => {
  return localStorage.getItem("mytodos")
    ? JSON.parse(localStorage.getItem("mytodos"))
    : [];
};

//add todos
const addTodo = (event) => {
  event.preventDefault();
  const todoValue = todoInput.value;

  const todoId = Date.now().toString();

  createTodo(todoId, todoValue);

  showMessage("Todo is success", "success");

  const todos = getTodosFromLocalStorage();

  todos.push({ todoId, todoValue });
  localStorage.setItem("mytodos", JSON.stringify(todos));

  todoInput.value = "";
};
//load Todos

const loadTodos = () => {
  const todos = getTodosFromLocalStorage();
  todos.map((todo) => createTodo(todo.todoId, todo.todoValue));
};

//add eventlistener
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);

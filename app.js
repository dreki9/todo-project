const form = document.querySelector("#undated");
const todoInput = document.querySelector("#undated-todo");
const todoList = document.querySelector(".undated-todo-list");
const todoBody = document.querySelector(".todo-body");
const todoListBody = document.querySelector(".todo-list-body");
const filter = document.querySelector("#search-undated-todo");
const clearAll = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {

    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosUI);
    todoListBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearAll.addEventListener("click",clearAllTodos);

}
function clearAllTodos(e){
    if(confirm("Are you sure you want to delete all todos?")){
        //todoList.innerHTML = ""; // Slower 
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".my-auto.textContent");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        const parent = listItem.parentElement.parentElement.parentElement.parentElement;
        if(text.indexOf(filterValue) === -1){
            parent.setAttribute("style", "display: none !important");
        }
        else{
            parent.setAttribute("style","display: block");
        }

    })
}
function deleteTodo(e){
    if(e.target.className === "fa fa-remove my-auto"){
        const deleteTodo =  e.target.parentElement.parentElement.parentElement.parentElement;
        deleteTodo.remove();
        deleteToddFromStorage(deleteTodo.textContent);
        showAlert("success","Todo successfully deleted...");
    }

}
function deleteToddFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo, index){

        if(todo === deletetodo){
            todos.splice(index,1);

        }
    })
    localStorage.setItem("todos", JSON.stringify(todos));

}
function loadAllTodosUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){

        addTodoToUI(todo);
    })
}

function addTodo(e){

    const newTodo = todoInput.value.trim();
    let todos = getTodosFromStorage();
    let bool = false;
    todos.forEach(function(todo){
        if(todo === newTodo){
            bool = true;
        }
    })
    if (newTodo === "") {
        /*
            <div class="alert alert-danger" role="alert">
                A simple danger alert—check it out!
            </div>
        
        */ 
        showAlert("danger", "Please add a todo....");
    }else if(bool){
        showAlert("warning", "You can not add the same todo to list...");

    }else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Successfully added...");
    }

    e.preventDefault();
}
function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}
function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));

}
function showAlert(type, message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type} mt-2`;
    alert.textContent = message;
    todoBody.appendChild(alert);

    setTimeout(function(){
        alert.remove();
    },2000)
}
function addTodoToUI(newTodo){
    /*
                    <li>
                        <div class="card ">
                            <div class="card-body text-center">
                                <div class="d-flex justify-content-between ">
                                    <p class="my-auto">To-Do 1</p>
                                    <i class="fa fa-remove my-auto"></i>
                                </div>
                            </div>
                        </div>
                    </li>
    */
    const listItem = document.createElement("li");
    listItem.className = "list-group-item my-2";
    const card = document.createElement("div");
    card.className = "card";
    const cardBody = document.createElement("div");
    cardBody.className = "card-body text-center";
    const cardContent = document.createElement("div");
    cardContent.className = "d-flex justify-content-between";
    const cardText = document.createElement("p");
    cardText.className = "my-auto textContent";
    const cardIcon = document.createElement("i");
    cardIcon.className = "fa fa-remove my-auto";
    
    

    //text node
    listItem.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(cardContent);
    cardContent.appendChild(cardText);
    cardContent.appendChild(cardIcon);
    cardText.appendChild(document.createTextNode(newTodo));

    todoList.appendChild(listItem);
    
    todoInput.value = "";
}
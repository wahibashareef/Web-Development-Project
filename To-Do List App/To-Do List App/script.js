const input = document.querySelector(".inputField input");
const addBtn = document.querySelector(".add-task-btn");
const clearAllBtn = document.querySelector(".clear-all-btn");
const todoList = document.querySelector("ul");

//Add new Task
function addTask() {
    //getting the inputfield value
    let inputTask = input.value.trim();
    if (inputTask === '') {
        alert("Add Task");
    }
    else {
        let listArray = getTaskFromLocalStorage();
        listArray.push({ text: inputTask, completed: false});
        localStorage.setItem("New List", JSON.stringify(listArray));

        //clear the input field after adding task
        input.value = '';

        //refresh the task
        showTasks()
    }
}

showTasks();

//Get tasks from local storage
function getTaskFromLocalStorage() {
    let getData = localStorage.getItem("New List");
    if(getData == null) {
        return [];
    }
    else {
        return JSON.parse(getData);
    }
}

function showTasks() {
    let listArray = getTaskFromLocalStorage();
    let newLiTag = "";

    listArray.forEach((element, index) => {
        newLiTag += `<li>
        <input type="checkbox" onclick="toggleTask(${index})" ${element.completed ? "checked" : ""}>
        <span class="text">${element.text}</span>
        <div class="icons">
            <span class="icon"
            onclick="editTask(${index})"><i class="fas fa-edit"></i>
            </span>
            <span class="icon" 
            onclick="deleteTask(${index})"><i class="fas fa-trash-alt"></i>
            </span>
        </div>
        </li>`;
    });

    //add new li tag inside ul
    todoList.innerHTML = newLiTag;

    //once task added, leave the inputField blank
    input.value = "";
}

function deleteTask(index){
    let listArray = getTaskFromLocalStorage();

    //delete the list
    listArray.splice(index, 1);

    localStorage.setItem("New List", JSON.stringify(listArray));
    showTasks();
}

function editTask(index) {
    let listArray = getTaskFromLocalStorage();
    let newListValue = prompt(listArray[index].text);

    if(newListValue) {

        //edit the list
        listArray[index].text = newListValue;

        localStorage.setItem("New List", JSON.stringify(listArray));
        showTasks();
    }
}

function toggleTask(index) {
    let listArray = getTaskFromLocalStorage();
    listArray[index].completed = !listArray[index].completed;
    localStorage.setItem("New List", JSON.stringify(listArray));
    showTasks();
}

addBtn.onclick = () => { 
    addTask(); 
}

clearAllBtn.onclick = () => {
    localStorage.setItem("New List", JSON.stringify([]));
    showTasks();
}
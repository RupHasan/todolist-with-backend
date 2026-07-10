function sendData() {
    const taskName = document.getElementById("userInput").value;
    document.getElementById("userInput").value = "";

    if (taskName != "") {
        fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task: taskName })
        })
            .then(data => data.json())
        render();
    } else {
        alert("Enter task name first!");
    }
}

function render() {
    document.getElementById("todo-container").innerHTML = "";
    
    fetch("http://localhost:3000/todos")
        .then(data => data.json())
        .then(data => {
            data.forEach(item => {
                document.getElementById("todo-container").innerHTML += `
                <div class="todo-sub-container">
                    <p>task: ${item.task}</p>
                    <p>done status: ${item.done}</p>
                    <button class="todo-change-btn" onclick="changeState(${item.id})">${
                        item.done ? "Undone" : "Done"
                    }</button>
                    <button class="todo-del-btn" onclick="deleteTodo(${item.id})">Delete</button>
                </div>
            `;
            });
        });
}
render();

function deleteTodo(idNum) {
    fetch(`http://localhost:3000/todos/${idNum}`, {
        method: "DELETE"
    });
    
    render();
}

function changeState(changeId) {
    fetch(`http://localhost:3000/todos/${changeId}`,{
        method: "PUT"
    })
    
    render();
}

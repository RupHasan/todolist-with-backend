function sendData() {
    const taskName = document.getElementById("userInput").value;
    document.getElementById("userInput").value = '';
    
    fetch('http://localhost:3000/todos',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({task: taskName})
    })
    .then(data => data.json())
    .then((data)=>{
    alert(data)
    })
}

function render() {
    fetch('http://localhost:3000/todos')
    .then(data => data.json())
    .then((data)=>{
        data.forEach((item)=>{
            document.getElementById("todo-container").innerHTML += `
                <div id="todo-sub-container">
                    <p>id: ${item.id}</p>
                    <p>task: ${item.task}</p>
                    <p>done status: ${item.done}</p>
                </div>
            `;
        })
    })
}
render()
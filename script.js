function sendData() {
    const taskName = document.getElementById("userInput").value;
    document.getElementById("userInput").value = '';
    console.log(taskName);
    
    // fetch('http://localhost:3000/todos',{
    //     method: 'POST',
    //     headers: {'Content-Type':'application/json'},
    //     body: JSON.stringify({task: taskName})
    // })
    // .then(data => data.json())
    // .then((data)=>{
    //     console.log(data)
    // })
    
    fetch('http://localhost:3000/todos')
  .then(r => r.json())
  .then(console.log)
}
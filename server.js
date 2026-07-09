const express = require("express");
const app = express();
const port = 3000;
let todo = [];

app.use(express.json());

app.get('/todos', (req,res)=>{
    res.send("Your todos: NOTHING!")
})

app.get('/', (req,res)=>{
    res.send("Hello world!")
})

app.get("/todos/:id",(req,res)=>{
    const wantedId = parseInt(req.params.id);
    const findTodo = todo.forEach(todo)
    
    if(todo[wantedId - 1] != undefined) {
        res.json(todo[wantedId - 1]);
    } else {
        res.status(404).send("Task not found in database")
    }
})


app.post('/todos',(req,res)=>{
    const task = req.body.task;
    todoLength = todo.length + 1;
    todo.push({
        id: todoLength,
        task: task,
        done: false
    })
    
    res.json(todo[todoLength - 1]);
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})
const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
let todo = JSON.parse(fs.readFileSync("todos.json", "utf8"));

app.use(express.json());
app.use(express.static("."));

app.get("/todos", (req, res) => {
    res.json(JSON.parse(fs.readFileSync("todos.json", "utf8")));
});

app.get("/", (req, res) => {
    res.json(JSON.parse(fs.readFileSync("todos.json", "utf8")));
});

app.get("/todos/:id", (req, res) => {
    const wantedId = parseInt(req.params.id);
    const findTodo = todo.find(td => td.id == wantedId);

    if (findTodo != undefined) {
        res.json(findTodo);
    } else {
        res.status(404).send("Task not found in database");
    }
});

app.post("/todos", (req, res) => {
    const task = req.body.task;
    todoLength = todo.length + 1;
    todo.push({
        id: todoLength,
        task: task,
        done: false
    });

    fs.writeFileSync("todos.json", JSON.stringify(todo));
    todo = JSON.parse(fs.readFileSync("todos.json", "utf8"));
    res.json(todo[todoLength - 1]);
});

app.delete("/todos/:id", (req, res) => {
    const wantedId = parseInt(req.params.id);
    const todoToDel = todo.find(td => td.id == wantedId);
    let changeId;

    if (todoToDel) {
        for (let i = 0; i < todo.length; i++) {
            let checkTodo = todo[i];
            if (checkTodo.id == wantedId) {
                todo.splice(i, 1);
                changeId = i;
            }
        }
        
        for(let i = changeId; i < todo.length; i++) {
            todo[i].id--
        }

        fs.writeFileSync("todos.json", JSON.stringify(todo));
        todo = JSON.parse(fs.readFileSync("todos.json", "utf8"));
        res.status(204).send("todo deleted!");
    } else {
        res.status(404).send("Todo Not Found To Delete! 404 Error!");
    }
});

app.put("/todos/:id", (req, res) => {
    const wantedId = parseInt(req.params.id);
    let showErr = true;

    todo.forEach(task => {
        if (task.id == wantedId) {
            showErr = false;

            if (task.done == false) {
                task.done = true;
            } else {
                task.done = false;
            }

            res.json(task);
        }
    });
    fs.writeFileSync("todos.json", JSON.stringify(todo));
    todo = JSON.parse(fs.readFileSync("todos.json", "utf8"));

    if (showErr) {
        res.status(404).send("Task Not Found! 404 Error!");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

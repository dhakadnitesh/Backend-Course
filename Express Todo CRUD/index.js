const express = require("express")


const server = express()
const PORT = 4000
const fs = require('fs');
server.use(express.json())



// for todo data getting
server.get("/todosget",(req,res)=>{
    let gettodos = fs.readFileSync("./db.json","utf-8")
    res.send(`Data Getting successfully ${gettodos}`)
    let parsedata = JSON.parse(gettodos)
    console.log(parsedata)
})


// for todo data posting

server.post("/todospost",(req,res)=>{
    let incdata = req.body
    console.log(incdata)
    res.send(`Data Received Successfully From Postman ${JSON.stringify(incdata)}`)
    let gettodos = fs.readFileSync("./db.json","utf-8")

    let parsedata = JSON.parse(gettodos)
    console.log(parsedata)
    parsedata.todos.push(incdata)

    fs.writeFileSync("./db.json",JSON.stringify(parsedata))


})


// For updating todos 
server.patch("/todosupdate", (req, res) => {
    let gettodos = fs.readFileSync("./db.json", "utf-8");
    let parsedata = JSON.parse(gettodos);

    parsedata.todos = parsedata.todos.map(todo => {
        if (todo.id % 2 === 0 && todo.status === false) {
            todo.status = true;
        }
        return todo;
    });

    fs.writeFileSync("./db.json", JSON.stringify(parsedata));
    res.send(`Todos with even IDs updated successfully ${JSON.stringify(parsedata)} `);
});

// For deleting todos 
server.delete("/todosdelete", (req, res) => {
    let gettodos = fs.readFileSync("./db.json", "utf-8");
    let parsedata = JSON.parse(gettodos);

    parsedata.todos = parsedata.todos.filter(todo => todo.status !== true);

    fs.writeFileSync("./db.json", JSON.stringify(parsedata));
    res.send(`Todos with status true deleted successfully  ${JSON.stringify(parsedata)}`);
});

server.listen(PORT,()=>{
    console.log(`Server Is Working on ${PORT}`)
})
const express = require('express');
const app = express()
const pool = require("./db")

app.use(express.json())


//CREATE TODO
app.post("/todos", async(req, res)=>{
    try{

        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows[0])

    }catch (err){
        console.log(err.message);
    }

})

//GET ALL TODO
app.get("/todos", async (req,res) => {
    try{
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)

    }catch(err){
        console.log(err.message);
    }
})

//GET A TODO
app.get("/todos/:id", async (req, res)=>{
    const {id} = req.params;
    console.log(id);
    try {
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1", [id]
        )
        res.json(todo.rows[0])

    }catch(err){
        console.log(err.message);
    }
})

//UPDATE A TODO
app.put("/todos/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id =$2", 
            [description, id ]
        )
        res.json("Todo was updated")
    }catch(err){
        console.log(err.message);
    }
})

//DELETE A TODO
app.delete("/todos/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",[id]
        )
        res.json("Todo was successfully deleted"); 
    }catch(err){
        console.log(err.message);
    }
})

app.listen(3000, ()=>{
    console.log("server running on port 3000");
})
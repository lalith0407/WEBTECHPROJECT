const express = require('express');
const cors =  require('cors')
const mongoose= require('mongoose')
const app = express();
const ToDo = require('./model')
mongoose.connect( 'mongodb://127.0.0.1:27017/todo',{useNewUrlParser:true, useUnifiedTopology: true })
let db=mongoose.connection;
db.once('open',()=>{
    console.log('Mongo DB Connected')
})

app.use(cors())
app.use(express.json())

app.post('/todos',async function(request,response){
    try{
        const {description} = request.body;
        const newTodo = new ToDo({
            description:description
        });
        await newTodo.save()
        response.json(newTodo);
    }catch(err){
        console.log(err.message);
    }
})


app.get('/todos',async function(request,response){
    try{
        const allTodos = await ToDo.find({})
     
        response.json(allTodos);

    }catch(err){
        console.log(err.message);
    }
})

app.get('/todos/:id',async function(request,response){
    try{
        const {id} = request.params;
            const todo = await ToDo.findOne({_id:id})
                response.json(todo);
    }catch(err){
        console.log(err.message);
    }
})


app.put('/todos/:id',async function(request,response){
    try{
        const {id} = request.params;
        const {description} = request.body;
        const updateTodo = await ToDo.updateOne({_id:id},{$set:{description:description}});
        response.json("todo updated");
    }catch(err){
        console.log(err.message);
    }
})

app.delete('/todos/:id',async function(request,response){
    try{
        const {id} = request.params;
        const deleteTodo = await ToDo.deleteOne({_id:id})
            response.json("todo was deleted");
    }  catch(err){
        console.log(err.message);
    }  
})



app.listen(5000,()=>{
    console.log('running on port 5000')
})
import React,{useEffect,useState} from 'react';
import EditTodo from './EditTodo'



const ListTodos=()=>{
    const[todos,setTodos]=useState([]);


const deleteTodo = async (id)=>{
    try{
        const deleteTodo=await fetch(`http://127.0.0.1:5000/todos/${id}`,{
            method:"DELETE"
           })
           setTodos(todos.filter(todo=>todo._id!==id))
    }catch(err){
console.log(err.message)
    }
}

const getTodos=async ()=>{
    try{
        const response = await fetch("http://127.0.0.1:5000/todos")
        .then(response => response.json())
        .then(response=>{
            setTodos(response)
            console.log(response)
            console.log('hello')
        })
        
        
      
    }catch(err){
        console.log(err.message);
    }
}

    useEffect(()=>{
        getTodos();
    },[]);
return (
    <React.Fragment>
        {" "}
        <table className="table mt-5 text-center">
            <thead>
                <tr>
                    <th>Name of the Task</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
    <tbody>
        {todos.map(todo=>(
            <tr key={todo._id}>
                <td>{todo.description}</td>
                <td><EditTodo todo={todo} /></td>
                <td>
                    <button 
                    className="btn btn-danger"
                    onClick={()=>deleteTodo(todo._id)}>Delete</button>
                    </td>
            </tr>
        ))}
    </tbody>
        </table>
  
    </React.Fragment>
)
}
export default ListTodos
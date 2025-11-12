import './App.css';
import { useState,useEffect, use } from 'react';
import axios from "axios";


function App() {

 const [title,setTitle] = useState("");
 const [tasks, setTasks] = useState([])
const [description, setDescription] = useState ("")

const API_URL = process.env.REACT_APP_API_URL;
console.log("API URL:", API_URL);
const fetchData = async () => {
  try{
 const res = await axios.get(`${API_URL}/tasks`)
  setTasks(res.data)
  } catch (err){
console.error("failed to fetch task",err)
  }
 
};
//add task
const addTask = async (e) => {
  e.preventDefault();
  if(!title.trim()) return alert("the title requierd")
   await axios.post(`${API_URL}/tasks`,{title, description});
  setTitle("");
  setDescription("");
fetchData();
};
//delete the task
const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/tasks/${id}`)
  fetchData();
}

const isCompleted = async (task) =>{
  await axios.put(`${API_URL}/tasks/${task.id}`,{...task,
     is_completed:!task.is_completed}, 
   
  );
  fetchData()
};
useEffect(()=>{
fetchData();
},[]);
  return (
    <div style={{maxWidth:"600px", margin: "40px auto",  textAlign: "center", 

    }} >
    <h1>Task flow ✅</h1>
    <form onSubmit={addTask}  style={{ marginBottom: "20px" }} >
     <input type='text' placeholder='type the title' value={title} onChange={(e) =>setTitle(e.target.value)}  style={{ padding: "8px", width: "70%", marginBottom: "10px" }}/>
     <br/>
     <textarea value={description} placeholder='please type a dispertion' onChange={(e) => setDescription(e.target.value)}  style={{ padding: "8px", width: "70%", height: "60px" }}/>
      <br/>
     <button type='submit' style={{ padding: "8px 16px", marginTop: "10px" }}>Add Task</button>

    </form>
    <ul  style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((task)=>(
      <li key={task.id} 
      style={{
              marginBottom: "5px",
              background: "#f4f4f4",
              padding: "5px",
              borderRadius: "10px",
            }}>
       <h3 style={ {textDecorationLine: task.is_completed? "line-through" : "none"}}>
           {task.title}
       </h3>
     <p>{task.description}</p>

     <button onClick={()=> isCompleted(task)}>
       {task.is_completed ? "undo": "completed"}
     </button>

     <button onClick={() => deleteTask(task.id)}   style={{ marginLeft: "10px" }}>
      Delete
     </button>

      </li>
    
    ) )}
    </ul>
    </div>
  );
}

export default App;

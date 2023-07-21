import React,{useEffect,useState} from 'react'
import axios from 'axios'
const App = () => {
  const [item,setitem] = useState([]);
  const [newData,setNewdata] = useState(' ')
  useEffect(()=>{
    axios.get('http://localhost:5000/gettask').then(
      arr => setitem(arr.data)
    )
  },[])

  const submitHandler =(e)=>{
    e.preventDefault();
    axios.post('http://localhost:5000/addtask',{todo:newData}).then(
      arr => setitem(arr.data)
    )
  }

  const deleteHandler =(id)=>{
    axios.delete(`http://localhost:5000/delete/${id}`).then(
      arr =>setitem(arr.data)
    )
  }
  return (
    <div>
      <center>
        <h1>Todo</h1>
        <form  onSubmit={submitHandler}>
          <input class="form-control" type='text' value={newData} 
          onChange={(e)=>setNewdata(e.target.value)}/>
          <input class="btn btn-success" type='submit' value='Submit'/>
        </form>
        <br/>
        {
          item.map(task=> 
            <div key={task._id}>
              <h4>{task.todo}</h4>
              <button type="button" class="btn btn-success" onClick={()=>deleteHandler(task._id)}>Delete</button>
            </div>
        )}
      </center>
    </div>
  )
}

export default App

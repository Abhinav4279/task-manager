import { useState, useEffect } from 'react'
import Tasks from './components/Tasks';
import Header from './components/Header'
import AddTask from './components/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);
  


  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }
  , [])

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data;
  }

  const fetchTasks = async () => {
    const resp = await fetch('http://localhost:5000/tasks')
    const data = await resp.json()

    return data;
  }

  const onAdd = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', 
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
      }
    )

    const data = await res.json()
    setTasks([...tasks, data])

    // task.id = tasks.length + 1;
    // setTasks([...tasks, task])
  }
  
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    fetchTasks();
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json();

    setTasks(tasks.map((task) => 
      task.id === id ? {...data} : task
    ))
  }

  return (
    <div className="container">
      <Header title='Task List' showAdd = { showAddTask } onAdd={ () => setShowAddTask(!showAddTask) } />
      {showAddTask && (<AddTask onAdd={ onAdd } />) }
      {tasks.length > 0 ? (
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
      ) : 
      (
        <p>No task to show</p>
      )}
    </div>
  );
}

export default App;

import { useState } from 'react'
import Tasks from './components/Tasks';
import Header from './components/Header'
import AddTask from './components/AddTask'

function App() {
  const [tasks, setTasks] = useState([
      {
          id: 1,
          text: 'Appointment',
          day: '5th Feb',
          reminder: true
      }
  ]
  );
  
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => 
      task.id === id ? {...task, reminder: !task.reminder} : task
    ))
  }

  return (
    <div className="container">
      <Header title='Task List'/>
      <AddTask />
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

import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

// Function component
function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])
    const base_url = "http://192.168.0.19:5000/"

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])

    // Fetch Tasks From server
    const fetchTasks = async () => {
        const res = await fetch(`${base_url}tasks`)
        const data = await res.json()

        return data
    }

    // Fetch Task From server
    const fetchTask = async (id) => {
        const res = await fetch(`${base_url}tasks/${id}`)
        const data = await res.json()

        return data
    }

    //Add Task 
    const addTask = async (task) => {
        console.log(task)
        const res = await fetch(`${base_url}tasks`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(task) })
        const data = await res.json()
        console.log(data)

        setTasks([...tasks, data])

        /* const id = Math.floor(Math.random() * 10000) + 1
        const newTask = { id, ...task }
        setTasks([...tasks, newTask]) */
    }

    // Delete task
    const deleteTask = async (id) => {
        await fetch(`${base_url}tasks/${id}`, { method: 'DELETE' })
        setTasks(tasks.filter((task) => task.id !== id))
    }

    // Toggle reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

        const res = await fetch(`${base_url}tasks/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updTask) })
        const data = await res.json()

        setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
    }

    // Toggle Add Tasks Form
    const toggleAddTask = () => {
        setShowAddTask(!showAddTask)
    }

    return (
        <Router>
            <div className="container">
                <Header onToggle={toggleAddTask} showAdd={showAddTask} />
                <Routes>
                    <Route path="/" exact element={
                        <>
                            {showAddTask && <AddTask onAdd={addTask} />}
                            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Show'}
                        </>
                    } />
                    <Route path="/about" element={<About />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}



// Class Component
/* class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
      </div>
    );
  }
} */

export default App;

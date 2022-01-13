import React, { useState } from 'react';
import './App.css';
import { TodoList } from "./TodoList";

export type FilterType = 'All' | 'Active' | 'Completed'

function App() {

    let [tasks, setTask] = useState([
        { id: 1, title: 'CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'React', isDone: false },
    ])

    /* const [filter, setFilter] = useState('All')

    let filteredT = tasks
    if (filter === 'Active') {
        filteredT = tasks.filter(f => !f.isDone)
    }
    if (filter === 'Completed') {
        filteredT = tasks.filter(f => f.isDone)
    } */
    /* const filteredTasks = (filterValue: FilterType) => {
        setFilter(filterValue)
    } */

    const removeTasks = (taskID: number) => {
        setTask(tasks.filter(f => f.id !== taskID))
    }

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                tasks={tasks}
                removeTasks={removeTasks}
            //filteredTasks={filteredTasks} 
            />
        </div>
    );
}

export default App;

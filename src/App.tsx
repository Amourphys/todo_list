import React, { useState } from 'react';
import './App.css';
import { TodoList } from "./TodoList";
import {v1} from 'uuid';

export type FilterType = 'All' | 'Active' | 'Completed'

function App() {

    let [tasks, setTask] = useState([
        { id: v1(), title: 'CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'React', isDone: false },
        { id: v1(), title: 'Rest API', isDone: false },
        { id: v1(), title: 'GraphQL', isDone: false },
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
    const addTask = (title: string) => {
        let newTask = { id: v1(), title: title, isDone: false }
        console.log(...tasks)
        setTask([...tasks,newTask] )
    }

    const removeTasks = (taskID: string) => {
        setTask(tasks.filter(f => f.id !== taskID))
    }

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                tasks={tasks}
                removeTasks={removeTasks}
                /*filteredTasks={onClickFilterHandler}*/
                addTask={addTask}
            />
        </div>
    );
}

export default App;

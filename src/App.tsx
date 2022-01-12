import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type FilterType = 'All' | 'Active' | 'Completed'

function App() {

    let [tasks1, setTask1] = useState([
            { id: 1, title: 'CSS', isDone: true},
            { id: 2, title: 'JS', isDone: true},
            { id: 3, title: 'React', isDone: false},
        ]
    )

   /* let [tasks2, setTask2 ] = useState([
            { id: 1, title: 'Terminator', isDone: true},
            { id: 2, title: 'XXX', isDone: true},
            { id: 3, title: 'Rambo', isDone: false},
        ])*/

    const[filter, setFilter] = useState('All')
    let filteredT = tasks1
    if(filter==='Active') {
        filteredT = tasks1.filter(f=>!f.isDone)
    }
    if(filter==='Completed') {
        filteredT = tasks1.filter(f=>f.isDone)
    }

    const removeTasks1 = (taskID: number) => {
        setTask1(tasks1.filter(f => f.id !==taskID))
    }

    /*const removeTasks2 = (taskID: number) => {
        setTask2(tasks2.filter(f => f.id !==taskID))
    }*/

    const filteredTasks = (filterValue: FilterType) => {
        setFilter(filterValue)
    }

  return (
    <div className="App">
        <TodoList title={'What to learn'} tasks={filteredT} removeTasks={removeTasks1} filteredTasks={filteredTasks}/>
        {/*<TodoList title={'Movies'} tasks={tasks2} removeTasks={removeTasks2} filteredTasks={filteredTasks}/>*/}
    </div>
  );
}

export default App;

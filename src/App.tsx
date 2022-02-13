import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
// C - create
// R - remove
// U - update
// D - delete
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [todoListID: string]: Array<TaskType> //объект с любым количеством ключей
}

export type FilterValuesType = "all" | "active" | "completed"

const App = () => {
    // BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const todoListID_3 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'My films', filter: 'all'},
        {id: todoListID_3, title: 'My hobbies', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true}, //"completed"
            {id: v1(), title: "JS/ES6", isDone: true}, // "completed"
            {id: v1(), title: "REACT",  isDone: true}, // "completed"
        ],
        [todoListID_2]: [
            {id: v1(), title: "Commando", isDone: true}, //"completed"
            {id: v1(), title: "Rambo", isDone: true}, // "completed"
            {id: v1(), title: "Sweet November",  isDone: true}, // "completed"
        ],
        [todoListID_3]: [
            {id: v1(), title: "Programming", isDone: true}, //"completed"
            {id: v1(), title: "Bodybuilding", isDone: true}, // "completed"
            {id: v1(), title: "MMA",  isDone: true}, // "completed"
        ],
    })

    //console.log(tasks[todoListID_3][1].title)//'Bodybuilding

    const removeTask = (taskID: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)})//структура в одну строку
    }
    const addTask = (title: string, todoListID: string) => {    //структура в несколько строк
        const newTask: TaskType =  {id: v1(), title, isDone: false}
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})//структура в одну строку
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)})//структура в одну строку
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)})//структура в одну строку
    }
    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: filter}: tl))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title}: tl))
    }
    const getTasksForRender = (todoList: TodoListType) => {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }
    const addTodoList = (title: string) => {
        const newTodoListID= v1()
        const newTodoList: TodoListType = {
            id: newTodoListID, title, filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    const todoListComponents = todoLists.map(tl => {
        const tasksForRender = getTasksForRender(tl)
        return (
            <TodoList
                key={tl.id}
                id={tl.id}
                title={tl.title}
                tasks={tasksForRender}
                filter={tl.filter}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                removeTodoList={removeTodoList}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })
    // UI:
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
            {todoListComponents}
        </div>
    );
}

export default App;
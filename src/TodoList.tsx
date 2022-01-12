import React from "react";
import {FilterType} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title?: string
    tasks: Array<TaskType>
    removeTasks: (taskID: number)=>void
    filteredTasks:(filterValue: FilterType)=>void
}

export const TodoList = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((m, i) => {
                    return (
                            <li key={m.id}>
                                <button onClick={(event) => props.removeTasks(m.id)}>X</button>
                                <input type="checkbox" checked={m.isDone}/>
                                <span>{m.title}</span>
                            </li>
                        )
                })}
               {/* <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <button onClick={()=> props.filteredTasks('All')}>All</button>
                <button onClick={()=> props.filteredTasks('Active')}>Active</button>
                <button onClick={()=> props.filteredTasks('Completed')}>Completed</button>
            </div>
        </div>
    )
}
import React, { useState } from "react";
import { FilterType } from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type PropsType = {
    title?: string
    tasks: Array<TaskType>
    removeTasks: (taskID: number) => void
    filteredTasks?: (filterValue: FilterType) => void
}

export const TodoList = (props: PropsType) => {
    const [filter, setFilter] = useState<FilterType>('All')

    let filteredT = props.tasks

    if (filter === 'Active') {
        filteredT = filteredT.filter(f => f.isDone)
    }
    if (filter === 'Completed') {
        filteredT = filteredT.filter(f => !f.isDone)
    }
    const filteredTasks = (filterValue: FilterType) => {
        setFilter(filterValue)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {filteredT.map((m, i) => {
                    return (
                        <li key={i}>
                            <button onClick={() => props.removeTasks(m.id)}>X</button>
                            <input type="checkbox" checked={m.isDone} />
                            <span>{m.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => filteredTasks('All')}>All</button>
                <button onClick={() => filteredTasks('Active')}>Active</button>
                <button onClick={() => filteredTasks('Completed')}>Completed</button>
            </div>
        </div>
    )
}
import React from 'react';
import {Button} from "./Button";
import {TaskType} from "../TodoList";
import {FilterType} from "../App";

type MapType = {
    tasks: Array<TaskType>
    removeTasks: (taskID: string) => void
    filteredTasks?: (filterValue: FilterType) => void
}

const MapForTodoList = (props: MapType) => {

    let filteredT = props.tasks
    const removeTaskHandler = (taskID:string) => {                    //функция для удаления таска по taskID
        props.removeTasks(taskID)
    }
    const onChandlerForIsDone = (id: string, value: boolean) => {
        setTask(tasks.map(m=>m.id === id ? {...m,isDone:value} : m))
    }
    return (
        <div>
            <ul>
                {filteredT.map((m, i) => {

                    return (
                        <li key={i}>
                            {/*<Checkbox isDone={m.isDone} CheckBoxChangeStatus={(value)=>CheckBoxChangeStatusHandler(m.id, m.isDone)}/>*/}
                            <input type="checkbox"
                                   checked={m.isDone}
                                /*onChange={(e)=>onChangeHandlerForIsDone()}*/
                                   onChange={(e)=>props.onChandlerForIsDone(m.id, e.currentTarget.checked)}
                            />
                            <Button name={'X'} callback={()=>removeTaskHandler(m.id)} />
                            {/*<button onClick={()=>removeTaskHandler(m.id)}>X</button>*/}
                            <span>{m.title}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default MapForTodoList;
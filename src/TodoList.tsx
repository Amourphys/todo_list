import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { FilterType } from "./App";
import {Button} from "./components/Button";

export type TaskType = {                                             //типизация для массива тасков которые приходят из стэйта
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {                                            //типизация для пропсов которые приходят в TodoList
    title?: string                                                   //название компоненты
    tasks: Array<TaskType>                                           //массив тасков из стэйта
    removeTasks: (taskID: string) => void                            //функция удаления таски
    /*changeFilter: (value: FilterValuesType) => void */
    filteredTasks?: (filterValue: FilterType) => void                //функция фильтрации таск по данным из FilterType
    addTask: (title: string) => void                                 //функция добавления таски
}

export const TodoList = ({tasks, ...props}: PropsType) => {          //передаем пропсы через массив с помощью деструктуризации
    const [filter, setFilter] = useState<FilterType>('All') //используем хук useState для фильтрации типов данных из FilterType в App.tsx

    let filteredT = tasks                                            //присваиваем переменной значение массива с пропсами

    if (filter === 'Active') {                                       //создаем условия для фильтрации данных из FilterType
        filteredT = filteredT.filter(f => f.isDone)
    }
    if (filter === 'Completed') {
        filteredT = filteredT.filter(f => !f.isDone)
    }
    const filteredTasks = (filterValue: FilterType) => {             //функция которая передает отфильтрованные значения
        setFilter(filterValue)
    }
    let [title, setTitle] = useState('')                    //используем хук useState для работы с инпутом
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {  //функция которая отвечает за изменения событий в инпуте
        setTitle(e.currentTarget.value)
    }

    const onClickHandler = () => {                                   //функция которая обрабатывает события кликов по кнопке
        if (title.trim() === '') {                                   //условие по которому невозможно передать значение с пустым полем ввода или с пробелом
            return
        }
        props.addTask(title.trim())                                  //условие для загрузки данных в массив с данными для отображения на странице
        setTitle('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {//функция для правильной обработки событий клика по кнопке
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }

    const onClickFilterHandler = (value: FilterType) => {             //функция для фильтрации при нажатии на выбранную кнопку
        filteredTasks(value)
    }

    const removeTaskHandler = (taskID:string) => {                    //функция для удаления таска по taskID
        props.removeTasks(taskID)
    }

    /*const callbackHandlerForFilters = (filterValue: FilterType) => {
        props.filteredTasks(filterValue)
    }*/



    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
                <Button name={'+'} callback={onClickHandler}/>
                {/*<button onClick={onClickHandler}>+</button>*/}
            </div>
            <ul>
                {filteredT.map((m, i) => {
                    return (
                        <li key={i}>
                            <input type="checkbox" checked={m.isDone} />
                            <Button name={'X'} callback={()=>removeTaskHandler(m.id)}/>
                            {/*<button onClick={()=>removeTaskHandler(m.id)}>X</button>*/}
                            <span>{m.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button name={'All'} callback={()=>onClickFilterHandler('All')}/>
                <Button name={'Active'} callback={()=>onClickFilterHandler('Active')}/>
                <Button name={'Complete'} callback={()=>onClickFilterHandler('Completed')}/>
                {/*<button onClick={()=>onClickFilterHandler('All')}>All</button>
                <button onClick={()=>onClickFilterHandler('Active')}>Active</button>
                <button onClick={()=>onClickFilterHandler('Completed')}>Completed</button>*/}
            </div>
        </div>
    )
}
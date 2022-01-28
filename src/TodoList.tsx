import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { FilterType } from "./App";
import {Button} from "./components/Button";
import Checkbox from "./components/Checkbox";
import s from './TodoList.module.css';
import {FilterValuesType} from "../src1/App";
import {UniversalInputFull} from "./components/UniversalInputFull";
import {Input} from "./components/Input";
//import MapForTodoList from "./components/MapForTodoList";

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
    addTask: (title: string) => void                                  //функция добавления таски
    onChandlerForIsDone: (id: string, value: boolean) => void     //функция для изменения значений в тэге чекбоксе в компоненте чекбоксе
    /*CheckBoxChangeStatus?: (taskID: string, value: boolean) => void*/ //функция для изменения значений в компоненте чекбоксе
    filter?: FilterValuesType                                         //функция для фильтрации значений приходящих через пропс
}

export const TodoList = ({tasks, ...props}: PropsType) => {  //передаем пропсы через массив с помощью деструктуризации
    const [filter, setFilter] = useState<FilterType>('All') //используем хук useState для фильтрации типов данных из FilterType в App.tsx
    let [error, setError] = useState(false)                  //используем хук useState для обработки ошибок
    let filteredT = tasks                                    //присваиваем переменной значение массива с пропсами

    if (filter === 'Active') {                              //создаем условия для фильтрации данных из FilterType
        filteredT = filteredT.filter(f => f.isDone)
    }
    if (filter === 'Completed') {
        filteredT = filteredT.filter(f => !f.isDone)
    }
    const filteredTasks = (filterValue: FilterType) => {    //функция которая передает отфильтрованные значения
        setFilter(filterValue)
    }
    let [title, setTitle] = useState('')                    //используем хук useState для работы с инпутом
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {  //функция которая отвечает за изменения событий в инпуте
        setTitle(e.currentTarget.value)
    }

    const onClickHandler = () => {                 //функция которая обрабатывает события кликов по кнопке
        if (title.trim() === '') {
            setError(true)       //условие по которому невозможно передать значение с пустым полем ввода или с пробелом
            return
        }
        props.addTask(title.trim())        //условие для загрузки данных в массив с данными для отображения на странице
        setTitle('')
        setError(false)          //условие по которому невозможно передать значение с пустым полем ввода или с пробелом

    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {//функция для правильной обработки событий клика по кнопке
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }

    const onClickFilterHandler = (value: FilterType) => {    //функция для фильтрации при нажатии на выбранную кнопку
        filteredTasks(value)
    }

    const removeTaskHandler = (taskID:string) => {                    //функция для удаления таска по taskID
        props.removeTasks(taskID)
    }

    /*const callbackHandlerForFilters = (filterValue: FilterType) => {
        props.filteredTasks(filterValue)
    }*/

    /*const CheckBoxChangeStatusHandler = (taskID: string, value: boolean) => {
        props.CheckBoxChangeStatus(taskID, value)
    }*/

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <Input title={title} error={error} setError={setError} setTitle={setTitle} addTask={onClickHandler}/>
                <UniversalInputFull addTask={onClickHandler} removeTasks={removeTaskHandler} />
                <input
                    className={error ? s.error : ''}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <Button name={'+'} callback={onClickHandler}/>
                {/*<button onClick={onClickHandler}>+</button>*/}
                {error &&<div className={s.errorMessage}>Title is required</div>}
            </div>
            {/*<MapForTodoList tasks={props.tasks} removeTask={removeTasks}/>*/}
            <ul>
                {filteredT.map((m, i) => {
                    return (
                        <li key={i}>
                            <Checkbox isDone={m.isDone} CheckBoxChangeStatus={(value)=>props.onChandlerForIsDone(m.id, value)}/>
                           {/* <input type="checkbox"
                                checked={m.isDone}*/}
                                {/*onChange={(e)=>onChangeHandlerForIsDone()}*/}
                               {/* onChange={(e)=>props.onChandlerForIsDone(m.id, e.currentTarget.checked)}
                            />*/}
                            <Button name={'X'} callback={()=>removeTaskHandler(m.id)} />
                            {/*<button onClick={()=>removeTaskHandler(m.id)}>X</button>*/}
                            <span>{m.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button styleForButton={filter} name={'All'} callback={()=>onClickFilterHandler('All')}/>
                <Button styleForButton={filter} name={'Active'} callback={()=>onClickFilterHandler('Active')}/>
                <Button styleForButton={filter} name={'Completed'} callback={()=>onClickFilterHandler('Completed')}/>
                {/*<button className={filter === 'All' ? s.activeFilter : ''} onClick={()=>onClickFilterHandler('All')}>All</button>*/}
                {/*<button className={filter === 'Active' ? s.activeFilter : ''} onClick={()=>onClickFilterHandler('Active')}>Active</button>*/}
                {/*<button className={filter === 'Completed' ? s.activeFilter : ''} onClick={()=>onClickFilterHandler('Completed')}>Completed</button>*/}
            </div>
        </div>
    )
}
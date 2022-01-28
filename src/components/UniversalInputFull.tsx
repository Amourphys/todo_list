import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "../TodoList.module.css";

type UniversalInputType = {
    addTask:(title: string) => void
    removeTasks: (title: string) => void
}

 export const UniversalInputFull = (props:UniversalInputType) => {
     let [title, setTitle] = useState('');
     let [error, setError] = useState(false);

     const onClickHandler = () => {                                   //функция которая обрабатывает события кликов по кнопке
         if (title.trim() === '') {
             setError(true)                                      //условие по которому невозможно передать значение с пустым полем ввода или с пробелом
             return
         }
         props.addTask(title.trim())                                  //условие для загрузки данных в массив с данными для отображения на странице
         setTitle('')
         setError(false)                                      //условие по которому невозможно передать значение с пустым полем ввода или с пробелом
     }

     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {  //функция которая отвечает за изменения событий в инпуте
         setTitle(e.currentTarget.value)
     }

     const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {//функция для правильной обработки событий клика по кнопке
         if (e.key === 'Enter') {
             onClickHandler()
         }
     }

     const removeTaskHandler = (taskID:string) => {                    //функция для удаления таска по taskID
         props.removeTasks(taskID)
     }

    return (
        <input
            className={error ? s.error : ''}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
        />
    );
};
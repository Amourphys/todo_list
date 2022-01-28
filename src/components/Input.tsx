import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from "../TodoList.module.css";

type InputType = {
    title: string
    error: boolean
    setTitle:(title:string) => void
    setError:(title:boolean) => void
    addTask:(title: string) => void
}

export const Input = (props:InputType) => {

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {//функция для правильной обработки событий клика по кнопке
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }

    const onClickHandler = () => {                                   //функция которая обрабатывает события кликов по кнопке
        if (props.title.trim() === '') {
            props.setError(true)                                      //условие по которому невозможно передать значение с пустым полем ввода или с пробелом
            return
        }
        props.addTask(props.title.trim())                                  //условие для загрузки данных в массив с данными для отображения на странице
        props.setTitle('')
        props.setError(false)                                      //условие по которому невозможно передать значение с пустым полем ввода или с пробелом

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {  //функция которая отвечает за изменения событий в инпуте
        props.setTitle(e.currentTarget.value)
    }

    return (
        <input
            className={props.error ? s.error : ''}
            value={props.title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
        />
    );
};
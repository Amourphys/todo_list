import React from 'react';
import s from '../TodoList.module.css';
import {FilterType} from "../App";

type ButtonType = {
    name: string
    callback: () => void
    styleForButton?:FilterType
}

export const Button = (props: ButtonType) => {
    const onClickHandler = () => {
        props.callback()
    }
    console.log(props.styleForButton, props.name)
    return (
            <button
                className={props.styleForButton === props.name ? s.activeFilter : ''}
                onClick={onClickHandler}
            >
                {props.name}
            </button>
    );
};


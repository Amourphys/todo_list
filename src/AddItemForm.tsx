import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import Button from "./Button";

type AddItemFormType = {
    addItem: (title: string) => void
}

const AddItemForm:FC<AddItemFormType> = (props) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddItem()
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const errorMessageStyle = {color: "white", backgroundColor: "red"}
    const errorMessage = error
        ? <div style={errorMessageStyle}>Title is required!</div>
        : null
    return (
        <div>
            <input
                value={title}
                onChange={onChangeSetTitle} //input.value
                onKeyPress={onKeyPressAddItem}
                className={error ? "error" : ""}
            />
            <Button title={'+'} active={false} onClickHandler={onClickAddItem} />
            {errorMessage}
        </div>
    );
};

export default AddItemForm;
import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

const EditableSpan:FC<EditableSpanPropsType> = ({title,changeTitle}) => {
    const [newTitle, setNewTitle] = useState<string>(title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onChangeSetUserText = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        changeTitle(newTitle)
        setEditMode(false)
    }
    const onKeyPressOfEditMode = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && offEditMode()

    return (
            editMode
            ? <input
                autoFocus={true}
                value={newTitle}
                onChange={onChangeSetUserText}
                onBlur={offEditMode}
                onKeyPress={onKeyPressOfEditMode}
            />
            : <span onDoubleClick={onEditMode}>{title}</span>
    );
};

export default EditableSpan;
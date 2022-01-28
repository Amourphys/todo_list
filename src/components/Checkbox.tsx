import React, {ChangeEvent} from 'react';

type CheckboxType = {
    isDone: boolean
    CheckBoxChangeStatus: (value: boolean) => void
}

const Checkbox = (props: CheckboxType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.CheckBoxChangeStatus(e.currentTarget.checked)
    }
    return (
            <input type="checkbox" checked={props.isDone} onChange={onChangeHandler}/>
    );
};

export default Checkbox;
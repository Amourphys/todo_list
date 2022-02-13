import React, {FC} from 'react';
import Button from "./Button";
import {FilterValuesType} from "./App";

type ButtonsBlockPropsType = {
    filter: FilterValuesType
    setFilterValue: (filter: FilterValuesType) => () => void
}

const ButtonsBlock: FC<ButtonsBlockPropsType> = ({filter, setFilterValue}) => {
    return (
        <div>
            <Button
                filter={'all'}
                active={filter === "all"}
                title={"All"}
                onClickHandler={setFilterValue("all")}
            />
            <Button
                filter={'active'}
                active={filter === "active"}
                title={"Active"}
                onClickHandler={setFilterValue("active")}
            />
            <Button
                filter={'completed'}
                active={filter === "completed"}
                title={"Completed"}
                onClickHandler={setFilterValue("completed")}
            />
        </div>
    );
};

export default ButtonsBlock;
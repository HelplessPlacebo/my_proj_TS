import React from 'react';
import Button from '@material-ui/core/Button';
import EditButton from '@material-ui/icons/Edit';
import {TEditTaskButtonProps} from "../../GlobalTypes/ToDoListsTypes/ToDoListsTypes";

const EditTaskButton : React.FC<TEditTaskButtonProps> = (props)=> {

    return (
        <div>
            <Button
                disabled={props.ShowButtonBlocked}
                variant="text"
                color="primary"
                onClick={props.HandleOnClick}
                size="large"
                startIcon={<EditButton />}
            >
            </Button>
        </div>
    );
}
export default EditTaskButton
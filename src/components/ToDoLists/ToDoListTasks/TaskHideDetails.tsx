import React from 'react';
import DetailsIconUP from '@material-ui/icons/KeyboardArrowUp';
import Button from "@material-ui/core/Button";
import {TTaskHideDetailsProps} from "../../GlobalTypes/ToDoListsTypes/ToDoListsTypes";

const TaskHideDetailsIcon : React.FC<TTaskHideDetailsProps>= (props)=> {

    return (
        <div>
            <Button
                variant="text"
                color="primary"
                onClick={props.HandleOnClick}
                size="large"
                startIcon={<DetailsIconUP />}
            >
            </Button>
        </div>
    );
}
export default TaskHideDetailsIcon
import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {TAddNewTaskButtonProps} from "../../GlobalTypes/ToDoListsTypes/ToDoListsTypes";


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const  AddNewTaskButton : React.FC<TAddNewTaskButtonProps> = (props)=> {
    const classes = useStyles();

    const AddNewTask = ()=>{
        if(props.AddNewTaskFieldCurrentValue.length >0 && props.AddNewTaskFieldCurrentValue.length <100) {
            props.AddNewTaskThunk(props.ListID, props.AddNewTaskFieldCurrentValue)
        }
    }

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={AddNewTask}
                size="small"
                className={classes.button}
            >
                add task
            </Button>
        </div>
    );
}
export default AddNewTaskButton
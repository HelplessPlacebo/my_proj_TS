import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import {TAddNewTaskFieldProps} from "../../GlobalTypes/ToDoListsTypes/ToDoListsTypes";

const useStyles = makeStyles(theme => ({

    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 600,
    },
}));

const AddTaskField : React.FC<TAddNewTaskFieldProps>= (props) => {
    const classes = useStyles();
    return (
        <form className={classes.container} noValidate autoComplete="off">
            <div>
                <TextField
                    onChange={props.OnAddNewTaskFieldChange}
                    id="AddTaskFieldID"
                    className={classes.textField}
                    placeholder="Enter new task title"
                    helperText="maximum 100 symbols"
                    margin="normal"
                />
            </div>
        </form>
    );
}
export default AddTaskField
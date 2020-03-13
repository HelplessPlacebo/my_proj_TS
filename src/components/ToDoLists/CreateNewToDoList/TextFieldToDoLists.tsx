import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ListIcon from '@material-ui/icons/ListAlt';
import {TTextFieldToDoListsProps} from "../../GlobalTypes/ToDoListsTypes/ToDoListsTypes";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

 const InputWithIcon : React.FC<TTextFieldToDoListsProps> = (props) => {
    const classes = useStyles();
    return (
            <div className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <ListIcon />
                    </Grid>
                    <Grid item>
                        <TextField onChange={props.OnTextFieldCreateNewToDoListChanging}
                                   id="input-with-icon-grid"
                                   placeholder={"Enter new list name"} />
                    </Grid>
                </Grid>
            </div>
    );
}
export default InputWithIcon
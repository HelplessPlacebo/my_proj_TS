import React from 'react';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import {TEditButtonProps} from "../GlobalTypes/ToDoListsTypes/ToDoListsTypes";


 const EditButton : React.FC<TEditButtonProps> =(props)=> {


    return (
        <div>
            <Fab size={props.ButtonSize} color="secondary" aria-label="edit" >
                <EditIcon onClick={props.HandleOnEdit} />
            </Fab>

        </div>
    );
}
export default EditButton
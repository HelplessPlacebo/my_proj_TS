import React from "react"
import IconButton from "@material-ui/core/IconButton";
import UsersIcon from '@material-ui/icons/People';



const MessagesIcon : React.FC= () =>{
    return <div>
        <div >
            <IconButton  color="inherit">
                    <UsersIcon />
            </IconButton>
        </div>
    </div>
}

export default MessagesIcon
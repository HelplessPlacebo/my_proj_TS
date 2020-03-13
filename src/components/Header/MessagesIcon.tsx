import React from "react"
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge/Badge";
import MailIconHeader from '@material-ui/icons/Mail';

type TMessagesIconProps = {
    NewMessagesCount : number
}

const MessagesIcon : React.FC<TMessagesIconProps> = (props) =>{

    return  <div>
        <div >
            <IconButton color="inherit">
                <Badge
                    badgeContent={props.NewMessagesCount.toString()}
                    color="secondary">
                    <MailIconHeader />
                </Badge>
            </IconButton></div>

    </div>
}

export default MessagesIcon
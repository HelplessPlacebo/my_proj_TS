import React, {useState} from "react"
import d from "../Dialogs.module.css";
import DeleteConfirmWindow from "./DeleteConfirmWindow";
import ToTrash from "../../assetss/images/trash.png"
import {TDeleteMessageProps} from "../../GlobalTypes/DialogsTypes/MessagesTypes";


const DeleteMessage: React.FC<TDeleteMessageProps> = (props) => {

    let [ToConfirmDeleting, SetToConfirmDeleting] = useState<boolean>(false)


    const deleteMessage = () => {
        props.DeleteMessageThunk(props.MessageID, props.DialoguserID)
        SetToConfirmDeleting(false)
    }


    return <div className={d.ConfirmText}>
        {!ToConfirmDeleting &&
        <img src={ToTrash} className={d.ToTrash} onClick={() => {
            SetToConfirmDeleting(true)
        }}/>

        }
        <DeleteConfirmWindow
            SetToConfirmDeleting={SetToConfirmDeleting}
            ToConfirmDeleting={ToConfirmDeleting}
            deleteMessage={deleteMessage}

        />

    </div>

}

export default DeleteMessage
import React from 'react'
import {NavLink} from "react-router-dom";
import d from "./Dialogs.module.css";
import UserPhoto from "./../assetss/images/userPhoto.jpg"
import pc from "../Profile/UserInfo/UserInfo.module.css";
import {TDialogInfoProps} from "../GlobalTypes/DialogsTypes/DialogsTypes"


const DialogInfo : React.FC<TDialogInfoProps>= (props ) => {

    const date = props.MessageSendTime.split("T")[0]
    const time = props.MessageSendTime.split("T")[1].split(".")[0]




    return <div className={d.DialogArea}>
        <div className={`${d.item} ${d.active}`}>
            <NavLink to={`/messages/${props.UserID}`}>
                <div className={d.Main}>
                    <div className={pc.UserName}>
                        {props.DialogUserName}
                        <div>
                            <NavLink to={'/Profile/' + props.UserID}>
                                <img className={d.DialogUserPhoto}
                                    // @ts-ignore
                                     src={props.DialogUserAvatar.small || props.DialogUserAvatar.large
                                         ?
                                         props.DialogUserAvatar.small
                                             ?
                                             props.DialogUserAvatar.small
                                             : props.DialogUserAvatar.large
                                         : UserPhoto
                                     }/>
                            </NavLink>
                        </div>
                    </div>

                    <div className={d.padding}>
                        {props.NewMessagesCount !== 0 ?
                            "you have a " + props.NewMessagesCount + " new messages"
                            : "you don't have a new messages"}
                    </div>
                    <div className={d.padding}>
                        {
                            props.MessageSendTime ?
                                <div>
                                    last message was :
                                    <div>
                                        {date}
                                    </div>
                                    <div>
                                        {time}
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                </div>
            </NavLink>
        </div>
    </div>
}

// @ts-ignore
export default DialogInfo;
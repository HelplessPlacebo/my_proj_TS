import React, {useEffect, useState} from "react"
import Preloader from "../../assetss/common/Loader/Loader";
import {NavLink} from "react-router-dom";
import mwuStyles from "./Messages.module.css"
import UserPhoto from "../../assetss/images/userPhoto.jpg";
import Viewed from "../../assetss/images/viewed1.jpg";
import {MaxLengthCreator, required} from "../../utils/validators";
import d from "../Dialogs.module.css";
import {Field, reduxForm,InjectedFormProps} from "redux-form";
import {TextAreaDialogsMessage} from "../../assetss/common/ValidatorsComponents/ElementsValidators";
import Paginator from "../../assetss/common/Paginator/Paginator";
import DeleteMessage from "./DeleteMessage";

import { TMessagesWithUserProps,TMessageWithUserFormProps} from "../../GlobalTypes/DialogsTypes/MessagesTypes";

const maxValue300 = MaxLengthCreator(300)

const MessageWithUserForm : React.ComponentType<TMessageWithUserFormProps> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>

                <div className={d.messages}>
                    <div>
                        <div>
                            <Field name={"MessageTextArea"}
                                   component={TextAreaDialogsMessage}
                                   placeholder={"Enter your message here"}
                                   validate={[required, maxValue300]}/>
                        </div>
                        <div>
                            <button className={d.button}> send message</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
//@ts-ignore
const ReduxMessageWithUserForm = reduxForm<MessagesWithUser>({form: 'messages'})(MessageWithUserForm)


const MessagesWithUser: React.FC<TMessagesWithUserProps> = (props) => {


    const SendNewMessage = (FormData: any) => {
        props.SendNewMessageThunk(props.DialoguserID, FormData.MessageTextArea)
    }

    let MessagesWithUserData = {
        InterlocutorAvatar: props.InterlocutorAvatar,
        UserAvatar: props.UserAvatar,
        DialogsMessages: props.DialogsMessages
    }

    type TMessagesWithUserData = typeof MessagesWithUserData

    let [MessagesData, SetMessagesData] = useState<TMessagesWithUserData>(MessagesWithUserData)


    useEffect(() => {
            SetMessagesData(MessagesWithUserData)
        }, [MessagesWithUserData]
    )

    return <div>
        {MessagesData.DialogsMessages && MessagesData.DialogsMessages.items ?
            MessagesData.DialogsMessages.items.map(item => {
                return (
                    <div className={mwuStyles.fontStyles} key={item.id}>
                        <div className={mwuStyles.dateStyle}>
                            was sent at : &nbsp;&nbsp;
                            {item.addedAt.split("T")[0]}
                        </div>


                        <div className={mwuStyles.MessageFormStyle}>
                            <div>
                                {item.senderName}  &nbsp;&nbsp;
                                {item.addedAt.split("T")[1].split(".")[0].split(":")[0]}:
                                {item.addedAt.split("T")[1].split(".")[0].split(":")[1]}
                            </div>

                            <NavLink to={`/Profile/${item.senderId}`}>
                                {item.senderId !== props.MyID
                                    ?
                                    <img className={mwuStyles.img}
                                         src={MessagesData.InterlocutorAvatar
                                             ? MessagesData.InterlocutorAvatar
                                             : UserPhoto}/>
                                    :
                                    <img className={mwuStyles.img}
                                         src={MessagesData.UserAvatar
                                             ? MessagesData.UserAvatar
                                             : UserPhoto}/>
                                }
                            </NavLink>

                            <div className={mwuStyles.messageText}>
                                &nbsp;&nbsp;  {item.body}
                            </div>
                            <DeleteMessage DialoguserID={props.DialoguserID}
                                           MessageID={item.id}
                                           DeleteMessageThunk={props.DeleteMessageThunk}
                            />
                            <div>
                                {item.viewed &&
                                <img src={Viewed} className={mwuStyles.viewed}/>
                                }
                            </div>
                        </div>
                    </div>
                )
            })

            : <Preloader/>
        }

        {MessagesData.DialogsMessages ?
            <>
                <ReduxMessageWithUserForm onSubmit={SendNewMessage} {...props} />
                {/*<Paginator OnChangedPage={props.OnChangedPage}
                       currentPage={props.currentPage}
                       totalUsersCount={props.MessagesData.DialogsMessages.totalCount}
                       pageSize={props.pageSize}
                       PortionSize={props.PortionSize}
            />*/}
            </>
            : <Preloader/>
        }
    </div>

}
export default MessagesWithUser
import React, {useState} from "react"
import pds from "./ProfileData.module.css";
import lm from "../../Login/login.module.css";
import {CreateField, TextAreaMessage} from "../../assetss/common/ValidatorsComponents/ElementsValidators";
import {MaxLengthCreator, required} from "../../utils/validators";
import {reduxForm} from "redux-form";
import d from "../../Dialogs/Dialogs.module.css";
import pc from "./UserInfo.module.css";
import {TSendMessageOnUserPageProps} from "../../GlobalTypes/ProfileTypes/ProfileTypes";

let maxLength300 = MaxLengthCreator(300)
//@ts-ignore
const SendMessageOnUserPageForm = (props) => {

    return (

        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    {CreateField("Enter message text", "MessageFromUserPage",
                        [required, maxLength300], TextAreaMessage)}
                </div>

                {props.error
                    ?
                    <div className={lm.AuthError}>
                        {props.error}
                    </div>
                    : null
                }
                <div>
                    <button className={pc.buttonSaveChanges}> send message</button>
                    <button className={pc.buttonGoBack }
                            onClick={props.MessageSendingModOFF}> go back </button>
                </div>

            </form>
        </div>)
}
const ReduxSendMessageOnUserPageForm = reduxForm({form: 'SendMessageForm'})(SendMessageOnUserPageForm)

const SendMessageOnUserPage : React.FC<TSendMessageOnUserPageProps> = (props) => {

    let [ChosedSendMessage, SetChosedSendMessage] = useState(false)


    const MessageSendingModON = () => {
        SetChosedSendMessage(true)
    }

    const MessageSendingModOFF = () => {
        SetChosedSendMessage(false)
    }
    const SendNewMessage = (Formdata : {MessageFromUserPage : string}) => {
        {props.UserID && props.SendNewMessageThunk(props.UserID, Formdata.MessageFromUserPage)}
        SetChosedSendMessage(false)
    }


    return (<div>


            {!props.IsMyPage ?
                <div>
                    {!ChosedSendMessage ?
                        <div>
                            <button className={pds.buttonEditInformation} onClick={MessageSendingModON}>
                                send message to {props.UserName}
                            </button>
                        </div>
                        :
                        <div>
                            < ReduxSendMessageOnUserPageForm
                                //@ts-ignore
                                onSubmit={SendNewMessage}
                                //@ts-ignore
                                MessageSendingModOFF={MessageSendingModOFF}/>
                        </div>
                    }
                </div>
                : null
            }
        </div>
    )
}


export default SendMessageOnUserPage
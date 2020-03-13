import React from 'react'
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from 'react-router-dom'
import {
    GetIsFetchingDialogs, GetDialogsMessagesSelector,
    GetinterlocutorAvatarSelector, GetUserAvatarSelector
} from "../../../data/DialogsSelectors";
import MessagesWithUser from "./MessagesWithUser";
import {AuthRedirect} from "../../hocs/AuthRedirect";
import {
    SendNewMessageThunk,
    GetNewMessagesThunk,
    GetInterlocutorAvatarThunk,
    GetProfileAvatarThunk,
    DeleteMessageThunk,
    GetNewMessagesCountThunk
} from "../../../data/DIalogsReduser"
import {GetUserIDSelector} from "../../../data/AuthSelectors";
import {GetNewMessagesCountSelector} from "../../../data/InitialozationSelectors";
import Preloader from "../../assetss/common/Loader/Loader";
import {T_MDTP_MessagesContainer,T_MSTP_MessagesContainer, TMessagesContainerOwnProps} from "../../GlobalTypes/DialogsTypes/MessagesTypes";
import {GlobalState} from "../../../data/redux-store";

type TMessagesContainerProps = T_MDTP_MessagesContainer & T_MSTP_MessagesContainer & TMessagesContainerOwnProps

class MessagesContainer extends React.Component<TMessagesContainerProps> {

    componentDidMount() {
        const DialogUserID = this.props.match.params.userID
        this.props.GetNewMessagesThunk(DialogUserID)
        this.props.GetInterlocutorAvatarThunk(DialogUserID)
        this.props.GetProfileAvatarThunk(this.props.MyID)
        if(this.props.NewMessagesCount > 0){
            this.props.GetNewMessagesCountThunk()
        }
    }


    render() {

        return (
            <>
            {
                this.props.IsFetching ? <Preloader/> :
                    <MessagesWithUser InterlocutorAvatar={this.props.InterlocutorAvatar}
                                      UserAvatar={this.props.UserAvatar}
                                      MyID={this.props.MyID}
                                      DialogsMessages={this.props.DialogsMessages}
                                      DeleteMessageThunk={this.props.DeleteMessageThunk}
                                      SendNewMessageThunk={this.props.SendNewMessageThunk}
                                      DialoguserID={this.props.match.params.userID}/>
            }
            </>

        )
    }
}


let StateToProps = (state : GlobalState)  : T_MSTP_MessagesContainer => ({
    DialogsMessages : GetDialogsMessagesSelector(state),
    InterlocutorAvatar : GetinterlocutorAvatarSelector(state),
    UserAvatar :  GetUserAvatarSelector(state),
    MyID: GetUserIDSelector(state),
    NewMessagesCount : GetNewMessagesCountSelector(state),
    IsFetching : GetIsFetchingDialogs(state)
})

export default  compose(connect<T_MSTP_MessagesContainer,T_MDTP_MessagesContainer,TMessagesContainerOwnProps,GlobalState>(StateToProps,
    {
        GetNewMessagesThunk, SendNewMessageThunk,
        GetInterlocutorAvatarThunk,
        GetProfileAvatarThunk,DeleteMessageThunk,GetNewMessagesCountThunk
    }),
    AuthRedirect,
    withRouter)(MessagesContainer)
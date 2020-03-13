import React from 'react'
import {GetAllDialogsThunk} from "../../data/DIalogsReduser";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AuthRedirect} from "../hocs/AuthRedirect";
import {compose} from "redux";
import {GetAllDialogsSelector, GetIsFetchingDialogs} from "../../data/DialogsSelectors";
import {withRouter} from 'react-router-dom'
import {T_MDTP_DialogsContainer,T_MSTP_DialogsContainer, TDialogsContainerOwnProps} from "../GlobalTypes/DialogsTypes/DialogsTypes";
import {GlobalState} from "../../data/redux-store";

type TDialogsContainerProps = T_MDTP_DialogsContainer & T_MSTP_DialogsContainer & TDialogsContainerOwnProps

class DialogsContainer extends React.Component<TDialogsContainerProps> {

    componentDidMount() {
        this.props.GetAllDialogsThunk()
    }

    render() {
        return (
            <Dialogs AllDialogs={this.props.AllDialogs} IsFetching={this.props.IsFetching}/>
        )
    }

}

let StateToProps = (state: GlobalState): T_MSTP_DialogsContainer => ({
    AllDialogs: GetAllDialogsSelector(state),
    IsFetching: GetIsFetchingDialogs(state)
})

export default compose(connect<T_MSTP_DialogsContainer,T_MDTP_DialogsContainer,TDialogsContainerOwnProps, GlobalState>
(StateToProps, {GetAllDialogsThunk}), AuthRedirect, withRouter)(DialogsContainer)
import React from 'react';
import Header from "./Header";
import Preloader from "../assetss/common/Loader/Loader";
import {connect} from "react-redux";
import {LogOutThunk} from "../../data/AuthReducer";
import {GetOwnNameSelector, GetProfileSelector} from "../../data/ProfileSelectors";
import {GetNewMessagesCountThunk} from "../../data/DIalogsReduser"
import {
    GetIsFetchingSelector,
    GetIsLoginedSelector,
    GetLoginSelector,
    GetUserIDSelector
} from "../../data/AuthSelectors";
import {GetNewMessagesCountSelector} from "../../data/InitialozationSelectors";
import {GlobalState} from "../../data/redux-store";
import {
    T_MDTP_HeaderContainer,
    T_MSTP_HeaderContainer,
    THeaderContainerOwnProps
} from "../GlobalTypes/HeaderTypes/HeaderTypes";

export type THeaderContainerProps = T_MSTP_HeaderContainer & T_MDTP_HeaderContainer & THeaderContainerOwnProps

class HeaderContainer extends React.Component<THeaderContainerProps> {
    componentDidMount() {
        if(this.props.IsLogined){
            this.props.GetNewMessagesCountThunk()
        }
    }
    componentDidUpdate(prevProps : THeaderContainerProps, prevState : {}) {

        if(this.props.IsLogined !== prevProps.IsLogined ){
            this.props.GetNewMessagesCountThunk()
        }
    }


    render() {
        return <>
        {this.props.IsFetching ? <Preloader/> :null}
          <Header {...this.props} />
          </>
    }

}
let MapStateToProps = (state : GlobalState) : T_MSTP_HeaderContainer  => ({
    IsFetching : GetIsFetchingSelector(state),
    IsLogined: GetIsLoginedSelector(state),
    login:GetLoginSelector(state),
    UserProfile: GetProfileSelector(state),
    OwnID : GetUserIDSelector(state),
    OwnName : GetOwnNameSelector(state),
    NewMessagesCount : GetNewMessagesCountSelector(state)
})

export default connect<T_MSTP_HeaderContainer,T_MDTP_HeaderContainer,THeaderContainerOwnProps, GlobalState>(MapStateToProps,
    {LogOutThunk,GetNewMessagesCountThunk}) (HeaderContainer);

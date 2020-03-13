import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'
import {
    GetProfileThunk,
    GetProfileStatusThunk,
    SetProfileStatusThunk,
    SetProfilePhotoThunk,
    SetIsMyPage, UpdateProfileInfoThunk
}
    from '../../data/ProfileReduser'
import {compose} from "redux";
import {
    GetIsMyPageSelector, GetProfileIsFetching,
    GetProfileSelector, GetStatusSelector
} from "../../data/ProfileSelectors";
import {GetIsLoginedSelector, GetUserIDSelector} from "../../data/AuthSelectors";
import {SendNewMessageThunk} from "../../data/DIalogsReduser"
import {GlobalState} from "../../data/redux-store";
import {
    T_MDTP_ProfileContainer,
    T_MSTP_ProfileContainer,
    TProfileContainerOwnProps
} from "../GlobalTypes/ProfileTypes/ProfileTypes";


export type TProfileContainerProps = T_MSTP_ProfileContainer & T_MDTP_ProfileContainer & TProfileContainerOwnProps

class ProfileContainer extends React.Component<TProfileContainerProps> {

    ProfileDataToPaint(){
        let ProfileID = this.props.match.params.userID
        if(!ProfileID){
            ProfileID = this.props.userID
            this.props.SetIsMyPage(true) //  if this branch is going so we are in own page
            if(!ProfileID){
                //@ts-ignore
                this.props.history.push("/login")
            }
        }
        else{
            this.props.SetIsMyPage(false) // if this branch is going so we are on some user page
        }
        if(ProfileID){
            this.props.GetProfileThunk(ProfileID)
            this.props.GetProfileStatusThunk(ProfileID)
        }
    }

    componentDidMount() {
        this.ProfileDataToPaint()
    }

    componentDidUpdate(prevProps: TProfileContainerProps) {

        if (this.props.match.params.userID !== prevProps.match.params.userID) {
            this.ProfileDataToPaint()
        }
    }

    render() {

        return (
            <Profile profile={this.props.profile}
                     status={this.props.status}
                     SetProfileStatus={this.props.SetProfileStatusThunk}
                     SetProfilePhoto={this.props.SetProfilePhotoThunk}
                     IsMyPage={this.props.IsMyPage}
                     SaveProfileData={this.props.UpdateProfileInfoThunk}
                     SendNewMessageThunk={this.props.SendNewMessageThunk}
                     IsLogined={this.props.IsLogined}
                     IsFetching={this.props.IsFetching}
            />
        )
    }
}

let MapStateToProps = (state: GlobalState): T_MSTP_ProfileContainer => ({
    profile: GetProfileSelector(state),
    status: GetStatusSelector(state),
    userID: GetUserIDSelector(state),
    IsMyPage: GetIsMyPageSelector(state),
    IsFetching: GetProfileIsFetching(state),
    IsLogined: GetIsLoginedSelector(state)
})


export default compose(
    connect<T_MSTP_ProfileContainer, T_MDTP_ProfileContainer, TProfileContainerOwnProps, GlobalState>
    (MapStateToProps, {
        GetProfileThunk, GetProfileStatusThunk,
        SetProfileStatusThunk, SetProfilePhotoThunk, SetIsMyPage,
        UpdateProfileInfoThunk, SendNewMessageThunk
    }),
    withRouter)(ProfileContainer)
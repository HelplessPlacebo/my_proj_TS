import React from 'react'
import {connect} from "react-redux";
import {
    followThunk,
    ChangePageSize,
    unfollowThunk,
    SetCurrentPage,
    getUsersThunk,
    ToggleInProcess,
    ChangePortionSize,FindUserThunk
} from "../../data/UsersReduser";
import PurifyUsers from "./Users";
import Preloader from "../assetss/common/Loader/Loader";
import {compose} from "redux";
import {
    GetCurrentPage,
    GetInProgress,
    GetIsFeching,
    GetPageSize,
    GetTotalUsersCount,
    GetUsers,
    GetPortionSize, GetFoundedUserSelector,FindUserIsFetching
} from "../../data/Users-Selectors";
import { GetIsLoginedSelector} from "../../data/AuthSelectors";
import {GlobalState} from "../../data/redux-store";
import {
    T_MDTP_UsersContainer,
    T_MSTP_UsersContainer,
    TUsersContainerOwnProps
} from "../GlobalTypes/UsersTypes/UsersTypes";

type TUsersContainerProps = T_MDTP_UsersContainer & T_MSTP_UsersContainer & TUsersContainerOwnProps

class UsersContainer extends React.Component<TUsersContainerProps> {

    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize)
    }

   OnChangedPage = (pageNumber : number) => {
        this.props.SetCurrentPage(pageNumber)
        this.props.getUsersThunk(pageNumber, this.props.pageSize)
    }
    OnPageSizeChange =  (PageSize : number) => {
     this.props.ChangePageSize(PageSize)
        this.props.getUsersThunk(this.props.currentPage, PageSize)
}

    render() {

        return <>
            {this.props.IsFetching ? <Preloader/> :
                <PurifyUsers Users={this.props.Users}
                             totalUsersCount={this.props.totalUsersCount}
                             pageSize={this.props.pageSize}
                             OnChangedPage={this.OnChangedPage}
                             OnFollow={this.props.followThunk}
                             OnUnFollow={this.props.unfollowThunk}
                             currentPage={this.props.currentPage}
                             ToggleInProcess={this.props.ToggleInProcess}
                             InProcess={this.props.InProcess}
                             IsLogined={this.props.IsLogined}
                             ChangePortionSize={this.props.ChangePortionSize}
                             PortionSize={this.props.PortionSize}
                             FindUserThunk={this.props.FindUserThunk}
                             FoundedUsers={this.props.FoundedUsers}
                             FindUserIsFetching={this.props.FindUserIsFetching}
                             OnPageSizeChange={this.OnPageSizeChange}
                />
            }
        </>
    }
}

let StateToProps = (state : GlobalState) : T_MSTP_UsersContainer => ({
        IsLogined : GetIsLoginedSelector(state),
        Users: GetUsers(state),
        pageSize: GetPageSize(state),
        totalUsersCount: GetTotalUsersCount(state),
        currentPage: GetCurrentPage(state),
        IsFetching: GetIsFeching(state),
        FindUserIsFetching: FindUserIsFetching(state),
        InProcess: GetInProgress(state),
        PortionSize : GetPortionSize(state),
        FoundedUsers : GetFoundedUserSelector(state)
})



export default compose(
    connect<T_MSTP_UsersContainer,T_MDTP_UsersContainer,TUsersContainerOwnProps, GlobalState>(StateToProps,
        {followThunk, unfollowThunk, SetCurrentPage,
            ToggleInProcess, getUsersThunk,ChangePortionSize,FindUserThunk, ChangePageSize})
    //@ts-ignore
)(UsersContainer)
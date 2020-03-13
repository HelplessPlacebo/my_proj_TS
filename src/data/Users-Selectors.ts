import {GlobalState} from "./redux-store";

export const GetUsers = (state : GlobalState) =>{
    return state.UsersData.Users
}
export const GetPageSize = (state : GlobalState) =>{
    return state.UsersData.pageSize
}
export const GetTotalUsersCount = (state : GlobalState) =>{
    return state.UsersData.totalUsersCount
}

export const GetCurrentPage = (state : GlobalState) =>{
    return  state.UsersData.currentPage
}
export const GetIsFeching = (state : GlobalState) =>{
    return state.UsersData.IsFetching
}
export const FindUserIsFetching = (state : GlobalState) =>{
    return state.UsersData.FindUserIsFetching
}
export const GetInProgress = (state : GlobalState) => {
    return state.UsersData.InProcess
}

export const GetPortionSize = (state : GlobalState) => {
    return state.UsersData.PortionSize
}
export const GetFoundedUserSelector = (state : GlobalState) => {
    return state.UsersData.FoundedUsers
}


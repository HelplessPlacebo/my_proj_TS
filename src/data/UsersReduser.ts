import {API} from "../API/requests";
import {stopSubmit} from "redux-form";
import {TUsers, UserID} from "../components/GlobalTypes/UsersTypes/UsersTypes";
import {ThunkAction} from "redux-thunk";
import {GlobalState} from "./redux-store";


const follow = 'Users/FOLLOW'
const unfollow = 'Users/UNFOLLOW'
const setusers = 'Users/SET_USERS'
const Set_Current_Page = 'Users/SET_CURRENT_PAGE'
const Set_Total_Count_Of_Users = 'Users/Set_Total_Count_Of_Users'
const IsFetching_Toggle = 'Users/Toggle_is_fetching'
const IsInProcess_Togle = 'Users/IsInProcess_Togle'
const Portion_Size_Changer = 'Users/Portion_Size_Changer'
const Set_Founded_Users = 'Users/Set_Founded_Users'
const FindUserIsFetching_Toggle = 'Users/FindUserIsFetching_Toggle'
const Change_Page_Size = 'Users/ChangePageSize'


type OnFollowActionType = {
    type: typeof follow
    userID: UserID
}

type onUnFollowActionType = {
    type: typeof unfollow
    userID: UserID
}

type setUsersActionType = {
    type: typeof setusers
    users: Array<TUsers>
}

type SetCurrentPageActionType = {
    type: typeof Set_Current_Page
    currentPage: number
}
type SetTotalCountOfUsersActionType = {
    type: typeof Set_Total_Count_Of_Users
    totalUsersCount: number
}
type ToggleIsFetchingActionType = {
    type: typeof IsFetching_Toggle
    IsFetching: boolean
}
type ToggleFindUserIsFetchingActionType = {
    type: typeof FindUserIsFetching_Toggle
    FindUserIsFetching: boolean
}
type ChangePortionSizeActionType = {
    type: typeof Portion_Size_Changer
    PortionSizeChangingValue: number
}

type ToggleInProcessActionType = {
    type: typeof IsInProcess_Togle
    InProgress: boolean
    UserID: UserID
}
type SetFoundedUserActionType = {
    type: typeof Set_Founded_Users
    NewFoundedUsers:  Array<TUsers>
}

type ChangePageSizeActionType = {
    type: typeof Change_Page_Size
    PageSize: number
}

let DefaultState = {
    Users: [] as Array<TUsers> | null,
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    IsFetching: false,
    FindUserIsFetching: false,
    InProcess: [] as Array<number>,
    PortionSize: 1,
    FoundedUsers: null as Array<TUsers>| null
}


export type DefaultUsersState = typeof DefaultState

type TUsersActions = OnFollowActionType | onUnFollowActionType | setUsersActionType | SetCurrentPageActionType
    | SetTotalCountOfUsersActionType | ToggleIsFetchingActionType | ToggleFindUserIsFetchingActionType
    | ChangePortionSizeActionType | ToggleInProcessActionType | SetFoundedUserActionType | ChangePageSizeActionType

 type TUsersThunks = ThunkAction<Promise<void>, GlobalState, unknown, TUsersActions>

const UsersReducer = (state = DefaultState, action: TUsersActions): DefaultUsersState => {
    switch (action.type) {
        case follow: {
            return {
                ...state,
                Users: state.Users ? state.Users.map(us => {
                        if (us.id === action.userID) {
                            return {
                                ...us,
                                followed: true
                            }
                        }
                        return us
                    })
                    : null
            }
        }
        case unfollow: {
            return {
                ...state,
                Users: state.Users ? state.Users.map(us => {
                        if (us.id === action.userID) {
                            return {
                                ...us,
                                followed: false
                            }
                        }
                        return us
                    })
                    : null
            }
        }
        case setusers: {
            return {...state, Users: action.users}
        }
        case Set_Current_Page: {
            return {...state, currentPage: action.currentPage}
        }
        case Set_Total_Count_Of_Users: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case IsFetching_Toggle: {
            return {...state, IsFetching: action.IsFetching}
        }
        case IsInProcess_Togle: {
            return {
                ...state,
                InProcess: action.InProgress ?
                    [...state.InProcess, action.UserID]
                    : state.InProcess.filter(id => id !== action.UserID)
            }
        }

        case Portion_Size_Changer: {
            return {...state, PortionSize: action.PortionSizeChangingValue}
        }
        case Set_Founded_Users: {
            return {...state, FoundedUsers: action.NewFoundedUsers}
        }
        case FindUserIsFetching_Toggle: {
            return {...state, FindUserIsFetching: action.FindUserIsFetching}
        }
        case Change_Page_Size: {
            return {...state, pageSize: action.PageSize}
        }
        default :
            return state
    }
}

export const ChangePageSize = (PageSize: number): ChangePageSizeActionType => {

    return {type: Change_Page_Size, PageSize}
}

export const OnFollow = (userID: UserID): OnFollowActionType => {
    return {type: follow, userID: userID}
}

export const onUnFollow = (userID: UserID): onUnFollowActionType => {
    return {type: unfollow, userID: userID}
}

export const setUsers = (users: Array<TUsers>): setUsersActionType => {
    return {type: setusers,  users}
}

export const SetCurrentPage = (currentPage: number): SetCurrentPageActionType => {
    return {type: Set_Current_Page, currentPage: currentPage}
}

export const SetTotalCountOfUsers = (totalCount: number): SetTotalCountOfUsersActionType => {
    return {type: Set_Total_Count_Of_Users, totalUsersCount: totalCount}
}

export const ToggleIsFetching = (IsFetching: boolean): ToggleIsFetchingActionType => {
    return {type: IsFetching_Toggle, IsFetching}
}

export const ToggleFindUserIsFetching = (FindUserIsFetching: boolean): ToggleFindUserIsFetchingActionType => {
    return {type: FindUserIsFetching_Toggle, FindUserIsFetching}
}

export const ToggleInProcess = (InProgress: boolean, UserID: UserID): ToggleInProcessActionType => {
    return {type: IsInProcess_Togle, InProgress, UserID}

}

export const ChangePortionSize = (value: number): ChangePortionSizeActionType => {
    return {type: Portion_Size_Changer, PortionSizeChangingValue: value}
}
export const SetFoundedUsers = (NewFoundedUsers:  Array<TUsers>): SetFoundedUserActionType => {
    return {type: Set_Founded_Users, NewFoundedUsers}
}


export const getUsersThunk = (currentPage: number, pageSize: number): TUsersThunks => async (dispatch) => {
    dispatch(ToggleIsFetching(true))
    const Users = await API.getUsers(currentPage, pageSize)
    dispatch(ToggleIsFetching(false))
    dispatch(setUsers(Users.items))
    dispatch(SetTotalCountOfUsers(Users.totalCount))
}


export const unfollowThunk = (userID: UserID): TUsersThunks => async (dispatch) => {
    dispatch(ToggleInProcess(true, userID))
    const DelSubResult = await API.DelSub(userID)
    if (DelSubResult.resultCode === 0) {
        dispatch(onUnFollow(userID))
    }
    dispatch(ToggleInProcess(false, userID))
}

export const followThunk = (userID: UserID): TUsersThunks => async (dispatch) => {
    dispatch(ToggleInProcess(true, userID))
    const AddSubResult = await API.AddSub(userID)
    if (AddSubResult.resultCode === 0) {
        dispatch(OnFollow(userID))
    }
    dispatch(ToggleInProcess(false, userID))
}

export const FindUserThunk = (UserName: string): TUsersThunks => async (dispatch) => {
    dispatch(ToggleFindUserIsFetching(true))
    const FoundedUsers = await API.FindUser(UserName)
    dispatch(ToggleFindUserIsFetching(false))
    if (!FoundedUsers.error) {
        dispatch(SetFoundedUsers(FoundedUsers.items))
    } else {
        //@ts-ignore
        dispatch(stopSubmit("FindUser", {_error: FoundedUsers.error.messages[0]}))
    }
}

export default UsersReducer
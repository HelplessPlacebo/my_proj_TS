import {TPhotos} from "../Types";
import {
    ChangePageSize,
    ChangePortionSize, FindUserThunk,
    followThunk,
    getUsersThunk,
    SetCurrentPage,
    ToggleInProcess,
    unfollowThunk
} from "../../../data/UsersReduser";
import PurifyUsers from "../../Users/Users";
import React from "react";
import User from "../../Users/User";

export type TfollowThunk = typeof followThunk
export type TunfollowThunk = typeof unfollowThunk
export type TSetCurrentPage = typeof SetCurrentPage
export type TToggleInProcess = typeof ToggleInProcess
export type TgetUsersThunk = typeof getUsersThunk
export type TChangePortionSize = typeof ChangePortionSize
export type TFindUserThunk = typeof FindUserThunk

export type  TUsers = {
    name: string | null
    id: number
    uniqueUrlName: string | null
    photos: TPhotos
    status: string | null
    followed: boolean
}

export type TFoundedUser = {
    items: Array<TUsers>
    totalCount: number
    error: null | { messages: Array<string> }
}
export type UserID =  number
////////////////////////////////////////////////////////////////////////////////////
// UsersContainer component types

export type T_MSTP_UsersContainer= {
    IsLogined : boolean
    Users: Array<TUsers> | null
    pageSize: number
    totalUsersCount: number
    currentPage: number
    IsFetching: boolean
    FindUserIsFetching: boolean
    InProcess: Array<number>
    PortionSize :  number
    FoundedUsers : Array<TUsers>| null
}
export type T_MDTP_UsersContainer= {
    followThunk : TfollowThunk
    unfollowThunk : TunfollowThunk
    SetCurrentPage : TSetCurrentPage
    ToggleInProcess : TToggleInProcess
    getUsersThunk : TgetUsersThunk
    ChangePortionSize : TChangePortionSize
    FindUserThunk : TFindUserThunk
    ChangePageSize : typeof ChangePageSize
}

export type TUsersContainerOwnProps ={

}
////////////////////////////////////////////////////////////////////////////////////
// Users component types
export type TUsersProps = {
    Users : Array<TUsers> | null
    totalUsersCount : number
    pageSize : number
    currentPage : number
    InProcess: Array<number>
    IsLogined : boolean
    PortionSize : number
    FoundedUsers : Array<TUsers>| null
    FindUserIsFetching : boolean


    OnChangedPage : (pagenumber : number) => void
    OnFollow : TfollowThunk
    OnUnFollow : TunfollowThunk
    ToggleInProcess : TToggleInProcess
    ChangePortionSize : TChangePortionSize
    FindUserThunk : TFindUserThunk
    OnPageSizeChange : (pagesize : number) => void
}
////////////////////////////////////////////////////////////////////////////////////
// FindUser component types
export type TFindUserProps = {
    FindUserThunk : TFindUserThunk
    FoundedUsers : Array<TUsers>| null
    InProcess: Array<number>
    OnFollow : TfollowThunk
    OnUnFollow : TunfollowThunk
    IsLogined : boolean
    FindUserIsFetching : boolean
}
////////////////////////////////////////////////////////////////////////////////////
// FindUserModal component types
export type TFindUserModalProps = {
    SubmitModal : () => void
    OnFindUserFieldValueChanging : (el : React.ChangeEvent<HTMLInputElement>) => void
}
////////////////////////////////////////////////////////////////////////////////////
// User component types
export type TUserProps = {
    user: TUsers
    InProcess: Array<number>
    OnUnFollow: TunfollowThunk
    OnFollow: TfollowThunk
    IsLogined: boolean
}
////////////////////////////////////////////////////////////////////////////////////
// ControlledOpenSelect component types
export type TControlledOpenSelectProps = {
    PageSize : number
    OnPageSizeChange : (pagesize : number) => void
}
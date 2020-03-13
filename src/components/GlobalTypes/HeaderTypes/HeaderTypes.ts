/////////////////////////////////////////////////////////////////////////
// Header component Types


import {TProfile} from "../ProfileTypes/ProfileTypes";
import AccountIconComponent from "../../Header/AcountIcon";
import React from "react";
import {strict} from "assert";

export type T_MSTP_HeaderContainer ={
    IsFetching : boolean
    IsLogined: boolean
    login: string | null
    UserProfile: TProfile | null
    OwnID : number | null
    OwnName : string
    NewMessagesCount : number
}


export  type T_MDTP_HeaderContainer ={
    LogOutThunk : () => void
    GetNewMessagesCountThunk : () => void
}


export type THeaderContainerOwnProps ={

}
/////////////////////////////////////////////////////////////////////////////
// AccountIconComponent types

export type TAccountIconComponentProps = {
    LogOutThunk : () => void
    OwnName : string
}
//////////////////////////////////////////////////////////////////////////
// LogOutButton component types
export type TLogOutButtonProps = {
    LogOutThunk : () => void
    handleMenuClose : () => void
}
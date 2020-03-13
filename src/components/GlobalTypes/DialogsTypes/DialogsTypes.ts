import {TPhotos} from "../Types";

export type TDialogs = Array<{
    id: number
    userName: string
    hasNewMessages: boolean
    lastDialogActivityDate: string
    lastUserActivityDate: string | null
    newMessagesCount: number
    photos: TPhotos
}>

//////////////////////////////////////////////////////////////////////////////////////////////

export type T_MSTP_DialogsContainer = {
    AllDialogs: TDialogs | null
    IsFetching: boolean
}

export type T_MDTP_DialogsContainer = {
    GetAllDialogsThunk: () => void
}

export type TDialogsContainerOwnProps = {

}
//////////////////////////////////////////////////////////////////////////////////////////////
export type TDialogsProps = {
    AllDialogs: TDialogs | null
    IsFetching: boolean
}


export type TDialogInfoProps = {
    MessageSendTime : string
    UserID : number | null
    DialogUserName : string | null
    DialogUserAvatar  : TPhotos
    NewMessagesCount : number | null
}
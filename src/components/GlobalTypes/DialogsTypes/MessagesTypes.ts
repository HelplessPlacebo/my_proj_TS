import {
    DeleteMessageThunk,
    GetInterlocutorAvatarThunk, GetNewMessagesCountThunk,
    GetNewMessagesThunk, GetProfileAvatarThunk,
    SendNewMessageThunk
} from "../../../data/DIalogsReduser";
import {Tmath} from "../Types";

type TDeleteMessageThunk = typeof DeleteMessageThunk
export type TDialoguserID = number
type TInterlocutorAvatar = string | null
type TUserAvatar = string | null


export type TDialogMessages = {
    items: Array < {
        id: number
        body: string | null,
        translatedBody: null | string,
        addedAt: string
        senderId: null | number,
        senderName: string,
        recipientId: number,
        viewed: boolean
    }>
    totalCount: null | number,
    error: null | string
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// MessagesContainer component types






export type TMessagesContainerOwnProps = {
    match : Tmath
}

export type T_MDTP_MessagesContainer = {
    GetNewMessagesThunk : typeof GetNewMessagesThunk
    GetInterlocutorAvatarThunk : typeof GetInterlocutorAvatarThunk
    GetProfileAvatarThunk : typeof GetProfileAvatarThunk
    GetNewMessagesCountThunk : typeof GetNewMessagesCountThunk
    DeleteMessageThunk : TDeleteMessageThunk
    SendNewMessageThunk :  typeof SendNewMessageThunk
}

export type T_MSTP_MessagesContainer = {
    DialogsMessages : TDialogMessages | null
    InterlocutorAvatar : TInterlocutorAvatar
    UserAvatar : TUserAvatar
    MyID: number | null
    NewMessagesCount : number
    IsFetching : boolean
}
////////////////////////////////////////////////////////////////////////////////////////////////////
// MessagesWithUser component types
export type TMessagesWithUserProps = {
    InterlocutorAvatar : TInterlocutorAvatar
    UserAvatar : TUserAvatar
    MyID : number | null
    DialogsMessages : TDialogMessages | null
    DeleteMessageThunk : TDeleteMessageThunk
    SendNewMessageThunk :  typeof SendNewMessageThunk

    DialoguserID : TDialoguserID
}

export type TMessageWithUserFormProps ={
    onSubmit : any
    handleSubmit : any
}
////////////////////////////////////////////////////////////////////////////////////////////////////
// DeleteMessages component types
export type TDeleteMessageProps ={
    DialoguserID : TDialoguserID
    MessageID : number
    DeleteMessageThunk : TDeleteMessageThunk
}
////////////////////////////////////////////////////////////////////////////////////////////////////
// DeleteConfirmWindow component types
export type TDeleteConfirmWindowProps = {
    SetToConfirmDeleting : (value : boolean) => void
    ToConfirmDeleting : boolean
    deleteMessage : () => void
}
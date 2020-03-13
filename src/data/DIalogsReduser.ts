import {API} from "../API/requests";
import {TDialogs} from "../components/GlobalTypes/DialogsTypes/DialogsTypes"
import {TDialogMessages, TDialoguserID} from "../components/GlobalTypes/DialogsTypes/MessagesTypes"
import {ThunkAction} from "redux-thunk";
import {GlobalState} from "./redux-store";


const Set_All_Dialogs = 'Dialogs/Set_All_Dialogs'
const Set_New_Messages = 'Dialogs/Set_New_Messages'
const Set_InterlocutorAvatar = 'Dialogs/Set_InterlocutorAvatar'
const Set_UserAvatarForDialogs = 'Dialogs/Set_UserAvatarForDialogs'
const Set_NewMessagesCount = 'Dialogs/Set_NewMessagesCount'
const Set_IsFetching = 'Dialogs/Set_IsFetching'


type SetAllDialogsActionType = {
    type: typeof Set_All_Dialogs,
    NewAllDialogs: TDialogs | null
}
type SetNewMessagesActionType = {
    type: typeof Set_New_Messages,
    NewMessagesData: TDialogMessages | null
}
type SetInterlocutorAvatarActionType = {
    type: typeof Set_InterlocutorAvatar,
    newInterlocutorAvatar: string | null
}
type SetUserAvatarForDialogActionType = {
    type: typeof Set_UserAvatarForDialogs,
    UserAvatar: string | null
}
type SetNewMessagesCountActionType = {
    type: typeof Set_NewMessagesCount,
    NewMessagesCount: number
}
type SetIsFetchingActionType = {
    type: typeof Set_IsFetching,
    IsFetching: boolean
}


let DefaultState = {
    AllDialogs: [] as TDialogs | null,
    DialogsMessages: {} as TDialogMessages | null,
    InterlocutorAvatar: "" as string | null,
    UserAvatar: "" as string | null,
    NewMessagesCount: 0,
    IsFetching: false as boolean
}

export type DefaultDialogsStateType = typeof DefaultState

type TDialogsReducerActions = SetAllDialogsActionType | SetNewMessagesActionType | SetInterlocutorAvatarActionType
    | SetUserAvatarForDialogActionType | SetNewMessagesCountActionType | SetIsFetchingActionType

type TDialogsThunks = ThunkAction<Promise<void>, GlobalState, unknown, TDialogsReducerActions>

const DialogsReducer = (state = DefaultState, action: TDialogsReducerActions): DefaultDialogsStateType => {
    switch (action.type) {

        case Set_All_Dialogs : {
            return {...state, AllDialogs: action.NewAllDialogs}
        }
        case  Set_New_Messages : {
            return {...state, DialogsMessages: action.NewMessagesData}
        }
        case Set_InterlocutorAvatar : {
            return {
                ...state, InterlocutorAvatar: action.newInterlocutorAvatar
            }
        }
        case Set_UserAvatarForDialogs : {
            return {
                ...state, UserAvatar: action.UserAvatar
            }
        }
        case Set_NewMessagesCount : {
            return {
                ...state, NewMessagesCount: action.NewMessagesCount
            }
        }
        case Set_IsFetching : {
            return {
                ...state, IsFetching: action.IsFetching
            }
        }
        default :
            return state

    }
}

export const SetAllDialogs = (NewAllDialogs: TDialogs): SetAllDialogsActionType => {
    return {type: Set_All_Dialogs, NewAllDialogs}
}

export const SetNewMessages = (NewMessagesData: TDialogMessages): SetNewMessagesActionType => {
    return {type: Set_New_Messages, NewMessagesData}
}

export const setInterlocutorAvatar = (newInterlocutorAvatar: string | null): SetInterlocutorAvatarActionType => {
    return {type: Set_InterlocutorAvatar, newInterlocutorAvatar}
}

export const SetNewMessagesCount = (NewMessagesCount: number): SetNewMessagesCountActionType => {
    return {type: Set_NewMessagesCount, NewMessagesCount}
}

export const setUserAvatarForDialogs = (UserAvatar: string | null): SetUserAvatarForDialogActionType => {
    return {type: Set_UserAvatarForDialogs, UserAvatar}
}

export const SetIsFetchingDialogs = (IsFetching: boolean): SetIsFetchingActionType => {
    return {type: Set_IsFetching, IsFetching}
}

export const GetAllDialogsThunk = (): TDialogsThunks => async (dispatch) => {
    dispatch(SetIsFetchingDialogs(true))
    const Dialogs = await API.GetAllDialogs()
    dispatch(SetAllDialogs(Dialogs))
    dispatch(SetIsFetchingDialogs(false))
}

export const GetNewMessagesThunk = (DialoguserID: TDialoguserID): TDialogsThunks => async (dispatch) => {
    dispatch(SetIsFetchingDialogs(true))
    const DialogsMessagesInfo = await API.GetNewMessagesFromServer(DialoguserID)
    dispatch(SetIsFetchingDialogs(false))
    if (!DialogsMessagesInfo.error) {
        dispatch(SetNewMessages(DialogsMessagesInfo))
    }
}

export const SendNewMessageThunk = (DialoguserID: TDialoguserID, NewMessage: string): TDialogsThunks => async (dispatch) => {
    const SendNewMessageResult = await API.SendNewMessage(DialoguserID, NewMessage)
    if (SendNewMessageResult.resultCode === 0) {
        dispatch(GetNewMessagesThunk(DialoguserID))
    }
}

export const GetInterlocutorAvatarThunk = (DialoguserID: TDialoguserID): TDialogsThunks => async (dispatch) => {
    const InterlocutorAvatarData = await API.getProfile(DialoguserID)
    dispatch(setInterlocutorAvatar(InterlocutorAvatarData.photos.small))
}

export const GetProfileAvatarThunk = (UserID: number | null): TDialogsThunks => async (dispatch) => {
    const ProfileData = await API.getProfile(UserID)
    dispatch(setUserAvatarForDialogs(ProfileData.photos.small))
}

export const GetNewMessagesCountThunk = (): TDialogsThunks => async (dispatch) => {
    const NewMessagesCount = await API.GetNewMessagesCount()
    dispatch(SetNewMessagesCount(NewMessagesCount))
}

export const DeleteMessageThunk = (MessageID: number, DialoguserID: TDialoguserID): TDialogsThunks => async (dispatch) => {
    const DeleteMessageResult = await API.DeleteMessage(MessageID)
    if (DeleteMessageResult.resultCode === 0) {
        dispatch(GetNewMessagesThunk(DialoguserID))
    }
}

export default DialogsReducer

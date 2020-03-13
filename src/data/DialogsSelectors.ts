import {GlobalState} from "./redux-store";

export const GetAllDialogsSelector = (state : GlobalState) =>{
    return state.MessagesData.AllDialogs
}

export const GetMessagesDataSelector = (state : GlobalState) =>{
    return state.MessagesData
}

export const GetIsFetchingDialogs = (state : GlobalState) =>{
    return state.MessagesData.IsFetching

}

export const GetDialogsMessagesSelector = (state : GlobalState) =>{
    return state.MessagesData.DialogsMessages
}
export const GetUserAvatarSelector = (state : GlobalState) =>{
    return state.MessagesData.UserAvatar
}
export const GetinterlocutorAvatarSelector = (state : GlobalState) =>{
    return state.MessagesData.InterlocutorAvatar
}


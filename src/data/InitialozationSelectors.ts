import {GlobalState} from "./redux-store";

export const GetinitionSelector = (state : GlobalState) =>{
    return state.Init.inition
}
export const GetNewMessagesCountSelector = (state : GlobalState) =>{
    return state.MessagesData.NewMessagesCount
}

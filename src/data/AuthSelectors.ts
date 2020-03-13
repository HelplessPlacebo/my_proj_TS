import {GlobalState} from "./redux-store";

export const GetUserIDSelector = (state : GlobalState) =>{
    return state.Auth.userId
}
export const GetIsLoginedSelector = (state : GlobalState) => {
    return state.Auth.IsLogined
}
export const GetLoginSelector = (state : GlobalState) => {
    return state.Auth.login
}
export const GetIsFetchingSelector = (state : GlobalState) => {
    return state.Auth.IsFetching
}
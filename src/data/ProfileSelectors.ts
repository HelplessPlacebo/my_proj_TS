import {GlobalState} from "./redux-store";

export const GetProfileSelector = (state : GlobalState) =>{
    return state.ProfileData.profile
}
export const GetStatusSelector = (state : GlobalState) =>{
    return state.ProfileData.status
}
export const GetIsMyPageSelector = (state : GlobalState) =>{
    return state.ProfileData.IsMyPage
}
export const GetPostsSelector = (state : GlobalState) =>{
    return state.ProfileData.Posts
}
export const GetOwnNameSelector = (state : GlobalState) =>{
    return state.ProfileData.OwnName
}
export const GetProfileIsFetching = (state : GlobalState) =>{
    return state.ProfileData.IsFetching
}


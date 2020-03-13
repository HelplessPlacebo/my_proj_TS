import {API} from "../API/requests";
import {stopSubmit} from "redux-form";
import {TPhotos} from "../components/GlobalTypes/Types"
import {NewPostType, TProfile} from "../components/GlobalTypes/ProfileTypes/ProfileTypes"
import {ThunkAction} from "redux-thunk";
import {GlobalState} from "./redux-store";

const add_post = 'Profile/ADD_POST'
const Set_Profile_Of_User = 'Profile/Set_Profile_Of_User'
const Set_Status_Of_User = '/Profile/Set_Status_Of_User'
const Set_Photo_Of_User = '/Profile/Set_Photo_Of_User'
const Set_Is_My_Page = '/Profile/Set_Is_My_Page'
const Set_Own_Name = '/Profile/Set_Own_Name'
const Set_IsFetching = '/Profile/Set_IsFetching'


type addpostActionType = {
    type: typeof add_post
    newtext: string
}

type SetStatusOfUserActionType = {
    type: typeof Set_Status_Of_User
    status: string | null
}
type SetPhotoOfUserActionType = {
    type: typeof Set_Photo_Of_User
    photo: TPhotos

}
type SetIsMyPageActionType = {
    type: typeof Set_Is_My_Page
    bool: boolean

}
type SetOwnNameActionType = {
    type: typeof Set_Own_Name
    MyOwnName: string
}
type SetIsFetchingActionType = {
    type: typeof Set_IsFetching
    IsFetching: boolean
}
type setProfileOfUserActionType = {
    type: typeof Set_Profile_Of_User
    profile: TProfile
}

export type TProfileReducerActions = addpostActionType | SetStatusOfUserActionType | SetPhotoOfUserActionType
    | SetIsMyPageActionType | SetOwnNameActionType | SetIsFetchingActionType
    | setProfileOfUserActionType

type TProfileThunks = ThunkAction<Promise<void>, GlobalState, unknown, TProfileReducerActions>

let DefaultState = {
    Posts: [] as Array<NewPostType>,
    profile: null as TProfile | null,
    status: "" as string | null,
    IsMyPage: false,
    OwnName: "" as string,
    IsFetching: false
}
type DefaultProfileState = typeof DefaultState


const ProfileReducer = (state = DefaultState, action: TProfileReducerActions): DefaultProfileState => {
    switch (action.type) {
        case add_post: {
            let NewPost = {
                id: 6,
                Post: action.newtext,
                likesCount: 0
            };
            return {
                ...state,
                Posts: [...state.Posts, NewPost],
            }
        }
        case Set_Profile_Of_User: {
            return {...state, profile: action.profile}
        }

        case Set_Status_Of_User: {
            return {...state, status: action.status}
        }
        case Set_Photo_Of_User: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photo} as TProfile
            }
        }
        case Set_Is_My_Page: {
            return {...state, IsMyPage: action.bool}
        }
        case Set_Own_Name: {
            return {...state, OwnName: action.MyOwnName}
        }
        case Set_IsFetching: {
            return {...state, IsFetching: action.IsFetching}
        }

        default :
            return state
    }
}

export const addpost = (text: string): addpostActionType => {
    return {type: add_post, newtext: text}
}

export const setProfileOfUser = (profile: TProfile): setProfileOfUserActionType => {
    return {type: Set_Profile_Of_User, profile}
}

export const SetStatusOfUser = (status: string | null): SetStatusOfUserActionType => {
    return {type: Set_Status_Of_User, status}
}

export const SetPhotoOfUser = (photo: any): SetPhotoOfUserActionType => {
    return {type: Set_Photo_Of_User, photo}
}

export const SetIsMyPage = (bool: boolean): SetIsMyPageActionType => {
    return {type: Set_Is_My_Page, bool}
}
export const SetOwnName = (MyOwnName: string): SetOwnNameActionType => {
    return {type: Set_Own_Name, MyOwnName}
}
export const SetIsFetching = (IsFetching: boolean): SetIsFetchingActionType => {
    return {type: Set_IsFetching, IsFetching}
}


export const GetProfileThunk = (ProfileID: number | null): TProfileThunks => async (dispatch, getState) => {
    const MyID = getState().Auth.userId
    dispatch(SetIsFetching(true))
    const Profile = await API.getProfile(ProfileID)
    dispatch(setProfileOfUser(Profile))
    if (Profile.userId === MyID) {
        dispatch(SetOwnName(Profile.fullName))
    }
    dispatch(SetIsFetching(false))
}


export const GetProfileStatusThunk = (userID: number | null): TProfileThunks => async (dispatch) => {
    dispatch(SetIsFetching(true))
    const ProfileStatus = await API.getProfileStatus(userID)
    dispatch(SetStatusOfUser(ProfileStatus))
    dispatch(SetIsFetching(false))
}

export const SetProfileStatusThunk = (status: string | null): TProfileThunks => async (dispatch) => {
    const SetProfileStatusResult = await API.setProfileStatus(status)
    if (SetProfileStatusResult.resultCode === 0) {
        dispatch(SetStatusOfUser(status))
    }
}

export const SetProfilePhotoThunk = (photo: File): TProfileThunks => async (dispatch) => {
    dispatch(SetIsFetching(true))
    const LoadPhotoOnServerResult = await API.LoadPhotoOnServer(photo)
    if (LoadPhotoOnServerResult.resultCode === 0) {
        dispatch(SetPhotoOfUser(LoadPhotoOnServerResult.data.photos))
    }
    dispatch(SetIsFetching(false))
}

export const UpdateProfileInfoThunk = (profile: TProfile): TProfileThunks => async (dispatch, getState) => {
    const profileID = getState().Auth.userId
    dispatch(SetIsFetching(true))
    const PutProfileDataOnServerResult = await API.PutProfileDataOnServer(profile)
    if (PutProfileDataOnServerResult.resultCode === 0) {
        dispatch(GetProfileThunk(profileID))
    } else {
        //@ts-ignore
        dispatch(stopSubmit("ProfileDataEditorForm", {_error: PutProfileDataOnServerResult.messages[0]}))
        return Promise.reject(PutProfileDataOnServerResult.messages[0])
    }
    dispatch(SetIsFetching(false))
}


export default ProfileReducer
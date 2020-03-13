import {Tmath, TPhotos} from "../Types";
import {
    addpost,
    GetProfileStatusThunk,
    GetProfileThunk, SetIsMyPage,
    SetProfilePhotoThunk,
    SetProfileStatusThunk, UpdateProfileInfoThunk
} from "../../../data/ProfileReduser";
import {SendNewMessageThunk} from "../../../data/DIalogsReduser";
import {FormEvent} from "react";


type TGetProfileThunk = typeof GetProfileThunk
type TGetProfileStatusThunk = typeof GetProfileStatusThunk
type TSetProfileStatusThunk = typeof SetProfileStatusThunk
type TSetProfilePhotoThunk = typeof SetProfilePhotoThunk
type TUpdateProfileInfoThunk = typeof UpdateProfileInfoThunk
type TSendNewMessageThunk = typeof SendNewMessageThunk

export type TContacts = {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}
export type NewPostType = {
    id: number
    Post: string
    likesCount: number
}

export type TProfile = {
    userId: number | null
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    fullName: string
    contacts: TContacts
    aboutMe: string | null
    photos: TPhotos
}

////////////////////////////////////////////////////////////////////////////////
// ProfileContainer component types

export type T_MSTP_ProfileContainer = {
    profile: TProfile | null
    status: string | null
    IsMyPage: boolean
    userID: number | null
    IsFetching: boolean
    IsLogined: boolean
}

export type T_MDTP_ProfileContainer = {
    GetProfileThunk: TGetProfileThunk
    GetProfileStatusThunk: TGetProfileStatusThunk
    SetProfileStatusThunk: TSetProfileStatusThunk
    SetProfilePhotoThunk: TSetProfilePhotoThunk
    SetIsMyPage: typeof SetIsMyPage
    UpdateProfileInfoThunk: TUpdateProfileInfoThunk
    SendNewMessageThunk: TSendNewMessageThunk
}

export type TProfileContainerOwnProps = {
    match: Tmath
    history: {
        length: number
        action: string
    }
}
/////////////////////////////////////////////////////////////////////
// Profile component types
export type TProfileProps = {
    profile: TProfile | null
    status: string | null
    IsMyPage: boolean
    IsFetching: boolean
    IsLogined: boolean
    SetProfileStatus: TSetProfileStatusThunk
    SetProfilePhoto: TSetProfilePhotoThunk
    SaveProfileData: TUpdateProfileInfoThunk
    SendNewMessageThunk: TSendNewMessageThunk
}
/////////////////////////////////////////////////////////////////////////////////////
// UserInfo component types
export type TUserInfoProps = {
    profile: TProfile | null
    status: string | null
    SetProfileStatus: TSetProfileStatusThunk
    IsMyPage: boolean
    SetProfilePhoto: TSetProfilePhotoThunk
    SaveProfileData: TUpdateProfileInfoThunk
    SendNewMessageThunk: TSendNewMessageThunk
    IsLogined: boolean
}
/////////////////////////////////////////////////////////////////////////////////////////
// ProfileAvatar component types
export type TProfileAvatarProps = {
    IsMyPage: boolean
    photos: TPhotos
    SetProfilePhoto: TSetProfilePhotoThunk
}

//////////////////////////////////////////////////////////////////////////////////////////
// ProfileStatusF component types

export type TProfileStatusFProps = {
    status: string | null
    IsMyPage: boolean
    SetProfileStatus: TSetProfileStatusThunk
}
//////////////////////////////////////////////////////////////////////////////////////////
// SendMessageOnUserPage component types
export type TSendMessageOnUserPageProps = {
    UserName: string
    IsMyPage: boolean
    UserID: number | null
    SendNewMessageThunk: TSendNewMessageThunk
}
////////////////////////////////////////////////////////////////////////////////////////////
// ProfileData component types
export type TProfileDataProps = {
    profile: TProfile
    IsMyPage: boolean
    ContactsEditingOn: () => void
}
/////////////////////////////////////////////////////////////////////////////////////////////
// Contact component types
export type TContactProps = {
    ContactName : string
    ContactValue : string
}
/////////////////////////////////////////////////////////////////////////////////////////////
// ProfileDataEditorForm component types
export type TProfileDataEditorFormProps = {
    ContactsEditingOFF : () => void
    handleSubmit : (event : FormEvent<HTMLFormElement>) => void
    contacts : TContacts
    initialValues : TProfile
    error : string
}

////////////////////////////////////////////////////////////////////////////////////////////
// MyPostsContainer component types
export type TMyPostsContainerOwnProps = {
    profile : TProfile | null
}

export type T_MSTP_MyPostsContainer = {
    posts : Array<NewPostType>
    IsMyPage : boolean
}

export type T_MDTP_MyPostsContainer = {
    addpost : typeof addpost
}
//////////////////////////////////////////////////////////////////////////////////////////////
// MyPost component type
export type TMyPostContainerProps = T_MSTP_MyPostsContainer & T_MDTP_MyPostsContainer & TMyPostsContainerOwnProps
/////////////////////////////////////////////////////////////////////////////////////////////
// Post component Type
export type TPostProps = {
    message : string
    likecount : number
    profile : TProfile | null
}
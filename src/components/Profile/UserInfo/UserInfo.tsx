import React, {useState} from "react"
import pc from './UserInfo.module.css'
import Preloader from "../../assetss/common/Loader/Loader";
import ProfileStatusF from "./ProfileStatusF";
import ProfileData from "./ProfileData"
import ProfileAvatar from "./ProfileAvatar";
import ProfileDataEditorForm from "./ProfileDataEditorForm";
import {reduxForm} from "redux-form";
import SendMessageOnUserPage from "./SendMessageOnUserPage";
import {TProfile, TUserInfoProps} from "../../GlobalTypes/ProfileTypes/ProfileTypes";


const UserInfo : React.FC<TUserInfoProps> = (props) => {

    let [ContactsIsEditing, SetContactsIsEditing] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }


    const ContactsEditingOn = () => {
        SetContactsIsEditing(true)
    }

    const ContactsEditingOFF = () => {
        SetContactsIsEditing(false)
    }

    const PutNewProfileInfoToServer = async (formData : TProfile) => {
      await props.SaveProfileData(formData)
          SetContactsIsEditing(false)
    }

    return <div className={pc.userdescrition}>
        <div className={pc.ProfileName}>
            {props.profile.fullName && props.profile.fullName }
        </div>

        <ProfileAvatar IsMyPage={props.IsMyPage}
                       photos={props.profile.photos}
                       SetProfilePhoto={props.SetProfilePhoto}/>


        <ProfileStatusF status={props.status}
                        SetProfileStatus={props.SetProfileStatus}
                        IsMyPage={props.IsMyPage}/>

        {props.IsLogined &&
            <SendMessageOnUserPage UserName={props.profile.fullName}
                                   IsMyPage={props.IsMyPage}
                                   UserID={props.profile.userId}
                                   SendNewMessageThunk={props.SendNewMessageThunk}
            />
        }


        {
            ContactsIsEditing ?
            <div>
                <ProfileDataEditorFormRedux initialValues={props.profile}
                                            contacts={props.profile.contacts}
                                            //@ts-ignore
                                            onSubmit={PutNewProfileInfoToServer}
                       ContactsEditingOFF={ContactsEditingOFF}/>
            </div>
            : <div>
                <ProfileData profile={props.profile}
                             IsMyPage={props.IsMyPage}
                             ContactsEditingOn={ContactsEditingOn}/>
            </div>
        }
    </div>
}
//@ts-ignore
const ProfileDataEditorFormRedux = reduxForm({form: 'ProfileDataEditorForm'})(ProfileDataEditorForm)
export default UserInfo;
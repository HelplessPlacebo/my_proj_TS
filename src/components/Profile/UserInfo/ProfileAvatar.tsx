
import UserPhoto from "../../assetss/images/userPhoto.jpg";
import React, {ChangeEvent} from "react"
import pc from './UserInfo.module.css'
import Done from '@material-ui/icons/AddAPhoto';
import {TProfileAvatarProps} from "../../GlobalTypes/ProfileTypes/ProfileTypes";

const ProfileAvatar : React.FC<TProfileAvatarProps> = (props) => {


    const OnPhotoSelected = (event : ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length) {
            props.SetProfilePhoto(event.target.files[0])
        }
    }
    return <div>

        <div>
            {props.IsMyPage &&
            <div className={pc.AddPhotoButtonPosition}>
                <input className={pc.SelectPhoto} type={"file"}
                       onChange={OnPhotoSelected}
                       accept="image/*"
                       id={"file"}/>

                <label htmlFor="file">
                    <Done   color="primary"  />
                </label>
            </div>
            }
        </div>

        <div>
            <img id={"avatar"} className={pc.UserPhoto}
                 src={props.photos.large ? props.photos.large  :UserPhoto }/>
        </div>

    </div>
}
export default ProfileAvatar
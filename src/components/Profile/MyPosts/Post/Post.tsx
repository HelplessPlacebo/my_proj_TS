import React from 'react';
import pc from './Post.module.css'
import UserPhoto from "../../../assetss/images/userPhoto.jpg";
import {TPostProps} from "../../../GlobalTypes/ProfileTypes/ProfileTypes";

const Post : React.FC<TPostProps> = (props) => {
    return (
        <div className={pc.item}>
            {
                props.profile &&
                <img className={pc.img} src={props.profile.photos.large ? props.profile.photos.large :  UserPhoto}/>
            }
            {props.message}
            <div>
                {props.likecount} <span>
                    <img className={pc.like} src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Ei-like.svg/1024px-Ei-like.svg.png'/>
                </span>
            </div>
        </div>

    );
}
export default Post;
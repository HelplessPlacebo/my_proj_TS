import React from 'react'
import um from "./Users.module.css";
import UserPhoto from "../assetss/images/userPhoto.jpg";
import {NavLink} from "react-router-dom";
import pc from "../Profile/UserInfo/UserInfo.module.css";
import {TUserProps} from "../GlobalTypes/UsersTypes/UsersTypes";


let User : React.FC<TUserProps> = (props) => {

    return <div className={um.Main}>
        <div>

            <NavLink to={'/Profile/' + props.user.id}>
                <img  className={um.img} src={props.user.photos.small ? props.user.photos.small : UserPhoto}/>
            </NavLink>
            <div  className={pc.UserName}>
                {props.user.name}
            </div>
            { props.IsLogined &&
            <div>

                { props.user.followed
                        ? <button disabled={props.InProcess.some(id =>  id === props.user.id)}
                                  onClick={() => {
                                      props.OnUnFollow(props.user.id)
                                  }} className={um.unfollow}>
                            unfollow
                        </button>


                        : <button disabled={props.InProcess.some(id => id === props.user.id)}
                                  onClick={() => {
                                      props.OnFollow(props.user.id)
                                  }} className={um.follow}>
                            follow
                        </button>
                }
            </div>
            }
        </div>
    </div>
}
export default User
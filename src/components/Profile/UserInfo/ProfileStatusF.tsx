import React, {useState, useEffect} from "react"
import {TProfileStatusFProps} from "../../GlobalTypes/ProfileTypes/ProfileTypes";

const ProfileStatusF : React.FC<TProfileStatusFProps> = (props) => {


    let [IsStatusChanging, SetIsStatusChanging] = useState(false)
    let [Status, SetStatus] = useState<string | null>(props.status)

    useEffect(() => {
            SetStatus(props.status)
        }, [props.status]
    )

    const StatusChangingON = () => {
        SetIsStatusChanging(true)
    }

    const StatusChangingOFF = () => {
        SetIsStatusChanging(false)
        if(Status !== props.status){
            props.SetProfileStatus(Status)
        }
    }

    const OnStatusChange = (e: React.FormEvent<HTMLInputElement>) => {
        SetStatus(e.currentTarget.value)
    }

    return (<div>
            {props.IsMyPage ?
                <div>
                    {!IsStatusChanging ?
                        <div>
                <span onClick={StatusChangingON}>
                Status  : {Status || "the status is empty"}
                </span>
                        </div>
                        :
                        <div>
                            <input  onChange={OnStatusChange} onBlur={StatusChangingOFF} autoFocus={true}
                                   value={Status ? Status : ""}/>
                        </div>

                    }
                </div>
                : Status || "the status is empty"
            }
        </div>
    )
}


export default ProfileStatusF
import React from "react"
import Contact from "./Contact";
import pds from "./ProfileData.module.css"
import {TProfileDataProps} from "../../GlobalTypes/ProfileTypes/ProfileTypes";

const ProfileData : React.FC<TProfileDataProps> = (props) => {


const ProfileContacts  =  Object.keys(props.profile.contacts)
    //@ts-ignore
const ProfileContactsValues = ProfileContacts.map(el => props.profile.contacts[el])

const ValueNotNull = (values : any) =>{
        return values !== null
    }

    return <div className={pds.aboutME}>
        {
            props.profile.aboutMe && <div>
            {props.profile.aboutMe}
        </div>
        }

        {
            props.profile.lookingForAJob ?
            <div>
                Im looking for a job
            </div>
            :
            <div>
                Im have a job
            </div>
        }
        {props.profile.lookingForAJobDescription &&
        <div>
            {props.profile.lookingForAJobDescription}
        </div>
        }
        <div className={pds.contacts}>
            <div>
                {props.IsMyPage && <button className={pds.buttonEditInformation}
                                           onClick={props.ContactsEditingOn}>
                    edit information
                </button>}
            </div>
            {
                ProfileContactsValues.some(ValueNotNull) && "My contacts :"
            }

            {ProfileContacts.map(key => {
                return <Contact key={key} ContactName={key}
                                //@ts-ignore
                                ContactValue={props.profile.contacts[key]}/>
            })}
        </div>
    </div>
}

export default ProfileData
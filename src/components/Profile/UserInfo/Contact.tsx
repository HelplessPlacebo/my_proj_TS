import React from "react"
import cs from "./Contact.module.css"
import {TContactProps} from "../../GlobalTypes/ProfileTypes/ProfileTypes";

const Contact : React.FC<TContactProps> = (props) =>{


    return <span>
        {props.ContactValue &&
        <div className={cs.contact} >
        {props.ContactName} : {props.ContactValue}
        </div>
        }
    </span>
}


export default Contact
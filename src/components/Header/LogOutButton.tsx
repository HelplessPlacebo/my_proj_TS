import React from 'react';
import HS from "./Header.module.css"
import {TLogOutButtonProps} from "../GlobalTypes/HeaderTypes/HeaderTypes";



const LogOutButton : React.FC<TLogOutButtonProps> =(props) =>{
    const LogOut = ()=>{
        props.LogOutThunk()
        props.handleMenuClose()
    }

return <div>
    <div className={HS.LogOutStyle} onClick={LogOut}>
        Logout
    </div>
</div>
}

export default LogOutButton
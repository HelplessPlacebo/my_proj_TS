import React from 'react'
import DialogInfo from "./DialogInfo";
import Preloader from "../assetss/common/Loader/Loader";
import {TDialogsProps} from "../GlobalTypes/DialogsTypes/DialogsTypes";


const Dialogs : React.FC<TDialogsProps> = (props) => {

    return (<div>
            <>
                {props.IsFetching ? <Preloader/> :
                    props.AllDialogs &&
                    props.AllDialogs.map(el => {
                        return <DialogInfo key={el.id} DialogUserName={el.userName}
                                           DialogUserAvatar={el.photos}
                                           NewMessagesCount={el.newMessagesCount}
                                           MessageSendTime={el.lastDialogActivityDate}
                                           UserID={el.id}
                        />
                    })
                }`
            </>
        </div>
    )
}

export default Dialogs
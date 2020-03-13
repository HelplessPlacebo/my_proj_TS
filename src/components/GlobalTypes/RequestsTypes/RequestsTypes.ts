import {TPhotos} from "../Types";
import {TTask, TToDoList} from "../ToDoListsTypes/ToDoListsTypes";



export type TAuthMeRes = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: Array<string>
}

export type TDefRes = {
    resultCode : number
    messages: Array<string>
    data : any
}

export type TLoginRes = {
    data: {
        id: number
    }
    resultCode: number
    messages: Array<string>
}

export type TLoadPhotoOnServerRes = {
    data : {
      photos : TPhotos
    }
    resultCode : number
    messages: Array<string>
}

export type TGetCaptchaFromServerRes = {
    url : string
}

export type TCreateNewToDoListRes = {
    item : TToDoList
    messages : Array<string>
    resultCode : number
}

export type TSendNewMessageRes = {
    message : {
        id : string
        body : string
        translatedBody : string | null
        addedAt : string
        senderId : number
        senderName : string
        recipientId : number
        recipientName : string
        viewed : boolean
        deletedBySender : boolean
        deletedByRecipient : boolean
        isSpam : boolean
        distributionId : number | null
    }
    messages : Array <string>
    resultCode : 0
}

export type TCreateNewTaskForToDoListRes = {
    item : TTask
    messages : Array<string>
    resultCode : number
}


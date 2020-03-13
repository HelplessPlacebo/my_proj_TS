import axios from "axios";
import {TProfile} from "../components/GlobalTypes/ProfileTypes/ProfileTypes";
import {
    TAuthMeRes, TCreateNewTaskForToDoListRes, TCreateNewToDoListRes,
    TDefRes, TGetCaptchaFromServerRes,
    TLoadPhotoOnServerRes,
    TLoginRes, TSendNewMessageRes,
} from "../components/GlobalTypes/RequestsTypes/RequestsTypes";
import {TFoundedUser} from "../components/GlobalTypes/UsersTypes/UsersTypes";
import {TDialogMessages} from "../components/GlobalTypes/DialogsTypes/MessagesTypes";
import {
    ToDoListTaskStatusType,
    TToDoList,
    TToDoListTasks
} from "../components/GlobalTypes/ToDoListsTypes/ToDoListsTypes";
import {TDialogs} from "../components/GlobalTypes/DialogsTypes/DialogsTypes";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "96428d9a-0d9d-4cb1-8a30-3ebf6693ac4b"
    }
})

const instanceToDoLists = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        "API-KEY": "96428d9a-0d9d-4cb1-8a30-3ebf6693ac4b"
    }
})
/*
const MyServerInstance = axios.create({
    baseURL: 'http://localhost:5000/'
})
*/

export const API = {

    async getUsers(currentPage = 1, pageSize = 10) {
        const response = await instance.get<TFoundedUser>(`users?page=${currentPage}&count=${pageSize}`)
        return response.data
    },

    async AuthMe() {
        const response = await instance.get<TAuthMeRes>(`auth/me`)
        return response.data
    },

    async getProfile(ProfileID : number  | null) {
        const response = await instance.get<TProfile>(`profile/` + ProfileID)
        return response.data
    },

    async DelSub(userId : number) {
        const response = await instance.delete<TDefRes>(`follow/${userId}`)
        return response.data
    },

    async AddSub(userId : number ) {
        const response = await instance.post<TDefRes>(`follow/${userId}`)
        return response.data
    },

    async getProfileStatus(ProfileID : number | null ) {
        const response = await instance.get<string>(`profile/status/` + ProfileID)
        return response.data
    },

    async setProfileStatus(status : string | null) {
        const response = await instance.put<TDefRes>(`profile/status/`, {status: status})
        return response.data
    },

    async Login(email : string | null, password : string | null, rememberMe : boolean | null, captcha : string | null | undefined) {
        const response = await instance.post<TLoginRes>(`auth/login/`, {
            email: email,
            password: password,
            rememberMe: rememberMe,
            captcha: captcha
        })
        return response.data
    },

    async LogOut() {
        const response = await instance.delete<TDefRes>(`auth/login`)
        return response.data

    },

    async LoadPhotoOnServer(photo : File) {
        const formdata = new FormData()
        formdata.append("image", photo)
        const response = await instance.put<TLoadPhotoOnServerRes>('profile/photo', formdata, {
            //@ts-ignore
            'Content-Type': 'multipart/form-data'
        })
        return response.data
    },
    async PutProfileDataOnServer(profile : TProfile) {
        const response = await instance.put<TDefRes>('profile', profile)
        return response.data
    },
    async GetCaptchaFromServer() {
        const response = await instance.get<TGetCaptchaFromServerRes>('security/get-captcha-url')
        return response.data.url
    },
    async GetAllDialogs() {
        const response = await instance.get<TDialogs>('dialogs')
        return response.data
    },
    async GetNewMessagesFromServer(DialoguserID : number ) {
        const response = await instance.get<TDialogMessages>(`dialogs/${DialoguserID}/messages`)
        return response.data
    },
    async SendNewMessage(userId : number, NewMessage : string) {
        const response = await instance.post<TSendNewMessageRes>(`dialogs/${userId}/messages`, {
            body: NewMessage
        })
        return response.data
    },
    async GetNewMessagesCount() {
        const response = await instance.get<number>('dialogs/messages/new/count')
        return response.data
    },
    async DeleteMessage(MessageID :number) {
        const response = await instance.delete<TDefRes>(`dialogs//messages/${MessageID}`)
        return response.data
    },
    async FindUser(UserName : string) {
        const response = await instance.get<TFoundedUser>(`users?term=${UserName}`)
        return response.data
    },
    async GetToDoLists() {
        const response = await instance.get<Array<TToDoList>>('todo-lists')
        return response.data
    },
    async CreateNewToDoList(title : string) {
        const response = await instance.post<TCreateNewToDoListRes>('todo-lists', {title: title})
        return response.data
    },
    async DeleteToDoList(todolistId : string) {
       const res = await instance.delete<TDefRes>(`todo-lists/${todolistId}`)
        return res.data
    },
    async ChangeToDoListTitle(todolistId :string, title : string) {
       const res =  await instance.put<TDefRes>(`todo-lists/${todolistId}`, {
            title: title
        })
        return res.data
    },
    async GetToDoListTasks(todolistId : string, count = 10, page = 1) {
        const response = await instance.get<TToDoListTasks>(`todo-lists/${todolistId}/tasks?count=${count}&page=${page}`)
        return response.data
    },

    async CreateNewTaskForToDoList(todolistId : string, Tasktitle : string) {
        const DataResponse = await instance.post<TCreateNewTaskForToDoListRes>(`todo-lists/${todolistId}/tasks`, {
            title: Tasktitle
        })
        return DataResponse.data
    },

    async ChangeTaskInformation(todolistId : string, taskid : string, status : ToDoListTaskStatusType) {

        const DataResponse = await instanceToDoLists.put<TCreateNewTaskForToDoListRes>(`todo-lists/${todolistId}/tasks/${taskid}`, status)
        return DataResponse.data
    },
    async DeleteTaskFromToDoList(todolistId : string, taskid : string) {
        const DataResponse = await instanceToDoLists.delete<TDefRes>(`todo-lists/${todolistId}/tasks/${taskid}`)
        return DataResponse.data
    },
/*    async MyServerReq(){
        const Res = await MyServerInstance.get('server')
        return Res
    },
    async MyServerPost(body){
        const Res = await MyServerInstance.post('friends/add',body)
        return Res
    }*/
}

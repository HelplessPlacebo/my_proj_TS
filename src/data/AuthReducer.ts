import {API} from "../API/requests";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {GlobalState} from "./redux-store";


const SET_USER_DATA = 'Auth/SET_USER_DATA'
const IsFetching_Toggle = 'Auth/IsFetching_Toggle'
const Set_Captcha_Url = 'Auth/Set_Captcha_Url'

export type SetAuthUserActionType = {
    type: typeof SET_USER_DATA,
    data: {
        userId: number | null
        email: string | null
        login: string | null
        IsLogined: boolean
    }
}

export type ToggleIsFetchingActionType = {
    type: typeof IsFetching_Toggle,
    IsFetching: boolean
}


export type SetCaptchaUrlActionType = {
    type: typeof Set_Captcha_Url,
    CaptchaURL: string
}

type TAuthReducerActions = SetCaptchaUrlActionType | ToggleIsFetchingActionType | SetAuthUserActionType
type TAuthThunks = ThunkAction<Promise<void>, GlobalState, unknown, TAuthReducerActions>


let DefaultState = {
    IsLogined: false,
    IsFetching: false,
    CaptchaUrl: null as string | null,
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null

}

type DefaultAuthState = typeof DefaultState


const AuthReducer = (state: DefaultAuthState = DefaultState, action: TAuthReducerActions): DefaultAuthState => {
    switch (action.type) {
        case SET_USER_DATA : {
            return {
                ...state,
                ...action.data
            }
        }
        case IsFetching_Toggle: {
            return {...state, IsFetching: action.IsFetching}
        }
        case Set_Captcha_Url: {
            return {...state, CaptchaUrl: action.CaptchaURL}
        }
        default :
            return state
    }
}

export const SetAuthUser = (userId: number | null, email: string | null, login: string | null, IsLogined: boolean): SetAuthUserActionType =>
    ({type: SET_USER_DATA, data: {userId, email, login, IsLogined}})

export const ToggleIsFetching = (IsFetching: boolean): ToggleIsFetchingActionType => {
    return {type: IsFetching_Toggle, IsFetching}
}
export const SetCaptchaUrl = (CaptchaURL: string): SetCaptchaUrlActionType => {
    return {type: Set_Captcha_Url, CaptchaURL}
}


export const AuthMeThunk = (): TAuthThunks =>
    async (dispatch) => {
        ToggleIsFetching(true)
        const AuthInfo = await API.AuthMe() //возвращает данные авторизованного юзера
        dispatch(ToggleIsFetching(false))
        if (AuthInfo.resultCode === 0) {
            let {id, login, email} = AuthInfo.data
            dispatch(SetAuthUser(id, email, login, true))
        }
    }


export const LoginThunk = (email: string, password: string, rememberMe: boolean, captcha?: string | null): TAuthThunks =>
    async (dispatch) => {
        const LoginInfo = await API.Login(email, password, rememberMe, captcha)
        if (LoginInfo.resultCode === 0) {
            dispatch(AuthMeThunk())
        } else {
            if (LoginInfo.resultCode === 10) {
                dispatch(GetCaptchaThunk())
            }
            //@ts-ignore
            dispatch(stopSubmit("login", {_error: LoginInfo.messages[0]}))
        }
    }

export const LogOutThunk = (): TAuthThunks => async (dispatch) => {
    const LogOutInfo = await API.LogOut()
    if (LogOutInfo.resultCode === 0) {
        dispatch(SetAuthUser(null, null, null, false))
    }
}

export const GetCaptchaThunk = (): TAuthThunks => async (dispatch) => {
    const captchaURL = await API.GetCaptchaFromServer()
    dispatch(SetCaptchaUrl(captchaURL))
}

export default AuthReducer
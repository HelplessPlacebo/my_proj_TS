////////////////////////////////////////////////////////////////////////////
// Login component types


export type T_MSTP_Login = {
    CaptchaUrl : string | null
    IsLogined : boolean
}

export type T_MDTP_Login = {
    LoginThunk : (email : string, password : string, rememberMe : boolean, captcha? : string) => void
}

export type LoginOwnProps = {

}
//////////////////////////////////////////////////////////////////////////////
// LoginForm component types
export type TLoginFormProps = {
    onSubmit : (FormData : any) => void
}

export type TLoginFormData = {
    email : string
    password : string
    rememberMe  : boolean
    captcha ? : string
}

export type TReduxLoginFormProps = {
    onSubmit : (FromData : TLoginFormData) => void
    CaptchaUrl : string | null
}


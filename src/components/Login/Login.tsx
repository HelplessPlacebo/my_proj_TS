import React from 'react';
import {DecoratedComponentClass, reduxForm} from "redux-form";
import {compose} from "redux";
import {connect} from "react-redux";
import {LoginThunk} from "../../data/AuthReducer"
import {required, MaxLengthCreator} from "../utils/validators"
import {CreateField, Input, InputName} from "../assetss/common/ValidatorsComponents/ElementsValidators"
import lm from "../Login/login.module.css"
import LoginUserPhoto from "../assetss/images/userLog.jpg"
import {Redirect} from "react-router";
import {
    LoginOwnProps,
    T_MDTP_Login,
    T_MSTP_Login,
    TLoginFormData,
    TReduxLoginFormProps
} from "../GlobalTypes/AuthTypes/LoginTypes";
import {GlobalState} from "../../data/redux-store";

const maxLength50 = MaxLengthCreator(50)

type TLoginProps = T_MSTP_Login & T_MDTP_Login & LoginOwnProps

const MapStateToProps = (state : GlobalState) : T_MSTP_Login => ({
    IsLogined: state.Auth.IsLogined,
    CaptchaUrl: state.Auth.CaptchaUrl
})

const LoginForm : React.FC<any>= (props) => {

    return (

        <div className={lm.login}>
            <form onSubmit={props.handleSubmit}>

                <div>
                    <img src={LoginUserPhoto} className={lm.imgUser}/>
                    {CreateField("Enter the email", "email", [required, maxLength50], Input)}
                </div>

                <div>
                    {CreateField("Enter the password", "password", [required, maxLength50],
                        Input, {type: "password"})}
                </div>

                <div className={lm.rememberMe}>
                    {CreateField("", "rememberMe", [], "input", {type: "checkbox"},
                        "remember me")}
                </div>

                {props.CaptchaUrl &&
                <div>
                    <img src={props.CaptchaUrl}/>
                    {CreateField("Enter captcha symbols", "captcha", [required],
                        InputName)}
                </div>
                }
                {props.error
                    ?
                    <div className={lm.AuthError}>
                        {props.error}
                    </div>
                    : null}
                <div>
                    <button className={lm.button}> Enter</button>
                </div>
            </form>
        </div>)
}

// return later
const ReduxLoginForm : DecoratedComponentClass<TLoginFormData, any, any> = reduxForm({form: 'login'})(LoginForm)

let Login : React.FC<TLoginProps>= (props) => {

    const PostUserDataToServer = (formData : TLoginFormData) => {
        debugger
        props.LoginThunk(formData.email, formData.password, formData.rememberMe)
    }

    if (props.IsLogined) {
        return <Redirect to={"/Profile"}/>
    }
    return (<div>

        <ReduxLoginForm onSubmit={PostUserDataToServer}
                        CaptchaUrl={props.CaptchaUrl}/>
    </div>)
}

export default compose(
    connect<T_MSTP_Login, T_MDTP_Login, LoginOwnProps, GlobalState>(MapStateToProps, {LoginThunk}),
)(Login)
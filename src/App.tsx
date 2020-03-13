import React, {Component} from 'react';
import './App.css';
import HeaderContainer from "./components/Header/HeaderContainer";
import {Redirect, Route, withRouter} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {compose} from "redux";
import {connect} from "react-redux";
import {InitializationAPPthunk} from "./data/InitializatonReducer";
import Preloader from "./components/assetss/common/Loader/Loader";
import MessagesContainer from "./components/Dialogs/Message/MessagesContainer";
import {GetinitionSelector} from "./data/InitialozationSelectors";
import {GetNewMessagesCountThunk} from "./data/DIalogsReduser";
import LoginPage from "./components/Login/LoginPage";
import ToDoListsContainer from "./components/ToDoLists/ToDoListsContainer";
import {GetIsLoginedSelector} from "./data/AuthSelectors";
import {GlobalState} from "./data/redux-store";
import {T_MDTP_App, T_MSTP_App, TAppOwnProps} from "./components/GlobalTypes/AppTypes/AppTypes";

type TAppProps = T_MSTP_App & T_MDTP_App & TAppOwnProps

class App extends Component<TAppProps> {
    componentDidMount() {
        this.props.InitializationAPPthunk()
    }

    render() {

        if (!this.props.inition) {
            return <Preloader/>
        }
        return (

            <div className='wrapper'>
                    <HeaderContainer  />


                <div className="app-wrapper-content">

                    <Route exact path='/'
                           render={() => <Redirect to={"Profile/"}/>}/>

                    <Route path='/dialogs/'
                           //@ts-ignore
                           render={() => <DialogsContainer/>}/>
                    <Route path='/messages/:userID?'
                        //@ts-ignore
                           render={() => <MessagesContainer/>}/>

                    <Route path='/Profile/:userID?'
                        //@ts-ignore
                           render={() => <ProfileContainer/>}/>


                    <Route exact path='/Users' render={() => <UsersContainer/>}/>

                    <Route exact path='/Login' render={() => <LoginPage/>}/>

                    //@ts-ignore
                    <Route exact path='/ToDoLists' render={() =>  <ToDoListsContainer/>}/>


                </div>
            </div>
        );
    }
}

const MapStateToProps = (state : GlobalState) => ({inition: GetinitionSelector(state),
    IsLogined: GetIsLoginedSelector(state)})

export default compose(
    connect(MapStateToProps, {InitializationAPPthunk,GetNewMessagesCountThunk}),
    withRouter)(App)

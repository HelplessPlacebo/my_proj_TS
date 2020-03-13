import React from 'react'
import {connect} from "react-redux";
import {AuthRedirect} from "../hocs/AuthRedirect";
import {compose} from "redux";
import ToDoLists from "./ToDoLists";
import {
    GetToDoListIsFetching,
    GetToDoLists, GetToDoListTaskIsFetching,
    GetToDoListTasks,
    GetToDoListTasksCount,
    GetToDoListTasksPage
} from "../../data/ToDoListsSelectors";
import {
    SetToDoListTasksPage, SetToDoListTasksCount, GetToDoListsThunk, AddNewToDoListsThunk,
    DeleteToDoListThunk,ChangeToDoListTitleThunk,
    GetToDoListTasksThunk,AddNewTaskThunk,DeleteTaskThunk,
    UpdateTaskInformationThunk
} from "../../data/ToDoListsReducer"
import Preloader from "../assetss/common/Loader/Loader";
import {GlobalState} from "../../data/redux-store";
import {
    T_MDTP_ToDoListContainer,
    T_MSTP_ToDoListContainer,
    TToDoListContainerOwnProps
} from "../GlobalTypes/ToDoListsTypes/ToDoListsTypes";

type TToDoListsContainerProps = T_MSTP_ToDoListContainer & T_MDTP_ToDoListContainer & TToDoListContainerOwnProps

class ToDoListsContainer extends React.Component<TToDoListsContainerProps> {

    componentDidMount() {
        this.props.GetToDoListsThunk();
    }

    render() {
        return (
            <>
                {
                    this.props.IsFetching ? <Preloader/> :
                    <ToDoLists {...this.props} />
                }
            </>
        )
    }
}

let StateToProps = (state : GlobalState)  : T_MSTP_ToDoListContainer=> ({
    ToDoLists: GetToDoLists(state),
    ToDoListTasksPage: GetToDoListTasksPage(state),
    ToDoListTasksCount: GetToDoListTasksCount(state),
    ToDoListTasks : GetToDoListTasks(state),
    IsFetching : GetToDoListIsFetching(state),
    TaskIsFetching : GetToDoListTaskIsFetching(state)
})

export default compose(connect<T_MSTP_ToDoListContainer ,T_MDTP_ToDoListContainer  ,TToDoListContainerOwnProps, GlobalState>(StateToProps,
    {
        SetToDoListTasksPage, SetToDoListTasksCount,
        GetToDoListsThunk, AddNewToDoListsThunk,
        DeleteToDoListThunk,ChangeToDoListTitleThunk,
        GetToDoListTasksThunk,AddNewTaskThunk,DeleteTaskThunk,
        UpdateTaskInformationThunk
    }),
    AuthRedirect)(ToDoListsContainer)
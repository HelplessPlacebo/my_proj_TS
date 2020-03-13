import {GlobalState} from "./redux-store";

export const GetToDoLists = (state : GlobalState) =>{
    return state.ToDoListsData.ToDoLists
}
export const GetToDoListTasksPage = (state : GlobalState) =>{
    return state.ToDoListsData.ToDoListTasksPage
}
export const GetToDoListTasksCount = (state : GlobalState) =>{
    return state.ToDoListsData.ToDoListTasksCount
}
export const GetToDoListTasks = (state : GlobalState) =>{
    return state.ToDoListsData.ToDoListTasks
}
export const GetToDoListIsFetching = (state : GlobalState) =>{
    return state.ToDoListsData.IsFetching
}
export const GetToDoListTaskIsFetching = (state : GlobalState) =>{
    return state.ToDoListsData.TaskIsFetching
}
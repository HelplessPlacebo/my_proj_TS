import {
    AddNewTaskThunk,
    AddNewToDoListsThunk, ChangeToDoListTitleThunk, DeleteTaskThunk, DeleteToDoListThunk,
    GetToDoListsThunk, GetToDoListTasksThunk,
    SetToDoListTasksCount,
    SetToDoListTasksPage, UpdateTaskInformationThunk
} from "../../../data/ToDoListsReducer";
import React from "react";

export type TSetToDoListTasksPage = typeof SetToDoListTasksPage
export type TSetToDoListTasksCount = typeof SetToDoListTasksCount
export type TGetToDoListsThunk = typeof GetToDoListsThunk
export type TAddNewToDoListsThunk = typeof AddNewToDoListsThunk
export type TDeleteToDoListThunk = typeof DeleteToDoListThunk
export type TChangeToDoListTitleThunk = typeof ChangeToDoListTitleThunk
export type TGetToDoListTasksThunk = typeof GetToDoListTasksThunk
export type TAddNewTaskThunk = typeof AddNewTaskThunk
export type TDeleteTaskThunk = typeof DeleteTaskThunk
export type TUpdateTaskInformationThunk = typeof UpdateTaskInformationThunk

type TButtonSize = "small" | "large" | "medium" | undefined

export type TToDoList = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TTask = {
    id: string
    title: string
    description: string | null
    completed: boolean
    todoListId: string
    order: number | null
    status: number | null
    priority: number | null
    startDate: string | null
    deadline: string | null
    addedDate: string | null
}
export type TToDoListTasks = {
    items: Array<TTask>
    totalCount: number
    error: null | string
}

export type ToDoListTaskStatusType = {
    title: string
    description: string | null
    completed: boolean
    status: number | null
    priority: number | null
    startDate: string | null
    deadline: string | null
}
////////////////////////////////////////////////////////////////////////////////////
// ToDoListContainer component types
export type T_MSTP_ToDoListContainer = {
    ToDoLists: Array<TToDoList>
    ToDoListTasksPage: number
    ToDoListTasksCount: number
    ToDoListTasks: Array<TTask> | null
    IsFetching: boolean
    TaskIsFetching: boolean
}

export type T_MDTP_ToDoListContainer = {
    SetToDoListTasksPage: TSetToDoListTasksPage
    SetToDoListTasksCount: TSetToDoListTasksCount
    GetToDoListsThunk: TGetToDoListsThunk
    AddNewToDoListsThunk: TAddNewToDoListsThunk
    DeleteToDoListThunk : TDeleteToDoListThunk
    ChangeToDoListTitleThunk : TChangeToDoListTitleThunk
    GetToDoListTasksThunk : TGetToDoListTasksThunk
    AddNewTaskThunk : TAddNewTaskThunk
    DeleteTaskThunk : TDeleteTaskThunk
    UpdateTaskInformationThunk : TUpdateTaskInformationThunk
}

export type TToDoListContainerOwnProps = {

}
///////////////////////////////////////////////////////////////////////////////////////
// ToDoLists component types
export type TTodoListsProps = T_MSTP_ToDoListContainer & T_MDTP_ToDoListContainer
///////////////////////////////////////////////////////////////////////////////////////
// ToDoList component types
export type TTodoListProps = TTodoListsProps & {
    ListID : string
    title : string
    ButtonIsDesabled : boolean
    ButtonIsDesabledON : () => void
    ButtonIsDesabledOFF : () => void
}
//////////////////////////////////////////////////////////////////////////////////////
// ListMenu component types
export type TListMenuProps = {
    ListID : string
    ShowTasksMode : boolean
    EditTitleModeON : () => void
    Del : TDeleteToDoListThunk
}
//////////////////////////////////////////////////////////////////////////////////////
// EditButton component types
export type TEditButtonProps = {
    HandleOnEdit : () => void
    ButtonSize : TButtonSize
}
////////////////////////////////////////////////////////////////////////////////////
// DeleteToDoList component types
export type TDeleteToDoListProps = {
    ListID : string
    ShowTasksMode : boolean
    Del : TDeleteToDoListThunk
}
////////////////////////////////////////////////////////////////////////////////////
// SaveButton component types
export type TSaveButtonProps = {
    ListID : string
    ChangeToDoListTitleThunk : TChangeToDoListTitleThunk
    EditTitleModeOFF : () => void
    CurrentToDoListTitle : string
}
/////////////////////////////////////////////////////////////////////////////////////
// TitleChangeField component types
export type TTitleChangeFieldProps = {
    OnToDoListTitleChanging : (el : React.ChangeEvent<HTMLInputElement>) => void
    CurrentToDoListTitle : string
}
//////////////////////////////////////////////////////////////////////////////////////
// CreateNewToDoList component types
export type TCreateNewToDoListProps = {
    AddNewToDoListsThunk : TAddNewToDoListsThunk
}
////////////////////////////////////////////////////////////////////////////////////
// TextFieldToDoLists component types
export type TTextFieldToDoListsProps = {
    OnTextFieldCreateNewToDoListChanging : (event : React.ChangeEvent<HTMLInputElement> ) => void
}
/////////////////////////////////////////////////////////////////////////////////////////
// AddNewTask component types
export type TAddNewTaskProps = {
    ListID : string
    AddNewTaskThunk : TAddNewTaskThunk
}
////////////////////////////////////////////////////////////////////////////////////////////
// AddTaskField component types
export type TAddNewTaskFieldProps = {
    OnAddNewTaskFieldChange : (e : React.ChangeEvent<HTMLInputElement>) => void
}
/////////////////////////////////////////////////////////////////////////////////////////
// AddNewTaskButton component types
export type TAddNewTaskButtonProps = TAddNewTaskProps & { AddNewTaskFieldCurrentValue : string }
//////////////////////////////////////////////////////////////////////////////////////////////
// Tasks component types
export type TTasksProps ={
    DeleteTaskThunk : TDeleteTaskThunk
    ToDoListTasks : Array<TTask>
    UpdateTaskInformationThunk : TUpdateTaskInformationThunk
}
///////////////////////////////////////////////////////////////////////////////////////////////
// Task component types
export type TTaskProps = {
    UpdateTaskInformationThunk: TUpdateTaskInformationThunk
    DeleteTaskThunk: TDeleteTaskThunk
    ShowButtonBlockedON: () => void
    ShowButtonBlockedOFF: () => void
    ShowButtonBlocked: boolean
    CurrentTask: TTask
}
///////////////////////////////////////////////////////////////////////////////////////////////
// EditTaskButton component types
export type TEditTaskButtonProps = {
    ShowButtonBlocked : boolean
    ButtonSize : TButtonSize
    HandleOnClick : ()=> void
}
///////////////////////////////////////////////////////////////////////////////////////////////
// DeleteTaskButton component types
export type TDeleteTaskButtonProps = {
    DeleteTaskThunk : TDeleteTaskThunk
    ShowButtonBlocked : boolean
    ListID : string
    TaskID : string
}
///////////////////////////////////////////////////////////////////////////////////////////////
// TaskDetails component types
export type TTaskDetailsProps = {
    CurrentTask : TTask
    ShowButtonBlockedON: () => void
    ShowButtonBlockedOFF: () => void
    ShowButtonBlocked : boolean
}
///////////////////////////////////////////////////////////////////////////////////////////////
// TaskHideDetails component types
export type TTaskHideDetailsProps = {
    HandleOnClick : () => void
}

///////////////////////////////////////////////////////////////////////////////////////////////
// TaskShowDetails component types
export type TTaskShowDetailsProps = {
    ShowButtonBlocked : boolean
    HandleOnClick : () => void
}
/////////////////////////////////////////////////////////////////////////////////////////////////
// ShowTasksButton component types
export type TShowTasksButtonProps = {
    ShowTasksMode : boolean
    HandleOnClick : ()=> void
    ButtonIsDesabled : boolean
}
/////////////////////////////////////////////////////////////////////////////////////////////////
// GoBackButton component types
export type TGoBackButtonProps ={
    HandleOnClick : ()=> void
}
/////////////////////////////////////////////////////////////////////////////////////////////////
// TaskEditForm component types
export type TTaskEditFormProps ={
    initialValues : TTask
    TaskEditModeOFF : () => void
    ListID : string
    TaskID : string
    handleSubmit : () => void
    TaskExecutedStyleForWindow : any
}
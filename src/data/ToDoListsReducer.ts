import {API} from "../API/requests";
import {stopSubmit} from "redux-form";
import {
    ToDoListTaskStatusType, TTask,
    TToDoList,
} from "../components/GlobalTypes/ToDoListsTypes/ToDoListsTypes";
import {ThunkAction} from "redux-thunk";
import {GlobalState} from "./redux-store";


const SET_TO_DO_LISTS = 'ToDoLists/SET_TO_DO_LISTS';
const SET_TO_DO_LIST_TASKS_Page = 'ToDoLists/SET_TO_DO_LIST_TASKS_Page';
const SET_TO_DO_LISTS_TASKS_Count = 'ToDoLists/SET_TO_DO_LISTS_TASKS_Count';
const SET_TO_DO_LIST_TASKS = 'ToDoLists/SET_TO_DO_LIST_TASKS';
const IsFetching_Toggle = 'ToDoLists/IsFetching_Toggle';
const TaskIsFetching_Toggle = 'ToDoLists/TaskIsFetching_Toggle';


type SetToDoListsActionType = {
    type: typeof SET_TO_DO_LISTS
    NewToDoLists: Array<TToDoList>
}

type SetToDoListTasksPageActionType = {
    type: typeof SET_TO_DO_LIST_TASKS_Page
    NewToDoListTasksPage: number
}
type SetToDoListTasksCountActionType = {
    type: typeof SET_TO_DO_LISTS_TASKS_Count
    NewToDoListTasksCount: number
}

type SetToDoListTasksActionType = {
    type: typeof SET_TO_DO_LIST_TASKS
    Tasks: Array<TTask>
}

type IsFetchingType = {
    type: typeof IsFetching_Toggle
    IsFetching: boolean
}

type TasksIsFetchingType = {
    type: typeof TaskIsFetching_Toggle
    TaskIsFetching: boolean
}


let DefaultState = {
    ToDoLists: [] as Array<TToDoList>,
    ToDoListTasks: null as  Array<TTask> | null,
    ToDoListTasksPage: 1,
    ToDoListTasksCount: 10,
    IsFetching: false,
    TaskIsFetching: false
}

type TToDoListsActions = SetToDoListsActionType | SetToDoListTasksPageActionType | SetToDoListTasksCountActionType
    | SetToDoListTasksActionType | IsFetchingType | TasksIsFetchingType

type TToDoListsThunks = ThunkAction<Promise<void>, GlobalState, unknown, TToDoListsActions>

export  type  DefaultToDoListStateType = typeof DefaultState

const ToDoListsReducer = (state = DefaultState, action: TToDoListsActions): DefaultToDoListStateType => {
    switch (action.type) {
        case SET_TO_DO_LISTS: {
            return {...state, ToDoLists: action.NewToDoLists}
        }
        case SET_TO_DO_LIST_TASKS_Page: {
            return {...state, ToDoListTasksPage: action.NewToDoListTasksPage}
        }
        case SET_TO_DO_LISTS_TASKS_Count: {
            return {...state, ToDoListTasksCount: action.NewToDoListTasksCount}
        }
        case SET_TO_DO_LIST_TASKS: {
            return {...state, ToDoListTasks: action.Tasks}
        }

        case IsFetching_Toggle: {
            return {...state, IsFetching: action.IsFetching}
        }
        case TaskIsFetching_Toggle: {
            return {...state, TaskIsFetching: action.TaskIsFetching}
        }
        default :
            return state
    }
}


export const SetToDoLists = (NewToDoLists: Array<TToDoList>): SetToDoListsActionType => {
    return {type: SET_TO_DO_LISTS, NewToDoLists}
}
export const SetToDoListTasksPage = (NewToDoListTasksPage: number): SetToDoListTasksPageActionType => {
    return {type: SET_TO_DO_LIST_TASKS_Page, NewToDoListTasksPage}
}
export const SetToDoListTasksCount = (NewToDoListTasksCount: number): SetToDoListTasksCountActionType => {
    return {type: SET_TO_DO_LISTS_TASKS_Count, NewToDoListTasksCount}
}
export const SetToDoListTasks = (Tasks: Array<TTask>): SetToDoListTasksActionType => {
    return {type: SET_TO_DO_LIST_TASKS, Tasks}
}
export const ToggleIsFetching = (IsFetching: boolean): IsFetchingType => {
    return {type: IsFetching_Toggle, IsFetching}
}
export const SetTaskIsFetching = (TaskIsFetching: boolean): TasksIsFetchingType => {
    return {type: TaskIsFetching_Toggle, TaskIsFetching}
}


export const GetToDoListsThunk = (): TToDoListsThunks => async (dispatch) => {
    dispatch(ToggleIsFetching(true))
    const ToDoLists = await API.GetToDoLists()
    dispatch(SetToDoLists(ToDoLists))
    dispatch(ToggleIsFetching(false))
}

export const AddNewToDoListsThunk = (title: string): TToDoListsThunks => async (dispatch) => {
    const CreateNewToDoListResult = await API.CreateNewToDoList(title)
    if(CreateNewToDoListResult.resultCode === 0)
    {
        dispatch(GetToDoListsThunk())
    }
}

export const DeleteToDoListThunk = (ToDoListID: string): TToDoListsThunks => async (dispatch) => {
    const DeleteToDoListResult = await API.DeleteToDoList(ToDoListID)
    if(DeleteToDoListResult.resultCode === 0)
    {
        dispatch(GetToDoListsThunk())
    }
}

export const ChangeToDoListTitleThunk = (ToDoListID: string, Newtitle: string): TToDoListsThunks => async (dispatch) => {
    const ChangeToDoListTitleResult  =  await API.ChangeToDoListTitle(ToDoListID, Newtitle)
    if(ChangeToDoListTitleResult.resultCode === 0)
    {
        dispatch(GetToDoListsThunk())
    }
}

export const GetToDoListTasksThunk = (ToDoListID: string, count?: number, page?: number): TToDoListsThunks => async (dispatch) => {
    dispatch(SetTaskIsFetching(true))
    const ToDoListTasks = await API.GetToDoListTasks(ToDoListID, count, page)
    dispatch(SetTaskIsFetching(false))
    if (!ToDoListTasks.error) {
        dispatch(SetToDoListTasks(ToDoListTasks.items))
    }
}

export const AddNewTaskThunk = (ToDoListID: string, TaskTitle: string): TToDoListsThunks => async (dispatch) => {
    const CreateNewTaskForToDoListResult = await API.CreateNewTaskForToDoList(ToDoListID, TaskTitle)
    if (CreateNewTaskForToDoListResult.resultCode === 0) {
        dispatch(GetToDoListTasksThunk(ToDoListID))
    }
}

export const DeleteTaskThunk = (ToDoListID: string, TaskId: string): TToDoListsThunks => async (dispatch) => {
    const DeleteTaskFromToDoListResult = await API.DeleteTaskFromToDoList(ToDoListID, TaskId)
    if (DeleteTaskFromToDoListResult.resultCode === 0) {
        dispatch(GetToDoListTasksThunk(ToDoListID))

    }
}

export const UpdateTaskInformationThunk = (ToDoListID: string, TaskId: string, status: ToDoListTaskStatusType): TToDoListsThunks => async (dispatch) => {
    const ChangeTaskInformationResult = await API.ChangeTaskInformation(ToDoListID, TaskId, status)
    if (ChangeTaskInformationResult.resultCode === 0) {
        dispatch(GetToDoListTasksThunk(ToDoListID))
        //@ts-ignore
    } else dispatch(stopSubmit("TaskEditorForm", {_error: ChangeTaskInformationResult.messages[0]}))
}

export default ToDoListsReducer
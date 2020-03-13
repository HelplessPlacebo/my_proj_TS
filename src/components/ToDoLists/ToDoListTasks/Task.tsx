import React, {useState,useEffect} from "react"
import ts from "./Tasks.module.css"
import classNames from 'classnames';
import DeleteButton from "./DeleteTaskButton";
import TaskDoneIcon from "./DoneIcone";
import EditTaskButton from "./EditTaskButton";
import TaskDetails from "./TaskDetails";
import NotDoneIcon from "./NotDoneIcon";
import TaskEditForm from "./TaskEditForm";
import {reduxForm} from "redux-form";
import {DateTransform} from "../../utils/dateTransform";
import {ToDoListTaskStatusType, TTaskProps} from "../../GlobalTypes/ToDoListsTypes/ToDoListsTypes";


const Task : React.FC<TTaskProps> = (props) => {

    let [TaskEditMode, SetTaskEditMode] = useState(false)
    let [status, SetStatus] = useState<ToDoListTaskStatusType>({
        completed : props.CurrentTask.completed,
        deadline : props.CurrentTask.deadline,
        description : props.CurrentTask.description,
        priority : props.CurrentTask.priority,
        startDate : props.CurrentTask.startDate,
        status : props.CurrentTask.status,
        title : props.CurrentTask.title
    })

    let TrueStartDate = DateTransform(props.CurrentTask.startDate)
    let TrueDeadLine = DateTransform(props.CurrentTask.deadline)

const TrueObjMaker=(status : object,TrueStartDate : Array<string>,TrueDeadLine :  Array<string>)=>{
        if (status && TrueStartDate && TrueDeadLine  )
        {
            return Object.assign({...status},{ startDate:TrueStartDate[2]+"-"+TrueStartDate[1]+"-"+TrueStartDate[0],
                deadline :TrueDeadLine[2]+"-"+TrueDeadLine[1]+"-"+TrueDeadLine[0] })

        }
}


    useEffect(() => {
        SetStatus(props.CurrentTask)
        }, [props.CurrentTask]
    )



    const TaskEditModeON = () => {
        SetTaskEditMode(true)
    }
    const TaskEditModeOFF = () => {
        SetTaskEditMode(false)
    }
    const TaskExecutedStyleForWindow = classNames({
        [ts.Ramka] : !props.CurrentTask.completed,
        [ts.DoneRamka] : props.CurrentTask.completed
    })

    const SaveNewToDoListTaskInfo= (formData : ToDoListTaskStatusType)=>{
        props.UpdateTaskInformationThunk(props.CurrentTask.todoListId,props.CurrentTask.id,formData)
        TaskEditModeOFF()
    }

    return <div>
        {

            !TaskEditMode ?
            <div  className={ts.Main}>

                <div className={classNames(ts.MainWrapper)}>

                    <div className={ts.TaskEditButton}>
                        <EditTaskButton ShowButtonBlocked={props.ShowButtonBlocked} ButtonSize={"small"} HandleOnClick={TaskEditModeON}/>
                    </div>

                    <div className={TaskExecutedStyleForWindow}>
                        <div className={ts.TaskBodyWrapper}>
                            {props.CurrentTask.completed ?
                                <div className={ts.iconStatus}>
                                    <TaskDoneIcon/>
                                </div>
                                :
                                <div className={ts.iconStatus}>
                                    <NotDoneIcon/>
                                </div>
                            }


                            <div className={ts.Title}>
                                {props.CurrentTask.title}
                            </div>


                            <div className={ts.ToTrashIcon}>
                                <DeleteButton DeleteTaskThunk={props.DeleteTaskThunk}
                                              ShowButtonBlocked={props.ShowButtonBlocked}
                                              ListID={props.CurrentTask.todoListId} TaskID={props.CurrentTask.id}/>
                            </div>

                        </div>

                        <div>
                            <TaskDetails
                                ShowButtonBlocked={props.ShowButtonBlocked}
                                CurrentTask={props.CurrentTask}
                                ShowButtonBlockedON={props.ShowButtonBlockedON}
                                ShowButtonBlockedOFF={props.ShowButtonBlockedOFF}
                            />
                        </div>

                    </div>

                </div>

            </div>
                :
                <div>
                    <TaskEditFormRedux
                                    initialValues={TrueStartDate && TrueDeadLine
                                           ? TrueObjMaker(status,TrueStartDate,TrueDeadLine)
                                           : status
                                       }
                                       TaskEditModeOFF={TaskEditModeOFF}
                                       ListID={props.CurrentTask.todoListId}
                                       TaskID={props.CurrentTask.id}
                                    //@ts-ignore
                                       onSubmit={SaveNewToDoListTaskInfo}
                                       TaskExecutedStyleForWindow={TaskExecutedStyleForWindow}
                    />
                </div>
        }

    </div>
}
//@ts-ignore
const TaskEditFormRedux = reduxForm({form: 'TaskEditorForm'})(TaskEditForm)

export default Task
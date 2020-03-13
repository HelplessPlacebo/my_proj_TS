import React, {useState, useEffect} from "react"
import ts from "./Tasks.module.css"
import Task from "./Task";
import {TTasksProps} from "../../GlobalTypes/ToDoListsTypes/ToDoListsTypes";


const Tasks : React.FC<TTasksProps> = (props) => {

    let [TasksData, SetTasksData] = useState(props.ToDoListTasks)
    let [ShowButtonBlocked, SetShowButtonBlocked] = useState(false)


    const ShowButtonBlockedON = () => {
        SetShowButtonBlocked(true)
    }

    const ShowButtonBlockedOFF = () => {
        SetShowButtonBlocked(false)
    }

    useEffect(() => {
            SetTasksData(props.ToDoListTasks)
        }, [props.ToDoListTasks]
    )



    return <div>
        {


            TasksData.map(task => {

                return <div key={task.id} className={ts.Main}>

                    <Task
                          UpdateTaskInformationThunk={props.UpdateTaskInformationThunk}
                          ShowButtonBlocked={ShowButtonBlocked}
                          CurrentTask={task}
                          DeleteTaskThunk={props.DeleteTaskThunk}
                          ShowButtonBlockedON={ShowButtonBlockedON}
                          ShowButtonBlockedOFF={ShowButtonBlockedOFF}
                    />

                </div>
            })
        }
    </div>
}

export default Tasks
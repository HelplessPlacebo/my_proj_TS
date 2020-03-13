import React,{useState} from "react"
import TDLS from "../ToDoLists.module.css";
import AddNewTaskButton from "./AddNewTaskButton";
import AddTaskField from "./AddNewTaskField";
import {TAddNewTaskProps} from "../../GlobalTypes/ToDoListsTypes/ToDoListsTypes";


const AddNewTask : React.FC<TAddNewTaskProps>= (props) => {
    let [AddNewTaskFieldCurrentValue,SetAddNewTaskFieldCurrentValue] = useState("")

    const OnAddNewTaskFieldChange = (el : React.ChangeEvent<HTMLInputElement>)=>{
        SetAddNewTaskFieldCurrentValue(el.currentTarget.value)
    }
   return  <div className={TDLS.AddNewTaskWrapper}>
            <div >
                <AddTaskField OnAddNewTaskFieldChange={OnAddNewTaskFieldChange}/>
            </div>

            <div className={TDLS.AddTaskButton}>
                <AddNewTaskButton ListID={props.ListID}
                                  AddNewTaskThunk={props.AddNewTaskThunk}
                                  AddNewTaskFieldCurrentValue={AddNewTaskFieldCurrentValue}
                />
            </div>

    </div>
}
export default AddNewTask
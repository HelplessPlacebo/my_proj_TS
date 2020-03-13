import {AuthMeThunk} from "./AuthReducer"
import {GetProfileThunk} from "./ProfileReduser";
import {ThunkAction} from "redux-thunk";
import {GlobalState} from "./redux-store";

const INITIALIZATED = 'Init/INITIALIZATED'

let DefaultState = {inition: false}

type  DefaultInitializatedState = typeof DefaultState

type initializatingActionType = {
    type: typeof INITIALIZATED
}

type TInitializateReducerActions = initializatingActionType

type TInitializationThunks = ThunkAction<Promise<void>, GlobalState, unknown, TInitializateReducerActions>

const InitializateReducer = (state = DefaultState, action : TInitializateReducerActions): DefaultInitializatedState => {
    switch (action.type) {
        case INITIALIZATED : {
            return {
                ...state,
                inition: true
        }
        }
        default :
            return state
    }
}

export const initializating = () : initializatingActionType => ({type: INITIALIZATED})


export const InitializationAPPthunk = () : TInitializationThunks => async (dispatch , getState ) => {

    let promise = dispatch(AuthMeThunk())
    await Promise.all([promise]);
    const MyId = getState().Auth.userId
    if (MyId) {
        dispatch(GetProfileThunk(MyId))
    }
    dispatch(initializating())
}

export default InitializateReducer
import { InferActionType } from "./Store";
import { CheckAuthState, Thunk_type } from "./auth_reducer";

const SET_INITIALIZE = "SET_INITIALIZE";

let initial_state = {
    is_initialize : false,
}
//Acrtion types
type Action_Type = InferActionType<typeof app_actions>;

export const app_reducer = (state = initial_state,action:Action_Type) => {
    switch(action.type){
        case SET_INITIALIZE : {
            return {
                ...state,
                is_initialize : false
            }
        }
        default : 
            return state
    }
}

export const app_actions = {
    //Initialize action
    init : () => (
        {
            type : "SET_INITIALIZE",
        
    } as const )
}

export const initialize = () =>  (dispatch:any) => {
    dispatch(app_actions.init())
    
}
import { InferActionType } from "./Store";


const SET_INITIALIZE = "SET_INITIALIZE";

let initial_state = {
    is_initialize : false,
    ghdghd : "sdfsdgsdg"
}
//Acrtion types
type Action_Type = InferActionType<typeof app_actions>;

export const app_reducer = (state = initial_state,action:Action_Type) => {
    switch(action.type){
        case SET_INITIALIZE : {
            return {
                ...state,
                is_initialize : action.payload
            }
        }
        default : 
            return state
    }
}

export const app_actions = {
    //Initialize action
    init : (_value:boolean) => (
        {
            type : "SET_INITIALIZE",
            payload : _value
        
    } as const )
}

export const init_thunk = ():any=>{
    
    return async function (dispatch:any){
        return null;
    }
}
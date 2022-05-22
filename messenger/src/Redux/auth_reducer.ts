import { stat } from "fs";
import { Action } from "redux";
import { InferActionType } from "./Store";
import {Dispatch} from "redux"
import {ThunkAction} from "redux-thunk"
import {Global_state_type} from "../Redux/Store";
import {auth_api} from "../DAL/Auth_api";
import {Firebase_instance} from "../DAL/Firebase_config";


//Creating a type for auth_reducer action creator functions
type Action_Type = InferActionType< typeof auth_actions>;
export type Dispatch_type = Dispatch<Action_Type>;
type Thunk_type = ThunkAction<void,Global_state_type,unknown,Action_Type>;

export type CommonThunkType<A extends Action, R = Promise<void>> = ThunkAction<R,Global_state_type,unknown,Action_Type>;


const SET_AUTH_TRUE = "messenger/auth_reducer/set_true";
const SET_AUTH_FALSE = "messenger/auth_reducer/set_false";

const initial_state = {
    is_auth : false,
}


export const auth_reducer = (state = initial_state,action : Action_Type) => {
    switch(action.type){
        case SET_AUTH_TRUE : 
            return {
                ...state,
                is_auth : true
            }
        case SET_AUTH_FALSE : 
            return {
                ...state,
                is_auth : action.payload
            }
        default :
            return state
    }
};

export const auth_actions = {
    set_auth_true : () => ({
        type : "messenger/auth_reducer/set_true",
        payload : true
    } as const),
    set_auth_false : () => ({
        type : "messenger/auth_reducer/set_false",
        payload : false
    } as const)
}

//Thunk creators to log in
export const log_in = function (_usernsame:string,_password:string):Thunk_type{
    return  async function (dispatch){
        console.log("LOGGING IN THUNK")
        let response = await auth_api.log_in(_usernsame,_password)
        console.log(response)

    }
}
export const firebase_login = function (_email:string,_password:string):Thunk_type {
    return function (dispatch) {
        let response = Firebase_instance.sign_in(_email,_password);
        console.log(response);
    }
}
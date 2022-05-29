import { stat } from "fs";
import { Action } from "redux";
import { InferActionType } from "./Store";
import {Dispatch} from "redux"
import {ThunkAction} from "redux-thunk"
import {Global_state_type} from "../Redux/Store";
import {auth_api} from "../DAL/Auth_api";
import {Firebase_instance} from "../DAL/Firebase_config";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { async } from "@firebase/util";
import { google_provider } from "../DAL/Firebase_config";
import { Firebase_auth } from "../DAL/Firebase_config";
import { disableNetwork } from "firebase/firestore";
import { signOut } from "firebase/auth";



//Creating a type for auth_reducer action creator functions
export type Action_Type = InferActionType< typeof auth_actions>;
export type Dispatch_type = Dispatch<Action_Type>;
export type Thunk_type = ThunkAction<void,Global_state_type,unknown,Action_Type>;

export type CommonThunkType<A extends Action, R = Promise<void>> = ThunkAction<R,Global_state_type,unknown,Action_Type>;


const SET_AUTH_TRUE = "messenger/auth_reducer/set_true";
const SET_AUTH_FALSE = "messenger/auth_reducer/set_false";
const SET_TOKEN = "messenger/auth_reducer/set_token";

let initial_state : initial_state_type = {
    is_auth : false,
    auth_token : ""
}
type initial_state_type = {
    is_auth : boolean,
    auth_token? : string | undefined
}

export const auth_reducer = (state = initial_state,action : Action_Type) => {
    switch(action.type){
        case SET_AUTH_TRUE : {
            return {
                ...state,
                is_auth : true
            }}
        case SET_AUTH_FALSE : {
            return {
                ...state,
                is_auth : false
            }}
        case SET_TOKEN : {
            return {
                ...state,
                auth_token : action.payload
            }}
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
        
    } as const),
    set_auth_token : (_token : string) =>({
        type : "messenger/auth_reducer/set_token",
        payload : _token
    })
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
//Thunk for Signing in with Firebase GooglePopUp
export const  Sign_in_with_pop_up = ():Thunk_type => {
    return async function (dispatch) {
        const user = await signInWithPopup(Firebase_auth,google_provider).then((response) => {
            let credential = GoogleAuthProvider.credentialFromResult(response);
            let auth_token =  credential?.accessToken;
            if(auth_token?.length){
                dispatch(auth_actions.set_auth_token(auth_token))
                dispatch(auth_actions.set_auth_true());
            }else{
                dispatch(auth_actions.set_auth_token(""))
            }
        
        }).catch((error)=> {
            const error_code = error.code;
            console.error("SOME ERROR OCCURED : " + error);
        })
    }
}

export const Log_out_thunk = ():Thunk_type => {
    return async (dispatch) => {
        const result = await signOut(Firebase_auth).then((response)=>{
            dispatch(auth_actions.set_auth_false());
            dispatch(auth_actions.set_auth_token(""));
        }).catch((error) => {
            const error_code = error.code;
            console.error("ERROR WHILE SIGNING OUT ERROR CODE IS : " + error_code)
            console.error("ERROR TEXT : " + error); 
        })

    }
}
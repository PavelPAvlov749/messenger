import { InferActionType } from "./Store";
import { CheckAuthState, Thunk_type } from "./auth_reducer";
import { Firebase_instance } from "../DAL/Firebase_config";
import { profile_actions } from "./profile_reducer";
import { Current_ProfileType } from "./profile_reducer";
import { get_posts_thunk } from "./posts_reducer";
import { GithubAuthProvider } from "firebase/auth";
import { get_status_thunk } from "./profile_reducer";
import { Get_current_user_thunk } from "./profile_reducer";

const SET_INITIALIZE = "SET_INITIALIZE";
const SET_IS_FETCH_TRUE = "messenger/app_reducer/set_is_fetch_true";
const SET_IS_FETCH_FALSE = "messenger/app_reducer/set_is_fetch_false";

let initial_state = {
    is_initialize : false,
    is_fetch : false
}
//Acrtion types
type Action_Type = InferActionType<typeof app_actions>;

export const app_reducer = (state = initial_state,action:Action_Type) => {
    switch(action.type){
        case SET_INITIALIZE : {
            return {
                ...state,
                is_initialize : true
            }
        }
        case SET_IS_FETCH_TRUE : {
            return {
                ...state,
                is_fetch : true
            }
        }
        case SET_IS_FETCH_FALSE : {
            return {
                ...state,
                is_fetch : false
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
        
    } as const ),
    set_is_fetch_true : () => (
        {
            type : "messenger/app_reducer/set_is_fetch_true",
        
    } as const ),
    set_is_fetch_fasle : () => (
        {
            type : "messenger/app_reducer/set_is_fetch_false",
        
    } as const ),
    
}

export const initialize = () =>  async (dispatch:any) => {
    try{
        await Firebase_instance.get_current_user().then((result) => {
        if(result){
            console.log(result)
            let user: Current_ProfileType = {
                user_name: result?.displayName,
                email: result?.email,
                id: result?.uid,
                avatar: result?.photoURL,
                followers: null,
                subscribers: null,
                messages: null,
                isAnonymoys: result?.isAnonymous,
                is_online: true,
                current_user_posts: null,
                current_user_status: null,
                phone: result?.phoneNumber,
            };
            dispatch(profile_actions.set_current_user_profile(user));
            dispatch(get_status_thunk(user.id))
        }else{
            throw new Error("Cannot initialize");
        }
        }).then(() => {
            dispatch(app_actions.init())
        })
    }catch(ex){
        console.log(ex)
    }
}
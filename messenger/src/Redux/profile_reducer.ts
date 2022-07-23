import { PostType } from "../Components/Post/Posts_types";
import { Db_instance, Firebase_instance } from "../DAL/Firebase_config";
import { app_actions } from "./app_reducer";
import { Thunk_type } from "./auth_reducer";
import { InferActionType } from "./Store";



const SET_CURRENT_USER_PROFILE = "messenger/profile_reducer/set_current_user+profile";
const SET_MESSAGES = "messenger/profile_reducer/set_messages";
const GET_STATUS = "messenger/profile_reducer/get_status";
const UPDATE_STATUS = "messenger/profile_reducer/update_status";

type ActionType = InferActionType<typeof profile_actions>;

export type UsersType = {
    user_name: string
}

export type Current_ProfileType = {
    user_name?: string | null | undefined,
    id: string,
    avatar?: string | undefined | null,
    followers?: Array<UsersType> | null,
    subscribers?: Array<UsersType> | null,
    messages?: Array<string> | null,
    current_user_posts?: Array<PostType> | null,
    current_user_status?: string | null,
    email?: string | null | undefined,
}
type initial_state_type = {
    profile : Current_ProfileType
    messages : Array<any>,
    status : string
}

let initial_state : initial_state_type = {
    profile: {
        user_name: null,
        id: null as unknown as string,
        avatar: null,
        followers: null,
        subscribers: null,
        messages: null,
        current_user_status: null,
    },
    status : "No status yet",
    messages : []
};

export const Profile_reducer = (state = initial_state, action: ActionType) => {
    switch (action.type) {
        case SET_CURRENT_USER_PROFILE:
            {
            return {
                ...state,
                profile: {...state.profile,...action.payload}
            }
        }
        case SET_MESSAGES : { 
            return {
                ...state,
                messages: {...state.messages,...action.payload}
            }
        }
        case GET_STATUS : {
            return {
                ...state,
                status : action.payload
            }
        }
        default:
            return state
    }
}

export const profile_actions = {
    set_current_user_profile: (_profile: Current_ProfileType) => ({
        type: "messenger/profile_reducer/set_current_user+profile",
        payload: _profile
    } as const),
    set_messages : (_mesasges:any) => ({
        type : "messenger/profile_reducer/set_messages",
        payload : {_mesasges}
    } as const),
    get_status : (status:string) => ({
        type : "messenger/profile_reducer/get_status",
        payload : status
    } as const ),

}
//Get user profile thunk
export const Get_current_user_thunk = (userID:string): Thunk_type => {
    return async function (dispatch: any) {
        dispatch(app_actions.set_is_fetch_true())
        const result = await Db_instance.get_user_page_by_id(userID).then((result) => {
            console.log(result.val())
            if(result){
                let user: Current_ProfileType = {
                    user_name: result.val().fullName,
                    id: result.val().userID,
                    avatar: result.val().avatar,
                    followers: result.val().followers,
                    subscribers: result.val().subscribers,
                    messages: result.val().messages,
                    current_user_status: result.val().status,
                };
                dispatch(profile_actions.set_current_user_profile(user))
                dispatch(app_actions.set_is_fetch_fasle())
            }
        })

    }
};

export const get_status_thunk = (_user_id:string | null | undefined) => {
    return async function (dispatch:any) {
        await Db_instance.get_status(_user_id).then((response) => {
            if(response){
                console.log("STATUS IS : " + response)
                dispatch(profile_actions.get_status(response))
            }    
        })
        
    }
}
export const update_status_thunk = (_usre_id:string,new_status:string) => {
    return async function (dispatch:any) {
        console.log("UPDATING")
        await Db_instance.update_status(_usre_id,new_status).then((res) => {
            return res
        })
    }
}
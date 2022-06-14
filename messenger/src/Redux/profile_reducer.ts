import { stat } from "fs";
import { PostType } from "../Components/Post/Post";
import { Firebase_instance } from "../DAL/Firebase_config";
import { Thunk_type } from "./auth_reducer";
import { InferActionType } from "./Store";
import { Firestore_instance } from "../DAL/Firestore_config";
import { profile } from "console";



const SET_CURRENT_USER_PROFILE = "messenger/profile_reducer/set_current_user+profile";
const SET_MESSAGES = "messenger/profile_reducer/set_messages";


type ActionType = InferActionType<typeof profile_actions>;

export type UsersType = {
    user_name: string
}

export type Current_ProfileType = {
    user_name?: string | undefined | null,
    id?: string | undefined | null,
    avatar?: string | undefined | null,
    followers?: Array<UsersType> | null,
    subscribers?: Array<UsersType> | null,
    messages?: Array<string> | null,
    current_user_posts?: Array<PostType> | null,
    current_user_status?: string | null,
    is_online?: boolean,
    isAnonymoys?: boolean | undefined,
    phone?: string | null | undefined,
    email?: string | null | undefined
}
type initial_state_type = {
    profile : Current_ProfileType
    messages : Array<any>
}

let initial_state : initial_state_type = {
    profile: {
        user_name: null,
        id: null,
        avatar: null,
        followers: null,
        subscribers: null,
        messages: null,
        current_user_posts: null,
        current_user_status: null,
        is_online: false
    },
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
    } as const) 
}
//Get user profile thunk
export const Get_current_user_thunk = (): Thunk_type => {
    return async function (dispatch: any) {
        const result = await Firebase_instance.get_current_user().then((result) => {
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
            dispatch(profile_actions.set_current_user_profile(user))
        })

    }
};

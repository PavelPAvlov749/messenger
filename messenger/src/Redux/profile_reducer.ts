import { stat } from "fs";
import { PostType } from "../Components/Post/Post";
import { InferActionType } from "./Store";



const SET_CURRENT_USER_PROFILE = "messenger/profile_reducer/set_current_user+profile";


type ActionType = InferActionType<typeof profile_actions>;

export type UsersType = {
    user_name: string
}

export type Current_ProfileType = {
    user_name: string | null,
    id: string | null,
    avatar: string | null,
    followers?: Array<UsersType>  | null,
    subscribers?: Array<UsersType> | null,
    messages: Array<string> | null,
    current_user_posts: Array<PostType> | null,
    current_user_status: string | null,
    is_online: boolean,
    isAnonymoys : boolean,
    phone : string | null,
    email : string | null
}

let initial_state = {
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
    }
};

export const Profile_reducer = (state = initial_state, action: ActionType) => {
    switch (action.type) {
        case SET_CURRENT_USER_PROFILE :
            return {
                ...state,
                profile : {...action.payload}
            }
    }
}

export const profile_actions = {
    set_current_user_profile: (_profile: Current_ProfileType) => ({
        type: "messenger/profile_reducer/set_current_user+profile",
        payload: {_profile}
    } as const),
}
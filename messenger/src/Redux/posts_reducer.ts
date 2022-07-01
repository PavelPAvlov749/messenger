import { InferActionType } from "./Store";
import { PostType } from "../Components/Post/Posts_types";
import { auth_api } from "../DAL/Auth_api";
import { Thunk_type } from "./auth_reducer";
import { Db_instance } from "../DAL/Firebase_config";
import { disableNetwork } from "firebase/firestore";
import { app_actions } from "./app_reducer";


const GET_POSTS = "messenger/posts_reducer/get_post";
const SET_SHOWED_POST = "messenger/posts_reducer/set_showed_post";


type ActionType = InferActionType<typeof posts_actions>
type initial_state_type = {
    posts : Array<PostType>,
    showed_post_id? : string | null,
    showed_post : any
}

export let initial_state : initial_state_type= {
    posts : [] as Array<PostType>,
    showed_post_id : "",
    showed_post : {} as PostType
}


export const posts_reducer = (state = initial_state,action: ActionType) => {
    switch(action.type){
        case GET_POSTS : {
            return {
                ...state,
                posts : [...action.payload]
            }
        }
        case SET_SHOWED_POST : {
            return {
                ...state,
                //@ts-ignore
                showed_post : state.posts.filter(el => el.id === action.payload)
            }
        }
        default : 
            return state
    }
}

export const posts_actions = {
    get_posts : (_posts:Array<PostType>) => ({
        type : "messenger/posts_reducer/get_post",
        payload : _posts
    } as const ),
    set_showed_post : (_post:string) => ({
        type : "messenger/posts_reducer/set_showed_post",
        payload : _post
    } as const)
}

export const get_posts_thunk = function () {
    return async (dispatch:any) => {
        await auth_api.get_posts().then((res)=> {
            dispatch(posts_actions.get_posts(res))
        })
    }
}
export const get_posts_thunk_2 = (user_id:string | null | undefined) => {
    
    return async function (dispatch:any) {
        dispatch(app_actions.init())
        await Db_instance.get_posts_2(user_id).then((res) => {
            dispatch(posts_actions.get_posts(res))
            
    }).then((res) => {
        dispatch(app_actions.init())
    })}
}
import { InferActionType } from "./Store";
import { PostType } from "../Components/Post/Post";
import { auth_api } from "../DAL/Auth_api";


const GET_POSTS = "messenger/posts_reducer/get_post";
const SET_SHOWED_POST = "messenger/posts_reducer/set_showed_post";


type ActionType = InferActionType<typeof posts_actions>
type initial_state_type = {
    posts : Array<PostType>,
    showed_post_id : string,
    showed_post : any
}
const posts:Array<PostType> = [
    {
        comments : [
            {
                coment : "Wow slkdjflsdfjl sdfs",
                coment_likes : 2,
                coment_owner_name : "Some useer",
                date : 20212
            }
        ],
        likes : 67,
        post_img : "https://wallup.net/wp-content/uploads/2015/12/87646-abstract-orange-diamonds-triangle-geometry-digital_art-artwork-shapes.jpg",
        post_text : "Some debugging post text ...",
        id : ""
    }
]
export let initial_state : initial_state_type = {
    posts : posts,
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
                showed_post : [...state.posts.filter(el => el.id === action.payload)]
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
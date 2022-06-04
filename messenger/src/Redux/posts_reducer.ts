import { InferActionType } from "./Store";
import { PostType } from "../Components/Post/Post";

const GET_POSTS = "messenger/posts_reducer/get_post";
type ActionType = InferActionType<typeof posts_actions>
type initial_state_type = typeof initial_state

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
        is_open : false,
        post_img : "https://wallup.net/wp-content/uploads/2015/12/87646-abstract-orange-diamonds-triangle-geometry-digital_art-artwork-shapes.jpg",
        post_text : "Some debugging post text ..."
    }
]
export let initial_state = {
    posts : posts
}


export const posts_reducer = (state = initial_state,action: ActionType) => {
    switch(action.type){
        case GET_POSTS : {
            return {
                ...state,
                posts : [...action.payload]
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
    } as const )
}


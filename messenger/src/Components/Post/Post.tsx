import React, { MouseEventHandler, useEffect, useState } from "react";
import { get_posts_thunk } from "../../Redux/posts_reducer";
import { Global_state_type } from "../../Redux/Store";
import {connect, useSelector} from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {posts_actions} from "../../Redux/posts_reducer";

//                                        ...................TYPES FOR POST AND USER_POSTS COMPONENTS....................
//Single coment type
type ComentType = {
    coment : string,
    coment_likes : number,
    coment_owner_name : string,
    date : number
}
//Type for single post component
export type PostType = {
    comments? : Array<ComentType> ,
    likes? : number,
    post_img : string,
    post_text : string,
    id: string
}
type SinglePostType = {
    comments? : Array<ComentType> ,
    likes? : number,
    post_img : string,
    post_text : string,
    id: string,
    set_showed_post : (post_id : string) => void
}
//All posts type
type UserPostsType = {
    posts? : Array<PostType> | null,
    get_posts : () => void,
    set_showed_post : (_post_id : string) => void,
}
type Show_post_type = {
    user_name? : string,
    user_avatar? : string,
    post? : PostType
}
type ShowedPostType = {
    post : PostType
}
//                                                  .....................REACT COMPONENTS........................
export const SinglePost : React.FC = () => {
    const single_post :PostType= useSelector((state:Global_state_type) => {
        return state.posts.showed_post[0]
    })
    return (
        <div className="post">
            <img src={single_post.post_img} style={{
                width: "500px",
                height: "500px"
            }} alt="#"></img>
            <br />
            <span>{single_post.post_text}</span>
            <br />
            <span>{single_post.likes + " " + "likes"}</span>
        </div>
    )
}

//Single post prewiew compoent 
export const Post : React.FC<SinglePostType> = (props)=>{
    const history = useNavigate();
    const [is_showing,set_is_showing] = useState(false);
    const show_post = () => {
        history(`/post/id=${props.id}`);
        props.set_showed_post(props.id)
    }
    return (
        <div className="single_post" style={{   alignItems:"center",display: "inline-block" ,padding: "3px" ,}}>
            {!is_showing ?
                        <img src={props.post_img} alt="#" onClick={show_post}
                        style={{
                            width: "220px",
                            height: "220px",
                            display: "inline",
                            cursor: "pointer"
                        }}></img> : <Navigate to="/post/" replace/>}

        </div>
    )
}

export const UserPosts :React.FC<UserPostsType> = (props) => {

    useEffect(()=>{
        props.get_posts()
    },[]);
    return (
        <div className="user_posts">
            {props.posts ? null : <h3 style={{fontWeight : 500}}>No posts yet ...</h3>}
            {props.posts?.map((el)=>{
                return (
                    <Post set_showed_post={props.set_showed_post} id={el.id} post_img={el.post_img} comments={el.comments} likes={el.likes} post_text={el.post_text}/>
                )
            })}
        </div>
    )
}
const MapStateToProps = (state:Global_state_type) => {
    return {
        posts : state.posts.posts,
        showed_post : state.posts.showed_post
    }
}
const MapDispatchToProps = (dispatch:any) => {
    return {
        get_posts : () => {
            dispatch(get_posts_thunk())
        },
        set_showed_post : (post_id : string) => {
            dispatch(posts_actions.set_showed_post(post_id))
        }
    }
}

export const PostsContainer = connect(MapStateToProps,MapDispatchToProps)(UserPosts);
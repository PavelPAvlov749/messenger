import React, { MouseEventHandler, useEffect, useState } from "react";
import { get_posts_thunk } from "../../Redux/posts_reducer";
import { Global_state_type } from "../../Redux/Store";
import { connect, useSelector } from "react-redux";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { posts_actions } from "../../Redux/posts_reducer";
import styles from "../../Styles/Profile.module.css";
import style from "../../Styles/Post.module.css";
import { Db_instance } from "../../DAL/Firebase_config";
import { get_posts_thunk_2 } from "../../Redux/posts_reducer";
import { SinglePostType } from "./Posts_types";
import { UserPostsType } from "./Posts_types";


//                                                  .....................REACT COMPONENTS........................


//Single post prewiew compoent 
//Used in profile component to show all users posts preview
export const Post: React.FC<SinglePostType> = (props) => {

    const [is_showing, set_is_showing] = useState(false);

    //On post click handler function    
    //if user ckiced on post redirrect to show_post component
    const history = useNavigate();
    const show_post = () => {
        history(`/post/id=${props.id}`);
        props.set_showed_post(props.id)
    }
    return (
        <div className={styles.single_post} style={{ alignItems: "center", display: "inline", padding: "3px", }}>
            {!is_showing ?
                <img src={props.post_img} alt="#" onClick={show_post}
                    style={{
                        width: "293px",
                        height: "293px",
                        cursor: "pointer",
                        objectFit: "cover"
                    }}></img> : <Navigate to="/post/" replace />}

        </div>
    )
}


//Container component for all single post preview components
export const UserPosts: React.FC<UserPostsType> = (props) => {
    //User_id getter
    const user_id = useSelector((state: Global_state_type) => {
        return state.profile.profile.id
    })
    //Get posts function
    useEffect(() => {
        if (props.posts?.length === 0) {
            props.get_posts_2(user_id)
        }
    }, [props.posts])
    return (
        <div className={styles.User_posts}>
            {props.posts ? null : <h3 style={{ fontWeight: 500 }}>No posts yet ...</h3>}
            {props.posts?.map((el) => {
                return (
                    <Post set_showed_post={props.set_showed_post} id={el.id} key={el.id} post_img={el.post_img} comments={el.coments} likes={el.likes} post_text={el.post_text} />
                )
            })}
        </div>
    )
}


const MapStateToProps = (state: Global_state_type) => {
    return {
        posts: state.posts.posts,
        showed_post: state.posts.showed_post,
    }
}
const MapDispatchToProps = (dispatch: any) => {
    return {
        get_posts: () => {
            dispatch(get_posts_thunk())
        },
        get_posts_2: (user_id: string | null | undefined) => {
            dispatch(get_posts_thunk_2(user_id))
        },
        set_showed_post: (post_id: string) => {
            dispatch(posts_actions.set_showed_post(post_id))
        }
    }
}

export const PostsContainer = connect(MapStateToProps, MapDispatchToProps)(UserPosts);
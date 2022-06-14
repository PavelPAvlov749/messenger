import React, { useEffect, useState } from "react";
import {  PostType } from "../Post/Post";
import { Current_ProfileType, Get_current_user_thunk } from "../../Redux/profile_reducer";
import { connect } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { PostsContainer } from "../Post/Post";
import { Navigate } from "react-router-dom"

type MyProfilePropsType = {
    current_user_profile: Current_ProfileType
    get_current_user: () => void,
    posts: Array<PostType>
}
type StatusProps = {

}
type InfoPropsType = {
    age: number,
    name: string | null | undefined,
    number_of_subscribers: number,
    number_of_folowers: number,
    is_auth?: boolean
}

const Status: React.FC<StatusProps> = (props) => {
    let [is_status_edit, set_statis_edit] = useState(false);
    return (
        <div>
            <span>status</span>
        </div>
    )
}

const Information: React.FC<InfoPropsType> = (props) => {
    let [is_edit_on, set_edit] = useState(false);
    return (
        <div className="infirmation_user">
            <h2>{props.name}</h2>
            <span>{props.age + "   "} yo</span>
            <span>{" " + props.number_of_folowers + "  "}followers</span>
            <span>{" " + props.number_of_subscribers + "   "} subscribers</span>
        </div>
    )
}
const My_posts: React.FC = (props: any) => {
    return (
        <div className="my_posts">
            <hr></hr>
        </div>

    )
}

export const My_profile: React.FC<MyProfilePropsType> = (props) => {
    useEffect(() => {
        props.get_current_user();
    }, [])
    const [is_new_post,set_is_new_post] = useState(false);
    const add_new_post = function () {
        set_is_new_post(true)
    }

    const default_avatar = "https://i.stack.imgur.com/rYsym.png";
    const avatar = props.current_user_profile.avatar;
    const set_avatar = () => {
        console.log("Setting avatar")
    }

    return (
        <div className="my_profile">
            {!is_new_post ?
                <div>
                    <section className="avatar">
                        <img src={avatar === null || undefined ? default_avatar : avatar} alt="#" onClick={set_avatar}></img>
                    </section>
                    <button type="button" onClick={add_new_post}>+</button>
                    <Status />
                    <Information age={20} name={props.current_user_profile.user_name} number_of_folowers={167} number_of_subscribers={560} />

                    <PostsContainer />
                </div> : <Navigate to="/new_post" replace></Navigate>}

        </div>

    )
}

let MapStateToProps = (state: Global_state_type) => {
    return {
        current_user_profile: state.profile.profile,
        posts: state.posts.posts
    }
}
let MapDispatchToProps = (dispatch: any) => {
    return {
        get_current_user: () => {
            dispatch(Get_current_user_thunk());
        }
    }
}
export const My_profile_container = connect(MapStateToProps, MapDispatchToProps)(My_profile);
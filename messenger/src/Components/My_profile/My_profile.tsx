import React, { useEffect, useState } from "react";
import {  PostType } from "../Post/Post";
import { Current_ProfileType, Get_current_user_thunk } from "../../Redux/profile_reducer";
import { connect } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { PostsContainer } from "../Post/Post";
import { Navigate } from "react-router-dom"
import styles from "../../Styles/Profile.module.css";


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
        <div className={styles.Status}>
            <span>status</span>
        </div>
    )
}

const Information: React.FC<InfoPropsType> = (props) => {
    let [is_edit_on, set_edit] = useState(false);
    return (
        <div className={styles.about_user}>
            <h2>{props.name}</h2>
            <button type="button" className={styles.send_message}>Send message</button>
            <button type="button" className={styles.follow}>Follow</button>
            <button type="button" className={styles.properties}>...</button>
            <br />
            <span>status : </span>
            <br />
            <span>{props.age + "   "} yo</span>
            <br />
            <span>{" " + props.number_of_folowers + "  "}followers</span>
            <br />
            <span>{" " + props.number_of_subscribers + "   "} subscribers</span>
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
        <div >
            {!is_new_post ?
                <div className={styles.my_profile}>
                    <section className={styles.avatar}>
                        <img src={avatar === null || undefined ? default_avatar : avatar} alt="#" onClick={set_avatar}></img>
                        <button type="button" onClick={add_new_post}>+</button>
                    </section>
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
import React, { useEffect, useState } from "react";
import { Current_ProfileType, Get_current_user_thunk } from "../../Redux/profile_reducer";
import { connect, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { PostsContainer } from "../Post/Post";
import styles from "../../Styles/Profile.module.css";
import { UserStatus } from "../../Components/Status/Status";
import { get_status_thunk } from "../../Redux/profile_reducer";
import { update_status_thunk } from "../../Redux/profile_reducer";
import {get_images_URL,get_img_list} from "../../DAL/Cloud_storage";


type MyProfilePropsType = {
    current_user_profile: Current_ProfileType,
    user_id : string,
    get_current_user: () => void,
    get_status: (user_id: string | null | undefined) => void,
    update_status : (user_id:string,status_text : string) => void
}

type InfoPropsType = {
    user_id : string,
    age: number,
    name: string | null | undefined,
    number_of_subscribers: number,
    number_of_folowers: number,
    is_auth?: boolean,
    get_status: (user_id: string | null | undefined) => void,
    update_status : (user_id:string,status_text : string) => void

}

//USER info render component
const Information: React.FC<InfoPropsType> = (props) => {
    const status = useSelector((state: Global_state_type) => {
        return state.profile.status;
    })
    const set_avatar = () => {
        console.log("SETTED")
    }

    const default_avatar = "https://i.stack.imgur.com/rYsym.png";

    const avatar = useSelector((state: Global_state_type) => {
        return state.profile.profile.avatar
    })
    return (
        <div className={styles.about_user}>
            <section className={styles.avatar}>
                <img src={avatar === null || undefined ? default_avatar : avatar} alt="#" onClick={set_avatar}></img>
            </section>
            <section className={styles.info}>
                <h2>{props.name}</h2>
                <button type="button" className={styles.properties}>...</button>
                <br />
                <UserStatus user_id={props.user_id}status={status} get_status={props.get_status} set_new_status={props.update_status} />
                <br />
                <span>{props.age + "   "} yo</span>
                <br />
                <span>{" " + props.number_of_folowers + "  "}followers</span>
                <br />
                <span>{" " + props.number_of_subscribers + "   "} subscribers</span>
            </section>
        </div>
    )
}

//wtrapper component for renfer Profile

export const My_profile: React.FC<MyProfilePropsType> = (props) => {
    const user_id = useSelector((state: Global_state_type) => {
        return state.profile.profile.id
    })
    useEffect(() => {
        props.get_current_user();
    }, [])
    useEffect(() => {
        props.get_status(user_id)
    }, [])

    return (
        <div className={styles.my_profile}>
            <Information update_status={props.update_status} user_id={props.user_id}get_status={props.get_status} age={20} name={props.current_user_profile.user_name} number_of_folowers={167} number_of_subscribers={560} />
            <PostsContainer />
        </div>

    )
}

let MapStateToProps = (state: Global_state_type) => {
    return {
        current_user_profile: state.profile.profile,
        user_id : state.profile.profile.id
    }
}
let MapDispatchToProps = (dispatch: any) => {
    return {
        get_current_user: () => {
            dispatch(Get_current_user_thunk());
        },
        get_status: (user_id: string | null | undefined) => {
            dispatch(get_status_thunk(user_id))
        },
        update_status : (user_id:string,status_text:string) => {
            dispatch(update_status_thunk(user_id,status_text))
        }
    }
}
export const My_profile_container = connect(MapStateToProps, MapDispatchToProps)(My_profile);
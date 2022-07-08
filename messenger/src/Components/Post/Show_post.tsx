import React from "react";
import { Global_state_type } from "../../Redux/Store";
import { PostType } from "./Posts_types";
import { useState } from "react";
import { useSelector } from "react-redux";
import style from "../../Styles/Post.module.css";
import { NavLink } from "react-router-dom";
import styles from "../../Styles/Post.module.css";
import { ComentType } from "./Posts_types";
import { Db_instance } from "../../DAL/Firebase_config";
import { connect } from "react-redux";


//Coments coponent 
type Single_coment_type = {
    coment_owner_name: string,
    coment_text: string,
    date: number,
    coment_likes?: number
}
type ComentsType = {
    coments: Array<Single_coment_type>,
    curent_post_id: string
}
const Coments: React.FC<ComentsType> = (props) => {
    const user_id = useSelector((state: Global_state_type) => {
        return state.profile.profile.id
    })
    const user_name = useSelector((state: Global_state_type) => {
        return state.profile.profile.user_name
    })

    let text = "";
    const get_text = (e: any) => {
        text = e.currentTarget.value;
    }
    const leave_coment = (e: any) => {
        Db_instance.add_coment(user_name, text, user_id, props.curent_post_id)
    }
    console.log(props.coments)
    return (
        <div className={style.coment_container}>
            <h3 className={style.h_coment}>Coments : </h3>
            {props.coments[0] === undefined ? <span>No coments yet ...</span> : <div>{
                props.coments.map((el) => {
                    return (

                        <>
                            <b>{el.coment_owner_name + ":"}</b>
                            <br />
                            <span>{el.coment_text}</span>
                            <hr></hr>
                            <br />

                        </>

                    )
                })}</div>}
            <div className={style.coment_text_area}>
                <textarea name="coments" id="" cols={30} rows={10} placeholder="Leave a coment now ..." onChange={get_text}></textarea>
                <button type="button" onClick={leave_coment}>Send</button>
            </div>

        </div>
    )
}

//Single opened post view component
type Showed_posts_props = {
    showed_post: Array<PostType>
    avatar: string | null | undefined,
    user_name: string | null | undefined
}
export const SinglePost: React.FC<Showed_posts_props> = (props) => {
    console.log(props.showed_post[0].coments)
    return (
        <div className={style.post_container}>
            <div className={styles.user_info}>
                <NavLink to="/me" className={style.navlink}>
                    <img src={props.avatar ? props.avatar : "#"} alt="" className={style.user_img} />
                </NavLink>
                <span className={style.span_name}>{props.user_name}</span>
            </div>
            <div className={style.post_info}>
                <span>{props.showed_post[0].post_text}</span>
                <span>{props.showed_post[0].likes + " " + "likes"}</span>
            </div>
            <Coments coments={props.showed_post[0].coments} curent_post_id={props.showed_post[0].id} />
            <img src={props.showed_post[0].post_img} alt="#" className={style.post_img}></img>


        </div>
    )
}

const MapStateToProps = (state: Global_state_type) => {
    return {
        showed_post: state.posts.showed_post,
        avatar: state.profile.profile.avatar,
        user_name: state.profile.profile.user_name
    }
}
const MapDispatchToProps = (dispatch: any) => {
    return {

    }
}
export const Show_post_container = connect(MapStateToProps, MapDispatchToProps)(SinglePost)
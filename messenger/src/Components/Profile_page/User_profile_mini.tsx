import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Global_state_type } from "../../Redux/Store";
import { UserType } from "../../Redux/Users_reducer";
import styles from "../../Styles/Profile_mini.module.css";
import { default_avatar } from "../My_profile/My_profile";


type Profile_mini_props_type = {
    avatar : string | null,
    fullName : string | null,
    isFollowed : boolean,
    goToProfile : (userID : string) => void,
    userID : string | null
}

export const Profile_mini : React.FC<Profile_mini_props_type> = (props) => {
    const history = useNavigate();
    console.log(props.fullName)
    const handler = () => {
        history("profile/id=" + props.userID)
    }
    console.log("RENDER \n" + props.userID )
    return (
        <section className={styles.profile_mini_container}>

            <img src={props.avatar ? props.avatar : default_avatar } onClick={handler} alt="#" className={styles.mini_avatar} />

            <h3>{props.fullName}</h3>
            {props.isFollowed ? <button type="button">Unfollow</button> : <button type="button">Follow</button>}
            <div className={styles.user_search_loader}></div>
        </section>
    )
};


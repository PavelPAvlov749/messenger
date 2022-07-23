import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";

import styles from "../../Styles/Profile.module.css";
import { getUserPage, UserType } from "../../Redux/Users_reducer";
import { Post } from "../Post/Post";
import { useLocation } from "react-router-dom";
import { Db_instance } from "../../DAL/Firebase_config";
import { connect } from "react-redux";
import { posts_actions } from "../../Redux/posts_reducer";


const default_avatar = "https://i.pinimg.com/736x/7a/30/23/7a3023ac2befeb804c3e5b90443379ed--fractal-logo-wireframe-design.jpg"
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
type UserPagePropsType = {
    userPage : UserType | null,
    getUserPage : (userID : string) => void,
    setShowedPost : (postID : string) => void
}
//USER info render component
const Information: React.FC<{user : UserType | null}> = (props) => {
    console.log(props.user?.status)
    const status = props.user?.status
    const user = useSelector((state:Global_state_type) => {
        return state.users.users
    })
    const Follow_user = () => {
        
    }
    console.log(user)
    return (
        <div className={styles.about_user}>
            <section className={styles.avatar}>
                <img src={Object.keys(user).length && user.avatar.length < 1 ? default_avatar : user.avatar} alt="#"></img>
            </section>
            <section className={styles.info}>
                <h2>{props.user?.fullName}</h2>
                <button type="button" className={styles.properties}>...</button>
                <br />
                <span>{props.user?.status}</span>
                <br />
                <span>{132 + "   "} yo</span>
                <br />
                <span>{" " + 1123 + "  "}followers</span>
                <br />
                <span>{" " + 938 + "   "} subscribers</span>
                <button type="button" onClick={Follow_user}>Follow</button>
            </section>
        </div>
    )
}
const UserPosts = React.memo<UserPagePropsType>((props) => {
    const[userPage,setUser] = useState(null);


    
    return (
        <div className={styles.User_posts}>

    </div>
    )
})
const UsersPage: React.FC<UserPagePropsType> = (props) => {
    const location = useLocation();
    const userID = location.pathname.split("=");
    console.log(userID[1])
    useEffect(()=> {
        console.log("USEE")
        props.getUserPage(userID[1]);
    },[])
    if(props.userPage !== null && Object.keys(props.userPage).length > 0){
        const posts = Object.values(props.userPage.posts).map((key:any) => {
            return key
        });

        return (
            <div className={styles.my_profile}>
                <Information user={props.userPage}/>
                <div className={styles.User_posts}>
                {posts.map((el) => {
                    return (
                        <Post post_img={el.post_img} post_text={el.post_text} id={el.id} set_showed_post={props.setShowedPost}/>
                    )
                })}
                </div>

            </div>
        )
    }else{
        return (
            <div className={styles.my_profile}>
                <Information user={props.userPage}/>
    
            </div>
        )
    }
}
const MapStateToProps = (state : Global_state_type) => {
    return {
        userPage : state.users.users,
    }
}
const MapDispatchToProps = (dispatch:any) => {
    return {
        getUserPage : (userID:string) => {
            dispatch(getUserPage(userID))
        },
        setShowedPost : (postID:string) => {
            dispatch(posts_actions.set_showed_post(postID))
        }
    }
}
export const UserPageContainer = connect(MapStateToProps,MapDispatchToProps)(UsersPage);
import React, { useState } from "react";
import { Link, NavLink, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { Firebase_instance } from "../../DAL/Firebase_config";
import { auth_actions, Log_out_thunk } from "../../Redux/auth_reducer";
import { connect } from "react-redux";
import { Db_instance } from "../../DAL/Firebase_config";
import { getUsersThunk } from "../../Redux/Users_reducer";
//IMPORTING INTERFACE ICONS
import style from "../../Styles/Navbar.module.css";
import chat_img from "../../Media/Chat.png";
import profile from "../../Media/Profile.png";
import home from "../../Media/Home.png"
import upload from "../../Media/Upload.png";
import logout_img from "../../Media/Logout.png";
import logo from '../../Media/logo2.jpg'
import { UsersType } from "../../Redux/profile_reducer";
import { UsersSearch } from "./Users_search";



type PropsType = {
    log_out: () => void,
    getUsers : (userName :string) => void
}
type userPageMiniPropsType = {
    fullName : string,
    status : string,
    avatar : string,
}
type userListPropsType = {
    users : Array<UsersType>
}
const userPageMini: React.FC<userPageMiniPropsType> = (props) => {
    const default_avatar = "";

    return (
        <>
            <NavLink to={"/"}>
                <img src={props.avatar ? props.avatar : default_avatar} alt="#" />
                <span>{props.fullName}</span>
                <span>{props.status}</span>
            </NavLink>

        </>
    )
}
const userList: React.FC<userListPropsType> = (props) => {
    return (
        <section className={style.user_list}>
            {props.users.map((user) => {
                return (
                    <div>
                    </div>
                )
            })}
        </section>
    )
}
export const Navbar: React.FC<PropsType> = React.memo((props) => {
    const userPage = useSelector((state:Global_state_type) => {
        return state.users.users
    })
    let [search_input,set_search_input] = useState(null)
    const location = useNavigate();
    const navihate_to_upload = () => {
        location("new_post")
    }
    const [onSearch, setOnSearch] = useState(false);
    let is_auth = useSelector((state: Global_state_type) => {
        return state.auth.is_auth
    })
    const logout = () => {
        props.log_out()
    }
    
    //Handler Functions
    const onUsersSearch = (e:any) => {
        set_search_input(e.currentTarget.value)
        props.getUsers(e.currentTarget.value);
        console.log(search_input)
    }
    
    return (
        <section className={style.navbar_container}>
            <div className={style.navbar}>
                <img src={logo} alt="" className={style.logo} />
                <UsersSearch getUsers={props.getUsers}/>
                <section className={style.navigation}>
                    <ul className={style.navigation_list}>
                        <li>
                            <NavLink to="/chat">
                                <img src={chat_img} alt="#"
                                    style={{

                                    }} onClick={() => {
                                    }} />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/me">
                                <img src={profile} alt="#" />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/news">
                                <img src={home} alt="" />
                            </NavLink>
                        </li>
                        <li>
                            <img src={upload} alt="" onClick={navihate_to_upload} />
                        </li>
                        <li>

                            {is_auth ? <img src={logout_img} alt="" onClick={logout} /> : null}
                        </li>
                    </ul>
                </section>
            </div>
            <hr style={{ "width": "900px", "marginTop": "0px" }} />
        </section>

    )
});
const MapStateToProps = (state: Global_state_type) => {
    return {
        user : state.users
    }
}
const MapDispatchToProps = (dispatch: any) => {
    return {
        log_out: () => {
            dispatch(Log_out_thunk());
        },
        getUsers : (userName : string) => {
            dispatch(getUsersThunk(userName))
        }
    }
}
export const Navbar_container = connect(MapStateToProps, MapDispatchToProps)(Navbar);
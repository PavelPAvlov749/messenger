import React from "react";
import { Link, NavLink,Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { Firebase_instance } from "../../DAL/Firebase_config";
import { auth_actions, Log_out_thunk } from "../../Redux/auth_reducer";
import { connect } from "react-redux";
//IMPORTING INTERFACE ICONS
import style from "../../Styles/Navbar.module.css";
import chat_img from "../../Media/Chat.png";
import profile from "../../Media/Profile.png";
import home from "../../Media/Home.png"
import upload from "../../Media/Upload.png";
import logout_img from "../../Media/Logout.png";
import logo from '../../Media/Logo.jpg'

type PropsType = {
    log_out: () => void
}

export const Navbar: React.FC<PropsType> = React.memo((props) => {

    const navihate_to_upload = () =>{

        return (
            <Navigate to="/new_post" replace></Navigate>
        )
    }
    let is_auth = useSelector((state: Global_state_type) => {
        return state.auth.is_auth
    })
    const logout = () => {
        props.log_out()
    }

    return (
        <div className={style.navbar}>
            <img src={logo} alt="" style={{
                "height" : "40px",
                "marginTop" : "10px",
                "display" : "inline",
                "left" : "20%",
                "position" : "absolute"
            }}/>
            <input placeholder="Search" style={{
                "marginTop" : "15px",
                "marginBottom" : "10px",
                "borderRadius": "5px",
                "display": "inline-block",
                "backgroundColor": "rgb(192, 201, 201)",
                "borderStyle": "none",
                "marginLeft" : "0%",
                "height": "30px",
                "width": "200px",
            }}></input>
            <ul style={{
                "height": "25px",

                "marginLeft": "20px",
                "display" : "inline-block",
                "marginTop" : "17px",
                "position" : "absolute"
            }}>


                <li>
                    <NavLink to="/chat">
                        <img src={chat_img} alt="#"
                            style={{
                                "width": "25px",
                                "height": "25px",
                                "marginLeft" : "10px",
                            }} onClick={() => {
                            }} />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/me">
                        <img src={profile} alt="#" style={{
                            "width": "25px",
                            "height": "25px",
                            "marginLeft" : "10px"
                        }} />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/news">
                        <img src={home} alt="" style={{
                            "width": "22px",
                            "height": "22px",
                            "marginLeft" : "10px"
                        }} />
                    </NavLink>
                </li>
                <li>
                    <img src={upload} alt="" style={{
                        "width": "22px",
                        "height": "22px",
                        "marginLeft" : "10px"
                    }} onClick={navihate_to_upload}/>
                </li>
                <li>

                    {is_auth ? <img src={logout_img} alt="" onClick={logout} style={{
                        "width": "22px",
                        "height": "22px",
                        "marginLeft" : "10px"
                    }} /> : null}
                </li>
            </ul>
            <hr />

        </div>
    )
});
const MapStateToProps = (state: Global_state_type) => {
    return {

    }
}
const MapDispatchToProps = (dispatch: any) => {
    return {
        log_out: () => {
            dispatch(Log_out_thunk());
        }
    }
}
export const Navbar_container = connect(MapStateToProps, MapDispatchToProps)(Navbar);
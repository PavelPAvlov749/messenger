import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import {Firebase_instance} from "../../DAL/Firebase_config";
import {auth_actions, Log_out_thunk} from "../../Redux/auth_reducer";
import { connect } from "react-redux";
import style from "../../Styles/Navbar.module.css";

type PropsType = {
    log_out : () => void
}

export const Navbar: React.FC<PropsType> = React.memo((props) => {


    let is_auth = useSelector((state:Global_state_type) => {
        return state.auth.is_auth
    })
    const logout = () => {
        props.log_out()
    }

    return (
        <div className={style.navbar}>
            <ul>
                <li>
                    <NavLink to="/chat">
                        <span>Chat</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/me">
                        <span>My profile</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/news">
                        <span>News</span>
                    </NavLink>
                </li>
                <li>
                {is_auth ?  <button type="button" onClick={logout}>log_out</button> : null }
                </li>
            </ul>
           
           
        </div>
    )
});
const MapStateToProps = (state:Global_state_type) => {
    return {
        
    }
}
const MapDispatchToProps = (dispatch:any) => {
    return {
        log_out : () => {
            dispatch(Log_out_thunk());
        }
    }
}
export const Navbar_container = connect(MapStateToProps,MapDispatchToProps)(Navbar);
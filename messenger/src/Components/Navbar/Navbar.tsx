import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import {Firebase_instance} from "../../DAL/Firebase_config";


type PropsType = {

}

export const Navbar: React.FC<PropsType> = (props) => {
    const logout = ()=> {
        Firebase_instance.sign_out()
    }
    return (
        <div className="navbar">
            <h2>Navbar</h2>
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
            </ul>
            <button type="button" onClick={logout}>log_out</button>
        </div>
    )
}
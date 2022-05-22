import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";


type PropsType = {

}

export const Navbar: React.FC<PropsType> = (props) => {
    
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
        </div>
    )
}
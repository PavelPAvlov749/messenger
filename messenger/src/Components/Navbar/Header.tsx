//React hooks imports
import React from "react";
import { connect } from "react-redux";
//IMPORTING INTERFACE ICONS
import logo from "../../../src/Media/Logo.jpg"
//Importing thunk Actions
import {getUsersThunk} from "../../Redux/Users_reducer";
import { Log_out_thunk } from "../../Redux/auth_reducer";
//Importing another React Components and types
import styles from "../../Styles/Header.module.css";
import { Global_state_type } from "../../Redux/Store";



type HeaderPropsType = {
    logOut : () => void,
    getUsers : (userName : string) => void
}

const Header :React.FC<HeaderPropsType> = React.memo((props) => { 
    return (
        <section className={styles.header_container}>
            <img src={logo} alt="" />
        </section>
    )
})

const MapStateToProps = (state:Global_state_type) => {
    return {

    }
};
const MapDispatchToProps = (dispatch :any) => {
    return {
        logOut : () => {
            dispatch(Log_out_thunk())
        },
        getUsers : (userName : string) => {
            dispatch(getUsersThunk(userName))
        }
    }
};

export const HeaderContainer = connect(MapStateToProps,MapDispatchToProps)(Header);
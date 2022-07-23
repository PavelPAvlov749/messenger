import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Global_state_type } from "../../Redux/Store";
import style from "../../Styles/Navbar.module.css";
import { default_avatar } from "../My_profile/My_profile";
import { Profile_mini } from "../Profile_page/User_profile_mini";
import { Formik, Field, Form } from "formik";


type UsersSearchPropsType = {
    getUsers: (fullName: string) => void
}

export const UsersSearch = React.memo<UsersSearchPropsType>((props) => {
    const userToSearch = "";
    const onSubmit = (e:any)=>{

    }
    //Get the finded userpage from state    
    const [user,set_user] = useState(null);

    const userPage = useSelector((state: Global_state_type) => {
        return state.users
    })
    const is_fetch = useSelector((state:Global_state_type) => {
        return state.app.is_fetch;
    })
    //Local state if ckicked set true
    const [onSearch, setOnSearch] = useState(false);

    const OnChangeHandler = (e: any) => {
        props.getUsers(e.currentTarget.value);
    }
    const UsetoProfile = (userID:string) => {
        const history = useNavigate();
        history(`/profile/id=${userID}`)
    }
    
    if (onSearch) {
        return (
            <div>
                <input placeholder={"Find user ..."} type="text" className={style.navbar_input} onFocus={() => {setOnSearch(true)}}
                  onChange={OnChangeHandler}></input>
                    {Object.keys(userPage.users).length ? <Profile_mini avatar={userPage.users.avatar} fullName={userPage.users.fullName} goToProfile={UsetoProfile}
                        isFollowed={false} userID={userPage.users.userID}/> : null}
                    {userPage ? <div className={style.users_search_loader}></div> : null}
            </div>
        )
    }else{
        return (
            <div className={style.users_search_input}>
                    <input placeholder="Find user ..." type="text" className={style.navbar_input}
                    onClick={() => { setOnSearch(true) }} onBlur={() => { setOnSearch(false) }} onChange={OnChangeHandler}></input>
            </div>

        )
    }

})
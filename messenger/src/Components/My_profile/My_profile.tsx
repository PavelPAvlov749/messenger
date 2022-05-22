import React, { useState } from "react";
import {Post} from "../Post/Post";

type PropsType = {

}
type StatusProps = {

}
type InfoPropsType = {
    age : number ,
    name : string ,
    number_of_subscribers : number,
    number_of_folowers : number,
    is_auth? : boolean
}

const Status : React.FC<StatusProps> = (props) => {
    let [is_status_edit,set_statis_edit] = useState(false);
    return (
        <div>
            <span>status</span>
        </div>
    )
}

const Information : React.FC<InfoPropsType> = (props) => {
    let [is_edit_on,set_edit] = useState(false);
    return (
        <div className="infirmation_user">
            <h2>{props.name}</h2>
            <span>{props.age} yo</span>
            <span>{props.number_of_folowers} followers</span>
            <span>{props.number_of_subscribers} subscribers</span>
        </div>
    )
}
const My_posts : React.FC<PropsType> = (props) => {
    return (
        <div className="my_posts">
            <hr></hr>
        </div>

    )
}

export const My_profile : React.FC<PropsType> = (props) => {
    const default_avatar = "https://i.stack.imgur.com/rYsym.png";
    const avatar = null;
    const set_avatar = () => {
        console.log("Setting avatar")
    }
    return (
        <div className="my_profile">
            <section className="avatar">
                <img src={avatar === null ? default_avatar : avatar} alt="#" onClick={set_avatar}></img>
            </section>
            <Status/>
            <Information age={20} name="Paul" number_of_folowers={167} number_of_subscribers={560}/>
        </div>

    )
}


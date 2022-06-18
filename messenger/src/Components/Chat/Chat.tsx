import React, { useEffect, useState } from "react";
import styles from "../../Styles/Chat.module.css";
import {Firestore_instance} from "../../DAL/Firestore_config";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import {profile_actions} from "../../Redux/profile_reducer";
import { startAfter } from "firebase/firestore";
import { connect } from "react-redux";
import {Send_message_thunk,Get_messages_thunk_2, Message_type} from "../../Redux/Chat_reducer";

type PropsType = {
    messages? : Message_type[],
    user_name? : string | null | undefined,
    user_id? : string | null | undefined,
    current_user_id? : string | null | undefined,
    get_messages : () => void,
    send_message : (_text:string | undefined ,user_id:string | undefined | null,sender:string | undefined|null) => void
}
const User_list = () => {
    return (
        <div className={styles.userlist}>

        </div>
    )
}

const Messages :React.FC<PropsType> = (props)=>{
    let messages = useSelector((state:Global_state_type) => {
        return state.chat.messages
    })
    let current_user_id = props.user_id;
    
    return (
        <div className={styles.messages} >

            {messages.length === 0 && messages === undefined ? null : 
            messages.map((el:Message_type)=>{
                return (
                    <Mesage message_text={el.message_text} message_status={el.message_status} 
                    sender={el.sender} user_id={el.user_id} current_user_id={current_user_id} createdAt={el.createdAt}/>
                )
            })}
        </div>

    )
}
const Mesage : React.FC<Message_type> = (props) => {
    
    return (
        <div className={props.user_id === props.current_user_id ? styles.current_user_message : styles.another_user_message}  >
            <b>
                {props.sender}
            </b>
            
            <span>{}</span>
            <br />
            {props.message_text === "" ? "Empty string" : props.message_text}
        </div>

    )
}

const Chat_input : React.FC<PropsType> = React.memo((props) =>{
    
    let [new_message,set_new_message] = useState("");
    let user_id = useSelector((state:Global_state_type) => {
        return state.profile.profile.id
    });
    let user_name = useSelector((state:Global_state_type) => {
        return state.profile.profile.user_name;
    });

    const send_message = function (){

        props.send_message(new_message,user_id,user_name)
        console.log(new_message);
        set_new_message("")
    }
    return (
        <div className={styles.message_input}>
        <div>
            <textarea name="message" id="message_form" title="message" className={styles.textarea}
                value={new_message}
                onChange={(e)=>{set_new_message(e.currentTarget.value)}}
            ></textarea>
        </div>
        <div>
            <button type="button" onClick={send_message}
                //Button should be disabled if webSocket is null(by default value) or web_socket has pending status
            >Send</button>
        </div>

    </div>
    )
})

export const Chat : React.FC<PropsType> = (props) => {
   useEffect(() => {
       props.get_messages()
   },[])

    return (
        <div className={styles.chat}>
            <User_list/>
            <Messages messages={props.messages} get_messages={props.get_messages} send_message={props.send_message}/>
            <Chat_input get_messages={props.get_messages} send_message={props.send_message}/>
        </div>
    )
}

const MapStateToProps = (state:Global_state_type) => {
    return {
        messages : state.chat.messages,
        user_name : state.profile.profile.user_name,
        user_id : state.profile.profile.id,
        current_user_id : state.profile.profile.id
    }
};
const MapDispatchToProps = (dispatch:any) => {
    return {
        get_messages : () => {
            dispatch(Get_messages_thunk_2())
        },
        send_message : (_text:string | undefined ,user_id:string | undefined | null,sender:string | undefined|null) => {
            dispatch(Send_message_thunk(_text,user_id,sender))
        }
    }
}

export const Chat_container = connect(MapStateToProps,MapDispatchToProps)(Chat);
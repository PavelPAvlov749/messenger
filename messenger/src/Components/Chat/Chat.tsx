import React, { useEffect, useState } from "react";
import styles from "../../Styles/Chat.module.css";
import {Firestore_instance} from "../../DAL/Firestore_config";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import {profile_actions} from "../../Redux/profile_reducer";
import {Get_messages_thunk} from "../../Redux/profile_reducer";
import { startAfter } from "firebase/firestore";
import { connect } from "react-redux";
import {Get_messages_thunk_2, Message_type} from "../../Redux/Chat_reducer";

type PropsType = {
    messages? : Message_type[],
    get_messages : () => void
}

const Messages :React.FC<PropsType> = (props)=>{
    let messages = useSelector((state:Global_state_type) => {
        return state.chat.messages
    })
    return (
        <div className={styles.messages}>

            {messages.length === 0 && messages === undefined ? null : 
            messages.map((el:Message_type)=>{
                return (
                    <Mesage message_text={el.message_text} message_status={el.message_status} 
                    sender={el.sender} user_id={el.user_id} createdAt={el.createdAt}/>
                )
            })}
        </div>

    )
}
const Mesage : React.FC<Message_type> = (props) => {

    console.log("SINGLE MESSAGE COMPOINENT")
    return (
        <div className={styles.message}>
            <b>
                {props.sender}
            </b>
            
            <br />
            {props.message_text === "" ? "Empty string" : props.message_text}
        </div>

    )
}

const Chat_input : React.FC<PropsType> = React.memo((props) =>{
    
    useEffect(() => {
        props.get_messages();
    })
    let [new_message,set_new_message] = useState("");
    let user_id = useSelector((state:Global_state_type) => {
        return state.profile.profile.id
    });
    let user_name = useSelector((state:Global_state_type) => {
        return state.profile.profile.user_name;
    });
    const send_message = function (){
        Firestore_instance.Send_message(new_message,user_name,user_id)
        console.log(new_message);
        set_new_message("")
    }
    return (
        <div>
        <div>
            <textarea name="message" id="message_form" cols={133} rows={10} title="message"
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
   
    console.log(props.messages)
    return (
        <div className={styles.chat}>
            <Messages messages={props.messages} get_messages={props.get_messages}/>
            <Chat_input get_messages={props.get_messages}/>
        </div>
    )
}

const MapStateToProps = (state:Global_state_type) => {
    return {
        messages : state.chat.messages
    }
};
const MapDispatchToProps = (dispatch:any) => {
    return {
        get_messages : () => {
            dispatch(Get_messages_thunk_2())
        }
    }
}

export const Chat_container = connect(MapStateToProps,MapDispatchToProps)(Chat);
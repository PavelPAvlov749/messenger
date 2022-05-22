import React, { useState } from "react";
import styles from "../../Styles/Chat.module.css";

type PropsType = {
    
}
type MessageType = {
    user_name: string,
    user_id?: number,
    message: string,
    avatar: string
};

const Messages :React.FC<PropsType> = (props)=>{
    const messages : Array<MessageType> = []
    return (
        <div className={styles.messages}>
            {messages.map((el)=>{
                return (
                    <Mesage avatar={el.avatar} message={el.message} user_name={el.user_name}/>
                )
            })}
        </div>

    )
}
const Mesage : React.FC<MessageType> = (props) => {
    return (
        <div className={styles.message}>
            <img src={props.avatar} alt="#" />
            <b>
                {props.user_name}
            </b>
            <br />
            {props.message}
            <hr></hr>
        </div>

    )
}

const Chat_input : React.FC<PropsType> = (props) =>{
    let [new_message,set_new_message] = useState("");

    const send_message = function (){
        
        console.log(new_message);
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
}

export const Chat : React.FC<PropsType> = (props) => {
    return (
        <div className={styles.chat}>
            <Messages/>
            <Chat_input/>
        </div>
    )
}
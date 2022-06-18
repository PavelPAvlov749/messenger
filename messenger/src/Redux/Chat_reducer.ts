import { ThunkAction } from "redux-thunk";
import { Global_state_type, InferActionType } from "./Store";
import { Firestore_instance } from "../DAL/Firestore_config";
import {get} from "firebase/database"

const SEND_MESSAGE = "messenger/chat_reducer/send_message";
const GET_MESSAGES = "messenger/chat_reducer/get_messages";

type ActionType = InferActionType<typeof chat_actions>
type Thunk_type = ThunkAction<void,Global_state_type,unknown,ActionType>
export type Message_type = {
    createdAt: typeof Date | null,
    message_status?: string,
    message_text?: string,
    sender?: string,
    user_id?: string,
    current_user_id? : string | null | undefined,
}

let initial_state = {
    messages : [] as Message_type[],
}

export const chat_reducer = (state = initial_state,action:ActionType) => {
    switch(action.type){
        case GET_MESSAGES : {
            return {
                ...state,
                messages: [...action.payload._messages]
            }
        }
        case SEND_MESSAGE : {
            return {
                ...state,
            }
        }
        default : 
            return state
    }
};

export const chat_actions = {
    send_message : (_text :String) => ({
        type : "messenger/chat_reducer/send_message",
        payload : _text
    } as const),
    get_messages : (_messages : any) => ({
        type : "messenger/chat_reducer/get_messages",
        payload : {_messages}
    } as const)
}

export const Get_messages_thunk_2 = ():Thunk_type => {
    return async function (dispatch) {
        let messages = await Firestore_instance.Get_collection_once().then((res) => {
            dispatch(chat_actions.get_messages(res))
        })
        
    }
}
export const Send_message_thunk = (_Text:string | undefined,user_id:string | undefined | null,Sender:string | undefined|null):Thunk_type => {
    return async () => {
        Firestore_instance.send_message(_Text,user_id,Sender)
    }
}

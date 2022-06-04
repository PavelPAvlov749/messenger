import {applyMiddleware,combineReducers} from "redux";
import { legacy_createStore as createStore} from 'redux'
import configureStore from "redux"
import thunk from "redux-thunk";
import { compose } from "redux";
import {app_reducer} from "../Redux/app_reducer";
import {auth_reducer} from "../Redux/auth_reducer";
import { Profile_reducer } from "./profile_reducer";
import { chat_reducer } from "./Chat_reducer";
import {posts_reducer} from "./posts_reducer";



let reducers = combineReducers({
    app : app_reducer,
    auth : auth_reducer,
    profile : Profile_reducer,
    chat : chat_reducer,
    posts : posts_reducer
})

type PropertieTypes<T> = T extends {[key:string]:infer U} ? U : never;
export type InferActionType<T extends {[key:string]: (...args:any)=> any}> = ReturnType<PropertieTypes<T>>;
//Type of global reducer
type Root_reducer_type = typeof reducers;
//Recieving a state type from ReturnType from Root_reducer
export type Global_state_type = ReturnType<Root_reducer_type>;


export const store = createStore(reducers,applyMiddleware(thunk));



//@ts-ignore
window.store = store;



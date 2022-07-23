import { Action } from "redux";
import { PostType } from "../Components/Post/Posts_types";
import { Db_instance } from "../DAL/Firebase_config";
import { app_actions } from "./app_reducer";
import { Thunk_type } from "./auth_reducer";
import { Current_ProfileType, UsersType } from "./profile_reducer";
import { InferActionType } from "./Store";

const GET_USERS = "messenger/Users_reducer/get_users";

export type UserType = {
    fullName : string ,
    avatar : string,
    posts : Array<PostType>,
    status : string | null,
    userID : string | null
}

type ActionType = InferActionType<typeof users_actions>

const initial_state = {
   users : {} as unknown as UserType,
   userSearchFilter : null as unknown as string
}

export const Users_reducer = (state = initial_state,action :ActionType) => {
    switch(action.type){
        case  GET_USERS : {
            return {
                ...state,
                users : {...{...action.payload}}
            }
        }
        default : return state
    }
}

export const users_actions = {
    get_users : (user : UserType) => ({
        type : "messenger/Users_reducer/get_users",
        payload : user
    } as const ),
}

export const getUsersThunk = (fullName : string) :Thunk_type => {
    return async function (dispatch : any) {
        try{
            dispatch(app_actions.set_is_fetch_true())
            Db_instance.get_users(fullName).then((user) => {
                    if(user === null){
                        dispatch(users_actions.get_users(null as unknown as UserType))
                        dispatch(app_actions.set_is_fetch_fasle())
                    }else{
                        console.log(user);
                        const userPage = Object.values(user);
                        dispatch(users_actions.get_users(userPage[0] as UserType))
                        dispatch(app_actions.set_is_fetch_fasle())
                    }
                    
            }).then(() => {
                dispatch(app_actions.set_is_fetch_fasle())
            }).catch((ex) => {
                throw new Error(ex)
            })
        }catch(ex){
            console.error(ex)
        }
    }
}

export const getUserPage = (userID:string) :Thunk_type => {
    return async function (dispatch:any) {
        const userPage = Db_instance.get_user_page_by_id(userID).then((response) => {
            console.log(response.val())
            // const userPage = {
            //     fullName : response.val().fullName ,
            //     avatar : response.val().avatar,
            //     posts : Object.keys(response.val().coments).map((key) => response.val().posts[key]),
            //     status : response.val().status,
            //     userID : response.val().userID
            // }
            if(response === null) {
                console.log("NULL REPONSE!")
            }else{
                dispatch(users_actions.get_users(response.val()))
            }
            
        })

    }
}
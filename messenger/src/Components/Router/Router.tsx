//REACT IMPORTS
import e from "express";
import React from "react";
import { BrowserRouter,Navigate,Route,Routes } from "react-router-dom";
//IMPORTING COMPONETNS
import { Chat_container } from "../Chat/Chat";
import { Login_container } from "../Login/Login";
import { My_profile_container } from "../My_profile/My_profile";
import { New_post_page } from "../Post/New_post";
import { SinglePost } from "../Post/Show_post";
import { Show_post_container } from "../Post/Show_post";

//PATH ROUTES CONSTANTS 
const LOGIN = "/login"
const ME = "/me"
const CHAT = "/chat"
const USERS = "/users"
const NEWS = "/news"
const USER_PROFILE = "/profile/:id"
const no_match_route = "*"
const NEW_POST = "/new_post"
const POST = "/post/:id"


//                                             ...................TYPES......................
//Types for routes array (object containing properties path(string) and React element coresponding to current path)
type RouteType = {
    path : string,
    element : React.ReactElement
}
//Types for Router component props
type RouterProps = {
    is_auth : boolean
}

//                                             ...................ROUTES.....................
//Routes available for any user
const PUBLICK_ROUTES : Array<RouteType>= [
    {
        path : LOGIN,
        element : <Login_container/>
    },
    {
        path : no_match_route,
        element : <Navigate to="/login" replace/>
    }
]
//Routes available only for authorized users
const PRIVATE_ROUTES = [
    {
        path: POST,
        element : <Show_post_container/>
    },
    {
        path: NEW_POST,
        element : <New_post_page/>
    },
    {
        path: LOGIN,
        element : <Navigate to="/me" replace/>
    },
    {
        paht : NEWS,
        element : null
    },
    {
        path : USERS,
        element : null
    },
    {
        path : ME,
        element : <My_profile_container/>
    },
    {
        path : CHAT,
        element : <Chat_container/>
    },
]


//                                           ...................ROUTER COMPONENT.................
//If props.is_auth equals true returns PRIVATE_ROUTES otherwise PUBLIC_ROUTES
//Iterates over an Array og Routes and cals element coresponding to path with Array.map() function
export const Router : React.FC<RouterProps> = (props) => {
    
    if(props.is_auth){
        return (
            <Routes>
                {PRIVATE_ROUTES.map((el) => {
                    return (
                        <Route path={el.path} element={el.element} key={el.paht}/>
                    )
                })}
            </Routes>
        )
    }else {
        return (
            <Routes>
                {PUBLICK_ROUTES.map((el)=> {
                    return (
                        <Route path={el.path} element={el.element} key={el.path}/>
                    )
                })}
            </Routes>
        )
    }
}
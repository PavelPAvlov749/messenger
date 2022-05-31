//REACT IMPORTS
import React from "react";
import { BrowserRouter,Navigate,Route,Routes } from "react-router-dom";
//IMPORTING COMPONETNS
import { Chat } from "../Chat/Chat";
import { Login_container } from "../Login/Login";
import { My_profile } from "../My_profile/My_profile";

//PATH ROUTES CONSTANTS 
const LOGIN = "/login"
const ME = "/me"
const CHAT = "/chat"
const USERS = "/users"
const NEWS = "/news"
const USER_PROFILE = "/profile/:id"
const no_match_route = "*"


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
        paht : NEWS,
        element : null
    },
    {
        path : USERS,
        element : null
    },
    {
        path : ME,
        element : <My_profile/>
    },
    {
        path : CHAT,
        element : <Chat/>
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
                        <Route path={el.path} element={el.element}/>
                    )
                })}
            </Routes>
        )
    }else {
        return (
            <Routes>
                {PUBLICK_ROUTES.map((el)=> {
                    return (
                        <Route path={el.path} element={el.element}/>
                    )
                })}
            </Routes>
        )
    }
}
//Importing styles
import './App.css';
//REACT IMPORTS
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
//Importing Firebase instance witch contains all Firebase data access functions 
import { Firebase_auth, Firebase_instance } from './DAL/Firebase_config';
import { onAuthStateChanged } from 'firebase/auth';
//Importing React Components
import { Login_container } from './Components/Login/Login';
import { Navbar_container } from './Components/Navbar/Navbar';
import { Chat } from './Components/Chat/Chat';
import { My_profile } from './Components/My_profile/My_profile';
//Importing redux action creators and Thunk-creators
import { Get_auth } from './Redux/auth_reducer';
import { auth_actions } from './Redux/auth_reducer';
import { app_actions } from './Redux/app_reducer';
//Import for Application Router
import { Router } from './Components/Router/Router';
//Importing Global state type
import { Global_state_type } from './Redux/Store';
//Redux,React-Redux impoirts
import { connect } from 'react-redux';

//Types for main Application component props

type AppPropsType = {
  is_auth: boolean,
  auth_token: string | undefined,
  is_init: boolean,
  init: (_is_init: boolean) => void,
  get_auth: () => void
}

//                          ..........................Main Component App ............................
const App: React.FC<AppPropsType> = function (props) {
  const dispatch = useDispatch();
  //Function observer is user authorized
  //If user was authirized set is_auth true in the state if not set is_state fasle
  //Also set auth token to the state
  //If is_auth false App component will return Login_container component
  const checkAuthState = async () => {
    onAuthStateChanged(Firebase_auth,(user) => {
      if(user){
        dispatch(auth_actions.set_auth_true())
      }else{
        dispatch(auth_actions.set_auth_false())
      }
    })
  }
  checkAuthState();

  if (props.is_auth) {
    return (
      <div className='App'>
        <BrowserRouter>
          <Navbar_container />
          <Routes>
            <Route path='/me' element={<My_profile />}></Route>
            <Route path='/chat' element={<Chat />} />
            <Route path="*" element={<My_profile />}></Route>
          </Routes>
        </BrowserRouter>

      </div>
    )
  } else {
    return (
      <div className='App'>
        <BrowserRouter>
          <Navbar_container />
          <Login_container />
        </BrowserRouter>
      </div>
    )
  }
}

const MapStateToProps = (state: Global_state_type) => {
  return {
    is_auth: state.auth.is_auth,
    auth_token: state.auth.auth_token,
    is_init: state.app.is_initialize
  }
}
const MapDispatchToProps = (dipsatch: any) => {
  return {
    init: (_is_init: boolean) => {
      dipsatch(app_actions.init(_is_init))
    },
    get_auth: () => {
      dipsatch(Get_auth());
    }
  }
}

export const App_container = connect(MapStateToProps, MapDispatchToProps)(App);

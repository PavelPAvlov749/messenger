import React from 'react';
import logo from './logo.svg';
import './App.css';

//REACT IMPORTS
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Navbar_container } from './Components/Navbar/Navbar';
import { Chat } from './Components/Chat/Chat';
import { Login } from './Components/Login/Login';
import { My_profile } from './Components/My_profile/My_profile';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { Router } from './Components/Router/Router';
import { Global_state_type } from './Redux/Store';
import { Firebase_instance } from './DAL/Firebase_config';
import { auth_actions } from './Redux/auth_reducer';
//Importing React Components
import { Login_container } from './Components/Login/Login';




export const App_2 = () => {
  const is_auth = useSelector((state: Global_state_type) => {
    return state.auth.is_auth 
  })

  return (is_auth ?
    <div className='App'>
      <BrowserRouter>
        <h1>WORKS</h1>
        <Navbar_container/>
        <Router is_auth={is_auth} />
      </BrowserRouter>
    </div> :
    <div className='App'>
      <Navbar_container/>
      <Login_container />
    </div>
  )
}

const App: React.FC = function () {
  const dispatch = useDispatch();
  const inittialize = async () => {
    const user = await Firebase_instance.get_current_user().then((response) => {
      if(response !== null && response !== undefined){
        dispatch(auth_actions.set_auth_true());
      }else{
        dispatch(auth_actions.set_auth_false());
      }
    });
  }
  inittialize();
  //Getter for user only for debugging, delete later
  const get_user = async () => {
    await Firebase_instance.get_current_user().then((response) => {
      console.log(response)
    })
  }
  const is_auth = useSelector((state: Global_state_type) => {
    return state.auth.is_auth
  })
  console.log(is_auth);
  if (is_auth) {
    return (
      <div className='App'>
        <BrowserRouter>
          <Navbar_container/>
          <Router is_auth={is_auth}></Router>
          <button type='button' onClick={get_user}>Get</button>
        </BrowserRouter>
      </div>
    )
  } else {
    return (
      <div className='App'>
        <BrowserRouter>
          <Navbar_container/>
          <Router is_auth={is_auth}></Router>
          <button type="button" onClick={get_user}>Get</button>

        </BrowserRouter>
      </div>
    )
  }
}

export default App;

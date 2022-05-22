import React from 'react';
import logo from './logo.svg';
import './App.css';

//REACT IMPORTS
import { BrowserRouter, Navigate, Route, Routes,Redirect } from "react-router-dom";
import { Navbar } from './Components/Navbar/Navbar';
import { Chat } from './Components/Chat/Chat';
import { Login } from './Components/Login/Login';
import { My_profile } from './Components/My_profile/My_profile';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { Router } from './Components/Router/Router';




export const App_2 = () => {
  const is_auth = useSelector((state) => {
    return state.auth.is_auth
  })
  return ( is_auth ? 
    <div className='App'>
      <BrowserRouter>
        <h1>WORKS</h1>
        <Navbar></Navbar>
        <Router is_auth={is_auth}/>
      </BrowserRouter>
    </div> : 
    <div className='App'>
      <Login/>
    </div>
  )
}

export const Main_page = function (props) {
  
  return (
    <div>
      <h2>Main Page</h2>
    
    </div>
  )
}


function App() {


    return (
      <div className='App'>
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path='/chat' element={<Chat/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path='/me' element={<My_profile/>}/>

            <Route path='*' element={<Navigate to="/" replace/>}/>
          </Routes>
        </BrowserRouter>
      </div>)

}

export default App;

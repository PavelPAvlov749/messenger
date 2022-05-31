//Importing styles
import './App.css';
//REACT IMPORTS
import { BrowserRouter, Route, Routes } from "react-router-dom";
//Importing Firebase instance witch contains all Firebase data access functions 
import { Firebase_auth, Firebase_instance } from './DAL/Firebase_config';
//Importing React Components
import { Login_container } from './Components/Login/Login';
import { Navbar_container } from './Components/Navbar/Navbar';
import { Chat } from './Components/Chat/Chat';
import { My_profile } from './Components/My_profile/My_profile';
//Importing redux action creators and Thunk-creators
import { app_actions } from './Redux/app_reducer';
import { CheckAuthState } from './Redux/auth_reducer';
import { initialize } from './Redux/app_reducer';
//Import for Application Router
import { Router } from './Components/Router/Router';
//Importing Global state type
import { Global_state_type } from './Redux/Store';
//Redux,React-Redux impoirts
import { connect } from 'react-redux';
//IMPORTING PRELOADER
import {Preloader} from "./Components/Preloader/Preloader";

//Types for main Application component props

type AppPropsType = {
  is_auth: boolean,
  auth_token: string | undefined,
  is_init: boolean,
  init: () => void,
  Get_auth_Thunk : () =>  void
}

//                          ..........................Main Component App ............................
const App: React.FC<AppPropsType> = function (props) {
  //Function observer is user authorized
  //If user was authirized set is_auth true in the state if not set is_state fasle
  //Also set auth token to the state
  //If is_auth false App component will return Login_container component this function comes from auth reducer and user Firebase_instance function "Get_auth"

  props.Get_auth_Thunk();
  const get_user = async () => {
    await Firebase_instance.get_current_user().then((user) => {
      console.log(user)
      console.log("Button")
    })
    
  }
  if (props.is_init) {
    return (
      <div className='App'>
        <BrowserRouter>
          <Navbar_container />
          <Router is_auth={props.is_auth}/>
          <button type='button' onClick={get_user}>Get user</button>
        </BrowserRouter>

      </div>
    )
  } else {
    return (
      <div className='App'>
        <BrowserRouter>
          <Preloader/>
        </BrowserRouter>
      </div>
    )
  }
}

const MapStateToProps = (state: Global_state_type) => {
  return {
    is_auth: state.auth.is_auth,
    auth_token: state.auth.auth_token,
    is_init: state.auth.is_initialize
  }
}
const MapDispatchToProps = (dipsatch: any) => {
  return {
    init: () => {
      dipsatch(initialize())
    },
    Get_auth_Thunk : () => {
      dipsatch(CheckAuthState())
    }
  }
}

export const App_container = connect(MapStateToProps, MapDispatchToProps)(App);

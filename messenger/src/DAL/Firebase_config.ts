
//...............................HERE IS THE FIREBASE IMPORTS>>>>>>>>>>>>>>
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
//Firebase hooks 
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore"
import {
    getAuth,
    signOut,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signInWithCredential,
} from "firebase/auth";
import { Provider } from "react-redux";
import { auth_actions } from "../Redux/auth_reducer";
import { useDispatch } from "react-redux";
import { profile_actions } from "../Redux/profile_reducer";
import { async } from "@firebase/util";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { getDatabase,set,onValue,ref } from "firebase/database";


//Here is the config file of Firebase SDK to allow the functions use Firebase_instance object

export const firebaseConfig = {
    apiKey: "AIzaSyBZoW7Tcp26aJ_7_zDEuMO9hDUzfiJxv8M",
    authDomain: "messenger-40cc4.firebaseapp.com",
    projectId: "messenger-40cc4",
    storageBucket: "messenger-40cc4.appspot.com",
    messagingSenderId: "856002256521",
    appId: "1:856002256521:web:0be5cbb812449f12b93058"
    
};

//Firebase auth type
type AuthType = typeof Firebase_auth;

//Initializing the Firebase instance and creating Firebase auth object then initializing GoggleAuthProvider Object
//Firebase instance
export const firebase = initializeApp(firebaseConfig);


//Initialize Real-time data base instance 
const dataBase = getDatabase();
console.log(dataBase)
export const writeUserData = async function () {
    const refrence = await  ref (dataBase);
    onValue(refrence,(snap)=>{
        const data = snap.val();
        console.log(data)
    })
}
//Firebase auth instance
//Firebase instance gigiving the acsess to all user auth pearametrs and functions and configs

export const Firebase_auth = getAuth();
//Google Provider
export const google_provider = new GoogleAuthProvider();
//Sign in instanse will be need foe auth with login and password (NOT GOOGLE!)
const Sign_in = signInWithEmailAndPassword;
console.log(Firebase_auth.currentUser)

//Custom Firebsae instance object withc is contains all auth functions in the app
export const Firebase_instance = {
    sign_out: (_dispatch:any) => {
        signOut(Firebase_auth).then((response) => {
            _dispatch(auth_actions.set_auth_false())
            return response;
        }).catch((error) => {
            console.log("ERROR WHILE SIGING OUT " + error)
        })
    },
    create_user: (_auth: AuthType, _email: string, _password: string) => {
        createUserWithEmailAndPassword(Firebase_auth, _email, _password).then((response) => {
            console.log(response);
            return response;
        })
    },
    login_with_popup: async () => { 
        await signInWithPopup(Firebase_auth,google_provider).then((result) =>{
            let credential = GoogleAuthProvider.credentialFromResult(result);
            let auth_token = credential?.accessToken;
            let user = result.user;
            console.log(user)
            return user
        }).catch((error) => {
            const error_code = error.code;
            console.log("SOME ERROR OCCURED" + error);
        })
        
    },
    get_current_user : async () => {
       const user = await Firebase_auth.currentUser;
       return user
    },
    Get_auth_state : onAuthStateChanged
}
//Sign with PopUp response type uses in auth reducer
export type Login_response_type = {
    user? : {
        displayName : string | null,
        user_id : string,
        email : string | null,
        is_Anonymous : boolean,
        emailVerified : boolean,
        phoine : number | null,
        photoURL : string | null,
        last_sign_in_time : string | undefined
    },
    auth_token? : string | undefined
}


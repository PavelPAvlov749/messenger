import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
} from "firebase/auth";


//Here is the config file of Firebase SDK to allow the functions use Firebase_instance object
const firebaseConfig = {
    apiKey: "AIzaSyBZoW7Tcp26aJ_7_zDEuMO9hDUzfiJxv8M",
    authDomain: "messenger-40cc4.firebaseapp.com",
    projectId: "messenger-40cc4",
    storageBucket: "messenger-40cc4.appspot.com",
    messagingSenderId: "856002256521",
    appId: "1:856002256521:web:0be5cbb812449f12b93058"
};

const firebase = initializeApp(firebaseConfig);


const Firebase_auth = getAuth();
const Sign_in = signInWithEmailAndPassword;
type AuthType = typeof Firebase_auth;
const user_1 = Firebase_auth.currentUser
console.log(user_1)
export const Firebase_instance = {
    sign_in: (_email: string, _password: string) => {
        Sign_in(Firebase_auth, _email, _password).then((response) => {
            console.log(response)
            return response
        })
    },
    sign_out: () => {
        signOut(Firebase_auth).then((response) => {
            console.log(response);
            return response;
        })
    },
    create_user: (_auth: AuthType, _email: string, _password: string) => {
        createUserWithEmailAndPassword(Firebase_auth, _email, _password).then((response) => {
            console.log(response);
            return response;

        })
    },
    login_with_popup: async () => {
        const provider = new GoogleAuthProvider();
        const user_1 = Firebase_auth.currentUser
        console.log(user_1)

        const { user } = await signInWithPopup(Firebase_auth, provider).then((response) => {
            console.log(response)
            return response;
        })

        return (user)
    }
}

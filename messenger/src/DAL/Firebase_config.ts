
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
import { auth_actions } from "../Redux/auth_reducer";
import { collection, getDocs, getFirestore, query, snapshotEqual } from "firebase/firestore";
import { getDatabase, set, onValue, ref, child ,get,push,update} from "firebase/database";
import { useDispatch } from "react-redux";


//                                                ::::::::::::::::::::::CONFIG THE FIREBASE::::::::::::::::::::::::::

//Here is the config file of Firebase SDK to allow the functions use Firebase_instance object
export const firebaseConfig = {
    apiKey: "AIzaSyBZoW7Tcp26aJ_7_zDEuMO9hDUzfiJxv8M",
    authDomain: "messenger-40cc4.firebaseapp.com",
    projectId: "messenger-40cc4",
    storageBucket: "gs://messenger-40cc4.appspot.com",
    messagingSenderId: "856002256521",
    databaseURL: "https://messenger-40cc4-default-rtdb.europe-west1.firebasedatabase.app/",
    appId: "1:856002256521:web:0be5cbb812449f12b93058",

};


//Initializing the Firebase instance and creating Firebase auth object then initializing GoggleAuthProvider Object
//Firebase instance
export const firebase = initializeApp(firebaseConfig);


//Initialize Real-time data base instance 
const dataBase = getDatabase(firebase);
const firestore = getFirestore(firebase)

//Firebase auth instance
//Firebase instance gigiving the acsess to all user auth pearametrs and functions and configs
export const Firebase_auth = getAuth();

//Google Provider
export const google_provider = new GoogleAuthProvider();

//Sign in instanse will be need for auth with login and password (NOT GOOGLE!)
const Sign_in = signInWithEmailAndPassword;

//                                                                ............TYPES............
//Firebase auth type
type AuthType = typeof Firebase_auth;
//Sign with PopUp response type uses in auth reducer
export type Login_response_type = {
    user?: {
        displayName: string | null,
        user_id: string,
        email: string | null,
        is_Anonymous: boolean,
        emailVerified: boolean,
        phoine: number | null,
        photoURL: string | null,
        last_sign_in_time: string | undefined
    },
    auth_token?: string | undefined
}


//                                                              .............INSTANCE............

//Instance of Firebase realtime database with contains in self all methods for detch or add data in database
export const Db_instance = {
    get_posts: async () => {
        //Get the refrence of db
        //First argument is the Firebase database instance
        //Second argument is the path to collection tah we need
        const post_ref = await ref(dataBase, "Posts/");
        const posts = await onValue(post_ref,(snap) => {
            const data = snap.val();
        })

        return posts;
    },
    get_posts_2 : async (user_id:string | null | undefined) => {
        const Db_ref = ref(getDatabase());
        const posts : Array<any> = [];
        await get(child(Db_ref,"Users/" + user_id + "/posts/")).then((snap) =>{
            snap.forEach((el) => {
                posts.push({
                    creator : el.val().creator,
                    id : el.val().id,
                    likes_count : el.val().likes_count,
                    post_text : el.val().post_text,
                    createdAt : el.val().createdAt,
                    coments : Object.keys(el.val().coments).map((key) => el.val().coments[key]),
                    post_img : el.val().post_img
                });
                posts.reverse()
            })
        })
        return posts
    },
    add_posts : async (_text:string,_img:string,_creator :string | null | undefined,_user_id:string | null | undefined) => {
        const Db_ref = getDatabase();
        const new_post_key = push(child(ref(Db_ref),"Users" + _user_id + "/posts/")).key;
        const post_data = {
            post_text : _text,
            post_img : _img,
            creator : _creator,
            likes_count : 0,
            createdAt : new Date().getUTCDate(),
            id : new_post_key,
            coments : {
                coment : ""
            }
        }
        const updates : any = {};
        updates[`Users/` + _user_id + "/posts/" + new_post_key] = post_data;
        return update(ref(Db_ref),updates);
        
    },
    delete_post : async (_post_id :number) => {

    },
    edit_post : (post_id:string,_text:string,_img:string) => {
        
    },
    get_status : async (_user_id : string | null | undefined) => {
        const Db_ref = ref(getDatabase());
        let status = await get(child(Db_ref,"Users/" + _user_id + "/status/status/")).then((snap) => {
            return snap.val()
        })
        return status
    },
    update_status : async (_user_id :string,status:string) => {
        const Db_ref = getDatabase();
        const status_data = {
            status : status
        }
        const updates : any = {};
        updates["Users/" + _user_id + "/status/"] = status_data;
        return update(ref(Db_ref),updates);
    },
    add_coment : async (user_name:string | null | undefined,_coment_text:string,user_id:string,post_id:string) => {
        const Db_ref = getDatabase();
        const coment_data = {
            coment_text : _coment_text,
            coment_owner_name: user_name,
            date : new Date().getUTCDate()
        };
        const makeid = (length:number) => {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
              result += characters.charAt(Math.floor(Math.random() *
         charactersLength));
           }
           return result;
        }
        const coment_id = makeid(9);
        const updates : any = {};
        updates["Users/" + user_id + "/posts/" + post_id + "/coments/" + coment_id] = coment_data;
        return update(ref(Db_ref),updates); 
    }
}
Db_instance.get_posts();


//Custom Firebsae instance object withc is contains all auth functions in the app
export const Firebase_instance = {
    sign_out: (_dispatch: any) => {
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
        await signInWithPopup(Firebase_auth, google_provider).then((result) => {
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
    get_current_user: async () => {
        const user = await Firebase_auth.currentUser;
        return user
    },
    Get_auth_state: onAuthStateChanged
}

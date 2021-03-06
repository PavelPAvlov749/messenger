import { Action } from "redux";
import { InferActionType } from "./Store";
import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { Global_state_type } from "../Redux/Store";
import { Firebase_instance } from "../DAL/Firebase_config";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { google_provider } from "../DAL/Firebase_config";
import { Firebase_auth } from "../DAL/Firebase_config";
import { signOut } from "firebase/auth";
import { app_actions } from "./app_reducer";
import { initialize } from "./app_reducer";
import { Firebas_auth } from "../DAL/Firebase_auth";
import { getDatabase, ref, get ,update} from "firebase/database";



//Creating a type for auth_reducer action creator functions
export type Action_Type = InferActionType<typeof auth_actions>;
export type Dispatch_type = Dispatch<Action_Type>;
export type Thunk_type = ThunkAction<void, Global_state_type, unknown, Action_Type>;

export type CommonThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, Global_state_type, unknown, Action_Type>;


const SET_AUTH_TRUE = "messenger/auth_reducer/set_true";
const SET_AUTH_FALSE = "messenger/auth_reducer/set_false";
const SET_TOKEN = "messenger/auth_reducer/set_token";
const IS_INITIALIZE = "messenger/auth_reducer/initialize";
const CREATE_USER = "messenger/auth_reducer/create_user";

let initial_state: initial_state_type = {
    is_auth: false,
    auth_token: "",
    is_initialize: false,
    user_id: undefined
}
type initial_state_type = {
    is_auth: boolean,
    auth_token?: string | undefined,
    is_initialize: boolean,
    user_id?: string | undefined
}

export const auth_reducer = (state = initial_state, action: Action_Type) => {
    switch (action.type) {
        case CREATE_USER: {
            return {
                ...state,
                user_id: action.payload
            }
        }
        case IS_INITIALIZE: {
            return {
                ...state,
                is_initialize: true
            }
        }
        case SET_AUTH_TRUE: {
            return {
                ...state,
                is_auth: true
            }
        }
        case SET_AUTH_FALSE: {
            return {
                ...state,
                is_auth: false
            }
        }
        case SET_TOKEN: {
            return {
                ...state,
                auth_token: action.payload
            }
        }
        default:
            return state
    }
};

export const auth_actions = {
    set_auth_true: () => ({
        type: "messenger/auth_reducer/set_true",
        payload: true
    } as const),
    set_auth_false: () => ({
        type: "messenger/auth_reducer/set_false",

    } as const),
    set_auth_token: (_token: string) => ({
        type: "messenger/auth_reducer/set_token",
        payload: _token
    } as const),
    initialize: () => ({
        type: "messenger/auth_reducer/initialize"
    } as const),
    create_user: (_user_id: string) => ({
        type: "messenger/auth_reducer/create_user",
        payload: _user_id
    } as const)
}

//Thunk creators to log in
//Thunk for Signing in with Firebase GooglePopUp
export const Sign_in_with_pop_up = (): Thunk_type => {
    return async function (dispatch: any) {
        await signInWithPopup(Firebase_auth, google_provider).then((response) => {
            const db_ref = getDatabase();
            const user_ref = ref(db_ref, "Users/" + Firebase_auth.currentUser?.uid);
            get(user_ref,).then((response) => {
                if(response.val() === null || response.val() === undefined){
                    console.log("ADDING NEW USER")
                    const new_user = {
                        fullName : Firebase_auth.currentUser?.displayName,
                        posts : {},
                        status : null,
                        foloowers : {},
                        subscribes : {},
                        userID : Firebase_auth.currentUser?.uid,
                        avatar : Firebase_auth.currentUser?.photoURL
                    };
                    const updates :any = {};
                    updates["Users/" + Firebase_auth.currentUser?.uid] = new_user;
                    return update(ref(db_ref), updates);
                }
            })


            let credential = GoogleAuthProvider.credentialFromResult(response);
            let auth_token = credential?.accessToken;
            if (auth_token?.length) {
                dispatch(auth_actions.set_auth_token(auth_token))
                dispatch(auth_actions.set_auth_true());
            } else {
                dispatch(auth_actions.set_auth_token(""))
            }

        }).catch((error) => {
            const error_code = error.code;
            console.error("SOME ERROR OCCURED : " + error);
        })
    }
}
//LOGGING OUT : 
export const Log_out_thunk = (): Thunk_type => {
    return async (dispatch) => {
        await signOut(Firebase_auth).then((response) => {
            console.log("LOG_OUT")
            dispatch(auth_actions.set_auth_false());
            dispatch(auth_actions.set_auth_token(""));
        }).catch((error) => {
            const error_code = error.code;
            console.error("ERROR WHILE SIGNING OUT ERROR CODE IS : " + error_code)
            console.error("ERROR TEXT : " + error);
        })
        dispatch(auth_actions.set_auth_false())


    }
}
//GET AUTH STATE :

export const CheckAuthState = (): Thunk_type => {
    return async function (dispatch) {
        //Set is initizialize false while user request not resolve
        await Firebase_instance.Get_auth_state(Firebase_auth, (user) => {
            if (user) {
                dispatch(auth_actions.set_auth_true());
                dispatch(auth_actions.set_auth_token(""))
                dispatch(auth_actions.initialize())
            } else {
                dispatch(auth_actions.set_auth_false());
                dispatch(auth_actions.set_auth_token(""));
                dispatch(auth_actions.initialize())
            }
        })
    }
}
//Creating new user thunk get the email and password from the form in login component
//Then uses Firbase auth insatnce
export const create_user_thunk = (_email: string, _password: string): Thunk_type => {
    return async (dispatch) => {
        Firebas_auth.Sign_in_with_email_and_password(_email, _password).then((res) => {
            //if new user was created dispatch new user id in store otherwise throw error
            if (res) {
                dispatch(auth_actions.create_user(res?.uid))
                dispatch(auth_actions.set_auth_token(res.refreshToken))
                dispatch(auth_actions.set_auth_true());

            } else {
                console.log("Error")
            }

        })
    }
}
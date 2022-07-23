import { InferActionType } from "./Store";
import { Db_instance, Firebase_instance } from "../DAL/Firebase_config";


const SET_INITIALIZE = "SET_INITIALIZE";
const SET_IS_FETCH_TRUE = "messenger/app_reducer/set_is_fetch_true";
const SET_IS_FETCH_FALSE = "messenger/app_reducer/set_is_fetch_false";
const SET_CURRENT_USER_ID = "messenger/app_reducer/set_current_user_id";

let initial_state = {
    is_initialize: false,
    is_fetch: false,
    currentUserID: null as unknown as string | undefined
}
//Acrtion types
type Action_Type = InferActionType<typeof app_actions>;

export const app_reducer = (state = initial_state, action: Action_Type) => {
    switch (action.type) {
        case SET_INITIALIZE: {
            return {
                ...state,
                is_initialize: true
            }
        }
        case SET_IS_FETCH_TRUE: {
            return {
                ...state,
                is_fetch: true
            }
        }
        case SET_IS_FETCH_FALSE: {
            return {
                ...state,
                is_fetch: false
            }
        }
        case SET_CURRENT_USER_ID: {
            return {
                ...state,
                currentUserID: action.payload
            }
        }
        default:
            return state
    }
}

export const app_actions = {
    //Initialize action
    init: () => (
        {
            type: "SET_INITIALIZE",

        } as const),
    set_is_fetch_true: () => (
        {
            type: "messenger/app_reducer/set_is_fetch_true",

        } as const),
    set_is_fetch_fasle: () => (
        {
            type: "messenger/app_reducer/set_is_fetch_false",

        } as const),
    setCurrentUserID: (userID: string) => ({
        type: "messenger/app_reducer/set_current_user_id",
        payload: userID
    })

}

export const initialize = () => async (dispatch: any) => {
    //FUNCTION INITIALIZER : First get the authorized user id from google auth then set them into the state
    //Then we use this state to fetch profile page data
    //When fetching data started set is_fetch true in the end set this in false
    dispatch(app_actions.set_is_fetch_true());
    let currentUserID = await Firebase_instance.get_current_user();
    let currentUser = await Db_instance.get_user_page_by_id(currentUserID?.uid as string);
    dispatch(app_actions.setCurrentUserID(currentUser.val().userID))
    dispatch(app_actions.set_is_fetch_fasle())
}
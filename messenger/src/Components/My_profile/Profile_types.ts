import { Current_ProfileType } from "../../Redux/profile_reducer";


export type MyProfilePropsType = {
    current_user_profile: Current_ProfileType,
    user_id : string | null | undefined,
    get_current_user: (userID:string) => void,
    get_status: (user_id: string | null | undefined) => void,
    update_status : (user_id:string,status_text : string) => void
}


export type InfoPropsType = {
    user_id : string,
    age: number,
    name: string | null | undefined,
    number_of_subscribers: number,
    number_of_folowers: number,
    is_auth?: boolean,
    get_status: (user_id: string | null | undefined) => void,
    update_status : (user_id:string,status_text : string) => void

}
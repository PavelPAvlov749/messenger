import axios from "axios";
import { ResponseType } from "axios";


const API_KEY = "eb25692d-120e-4f50-87e4-23bbda95a3fe";

const instance = axios.create(
    {
        withCredentials:true,
        baseURL: "https://social-network.samuraijs.com/api/1.0/",
        headers:{
            "API-KEY": API_KEY,
        }
    }
);
type login_response_type = {
    userID : number
};

export enum result_codes {
    Suscess = 0,
    Error = 1
}
//Decalring Generic Response type,  
export type Response_type<D = {},RC = result_codes> = {
    data : D,
    resultCode : RC,
    messages : Array<string>
};


export const auth_api = {
    log_in : (login:string,password:string) => {
        return instance.post<Response_type<login_response_type>>(`auth/login`,{
            email : login,
            password : password,
            rememberMe : false
        }).then((response)=>{
            return response
        })
    }
};
import { getAuth,onAuthStateChanged,createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export const Firebas_auth = {
    get_current_user : async () => {
        try{
            onAuthStateChanged(auth,(user) => {
                if(user){
                    const uid = user.uid;
                    console.log(user)
                    return uid
                }else{
                    throw new Error();
                }
            })
        }catch(ex){
            console.error(ex + "Not authorized")
        }
    },
    get_user : async () => {

    },
    create_user_with_email_and_password : async (_email : string,password : string) => {
        try{
            const uid = await createUserWithEmailAndPassword(auth,_email,password).then((user) => {
                const current_user = user.user
                return current_user;
            })
            return uid
            
        }catch(ex){
            console.log(ex)
        }
    },

}

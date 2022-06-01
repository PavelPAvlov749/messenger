import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { firebase } from "./Firebase_config";
import { firebaseConfig } from "./Firebase_config";
import { addDoc } from "firebase/firestore";



//INITIALIZING FIRESTORE INSTANCE;
const Firestore = getFirestore(firebase);

//APPLICATION FIRESTORE INSTANSE
export const Firestore_instance = {
    Get_collection: async () => {
        const firestore_query = query(collection(Firestore, "chat_firestore"));
        const query_snapshot = await getDocs(firestore_query).then((data) => data)
        let data: Array<any> = []
        query_snapshot.forEach((el) => {
            data.push(el.data())
        })
        console.log(data)
        return data;
    },
    Send_message : async (_text : string | null,_user_name?:string | null | undefined,_user_id? : string | null | undefined) => {
        try {
            const docRef = await addDoc(collection(Firestore, "chat_firestore"),
                {
                    createdAt: new Date(),
                    message_status: "unread",
                    message_text: _text,
                    sender: _user_name,
                    user_id: _user_id,
                });
        } catch (e) {
            console.log("ERROR : " + e)
        }
    }
};
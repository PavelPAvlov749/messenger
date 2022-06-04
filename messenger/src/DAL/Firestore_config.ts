import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { getDatabase, ref, onValue, set, get ,child} from "firebase/database";
import { firebase } from "./Firebase_config";
import { firebaseConfig } from "./Firebase_config";
import { addDoc } from "firebase/firestore";
import { chat_actions, Message_type } from "../Redux/Chat_reducer";
import { useDispatch } from "react-redux";
import { async } from "@firebase/util";



//INITIALIZING FIRESTORE INSTANCE;
const Firestore = getFirestore(firebase);

//Initialize Real-time data base instance 
const dataBase = getDatabase();
console.log(dataBase)
export const writeUserData = async function () {
    const refrence = await ref(dataBase);
    onValue(refrence, (snap) => {
        const data = snap.val();
        console.log(data)
    })
}
//APPLICATION FIRESTORE INSTANSE
const reference = ref(dataBase)
export const Firestore_instance = {
    Get_collection: onValue(reference, (_snap) => {
        const data = _snap.val()
        return data
    }),
    Get_collection_once: async () => {
        const q = query(collection(Firestore, "chat_firestore"));
        const query_snapshot = await getDocs(q).then((data) => data)
        let data : any = []
        query_snapshot.forEach((doc) => {
            data.push(doc.data())
        })

        return data
    }

}
    ;
import {getStorage,ref ,uploadBytesResumable} from "firebase/storage";
import { store } from "../Redux/Store";
import { firebaseConfig } from "./Firebase_config";
import { firebase } from "./Firebase_config";

const Storage = getStorage(firebase);

//Create a storege reference
const storageRef = ref(Storage,"user-posts/mauntains.jpg");

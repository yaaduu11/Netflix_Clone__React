import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword,
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyDc13buKG3Kb70oSeKn2AJDNgRMZC9ABA8",
  authDomain: "netflix-clone-2a47f.firebaseapp.com",
  projectId: "netflix-clone-2a47f",
  storageBucket: "netflix-clone-2a47f.appspot.com",
  messagingSenderId: "9733466172",
  appId: "1:9733466172:web:f4b6d1efa02b408b02fb39"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const signup = async(name, email, password) =>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user

        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            email,
            authProvider : "local"
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

export const login = async(email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error);
    }
}
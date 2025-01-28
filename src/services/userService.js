import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { LoggedUser } from "./authService";
const functions = getFunctions();

export async function changeProgress(progress) {
    try {
        if(LoggedUser.get().progress == undefined || LoggedUser.get().progress == null || LoggedUser.get().progress < progress) {
            
            const docSnap = await updateDoc(doc(db, "users", LoggedUser.get().id), { progress: progress });
            console.log(docSnap);
            LoggedUser.set ({...LoggedUser.get(), "progress": progress});            
        } 
    } catch (error) {
        console.error("Erro ao mudar progresso:", error);
        throw error;
    }
}
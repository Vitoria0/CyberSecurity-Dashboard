import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc, getDocs, collection } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { LoggedUser } from "./authService";
const functions = getFunctions();

export async function getStudents() {
  try{
    var querySnapshot = await getDocs(collection(db, "users"));
    console.log(querySnapshot.docs)
    return querySnapshot.docs.map((doc) => doc.data());
  }catch(error){
    console.error('Erro ao logar ou buscar dados:', error);
    throw error;
  }
}

export async function changePaymentStatus(user) {
  try{
    const docRef = doc(db, "users", user.id);
    // if(!user.isPaying){
    //     user.isPaying = false;
    // }
    await updateDoc(docRef, { isPaying: !user.isPaying });
  }catch(error){
    console.error('Erro ao logar ou buscar dados:', error);
    throw error;
  }
}
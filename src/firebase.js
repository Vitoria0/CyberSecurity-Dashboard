// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Opcional: Para autenticação
import { getFirestore } from "firebase/firestore"; // Opcional: Para Firestore
import { getStorage } from "firebase/storage"; // Opcional: Para Storage

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDl-8fvOWw9gOdYszIjnyQMqus9jwRQn-M",
    authDomain: "cybersecuritycourse-eaf81.firebaseapp.com",
    projectId: "cybersecuritycourse-eaf81",
    storageBucket: "cybersecuritycourse-eaf81.firebasestorage.app",
    messagingSenderId: "460245222872",
    appId: "1:460245222872:web:3a4bb23d84dce0b7281ead"
  };
// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Exportar serviços opcionais
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

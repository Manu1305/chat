// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBCN00OlwnzP_qKvddhg8HRHSdsTC0z8zQ",
    authDomain: "chat-app-31ec9.firebaseapp.com",
    projectId: "chat-app-31ec9",
    storageBucket: "chat-app-31ec9.appspot.com",
    messagingSenderId: "605710442755",
    appId: "1:605710442755:web:0023c936730ff6feb50936",
    measurementId: "G-ZE207284JZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
export const db =getFirestore(app)

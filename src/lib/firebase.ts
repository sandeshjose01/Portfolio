import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCChQzdSuNW8EzBXtRxZyvwh4WOjj67FCs",
    authDomain: "my-portfolio-96764.firebaseapp.com",
    projectId: "my-portfolio-96764",
    storageBucket: "my-portfolio-96764.firebasestorage.app",
    messagingSenderId: "1018154031940",
    appId: "1:1018154031940:web:937edbfb442a6dfc041511"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

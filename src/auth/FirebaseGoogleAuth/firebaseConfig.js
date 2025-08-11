import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "@firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCuB5MtQ3i8fJgjjxI9wLrmSlXRwTdJnAs",
    authDomain: "casaca-tec.firebaseapp.com",
    projectId: "casaca-tec",
    storageBucket: "casaca-tec.firebasestorage.app",
    messagingSenderId: "934061674269",
    appId: "1:934061674269:web:3e3c3920d8f176381adbf4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

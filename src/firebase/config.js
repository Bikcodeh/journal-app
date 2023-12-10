// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyA-xlzxEO_NiuE36uzy-2NOk-qwBjeX4ew",

    authDomain: "journal-app-react-91dfa.firebaseapp.com",

    projectId: "journal-app-react-91dfa",

    storageBucket: "journal-app-react-91dfa.appspot.com",

    messagingSenderId: "934376401565",

    appId: "1:934376401565:web:a070743729834b4b4b0274",

    measurementId: "G-V0SV4PJP91"

};


// Initialize Firebase

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDlOEXIo6DRx7605IDmbuFEN-mRh62tovY",
    authDomain: "homework2-c0fbe.firebaseapp.com",
    projectId: "homework2-c0fbe",
    storageBucket: "homework2-c0fbe.firebasestorage.app",
    messagingSenderId: "316253482924",
    appId: "1:316253482924:web:6cacda169c8c9ae1509409",
    measurementId: "G-DYM5QPJRQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
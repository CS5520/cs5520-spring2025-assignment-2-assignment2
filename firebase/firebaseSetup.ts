// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHxiGZAKPN41eCYZL9WQnVaDrFxpwbrVg",
  authDomain: "assignment2-1c8a3.firebaseapp.com",
  projectId: "assignment2-1c8a3",
  storageBucket: "assignment2-1c8a3.firebasestorage.app",
  messagingSenderId: "804461388414",
  appId: "1:804461388414:web:aa3f2d3d682e654e92ae2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
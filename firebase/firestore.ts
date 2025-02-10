import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";

import { Activity } from "../screens/AddActivity";
import { Diet } from "@/screens/AddDiet";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzUwnwqV68oAEq52ee8ijiKt-bq4fvBjU",
  authDomain: "assignment-2-64dcd.firebaseapp.com",
  projectId: "assignment-2-64dcd",
  storageBucket: "assignment-2-64dcd.firebasestorage.app",
  messagingSenderId: "719130646551",
  appId: "1:719130646551:web:a33f49a13cff61a2972452",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

type Data = Activity | Diet;

export async function writeToDB(collectionName: string, data: Data) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    return docRef.id;
  } catch (e) {
    throw e;
  }
}

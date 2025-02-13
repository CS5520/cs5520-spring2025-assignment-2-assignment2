import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Diet, Activity } from "../constants/types";

export async function writeToDB(collectionName: string, data: Diet | Activity) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function readFromDB(
  collectionName: string
): Promise<(Diet | Activity)[]> {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    const items: (Diet | Activity)[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (Diet | Activity)[];
    return items;
  } catch (error) {
    console.error("Error fetching items: ", error);
    throw error;
  }
}

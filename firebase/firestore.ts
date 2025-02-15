import { db } from "./firebaseSetup";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  DocumentData,
  Unsubscribe,
} from "firebase/firestore";

/**
 * Listen to a specific Firestore collection (real-time updates).
 * @param collectionName Name of the Firestore collection
 * @param callback Function to handle the new array of documents whenever data changes
 * @returns An unsubscribe function to stop listening
 */
export function listenToCollection(
  collectionName: string,
  callback: (docs: Array<{ id: string } & DocumentData>) => void
): Unsubscribe {
  const q = query(collection(db, collectionName));
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const list: Array<{ id: string } & DocumentData> = [];
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    callback(list);
  });

  return unsubscribe;
}

/**
 * Write a new document to the specified collection.
 * @param collectionName Name of the Firestore collection
 * @param data The data object to be saved as a new document
 * @returns A Promise resolving to the newly created doc reference
 */
export async function writeToDB(collectionName: string, data: any) {
  try {
    await addDoc(collection(db, collectionName), data);
  } catch (err) {
    console.error("Error writing document: ", err);
  }
}

import { collection, addDoc, DocumentData, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { database } from './firebaseSetup';

// use a generic type to write to the database
export async function writeToDB(collectionName: string, data: DocumentData) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

// delete the item from the database
export async function deleteFromDB(id: string, collectionName: string) {
  try {
      await deleteDoc(doc(database, collectionName, id));
  } catch (e) {
      console.error("Error deleting document: ", e);
  }
}

// update the item in the database
export async function updateDB(id: string, collectionName: string, data: DocumentData) {
  try {
    await setDoc(doc(database, collectionName, id), data);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

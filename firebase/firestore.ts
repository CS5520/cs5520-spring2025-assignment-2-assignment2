import { collection, addDoc, DocumentData } from 'firebase/firestore';
import { database } from './firebaseSetup';

// use a generic type to write to the database
export async function writeToDB(collectionName: string, data: DocumentData) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

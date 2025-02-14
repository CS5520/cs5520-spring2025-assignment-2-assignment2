import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAL-PPEQYS8lmsKhWawC90Gd0oVwFGyAhI',
  authDomain: 'mob-dev-diet-app.firebaseapp.com',
  projectId: 'mob-dev-diet-app',
  storageBucket: 'mob-dev-diet-app.firebasestorage.app',
  messagingSenderId: '903584736716',
  appId: '1:903584736716:web:d5d7f89c6c2047993ba969',
  measurementId: 'G-N7EBHG816M',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export async function writeToDB(collectionName: string, data: any) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef?.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    throw e;
  }
}

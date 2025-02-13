import { database } from "./firebaseSetup";
import { collection, addDoc, Timestamp } from "firebase/firestore"; 

export interface ItemData{
    id?: string;
    date: Timestamp;
    important: boolean;
    [key: string]: any;
}

export async function writeToDB(collectionName: string, data: ItemData) {
    try {
        const docRef = await addDoc(collection(database, collectionName), {
            ...data,
            date: data.date,
        });
        return docRef.id;
    }
    catch(err) {
        console.error(err);
        throw err;
    }
}

import { addDoc, collection } from "firebase/firestore"
import { database } from "./firebaseSetup"
import { Activity } from "../screens/AddActivity"
import { Diet } from "../screens/AddDiet"

export async function writeToDB(collectionName: string, data: Activity | Diet) {
    try {
        const docRef = await addDoc(collection(database, collectionName), data)
        return docRef.id
    } catch (e) {
        console.error("Error adding document: ", e)
    }

}



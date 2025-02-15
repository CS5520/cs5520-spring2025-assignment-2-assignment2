import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebaseSetup";

export interface Diet {
    id: string;
    calories: string;
    description: string;
    date: Timestamp;
    important: boolean;
}

export interface Activity {
    id: string;
    name: string;
    duration: string;
    date: Timestamp;
    important: boolean;
}

export async function writeToDB(data: Diet | Activity, collectionName: "diet" | "activity") {
    try {
        const formattedData = collectionName === "diet" ? {
            description: (data as Diet).description,
            calories: (data as Diet).calories,
            date: Timestamp.fromDate(data.date.toDate()),
            important: data.important
        } : {
            name: (data as Activity).name,
            duration: (data as Activity).duration,
            date: Timestamp.fromDate(data.date.toDate()),
            important: data.important
        };

        const docRef = await addDoc(collection(db, collectionName === "diet" ? "diets" : "activities"), formattedData);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
}

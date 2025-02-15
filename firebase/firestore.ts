import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebaseSetup";

export interface Diet {
    id?: string;
    calories: string;
    description: string;
    date: Timestamp | null;
    important: boolean;
}

export interface Activity {
    id?: string;
    activity: string;
    duration: string;
    date: Timestamp | null;
    important: boolean;
}

export async function writeToDB(collectionName: "diet" | "activities", data: Diet | Activity,) {
    try {
        const formattedData = collectionName === "diet" ? {
            description: (data as Diet).description,
            calories: (data as Diet).calories,
            date: data.date ? Timestamp.fromDate(data.date.toDate()) : Timestamp.fromDate(new Date()),
            important: data.important
        } : {
            activity: (data as Activity).activity,
            duration: (data as Activity).duration,
            date: data.date ? Timestamp.fromDate(data.date.toDate()) : Timestamp.fromDate(new Date()),
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

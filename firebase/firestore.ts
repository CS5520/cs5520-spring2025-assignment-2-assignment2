import { database } from "./firebaseSetup"; // Import the Firebase database configuration
import { collection, addDoc, Timestamp } from "firebase/firestore"; // Import necessary Firestore functions

// Define the interface for item data that will be written to the database
export interface ItemData {
    id?: string; // Optional field for the document ID
    date: Timestamp; // Date when the item was created or logged, as a Firestore Timestamp
    important: boolean; // Boolean indicating whether the item is important or not
    [key: string]: any; // This allows for additional arbitrary properties to be added dynamically
}

// Function to write data to Firestore
export async function writeToDB(collectionName: string, data: ItemData) {
    try {
        // Add the data to the specified collection in Firestore
        const docRef = await addDoc(collection(database, collectionName), {
            ...data, // Spread the data object to include all properties
            date: data.date, // Ensure the date is included in the document
        });

        // Return the document ID of the newly created document
        return docRef.id;
    }
    catch (err) {
        // Log any errors that occur during the write operation
        console.error(err);
        // Rethrow the error so it can be handled elsewhere
        throw err;
    }
}

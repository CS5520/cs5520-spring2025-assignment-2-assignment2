import { Timestamp } from "firebase/firestore"; // Import the Timestamp type from Firebase Firestore to handle date fields

// Enum to represent different types of activities
export enum ActivityType {
    Walking = "Walking",
    Running = "Running",
    Swimming = "Swimming",
    Weights = "Weights",
    Yoga = "Yoga",
    Cycling = "Cycling",
    Hiking = "Hiking",
}

// Interface representing a basic item structure with common fields
export interface BasicItem {
    id?: string; // Optional id field, usually used as a unique identifier
    date: Timestamp; // The date when the item was created or logged, using Firebase's Timestamp
    important: boolean; // A flag to mark if the item is important
}

// Interface representing an Activity item, extends BasicItem and adds activity-related fields
export interface Activity extends BasicItem {
    activity: ActivityType; // The type of activity (e.g., walking, running, etc.)
    duration: string; // Duration of the activity (e.g., "30 minutes")
}

// Interface representing a Diet item, extends BasicItem and adds diet-related fields
export interface Diet extends BasicItem {
    description: string; // Description of the diet (e.g., "Vegetarian meal")
    calories: string; // Calories of the diet (e.g., "500 kcal")
}

// A type that can be either an Activity or a Diet, used to represent both types of items in a unified way
export type Item = Activity | Diet;
